import ProjectCard from "@/components/work/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";

/**
 * Homepage portfolio teaser.
 *
 * Skips whatever the hero is already cycling through, so no project appears
 * twice on the same page.
 */
export default function WorkStrip() {
  const shown = projects.filter((project) => !project.featured).slice(0, 3);
  const showsClientWork = shown.some((project) => project.status === "client");

  return (
    <Section
      surface="paper-dim"
      id="work"
      className="pt-[clamp(3rem,5vw,4.5rem)] pb-[clamp(3.5rem,6vw,5.5rem)]"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="display-xl mt-6 max-w-[16ch]">
              No two of these look alike.
            </h2>
          </Reveal>
          <Reveal delay={100} className="max-w-[38ch]">
            <p className="text-[1.0625rem] leading-relaxed text-ink-900/60">
              Every business gets its own design — its own type, its own structure,
              its own argument.{" "}
              {showsClientWork ? (
                <>
                  Live client sites are marked{" "}
                  <span className="text-ink-900">Client</span>; the rest are our own
                  concept studies.
                </>
              ) : (
                <>
                  These are concept studies built to show range — the live client work
                  is in the full portfolio.
                </>
              )}
            </p>
            <div className="mt-6">
              <ButtonLink href="/work" variant="secondary" withArrow>
                View the full portfolio
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-8 gap-y-[clamp(3rem,6vw,5rem)] sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 70}
              className={i === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <ProjectCard
                project={project}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
