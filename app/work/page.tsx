import PageHeader from "@/components/layout/PageHeader";
import ProjectCard from "@/components/work/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import CtaBand from "@/sections/CtaBand";
import { projects } from "@/data/projects";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Work",
  description:
    "Live client websites and concept designs across surf coaching, bars, restaurants, construction and home services — the range Better Built designs and builds.",
  path: "/work",
});

/** Larger cards for the first two projects, then an even grid. */
function spanFor(index: number) {
  if (index === 0) return "lg:col-span-7";
  if (index === 1) return "lg:col-span-5 lg:self-end";
  return "lg:col-span-4";
}

/** Tells next/image how wide each cover actually renders, so it can pick a file. */
function sizesFor(index: number) {
  if (index === 0) return "(max-width: 1024px) 100vw, 58vw";
  if (index === 1) return "(max-width: 1024px) 100vw, 41vw";
  return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
}

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work that looks like the business behind it."
      />

      <Section surface="paper" size="tight" className="pt-0">
        <Container>
          <div className="grid gap-x-8 gap-y-[clamp(3rem,6vw,5rem)] lg:grid-cols-12">
            {projects.map((project, i) => (
              <div key={project.slug} className={spanFor(i)}>
                <Reveal delay={(i % 3) * 60}>
                  <ProjectCard
                    project={project}
                    large={i < 2}
                    priority={i === 0}
                    sizes={sizesFor(i)}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Your turn"
        title="Your business has evolved. Your website should too."
        body="Tell us what you do and we'll show you what it could look like."
        cta={{ label: "Start Your Project", href: "/contact" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
