/**
 * SEO release gate (from gulforbit.sa): crawl every sitemap URL and fail on regressions.
 *
 *   pnpm build && pnpm seo:crawl                        # serves ./out itself and crawls it
 *   node scripts/seo-crawl.mjs https://www.saadjamal.sa     # production, after a deploy
 *
 * Fails on: non-200, canonical, noindex in sitemap, not exactly one <h1>, title > 60 or missing,
 * description outside 120-155, duplicate titles, lang/dir, reciprocal hreflang, JSON-LD parse,
 * Organization without @id, banned claims, untranslated Arabic pages. Warns on weak internal links.
 */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { BANNED_CLAIMS } from "./banned-claims.mjs";

// ---- project settings ---------------------------------------------------------------

const PRODUCTION = process.env.SITE_URL || "https://www.saadjamal.sa";
const PORT = 4599;
const LOCAL = `http://localhost:${PORT}`;

/** First matching prefix wins. The default locale (unprefixed) goes last. */
const LOCALE_RULES = [
  { prefix: "/en", lang: "en", dir: "ltr" },
  { prefix: "", lang: "ar", dir: "rtl" },
];

/** hreflang values every page must declare. */
const REQUIRED_HREFLANG = ["ar", "ar-SA", "en", "en-SA", "x-default"];

/**
 * Facts that may only be published with their condition. A search snippet
 * (title + description) has no room for the condition, so a snippet that states
 * the number without the condition fails. Gulf Orbit's example below.
 */
const CONDITIONAL_CLAIMS = [];

/**
 * Translated-page check: on pages of `lang`, a text node without any character
 * of `script` and with 3+ Latin words is untranslated copy. Technical codes
 * ("ASME Section IX") stay under the limit. Set to null for single-language sites.
 */
const TRANSLATION_CHECK = { lang: "ar", script: /[؀-ۿ]/, maxEnglishNodes: 3 };

const CONCURRENCY = 8;
/** Every indexable page should be reachable from at least this many others. */
const MIN_INLINKS = 3;
const TIMEOUT_MS = 30_000;

// -------------------------------------------------------------------------------------

const TARGET = (process.argv[2] || LOCAL).replace(/\/+$/, "");

/** Minimal static server for ./out when no target is given. */
async function serveOut() {
  const types = { ".html": "text/html; charset=utf-8", ".xml": "application/xml", ".txt": "text/plain" };
  const server = createServer(async (req, res) => {
    let file = path.join("out", decodeURIComponent(new URL(req.url, LOCAL).pathname));
    try {
      // Same resolution as the hosts: /about -> about.html, / -> index.html.
      const isFile = await stat(file).then((s) => s.isFile(), () => false);
      if (!isFile) file = file === "out" || file === "out/" ? "out/index.html" : `${file.replace(/\/$/, "")}.html`;
      const body = await readFile(file);
      res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise((resolve) => server.listen(PORT, resolve));
  return server;
}
const headers = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  ? { "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET }
  : {};

const toTarget = (url) => url.replace(PRODUCTION, TARGET);
const normalize = (url) => url.replace(/\/+$/, "") || url;
const pathOf = (url) => url.replace(PRODUCTION, "") || "/";
const localeOf = (url) => LOCALE_RULES.find((r) => pathOf(url) === r.prefix || pathOf(url).startsWith(`${r.prefix}/`) || r.prefix === "");

async function fetchText(url) {
  const res = await fetch(url, { headers, redirect: "manual", signal: AbortSignal.timeout(TIMEOUT_MS) });
  return { status: res.status, text: res.status === 200 ? await res.text() : "" };
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function inspect(url, html) {
  const head = html.slice(0, html.indexOf("</head>") + 7);
  const one = (re) => (head.match(re) || [])[1];
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  // Visible text only: drop scripts (including framework payloads) and tags.
  const visible = decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " "));
  const textNodes = [...html.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/g, " ").matchAll(/>([^<>]+)</g)]
    .map((m) => decode(m[1]).trim())
    .filter(Boolean);
  return {
    url,
    title: decode(one(/<title[^>]*>([\s\S]*?)<\/title>/) || ""),
    description: decode(one(/<meta name="description" content="([^"]*)"/) || ""),
    canonical: one(/<link rel="canonical" href="([^"]*)"/),
    robots: one(/<meta name="robots" content="([^"]*)"/) || "",
    lang: (html.match(/<html[^>]*\slang="([^"]*)"/) || [])[1],
    dir: (html.match(/<html[^>]*\sdir="([^"]*)"/) || [])[1],
    links: [...new Set([...html.matchAll(/<a[^>]*href="(\/[^"#?]*)"/g)].map((m) => m[1]))],
    h1Count: (html.match(/<h1[\s>]/g) || []).length,
    hreflang: [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)].map((m) => [m[1], m[2]]),
    jsonLd,
    visible,
    textNodes,
  };
}

function nodes(value, out = []) {
  if (Array.isArray(value)) value.forEach((v) => nodes(v, out));
  else if (value && typeof value === "object") {
    out.push(value);
    Object.values(value).forEach((v) => nodes(v, out));
  }
  return out;
}

async function pool(items, worker) {
  const results = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await worker(items[i]);
      }
    }),
  );
  return results;
}

async function main() {
  const server = process.argv[2] ? null : await serveOut();
  const sitemap = await fetchText(`${TARGET}/sitemap.xml`);
  if (sitemap.status !== 200) throw new Error(`sitemap.xml returned ${sitemap.status}`);
  const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`Crawling ${urls.length} URLs from ${TARGET}\n`);

  const failures = [];
  const warnings = [];
  const fail = (url, message) => failures.push(`${pathOf(url)}  ${message}`);
  // Warnings are reported but do not fail the run: known weaknesses, not regressions.
  const warn = (url, message) => warnings.push(`${pathOf(url)}  ${message}`);

  const pages = await pool(urls, async (url) => {
    try {
      const { status, text } = await fetchText(toTarget(url));
      if (status !== 200) return fail(url, `status ${status}`), null;
      return inspect(url, text);
    } catch (err) {
      return fail(url, `fetch failed: ${err.message}`), null;
    }
  });

  const byUrl = new Map(pages.filter(Boolean).map((p) => [normalize(p.url), p]));
  const titles = new Map();

  // Inbound internal links, counted from the crawled pages themselves.
  const inlinks = new Map();
  for (const p of byUrl.values()) {
    const from = normalize(p.url);
    for (const href of p.links) {
      const to = normalize(PRODUCTION + (href === "/" ? "" : href));
      if (to === from) continue;
      if (!inlinks.has(to)) inlinks.set(to, new Set());
      inlinks.get(to).add(from);
    }
  }

  for (const p of byUrl.values()) {
    if (!p.canonical) fail(p.url, "missing canonical");
    else if (normalize(p.canonical) !== normalize(p.url)) fail(p.url, `canonical points to ${p.canonical}`);
    if (/noindex/i.test(p.robots)) fail(p.url, "noindex page listed in sitemap");
    if (p.h1Count !== 1) fail(p.url, `${p.h1Count} <h1> elements`);

    const rule = localeOf(p.url);
    if (rule && (p.lang !== rule.lang || p.dir !== rule.dir))
      fail(p.url, `lang=${p.lang} dir=${p.dir}, expected ${rule.lang}/${rule.dir}`);

    if (TRANSLATION_CHECK && rule?.lang === TRANSLATION_CHECK.lang) {
      const untranslated = p.textNodes.filter(
        (t) => !TRANSLATION_CHECK.script.test(t) && (t.match(/[A-Za-z]{3,}/g) || []).length >= 3,
      );
      if (untranslated.length > TRANSLATION_CHECK.maxEnglishNodes)
        fail(p.url, `${untranslated.length} untranslated text blocks, e.g. "${untranslated[0].slice(0, 60)}"`);
    }

    const inbound = inlinks.get(normalize(p.url))?.size ?? 0;
    if (inbound < MIN_INLINKS) warn(p.url, `only ${inbound} internal link(s) point here`);

    if (!p.title) fail(p.url, "missing <title>");
    if (!p.description) fail(p.url, "missing meta description");
    if (p.title.length > 60) fail(p.url, `title is ${p.title.length} characters (max 60)`);
    if (p.description && (p.description.length < 120 || p.description.length > 155))
      fail(p.url, `description is ${p.description.length} characters (120-155)`);
    titles.set(p.title, [...(titles.get(p.title) || []), p.url]);

    if (REQUIRED_HREFLANG.length) {
      const langs = new Set(p.hreflang.map(([lang]) => lang));
      for (const lang of REQUIRED_HREFLANG) if (!langs.has(lang)) fail(p.url, `missing hreflang ${lang}`);
      for (const [lang, href] of p.hreflang) {
        const alt = byUrl.get(normalize(href));
        if (!alt) fail(p.url, `hreflang ${lang} target not in sitemap: ${href}`);
        else if (!alt.hreflang.some(([, back]) => normalize(back) === normalize(p.url)))
          fail(p.url, `hreflang ${lang} target does not link back`);
      }
    }

    for (const block of p.jsonLd) {
      let data;
      try {
        data = JSON.parse(block);
      } catch {
        fail(p.url, "JSON-LD does not parse");
        continue;
      }
      for (const node of nodes(data)) {
        if (node["@type"] === "Organization" && !node["@id"]) fail(p.url, "Organization node without @id");
      }
    }

    // Titles and descriptions show in search results, so they are scanned too.
    const scanned = [p.title, p.description, p.visible, p.jsonLd.join(" ")].join(" ");
    for (const re of BANNED_CLAIMS) {
      const hit = scanned.match(re);
      if (hit) fail(p.url, `banned claim: "${hit[0]}"`);
    }

    const snippet = `${p.title} ${p.description}`;
    for (const c of CONDITIONAL_CLAIMS) {
      if (c.number.test(snippet) && !c.condition.test(snippet))
        fail(p.url, `title/description states ${c.name} without its condition`);
    }
  }

  for (const [title, list] of titles) {
    if (list.length > 1) fail(list[0], `duplicate title "${title}" also on ${list.slice(1).map(pathOf).join(", ")}`);
  }

  if (warnings.length) {
    console.warn(`WARNINGS: ${warnings.length} (not blocking)\n`);
    for (const w of warnings.sort()) console.warn(`  ${w}`);
    console.warn("");
  }

  if (failures.length) {
    console.error(`FAILED: ${failures.length} problem(s)\n`);
    for (const f of failures.sort()) console.error(`  ${f}`);
    process.exit(1);
  }
  console.log(`OK: ${byUrl.size} pages passed all checks.`);
  server?.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
