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
async function onWhite(size, pad = 0.1) {
  const inner = Math.round(size * (1 - pad * 2));
  const margin = Math.floor((size - inner) / 2);
  const resized = await sharp(square).resize(inner, inner).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 3, background: "#ffffff" } })
    .composite([{ input: resized, top: margin, left: margin }])
    .png();
}
for (const s of [48, 96, 144, 192, 512]) await (await onWhite(s)).toFile(`public/icons/icon-${s}x${s}.png`);
await (await onWhite(180, 0.12)).toFile("public/icons/apple-touch-icon.png");
await (await onWhite(32, 0.04)).toFile("public/icons/favicon-32x32.png");

// favicon.ico (PNG-in-ICO, 48px) — Next serves app/favicon.ico automatically.
const png48 = await (await onWhite(48, 0.04)).toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(48, 6); header.writeUInt8(48, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png48.length, 14); header.writeUInt32LE(22, 18);
await writeFile("app/favicon.ico", Buffer.concat([header, png48]));

// 3. Open Graph / WhatsApp share image 1200x630.
const logoW = await sharp(square).resize(420, 420).png().toBuffer();
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#faf9f7"/>
  <rect x="0" y="0" width="18" height="630" fill="#8f0f2c"/>
  <circle cx="1100" cy="60" r="250" fill="#8f0f2c" opacity=".07"/>
  <text x="600" y="250" font-family="Geeza Pro, Arial, sans-serif" font-size="64" font-weight="700" fill="#0a0a0c">سعد جمال للمقاولات</text>
  <text x="600" y="330" font-family="Helvetica Neue, Arial, sans-serif" font-size="46" font-weight="700" fill="#0a0a0c">Saad Jamal Contracting</text>
  <rect x="600" y="360" width="110" height="6" fill="#8f0f2c"/>
  <text x="600" y="420" font-family="Helvetica Neue, Arial, sans-serif" font-size="28" fill="#555560">Scaffolders &amp; specialized manpower in Saudi Arabia</text>
  <text x="600" y="545" font-family="Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="600" fill="#8f0f2c">saadjamal.sa</text>
</svg>`;
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#faf9f7" } })
  .composite([
    { input: Buffer.from(svg), top: 0, left: 0 },
    { input: logoW, top: 105, left: 100 },
  ])
  .jpeg({ quality: 88 })
  .toFile("public/images/og-image.jpg");

console.log("brand assets done", meta.width, meta.height);

// 4. A 1200x630 share image per service (photo + logo), used as that page's og:image.
await mkdir("public/og", { recursive: true });
const badge = await sharp({ create: { width: 190, height: 190, channels: 3, background: "#ffffff" } })
  .composite([{ input: await sharp(square).resize(170, 170).png().toBuffer(), top: 10, left: 10 }])
  .png()
  .toBuffer();
const bar = Buffer.from('<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect y="612" width="1200" height="18" fill="#8f0f2c"/></svg>');
for (const slug of ["scaffolders-supply", "welder-supply", "manpower-supply"]) {
  await sharp(`public/images/services/${slug}.jpg`)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .composite([{ input: bar, top: 0, left: 0 }, { input: badge, top: 390, left: 40 }])
    .jpeg({ quality: 82 })
    .toFile(`public/og/${slug}.jpg`);
}
console.log("service share images done");
