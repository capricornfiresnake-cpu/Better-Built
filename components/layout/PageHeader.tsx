import type { ReactNode } from "react";

import Reveal from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/** Consistent opening block for every interior page. */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "bg-paper pt-[clamp(7.5rem,13vw,10.5rem)] pb-[clamp(2.5rem,5vw,4rem)]",
        className,
      )}
    >
      <Container>
        <Reveal>
          <p className="label-mono flex items-center gap-3 text-ink-900/60">
            <span aria-hidden="true" className="block h-px w-8 bg-brass-deep" />
            {eyebrow}
          </p>
        </Reveal>

        <div className="mt-8 grid items-end gap-x-12 gap-y-8 lg:grid-cols-12">
          <Reveal delay={80} className="lg:col-span-7">
            <h1 className="display-hero max-w-[14ch] text-ink-900">{title}</h1>
          </Reveal>
          {lede || aside ? (
            <Reveal delay={150} className="lg:col-span-5">
              {lede ? (
                <p className="lede max-w-[44ch] text-ink-900/65">{lede}</p>
              ) : null}
              {aside ? <div className="mt-7">{aside}</div> : null}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
