import type { Bi } from "@/lib/i18n";

/**
 * Trades a buyer can ask for, grouped as on the group company's worker-category list.
 * Presented as "ask for", never as stock or headcount: availability is confirmed per quotation.
 */
export const tradeGroups: { name: Bi; trades: Bi[] }[] = [
  {
    name: { ar: "الأعمال المدنية", en: "Civil" },
    trades: [
      { ar: "نجار مسلح", en: "Shuttering carpenter" },
      { ar: "حداد مسلح", en: "Steel fixer" },
      { ar: "بنّاء بلوك", en: "Block mason" },
      { ar: "لياس", en: "Plaster mason" },
      { ar: "مبلط", en: "Tile fitter" },
      { ar: "فني جبس", en: "Gypsum worker" },
      { ar: "عامل مدني مساعد", en: "Civil helper" },
    ],
  },
  {
    name: { ar: "السقالات واللحام", en: "Scaffolding and welding" },
    trades: [
      { ar: "عامل سقالات", en: "Scaffolder" },
      { ar: "فورمان سقالات", en: "Scaffolding foreman" },
      { ar: "لحام 3G", en: "3G welder" },
      { ar: "لحام 6G", en: "6G welder" },
      { ar: "لحام تيج", en: "TIG welder" },
    ],
  },
  {
    name: { ar: "الميكانيكا والأنابيب", en: "Mechanical and piping" },
    trades: [
      { ar: "فني تركيب أنابيب", en: "Pipe fitter" },
      { ar: "فني تصنيع أنابيب", en: "Pipe fabricator" },
      { ar: "عامل حديد", en: "Iron worker" },
      { ar: "فني مجاري هواء", en: "Duct fitter" },
      { ar: "ميكانيكي تركيبات (ميل رايت)", en: "Millwright fitter" },
    ],
  },
  {
    name: { ar: "الكهرباء والأجهزة", en: "Electrical and instrumentation" },
    trades: [
      { ar: "كهربائي", en: "Electrician" },
      { ar: "فني إنهاء كابلات", en: "Cable termination technician" },
      { ar: "ساحب كابلات", en: "Cable puller" },
      { ar: "فني أجهزة دقيقة", en: "Instrument technician" },
    ],
  },
  {
    name: { ar: "الدهان", en: "Painting" },
    trades: [
      { ar: "دهان رول", en: "Roller painter" },
      { ar: "دهان رش", en: "Spray painter" },
      { ar: "عامل سفع رملي", en: "Sand blaster" },
    ],
  },
  {
    name: { ar: "المشغلون والسائقون", en: "Operators and drivers" },
    trades: [
      { ar: "مشغل رافعة", en: "Crane operator" },
      { ar: "مشغل رافعة شوكية", en: "Forklift operator" },
      { ar: "مشغل رافعة أشخاص", en: "Man lift operator" },
      { ar: "سائق", en: "Driver" },
    ],
  },
];
