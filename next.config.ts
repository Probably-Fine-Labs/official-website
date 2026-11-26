import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // Renamed products keep their old URLs working (and pass ranking on).
  redirects() {
    return [
      // CardTrack → CardEye was retired from the catalogue; old links land on the list.
      {
        source: "/products/cardtrack",
        destination: "/products",
        permanent: false,
      },
      {
        source: "/products/cardeye",
        destination: "/products",
        permanent: false,
      },
    ];
  },
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
