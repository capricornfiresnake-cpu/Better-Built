import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import Pricing from "@/sections/Pricing";
import Faq from "@/sections/Faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pricing",
  description:
    "A complete custom business website for $800, one time. Optional ongoing updates at $125/month, or $89/month billed annually.",
  path: "/pricing",
});

const comparisons = [
  {
    title: "What $800 covers",
    body: "Design, build, and launch of a complete business website. One payment, made once, before the site goes live.",
  },
  {
    title: "What it doesn't cover",
    body: "Your domain and hosting are billed by the provider in your name — usually a small monthly cost. We set both up for you.",
  },
  {
    title: "When updates make sense",
    body: "If your services, prices, or photos change often, a support plan is cheaper than one-off requests. If they don't, skip it.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        lines={["Premium work.", "Plain pricing."]}
        lede="You'll know the full cost before we start, and it won't move once we do."
        meta={[
          { label: "Website", value: "$800 one-time" },
          { label: "Updates", value: "$125/mo" },
          { label: "Annual", value: "$89/mo" },
        ]}
      />

      <Pricing />

      <Section surface="void" rule className="pb-[clamp(2rem,4vw,3.5rem)]">
        <Container>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>The honest version</Eyebrow>
              <h2 className="display-xl mt-7 max-w-[13ch] text-chalk">
                What the price does and doesn&rsquo;t include.
              </h2>
            </Reveal>

            <div className="lg:col-span-8">
              <div className="border-t border-line">
                {comparisons.map((item, i) => (
                  <Reveal key={item.title} delay={i * 70}>
                    <div className="group grid gap-x-8 gap-y-3 border-b border-line py-8 sm:grid-cols-[minmax(0,17rem)_1fr]">
                      <h3 className="display-md text-chalk transition-colors duration-400 group-hover:text-accent-lift">
                        {item.title}
                      </h3>
                      <p className="max-w-[52ch] text-[1rem] leading-relaxed text-slate">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Faq surface="deck" className="pt-[clamp(2rem,4vw,3.5rem)]" />
    </>
  );
}
