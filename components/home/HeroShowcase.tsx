"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BrowserFrame, PhoneFrame } from "@/components/mockups/Frames";
import BuildAnimation from "@/components/visuals/BuildAnimation";
import ProjectPreview from "@/components/work/ProjectPreview";
import { PREVIEW_DESKTOP, PREVIEW_MOBILE } from "@/components/previews/registry";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const CYCLE_MS = 6000;

/**
 * The hero object: a browser frame that builds itself and resolves into real
 * client work, then cycles through the rest of it.
 *
 * The previews are the finished websites, so the hero is a demonstration
 * rather than an illustration of one.
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

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Link
        href={`/work/${current.slug}`}
        aria-label={`${current.name} — ${current.category}. See the project.`}
        className="block rounded-xl focus-visible:outline-offset-4"
      >
        <BrowserFrame label={current.domain} status={current.liveUrl ? "Live" : "Concept"}>
          <BuildAnimation trigger="view">
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
                    sizes="(max-width: 1024px) 100vw, 62vw"
                  />
                </div>
              ))}
            </div>
          </BuildAnimation>
        </BrowserFrame>
      </Link>

      {/* The mobile design, hung off the lower-left corner. Hidden on phones,
          where it would cover a quarter of an already-small preview — the
          mobile view gets a full-size showing on the project page. */}
      <div
        ref={phoneRef}
        className="absolute -bottom-14 left-4 hidden w-[17%] max-w-[132px] will-change-transform sm:block lg:-bottom-16 lg:-left-12"
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
                <ProjectPreview project={project} device="mobile" sizes="160px" />
              </div>
            ))}
          </div>
        </PhoneFrame>
      </div>

      {/* Caption. The spacer keeps it clear of the phone on wide screens. */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-t border-line-soft pt-5 sm:mt-16">
        <span aria-hidden="true" className="hidden w-[13%] max-w-[110px] shrink-0 sm:block" />

        <div aria-live="polite" className="min-w-0 flex-1">
          <p className="label-mono-sm flex flex-wrap items-center gap-x-3 gap-y-1 text-dim">
            <span className={current.status === "client" ? "text-accent-lift" : undefined}>
              {current.status === "client" ? "Client" : "Concept"}
            </span>
            <span aria-hidden="true" className="h-px w-4 bg-line-hard" />
            {current.industry}
          </p>
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
