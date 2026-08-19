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

type Surface = "void" | "deck" | "card";

const surfaces: Record<Surface, string> = {
  void: "bg-void",
  deck: "bg-deck",
  card: "bg-card",
};

/**
 * A sheet in the drawing set.
 *
 * `sheet` draws the two vertical margin rules that run the height of the
 * section — the site's structural constant. `rule` adds the hairline that
 * separates one sheet from the next.
 */
export function Section({
  children,
  surface = "void",
  id,
  className,
  size = "default",
  sheet = true,
  rule = false,
}: {
  children: ReactNode;
  surface?: Surface;
  id?: string;
  className?: string;
  size?: "default" | "tight" | "flush";
  sheet?: boolean;
  rule?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        surfaces[surface],
        sheet && "sheet",
        rule && "border-t border-line-soft",
        size === "default" && "py-(--spacing-section)",
        size === "tight" && "py-[clamp(3.5rem,7vw,7rem)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Monospace kicker. `index` renders a real position — only pass it when the
 * content is genuinely a sequence, never as decoration.
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
    <p className={cn("label-mono flex items-center gap-3 text-dim", className)}>
      {index ? (
        <span className="text-accent-lift">{index}</span>
      ) : (
        <span aria-hidden="true" className="block h-px w-6 bg-accent opacity-70" />
      )}
      <span>{children}</span>
    </p>
  );
}

/** Registration ticks — marks a module as trimmed to size. */
export function Ticks({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("ticks", className)}>
      {children}
      <span className="tick-b" aria-hidden="true" />
    </div>
  );
}

/**
 * The technical annotation strip. Reads like the notes running along the
 * edge of a drawing: short, factual, monospaced.
 */
export function TechMeta({
  items,
  className,
}: {
  items: (string | { label: string; value: string })[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "label-mono-sm flex flex-wrap items-center gap-x-6 gap-y-2 text-dim",
        className,
      )}
    >
      {items.map((item) => {
        const key = typeof item === "string" ? item : `${item.label}${item.value}`;
        return (
          <li key={key} className="flex items-center gap-2">
            {typeof item === "string" ? (
              item
            ) : (
              <>
                <span>{item.label}</span>
                <span className="text-slate">{item.value}</span>
              </>
            )}
          </li>
        );
      })}
    </ul>
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
      <h2 className="display-xl max-w-[18ch] text-chalk">{title}</h2>
      {lede ? <p className="lede max-w-[52ch]">{lede}</p> : null}
    </div>
  );
}
