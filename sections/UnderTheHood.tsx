"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/ui/Reveal";
import MotionBackground from "@/components/visuals/MotionBackground";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * UNDER THE HOOD
 * ==============
 *
 * Four disciplines, and one interface diagram that answers each of them: the
 * type system highlights, the component boundaries surface, the layout
 * genuinely reflows to a phone, the loading strategy shows itself.
 *
 * Both follow the scroll. The discipline crossing the reading line is the one
 * lit, and the diagram shows its view — there is nothing to click, and nothing
 * is hidden behind the highlight: every discipline and every item under it is
 * on the page the whole time.
 *
 * Every line here is true of this page. Nothing is a capability we would like
 * to have — a visitor can open dev tools and check all of it, which is the
 * only reason to make a claim like this at all. There is deliberately no
 * performance score: a number nobody can verify is worth less than the site
 * being quick in front of you.
 */

type Facet = "design" | "development" | "responsive" | "performance";

const FACETS: { key: Facet; title: string; note: string; items: string[] }[] = [
  {
    key: "design",
    title: "Design",
    note: "Drawn to a system, not assembled from a kit.",
    items: ["Custom interface design", "Type scale and colour tokens", "Layout grids", "Motion design"],
  },
  {
    key: "development",
    title: "Development",
    note: "Components, typed, with no page builder underneath.",
    items: ["React", "Next.js App Router", "TypeScript", "Component architecture"],
  },
  {
    key: "responsive",
    title: "Responsive",
    note: "Designed at the small size first, then opened up.",
    items: ["Mobile-first layout", "Fluid type and spacing", "Checked 375px to 1920px", "Real device widths"],
  },
  {
    key: "performance",
    title: "Performance",
    note: "The parts that decide whether anyone waits.",
    items: ["Pre-rendered pages", "Optimised, lazy-loaded images", "No animation library", "SEO foundations"],
  },
];

const EASE = "cubic-bezier(0.16,1,0.3,1)";

/** Desktop and phone positions for the same six components. */
const LAYOUTS = {
  wide: {
    nav: { x: 4, y: 5, w: 92, h: 9 },
    hero: { x: 4, y: 19, w: 54, h: 38 },
    media: { x: 61, y: 19, w: 35, h: 38 },
    c1: { x: 4, y: 62, w: 29, h: 30 },
    c2: { x: 35.5, y: 62, w: 29, h: 30 },
    c3: { x: 67, y: 62, w: 29, h: 30 },
  },
  narrow: {
    nav: { x: 6, y: 3, w: 88, h: 6 },
    hero: { x: 6, y: 12, w: 88, h: 26 },
    media: { x: 6, y: 41, w: 88, h: 18 },
    c1: { x: 6, y: 62, w: 88, h: 10 },
    c2: { x: 6, y: 74, w: 88, h: 10 },
    c3: { x: 6, y: 86, w: 88, h: 10 },
  },
} as const;

type BlockKey = keyof typeof LAYOUTS.wide;

const TAGS: Record<BlockKey, string> = {
  nav: "<Nav/>",
  hero: "<Hero/>",
  media: "<Media/>",
  c1: "<Card/>",
  c2: "<Card/>",
  c3: "<Card/>",
};

function Diagram({ active }: { active: Facet }) {
  const narrow = active === "responsive";
  const layout = narrow ? LAYOUTS.narrow : LAYOUTS.wide;
  const showTags = active === "development";
  const showType = active === "design";
  const showPerf = active === "performance";

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-lg border border-line bg-card"
    >
      {/* Chrome */}
      <div className="flex h-8 items-center gap-2.5 border-b border-line-soft px-3">
        <span className="flex gap-[5px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-[6px] w-[6px] rounded-full bg-white/12" />
          ))}
        </span>
        <span className="label-mono-sm ml-1 text-dim">
          {narrow ? "390 × 844" : "1440 × 900"}
        </span>
        <span className="label-mono-sm ml-auto text-accent-lift">
          {FACETS.find((f) => f.key === active)?.title}
        </span>
      </div>

      {/* Viewport. Narrows to a phone for the responsive facet. */}
      <div className="relative bg-void px-3 py-3">
        <div
          className="relative mx-auto transition-[width] duration-[900ms]"
          style={{
            width: narrow ? "44%" : "100%",
            transitionTimingFunction: EASE,
          }}
        >
          <div className="relative aspect-16/10 w-full">
            {(Object.keys(layout) as BlockKey[]).map((key) => {
              const b = layout[key];
              const isMedia = key === "media";

              return (
                <div
                  key={key}
                  className="absolute rounded-[3px] border transition-all duration-[900ms]"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: `${b.w}%`,
                    height: `${b.h}%`,
                    borderColor: showTags
                      ? "rgb(108 99 255 / 0.55)"
                      : "rgb(255 255 255 / 0.09)",
                    borderStyle: showTags ? "dashed" : "solid",
                    background:
                      isMedia && !showTags
                        ? "linear-gradient(150deg, rgb(108 99 255 / 0.3), rgb(255 255 255 / 0.06))"
                        : "rgb(255 255 255 / 0.04)",
                    transitionTimingFunction: EASE,
                  }}
                >
                  {/* Component name, for the development facet. */}
                  <span
                    className="absolute left-1 top-0.5 font-mono text-[7px] leading-none tracking-[0.06em] text-accent-lift sm:text-[8px]"
                    style={{
                      opacity: showTags ? 1 : 0,
                      transition: `opacity 420ms ${EASE}`,
                    }}
                  >
                    {TAGS[key]}
                  </span>

                  {/* Type, for the design facet. */}
                  {key === "hero" ? (
                    <div className="flex h-full flex-col justify-center gap-1.5 px-2">
                      {[86, 62].map((w, i) => (
                        <span
                          key={w}
                          className="block rounded-full transition-colors duration-500"
                          style={{
                            width: `${w}%`,
                            height: narrow ? 5 : 8,
                            background: showType
                              ? "var(--color-accent)"
                              : "rgb(255 255 255 / 0.7)",
                            transitionDelay: `${i * 80}ms`,
                          }}
                        />
                      ))}
                      <span
                        className="mt-1 block rounded-full bg-white/25"
                        style={{ width: "48%", height: 3 }}
                      />
                      <span
                        className="mt-1 block rounded-[2px] bg-white/85"
                        style={{ width: narrow ? "44%" : "26%", height: narrow ? 8 : 12 }}
                      />
                    </div>
                  ) : null}

                  {/* Loading strategy, for the performance facet. */}
                  {isMedia ? (
                    <span
                      className="label-mono-sm absolute bottom-1 left-1 text-accent-lift"
                      style={{
                        fontSize: 7,
                        opacity: showPerf ? 1 : 0,
                        transition: `opacity 420ms ${EASE}`,
                      }}
                    >
                      lazy · webp
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Type scale, for the design facet. */}
        <div
          className="pointer-events-none absolute bottom-3 right-3 flex items-baseline gap-2"
          style={{
            opacity: showType ? 1 : 0,
            transform: showType ? "none" : "translateY(6px)",
            transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
          }}
        >
          {[24, 17, 12].map((size) => (
            <span
              key={size}
              className="font-display leading-none text-chalk [font-variation-settings:'wdth'_90,'wght'_650]"
              style={{ fontSize: size }}
            >
              Aa
            </span>
          ))}
        </div>

        {/* Render strategy, for the performance facet. */}
        <div
          className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2"
          style={{
            opacity: showPerf ? 1 : 0,
            transform: showPerf ? "none" : "translateY(6px)",
            transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
          }}
        >
          <span className="label-mono-sm rounded-[3px] border border-accent/40 px-2 py-1 text-accent-lift">
            Pre-rendered
          </span>
        </div>
      </div>
    </div>
  );
}

export default function UnderTheHood({
  surface = "void",
}: {
  surface?: "void" | "deck";
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const active: Facet = FACETS[index].key;

  /**
   * The active discipline follows the scroll rather than a click.
   *
   * Nothing here is hidden behind the interaction — all four disciplines and
   * every item under them are on the page at all times — so the highlight is
   * purely a reading aid, and driving it from scroll position means it also
   * works for anyone who never touches the section.
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
      setIndex(Math.floor(clamped * FACETS.length));
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
    <Section surface={surface} id="under-the-hood" rule>
      {/* Asset 3 slot — the blueprint. Inert without a src. */}
      <MotionBackground opacity={0.22} overlayClassName="bg-void/75" />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <Reveal>
            <Eyebrow>Under the hood</Eyebrow>
            <h2 className="display-xl mt-7 max-w-[13ch] text-chalk">
              What the site is made of.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[38ch] text-[1.0625rem] leading-relaxed text-slate">
              All of it is true of this page. Open dev tools and check — that is
              rather the point of putting it here.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul ref={listRef} className="border-t border-line">
              {FACETS.map((facet) => {
                const on = facet.key === active;
                return (
                  <li
                    key={facet.key}
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
                              on
                                ? "border-line-hard text-slate"
                                : "border-line text-dim",
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

          <Reveal delay={80} className="min-w-0 lg:col-span-7">
            {active === "performance" ? (
              <div className="relative aspect-3/2 overflow-hidden rounded-lg border border-line bg-card">
                <Image
                  src="/images/performance-fast.png"
                  alt="A speedometer reading fast, with a load time of 1.2 seconds fully loaded, beside the four things that decide whether a page waits: pre-rendered pages, optimised and lazy-loaded images, no animation library, and SEO foundations."
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            ) : (
              <Diagram active={active} />
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
