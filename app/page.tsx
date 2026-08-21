import Hero from "@/sections/Hero";
import WhyBetterBuilt from "@/sections/WhyBetterBuilt";
import Services from "@/sections/Services";
import UnderTheHood from "@/sections/UnderTheHood";
import Pricing from "@/sections/Pricing";

/**
 * The homepage argues in the order a business owner decides in: watch us build
 * one (the hero), hear why it matters, what is included, what it is made of,
 * and then the price.
 *
 * The portfolio and the process both have their own pages, linked from the
 * hero, the nav and the footer. This page makes the case; it does not inline
 * the whole site into itself.
 *
 * Surfaces alternate void / deck down the page so each section reads as its
 * own sheet. Pricing lands on void against the void footer, which is fine —
 * the footer carries its own top rule and glow. The closing ask lives there,
 * shared by every page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyBetterBuilt surface="deck" />
      <Services />
      <UnderTheHood surface="deck" />
      <Pricing surface="void" />
    </>
  );
}
