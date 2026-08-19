import type { Metadata, Viewport } from "next";
import { Azeret_Mono, Fraunces, Karla, Newsreader } from "next/font/google";
import "./globals.css";

import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { organizationSchema } from "@/lib/seo";
import { site } from "@/lib/site";

/* Display face. Fraunces is a variable serif with two axes almost nobody
   touches: WONK swaps in the designer's deliberately irregular letterforms,
   and SOFT rounds the terminals. Both are dialled up here — a business whose
   clients are hand-painted bar signs and surf shacks should not speak in a
   neutral grotesque. */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

/* Body and UI. Karla is a grotesque with genuinely odd details — a splayed
   'k', a curled 'l', an open 'a' — that stay invisible at reading size but
   keep the page from feeling machine-set. Quiet where it needs to be. */
const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-azeret",
  display: "swap",
});

/* Reserved for portfolio previews whose brands call for an editorial voice. */
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0f" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable} ${azeret.variable} ${newsreader.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-none focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-paper focus:label-mono"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
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
