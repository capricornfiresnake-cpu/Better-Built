import Link from "next/link";

import { BrowserFrame } from "@/components/mockups/Frames";
import ProjectPreview from "@/components/work/ProjectPreview";
import StatusTag from "@/components/work/StatusTag";
import Reveal from "@/components/ui/Reveal";
import Sheen from "@/components/ui/Sheen";
import { ExternalAction } from "@/components/ui/Button";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Layout = "left" | "right" | "full";

/**
 * A project, shown at the size it deserves.
 *
 * The preview is the argument, so it gets the space: a real browser frame
 * around a real screenshot (client work) or a real rendered layout (concept
 * work). The three layouts alternate down the page so a portfolio of five
 * never settles into a rhythm.
 */
export default function ProjectShowcase({
  project,
  index,
  layout = "left",
  headingLevel = "h3",
  priority = false,
  className,
}: {
  project: Project;
  /** Position in the set. Rendered as the index it is. */
  index: number;
  layout?: Layout;
  /** h2 where the showcase is the page's top-level content, h3 under a section heading. */
  headingLevel?: "h2" | "h3";
  priority?: boolean;
  className?: string;
}) {
  const caseStudyHref = `/work/${project.slug}`;
  const isLive = Boolean(project.liveUrl);
  const number = String(index + 1).padStart(2, "0");
  const full = layout === "full";
  const Heading = headingLevel;

  const sizes = full
    ? "(max-width: 1024px) 100vw, 88vw"
    : "(max-width: 1024px) 100vw, 55vw";

  const preview = (
    <Reveal mode="settle" delay={60} className={cn("min-w-0", full ? "" : "lg:col-span-7")}>
      <Sheen className="group relative rounded-xl">
        <Link
          href={caseStudyHref}
          aria-label={`${project.name} — ${project.category}. See the project.`}
          className="block rounded-xl focus-visible:outline-offset-4"
        >
          <BrowserFrame
            label={project.domain}
            status={isLive ? "Live" : "Concept"}
            className="relative z-[1] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5"
          >
            <ProjectPreview project={project} priority={priority} sizes={sizes} />
          </BrowserFrame>

          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-5 right-5 z-[2] inline-flex translate-y-2 items-center gap-2",
              "label-mono rounded-[3px] bg-chalk px-3.5 py-2.5 text-void opacity-0",
              "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-hover:translate-y-0 group-hover:opacity-100",
              "group-focus-within:translate-y-0 group-focus-within:opacity-100",
            )}
          >
            View project
            <svg
              viewBox="0 0 16 16"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
            </svg>
          </span>
        </Link>
      </Sheen>
    </Reveal>
  );

  const details = (
    <div
      className={cn("min-w-0", full ? "grid gap-x-12 gap-y-8 lg:grid-cols-12" : "lg:col-span-5")}
    >
      <Reveal delay={140} className={cn(full && "lg:col-span-5")}>
        <div className="flex items-center gap-4">
          <span className="numeral text-[2.75rem] text-figure">{number}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-line-soft" />
          <StatusTag project={project} />
        </div>

        <Heading className="display-lg mt-6 text-chalk">
          <Link href={caseStudyHref} className="transition-colors hover:text-accent-lift">
            {project.name}
          </Link>
        </Heading>

        <p className="label-mono mt-4 text-dim">{project.industry}</p>
      </Reveal>

      <Reveal delay={200} className={cn(full && "lg:col-span-7 lg:pt-16")}>
        <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-slate lg:mt-7">
          {project.summary}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href={caseStudyHref}
            className="group/link label-mono inline-flex items-center gap-2.5 text-chalk"
          >
            <span className="link-underline">See project</span>
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-3 w-3 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
            </svg>
          </Link>

          {isLive ? (
            <ExternalAction href={project.liveUrl as string}>
              View live site
            </ExternalAction>
          ) : null}
        </div>
      </Reveal>
    </div>
  );

  if (full) {
    return (
      <article className={cn("group/showcase", className)}>
        {details}
        <div className="mt-10">{preview}</div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group/showcase grid items-center gap-x-14 gap-y-9 lg:grid-cols-12",
        className,
      )}
    >
      {layout === "right" ? (
        <>
          {details}
          {preview}
        </>
      ) : (
        <>
          {preview}
          {details}
        </>
      )}
    </article>
  );
}
