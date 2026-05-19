import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/premium-furniture-store",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
