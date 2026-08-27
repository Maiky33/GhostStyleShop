import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },{
        protocol: "https",
        hostname: "png.pngtree.com",
      }
    ],
  },
};

export default nextConfig;
