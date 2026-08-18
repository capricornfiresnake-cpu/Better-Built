import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import CtaBand from "@/sections/CtaBand";
import Pricing from "@/sections/Pricing";
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
        title="Premium work. Plain pricing."
        lede="You'll know the full cost before we start, and it won't move once we do."
      />

      <Pricing />

      <Section surface="paper">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>The honest version</Eyebrow>
              <h2 className="display-xl mt-6 max-w-[13ch]">
                What the price does and doesn&rsquo;t include.
              </h2>
            </Reveal>

            <div className="lg:col-span-8">
              <div className="border-t border-ink-900/12">
                {comparisons.map((item, i) => (
                  <Reveal key={item.title} delay={i * 70}>
                    <div className="grid gap-x-8 gap-y-3 border-b border-ink-900/12 py-8 sm:grid-cols-[minmax(0,18rem)_1fr]">
                      <h3 className="display-md">{item.title}</h3>
                      <p className="max-w-[52ch] text-[1rem] leading-relaxed text-ink-900/65">
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

      <CtaBand
        eyebrow="Ready when you are"
        title="Let's build something your business can be proud of."
        cta={{ label: "Build My Website", href: "/contact" }}
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}
