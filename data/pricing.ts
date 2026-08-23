/**
 * PAYING FROM THE PRICING PAGE
 * ===========================
 *
 * Each plan can carry a Stripe Payment Link. Until one is filled in, its
 * button behaves exactly as before and goes to the contact form, so the page
 * works at every stage of setting this up.
 *
 * To connect one:
 *   1. Stripe dashboard → Product catalogue → add a product at this price.
 *      The two monthly plans must use a recurring price, not a one-off.
 *   2. Payment links → new link → pick that product.
 *   3. Paste the https://buy.stripe.com/… URL into checkoutUrl below.
 *
 * No API key is involved and none should ever be committed here.
 */
export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  note?: string;
  description: string;
  includes: string[];
  cta: { label: string; href: string };
  /**
   * Stripe Payment Link for this plan, e.g. "https://buy.stripe.com/xxxx".
   *
   * A Payment Link URL is public by design, so it belongs here rather than in
   * an environment variable — there is no secret involved and nothing to leak.
   * Leave it empty and the button falls back to cta.href, so the page is
   * never broken by a missing link.
   */
  checkoutUrl?: string;
  /** Button label once money actually changes hands. */
  checkoutLabel?: string;
  emphasis: "primary" | "support";
  /** Marks the better-value ongoing plan. Only ever one. */
  highlight?: string;
};

/** The one-time build. This is the offer everything else is optional against. */
export const websitePlan: PricingPlan = {
  id: "website",
  name: "Website",
  price: "$800",
  cadence: "one-time",
  description:
    "A complete, custom website for your business — designed, built, and launched.",
  includes: [
    "Custom website design",
    "Mobile responsive across every screen",
    "Professional design built around your business",
    "Content structure written for your services",
    "Contact and lead forms",
    "SEO foundations",
    "Website launch",
    "Hosting setup assistance",
  ],
  cta: { label: "Build My Website", href: "/contact" },
  checkoutUrl: "https://buy.stripe.com/28E5kE0ifexaaSXe0a0co02",
  checkoutLabel: "Pay $800 and start",
  emphasis: "primary",
};

/** Optional ongoing support. Deliberately presented as an add-on. */
export const supportPlans: PricingPlan[] = [
  {
    id: "updates",
    name: "Website Updates",
    price: "$125",
    cadence: "per month",
    description:
      "Send us changes and we make them. Month to month, cancel whenever.",
    includes: [
      "Content and photo updates",
      "New sections and pages",
      "Ongoing maintenance",
    ],
    cta: { label: "Add ongoing updates", href: "/contact" },
    checkoutUrl: "https://buy.stripe.com/6oU00k9SPfBe8KPg8i0co00",
    checkoutLabel: "Subscribe — $125/mo",
    emphasis: "support",
  },
  {
    id: "annual",
    name: "Annual Plan",
    price: "$89",
    cadence: "per month",
    /* The rate is per month, but the charge is one payment for the year, so
       the real number has to be on the card and not just at checkout. */
    note: "$1,068 billed once",
    description:
      "The same ongoing support at a lower rate, for businesses that already know they want it. Paid up front for the year — it does not renew on its own.",
    includes: [
      "Everything in Website Updates",
      "Priority turnaround on changes",
      "Yearly review of the site",
    ],
    cta: { label: "Choose annual", href: "/contact" },
    checkoutUrl: "https://buy.stripe.com/fZufZi7KHcp2e593lw0co01",
    checkoutLabel: "Pay $1,068 for the year",
    emphasis: "support",
    highlight: "Better value",
  },
];

/** Contact form options — kept short on purpose. */
export const needOptions = [
  "New website",
  "Website redesign",
  "Website updates",
  "Not sure yet",
] as const;

export type NeedOption = (typeof needOptions)[number];

export const industryOptions = [
  "Restaurant or food service",
  "Contractor or trades",
  "Home services",
  "Automotive",
  "Health, fitness, or wellness",
  "Salon, barber, or spa",
  "Professional services",
  "Real estate",
  "Retail or e-commerce",
  "Other",
] as const;

/**
 * Where a plan's button goes and what it says.
 *
 * With no Payment Link filled in, this is exactly the old behaviour: the
 * contact form, with the original wording. Once a link is present the button
 * says plainly that it takes money — a button reading "Build My Website" that
 * silently opens a card form for $800 would be a trap.
 */
export function planAction(plan: PricingPlan): {
  href: string;
  label: string;
  paying: boolean;
} {
  const paying = Boolean(plan.checkoutUrl);
  return {
    href: paying ? (plan.checkoutUrl as string) : plan.cta.href,
    label: paying ? (plan.checkoutLabel ?? plan.cta.label) : plan.cta.label,
    paying,
  };
}
