import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
