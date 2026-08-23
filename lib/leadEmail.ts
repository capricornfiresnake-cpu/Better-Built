import { site } from "./site";

/**
 * LEAD EMAIL
 * ==========
 *
 * Sends each lead on to a real inbox through Resend's HTTP API. Called from
 * /api/lead — the route validates, this delivers.
 *
 * Resend has an SDK; this uses plain fetch on purpose so the site keeps its
 * zero runtime dependencies.
 *
 * ENVIRONMENT
 *   RESEND_API_KEY   required. Set it in the Vercel project settings, never in
 *                    a file in this repository. Without it nothing is sent and
 *                    the lead only reaches the server log.
 *   LEAD_EMAIL_FROM  optional. Defaults to Resend's shared onboarding sender,
 *                    which can only deliver to the address that owns the Resend
 *                    account. Point this at your own verified domain once you
 *                    have one, or mail to anyone else will be rejected.
 *   LEAD_EMAIL_TO    optional. Defaults to the site contact address.
 */

const ENDPOINT = "https://api.resend.com/emails";

export type Lead = {
  name: string;
  business: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  need: string;
  details: string;
  paid: boolean;
  reference: string;
};

export type DeliveryResult =
  | { ok: true; skipped?: "no-key" }
  | { ok: false; reason: string };

const FIELDS: [label: string, key: keyof Lead][] = [
  ["Name", "name"],
  ["Business", "business"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["Industry", "industry"],
  ["Current website", "website"],
  ["Looking for", "need"],
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Whoever it is, this is what you call them in the subject line. */
function who(lead: Lead): string {
  return lead.business || lead.name || lead.email;
}

function subjectFor(lead: Lead): string {
  return lead.paid
    ? `PAID — $800 website — ${who(lead)}`
    : `New enquiry — ${lead.need || "unspecified"} — ${who(lead)}`;
}

function textBody(lead: Lead): string {
  const lines = FIELDS.filter(([, key]) => lead[key]).map(
    ([label, key]) => `${label}: ${lead[key]}`,
  );

  if (lead.details) lines.push("", "Details:", lead.details);

  lines.push("");
  lines.push(
    lead.paid
      ? "PAID — this brief arrived after the customer returned from Stripe checkout."
      : "Not paid — this is an enquiry, no payment attached.",
  );
  if (lead.reference) lines.push(`Stripe reference: ${lead.reference}`);
  lines.push("", "Confirm every payment in the Stripe dashboard before starting work.");

  return lines.join("\n");
}

function htmlBody(lead: Lead): string {
  const rows = FIELDS.filter(([, key]) => lead[key])
    .map(
      ([label, key]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666;white-space:nowrap">${label}</td>` +
        `<td style="padding:4px 0"><strong>${escapeHtml(String(lead[key]))}</strong></td></tr>`,
    )
    .join("");

  const details = lead.details
    ? `<p style="margin:20px 0 0;white-space:pre-wrap">${escapeHtml(lead.details)}</p>`
    : "";

  const banner = lead.paid
    ? `<p style="margin:0 0 20px;padding:10px 14px;background:#0f7b3f;color:#fff;font-weight:600">
         PAID — returned from Stripe checkout${
           lead.reference ? ` · ref ${escapeHtml(lead.reference)}` : ""
         }
       </p>
       <p style="margin:0 0 20px;color:#666;font-size:13px">
         Confirm the payment in the Stripe dashboard before starting work.
       </p>`
    : `<p style="margin:0 0 20px;color:#666">Enquiry — no payment attached.</p>`;

  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:#111">
    ${banner}
    <table style="border-collapse:collapse">${rows}</table>
    ${details}
  </div>`;
}

/**
 * Never throws. The caller decides what to tell the customer, and a lead is
 * worth more than a clean stack trace.
 */
export async function sendLeadEmail(lead: Lead): Promise<DeliveryResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: true, skipped: "no-key" };

  const from = process.env.LEAD_EMAIL_FROM ?? "Better Built <onboarding@resend.dev>";
  const to = process.env.LEAD_EMAIL_TO ?? site.email;

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: subjectFor(lead),
        text: textBody(lead),
        html: htmlBody(lead),
        // Replying to the notification replies to the customer.
        reply_to: lead.email,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (response.ok) return { ok: true };

    const detail = await response.text().catch(() => "");
    return { ok: false, reason: `resend ${response.status} ${detail.slice(0, 300)}` };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "unknown transport error",
    };
  }
}
