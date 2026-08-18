import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Container, CropMarks, Eyebrow, Section } from "@/components/ui/Section";
import CtaBand from "@/sections/CtaBand";
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
        title="From first call to live site."
        lede="Most business websites launch two to three weeks after the first conversation. Here's exactly what happens in between."
      />

      <Process withCta={false} />

      <Section surface="paper">
        <Container>
          <Reveal>
            <Eyebrow>What to expect</Eyebrow>
            <h2 className="display-xl mt-6 max-w-[16ch]">
              No mystery, no long forms.
            </h2>
          </Reveal>

          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-8 md:grid-cols-3">
            {expectations.map((group, i) => (
              <Reveal key={group.title} delay={i * 80}>
                <CropMarks className="h-full text-ink-900">
                  <div className="h-full p-6">
                    <h3 className="display-md">{group.title}</h3>
                    <ul className="mt-6 space-y-3 text-[0.9375rem] text-ink-900/65">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 border-b border-ink-900/10 pb-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.62em] h-px w-3 shrink-0 bg-brass-deep"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CropMarks>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Faq surface="paper-dim" />

      <CtaBand
        eyebrow="Step one"
        title="Tell us about your business."
        body="It starts with a short conversation. No commitment, no sales script."
        cta={{ label: "Start My Project", href: "/contact" }}
      />
    </>
  );
}
