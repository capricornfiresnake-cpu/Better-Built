import Link from "next/link";

import Wordmark from "./Wordmark";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import DigitalGrid, { Glow } from "@/components/visuals/DigitalGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container, TechMeta } from "@/components/ui/Section";
import { footerNav, legalNav, site } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="sheet relative overflow-hidden border-t border-line bg-void">
      <DigitalGrid size={88} origin={{ x: "18%", y: "10%" }} className="opacity-60" />
      {/* One of the two places on the site where the accent is allowed to glow. */}
      <Glow className="-left-40 -top-52 h-[34rem] w-[34rem] opacity-45" />

      <Container className="relative">
        <div className="grid items-end gap-x-12 gap-y-10 py-[clamp(4.5rem,9vw,8rem)] lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AnimatedText
              as="h2"
              className="display-xl text-chalk"
              lines={["Your business", "deserves a", "better website."]}
            />
          </div>
          <Reveal delay={160} className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href="/contact" size="lg" withArrow className="label-mono">
              Start a project
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-x-12 gap-y-12 border-t border-line py-14 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-[30ch] text-[0.9375rem] leading-relaxed text-slate">
              {site.tagline} Modern websites for businesses that want to be taken
              seriously.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-6 inline-block font-display text-[1.15rem] tracking-[-0.02em] text-chalk [font-variation-settings:'wdth'_100,'wght'_600]"
            >
              {site.email}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="label-mono text-dim">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="link-underline text-[0.9375rem] text-slate transition-colors hover:text-chalk"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-line-soft py-8 sm:flex-row sm:items-center sm:justify-between">
          <TechMeta
            items={[
              `© ${year} ${site.name}`,
              { label: "Built with", value: "Next.js" },
            ]}
          />
          <ul className="flex gap-6">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline label-mono-sm text-dim transition-colors hover:text-chalk"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
