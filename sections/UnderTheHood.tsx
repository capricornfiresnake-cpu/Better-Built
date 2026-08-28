"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/ui/Reveal";
import { useInView } from "@/components/ui/useInView";
import MotionBackground from "@/components/visuals/MotionBackground";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * UNDER THE HOOD
 * ==============
 *
 * The four disciplines the site is built from. The one crossing the reading
 * line as you scroll is the one lit — nothing is hidden behind the highlight,
 * so it is purely a reading aid and works for anyone who never touches it.
 *
 * The visual beside the list is a single finished panel that fades in and
 * stays. There used to be a scroll-driven wireframe here too; it conflicted
 * with the panel, so it is gone.
 *
 * Every line here is true of this page — a visitor can open dev tools and check
 * all of it, which is the only reason to make a claim like this at all. There
 * is deliberately no live performance score in the copy: a number nobody can
 * verify is worth less than the site being quick in front of you.
 */

const FACETS: { title: string; note: string; items: string[] }[] = [
  {
    title: "Design",
    note: "Drawn to a system, not assembled from a kit.",
    items: ["Custom interface design", "Type scale and colour tokens", "Layout grids", "Motion design"],
  },
  {
    title: "Development",
    note: "Components, typed, with no page builder underneath.",
    items: ["React", "Next.js App Router", "TypeScript", "Component architecture"],
  },
  {
    title: "Responsive",
    note: "Designed at the small size first, then opened up.",
    items: ["Mobile-first layout", "Fluid type and spacing", "Checked 375px to 1920px", "Real device widths"],
  },
  {
    title: "Performance",
    note: "The parts that decide whether anyone waits.",
    items: ["Pre-rendered pages", "Optimised, lazy-loaded images", "No animation library", "SEO foundations"],
  },
];

export default function UnderTheHood({
  surface = "void",
  className,
}: {
  surface?: "void" | "deck";
  className?: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const { ref: panelRef, inView: panelIn } = useInView<HTMLDivElement>({
    threshold: 0.33,
  });

  /**
   * The active discipline follows the scroll rather than a click. Nothing is
   * hidden behind it, so driving it from scroll position means it also works
   * for anyone who never interacts with the section.
   */
  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const anchor = window.innerHeight * 0.45;
      const travelled = (anchor - rect.top) / rect.height;
      const clamped = Math.min(0.9999, Math.max(0, travelled));
      setActive(Math.floor(clamped * FACETS.length));
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
    <Section surface={surface} id="under-the-hood" rule className={className}>
      {/* Asset 3 slot — the blueprint. Inert without a src. */}
      <MotionBackground opacity={0.22} overlayClassName="bg-void/75" />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <Reveal>
            <Eyebrow>Under the hood</Eyebrow>
            <h2 className="display-xl mt-7 max-w-[13ch] text-chalk">
              Built differently.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[38ch] text-[1.0625rem] leading-relaxed text-slate">
              No templates. No page builders. No unnecessary bloat. The technical
              details are below, for anyone who wants them.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid items-start gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ul ref={listRef} className="border-t border-line">
              {FACETS.map((facet, i) => {
                const on = i === active;
                return (
                  <li
                    key={facet.title}
                    className={cn(
                      "relative border-b border-line transition-colors duration-500",
                      on && "bg-card/60",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0 h-px w-full origin-left bg-accent transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        on ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                    <div className="px-1 py-6 sm:px-4">
                      <h3 className="flex items-baseline gap-3">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "block h-1.5 w-1.5 shrink-0 translate-y-[-0.2em] transition-colors duration-400",
                            on ? "bg-accent" : "bg-line-hard",
                          )}
                        />
                        <span
                          className={cn(
                            "display-md transition-colors duration-400",
                            on ? "text-chalk" : "text-slate",
                          )}
                        >
                          {facet.title}
                        </span>
                      </h3>

                      <p className="mt-2.5 pl-[1.125rem] text-[0.9375rem] text-dim">
                        {facet.note}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2 pl-[1.125rem]">
                        {facet.items.map((item) => (
                          <li
                            key={item}
                            className={cn(
                              "label-mono-sm rounded-[3px] border px-2.5 py-1.5 transition-colors duration-400",
                              on ? "border-line-hard text-slate" : "border-line text-dim",
                            )}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-8 lg:sticky lg:top-28 lg:self-start">
            <div
              ref={panelRef}
              className={cn(
                "relative aspect-3/2 overflow-hidden rounded-lg border border-line bg-card",
                "transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                panelIn ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                src="/images/performance-news.png"
                alt="The Better Built system on one panel — Design, Development, Responsive and Performance, each with its parts listed, and a speedometer reading 1.2 seconds fully loaded."
                fill
                sizes="(min-width: 1024px) 64vw, 100vw"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
