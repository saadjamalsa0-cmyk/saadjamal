import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/section-heading";

/** "How we work" timeline, also used on the About and Services pages. */
export default function HomeProcess({ tone = "white" }: { tone?: "white" | "stone" }) {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; text: string }[];
  return (
    <section className={`py-24 md:py-32 ${tone === "stone" ? "bg-stone-50" : "bg-white"}`}>
      <div className="container">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} center />
        <ol className="relative mt-16 grid gap-0 lg:grid-cols-5 lg:gap-6">
          {/* connecting line: horizontal on desktop */}
          <li className="absolute inset-x-[10%] top-8 hidden h-px bg-linear-to-r/srgb from-crimson-200 via-crimson-700 to-crimson-200 lg:block" aria-hidden="true" />
          {steps.map((step, i) => (
            <li key={step.title} className="reveal group relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:items-center lg:gap-6 lg:pb-0 lg:text-center">
              {/* vertical line on phones */}
              {i < steps.length - 1 && <span className="absolute bottom-0 inset-s-8 top-16 w-px bg-crimson-200 lg:hidden" aria-hidden="true" />}
              <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-crimson-700 bg-white text-xl font-bold text-crimson-700 shadow-card transition-colors group-hover:bg-crimson-700 group-hover:text-white" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
