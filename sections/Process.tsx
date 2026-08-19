import ProcessTimeline from "@/components/home/ProcessTimeline";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";

export default function Process({
  withCta = true,
  surface = "void",
}: {
  withCta?: boolean;
  surface?: "void" | "deck";
}) {
  return (
    <Section surface={surface} id="process" rule>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="display-xl mt-7 max-w-[13ch] text-chalk">
              Four steps. No surprises.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[36ch] text-[1.0625rem] leading-relaxed text-slate">
              Most websites launch in two to three weeks. You&rsquo;ll know where the
              project stands the whole way through.
            </p>
          </Reveal>
        </div>

        <ProcessTimeline tone={surface} />

        {withCta ? (
          <Reveal delay={80}>
            <div className="mt-12">
              <ButtonLink href="/contact" size="lg" withArrow className="label-mono">
                Start your project
              </ButtonLink>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
