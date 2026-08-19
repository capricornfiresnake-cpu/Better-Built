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
        lines={["Tell us about", "your business."]}
        lede="A few details is all we need. We'll reply with questions, a plan, and a timeline — usually the same day."
      />

      <Section surface="void" size="tight">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <div className="lg:col-span-5 lg:pl-8">
              <Reveal delay={100}>
                <div className="rounded-lg border border-line bg-card p-7">
                  <p className="label-mono text-dim">The offer</p>
                  <p className="mt-5 flex items-baseline gap-3">
                    <span className="numeral text-[3.5rem] text-chalk">
                      {websitePlan.price}
                    </span>
                    <span className="label-mono text-accent-lift">one-time</span>
                  </p>
                  <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-slate">
                    A complete custom website — designed, built, and launched. Ongoing
                    updates are optional and separate.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="mt-10 border-t border-line pt-6">
                  <p className="label-mono text-dim">What happens next</p>
                  <ol className="mt-5 space-y-4">
                    {processSteps.map((step) => (
                      <li key={step.number} className="flex gap-4">
                        <span className="label-mono-sm mt-1 shrink-0 text-accent-lift">
                          {step.number}
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-slate">
                          {step.title}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-10 border-t border-line pt-6">
                  <p className="label-mono text-dim">Prefer email?</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline mt-4 inline-block font-display text-[1.2rem] tracking-[-0.02em] text-chalk [font-variation-settings:'wdth'_100,'wght'_600]"
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
