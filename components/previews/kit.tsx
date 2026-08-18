import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared primitives for the miniature websites in the portfolio.
 *
 * Everything here is drawn with CSS — no photography. That keeps the concept
 * work honest (no stock imagery standing in for a client's real premises),
 * keeps every preview weightless, and lets each project carry a genuinely
 * different visual identity.
 */

export type PlateVariant = "mesh" | "arc" | "ridge" | "sweep" | "column";

/**
 * An abstract image plate standing in for photography inside a preview.
 * `a`/`b`/`c` are the brand colors it is composed from.
 */
export function Plate({
  a,
  b,
  c,
  variant = "mesh",
  className,
  style,
  children,
}: {
  a: string;
  b: string;
  c?: string;
  variant?: PlateVariant;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const third = c ?? b;

  const backgrounds: Record<PlateVariant, string> = {
    mesh: [
      `radial-gradient(120% 95% at 14% 8%, ${a} 0%, transparent 58%)`,
      `radial-gradient(105% 105% at 88% 84%, ${third} 0%, transparent 62%)`,
      `linear-gradient(148deg, ${b} 0%, ${a} 100%)`,
    ].join(","),
    arc: [
      `radial-gradient(70% 90% at 50% 118%, ${third} 0%, transparent 64%)`,
      `radial-gradient(90% 70% at 50% -22%, ${a} 0%, transparent 60%)`,
      `linear-gradient(180deg, ${b} 0%, ${a} 100%)`,
    ].join(","),
    ridge: [
      `linear-gradient(112deg, transparent 38%, ${third} 38.6%, ${third} 47%, transparent 47.6%)`,
      `linear-gradient(112deg, transparent 62%, ${a} 62.6%, ${a} 68%, transparent 68.6%)`,
      `linear-gradient(196deg, ${b} 0%, ${a} 100%)`,
    ].join(","),
    sweep: [
      `radial-gradient(85% 130% at 80% 6%, ${third} 0%, transparent 56%)`,
      `radial-gradient(130% 95% at 8% 96%, ${a} 0%, transparent 60%)`,
      `linear-gradient(212deg, ${b} 8%, ${a} 100%)`,
    ].join(","),
    column: [
      `linear-gradient(90deg, ${a} 0 33%, ${b} 33% 66%, ${third} 66% 100%)`,
      `linear-gradient(180deg, ${b}, ${a})`,
    ].join(","),
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: backgrounds[variant], ...style }}
      aria-hidden="true"
    >
      <span className="grain" />
      <span
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, transparent 42%, rgba(0,0,0,0.14) 100%)",
        }}
      />
      {children}
    </div>
  );
}

/** Thin brand rule used inside previews. */
export function PRule({
  color,
  className,
  style,
}: {
  color: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("block h-px w-full", className)}
      style={{ backgroundColor: color, ...style }}
    />
  );
}

/** Root of every preview: sets the fixed design canvas and base type. */
export function PreviewRoot({
  children,
  bg,
  color,
  font,
  className,
}: {
  children: ReactNode;
  bg: string;
  color: string;
  font: string;
  className?: string;
}) {
  return (
    <div
      className={cn("h-full w-full overflow-hidden", className)}
      style={{
        backgroundColor: bg,
        color,
        fontFamily: font,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </div>
  );
}
