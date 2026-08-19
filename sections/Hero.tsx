import HeroShowcase from "@/components/home/HeroShowcase";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import DigitalGrid, { Glow } from "@/components/visuals/DigitalGrid";
import MotionBackground from "@/components/visuals/MotionBackground";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { featuredProjects } from "@/data/projects";

/** The four stages of a build. A real sequence, so it is numbered. */
const ladder = [
  { step: "01", label: "Structure" },
  { step: "02", label: "Design" },
  { step: "03", label: "Build" },
  { step: "04", label: "Launch" },
];

export default function Hero() {
  return (
    <section className="sheet relative overflow-hidden bg-void pt-[clamp(6.5rem,12vw,9rem)] pb-[clamp(4rem,8vw,7rem)]">
      {/*
        Drop-in point for a generated motion asset. With no `src` this renders
        nothing and the hero is exactly as designed — the CSS layers below are
        the real backdrop, not a fallback. To use one:

          <MotionBackground
            src="/visuals/hero-motion.mp4"
            poster="/visuals/hero-poster.webp"
            opacity={0.35}
          />

        It lazy-loads on scroll, skips the download entirely under reduced
        motion or Save-Data, and falls back to the poster if the video fails.
      */}
      <MotionBackground />

      <DigitalGrid size={80} origin={{ x: "62%", y: "4%" }} />
      {/* The first of the two glows on the site. It sits behind the frame. */}
      <Glow className="right-[-12%] top-[-8%] h-[42rem] w-[42rem] opacity-60" />

      <Container className="relative">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label-mono-sm flex items-center gap-2.5 text-accent-lift">
              <span aria-hidden="true" className="block h-1.5 w-1.5 bg-accent" />
              Web design studio
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-line-soft" />
            <span className="label-mono-sm hidden text-dim sm:block">
              Taking on new projects
            </span>
          </div>
        </Reveal>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid items-end gap-x-12 gap-y-10 lg:grid-cols-12">
          <AnimatedText
            as="h1"
            immediate
            stagger={95}
            delay={120}
            className="display-mega text-chalk lg:col-span-7"
            lines={["Better", "Websites.", "Better", "Business."]}
          />

          <div className="lg:col-span-5 lg:pb-3">
            <Reveal delay={520}>
              <p className="lede max-w-[40ch]">
                We design and build modern websites for businesses that want to look
                credible, load fast, and be easy to hire.
              </p>
            </Reveal>

            <Reveal delay={620}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  withArrow
                  className="label-mono w-full sm:w-auto"
                >
                  Start a project
                </ButtonLink>
                <ButtonLink
                  href="/work"
                  variant="secondary"
                  size="lg"
                  withArrow
                  className="label-mono w-full sm:w-auto"
                >
                  View our work
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The build ladder. Four stages, in order, because they happen in order. */}
        <div className="mt-[clamp(3rem,6vw,5rem)]">
          <Reveal mode="rule" delay={100}>
            <span className="block h-px w-full bg-line" />
          </Reveal>
          <ul className="grid grid-cols-2 sm:grid-cols-4">
            {ladder.map((item, i) => (
              <li key={item.step} className="border-b border-line-soft sm:border-b-0">
                <Reveal delay={200 + i * 70}>
                  <div className="flex items-baseline gap-3 py-4">
                    <span className="label-mono-sm text-accent-lift">{item.step}</span>
                    <span className="label-mono text-slate">{item.label}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)]">
          <HeroShowcase projects={featuredProjects} />
        </div>
      </Container>
    </section>
  );
}
