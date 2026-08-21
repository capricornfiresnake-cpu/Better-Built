"use client";

import { useEffect, useRef, useState } from "react";

import { processSteps } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * The build timeline.
 *
 * A rail fills as the section passes the viewport and each stage reports its
 * own state — queued, active, complete — the way a build pipeline would. The
 * numbering is real information here: these steps happen in this order, and
 * the status of one depends on the one before it.
 */
export default function ProcessTimeline({ tone = "void" }: { tone?: "void" | "deck" }) {
  const containerRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let frame = 0;

    // With reduced motion the rail is simply shown complete.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = window.requestAnimationFrame(() => setProgress(1));
      return () => window.cancelAnimationFrame(frame);
    }

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const raw = (anchor - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const total = processSteps.length;

  return (
    <div className="mt-[clamp(2.5rem,5vw,4rem)]">
      <div className="flex items-center gap-4 border-b border-line pb-4">
        <span className="label-mono-sm text-dim">Build progress</span>
        <span aria-hidden="true" className="relative h-px flex-1 bg-line">
          <span
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-300 ease-linear"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </span>
        <span className="label-mono-sm w-10 text-right text-accent-lift tabular-nums">
          {Math.round(progress * 100)}%
        </span>
      </div>

      <ol ref={containerRef} className="relative">
        {/* Rail */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 hidden h-full w-px bg-line sm:block"
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 hidden w-px origin-top bg-accent transition-[height] duration-300 ease-linear sm:block"
          style={{ height: `${progress * 100}%` }}
        />

        {processSteps.map((step, i) => {
          const reached = progress >= (i + 0.35) / total;
          const passed = progress >= (i + 1.15) / total;
          const status = passed ? "Complete" : reached ? "Active" : "Queued";

          return (
            <li
              key={step.title}
              className={cn(
                "relative grid gap-y-4 border-b border-line py-[clamp(2rem,4vw,3.25rem)] last:border-b-0",
                "sm:pl-8",
                "lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-x-12",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[3.5px] top-[calc(clamp(2rem,4vw,3.25rem)+0.6rem)] hidden h-[7px] w-[7px] transition-colors duration-500 sm:block",
                  reached ? "bg-accent" : tone === "deck" ? "bg-raise" : "bg-card",
                )}
              />

              <div>
                <h3
                  className={cn(
                    "display-md transition-colors duration-500",
                    reached ? "text-chalk" : "text-slate",
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "label-mono-sm mt-4 transition-colors duration-500",
                    status === "Complete"
                      ? "text-dim"
                      : status === "Active"
                        ? "text-accent-lift"
                        : "text-dim",
                  )}
                >
                  Status — {status}
                </p>
              </div>

              <div className="max-w-[46ch] lg:col-start-2 lg:row-start-1">
                <p className="text-[1.0625rem] leading-relaxed text-chalk">{step.body}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate">
                  {step.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
