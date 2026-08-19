import ProjectShowcase from "@/components/work/ProjectShowcase";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";

/**
 * The homepage's second argument.
 *
 * The hero already cycles the live client sites, so this section shows the
 * design studies instead — no project appears twice on the page, and between
 * the two placements a visitor sees all five before they scroll past the fold
 * of the argument. Every study is tagged as a study.
 */
export default function SelectedWork() {
  const studies = projects.filter((project) => !project.featured);

  return (
    <Section surface="deck" id="work" rule>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="display-xl mt-7 max-w-[13ch] text-chalk">
              Five projects. Look at all of them.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[38ch] text-[1.0625rem] leading-relaxed text-slate">
              Two are live client sites, in the hero above. These three are our own
              design studies — the businesses are invented, the work is not.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(3.5rem,7vw,6rem)] space-y-[clamp(4rem,9vw,8rem)]">
          {studies.map((project, i) => (
            <ProjectShowcase
              key={project.slug}
              project={project}
              index={projects.indexOf(project)}
              layout={i === 2 ? "full" : i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-[clamp(3rem,6vw,5rem)] border-t border-line pt-10">
            <ButtonLink href="/work" variant="secondary" size="lg" withArrow className="label-mono">
              All work
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
