import Hero from "@/sections/Hero";
import SelectedWork from "@/sections/SelectedWork";
import WhyBetterBuilt from "@/sections/WhyBetterBuilt";
import Services from "@/sections/Services";
import UnderTheHood from "@/sections/UnderTheHood";
import Process from "@/sections/Process";
import Pricing from "@/sections/Pricing";

/**
 * The homepage argues in the order a business owner decides in: watch us build
 * one (the hero), see what we have built (the work), hear why it matters, what
 * is included, what it is made of, how it runs, and only then the price.
 *
 * The closing ask lives in the footer, which every page shares — one closing
 * statement site-wide rather than a CTA band stacked on top of it.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <WhyBetterBuilt />
      <Services surface="deck" />
      <UnderTheHood />
      <Process withCta={false} surface="deck" />
      <Pricing surface="void" />
    </>
  );
}
