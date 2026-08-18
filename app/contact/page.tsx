import ContactForm from "@/components/forms/ContactForm";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { processSteps } from "@/data/services";
import { websitePlan } from "@/data/pricing";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Start Your Project",
  description:
    "Tell Better Built about your business and we'll come back with a plan and a timeline. Websites from $800, one time.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start your project"
        title="Tell us about your business."
        lede="A few details is all we need. We'll reply with questions, a plan, and a timeline — usually the same day."
      />

      <Section surface="paper" size="tight" className="pt-0">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <div className="lg:col-span-5 lg:pl-8">
              <Reveal delay={100}>
                <div className="border-t border-ink-900/12 pt-6">
                  <p className="label-mono text-ink-900/60">The offer</p>
                  <p className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.045em]">
                      {websitePlan.price}
                    </span>
                    <span className="label-mono text-ink-900/60">one-time</span>
                  </p>
                  <p className="mt-4 max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-900/60">
                    A complete custom website — designed, built, and launched. Ongoing
                    updates are optional and separate.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="mt-10 border-t border-ink-900/12 pt-6">
                  <p className="label-mono text-ink-900/60">What happens next</p>
                  <ol className="mt-5 space-y-4">
                    {processSteps.map((step) => (
                      <li key={step.number} className="flex gap-4">
                        <span className="label-mono mt-1 shrink-0 text-brass-deep">
                          {step.number}
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-ink-900/70">
                          {step.title}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-10 border-t border-ink-900/12 pt-6">
                  <p className="label-mono text-ink-900/60">Prefer email?</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline mt-4 inline-block font-display text-[1.25rem] tracking-[-0.03em]"
                  >
                    {site.email}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
