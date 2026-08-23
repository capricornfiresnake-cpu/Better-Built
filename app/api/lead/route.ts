import { NextResponse } from "next/server";

import { sendLeadEmail } from "@/lib/leadEmail";

/**
 * LEAD INTAKE
 * ===========
 *
 * Single integration point for the contact form. The frontend posts JSON here
 * and expects `{ ok: true }` back.
 *
 * Leads are emailed on through Resend — see lib/leadEmail for the environment
 * variables that needs. Every lead is also written to the server log first, so
 * one that fails to send is recoverable from the Vercel logs rather than gone.
 *
 * TO ADD ANOTHER DESTINATION — a CRM, SMS, a database, a Zapier webhook — put
 * it beside the send below. Keep the validation above it: that is what stops
 * junk getting through.
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
   * Matches the client_reference_id on the Stripe payment, when this enquiry
   * came from a pricing button. Present means "was offered checkout", never
   * "has paid" — the Stripe dashboard is the only answer to that.
   */
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
  // Logged before it is sent, so a delivery failure leaves a trail to work from.
  console.info("[better-built] new lead", {
    ...lead,
    receivedAt: new Date().toISOString(),
  });

  const delivery = await sendLeadEmail(lead);

  if (!delivery.ok) {
    console.error("[better-built] lead email failed", delivery.reason);

    /* Say so rather than showing a receipt for a message nobody got. */
    return NextResponse.json(
      { ok: false, message: "That didn't send. Try again, or email us directly." },
      { status: 502 },
    );
  }

  if (delivery.skipped === "no-key") {
    console.warn(
      "[better-built] RESEND_API_KEY is not set — this lead reached the log and nothing else.",
    );
  }

  return NextResponse.json({ ok: true });
}
