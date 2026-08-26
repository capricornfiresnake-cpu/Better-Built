import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { services } from "@/data/services";

/**
 * Ruled rows, not an icon grid. Services are a set of capabilities that every
 * project gets — nothing here is sequential, so nothing is numbered. The
 * two-letter code reads as a drawing reference instead.
 */
export default function Services({
  surface = "void",
  className,
}: {
  surface?: "void" | "deck";
  className?: string;
}) {
  return (
    <Section surface={surface} id="services" rule className={className}>
      <Container>
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="display-xl mt-7 max-w-[11ch] text-chalk">
              Everything the site needs.
            </h2>
            <p className="mt-7 max-w-[34ch] text-[1.0625rem] leading-relaxed text-slate">
              Six things, done properly, on every project. No packages to compare and
              nothing held back for a bigger one.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {services.map((service, i) => (
                <li key={service.id} className="border-b border-line">
                  <Reveal delay={i * 50}>
                    <Link
                      href={`/services#${service.id}`}
                      className="group flex items-start gap-6 py-7 transition-colors duration-500 sm:gap-10"
                    >
                      <span className="label-mono-sm w-6 shrink-0 pt-2 text-accent-lift transition-colors duration-400 group-hover:text-accent">
                        {service.code}
                      </span>

                      <span className="flex-1">
                        <span className="display-md block text-chalk transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                          {service.title}
                        </span>
                        <span className="mt-2.5 block max-w-[46ch] text-[1rem] leading-relaxed text-slate">
                          {service.short}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="mt-2 shrink-0 text-line-hard transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-accent-lift"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        >
                          <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
                        </svg>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
