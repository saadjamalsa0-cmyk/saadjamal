import { getLocalizedUrl } from "./urls";

/** Reciprocal hreflang: language-only and language-region for both, plus x-default (Arabic). */
export function getLanguageAlternates(path = "") {
  const ar = getLocalizedUrl("ar", path);
  const en = getLocalizedUrl("en", path);
  return { ar, "ar-SA": ar, en, "en-SA": en, "x-default": ar };
}
