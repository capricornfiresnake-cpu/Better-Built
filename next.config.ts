import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Portfolio covers are screenshots of live sites — full of small UI text
     * that goes mushy at the default quality of 75. Next 16 only honours
     * qualities listed here.
     */
    qualities: [75, 90],
    formats: ["image/webp"],
  },

  /**
   * Client demo previews.
   *
   * The lead-gen tool generates a standalone homepage per prospect and stages
   * it at public/preview/<slug>/index.html (see sync-demo.js in the Lead Gen
   * project). Files under public/ map 1:1 to URL paths, so /preview/<slug>
   * would not resolve to that folder's index.html on its own. This rewrite
   * does that and touches nothing else on the site.
   *
   * Deliberately NOT solved with `trailingSlash: true` — that would add a
   * trailing slash to every URL on the marketing site. The demos instead ship
   * with absolute asset paths, rewritten at sync time.
   */
  async rewrites() {
    return [
      { source: "/preview/:slug", destination: "/preview/:slug/index.html" },
    ];
  },
};

export default nextConfig;
