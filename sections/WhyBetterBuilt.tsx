import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";

/** A set, not a sequence — so nothing here is numbered. */
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
    <Section surface="void" id="why" rule>
      <Container>
        <div className="grid gap-x-14 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Why Better Built</Eyebrow>
            </Reveal>

            <AnimatedText
              as="h2"
              className="display-xl mt-8 text-chalk"
              lines={["A dated website", "makes a good business", "look like a risk."]}
            />

            <Reveal delay={200}>
              <div className="mt-9 max-w-[46ch] space-y-5 text-[1.0625rem] leading-relaxed text-slate">
                <p>
                  Most people meet a business online before they ever meet it in person.
                  If that first look is slow, confusing, or ten years old, it quietly
                  costs work the business already earned.
                </p>
                <p className="text-chalk">
                  Better Built exists to fix that. We build sites that represent the
                  business properly — and then get out of the way so it can do its job.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <ul className="grid border-t border-line sm:grid-cols-2">
              {outcomes.map((item, i) => (
                <li
                  key={item.title}
                  className="group border-b border-line sm:odd:border-r sm:odd:border-line"
                >
                  <Reveal delay={i * 60}>
                    <div className="relative h-full px-5 py-7 transition-colors duration-500 group-hover:bg-card sm:px-6">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                      />
                      <h3 className="display-sm text-chalk">{item.title}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
