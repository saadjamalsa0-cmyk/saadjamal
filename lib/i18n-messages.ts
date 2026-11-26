import { notFound } from "next/navigation";
import type { Locale } from "@/config/i18n";

/**
 * Scoped message loading: only namespaces read by Client Components are sent to the browser.
 * Server Components read messages on the server and need nothing here.
 */
type Messages = Record<string, unknown>;

const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  en: () => import("../messages/en.json"),
  ar: () => import("../messages/ar.json"),
};

/** Used by the navbar and the quote form. */
const CLIENT_NAMESPACES = ["nav", "ui", "common", "contactPage"] as const;

export async function getScopedMessages(locale: Locale): Promise<Messages> {
  const loader = loaders[locale];
  if (!loader) notFound();
  const all = (await loader()).default;
  return Object.fromEntries(CLIENT_NAMESPACES.map((key) => [key, all[key]]));
}
