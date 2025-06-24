import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'placehold.co', // IMPORTANT: This must be here to allow images from placehold.co
      // Add any other external image domains your application uses here
      // e.g., 'cdn.example.com', 'your-custom-image-domain.com', etc.
    ],
  },
  // Add any other Next.js configuration options you might have here
  // For example: output: 'export', reactStrictMode: true, etc.
};

export default nextConfig;
