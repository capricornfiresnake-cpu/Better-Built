import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container-bb", className)}>{children}</div>;
}

type Surface = "paper" | "paper-dim" | "ink" | "ink-deep";

const surfaces: Record<Surface, string> = {
  paper: "bg-paper text-ink-900",
  "paper-dim": "bg-paper-dim text-ink-900",
  ink: "bg-ink-900 text-paper on-ink",
  "ink-deep": "bg-ink-950 text-paper on-ink",
};

export function Section({
  children,
  surface = "paper",
  id,
  className,
  size = "default",
}: {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  className?: string;
  size?: "default" | "tight" | "flush";
}) {
  return (
    <section
      id={id}
      className={cn(
        surfaces[surface],
        size === "default" && "py-(--spacing-section)",
        size === "tight" && "py-[clamp(3.5rem,6vw,6rem)]",
        // `scroll-mt` keeps anchored sections clear of the sticky header
        "scroll-mt-20",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Small monospace kicker. `index` renders the section's position when the
 * content is genuinely sequential; otherwise it is omitted.
 */
export function Eyebrow({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <p className={cn("label-mono flex items-center gap-3 text-current/70", className)}>
      {index ? (
        <>
          <span aria-hidden="true" className="text-brass-deep">
            {index}
          </span>
          <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
        </>
      ) : (
        <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
      )}
      <span>{children}</span>
    </p>
  );
}

/** Adds the four registration ticks that mark a module as "trimmed to size". */
export function CropMarks({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("crop-marks", className)}>
      {children}
      <span className="crop-mark-b" aria-hidden="true" />
    </div>
  );
}

/** Standard section intro: eyebrow, heading, optional lede. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
      <h2 className="display-xl max-w-[18ch]">{title}</h2>
      {lede ? (
        <p className="lede max-w-[52ch] text-current/65">{lede}</p>
      ) : null}
    </div>
  );
}
