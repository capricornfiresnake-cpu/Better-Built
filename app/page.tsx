import Hero from "@/sections/Hero";
import WhyBetterBuilt from "@/sections/WhyBetterBuilt";
import Services from "@/sections/Services";
import UnderTheHood from "@/sections/UnderTheHood";
import Process from "@/sections/Process";
import Pricing from "@/sections/Pricing";

/**
 * The homepage argues in the order a business owner decides in: watch us build
 * one (the hero), hear why it matters, what is included, what it is made of,
 * how it runs, and only then the price.
 *
 * The portfolio lives on /work. The hero cycles the live client sites and
 * carries the link to the rest, which is enough of it for this page — the
 * argument does not need the whole catalogue inlined into it.
 *
 * Surfaces alternate void / deck the whole way down, so each section reads as
 * its own sheet rather than one long scroll. The closing ask lives in the
 * footer, which every page shares.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyBetterBuilt surface="deck" />
      <Services />
      <UnderTheHood surface="deck" />
      <Process withCta={false} />
      <Pricing surface="deck" />
    </>
  );
}
