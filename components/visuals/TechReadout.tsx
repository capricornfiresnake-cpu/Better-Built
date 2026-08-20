"use client";

import { AT, DONE, PHASES } from "./useBuildPhases";
import { cn } from "@/lib/utils";

/**
 * The readout beside the build.
 *
 * Everything here reports the animation next to it: the stage number, the
 * components as they are placed, the progress bar, and the breakpoints
 * confirmed at the OPTIMIZE stage. Nothing is invented — there is deliberately
 * no performance score, because a number nobody can check is worth less than
 * the site loading quickly in front of you.
 */

/** The components the sequence actually assembles, in the order it places them. */
const COMPONENTS = [
  { name: "Navigation", at: 0.1 },
  { name: "Hero", at: 0.2 },
  { name: "Media", at: 0.31 },
  { name: "Cards", at: 0.42 },
];

const SEGMENTS = 14;

function Tick({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 10 10"
      aria-hidden="true"
      className={cn(
        "h-2.5 w-2.5 shrink-0 transition-colors duration-400",
        on ? "text-accent" : "text-line-hard",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M1 5.4l2.6 2.6L9 2.2" strokeLinecap="square" />
    </svg>
  );
}

export default function TechReadout({
  phase,
  progress,
  className,
}: {
  phase: number;
  progress: number;
  className?: string;
}) {
  const stage = Math.min(Math.max(phase, 0), PHASES.length - 1);
  const finished = phase >= DONE;
  const percent = Math.round(progress * 100);
  const filled = Math.round(progress * SEGMENTS);
  const responsive = phase >= AT.optimize;

  return (
    <aside
      aria-hidden="true"
      className={cn(
        "flex h-full flex-col gap-5 rounded-lg border border-line bg-card/60 p-4",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="label-mono-sm text-dim">Build</span>
        <span className="label-mono-sm text-accent-lift tabular-nums">
          {finished ? "Complete" : `${String(stage + 1).padStart(2, "0")} / 0${PHASES.length}`}
        </span>
      </div>

      <div className="hidden border-t border-line-soft pt-4 lg:block">
        <p className="label-mono-sm text-dim">Components</p>
        <ul className="mt-3 space-y-2">
          {COMPONENTS.map((component) => {
            const placed = progress >= component.at;
            return (
              <li key={component.name} className="flex items-center gap-2.5">
                <Tick on={placed} />
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-[0.08em] transition-colors duration-400",
                    placed ? "text-slate" : "text-dim",
                  )}
                >
                  {component.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-line-soft pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="label-mono-sm text-dim">Status</span>
          <span className="label-mono-sm text-slate tabular-nums">{percent}%</span>
        </div>
        <div className="mt-3 flex gap-[3px]">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 flex-1 rounded-[1px] transition-colors duration-300",
                i < filled ? "bg-accent" : "bg-white/8",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-line-soft pt-4">
        <p className="label-mono-sm text-dim">Responsive</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {["Mobile", "Tablet", "Desktop"].map((size) => (
            <li key={size} className="flex items-center gap-1.5">
              <Tick on={responsive} />
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.08em] transition-colors duration-400",
                  responsive ? "text-slate" : "text-dim",
                )}
              >
                {size}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
}
