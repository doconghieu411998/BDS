import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const nextConfig: NextConfig = {
    output: "export",

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
    },
  };

  return nextConfig;
};
