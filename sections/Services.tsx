import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { services } from "@/data/services";

/**
 * Ruled rows rather than an icon grid — services are a list of capabilities,
 * not a sequence, so nothing here is numbered.
 */
export default function Services({ withLinks = true }: { withLinks?: boolean }) {
  return (
    <Section surface="paper" id="services">
      <Container>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="display-xl mt-6 max-w-[12ch]">Everything the site needs.</h2>
            <p className="mt-6 max-w-[36ch] text-[1.0625rem] leading-relaxed text-ink-900/60">
              Six things, done properly, on every project. No packages to compare.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="border-t border-ink-900/12">
              {services.map((service, i) => {
                const Row = (
                  <>
                    <div className="flex-1">
                      <h3 className="display-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 max-w-[46ch] text-[1rem] leading-relaxed text-ink-900/60">
                        {service.short}
                      </p>
                    </div>
                    {withLinks ? (
                      <span
                        aria-hidden="true"
                        className="mt-1.5 shrink-0 text-ink-900/25 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-brass-deep"
                      >
                        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
                        </svg>
                      </span>
                    ) : null}
                  </>
                );

                return (
                  <li key={service.id} className="border-b border-ink-900/12">
                    <Reveal delay={i * 45}>
                      {withLinks ? (
                        <Link
                          href={`/services#${service.id}`}
                          className="group flex items-start gap-8 py-8"
                        >
                          {Row}
                        </Link>
                      ) : (
                        <div className="group flex items-start gap-8 py-8">{Row}</div>
                      )}
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
