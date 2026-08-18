"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import { industryOptions, needOptions } from "@/data/pricing";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full border-0 border-b border-ink-900/20 bg-transparent px-0 pb-2.5 pt-1 " +
  "text-[1.0625rem] text-ink-900 placeholder:text-ink-900/30 " +
  "transition-colors duration-300 focus:border-ink-900 focus:outline-none " +
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
    <div className="group">
      <label htmlFor={htmlFor} className="label-mono block text-ink-900/60">
        {label}
        {hint ? <span className="ml-2 normal-case tracking-normal opacity-60">{hint}</span> : null}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/**
 * Lead form. Posts JSON to `/api/lead`, which is the single place to wire up a
 * CRM, email automation, or SMS follow-up — no component changes needed.
 */
export default function ContactForm() {
  const id = useId();
  const [need, setNeed] = useState<string>(needOptions[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(data?.message ?? "That didn't send.");
      }

      form.reset();
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

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-ink-900/12 bg-paper p-[clamp(1.75rem,4vw,3rem)]"
      >
        <p className="label-mono text-brass-deep">Received</p>
        <h2 className="display-lg mt-5 max-w-[18ch]">
          Thanks — we&rsquo;ve got it.
        </h2>
        <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-900/65">
          We&rsquo;ll read through what you sent and come back with a few questions,
          a plan, and a timeline. If anything is urgent, reply to the email we send
          and it&rsquo;ll reach us directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-8 label-mono text-ink-900/60"
        >
          Send another project
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="grid gap-x-10 gap-y-9">
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
            className={cn(fieldBase, "appearance-none pr-6")}
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
        <legend className="label-mono text-ink-900/60">What do you need?</legend>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {needOptions.map((option) => (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-center gap-3 border px-4 py-3.5 text-[0.9375rem] transition-colors duration-300",
                need === option
                  ? "border-ink-900 bg-ink-900 text-paper"
                  : "border-ink-900/15 text-ink-900/70 hover:border-ink-900/45",
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
                  need === option ? "bg-brass" : "bg-ink-900/25",
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
        >
          {status === "submitting" ? "Sending…" : "Start My Project"}
        </Button>
        <p className="max-w-[32ch] text-[0.875rem] leading-relaxed text-ink-900/60">
          No obligation. We&rsquo;ll reply with questions and a timeline.
        </p>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-[0.9375rem]">
        {status === "error" && error ? (
          <span className="text-brass-deep">{error}</span>
        ) : null}
      </p>
    </form>
  );
}
