import PageHeader from "@/components/layout/PageHeader";
import MotionBackground from "@/components/visuals/MotionBackground";
import ProjectShowcase from "@/components/work/ProjectShowcase";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Work",
  description:
    "Live client websites and concept designs across surf coaching, bars, restaurants, construction and home services — the range Better Built designs and builds.",
  path: "/work",
});

/** Preview left, preview right, then full width. Five projects never settle. */
const layouts = ["left", "right", "full", "left", "right"] as const;

export default function WorkPage() {
  return (
    <>
      <PageHeader
        /* Asset 2 slot — renders nothing until a file is passed.
             src="/visuals/work-motion.mp4" poster="/visuals/work-poster.webp" */
        backdrop={<MotionBackground opacity={0.28} overlayClassName="bg-void/70" />}
        eyebrow="Portfolio"
        lines={["Work"]}
        lede="Each one designed around what the business actually sells, and who actually buys it."
      />

      <Section surface="void" size="tight">
        <Container>
          <div className="space-y-[clamp(4.5rem,10vw,9rem)]">
            {projects.map((project, i) => (
              <ProjectShowcase
                key={project.slug}
                project={project}
                index={i}
                layout={layouts[i % layouts.length]}
                headingLevel="h2"
                priority={i === 0}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="deck" size="tight" rule>
        <Container>
          <Reveal>
            <div className="grid gap-x-14 gap-y-6 lg:grid-cols-12">
              <p className="label-mono text-dim lg:col-span-4">On labelling</p>
              <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-slate lg:col-span-8">
                Client work carries a <span className="text-accent-lift">Client</span> tag
                and links to the live site. Everything else is marked{" "}
                <span className="text-chalk">Concept</span> — our own design study for a
                business that does not exist. We would rather show fewer real projects
                than pad the page with work we did not do.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
