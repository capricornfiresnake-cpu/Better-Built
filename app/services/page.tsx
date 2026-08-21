import PageHeader from "@/components/layout/PageHeader";
import ServiceTransformation from "@/components/services/ServiceTransformation";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
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
    </>
  );
}
