import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    proxyClientMaxBodySize: "10mb",
  },
  async redirects() {
    return [
      {
        source: "/services/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/book-marketing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
