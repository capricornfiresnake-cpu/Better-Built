import HeroShowcase from "@/components/home/HeroShowcase";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { featuredProjects } from "@/data/projects";

const industries = [
  "Restaurants",
  "Contractors",
  "Home services",
  "Salons",
  "Fitness",
  "Auto",
  "Real estate",
  "Professional services",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-[7.5rem] pb-[clamp(2.5rem,4vw,3.5rem)]">
      {/* Construction grid, barely there. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,12,15,0.045) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 6) 100%",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />

      <Container className="relative">
        <div className="grid items-end gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label-mono flex items-center gap-3 text-ink-900/60">
                <span aria-hidden="true" className="block h-px w-8 bg-brass-deep" />
                Web design studio
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display-hero mt-7 text-ink-900">
                Better
                <br />
                Websites.
                <br />
                Better
                <br />
                Business.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="lede mt-8 max-w-[42ch] text-ink-900/65">
                We design and build modern websites for businesses that want to look
                credible, load fast, and be easy to hire.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink href="/contact" size="lg" withArrow className="w-full sm:w-auto">
                  Build My Website
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Our Work
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={140} className="lg:pl-6">
              <HeroShowcase projects={featuredProjects} />
            </Reveal>
          </div>
        </div>

        <Reveal delay={200}>
          <div className="mt-[clamp(3rem,5vw,4.5rem)] border-t border-ink-900/10 pt-6">
            <p className="label-mono text-ink-900/60">Built for</p>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2.5 text-[0.9375rem] text-ink-900/65">
              {industries.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li className="text-ink-900/60">and most things in between</li>
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
