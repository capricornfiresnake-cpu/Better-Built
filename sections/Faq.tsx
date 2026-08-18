import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { faqs } from "@/data/services";

/** Native `details`/`summary` — keyboard accessible without a line of JS. */
export default function Faq({
  surface = "paper",
}: {
  surface?: "paper" | "paper-dim";
}) {
  return (
    <Section surface={surface} id="faq">
      <Container>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="display-xl mt-6 max-w-[12ch]">Before you ask.</h2>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="border-t border-ink-900/12">
              {faqs.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 40}>
                  <details className="group border-b border-ink-900/12">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display text-[1.125rem] font-semibold tracking-[-0.025em] transition-colors group-hover:text-brass-deep sm:text-[1.25rem]">
                        {faq.question}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="relative mt-2 h-3 w-3 shrink-0 text-ink-900/60"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                        <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-90" />
                      </span>
                    </summary>
                    <p className="max-w-[62ch] pb-7 text-[1rem] leading-relaxed text-ink-900/65">
                      {faq.answer}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
