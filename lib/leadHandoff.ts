/**
 * PAY-FIRST HANDOFF
 * =================
 *
 * The build brief is answered before payment but only delivered after it, so
 * the answers have to survive a round trip out to Stripe and back. They wait
 * in sessionStorage — same tab, dropped when the tab closes, never sent
 * anywhere until the customer comes back from checkout.
 *
 * This is the no-backend version, and it has two honest limits:
 *
 *   1. If the customer closes the tab on Stripe's receipt page instead of
 *      returning, the answers are lost. The payment and their email address
 *      are still in Stripe, so nothing is unrecoverable.
 *   2. It cannot prove a payment happened. A lead marked paid means "came
 *      back through the success page", not "Stripe confirmed it". Stripe is
 *      the record. Only a webhook can make that claim, and a webhook needs a
 *      signing secret and somewhere to store the brief in the meantime.
 */

const KEY = "bb:pending-lead";

export type PendingLead = Record<string, string> & { reference: string };

/**
 * Ties a Stripe payment to the brief that produced it. Stripe only accepts
 * letters, numbers, dashes and underscores in client_reference_id.
 */
export function newReference(): string {
  const stamp = Date.now().toString(36);
  const noise = Math.random().toString(36).slice(2, 8);
  return `bb_${stamp}_${noise}`;
}

/** Storage throws in private modes and with cookies blocked — never fatal. */
export function stashLead(lead: PendingLead): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(lead));
  } catch {
    /* The customer can still pay; we just lose the brief. */
  }
}

/** Reads the brief and removes it, so a refresh cannot send it twice. */
export function takeLead(): PendingLead | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(KEY);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as PendingLead;
  } catch {
    return null;
  }
}

export function clearLead(): void {
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* Nothing to clean up. */
  }
}
