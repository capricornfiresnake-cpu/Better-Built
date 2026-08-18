import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { supportPlans, websitePlan } from "@/data/pricing";

export default function Pricing() {
  return (
    <Section surface="paper-dim" id="pricing">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="display-xl mt-6 max-w-[14ch]">
              One website. One price.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[36ch] text-[1.0625rem] leading-relaxed text-ink-900/60">
              The number is the number. Ongoing support is a separate decision you can
              make later, or never.
            </p>
          </Reveal>
        </div>

        {/* The build */}
        <Reveal delay={80}>
          <div
            id={websitePlan.id}
            className="on-ink mt-[clamp(2.5rem,5vw,4rem)] scroll-mt-28 bg-ink-900 text-paper"
          >
            <div className="grid gap-y-12 p-[clamp(1.75rem,4vw,4rem)] lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <p className="label-mono text-brass">The build</p>
                <h3 className="display-lg mt-5 text-paper">{websitePlan.name}</h3>
                <p className="mt-5 max-w-[34ch] text-[1.0625rem] leading-relaxed text-paper/70">
                  {websitePlan.description}
                </p>

                <div className="mt-9 flex items-baseline gap-3">
                  <span className="font-display text-[3.25rem] font-semibold leading-none tracking-[-0.045em] text-paper">
                    {websitePlan.price}
                  </span>
                  <span className="label-mono text-paper/55">{websitePlan.cadence}</span>
                </div>

                <div className="mt-8">
                  <ButtonLink href={websitePlan.cta.href} tone="dark" size="lg" withArrow>
                    {websitePlan.cta.label}
                  </ButtonLink>
                </div>

                <p className="mt-6 max-w-[38ch] text-[0.875rem] leading-relaxed text-paper/55">
                  Hosting and the domain are set up in your name — those are billed by
                  the provider, not by us.
                </p>
              </div>

              <div className="lg:col-span-7">
                <p className="label-mono text-paper/55">What&rsquo;s included</p>
                <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                  {websitePlan.includes.map((item) => (
                    <li
                      key={item}
                      className="border-b border-paper/10 py-3.5 text-[0.9375rem] text-paper/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Optional support */}
        <div className="mt-[clamp(2.5rem,5vw,4rem)]">
          <Reveal>
            <p className="label-mono text-ink-900/60">Optional, after launch</p>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {supportPlans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 80}>
                <div
                  id={plan.id}
                  className="flex h-full scroll-mt-28 flex-col border border-ink-900/12 bg-paper p-[clamp(1.5rem,3vw,2.25rem)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="display-md">{plan.name}</h3>
                    {plan.highlight ? (
                      <span className="label-mono shrink-0 border border-brass-deep/40 px-2.5 py-1.5 text-brass-deep">
                        {plan.highlight}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5 flex items-baseline gap-2.5">
                    <span className="font-display text-[2rem] font-semibold leading-none tracking-[-0.04em]">
                      {plan.price}
                    </span>
                    <span className="text-[0.9375rem] text-ink-900/60">{plan.cadence}</span>
                    {plan.note ? (
                      <span className="label-mono text-ink-900/60">{plan.note}</span>
                    ) : null}
                  </div>

                  <p className="mt-4 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-900/60">
                    {plan.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-ink-900/70">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-px w-3 shrink-0 bg-brass-deep"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-2">
                    <ButtonLink href={plan.cta.href} variant="secondary">
                      {plan.cta.label}
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-6 max-w-[54ch] text-[0.875rem] leading-relaxed text-ink-900/60">
              Support plans are optional. The website is yours either way, and you can
              start or stop ongoing updates at any point.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
