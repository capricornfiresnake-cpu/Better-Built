import type { Metadata } from "next";
import { site } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Set false on utility pages that should stay out of search results. */
  index?: boolean;
};

/** Builds consistent title/description/canonical/OG/Twitter metadata for a page. */
export function pageMeta({
  title,
  description,
  path,
  index = true,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      url,
      title: `${title} — ${site.name}`,
      description,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
    },
  };
}

/** Organization + service structured data, emitted once in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}#organization`,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    email: site.email,
    areaServed: "United States",
    serviceType: "Web design and development",
    knowsAbout: [
      "Website design",
      "Responsive web development",
      "Conversion-focused design",
      "Technical SEO",
    ],
    makesOffer: {
      "@type": "Offer",
      name: "Custom business website",
      price: "1250",
      priceCurrency: "USD",
      description:
        "A custom-designed, mobile-responsive business website, built and launched for a one-time price of $1250.",
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${site.url}${step.path}`,
    })),
  };
}
