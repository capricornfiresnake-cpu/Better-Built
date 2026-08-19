import Hero from "@/sections/Hero";
import SelectedWork from "@/sections/SelectedWork";
import WhyBetterBuilt from "@/sections/WhyBetterBuilt";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import Pricing from "@/sections/Pricing";

/**
 * The homepage argues in the order a business owner decides in: show that we
 * can build (the hero frame), show what we have built (the work), say why it
 * matters, say what's included, say how it runs, and only then say the price.
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
      <Process withCta={false} />
      <Pricing />
    </>
  );
}
