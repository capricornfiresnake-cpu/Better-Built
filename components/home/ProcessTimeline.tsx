"use client";

import { useEffect, useRef, useState } from "react";

import { processSteps } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Four steps with a rail that draws as the section passes the viewport.
 * The numbering is real information here — the steps happen in this order.
 */
export default function ProcessTimeline() {
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
      const anchor = window.innerHeight * 0.62;
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

  return (
    <ol ref={containerRef} className="relative mt-[clamp(3rem,6vw,4.5rem)]">
      {/* Rail */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 hidden h-full w-px bg-paper/15 sm:block"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 hidden w-px origin-top bg-brass transition-[height] duration-300 ease-linear sm:block"
        style={{ height: `${progress * 100}%` }}
      />

      {processSteps.map((step, i) => {
        const active = progress >= (i + 0.35) / processSteps.length;

        return (
          <li
            key={step.number}
            className="relative grid gap-y-4 border-b border-paper/10 py-[clamp(2rem,4vw,3rem)] last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6 sm:pl-8 lg:grid-cols-[7rem_minmax(0,22rem)_minmax(0,1fr)] lg:gap-x-10"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-[3px] top-[calc(clamp(2rem,4vw,3rem)+0.55rem)] hidden h-[7px] w-[7px] transition-colors duration-500 sm:block",
                active ? "bg-brass" : "bg-paper/25",
              )}
            />

            <span
              className={cn(
                "label-mono pt-1.5 transition-colors duration-500",
                active ? "text-brass" : "text-paper/55",
              )}
            >
              {step.number}
            </span>

            <h3
              className={cn(
                "display-md transition-colors duration-500 lg:col-start-2",
                active ? "text-paper" : "text-paper/55",
              )}
            >
              {step.title}
            </h3>

            <div className="max-w-[46ch] sm:col-start-2 lg:col-start-3 lg:row-start-1">
              <p className="text-[1.0625rem] leading-relaxed text-paper/75">{step.body}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/55">
                {step.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
