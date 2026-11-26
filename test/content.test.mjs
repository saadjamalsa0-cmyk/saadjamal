import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { serviceDetails } from "../content/service-details.ts";
import { services } from "../content/services.ts";
import { tradeGroups } from "../content/trades.ts";
import { BANNED_CLAIMS } from "../scripts/banned-claims.mjs";

const messages = Object.fromEntries(["ar", "en"].map((l) => [l, JSON.parse(readFileSync(`messages/${l}.json`, "utf8"))]));

const keys = (v, at = "") =>
  Array.isArray(v)
    ? v.flatMap((x, i) => keys(x, `${at}[${i}]`))
    : v && typeof v === "object"
      ? Object.entries(v).flatMap(([k, x]) => keys(x, `${at}.${k}`))
      : [at];

test("Arabic and English messages have the same structure", () => {
  assert.deepEqual(keys(messages.ar).sort(), keys(messages.en).sort());
});

test("no banned claim appears in any message or content file", () => {
  const text = JSON.stringify([messages, services, serviceDetails, tradeGroups]);
  for (const claim of BANNED_CLAIMS) assert.doesNotMatch(text, claim);
});

test("titles are at most 60 characters and descriptions 120-155", () => {
  for (const [lang, m] of Object.entries(messages)) {
    const { serviceDetail, privacy, ...pages } = m.seo;
    for (const [name, meta] of Object.entries({ ...pages, ...serviceDetail })) {
      assert.ok(meta.title.length <= 60, `${lang} ${name}: title ${meta.title.length}`);
      assert.ok(meta.description.length >= 120 && meta.description.length <= 155, `${lang} ${name}: description ${meta.description.length}`);
    }
  }
});

test("every service has metadata, depth, images and a share image in both languages", () => {
  for (const s of services) {
    assert.ok(existsSync(`public${s.image}`), `${s.slug}: image missing`);
    assert.ok(existsSync(`public/og/${s.slug}.jpg`), `${s.slug}: share image missing`);
    for (const lang of ["ar", "en"]) {
      assert.ok(messages[lang].seo.serviceDetail[s.slug], `${s.slug} ${lang}: no metadata`);
      const detail = serviceDetails[s.slug][lang];
      assert.ok(s.faqs[lang].length + detail.faqs.length >= 6, `${s.slug} ${lang}: fewer than 6 FAQs`);
      assert.ok(detail.sections.length >= 3 && detail.request.length >= 4 && detail.checks.length >= 4, `${s.slug} ${lang}: thin`);
    }
  }
});
