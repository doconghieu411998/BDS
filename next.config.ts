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
          protocol: "http",
          hostname: "103.82.23.181",
          port: "5000",
        },
        {
          protocol: "https",
          hostname: "theheraresort.com",
        },
      ],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      formats: ["image/avif", "image/webp"],
    },
  };


  return nextConfig;
};

const withNextIntl = createNextIntlPlugin();

export default (phase: string) => withNextIntl(config(phase));