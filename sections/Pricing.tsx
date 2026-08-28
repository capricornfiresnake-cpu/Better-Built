import Link from "next/link";

import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import SecureNote from "@/components/ui/SecureNote";
import { Container, Eyebrow, Section, Ticks } from "@/components/ui/Section";
import DigitalGrid from "@/components/visuals/DigitalGrid";
import { planAction, supportPlans, websitePlan } from "@/data/pricing";
import { cn } from "@/lib/utils";

/** What the one-time price actually buys, in three words. */
const delivery = ["Designed", "Built", "Launched"];

/**
 * The shape of the engagement: you pay once, the site launches, and support is
 * a decision you make afterwards or never. Drawn rather than explained, because
 * the point is that the third box is detached from the first two.
 */
function OwnershipFlow() {
  const stages = [
    { label: "Build", note: "$800 once" },
    { label: "Launch", note: "It's yours" },
    { label: "Support", note: "Optional" },
  ];

  return (
    <ul className="grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-3">
      {stages.map((stage, i) => {
        const optional = i === 2;
        return (
          <li
            key={stage.label}
            className={cn(
              "relative flex items-center gap-3 bg-card px-5 py-5",
              optional && "opacity-70",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-1.5 w-1.5 shrink-0",
                optional ? "bg-line-hard" : "bg-accent",
              )}
            />
            <span
              className={cn(
                "label-mono",
                optional ? "text-dim" : "text-chalk",
              )}
            >
              {stage.label}
            </span>
            <span className="label-mono-sm ml-auto text-dim">{stage.note}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function Pricing({
  surface = "deck",
  showSupport = true,
  className,
}: {
  surface?: "void" | "deck";
  /** The homepage states the one-time price and stops there; /pricing carries
      the ongoing plans. */
  showSupport?: boolean;
  className?: string;
}) {
  const buildAction = planAction(websitePlan);

  return (
    <Section surface={surface} id="pricing" rule className={className}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <div>
            <Reveal>
              <Eyebrow>Pricing</Eyebrow>
            </Reveal>
            <AnimatedText
              as="h2"
              className="display-xl mt-7 text-chalk"
              lines={["One website.", "One price."]}
              label="One website. One price."
            />
          </div>
          <Reveal delay={140}>
            <p className="max-w-[34ch] text-[1.0625rem] leading-relaxed text-slate">
              The number is the number — no packages, no add-ons, no hidden build fees.
              Ongoing support is a separate decision you can make later, or never.
            </p>
          </Reveal>
        </div>

        {/* The build */}
        <Reveal delay={80} mode="settle">
          <Ticks className="mt-[clamp(2.5rem,5vw,4rem)]">
            <div
              id={websitePlan.id}
              className="relative scroll-mt-28 overflow-hidden rounded-lg border border-line bg-card"
            >
              <DigitalGrid size={64} origin={{ x: "22%", y: "0%" }} className="opacity-60" />

              <div className="relative grid gap-y-12 p-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-12 lg:gap-x-16">
                <div className="lg:col-span-6">
                  <p className="label-mono text-accent-lift">The build</p>

                  <p className="numeral mt-7 text-[clamp(4.5rem,13vw,11rem)] text-chalk">
                    {websitePlan.price}
                  </p>
                  <p className="label-mono mt-5 text-slate">
                    {websitePlan.cadence} — {websitePlan.name}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                    {delivery.map((word) => (
                      <li key={word} className="flex items-center gap-2.5">
                        <span aria-hidden="true" className="block h-px w-5 bg-accent" />
                        <span className="label-mono text-chalk">{word}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-9 max-w-[36ch] text-[1.0625rem] leading-relaxed text-slate">
                    {websitePlan.description}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <ButtonLink
                      href={buildAction.href}
                      size="lg"
                      withArrow
                      className="label-mono"
                    >
                      {buildAction.label}
                    </ButtonLink>
                    {buildAction.paying ? <SecureNote /> : null}
                    {buildAction.viaBrief ? (
                      <span className="label-mono-sm text-dim">
                        A few questions first, then payment
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-7 max-w-[38ch] text-[0.875rem] leading-relaxed text-dim">
                    Your domain remains yours. We handle the setup, deployment, and
                    technical connection for you.
                  </p>
                  <p className="mt-3 text-[0.875rem] text-dim">
                    <Link
                      href="/terms#refunds"
                      className="link-underline transition-colors duration-300 hover:text-chalk"
                    >
                      Refunds and cancellations
                    </Link>
                  </p>
                </div>

                <div className="lg:col-span-6">
                  <p className="label-mono text-dim">What&rsquo;s included</p>
                  <ul className="mt-6 grid border-t border-line-soft sm:grid-cols-2 sm:gap-x-10">
                    {websitePlan.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 border-b border-line-soft py-3.5 text-[0.9375rem] text-chalk"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path d="M1.5 6.4l3 3 6-6.5" strokeLinecap="square" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <p className="label-mono text-dim">How it works</p>
                    <div className="mt-5">
                      <OwnershipFlow />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Ticks>
        </Reveal>

        {/* Optional support. The homepage states the one-time price and stops
            there; /pricing is where the ongoing plans belong. */}
        {showSupport ? (
          <div className="mt-[clamp(2.5rem,5vw,4rem)]">
            <Reveal>
              <p className="label-mono text-dim">Optional, after launch</p>
            </Reveal>
  
            <div
              className={cn(
                "mt-6 grid gap-5",
                supportPlans.length > 1 ? "md:grid-cols-2" : "max-w-[34rem]",
              )}
            >
              {supportPlans.map((plan, i) => (
                <Reveal key={plan.id} delay={i * 80}>
                  <div
                    id={plan.id}
                    className={cn(
                      "group flex h-full scroll-mt-28 flex-col rounded-lg border bg-card p-[clamp(1.5rem,3vw,2.25rem)]",
                      "transition-colors duration-500",
                      plan.highlight
                        ? "border-accent/35 hover:border-accent/60"
                        : "border-line hover:border-line-hard",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="display-md text-chalk">{plan.name}</h3>
                      {plan.highlight ? (
                        <span className="label-mono-sm shrink-0 rounded-[3px] border border-accent/40 px-2.5 py-1.5 text-accent-lift">
                          {plan.highlight}
                        </span>
                      ) : null}
                    </div>
  
                    <div className="mt-6 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span className="numeral text-[2.75rem] text-chalk">{plan.price}</span>
                      <span className="text-[0.9375rem] text-slate">{plan.cadence}</span>
                      {plan.note ? (
                        <span className="label-mono-sm text-dim">{plan.note}</span>
                      ) : null}
                    </div>
  
                    <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-slate">
                      {plan.description}
                    </p>
  
                    <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-slate">
                      {plan.includes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.62em] h-px w-3 shrink-0 bg-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
  
                    <div className="mt-auto pt-8">
                      <ButtonLink
                        href={planAction(plan).href}
                        variant="secondary"
                        withArrow
                        className="label-mono"
                      >
                        {planAction(plan).label}
                      </ButtonLink>
                      {planAction(plan).paying ? (
                        <div className="mt-4">
                          <SecureNote />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
  
            <Reveal delay={120}>
              <p className="mt-7 max-w-[54ch] text-[0.875rem] leading-relaxed text-dim">
                Support plans are optional. The website is yours either way, and you can
                start or stop ongoing updates at any point.
              </p>
            </Reveal>
          </div>
        ) : null}

      </Container>
    </Section>
  );
}
