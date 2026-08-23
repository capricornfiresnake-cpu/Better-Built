import { NextResponse } from "next/server";

/**
 * LEAD INTAKE
 * ===========
 *
 * Single integration point for the contact form. The frontend posts JSON here
 * and expects `{ ok: true }` back.
 *
 * TO CONNECT A BACKEND, replace the "deliver" step below with any of:
 *   - CRM      → POST to HubSpot / Pipedrive / GoHighLevel
 *   - Email    → Resend, Postmark, SendGrid
 *   - SMS      → Twilio, to alert the setter immediately
 *   - Database → Supabase, Postgres, Airtable
 *   - Webhook  → Zapier / Make, if the funnel lives there
 *
 * Keep the validation above it — it is what stops junk reaching the CRM.
 *
 * NOTHING IS DELIVERED YET. The step below writes to the server log and stops
 * there, which on Vercel means the function logs and nobody's inbox. Until a
 * real destination is wired in, every lead — paid ones included — is only as
 * visible as those logs.
 */

export const runtime = "nodejs";

type LeadPayload = {
  name: string;
  business: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  need: string;
  details: string;
  /**
   * True when the brief arrived after checkout rather than instead of it.
   * It means "came back through the success page", not "Stripe confirmed the
   * payment" — Stripe is the record of that.
   */
  paid: boolean;
  /** Matches the client_reference_id on the Stripe payment, when there is one. */
  reference: string;
  /** Honeypot. Any value means a bot filled it. */
  companyUrl?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "That didn't send. Try again." },
      { status: 400 },
    );
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  if (asString(raw.companyUrl)) {
    // Silently accept so bots do not learn they were caught.
    return NextResponse.json({ ok: true });
  }

  const lead: LeadPayload = {
    name: asString(raw.name),
    business: asString(raw.business),
    email: asString(raw.email),
    phone: asString(raw.phone),
    industry: asString(raw.industry),
    website: asString(raw.website),
    need: asString(raw.need),
    details: asString(raw.details).slice(0, 4000),
    paid: raw.paid === true,
    reference: asString(raw.reference).slice(0, 200),
  };

  if (!lead.name) {
    return NextResponse.json(
      { ok: false, message: "Add your name so we know who we're talking to." },
      { status: 422 },
    );
  }

  if (!EMAIL_PATTERN.test(lead.email)) {
    return NextResponse.json(
      { ok: false, message: "Check the email address — we couldn't read that one." },
      { status: 422 },
    );
  }

  // --- Deliver -------------------------------------------------------------
  // Replace this with the real destination. Until then the lead is logged so
  // nothing is silently lost in development.
  console.info(lead.paid ? "[better-built] PAID lead" : "[better-built] new lead", {
    ...lead,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
