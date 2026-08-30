"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  checkoutUrlWith,
  industryOptions,
  needOptions,
  newCheckoutReference,
  websitePlan,
} from "@/data/pricing";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

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
 * The form is the front door to the $1250 build. Answers are delivered first,
 * then the browser goes straight to Stripe — there is no thank-you screen in
 * between, because the Stripe page is the confirmation. Whether the payment
 * actually happened is a question for the Stripe dashboard, which is what the
 * reference carried on the lead is for.
 *
 * The success screen below is the fallback for a build with no checkout link
 * configured. Clear websitePlan.checkoutUrl and the form goes back to being a
 * plain enquiry form.
 */
export default function ContactForm() {
  const id = useId();
  const [need, setNeed] = useState<string>(needOptions[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  /** True once the answers are safely on their way to the inbox. */
  async function deliver(answers: Answers): Promise<boolean> {
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

      return true;
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "That didn't send. Try again, or email us directly.",
      );
      return false;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const answers = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as Answers;

    const buying = Boolean(websitePlan.checkoutUrl);

    /* Goes out with the lead and into Stripe, so a payment can be matched back
       to the person who filled this in. */
    const reference = buying ? newCheckoutReference() : "";

    if (!(await deliver({ ...answers, reference }))) return;

    if (buying) {
      /* Leave for checkout without painting anything first. The status stays
         "submitting", so the button remains disabled while the browser moves. */
      window.location.assign(
        checkoutUrlWith(websitePlan, { email: answers.email, reference }),
      );
      return;
    }

    setStatus("success");
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
        </p>        <button
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
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
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
        <p className="max-w-[34ch] text-[0.875rem] leading-relaxed text-dim">
          {websitePlan.checkoutUrl
            ? "Sending this takes you to secure checkout by Stripe. We'll reply either way."
            : "No obligation. We'll reply with questions and a timeline."}
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
