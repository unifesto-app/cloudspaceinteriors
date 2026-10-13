import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product image uploads go through a Server Action (5 MB cap enforced in app/admin/actions.ts).
  // The old WordPress site had /contact, /about-us and /services pages; keep shared links working.
  async redirects() {
    return [
      { source: "/contact", destination: "/quote", permanent: true },
      { source: "/about-us", destination: "/how-we-work", permanent: true },
      { source: "/testimonials", destination: "/work", permanent: true },
    ];
  },
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
