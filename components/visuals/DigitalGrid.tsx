import { cn } from "@/lib/utils";

/**
 * The ambient blueprint field.
 *
 * Drawn in the accent at very low opacity and masked to a soft ellipse, so it
 * reads as the surface the content is drafted on rather than as a pattern.
 * Purely decorative — always `aria-hidden`, never carries meaning.
 */
export default function DigitalGrid({
  size = 72,
  origin = { x: "50%", y: "0%" },
  className,
}: {
  /** Grid pitch in pixels. */
  size?: number;
  /** Where the mask is brightest. */
  origin?: { x: string; y: string };
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("blueprint", className)}
      style={
        {
          "--bp-size": `${size}px`,
          "--bp-x": origin.x,
          "--bp-y": origin.y,
        } as React.CSSProperties
      }
    />
  );
}

/**
 * A pool of accent light. Deliberately rare — the site uses it twice.
 */
export function Glow({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div aria-hidden="true" className={cn("glow", className)} style={style} />;
}
