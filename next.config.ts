import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.API_BASE_URL || "http://localhost:5168"}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
