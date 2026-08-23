"use client";

import { useEffect, useRef, useState } from "react";

import { takeLead } from "@/lib/leadHandoff";

type State = "working" | "sent" | "nothing" | "failed";

/**
 * Runs once when someone comes back from Stripe. The brief they filled in
 * before paying is sitting in sessionStorage; this is the point where it is
 * finally delivered.
 *
 * "nothing" is a normal outcome, not an error — it means they landed here in a
 * different tab, cleared storage, or reached the page without going through
 * the form. Their payment and email are still in Stripe either way.
 */
export default function PaidBriefDelivery() {
  const [state, setState] = useState<State>("working");

  /* Holds the one request rather than a "has run" flag. Strict Mode mounts the
     effect twice in development, and a plain flag would let the second run skip
     the work while the first run's cleanup had already discarded the answer. */
  const outcome = useRef<Promise<State> | null>(null);

  useEffect(() => {
    let live = true;

    if (!outcome.current) {
      const lead = takeLead();

      /* Both paths settle through the same promise so the result always
         arrives in a callback rather than during the effect itself. */
      outcome.current = lead
        ? fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...lead, paid: true }),
          })
            .then((response) => (response.ok ? "sent" : "failed"))
            .catch(() => "failed")
        : Promise.resolve("nothing");
    }

    outcome.current.then((next) => {
      if (live) setState(next);
    });

    return () => {
      live = false;
    };
  }, []);

  const copy: Record<State, string> = {
    working: "Sending your details through…",
    sent: "Your details are through. We'll read them and come back with questions, a plan, and a timeline — usually the same day.",
    nothing:
      "We have your payment and your email address from Stripe. If you filled in the questions on another device, reply to your Stripe receipt and we'll pick it up from there.",
    failed:
      "Your payment went through, but your answers didn't reach us. Reply to your Stripe receipt with the details and nothing is lost.",
  };

  return (
    <p
      role="status"
      aria-live="polite"
      className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-slate"
    >
      {copy[state]}
    </p>
  );
}
