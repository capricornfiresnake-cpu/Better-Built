import type { Metadata, Viewport } from "next";
import { Archivo, Azeret_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { organizationSchema } from "@/lib/seo";
import { site } from "@/lib/site";

/* Display. Archivo is a grotesque drawn for signage and print
   production, and it carries a width axis — which the type scale uses
   as an instrument: the larger the setting, the narrower the cut, the
   way a real title block narrows as it scales up. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

/* Body and interface. Neutral enough to disappear at reading size,
   with just enough drawing in the 'a' and 'g' to not be Inter. */
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

/* The technical layer: coordinates, indices, statuses, dimensions.
   Azeret's squared counters read like CAD annotation. */
const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-azeret",
  display: "swap",
});

/* Reserved for portfolio previews whose brands call for an editorial
   voice. Not part of the site's own typography. */
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Web design",
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${azeret.variable} ${newsreader.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="label-mono sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-chalk focus:px-5 focus:py-3 focus:text-void"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Structured data for the studio itself — no claims beyond the offer.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </body>
    </html>
  );
}
