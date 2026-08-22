/**
 * Central site configuration. Change contact details, domain, and navigation
 * here — every page, the footer, the sitemap and the structured data read from it.
 */

export const site = {
  name: "Better Built",
  wordmark: "BETTER BUILT",
  tagline: "Better Websites. Better Business.",
  description:
    "Better Built designs and builds modern, fast, mobile-first websites for businesses in any industry — built to look credible and bring in customers.",
  /** Update this when a custom domain replaces the Vercel one. */
  url: "https://better-built.vercel.app",
  email: "capricornfiresnake@gmail.com",
  phone: "",
  locale: "en_US",
} as const;

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Studio",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Pricing",
    links: [
      { label: "Website — $800", href: "/pricing#website" },
      { label: "Updates — $125/mo", href: "/pricing#updates" },
      { label: "Annual — $89/mo", href: "/pricing#annual" },
      { label: "Questions", href: "/process#faq" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
