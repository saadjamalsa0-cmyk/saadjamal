// next/image loader for the static export. Each width/quality maps to a fixed WebP file under
// /_img that scripts/finalize-export.mjs generates after the build; dev serves the originals.
type LoaderProps = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderProps): string {
  if (process.env.NODE_ENV === "development" || !src.startsWith("/") || /\.svg$/i.test(src)) {
    return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  }
  return `/_img/${width}/${quality ?? 75}${src}.webp`;
}
