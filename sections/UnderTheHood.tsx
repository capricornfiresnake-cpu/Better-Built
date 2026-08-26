import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import MotionBackground from "@/components/visuals/MotionBackground";
import { Container, Eyebrow, Section } from "@/components/ui/Section";

/**
 * UNDER THE HOOD
 * ==============
 *
 * The four disciplines the site is built from, and one finished panel beside
 * them. There is no scroll-driven diagram any more: the list is the list, and
 * the panel simply fades in when it reaches the viewport.
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
}: {
  surface?: "void" | "deck";
}) {
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

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid items-start gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ul className="border-t border-line">
              {FACETS.map((facet, i) => (
                <li key={facet.title} className="border-b border-line">
                  <Reveal delay={i * 60}>
                    <div className="px-1 py-7 sm:px-4">
                      <h3 className="flex items-baseline gap-3">
                        <span
                          aria-hidden="true"
                          className="block h-1.5 w-1.5 shrink-0 translate-y-[-0.2em] bg-accent"
                        />
                        <span className="display-md text-chalk">{facet.title}</span>
                      </h3>

                      <p className="mt-2.5 pl-[1.125rem] text-[0.9375rem] text-dim">
                        {facet.note}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2 pl-[1.125rem]">
                        {facet.items.map((item) => (
                          <li
                            key={item}
                            className="label-mono-sm rounded-[3px] border border-line px-2.5 py-1.5 text-slate"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={120} className="min-w-0 lg:col-span-8">
            <div className="relative aspect-3/2 overflow-hidden rounded-lg border border-line bg-card">
              <Image
                src="/images/performance-fast.png"
                alt="A speedometer reading fast, with a load time of 1.2 seconds fully loaded, beside the four things that decide whether a page waits: pre-rendered pages, optimised and lazy-loaded images, no animation library, and SEO foundations."
                fill
                sizes="(min-width: 1024px) 64vw, 100vw"
                quality={90}
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
