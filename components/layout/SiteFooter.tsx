import Link from "next/link";

import Wordmark from "./Wordmark";
import { footerNav, legalNav, site } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink bg-ink-950 text-paper">
      <div className="container-bb">
        <div className="grid gap-14 py-16 md:grid-cols-[1.15fr_2fr] md:py-20">
          <div>
            <Wordmark className="text-paper" markClassName="text-brass" />
            <p className="mt-5 max-w-[24ch] font-display text-[1.5rem] leading-[1.15] tracking-[-0.03em] text-paper">
              {site.tagline}
            </p>
            <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-paper/55">
              Modern websites for businesses that want to be taken seriously.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="label-mono text-paper/55">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="link-underline text-[0.9375rem] text-paper/75 transition-colors hover:text-paper"
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

        <div className="border-t border-paper/10 py-10">
          <div>
            <h2 className="label-mono text-paper/55">Contact</h2>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-4 inline-block font-display text-[1.35rem] tracking-[-0.03em] text-paper"
            >
              {site.email}
            </a>
            <p className="mt-3 text-[0.9375rem] text-paper/55">
              Tell us about your business and we&rsquo;ll come back with a plan and a
              timeline.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-paper/55">
            © {year} {site.name}
          </p>
          <ul className="flex gap-6">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline label-mono text-paper/55 hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
