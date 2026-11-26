import Image from "next/image";
import { useTranslations } from "next-intl";

export default function OurStory() {
  const t = useTranslations("aboutPage");
  return (
    <section className="section">
      <div className="container grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <span className="eyebrow">{t("title")}</span>
          <h2 className="section-title mt-4">{t("storyTitle")}</h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
            {(t.raw("story") as string[]).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
            <Image src="/images/about-3.jpg" alt={t("imageAlt")} fill sizes="(min-width:1024px) 480px, 92vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-5 start-[-1rem] h-24 w-24 -skew-x-[12deg] bg-crimson-700 sm:start-[-1.5rem]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
