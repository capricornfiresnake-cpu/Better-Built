import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import CtaBand from "@/sections/CtaBand";
import Process from "@/sections/Process";
import { services } from "@/data/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Custom website design, mobile-first development, conversion-focused layouts, SEO foundations, launch, and ongoing updates — everything a business website needs from Better Built.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Six things, done properly."
        lede="Every project includes all of it. There are no tiers to compare and nothing held back for a bigger package."
      />

      <Section surface="paper" size="tight" className="pt-0">
        <Container>
          <div className="border-t border-ink-900/12">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) * 60}>
                <article
                  id={service.id}
                  className="grid scroll-mt-28 gap-x-12 gap-y-6 border-b border-ink-900/12 py-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-12"
                >
                  <div className="lg:col-span-4">
                    <h2 className="display-lg max-w-[14ch]">{service.title}</h2>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="text-[1.125rem] leading-relaxed text-ink-900/80">
                      {service.short}
                    </p>
                    <p className="mt-4 max-w-[50ch] text-[1rem] leading-relaxed text-ink-900/60">
                      {service.body}
                    </p>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="label-mono text-ink-900/60">Includes</p>
                    <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-ink-900/70">
                      {service.includes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.62em] h-px w-3 shrink-0 bg-brass-deep"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Process withCta={false} />

      <CtaBand
        eyebrow="Get started"
        title="Tell us what your business needs."
        body="One conversation is usually enough for us to come back with a plan and a timeline."
        cta={{ label: "Build My Website", href: "/contact" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
