import PageHeader from "@/components/layout/PageHeader";
import MotionBackground from "@/components/visuals/MotionBackground";
import ProjectShowcase from "@/components/work/ProjectShowcase";
import { Container, Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Work",
  description:
    "Websites across surf coaching, bars, restaurants, construction and home services — the range Better Built designs and builds.",
  path: "/work",
});

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
                headingLevel="h2"
                priority={i === 0}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
