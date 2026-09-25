import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 31_536_000,
  },
  async headers() {
    const immutableAssetCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ]

    return [
      { source: "/brand/:path*", headers: immutableAssetCache },
      { source: "/images/:path*", headers: immutableAssetCache },
    ]
  },
};

export default nextConfig;
