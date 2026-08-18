import ProcessTimeline from "@/components/home/ProcessTimeline";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";

export default function Process({ withCta = true }: { withCta?: boolean }) {
  return (
    <Section surface="ink" id="process">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <Eyebrow className="text-paper/70">How it works</Eyebrow>
            <h2 className="display-xl mt-6 max-w-[14ch] text-paper">
              Four steps. No surprises.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[36ch] text-[1.0625rem] leading-relaxed text-paper/55">
              Most websites launch in two to three weeks. You&rsquo;ll know where the
              project stands the whole way through.
            </p>
          </Reveal>
        </div>

        <ProcessTimeline />

        {withCta ? (
          <Reveal delay={80}>
            <div className="mt-14">
              <ButtonLink href="/contact" tone="dark" size="lg" withArrow>
                Start your project
              </ButtonLink>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
