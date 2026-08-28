import HeroShowcase from "@/components/home/HeroShowcase";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import DigitalGrid, { Glow } from "@/components/visuals/DigitalGrid";
import MotionBackground from "@/components/visuals/MotionBackground";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { featuredProjects } from "@/data/projects";

export default function Hero() {
  return (
    <section className="sheet relative overflow-hidden bg-void pt-[clamp(6.5rem,12vw,9rem)] pb-[clamp(2rem,4vw,3.25rem)]">
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
            label="Better Websites. Better Business."
          />

          <div className="lg:col-span-5 lg:pb-3">
            <Reveal delay={520}>
              <p className="lede max-w-[40ch]">
                We replace outdated websites with modern, high-performance sites built
                to make your business look as good online as it does in person.
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
                  Get a Better Website
                </ButtonLink>
                <ButtonLink
                  href="/work"
                  variant="secondary"
                  size="lg"
                  withArrow
                  className="label-mono w-full sm:w-auto"
                >
                  See Our Work
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* The build environment: stage ladder, the frame under construction,
            and the readout reporting it. All three share one clock. */}
        <div className="mt-[clamp(3rem,6vw,5rem)]">
          <HeroShowcase projects={featuredProjects} />
        </div>
      </Container>
    </section>
  );
}
