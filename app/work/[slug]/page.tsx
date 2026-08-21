import Link from "next/link";
import { notFound } from "next/navigation";

import { BrowserFrame, PhoneFrame } from "@/components/mockups/Frames";
import ProjectPreview from "@/components/work/ProjectPreview";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import Sheen from "@/components/ui/Sheen";
import { ButtonLink, ExternalAction } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import DigitalGrid from "@/components/visuals/DigitalGrid";
import { adjacentProjects, getProject, projects } from "@/data/projects";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return pageMeta({
      title: "Project not found",
      description: "This project could not be found.",
      path: `/work/${slug}`,
      index: false,
    });
  }

  return pageMeta({
    title: `${project.name} — ${project.category}`,
    description: `${project.objective} A website designed and built by Better Built.`,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { previous, next } = adjacentProjects(project.slug);

  return (
    <>
      <header className="sheet relative overflow-hidden bg-void pt-[clamp(7rem,13vw,10rem)]">
        <DigitalGrid size={80} origin={{ x: "68%", y: "0%" }} className="opacity-70" />

        <Container className="relative">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href="/work" className="link-underline label-mono text-slate">
                ← All work
              </Link>
              <span aria-hidden="true" className="h-px w-8 bg-line-hard" />
              <span className="label-mono text-dim">{project.industry}</span>
            </div>
          </Reveal>

          <div className="mt-10 grid items-end gap-x-14 gap-y-9 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <AnimatedText
                as="h1"
                immediate
                delay={80}
                className="display-mega text-chalk"
                lines={[project.name]}
              />
              <Reveal delay={320}>
                <p className="mt-6 text-[1.125rem] text-slate">{project.category}</p>
              </Reveal>
            </div>

            <Reveal delay={280} className="lg:col-span-5">
              <p className="label-mono text-dim">Design objective</p>
              <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-slate">
                {project.objective}
              </p>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* The site itself, at full width */}
      <Section surface="void" size="tight">
        <Container>
          <Reveal mode="settle">
            <Sheen className="group relative rounded-xl">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit the live ${project.name} website (opens in a new tab)`}
                  className="block rounded-xl focus-visible:outline-offset-4"
                >
                  <BrowserFrame
                    label={project.domain}
                    status="Live"
                    className="relative z-[1] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
                  >
                    <ProjectPreview
                      project={project}
                      device="desktop"
                      priority
                      sizes="(max-width: 1440px) 100vw, 1440px"
                    />
                  </BrowserFrame>
                  <span
                    aria-hidden="true"
                    className="label-mono pointer-events-none absolute bottom-6 right-6 z-[2] inline-flex translate-y-2 items-center gap-2 rounded-[3px] bg-chalk px-4 py-3 text-void opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Visit live site
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M5 11L11 5M6 5h5v5" strokeLinecap="square" />
                    </svg>
                  </span>
                </a>
              ) : (
                <BrowserFrame label={project.domain}>
                  <ProjectPreview
                    project={project}
                    device="desktop"
                    priority
                    sizes="(max-width: 1440px) 100vw, 1440px"
                  />
                </BrowserFrame>
              )}
            </Sheen>
          </Reveal>

          <p className="label-mono mt-5 text-dim">
            {project.liveUrl
              ? `Desktop — live at ${project.domain}`
              : `Desktop — ${project.name} home page`}
          </p>
        </Container>
      </Section>

      {/* Specification */}
      <Section surface="deck" size="tight" rule>
        <Container>
          <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal>
              <p className="label-mono text-dim">Scope</p>
              <ul className="mt-6 space-y-0 border-t border-line-soft text-[0.9375rem] text-slate">
                {project.scope.map((item) => (
                  <li key={item} className="border-b border-line-soft py-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={60}>
              <p className="label-mono text-dim">Palette</p>
              <ul className="mt-6 border-t border-line-soft">
                {project.palette.map((swatch) => (
                  <li
                    key={swatch.hex}
                    className="flex items-center gap-3 border-b border-line-soft py-2.5"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-5 w-5 shrink-0 rounded-[2px] ring-1 ring-inset ring-white/15"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-[0.9375rem] text-slate">{swatch.name}</span>
                    <span className="label-mono-sm ml-auto text-dim">{swatch.hex}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <p className="label-mono text-dim">Typography</p>
              <ul className="mt-6 border-t border-line-soft text-[0.9375rem]">
                {project.typography.map((type) => (
                  <li key={type.role} className="border-b border-line-soft py-2.5">
                    <span className="label-mono-sm text-dim">{type.role}</span>
                    <span className="mt-2 block text-slate">{type.value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <p className="label-mono text-dim">Status</p>
              <div className="mt-6 border-t border-line-soft pt-3">
                <p className="text-[0.9375rem] leading-relaxed text-slate">
                  {project.liveUrl
                    ? "Designed and built by Better Built. Live now."
                    : "Designed and built by Better Built."}
                </p>
              </div>
              {project.liveUrl ? (
                <div className="mt-6">
                  <ExternalAction href={project.liveUrl}>Visit the live site</ExternalAction>
                </div>
              ) : null}
              <div className="mt-8">
                <ButtonLink href="/contact" variant="secondary" withArrow className="label-mono">
                  Start a project
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Key decisions */}
      <Section surface="void" rule>
        <Container>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Design decisions</Eyebrow>
              <h2 className="display-lg mt-7 max-w-[13ch] text-chalk">
                Why it looks like this.
              </h2>
            </Reveal>

            <div className="lg:col-span-8">
              <div className="border-t border-line">
                {project.decisions.map((decision, i) => (
                  <Reveal key={decision.title} delay={i * 70}>
                    <div className="group grid gap-x-8 gap-y-3 border-b border-line py-8 sm:grid-cols-[minmax(0,19rem)_1fr]">
                      <h3 className="display-md max-w-[22ch] text-chalk transition-colors duration-400 group-hover:text-accent-lift">
                        {decision.title}
                      </h3>
                      <p className="max-w-[52ch] text-[1rem] leading-relaxed text-slate">
                        {decision.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Across devices */}
      <Section surface="deck" rule>
        <Container>
          <Reveal>
            <Eyebrow>Across devices</Eyebrow>
            <h2 className="display-lg mt-7 max-w-[16ch] text-chalk">
              Designed for the phone, not shrunk to fit it.
            </h2>
          </Reveal>

          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid items-center gap-12 lg:grid-cols-12">
            <Reveal delay={80} mode="settle" className="min-w-0 lg:col-span-8">
              <BrowserFrame label={project.domain}>
                <ProjectPreview
                  project={project}
                  device="desktop"
                  sizes="(max-width: 1024px) 100vw, 62vw"
                />
              </BrowserFrame>
              <p className="label-mono mt-4 text-dim">Desktop — 1440px</p>
            </Reveal>

            <Reveal delay={180} mode="settle" className="min-w-0 lg:col-span-4 lg:justify-self-center">
              <div className="mx-auto w-[min(15rem,68vw)]">
                <PhoneFrame notch={!project.cover}>
                  <ProjectPreview project={project} device="mobile" sizes="240px" />
                </PhoneFrame>
                <p className="label-mono mt-4 text-center text-dim">Mobile — 390px</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Project navigation */}
      <Section surface="void" size="tight" rule>
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            {previous ? (
              <Link href={`/work/${previous.slug}`} className="group block">
                <p className="label-mono text-dim">Previous</p>
                <p className="display-md mt-4 text-chalk transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1.5">
                  ← {previous.name}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/work/${next.slug}`} className="group block sm:text-right">
                <p className="label-mono text-dim">Next</p>
                <p className="display-md mt-4 text-chalk transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                  {next.name} →
                </p>
              </Link>
            ) : null}
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
              { name: project.name, path: `/work/${project.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
