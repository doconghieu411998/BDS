import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createNextIntlPlugin from 'next-intl/plugin';

const config = (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const nextConfig: NextConfig = {
    output: "standalone",
    env: {
      NEXT_PUBLIC_BASE_PATH: isDev ? "" : "/BDS",
    },
    basePath: isDev ? undefined : "/BDS",
    assetPrefix: isDev ? undefined : "/BDS",

    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "placehold.co",
        },
      ],
      formats: ["image/avif", "image/webp"],
    },
  };


  return nextConfig;
};

const withNextIntl = createNextIntlPlugin();

export default (phase: string) => withNextIntl(config(phase));