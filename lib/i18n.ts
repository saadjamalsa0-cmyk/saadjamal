import type { Locale } from "@/config/i18n";

export type { Locale };

/** A bilingual value, used by the entity content in content/. UI copy lives in messages/*.json. */
export type Bi<T = string> = { ar: T; en: T };

export const tr = <T,>(value: Bi<T>, locale: string): T => value[locale as Locale];
