// Creates temporary placeholder images so the layout can be previewed before the real photos exist.
// Only writes files that DON'T exist yet — it never overwrites a real photo.
// Real photos: see IMAGE_PROMPTS.md, save them with the exact same file names in public/images/.
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { images } from "./image-manifest.mjs";


let made = 0;
for (const [name, w, h] of images) {
  const file = path.join("public/images", name);
  if (existsSync(file)) continue;
  await mkdir(path.dirname(file), { recursive: true });
  const fs = Math.round(w / 22);
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2a31"/><stop offset="1" stop-color="#0a0a0c"/></linearGradient>
      <pattern id="p" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M64 0H0V64" fill="none" stroke="#ffffff" stroke-opacity=".06"/></pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#p)"/>
    <path d="M0 ${h * 0.82} L${w * 0.35} ${h * 0.5} L${w * 0.5} ${h * 0.5} L${w * 0.15} ${h} L0 ${h} Z" fill="#8f0f2c" fill-opacity=".55"/>
    <text x="50%" y="48%" text-anchor="middle" font-family="Helvetica Neue, Arial" font-size="${fs}" font-weight="700" fill="#ffffff" fill-opacity=".85">PLACEHOLDER</text>
    <text x="50%" y="${48 + 7}%" text-anchor="middle" font-family="Helvetica Neue, Arial" font-size="${Math.round(fs * 0.62)}" fill="#ffffff" fill-opacity=".6">${name} · ${w}×${h}</text>
  </svg>`;
  const placeholder = sharp(Buffer.from(svg));
  await (name.endsWith(".webp") ? placeholder.webp({ quality: 82 }) : placeholder.jpeg({ quality: 82 })).toFile(file);
  made++;
}
console.log(made ? `Created ${made} placeholder image(s).` : "All images already exist — nothing to do.");
