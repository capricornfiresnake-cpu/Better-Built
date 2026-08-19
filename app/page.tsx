import Hero from "@/sections/Hero";
import WhyBetterBuilt from "@/sections/WhyBetterBuilt";
import Process from "@/sections/Process";
import Pricing from "@/sections/Pricing";
import CtaBand from "@/sections/CtaBand";

/**
 * Homepage order follows the funnel: the hero shows real client work, then
 * the argument, the process, and only then the price. The full portfolio
 * lives on /work — this page makes the case rather than listing projects.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyBetterBuilt />
      <Process withCta={false} />
      <Pricing />
      <CtaBand
        eyebrow="Next step"
        title="Ready for a better website?"
        body="Let's build something your business can be proud of. Tell us what you do and we'll come back with a plan."
        cta={{ label: "Build My Website", href: "/contact" }}
        secondary={{ label: "View our work", href: "/work" }}
      />
    </>
  );
}
