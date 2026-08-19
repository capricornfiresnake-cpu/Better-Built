import PageHeader from "@/components/layout/PageHeader";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Section, Ticks } from "@/components/ui/Section";
import DigitalGrid from "@/components/visuals/DigitalGrid";
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
        lines={["Built better,", "on purpose."]}
        lede="Better Built is a web design studio. We make modern websites for businesses that want to look like the real thing — because they are."
      />

      {/* The positioning idea, set as the argument it is. */}
      <Section surface="void" size="tight">
        <Container>
          <div className="grid gap-x-14 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <AnimatedText
                as="p"
                className="display-xl text-chalk"
                lines={[
                  "Good business",
                  <span key="ne" className="text-accent">
                    ≠
                  </span>,
                  "good website.",
                ]}
              />
              <Reveal delay={280}>
                <p className="display-lg mt-10 max-w-[16ch] text-slate">
                  Better Built closes the gap.
                </p>
              </Reveal>
            </div>

            <Reveal delay={140} className="lg:col-span-6">
              <div className="max-w-[52ch] space-y-6 text-[1.125rem] leading-relaxed text-slate">
                <p>
                  There is a gap between how good most small businesses are and how they
                  look online. A restaurant with a full dining room has a menu saved as a
                  PDF. A contractor with a twenty-year reputation has a site that
                  doesn&rsquo;t work on a phone.
                </p>
                <p>
                  That gap costs real work — not because the business isn&rsquo;t good,
                  but because the website says otherwise before anyone gets a chance to
                  find out.
                </p>
                <p className="text-chalk">
                  One clear price, one short process, and a website the business is
                  actually proud to send people to.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Beliefs */}
      <Section surface="deck" rule>
        <Container>
          <Reveal>
            <Eyebrow>What we believe</Eyebrow>
            <h2 className="display-xl mt-7 max-w-[14ch] text-chalk">
              Four things we won&rsquo;t argue about.
            </h2>
          </Reveal>

          <ol className="mt-[clamp(2.5rem,5vw,4rem)] border-t border-line">
            {beliefs.map((belief, i) => (
              <li key={belief.title} className="border-b border-line">
                <Reveal delay={i * 70}>
                  <div className="group relative grid items-baseline gap-x-10 gap-y-4 px-1 py-9 transition-colors duration-500 sm:grid-cols-[5rem_minmax(0,24rem)_1fr] sm:px-4 hover:sm:bg-card">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                    />
                    <span className="numeral text-[3rem] text-figure transition-colors duration-500 group-hover:text-accent-lift sm:text-[3.5rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display-md max-w-[20ch] text-chalk">{belief.title}</h3>
                    <p className="max-w-[48ch] text-[1rem] leading-relaxed text-slate">
                      {belief.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* The honesty block — the studio's actual position on experience. */}
      <Section surface="void" size="tight" rule>
        <Container>
          <Reveal>
            <Ticks className="group">
              <div className="relative overflow-hidden rounded-lg border border-line bg-card p-[clamp(1.5rem,4vw,3rem)]">
                <DigitalGrid size={56} origin={{ x: "85%", y: "10%" }} className="opacity-50" />
                <div className="relative grid gap-x-14 gap-y-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <p className="label-mono text-accent-lift">On experience</p>
                    <p className="display-md mt-6 max-w-[26ch] text-chalk">
                      Better Built is a new studio, and we&rsquo;d rather show you the
                      work than tell you about years.
                    </p>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-slate">
                      No invented client list, no borrowed statistics, no awards we
                      didn&rsquo;t win, and no testimonials we wrote ourselves. There are
                      five projects on this site: two live client builds and three design
                      studies, each labelled as exactly what it is. Look at the portfolio
                      and judge the craft — that is the only claim we&rsquo;re making.
                    </p>
                    <div className="mt-8">
                      <ButtonLink href="/work" variant="secondary" withArrow className="label-mono">
                        Judge the work
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            </Ticks>
          </Reveal>
        </Container>
      </Section>

      {/* Standards */}
      <Section surface="deck" rule>
        <Container>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Standards</Eyebrow>
              <h2 className="display-xl mt-7 max-w-[11ch] text-chalk">
                The parts nobody sees.
              </h2>
              <p className="mt-7 max-w-[32ch] text-[1.0625rem] leading-relaxed text-slate">
                Every site ships with the same technical floor, whether or not the client
                ever asks about it.
              </p>
            </Reveal>

            <div className="lg:col-span-8">
              <dl className="grid border-t border-line sm:grid-cols-2">
                {standards.map(([title, body], i) => (
                  <Reveal
                    key={title}
                    delay={i * 50}
                    className="group border-b border-line sm:odd:border-r sm:odd:border-line"
                  >
                    <div className="h-full px-1 py-6 transition-colors duration-500 group-hover:bg-card sm:px-5">
                      <dt className="display-sm text-chalk">{title}</dt>
                      <dd className="mt-2.5 max-w-[40ch] text-[0.9375rem] leading-relaxed text-slate">
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
    </>
  );
}
