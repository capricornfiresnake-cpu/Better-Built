"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/components/ui/useInView";

/**
 * The build sequence, as data.
 *
 * Five phases, in the order the work actually happens. Everything that reads
 * as "technical metadata" on the site — the ladder, the status bar, the
 * component list — is driven from this one clock, so the readouts are a
 * genuine report of the animation rather than decoration printed beside it.
 */
export const PHASES = [
  { key: "build", label: "Build", ms: 780 },
  { key: "design", label: "Design", ms: 720 },
  { key: "motion", label: "Motion", ms: 640 },
  { key: "optimize", label: "Optimize", ms: 640 },
  { key: "launch", label: "Launch", ms: 760 },
] as const;

export type PhaseKey = (typeof PHASES)[number]["key"];

/** Index of a phase, for `phase >= AT.design` style comparisons. */
export const AT: Record<PhaseKey, number> = {
  build: 0,
  design: 1,
  motion: 2,
  optimize: 3,
  launch: 4,
};

/** The sequence is finished when the phase passes the last one. */
export const DONE = PHASES.length;

const TOTAL = PHASES.reduce((sum, phase) => sum + phase.ms, 0);

/**
 * Runs the sequence once, when it first scrolls into view.
 *
 * Reduced motion lands on the finished state immediately: the completed
 * website, every readout at 100%, no assembly. One rAF loop that stops itself
 * after ~3.5s and never restarts.
 */
export function useBuildPhases() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [phase, setPhase] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [armed, setArmed] = useState(false);
  const frame = useRef(0);

  /**
   * The finished website is hidden until the sequence reaches LAUNCH, so the
   * sequence must not be able to simply never happen. If it has not started
   * within a couple of seconds — an observer that never fired, a browser that
   * doesn't report intersections — it starts anyway. The animation is the
   * decoration; the client's website underneath it is the content.
   */
  useEffect(() => {
    const id = setTimeout(() => setArmed(true), 2200);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!inView && !armed) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame.current = requestAnimationFrame(() => {
        setPhase(DONE);
        setProgress(1);
      });
      return () => cancelAnimationFrame(frame.current);
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(1, elapsed / TOTAL));

      let acc = 0;
      let current: number = DONE;
      for (let i = 0; i < PHASES.length; i++) {
        acc += PHASES[i].ms;
        if (elapsed < acc) {
          current = i;
          break;
        }
      }
      setPhase(current);

      if (elapsed < TOTAL) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [inView, armed]);

  return {
    ref,
    /** -1 before the sequence starts, 0–4 while running, 5 when finished. */
    phase,
    progress,
    started: phase >= 0,
    done: phase >= DONE,
  };
}
