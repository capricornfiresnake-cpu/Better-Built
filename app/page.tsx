import Hero from "@/sections/Hero";
import WorkStrip from "@/sections/WorkStrip";
import WhyBetterBuilt from "@/sections/WhyBetterBuilt";
import Process from "@/sections/Process";
import Pricing from "@/sections/Pricing";
import CtaBand from "@/sections/CtaBand";

/**
 * Homepage order follows the funnel: show the work, explain the offer, earn
 * trust, then reveal the price — not the other way round.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkStrip />
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
