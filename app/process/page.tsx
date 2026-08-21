import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section, Ticks } from "@/components/ui/Section";
import Process from "@/sections/Process";
import Faq from "@/sections/Faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Process",
  description:
    "How a Better Built website gets made: one conversation, a build, a review, and a launch — usually two to three weeks from start to live.",
  path: "/process",
});

const expectations = [
  {
    title: "What we need from you",
    items: [
      "A conversation about the business",
      "Your logo, if you have one",
      "Photos you want used",
      "The services you want featured",
    ],
  },
  {
    title: "What we handle",
    items: [
      "Design and build",
      "Page structure and content layout",
      "Forms and contact points",
      "Domain, hosting, and launch",
    ],
  },
  {
    title: "What happens after",
    items: [
      "The site is yours to keep",
      "Updates on request, if you want them",
      "No lock-in and no contract",
      "Your domain stays in your name",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        lines={["Process"]}
        lede="Most business websites launch two to three weeks after the first conversation. Here's exactly what happens in between."
        meta={[
          { label: "Stages", value: "Four" },
          { label: "Typical duration", value: "2–3 weeks" },
          { label: "Contract", value: "None" },
        ]}
      />

      <Process withCta={false} />

      <Section surface="deck" rule className="pt-[clamp(2rem,4vw,3.5rem)]">
        <Container>
          <Reveal>
            <Eyebrow>What to expect</Eyebrow>
            <h2 className="display-xl mt-7 max-w-[15ch] text-chalk">
              No mystery, no long forms.
            </h2>
          </Reveal>

          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-8 md:grid-cols-3">
            {expectations.map((group, i) => (
              <Reveal key={group.title} delay={i * 80}>
                <Ticks className="group h-full">
                  <div className="h-full rounded-lg border border-line bg-card p-6 transition-colors duration-500 hover:border-line-hard">
                    <h3 className="display-md text-chalk">{group.title}</h3>
                    <ul className="mt-6 border-t border-line-soft">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 border-b border-line-soft py-3 text-[0.9375rem] text-slate"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.62em] h-px w-3 shrink-0 bg-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Ticks>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Faq surface="void" className="pt-[clamp(2rem,4vw,3.5rem)]" />
    </>
  );
}
