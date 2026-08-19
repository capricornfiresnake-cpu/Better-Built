"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/components/ui/useInView";
import { cn } from "@/lib/utils";

/**
 * THE SIGNATURE
 * =============
 *
 * A site being built, in about two seconds: the drafting grid draws itself,
 * interface components snap into position with their labels, and the whole
 * wireframe then dissolves into the real, finished website underneath.
 *
 * It is the studio's one claim — we don't decorate websites, we build them —
 * expressed as the thing itself rather than as a sentence about it. It is also
 * the portfolio: the payoff is always a real screenshot of real client work.
 *
 * Everything here is CSS keyframes on transform and opacity. Reduced motion
 * lands on the final frame immediately: the finished site, no assembly.
 */

const START = 120;
const GRID_MS = 520;
const BLOCK_START = START + 380;
const BLOCK_STAGGER = 95;
const DISSOLVE = 1280;

/** The skeleton that assembles. Percentages of the frame. */
const blocks = [
  { label: "Nav", x: 4, y: 5, w: 92, h: 8 },
  { label: "Hero", x: 4, y: 17, w: 56, h: 34 },
  { label: "Media", x: 63, y: 17, w: 33, h: 34 },
  { label: "Grid", x: 4, y: 55, w: 56, h: 26 },
  { label: "CTA", x: 63, y: 55, w: 33, h: 26 },
];

export default function BuildAnimation({
  children,
  trigger = "view",
  className,
  /** Turns off the assembly entirely — the frame just shows its content. */
  still = false,
}: {
  children: ReactNode;
  trigger?: "mount" | "view";
  className?: string;
  still?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const run = still ? false : trigger === "mount" || inView;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* The finished website. Fades up as the wireframe dissolves. */}
      <div
        className={cn(run && "opacity-0")}
        style={
          run
            ? {
                animation: `bb-fade-in 620ms cubic-bezier(0.16,1,0.3,1) ${DISSOLVE}ms both`,
              }
            : undefined
        }
      >
        {children}
      </div>

      {run ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-void/92"
          style={{
            animation: `bb-fade-out 520ms cubic-bezier(0.16,1,0.3,1) ${DISSOLVE + 120}ms both`,
          }}
        >
          {/* Drafting grid */}
          <div className="absolute inset-0">
            {[20, 40, 60, 80].map((pct, i) => (
              <span
                key={`h${pct}`}
                className="absolute left-0 right-0 h-px origin-left bg-accent/25"
                style={{
                  top: `${pct}%`,
                  animation: `bb-draw-x ${GRID_MS}ms cubic-bezier(0.16,1,0.3,1) ${START + i * 55}ms both`,
                }}
              />
            ))}
            {[25, 50, 75].map((pct, i) => (
              <span
                key={`v${pct}`}
                className="absolute bottom-0 top-0 w-px origin-top bg-accent/25"
                style={{
                  left: `${pct}%`,
                  animation: `bb-draw-y ${GRID_MS}ms cubic-bezier(0.16,1,0.3,1) ${START + 90 + i * 55}ms both`,
                }}
              />
            ))}
          </div>

          {/* Components snapping into place */}
          {blocks.map((block, i) => (
            <div
              key={block.label}
              className="absolute border border-accent/45 bg-accent/6"
              style={
                {
                  left: `${block.x}%`,
                  top: `${block.y}%`,
                  width: `${block.w}%`,
                  height: `${block.h}%`,
                  animation: `bb-snap 460ms cubic-bezier(0.16,1,0.3,1) ${BLOCK_START + i * BLOCK_STAGGER}ms both`,
                } as CSSProperties
              }
            >
              <span
                className="absolute left-1 top-1 font-mono text-[7px] uppercase leading-none tracking-[0.18em] text-accent-lift sm:text-[8px]"
                style={{ letterSpacing: "0.18em" }}
              >
                {block.label}
              </span>
            </div>
          ))}

          {/* One pass of the scanner, timed to the dissolve. */}
          <span
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent/12 to-transparent"
            style={{
              animation: `bb-sweep 900ms cubic-bezier(0.76,0,0.24,1) ${BLOCK_START + 260}ms both`,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
