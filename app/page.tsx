import Hero from "@/sections/Hero";
import WhyBetterBuilt from "@/sections/WhyBetterBuilt";
import Services from "@/sections/Services";
import UnderTheHood from "@/sections/UnderTheHood";
import Pricing from "@/sections/Pricing";

/**
 * The homepage argues in the order a business owner decides in: watch us build
 * one (the hero), hear why it matters, what is included, then the price — and
 * only after that the technical proof, for anyone still curious.
 *
 * The portfolio and the process both have their own pages, linked from the
 * hero, the nav and the footer. This page makes the case; it does not inline
 * the whole site into itself.
 *
 * Surfaces alternate void / deck down the page so each section reads as its
 * own sheet. Under the hood lands on void against the void footer, which is
 * fine — the footer carries its own top rule and glow. The closing ask lives
 * there, shared by every page.
 */
/**
 * The stacked homepage sheets sit closer together than the section default, so
 * the page reads as one argument rather than a stack of distant slides. Scoped
 * here on purpose — it must not touch Pricing on /pricing.
 */
const tightSections = "[--spacing-section:clamp(2.5rem,5vw,4rem)]";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyBetterBuilt surface="deck" className={tightSections} />
      <Services className={tightSections} />
      <Pricing surface="deck" showSupport={false} className={tightSections} />
      <UnderTheHood surface="void" className={tightSections} />
    </>
  );
}
