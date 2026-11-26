/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `pnpm build` writes plain HTML to ./out, which can be
  // uploaded to any host (cPanel, Cloudflare Pages, Netlify, S3 ...).
  output: "export",
  // /about/ -> about/index.html, which works on every static host.
  trailingSlash: true,
  images: {
    // Static hosting has no image optimiser: scripts/finalize-export.mjs creates the WebP files.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 96, 128, 256, 384],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
