import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import BreadcrumbSchema from "@/components/schema/breadcrumb-schema";
import { Swoosh } from "@/components/ui/swoosh";
import { getLocalizedPath } from "@/lib/seo";

type Props = {
  title: string;
  lead?: string;
  /** Trail after "Home". The last item is the current page. */
  crumbs: { name: string; path: string }[];
  /** ISO date of the last content change. */
  updated?: string;
};

/** Inner-page header band with breadcrumbs and BreadcrumbList schema. */
export default function PageHeader({ title, lead, crumbs, updated }: Props) {
  const locale = useLocale();
  const t = useTranslations();
  const trail = [{ name: t("ui.home"), path: "" }, ...crumbs].map((c) => ({ name: c.name, url: getLocalizedPath(locale, c.path) }));

  return (
    <section className="relative isolate overflow-hidden border-b border-ink-200 bg-stone-50 py-12 md:py-20">
      <div className="bg-grid-dark absolute inset-0 -z-10" aria-hidden="true" />
      <Swoosh className="-top-16 -inset-e-40 -z-10 w-[640px] md:w-[820px]" />
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-500">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={c.url} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="font-semibold text-ink-950">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.url} className="transition-colors hover:text-crimson-700">
                      {c.name}
                    </Link>
                  )}
                  {!last && (
                    <span aria-hidden="true" className="text-ink-300 rtl:-scale-x-100">
                      /
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl/10 md:text-5xl/none">{title}</h1>
        <div className="mt-6 h-1 w-20 skew-x-[-30deg] bg-crimson-700" aria-hidden="true" />
        {lead && <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-700 md:text-lg/7">{lead}</p>}
        {updated && (
          <p className="mt-5 text-sm text-ink-500">
            {t("common.updated")}{" "}
            <time dateTime={updated}>
              {new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(updated))}
            </time>
          </p>
        )}
      </div>
      <BreadcrumbSchema items={trail} />
    </section>
  );
}
