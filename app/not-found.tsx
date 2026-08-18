import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Container, CropMarks } from "@/components/ui/Section";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-paper pt-[clamp(8rem,14vw,11rem)] pb-[clamp(5rem,10vw,9rem)]">
      <Container>
        <p className="label-mono flex items-center gap-3 text-ink-900/60">
          <span aria-hidden="true" className="block h-px w-8 bg-brass-deep" />
          Error 404
        </p>

        <h1 className="display-hero mt-8 max-w-[14ch] text-ink-900">
          This page isn&rsquo;t here.
        </h1>

        <p className="lede mt-7 max-w-[44ch] text-ink-900/60">
          The link may be out of date, or the page may have moved. Everything else is
          still where you left it.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary" size="lg">
            View our work
          </ButtonLink>
        </div>

        <CropMarks className="mt-16 inline-block text-ink-900">
          <nav aria-label="Site sections" className="p-5">
            <p className="label-mono text-ink-900/60">Or try</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-[1rem] text-ink-900/75">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </CropMarks>
      </Container>
    </section>
  );
}
