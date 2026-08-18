export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  note?: string;
  description: string;
  includes: string[];
  cta: { label: string; href: string };
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
    emphasis: "support",
  },
  {
    id: "annual",
    name: "Annual Plan",
    price: "$89",
    cadence: "per month",
    note: "billed annually",
    description:
      "The same ongoing support at a lower rate, for businesses that already know they want it.",
    includes: [
      "Everything in Website Updates",
      "Priority turnaround on changes",
      "Yearly review of the site",
    ],
    cta: { label: "Choose annual", href: "/contact" },
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
