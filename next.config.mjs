import createNextIntlPlugin from "next-intl/plugin";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import { siteHeaders } from "./config/site-routing.mjs";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Static hosting has no image optimiser: scripts/finalize-export.mjs creates the WebP files.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 96, 128, 256, 384],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
};

// Production is a static export (out/). The dev server applies the same headers and maps
// unprefixed paths to the Arabic pages, the way the export's file layout does.
export default function config(phase) {
  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    return withNextIntl({ ...nextConfig, output: "export" });
  }
  return withNextIntl({
    ...nextConfig,
    headers: async () => siteHeaders(true),
    rewrites: async () => ({
      afterFiles: [],
      beforeFiles: [
        { source: "/", destination: "/ar" },
        { source: "/:path((?!ar$|ar/|en$|en/|_next/|images/|icons/|fonts/|og/|.*\\..*).*)", destination: "/ar/:path" },
      ],
      fallback: [],
    }),
  });
}
