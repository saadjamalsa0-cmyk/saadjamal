import assert from "node:assert/strict";
import { test } from "node:test";
import { getLanguageAlternates } from "../lib/seo/alternates.ts";
import { cleanPath, getLocalizedPath, getLocalizedUrl } from "../lib/seo/urls.ts";

test("Arabic is served at the root and English under /en, without trailing slashes", () => {
  assert.equal(getLocalizedPath("ar"), "/");
  assert.equal(getLocalizedPath("en"), "/en");
  assert.equal(getLocalizedPath("ar", "/about/"), "/about");
  assert.equal(getLocalizedPath("en", "services/welder-supply"), "/en/services/welder-supply");
  assert.equal(cleanPath("/en/about?x=1#y"), "about");
  assert.equal(getLocalizedUrl("ar"), "https://www.saadjamal.sa");
});

test("hreflang covers both languages, both regions and x-default", () => {
  const alternates = getLanguageAlternates("about");
  assert.deepEqual(Object.keys(alternates), ["ar", "ar-SA", "en", "en-SA", "x-default"]);
  assert.equal(alternates["x-default"], "https://www.saadjamal.sa/about");
  assert.equal(alternates.en, "https://www.saadjamal.sa/en/about");
});
