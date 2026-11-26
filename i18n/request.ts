import { getRequestConfig } from "next-intl/server";
import { type Locale, locales } from "@/config/i18n";
import { routing } from "./routing";

const messageLoaders = {
  en: () => import("../messages/en.json"),
  ar: () => import("../messages/ar.json"),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = locales.includes(requested as Locale) ? (requested as Locale) : routing.defaultLocale;
  return { locale, messages: (await messageLoaders[locale]()).default };
});
