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
  { key: "build", label: "Build", ms: 620 },
  { key: "design", label: "Design", ms: 580 },
  { key: "motion", label: "Motion", ms: 500 },
  { key: "optimize", label: "Optimize", ms: 500 },
  { key: "launch", label: "Launch", ms: 700 },
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

/** Everything before LAUNCH: the bar is full by the time the site is revealed. */
const LOAD_END =
  PHASES.slice(0, AT.launch).reduce((sum, phase) => sum + phase.ms, 0) / TOTAL;

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

/**
 * Runs the sequence once, either on mount or when it is scrolled to.
 *
 * Reduced motion lands on the finished state immediately: the completed
 * website, every readout at 100%, no assembly. One rAF loop that stops itself
 * after ~3.5s and never restarts.
 */
export function useBuildPhases({
  start: startMode = "view",
}: {
  /**
   * `view` waits until the frame is scrolled to. `mount` begins immediately,
   * which is right for the hero: it is the first thing on the page, and
   * waiting costs about two seconds of nothing happening. Intersection
   * callbacks do not fire until hydration is done — every observer on the page
   * reports at once, around 2s in — so an above-the-fold animation that waits
   * for one is really waiting for hydration.
   */
  start?: "view" | "mount";
} = {}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [phase, setPhase] = useState(-1);
  const [progress, setProgress] = useState(0);

  // Mirrored into a ref so the clock below can read it without depending on
  // it, and therefore without ever being torn down and restarted.
  const inViewRef = useRef(false);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  /**
   * One clock, started exactly once, never restarted.
   *
   * This deliberately does not depend on `inView`. An earlier version did, and
   * also on a piece of state set by the fallback timer below — so when that
   * timer fired two seconds in, React tore the effect down, cancelled the frame
   * and re-ran it with a fresh `start`. The sequence jumped back to the
   * beginning every single load, which read as the progress bar sliding
   * backwards. The trigger is read through a ref instead, so nothing here is
   * ever torn down until the component unmounts.
   *
   * The fallback matters because the finished website stays hidden until
   * LAUNCH: if the observer never reports (a browser that doesn't, a tab that
   * never composites), the sequence has to start anyway. The animation is the
   * decoration; the client's website underneath it is the content.
   */
  useEffect(() => {
    let frame = 0;
    let start = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = requestAnimationFrame(() => {
        setPhase(DONE);
        setProgress(1);
      });
      return () => cancelAnimationFrame(frame);
    }

    const armAt = performance.now() + 2200;

    const tick = (now: number) => {
      if (!start) {
        const go = startMode === "mount" || inViewRef.current || now >= armAt;
        if (!go) {
          frame = requestAnimationFrame(tick);
          return;
        }
        start = now;
      }

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

      if (elapsed < TOTAL) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [startMode]);

  return {
    ref,
    /** -1 before the sequence starts, 0–4 while running, 5 when finished. */
    phase,
    progress,
    /**
     * The address-bar loading hairline: fills quickly, decelerates, and is
     * exactly full at the moment the site is revealed — so it reads as the
     * page having loaded rather than as a meter of the animation.
     */
    load: easeOut(Math.min(1, progress / LOAD_END)),
    started: phase >= 0,
    done: phase >= DONE,
  };
}
