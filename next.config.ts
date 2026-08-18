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
};

export default nextConfig;
