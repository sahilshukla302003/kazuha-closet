// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true, // This is crucial for your SVG data URIs

    remotePatterns: [
      // Keep 'placehold.co' only if you are actively using external images from it.
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  // ... other Next.js configurations
};

export default nextConfig;