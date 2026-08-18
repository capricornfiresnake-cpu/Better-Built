import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, CropMarks, Eyebrow, Section } from "@/components/ui/Section";
import CtaBand from "@/sections/CtaBand";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "Better Built is a web design studio building modern, fast, credible websites for businesses in any industry. Here's what we believe and how we work.",
  path: "/about",
});

const beliefs = [
  {
    title: "The website is the first impression",
    body: "Most people decide whether a business is worth calling before they ever call. That decision happens on a screen, in seconds, and it is almost entirely visual.",
  },
  {
    title: "Design is a business decision",
    body: "A good-looking site is not the goal. A site that makes the business easier to trust and easier to hire is the goal. Everything else is decoration.",
  },
  {
    title: "Small businesses deserve real design",
    body: "Serious design has been priced like a luxury for too long. There is no reason a local business should have to choose between a template and a five-figure quote.",
  },
  {
    title: "Say less, clearly",
    body: "Most business websites fail by saying too much. We cut copy until only the useful part is left, then give it room to breathe.",
  },
];

const standards = [
  ["Loads fast", "No bloated page builders, no plugin stacks, no ten-megabyte hero images."],
  ["Works on any screen", "Phone, tablet, laptop, desktop — each designed, not scaled."],
  ["Accessible by default", "Semantic markup, keyboard navigation, visible focus, real contrast."],
  ["Findable", "Clean structure, correct headings, sitemap, metadata, and structured data."],
  ["Yours to keep", "Your domain, your site, your content. No lock-in of any kind."],
  ["Built to update", "Adding a page later shouldn't mean rebuilding the site."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built better, on purpose."
        lede="Better Built is a web design studio. We make modern websites for businesses that want to look like the real thing — because they are."
      />

      <Section surface="paper" size="tight" className="pt-0">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="max-w-[54ch] space-y-6 text-[1.125rem] leading-relaxed text-ink-900/75">
                <p>
                  There is a gap between how good most small businesses are and how
                  they look online. A restaurant with a full dining room has a menu
                  saved as a PDF. A contractor with a twenty-year reputation has a
                  site that doesn&rsquo;t work on a phone.
                </p>
                <p>
                  That gap costs real work — not because the business isn&rsquo;t
                  good, but because the website says otherwise before anyone gets a
                  chance to find out.
                </p>
                <p className="text-ink-900">
                  Better Built exists to close that gap. One clear price, one short
                  process, and a website the business is actually proud to send
                  people to.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-5">
              <CropMarks className="text-ink-900">
                <div className="p-6">
                  <p className="label-mono text-brass-deep">On experience</p>
                  <p className="mt-5 max-w-[36ch] font-display text-[1.35rem] leading-[1.25] tracking-[-0.03em]">
                    Better Built is a new studio, and we&rsquo;d rather show you the
                    work than tell you about years.
                  </p>
                  <p className="mt-5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-900/60">
                    No invented client list, no borrowed statistics, no awards we
                    didn&rsquo;t win. Look at the portfolio and judge the craft — that
                    is the only claim we&rsquo;re making.
                  </p>
                  <div className="mt-7">
                    <ButtonLink href="/work" variant="secondary" withArrow>
                      Judge the work
                    </ButtonLink>
                  </div>
                </div>
              </CropMarks>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section surface="ink">
        <Container>
          <Reveal>
            <Eyebrow className="text-paper/70">What we believe</Eyebrow>
            <h2 className="display-xl mt-6 max-w-[15ch] text-paper">
              Four things we won&rsquo;t argue about.
            </h2>
          </Reveal>

          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-12 gap-y-10 md:grid-cols-2">
            {beliefs.map((belief, i) => (
              <Reveal key={belief.title} delay={i * 70}>
                <div className="border-t border-paper/15 pt-6">
                  <h3 className="display-md max-w-[20ch] text-paper">{belief.title}</h3>
                  <p className="mt-4 max-w-[46ch] text-[1rem] leading-relaxed text-paper/70">
                    {belief.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="paper">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Standards</Eyebrow>
              <h2 className="display-xl mt-6 max-w-[12ch]">
                The parts nobody sees.
              </h2>
              <p className="mt-6 max-w-[34ch] text-[1.0625rem] leading-relaxed text-ink-900/60">
                Every site ships with the same technical floor, whether or not the
                client ever asks about it.
              </p>
            </Reveal>

            <div className="lg:col-span-8">
              <dl className="grid gap-x-10 sm:grid-cols-2">
                {standards.map(([title, body], i) => (
                  <Reveal key={title} delay={i * 50}>
                    <div className="border-b border-ink-900/12 py-6">
                      <dt className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em]">
                        {title}
                      </dt>
                      <dd className="mt-2 max-w-[40ch] text-[0.9375rem] leading-relaxed text-ink-900/60">
                        {body}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Work with us"
        title="If this sounds like how you'd want it done, let's talk."
        cta={{ label: "Start My Project", href: "/contact" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
