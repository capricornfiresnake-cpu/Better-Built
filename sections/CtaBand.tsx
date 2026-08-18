import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  surface?: "ink" | "ink-deep" | "paper" | "paper-dim";
};

/** Reusable closing band. Each placement gets its own wording, not a repeat. */
export default function CtaBand({
  eyebrow,
  title,
  body,
  cta,
  secondary,
  surface = "ink-deep",
}: CtaBandProps) {
  const dark = surface.startsWith("ink");

  return (
    <Section surface={surface} size="tight">
      <Container>
        <div className="grid items-end gap-x-12 gap-y-9 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {eyebrow ? (
              <Reveal>
                <p className="label-mono flex items-center gap-3 text-current/70">
                  <span aria-hidden="true" className="block h-px w-8 bg-brass" />
                  {eyebrow}
                </p>
              </Reveal>
            ) : null}
            <Reveal delay={60}>
              <h2 className="display-xl mt-6 max-w-[18ch]">{title}</h2>
            </Reveal>
            {body ? (
              <Reveal delay={120}>
                <p className="lede mt-6 max-w-[46ch] text-current/70">{body}</p>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={160} className="lg:col-span-5 lg:justify-self-end">
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink
                href={cta.href}
                tone={dark ? "dark" : "light"}
                size="lg"
                withArrow
              >
                {cta.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink
                  href={secondary.href}
                  tone={dark ? "dark" : "light"}
                  variant="secondary"
                  size="lg"
                >
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
