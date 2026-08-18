"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BrowserFrame, PhoneFrame } from "@/components/mockups/Frames";
import ProjectPreview from "@/components/work/ProjectPreview";
import { PREVIEW_DESKTOP, PREVIEW_MOBILE } from "@/components/previews/registry";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const CYCLE_MS = 5200;

/**
 * The hero composition: a desktop frame and a phone frame showing the same
 * project, cycling through the featured work. The previews are real rendered
 * layouts, so the hero is a demonstration rather than an illustration.
 */
export default function HeroShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
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
  }, [paused, projects.length]);

  // Light parallax on the phone. Capped, rAF-throttled, motion-safe.
  useEffect(() => {
    const node = phoneRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const shift = Math.max(-36, Math.min(0, -window.scrollY * 0.06));
      node.style.transform = `translate3d(0, ${shift}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const current = projects[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Desktop frame — all previews stay mounted and cross-fade. */}
      <div className="relative">
        <Link
          href={`/work/${current.slug}`}
          aria-label={`${current.name} — ${current.category}. See The Details.`}
          className="block focus-visible:outline-offset-4"
        >
          <BrowserFrame label={current.domain} className="w-full">
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
                    "absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
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
          </BrowserFrame>
        </Link>

        {/* Phone, hung off the lower-left corner of the desktop frame. Hidden on
            phones, where it would cover a quarter of an already-small preview —
            the mobile design gets a full-size showing on the case study pages. */}
        <div
          ref={phoneRef}
          className="absolute -bottom-16 left-6 hidden w-[26%] max-w-[148px] will-change-transform sm:block lg:-bottom-20 lg:-left-16"
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
                    "absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <ProjectPreview
                    project={project}
                    device="mobile"
                    sizes="180px"
                  />
                </div>
              ))}
            </div>
          </PhoneFrame>
        </div>
      </div>

      {/* Caption + selector. The spacer keeps the caption clear of the phone. */}
      <div className="mt-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-5 sm:mt-20">
        <span
          aria-hidden="true"
          className="hidden w-[20%] max-w-[118px] shrink-0 sm:block"
        />
        <div aria-live="polite" className="min-w-0 flex-1">
          <p className="label-mono text-ink-900/60">
            <span
              className={
                current.status === "client" ? "text-brass-deep" : undefined
              }
            >
              {current.status === "client" ? "Client" : "Concept"}
            </span>{" "}
            · {current.industry}
          </p>
          <p className="mt-2.5 font-display text-[1.15rem] tracking-[-0.03em]">
            <Link href={`/work/${current.slug}`} className="link-underline">
              {current.name}
            </Link>
            <span className="text-ink-900/60"> — {current.category}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${project.name}`}
              aria-pressed={i === active}
              className="group/dot flex min-h-11 items-center py-2"
            >
              <span
                className={cn(
                  "block h-px w-8 transition-[background-color,height] duration-500",
                  i === active
                    ? "h-[2px] bg-brass-deep"
                    : "bg-ink-900/25 group-hover/dot:bg-ink-900/60",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
