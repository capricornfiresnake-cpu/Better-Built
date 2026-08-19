import type { ReactNode } from "react";

import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import DigitalGrid from "@/components/visuals/DigitalGrid";
import { Container, TechMeta } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * The opening sheet of every interior page. One composition, repeated exactly,
 * so moving between pages feels like turning to the next drawing rather than
 * arriving somewhere else.
 */
export default function PageHeader({
  eyebrow,
  lines,
  lede,
  meta,
  aside,
  className,
}: {
  eyebrow: string;
  /** Explicit line breaks — at display size the break is a composition choice. */
  lines: ReactNode[];
  lede?: ReactNode;
  meta?: (string | { label: string; value: string })[];
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sheet relative overflow-hidden border-b border-line-soft bg-void",
        "pt-[clamp(7.5rem,14vw,11rem)] pb-[clamp(3rem,6vw,5rem)]",
        className,
      )}
    >
      <DigitalGrid size={80} origin={{ x: "72%", y: "0%" }} className="opacity-70" />

      <Container className="relative">
        <Reveal>
          <p className="label-mono flex items-center gap-3 text-dim">
            <span aria-hidden="true" className="block h-px w-8 bg-accent" />
            {eyebrow}
          </p>
        </Reveal>

        <div className="mt-9 grid items-end gap-x-12 gap-y-9 lg:grid-cols-12">
          <AnimatedText
            as="h1"
            delay={120}
            className="display-mega text-chalk lg:col-span-7"
            lines={lines}
          />

          {lede || aside ? (
            <Reveal delay={260} className="lg:col-span-5">
              {lede ? <p className="lede max-w-[42ch]">{lede}</p> : null}
              {aside ? <div className="mt-7">{aside}</div> : null}
            </Reveal>
          ) : null}
        </div>

        {meta?.length ? (
          <Reveal delay={340}>
            <div className="mt-12 border-t border-line-soft pt-5">
              <TechMeta items={meta} />
            </div>
          </Reveal>
        ) : null}
      </Container>
    </header>
  );
}
