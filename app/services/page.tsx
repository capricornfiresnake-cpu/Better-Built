import PageHeader from "@/components/layout/PageHeader";
import ServiceTransformation from "@/components/services/ServiceTransformation";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { services } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
        lines={["Services"]}
        lede="Every project includes all six. There are no tiers to compare and nothing held back for a bigger package."
        meta={[
          { label: "Included", value: "All six" },
          { label: "Tiers", value: "None" },
          { label: "Typical build", value: "2–3 weeks" },
        ]}
      />

      <Section surface="deck" size="tight">
        <Container>
          <div className="border-t border-line">
            {services.map((service, i) => {
              const flip = i % 2 === 1;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="grid scroll-mt-28 items-center gap-x-14 gap-y-10 border-b border-line py-[clamp(3rem,6vw,5.5rem)] lg:grid-cols-12"
                >
                  <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
                    <Reveal>
                      <div className="flex items-center gap-4">
                        <span className="label-mono text-accent-lift">{service.code}</span>
                        <span aria-hidden="true" className="h-px w-10 bg-line-hard" />
                      </div>

                      <h2 className="display-lg mt-6 max-w-[15ch] text-chalk">
                        {service.title}
                      </h2>

                      <p className="mt-6 max-w-[42ch] text-[1.125rem] leading-relaxed text-chalk">
                        {service.short}
                      </p>

                      <p className="mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-slate">
                        {service.body}
                      </p>
                    </Reveal>

                    <Reveal delay={120}>
                      <ul className="mt-8 border-t border-line-soft">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 border-b border-line-soft py-3 text-[0.9375rem] text-slate"
                          >
                            <span
                              aria-hidden="true"
                              className="block h-px w-3 shrink-0 bg-accent"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  </div>

                  <Reveal
                    delay={80}
                    className={cn("lg:col-span-6", flip && "lg:order-1")}
                  >
                    <ServiceTransformation id={service.id} name={service.title} />
                  </Reveal>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section surface="void" rule>
        <Container>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Imagery</Eyebrow>
              <h2 className="display-xl mt-7 max-w-[14ch] text-chalk">
                No photos? We&rsquo;ll work with what you have.
              </h2>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <p className="max-w-[52ch] text-[1.125rem] leading-relaxed text-chalk">
                  Great imagery makes a site. If you don&rsquo;t have professional photos,
                  we make the most of what you&rsquo;ve got.
                </p>
              </Reveal>

              <Reveal delay={160}>
                <ul className="mt-8 border-t border-line-soft">
                  {[
                    "Editing and cleanup of the photos you already have",
                    "Licensed photography chosen to fit your business",
                    "Custom graphics and backgrounds",
                    "A short list of the shots worth taking on your phone",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-line-soft py-3.5 text-[0.9375rem] text-slate"
                    >
                      <span
                        aria-hidden="true"
                        className="block h-px w-3 shrink-0 bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={220}>
                <p className="mt-7 max-w-[52ch] text-[0.9375rem] leading-relaxed text-dim">
                  Your products, your work, and your results are always shown as they
                  really are.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
