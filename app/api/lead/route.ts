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
  console.info("[better-built] new lead", {
    ...lead,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
