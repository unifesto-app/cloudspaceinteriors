import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Product image uploads go through a Server Action (5 MB per image, max 10 per gallery upload — enforced in app/admin/actions.ts).
  // The old WordPress site had /contact, /about-us and /services pages; keep shared links working.
  async redirects() {
    return [
      { source: "/contact", destination: "/quote", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/testimonials", destination: "/work", permanent: true },
    ];
  },
  experimental: { serverActions: { bodySizeLimit: "52mb" }, proxyClientMaxBodySize: "52mb" }, // proxy.ts guards /admin and would otherwise cut uploads at 10 MB
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
