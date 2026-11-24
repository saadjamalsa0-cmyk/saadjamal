/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `pnpm build` writes plain HTML to ./out, which can be
  // uploaded to any host (cPanel, Cloudflare Pages, Netlify, S3 ...).
  output: "export",
  // /about/ -> about/index.html, which works on every static host.
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
