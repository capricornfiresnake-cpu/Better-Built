"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { Button, ButtonLink } from "@/components/ui/Button";
import SecureNote from "@/components/ui/SecureNote";
import {
  checkoutUrlWith,
  industryOptions,
  needOptions,
  websitePlan,
} from "@/data/pricing";
import { clearLead, newReference, stashLead } from "@/lib/leadHandoff";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "checkout" | "success" | "error";

type Answers = Record<string, string>;

const fieldBase =
  "w-full rounded-none border-0 border-b border-line bg-transparent px-0 pb-2.5 pt-1 " +
  "text-[1.0625rem] text-chalk placeholder:text-dim " +
  "transition-colors duration-300 focus:border-accent focus:outline-none " +
  "focus-visible:outline-none";

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label-mono block text-dim">
        {label}
        {hint ? (
          <span className="ml-2 normal-case tracking-normal opacity-70">{hint}</span>
        ) : null}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/**
 * Lead form. Posts JSON to `/api/lead`, which is the single place to wire up a
 * CRM, email automation, or SMS follow-up — no component changes needed.
 *
 * Arriving with `?plan=website` means the visitor came from a pricing button to
 * buy, not to ask. The answers are then held back and only delivered once the
 * customer returns from Stripe, so a brief that was never paid for never lands
 * in the inbox. See lib/leadHandoff for what that does and does not guarantee.
 */
export default function ContactForm() {
  const id = useId();
  const [need, setNeed] = useState<string>(needOptions[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<{ href: string; answers: Answers } | null>(
    null,
  );

  async function deliver(answers: Answers) {
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(data?.message ?? "That didn't send.");
      }

      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "That didn't send. Try again, or email us directly.",
      );
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const answers = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as Answers;

    /* Read at submit time rather than on render: it keeps the page static and
       there is no hydration mismatch to worry about. */
    const plan = new URLSearchParams(window.location.search).get("plan");

    if (plan === websitePlan.id && websitePlan.checkoutUrl) {
      const reference = newReference();
      stashLead({ ...answers, reference });
      setCheckout({
        href: checkoutUrlWith(websitePlan, { email: answers.email, reference }),
        answers,
      });
      setStatus("checkout");
      return;
    }

    await deliver(answers);
  }

  /* Someone who wants to talk before paying is a lead, not a lost sale. Their
     answers go through now, and the stashed copy is dropped so the thank-you
     page cannot send them a second time. */
  async function sendWithoutPaying(answers: Answers) {
    clearLead();
    await deliver(answers);
  }

  /* Stays mounted while the "send without paying" request is in flight, so
     the form does not flash back in underneath it. */
  if (checkout && status !== "success") {
    return (
      <div className="rounded-lg border border-line bg-card p-[clamp(1.75rem,4vw,3rem)]">
        <p className="label-mono text-accent-lift">Last step</p>
        <h2 className="display-lg mt-6 max-w-[18ch] text-chalk">
          Pay {websitePlan.price} and we start.
        </h2>
        <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-slate">
          Your answers are ready. They reach us the moment the payment goes
          through, and we come back with questions, a plan, and a timeline.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
          <ButtonLink href={checkout.href} size="lg" withArrow className="label-mono">
            Pay {websitePlan.price} and start
          </ButtonLink>
          <SecureNote />
        </div>

        <p className="mt-7 text-[0.875rem] text-dim">
          <Link
            href="/terms#refunds"
            className="link-underline transition-colors duration-300 hover:text-chalk"
          >
            Refunds and cancellations
          </Link>
        </p>

        <div className="mt-8 border-t border-line pt-6">
          <button
            type="button"
            onClick={() => sendWithoutPaying(checkout.answers)}
            disabled={status === "submitting"}
            className="link-underline label-mono text-slate transition-colors duration-300 hover:text-chalk"
          >
            Rather talk first? Send this without paying
          </button>
        </div>

        <p role="status" aria-live="polite" className="min-h-5 text-[0.9375rem]">
          {error ? <span className="text-accent-lift">{error}</span> : null}
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-line bg-card p-[clamp(1.75rem,4vw,3rem)]"
      >
        <p className="label-mono text-accent-lift">Received</p>
        <h2 className="display-lg mt-6 max-w-[18ch] text-chalk">
          Thanks — we&rsquo;ve got it.
        </h2>
        <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-slate">
          We&rsquo;ll read through what you sent and come back with a few questions, a
          plan, and a timeline. If anything is urgent, reply to the email we send and it
          will reach us directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline label-mono mt-8 text-slate"
        >
          Send another project
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-10 gap-y-9">
      {/* Simple bot trap. Real people never see or fill this. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-company-url`}>Leave this empty</label>
        <input id={`${id}-company-url`} name="companyUrl" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        <Field label="Name" htmlFor={`${id}-name`}>
          <input
            id={`${id}-name`}
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldBase}
          />
        </Field>

        <Field label="Business name" htmlFor={`${id}-business`}>
          <input
            id={`${id}-business`}
            name="business"
            autoComplete="organization"
            placeholder="What it's called"
            className={fieldBase}
          />
        </Field>

        <Field label="Email" htmlFor={`${id}-email`}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@business.com"
            className={fieldBase}
          />
        </Field>

        <Field label="Phone" hint="optional" htmlFor={`${id}-phone`}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 000-0000"
            className={fieldBase}
          />
        </Field>

        <Field label="Industry" htmlFor={`${id}-industry`}>
          <select
            id={`${id}-industry`}
            name="industry"
            defaultValue=""
            className={cn(fieldBase, "appearance-none pr-6 [&>option]:bg-card")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {industryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Current website" hint="if you have one" htmlFor={`${id}-website`}>
          <input
            id={`${id}-website`}
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.com"
            className={fieldBase}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="label-mono text-dim">What do you need?</legend>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {needOptions.map((option) => (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-[3px] border px-4 py-3.5 text-[0.9375rem] transition-colors duration-300",
                need === option
                  ? "border-accent bg-accent/12 text-chalk"
                  : "border-line text-slate hover:border-line-hard hover:text-chalk",
              )}
            >
              <input
                type="radio"
                name="need"
                value={option}
                checked={need === option}
                onChange={() => setNeed(option)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "block h-2 w-2 shrink-0",
                  need === option ? "bg-accent" : "bg-line-hard",
                )}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Additional details" hint="optional" htmlFor={`${id}-details`}>
        <textarea
          id={`${id}-details`}
          name="details"
          rows={4}
          placeholder="What the business does, what you want the site to do, anything we should know."
          className={cn(fieldBase, "resize-y")}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-6">
        <Button
          type="submit"
          size="lg"
          withArrow
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="label-mono"
        >
          {status === "submitting" ? "Sending…" : "Start my project"}
        </Button>
        <p className="max-w-[32ch] text-[0.875rem] leading-relaxed text-dim">
          No obligation. We&rsquo;ll reply with questions and a timeline.
        </p>
      </div>

      <p role="status" aria-live="polite" className="min-h-5 text-[0.9375rem]">
        {status === "error" && error ? (
          <span className="text-accent-lift">{error}</span>
        ) : null}
      </p>
    </form>
  );
}
