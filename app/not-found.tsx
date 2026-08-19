import Link from "next/link";

import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import DigitalGrid from "@/components/visuals/DigitalGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Ticks } from "@/components/ui/Section";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="sheet relative overflow-hidden bg-void pb-[clamp(5rem,10vw,9rem)] pt-[clamp(8rem,15vw,12rem)]">
      <DigitalGrid size={72} origin={{ x: "40%", y: "10%" }} />

      <Container className="relative">
        <Reveal>
          <p className="label-mono flex items-center gap-3 text-dim">
            <span aria-hidden="true" className="block h-px w-8 bg-accent" />
            Error 404
          </p>
        </Reveal>

        <AnimatedText
          as="h1"
          immediate
          delay={100}
          className="display-mega mt-9 text-chalk"
          lines={["This page", "isn't here."]}
        />

        <Reveal delay={420}>
          <p className="lede mt-8 max-w-[42ch]">
            The link may be out of date, or the page may have moved. Everything else is
            still where you left it.
          </p>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg" withArrow className="label-mono">
              Back to home
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary" size="lg" withArrow className="label-mono">
              View our work
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={560}>
          <Ticks className="mt-16 inline-block">
            <nav aria-label="Site sections" className="rounded-lg border border-line bg-card p-6">
              <p className="label-mono text-dim">Or try</p>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-underline text-[1rem] text-slate transition-colors hover:text-chalk"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Ticks>
        </Reveal>
      </Container>
    </section>
  );
}
