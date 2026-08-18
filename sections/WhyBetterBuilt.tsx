import Reveal from "@/components/ui/Reveal";
import { Container, CropMarks, Eyebrow, Section } from "@/components/ui/Section";

const outcomes = [
  {
    title: "Look the part",
    body: "A current, well-built site tells people you take the business seriously before they read a word.",
  },
  {
    title: "Earn trust faster",
    body: "Clear structure, real answers, and no dead ends. Visitors decide within seconds — give them a reason to stay.",
  },
  {
    title: "Be easy to contact",
    body: "Phone, form, or booking, always within reach. Most sites lose customers here.",
  },
  {
    title: "Show the work",
    body: "Services and products presented properly, so people understand what they're buying.",
  },
  {
    title: "Compete above your size",
    body: "A small business with a well-made website reads as the more established option.",
  },
  {
    title: "Make a first impression once",
    body: "For most businesses the website is the first impression. It's worth getting right.",
  },
];

export default function WhyBetterBuilt() {
  return (
    <Section surface="paper" id="why">
      <Container>
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Why Better Built</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <p className="display-lg mt-7 max-w-[19ch] text-ink-900">
                A dated website makes a good business look like a risk.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-8 max-w-[46ch] space-y-5 text-[1.0625rem] leading-relaxed text-ink-900/65">
                <p>
                  Most people meet a business online before they ever meet it in person.
                  If that first look is slow, confusing, or ten years old, it quietly
                  costs work the business already earned.
                </p>
                <p>
                  Better Built exists to fix that. We build sites that represent the
                  business properly — and then get out of the way so it can do its job.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {outcomes.map((item, i) => (
                <Reveal key={item.title} delay={i * 55}>
                  <CropMarks className="text-ink-900 p-5">
                    <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-900/60">
                      {item.body}
                    </p>
                  </CropMarks>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
