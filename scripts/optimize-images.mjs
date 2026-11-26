// Turns the pictures you generate with ChatGPT into the exact files the website expects.
//
// 1. Save each generated picture next to where it belongs, using the SAME NAME as in IMAGE_PROMPTS.md
//    but with any extension (.png / .jpg / .jpeg / .webp), e.g.  public/images/hero.png
//    (a drop folder also works: put them in  public/images/_incoming/  — e.g. _incoming/hero.png or
//     _incoming/services/mep-works.png)
// 2. Run:  pnpm images:optimize
//
// The script crops to the right shape, resizes, compresses to JPG or transparent WebP, replaces the placeholder,
// and removes the original PNG. Nothing else in the project needs to change.
import sharp from "sharp";
import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";
import { images } from "./image-manifest.mjs";

const ROOT = "public/images";
const exts = [".png", ".jpg", ".jpeg", ".webp"];
let done = 0;

for (const [name, w, h] of images) {
  const base = name.replace(/\.(?:jpe?g|png|webp)$/, "");
  const candidates = [];
  for (const dir of [ROOT, path.join(ROOT, "_incoming")]) {
    for (const ext of exts) {
      const file = path.join(dir, base + ext);
      if (existsSync(file)) candidates.push(file);
    }
  }
  const out = path.join(ROOT, name);
  // Prefer an incoming source, then a sibling with a different extension.
  const source = candidates.find((f) => f.includes("_incoming")) ?? candidates.find((f) => f !== out);
  if (!source) continue;

  const transparent = name.endsWith(".webp");
  const pipeline = sharp(source)
    .rotate()
    .resize(w, h, transparent
      ? { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }
      : { fit: "cover", position: "attention" });
  const buf = await (transparent
    ? pipeline.webp({ quality: 88, alphaQuality: 100 })
    : pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true })).toBuffer();
  await sharp(buf).toFile(out);
  if (source !== out) await rm(source);
  console.log(`✓ ${name}  (${w}×${h}, ${(buf.length / 1024).toFixed(0)} KB)  <-  ${path.relative(ROOT, source)}`);
  done++;
}
console.log(done ? `\nDone: ${done} image(s) updated. Run "pnpm build" to publish.` : "No new pictures found. See IMAGE_PROMPTS.md.");
