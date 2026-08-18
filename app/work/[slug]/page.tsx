import Link from "next/link";
import { notFound } from "next/navigation";

import { BrowserFrame, PhoneFrame } from "@/components/mockups/Frames";
import ProjectPreview from "@/components/work/ProjectPreview";
import { StatusTag } from "@/components/work/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import CtaBand from "@/sections/CtaBand";
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
    description: `${project.objective} A ${project.status === "concept" ? "concept" : "client"} website design by Better Built.`,
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
      <header className="bg-paper pt-[clamp(7rem,12vw,9.5rem)]">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href="/work" className="link-underline label-mono text-ink-900/60">
                ← All work
              </Link>
              <span aria-hidden="true" className="h-px w-8 bg-ink-900/20" />
              <span className="label-mono text-ink-900/60">{project.industry}</span>
              <StatusTag project={project} />
            </div>
          </Reveal>

          <div className="mt-9 grid items-end gap-x-12 gap-y-8 lg:grid-cols-12">
            <Reveal delay={70} className="lg:col-span-7">
              <h1 className="display-hero text-ink-900">{project.name}</h1>
              <p className="mt-5 text-[1.125rem] text-ink-900/65">{project.category}</p>
            </Reveal>
            <Reveal delay={130} className="lg:col-span-5">
              <p className="label-mono text-ink-900/60">Design objective</p>
              <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-900/70">
                {project.objective}
              </p>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* Full-width desktop preview */}
      <Section surface="paper" size="tight">
        <Container>
          <Reveal mode="clip">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit the live ${project.name} website (opens in a new tab)`}
                className="group relative block focus-visible:outline-offset-4"
              >
                <BrowserFrame
                  label={project.domain}
                  className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
                >
                  <ProjectPreview
                    project={project}
                    device="desktop"
                    priority
                    sizes="(max-width: 1408px) 100vw, 1408px"
                  />
                </BrowserFrame>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-6 right-6 inline-flex translate-y-2 items-center gap-2 bg-ink-900 px-4 py-3 label-mono text-paper opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                >
                  Visit live site
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
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
                  sizes="(max-width: 1408px) 100vw, 1408px"
                />
              </BrowserFrame>
            )}
          </Reveal>
          <p className="mt-5 label-mono text-ink-900/60">
            {project.liveUrl
              ? `Desktop — live at ${project.domain}`
              : `Desktop — ${project.name} home page`}
          </p>
        </Container>
      </Section>

      {/* Specification */}
      <Section surface="paper-dim" size="tight">
        <Container>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal>
              <p className="label-mono text-ink-900/60">Scope</p>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem] text-ink-900/75">
                {project.scope.map((item) => (
                  <li key={item} className="border-b border-ink-900/10 pb-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={60}>
              <p className="label-mono text-ink-900/60">Palette</p>
              <ul className="mt-5 space-y-2.5">
                {project.palette.map((swatch) => (
                  <li
                    key={swatch.hex}
                    className="flex items-center gap-3 border-b border-ink-900/10 pb-2.5"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-5 w-5 shrink-0 ring-1 ring-inset ring-ink-900/10"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-[0.9375rem] text-ink-900/75">{swatch.name}</span>
                    <span className="ml-auto label-mono text-ink-900/60">{swatch.hex}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <p className="label-mono text-ink-900/60">Typography</p>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
                {project.typography.map((type) => (
                  <li key={type.role} className="border-b border-ink-900/10 pb-2.5">
                    <span className="label-mono text-ink-900/60">{type.role}</span>
                    <span className="mt-1.5 block text-ink-900/75">{type.value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <p className="label-mono text-ink-900/60">Status</p>
              <div className="mt-5 border-b border-ink-900/10 pb-2.5">
                <p className="text-[0.9375rem] leading-relaxed text-ink-900/75">
                  {project.status === "concept"
                    ? "Concept study by Better Built. Not a client engagement."
                    : "Client project, designed and built by Better Built. Live now."}
                </p>
              </div>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-5 inline-flex items-center gap-2 text-[0.9375rem] text-ink-900"
                >
                  <span className="link-underline">Visit the live site</span>
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 11L11 5M6 5h5v5" strokeLinecap="square" />
                  </svg>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
              <div className="mt-6">
                <ButtonLink href="/contact" variant="secondary" withArrow>
                  Start a project
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Key decisions */}
      <Section surface="paper">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Design decisions</Eyebrow>
              <h2 className="display-lg mt-6 max-w-[14ch]">Why it looks like this.</h2>
            </Reveal>

            <div className="lg:col-span-8">
              <div className="border-t border-ink-900/12">
                {project.decisions.map((decision, i) => (
                  <Reveal key={decision.title} delay={i * 70}>
                    <div className="grid gap-x-8 gap-y-3 border-b border-ink-900/12 py-8 sm:grid-cols-[minmax(0,20rem)_1fr]">
                      <h3 className="display-md max-w-[22ch]">{decision.title}</h3>
                      <p className="max-w-[52ch] text-[1rem] leading-relaxed text-ink-900/65">
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

      {/* Responsive views */}
      <Section surface="ink">
        <Container>
          <Reveal>
            <Eyebrow className="text-paper/70">Across devices</Eyebrow>
            <h2 className="display-lg mt-6 max-w-[16ch] text-paper">
              Designed for the phone, not shrunk to fit it.
            </h2>
          </Reveal>

          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid items-center gap-10 lg:grid-cols-12">
            <Reveal delay={80} className="lg:col-span-8">
              <BrowserFrame label={project.domain}>
                <ProjectPreview
                  project={project}
                  device="desktop"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </BrowserFrame>
              <p className="mt-4 label-mono text-paper/55">Desktop — 1440px</p>
            </Reveal>

            <Reveal delay={160} className="lg:col-span-4 lg:justify-self-center">
              <div className="mx-auto w-[min(15rem,70vw)]">
                <PhoneFrame notch={!project.cover}>
                  <ProjectPreview project={project} device="mobile" sizes="240px" />
                </PhoneFrame>
                <p className="mt-4 text-center label-mono text-paper/55">Mobile — 390px</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Project navigation */}
      <Section surface="paper-dim" size="tight">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {previous ? (
              <Link href={`/work/${previous.slug}`} className="group block">
                <p className="label-mono text-ink-900/60">Previous</p>
                <p className="display-md mt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1">
                  ← {previous.name}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/work/${next.slug}`} className="group block sm:text-right">
                <p className="label-mono text-ink-900/60">Next</p>
                <p className="display-md mt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                  {next.name} →
                </p>
              </Link>
            ) : null}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Same treatment, your business"
        title="We could build something like this for you."
        body="Every project starts the same way: a conversation about what your business actually does."
        cta={{ label: "Build My Website", href: "/contact" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />

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
