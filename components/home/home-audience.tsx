import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icons";
import { Swoosh } from "@/components/ui/swoosh";

/** The one saturated brand band on the home page. */
export default function HomeAudience() {
  const t = useTranslations("audience");
  const items = t.raw("items") as { icon: string; title: string; text: string }[];
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br/srgb from-crimson-700 via-crimson-800 to-crimson-900 py-24 text-white">
      <Swoosh tone="crimson" className="-top-24 -inset-e-48 -z-10 w-[760px]" />
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-white/80!">{t("eyebrow")}</span>
          <h2 className="section-title mt-4 text-white!">{t("title")}</h2>
        </div>
        <div className="mt-14 grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="reveal bg-crimson-800/90 p-8 text-center transition-colors hover:bg-crimson-700">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-crimson-700">
                <Icon name={item.icon} className="h-8 w-8" />
              </span>
              <h3 className="mt-6 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-white/85">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
