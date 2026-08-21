"use client";

import { DONE, PHASES } from "./useBuildPhases";
import { cn } from "@/lib/utils";

/**
 * The five stages of a build, lighting up as the frame beside them is built,
 * and resolving to BUILT when it lands.
 *
 * The words are the studio's process, not a caption for the animation — the
 * same five stages the Process page describes at length. Numbering is real
 * information here: these happen in this order.
 */
export default function BuildLadder({
  phase,
  className,
}: {
  phase: number;
  className?: string;
}) {
  const finished = phase >= DONE;

  return (
    <div className={cn("border-t border-line", className)}>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {PHASES.map((item, i) => {
          const active = phase === i;
          const passed = phase > i;
          const reached = active || passed;

          return (
            <li key={item.key} className="relative border-b border-line-soft lg:border-b-0">
              {/* Fills while this stage runs, then stays. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-0 h-px w-full origin-left bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  reached ? "scale-x-100" : "scale-x-0",
                )}
              />
              <div className="flex items-center gap-2.5 py-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-1.5 w-1.5 shrink-0 transition-colors duration-500",
                    reached ? "bg-accent" : "bg-line-hard",
                  )}
                />
                <span
                  className={cn(
                    "label-mono transition-colors duration-500",
                    active ? "text-chalk" : reached ? "text-slate" : "text-dim",
                  )}
                >
                  {item.label}
                </span>
              </div>
            </li>
          );
        })}

        {/* The payoff. */}
        <li className="relative border-b border-line-soft lg:border-b-0">
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-0 h-px w-full origin-left bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              finished ? "scale-x-100" : "scale-x-0",
            )}
          />
          <div className="flex items-center gap-2.5 py-4">
            <span
              aria-hidden="true"
              className={cn(
                "block h-1.5 w-1.5 transition-colors duration-500",
                finished ? "bg-accent" : "bg-line-hard",
              )}
            />
            <span
              className={cn(
                "label-mono transition-colors duration-500",
                finished ? "text-chalk" : "text-dim",
              )}
            >
              {finished ? "Built" : "Building"}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
