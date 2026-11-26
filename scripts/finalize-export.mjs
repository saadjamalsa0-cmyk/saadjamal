// After `next build`: generate every responsive WebP that the exported pages reference
// (/_img/<width>/<quality>/<original path>.webp). Same technique as gulforbit.sa.
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT = path.resolve("out");
const IMAGE_URL = /\/_img\/(\d+)\/(\d+)(\/[^"'\s,)\\]+)\.webp/g;

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const wanted = new Map();
for (const file of await walk(OUT)) {
  if (!/\.(html|txt|js)$/.test(file)) continue;
  for (const [url, width, quality, src] of (await readFile(file, "utf8")).matchAll(IMAGE_URL)) {
    wanted.set(url, { width: Number(width), quality: Number(quality), src: decodeURI(src) });
  }
}

const missing = [];
const jobs = [...wanted.entries()];
let next = 0;
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (next < jobs.length) {
      const [url, { width, quality, src }] = jobs[next++];
      const input = path.join(OUT, src);
      if (!existsSync(input)) {
        missing.push(src);
        continue;
      }
      const output = path.join(OUT, decodeURI(url));
      await mkdir(path.dirname(output), { recursive: true });
      await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(output);
    }
  }),
);
if (missing.length) throw new Error(`images referenced but missing: ${[...new Set(missing)].join(", ")}`);
console.log(`finalize-export: ${jobs.length} responsive images`);
