import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createNextIntlPlugin from 'next-intl/plugin';

const config = (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const nextConfig: NextConfig = {
    output: "standalone",

    basePath: "",

    images: {
      unoptimized: false,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "placehold.co",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "http",
          hostname: "103.82.23.181",
          port: "5000",
        },
      ],
      formats: ["image/avif", "image/webp"],
    },
  };


  return nextConfig;
};

const withNextIntl = createNextIntlPlugin();

export default (phase: string) => withNextIntl(config(phase));