import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icons";

export default function MissionVision() {
  const t = useTranslations("aboutPage");
  const blocks = [
    { title: t("missionTitle"), text: t("mission"), icon: "target" },
    { title: t("visionTitle"), text: t("vision"), icon: "gem" },
  ];
  return (
    <section className="section bg-stone-50">
      <div className="container grid gap-6 md:grid-cols-2 lg:gap-8">
        {blocks.map((x) => (
          <div key={x.title} className="card card-active p-7 md:p-10">
            <span className="icon-tile bg-crimson-700 text-white">
              <Icon name={x.icon} className="h-7 w-7" />
            </span>
            <h2 className="mt-6 text-2xl font-bold md:text-3xl">{x.title}</h2>
            <p className="mt-4 leading-relaxed text-ink-600 md:text-lg">{x.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
