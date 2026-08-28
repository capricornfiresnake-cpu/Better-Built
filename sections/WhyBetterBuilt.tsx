import ServiceTransformation from "@/components/services/ServiceTransformation";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";

/**
 * Three statements, not a list of benefits. A set rather than a sequence, so
 * nothing here is numbered — and short enough that the page can be read
 * standing up.
 */
const outcomes = [
  {
    title: "Look the part",
    body: "Your website should reflect the quality of your business.",
  },
  {
    title: "Earn trust",
    body: "Give customers a reason to choose you before they ever call.",
  },
  {
    title: "Get chosen",
    body: "Make it obvious what you do and how to work with you.",
  },
];

export default function WhyBetterBuilt({
  surface = "void",
  className,
}: {
  surface?: "void" | "deck";
  className?: string;
}) {
  return (
    <Section surface={surface} id="why" rule className={className}>
      <Container>
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Why Better Built</Eyebrow>
            </Reveal>

            <AnimatedText
              as="h2"
              className="display-xl mt-8 text-chalk"
              lines={["A dated website", "makes a good business", "look like a risk."]}
            />
          </div>

          <Reveal delay={160} className="lg:col-span-6 lg:pb-2">
            <div className="max-w-[46ch] space-y-5 text-[1.0625rem] leading-relaxed text-slate">
              <p>
                Most people meet a business online before they ever meet it in person.
                If that first impression is slow, confusing, or outdated, customers
                may move on before they ever contact you.
              </p>
              <p className="text-chalk">
                Better Built exists to fix that — and then to get out of the way so the
                business can do its job.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-[clamp(3rem,6vw,5rem)] grid border-t border-line md:grid-cols-3">
          {outcomes.map((item, i) => (
            <li
              key={item.title}
              className="group border-b border-line md:border-b-0 md:border-r md:border-line md:last:border-r-0"
            >
              <Reveal delay={i * 90}>
                <div className="relative h-full py-8 md:px-6 md:first:pl-0 md:last:pr-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                  />
                  <h3 className="display-md text-chalk">{item.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-[1rem] leading-relaxed text-slate">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="mx-auto mt-[clamp(3rem,6vw,5rem)] max-w-[860px]">
            <ServiceTransformation id="design" name="Custom Website Design" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
