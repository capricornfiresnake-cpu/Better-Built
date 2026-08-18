import Link from "next/link";

import { BrowserFrame } from "@/components/mockups/Frames";
import ProjectPreview from "@/components/work/ProjectPreview";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Honest labelling: concept work is never presented as a client engagement. */
export function StatusTag({ project, className }: { project: Project; className?: string }) {
  const isConcept = project.status === "concept";
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-1.5 whitespace-nowrap",
        isConcept ? "text-current/60" : "text-brass-deep",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block h-1.5 w-1.5",
          isConcept ? "bg-current opacity-50" : "bg-brass-deep",
        )}
      />
      {isConcept ? "Concept" : "Client"}
    </span>
  );
}

function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("h-3 w-3 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M5 11L11 5M6 5h5v5" strokeLinecap="square" />
    </svg>
  );
}

export default function ProjectCard({
  project,
  large = false,
  priority = false,
  sizes,
  className,
}: {
  project: Project;
  /** Lead cards in the grid get a bigger title. */
  large?: boolean;
  /** Set only on covers above the fold, so they are not lazy-loaded. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const caseStudyHref = `/work/${project.slug}`;
  const isLive = Boolean(project.liveUrl);

  const cover = (
    <div className="relative overflow-hidden bg-paper-dim">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, ${project.accent}22, transparent 70%)`,
        }}
      />
      <div className="p-[clamp(0.9rem,2.2vw,2.25rem)]">
        <BrowserFrame
          label={project.domain}
          className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5"
        >
          <ProjectPreview project={project} priority={priority} sizes={sizes} />
        </BrowserFrame>
      </div>

      {/* Appears on hover and on keyboard focus, so the destination is never a guess. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-[clamp(1.4rem,3vw,3rem)] right-[clamp(1.4rem,3vw,3rem)]",
          "inline-flex translate-y-2 items-center gap-2 px-3.5 py-2.5 label-mono opacity-0",
          "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100",
          isLive ? "bg-ink-900 text-paper" : "bg-paper text-ink-900",
        )}
      >
        {isLive ? (
          <>
            Visit live site
            <ExternalArrow />
          </>
        ) : (
          <>See The Details →</>
        )}
      </span>
    </div>
  );

  return (
    <article className={cn("group", className)}>
      {isLive ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit the live ${project.name} website (opens in a new tab)`}
          className="block focus-visible:outline-offset-4"
        >
          {cover}
        </a>
      ) : (
        <Link
          href={caseStudyHref}
          aria-label={`${project.name} — ${project.category}. See The Details.`}
          className="block focus-visible:outline-offset-4"
        >
          {cover}
        </Link>
      )}

      <div className="flex items-start justify-between gap-6 pt-6">
        <div className="min-w-0">
          <h3 className={cn("tracking-[-0.035em]", large ? "display-lg" : "display-md")}>
            <Link href={caseStudyHref} className="transition-colors hover:text-brass-deep">
              {project.name}
            </Link>
          </h3>
          <p className="mt-2 text-[0.9375rem] text-ink-900/65">{project.category}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span
              aria-hidden="true"
              className="block h-px w-10 origin-left bg-ink-900/20 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[3]"
              style={{ backgroundColor: project.accent }}
            />
            {isLive ? (
              <Link href={caseStudyHref} className="link-underline label-mono text-ink-900/60">
                See The Details →
              </Link>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-3 pt-1.5">
          <StatusTag project={project} />
          <span className="label-mono text-ink-900/60">{project.industry}</span>
          {isLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline label-mono inline-flex items-center gap-1.5 text-ink-900/60"
            >
              {project.domain}
              <ExternalArrow />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
