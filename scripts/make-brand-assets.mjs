// Builds the transparent logo, favicons, app icons and the social share image
// from assets/logo-source.webp. Re-run with `pnpm images:brand` if the logo changes.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const SRC = "assets/logo-source.webp";
await mkdir("public/icons", { recursive: true });
await mkdir("public/images", { recursive: true });

// 1. White background -> transparent (soft key so anti-aliased edges stay clean).
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const min = Math.min(data[i], data[i + 1], data[i + 2]);
  // 255 -> alpha 0, <=215 -> alpha 255
  const a = Math.max(0, Math.min(255, Math.round(((242 - min) / 70) * 255)));
  data[i + 3] = a;
  if (a > 0 && a < 255) {
    // un-premultiply the white fringe so edges don't glow
    const k = 255 / a;
    for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, Math.round(255 - (255 - data[i + c]) * k)));
  }
}
const keyed = sharp(data, { raw: info });
const trimmed = await keyed.png().toBuffer();
// bounding box of visible pixels (alpha > 40)
let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  if (data[(y * info.width + x) * 4 + 3] > 40) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
}
const logo = await sharp(trimmed).extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 }).toBuffer();
const meta = await sharp(logo).metadata();
const side = Math.max(meta.width, meta.height);
const square = await sharp(logo)
  .extend({
    top: Math.floor((side - meta.height) / 2) + 20,
    bottom: Math.ceil((side - meta.height) / 2) + 20,
    left: Math.floor((side - meta.width) / 2) + 20,
    right: Math.ceil((side - meta.width) / 2) + 20,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp(square).resize(512, 512).png({ compressionLevel: 9 }).toFile("public/images/logo.png");
await sharp(square).resize(256, 256).webp({ quality: 92 }).toFile("public/images/logo.webp");

// 2. White-background icons (favicon / app icons look better on white than transparent).
const onWhite = (size, pad = 0.1) =>
  sharp(square)
    .resize(Math.round(size * (1 - pad * 2)), Math.round(size * (1 - pad * 2)))
    .extend({
      top: Math.round(size * pad), bottom: Math.round(size * pad),
      left: Math.round(size * pad), right: Math.round(size * pad),
      background: "#ffffff",
    })
    .flatten({ background: "#ffffff" })
    .resize(size, size)
    .png();
for (const s of [48, 96, 144, 192, 512]) await onWhite(s).toFile(`public/icons/icon-${s}x${s}.png`);
await onWhite(180, 0.12).toFile("public/icons/apple-touch-icon.png");
await onWhite(32, 0.04).toFile("public/icons/favicon-32x32.png");

// favicon.ico (PNG-in-ICO, 48px) — Next serves app/favicon.ico automatically.
const png48 = await onWhite(48, 0.04).toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(48, 6); header.writeUInt8(48, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png48.length, 14); header.writeUInt32LE(22, 18);
await writeFile("app/favicon.ico", Buffer.concat([header, png48]));

// 3. Open Graph / WhatsApp share image 1200x630.
const logoW = await sharp(square).resize(420, 420).png().toBuffer();
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0c"/>
  <rect x="0" y="0" width="14" height="630" fill="#8f0f2c"/>
  <circle cx="1080" cy="80" r="260" fill="#8f0f2c" opacity=".14"/>
  <rect x="64" y="64" width="470" height="502" rx="6" fill="#ffffff"/>
  <text x="600" y="250" font-family="Geeza Pro, Arial, sans-serif" font-size="64" font-weight="700" fill="#ffffff">سعد جمال للمقاولات</text>
  <text x="600" y="330" font-family="Helvetica Neue, Arial, sans-serif" font-size="46" font-weight="700" fill="#ffffff">Saad Jamal Contracting</text>
  <rect x="600" y="360" width="110" height="5" fill="#c93a58"/>
  <text x="600" y="420" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" fill="#a8a8af">Building &amp; construction in Saudi Arabia</text>
  <text x="600" y="545" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="600" fill="#ffffff">saadjamal.sa</text>
</svg>`;
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#0a0a0c" } })
  .composite([
    { input: Buffer.from(svg), top: 0, left: 0 },
    { input: logoW, top: 105, left: 89 },
  ])
  .jpeg({ quality: 88 })
  .toFile("public/images/og-image.jpg");

console.log("brand assets done", meta.width, meta.height);
