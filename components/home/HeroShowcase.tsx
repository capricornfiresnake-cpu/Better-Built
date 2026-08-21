"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BrowserFrame, PhoneFrame } from "@/components/mockups/Frames";
import BuildSequence from "@/components/visuals/BuildSequence";
import BuildLadder from "@/components/visuals/BuildLadder";
import TechReadout from "@/components/visuals/TechReadout";
import { useBuildPhases } from "@/components/visuals/useBuildPhases";
import { AT } from "@/components/visuals/useBuildPhases";
import ProjectPreview from "@/components/work/ProjectPreview";
import { PREVIEW_DESKTOP, PREVIEW_MOBILE } from "@/components/previews/registry";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const CYCLE_MS = 6000;

/**
 * The hero's build environment: the stage ladder, a browser frame that
 * constructs a website and resolves into real client work, and the readout
 * reporting what the frame is doing.
 *
 * All three read from one clock (`useBuildPhases`), so the metadata is a
 * genuine report of the animation rather than text printed beside it. Once the
 * build lands, the frame cycles through the live client sites.
 */
export default function HeroShowcase({ projects }: { projects: Project[] }) {
  // The hero is the first thing on the page; it should not wait to be
  // scrolled to, and waiting for an intersection callback means waiting for
  // hydration.
  const { ref, phase, progress, load, done } = useBuildPhases({ start: "mount" });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  // The carousel only starts once there is a finished website to cycle.
  useEffect(() => {
    if (!done || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Pausing is driven by hover, which touch devices never fire. Rotating
    // content under someone's thumb with no way to stop it reads as a glitch,
    // so there the selector below is the only way to change project — the
    // viewer drives it, not a timer.
    if (!window.matchMedia("(hover: hover)").matches) return;

    const id = window.setInterval(
      () => setActive((i) => (i + 1) % projects.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [done, paused, projects.length]);

  // Light parallax on the phone. Capped, rAF-throttled, motion-safe.
  useEffect(() => {
    const node = phoneRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const shift = Math.max(-40, Math.min(0, 24 - window.scrollY * 0.045));
      node.style.transform = `translate3d(0, ${shift}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const current = projects[active];
  const launched = phase >= AT.launch;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <BuildLadder phase={phase} />

      <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="relative min-w-0 lg:col-span-9">
          <Link
            href={`/work/${current.slug}`}
            aria-label={`${current.name} — ${current.category}. See the project.`}
            className="block rounded-xl focus-visible:outline-offset-4"
          >
            <BrowserFrame
              label={launched ? current.domain : "localhost:3000"}
              status={launched && current.liveUrl ? "Live" : launched ? undefined : "Building"}
              progress={load}
            >
              <BuildSequence phase={phase}>
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: `${PREVIEW_DESKTOP.width} / ${PREVIEW_DESKTOP.height}`,
                  }}
                >
                  {projects.map((project, i) => (
                    <div
                      key={project.slug}
                      aria-hidden={i !== active}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === active ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <ProjectPreview
                        project={project}
                        device="desktop"
                        priority={i === 0}
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </div>
                  ))}
                </div>
              </BuildSequence>
            </BrowserFrame>
          </Link>

          {/* The mobile design, hung off the lower-left corner. Hidden on
              phones, where it would cover a quarter of an already-small
              preview — the mobile view gets a full showing on the project
              page. It arrives with the finished site, not before it. */}
          <div
            ref={phoneRef}
            className={cn(
              "absolute -bottom-12 left-4 hidden w-[17%] max-w-[124px] will-change-transform sm:block",
              "transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              launched ? "opacity-100" : "opacity-0",
            )}
          >
            <PhoneFrame notch={!current.cover}>
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: `${PREVIEW_MOBILE.width} / ${PREVIEW_MOBILE.height}`,
                }}
              >
                {projects.map((project, i) => (
                  <div
                    key={project.slug}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                      i === active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <ProjectPreview project={project} device="mobile" sizes="150px" />
                  </div>
                ))}
              </div>
            </PhoneFrame>
          </div>
        </div>

        <TechReadout phase={phase} progress={progress} className="lg:col-span-3" />
      </div>

      {/* Caption. The spacer keeps it clear of the phone on wide screens. */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-t border-line-soft pt-5 sm:mt-14">
        <span aria-hidden="true" className="hidden w-[12%] max-w-[104px] shrink-0 sm:block" />

        <div
          aria-live="polite"
          className={cn(
            "min-w-0 flex-1 transition-opacity duration-700",
            launched ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="label-mono-sm text-dim">{current.industry}</p>
          <p className="mt-3 text-[1.05rem] text-slate">
            <Link
              href={`/work/${current.slug}`}
              className="link-underline font-display text-chalk [font-variation-settings:'wdth'_100,'wght'_600]"
            >
              {current.name}
            </Link>
            <span className="text-dim"> — {current.category}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${project.name}`}
              aria-pressed={i === active}
              className="group/dot flex min-h-11 items-center px-1 py-2"
            >
              <span
                className={cn(
                  "block h-px w-9 transition-[background-color,height] duration-500",
                  i === active
                    ? "h-[2px] bg-accent"
                    : "bg-line-hard group-hover/dot:bg-slate",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
