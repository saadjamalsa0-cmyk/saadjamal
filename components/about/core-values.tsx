import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/section-heading";

export default function CoreValues() {
  const t = useTranslations("aboutPage");
  const values = t.raw("values") as { icon: string; title: string; text: string }[];
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow={t("valuesTitle")} title={t("valuesTitle")} center />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="card card-hover p-7 md:p-8">
              <span className="icon-tile">
                <Icon name={v.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-500">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
