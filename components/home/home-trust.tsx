import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icons";

/** Key points in one raised panel that overlaps the hero. */
export default function HomeTrust() {
  const t = useTranslations();
  const items = t.raw("trust.items") as { icon: string; title: string; text: string }[];
  return (
    <section aria-label={t("common.whyTrust")} className="relative z-20 -mt-16 lg:-mt-20">
      <div className="container">
        <div className="grid border border-ink-200 bg-ink-200 shadow-lift gap-px md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="group flex items-start gap-4 bg-white p-6 transition-colors hover:bg-stone-50 lg:flex-col lg:gap-5 lg:p-8">
              <span className="icon-tile icon-tile-sm">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-ink-950 lg:text-lg">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
