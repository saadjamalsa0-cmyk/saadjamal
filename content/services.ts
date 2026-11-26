import type { Bi } from "@/lib/i18n";

export type ServiceIcon = "scaffold" | "welder" | "users" | "tractor";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  /** File in /public/images/services — see IMAGE_PROMPTS.md */
  image: string;
  name: Bi;
  /** One-sentence summary used on cards and in meta descriptions. */
  short: Bi;
  /** Paragraphs under the page heading. */
  intro: Bi;
  includes: Bi<string[]>;
  includesTitle?: Bi;
  faqs: Bi<{ q: string; a: string }[]>;
};

/** The four services — same business model as the company brochure. */
export const services: Service[] = [
  {
    slug: "scaffolders-supply",
    icon: "scaffold",
    image: "/images/services/scaffolders-supply.jpg",
    name: { ar: "توريد عمال السقالات", en: "Scaffolders Supply" },
    short: {
      ar: "عمال سقالات لتركيب وتعديل وفك السقالات في مشاريع البناء والصيانة والأعمال الصناعية.",
      en: "Scaffolders to erect, alter and dismantle scaffolds on construction, maintenance and industrial projects.",
    },
    intro: {
      ar: "نقدم حلول سقالات متكاملة بحسب متطلبات المشروع، من التركيب حتى الفحص والفك، بتوريد عمال سقالات لمشاريع البناء والصيانة والأعمال الصناعية في المملكة العربية السعودية.",
      en: "We provide scaffolding crews to suit your project, from erection through inspection to dismantling, for construction, maintenance and industrial projects in Saudi Arabia.",
    },
    includesTitle: { ar: "تشمل خدماتنا", en: "Our expertise includes" },
    includes: {
      ar: [
        "تركيب وفك هياكل السقالات",
        "أنظمة السقالات المعلقة",
        "السقالات المتنقلة والبرجية",
        "السقالات الكابولية والمعلقة",
        "السقالات النظامية (كابلوك، رينج لوك، كويكستيج)",
        "السقالات الأنبوبية والمثبتة",
      ],
      en: [
        "Erection and dismantling of scaffolding structures",
        "Suspended scaffolding systems",
        "Mobile and tower scaffolding",
        "Cantilever and hanging scaffolds",
        "System scaffolding (Cuplock, Ringlock, Kwikstage)",
        "Tube and fitting scaffolding",
      ],
    },
    faqs: {
      ar: [
        {
          q: "ما أنواع السقالات التي يتعامل معها عمالكم؟",
          a: "السقالات النظامية (كابلوك، رينج لوك، كويكستيج)، والأنبوبية والمثبتة، والمتنقلة والبرجية، والمعلقة والكابولية، إضافة إلى أعمال التركيب والفحص والفك.",
        },
        {
          q: "هل يمكن توريد عمال سقالات لفترة قصيرة أو طويلة؟",
          a: "نعم، نورّد بشكل مؤقت أو بحسب مدة المشروع، ونحدد الأعداد والمدة في عرض السعر.",
        },
      ],
      en: [
        {
          q: "Which scaffolding types can your workers handle?",
          a: "System scaffolding (Cuplock, Ringlock, Kwikstage), tube and fitting, mobile and tower, and suspended and cantilever scaffolds, including erection, inspection and dismantling.",
        },
        {
          q: "Can you supply scaffolders for short or long periods?",
          a: "Yes. We supply temporarily or for the length of the project, and state numbers and duration in the quotation.",
        },
      ],
    },
  },
  {
    slug: "welder-supply",
    icon: "welder",
    image: "/images/services/welder-supply.jpg",
    name: { ar: "توريد اللحامين", en: "Welder Supply" },
    short: {
      ar: "لحامون للأعمال الإنشائية والميكانيكية والصناعية.",
      en: "Welders for structural, mechanical and industrial works.",
    },
    intro: {
      ar: "نوفر لحامين مهرة لأعمال اللحام الإنشائية والميكانيكية والصناعية، بالأعداد والتخصصات التي يحتاجها مشروعك، مع الالتزام بمتطلبات الجودة والسلامة في الموقع.",
      en: "We supply skilled welders for structural, mechanical and industrial welding, in the numbers and specialities your project needs, in line with site quality and safety requirements.",
    },
    includes: {
      ar: [
        "لحام الهياكل الإنشائية والمعدنية",
        "لحام الأنابيب والخطوط",
        "لحام الصيانة والإصلاح",
        "أعمال التصنيع والتجميع في الورش",
        "الالتزام بمتطلبات الجودة والفحص في الموقع",
        "الالتزام بإجراءات السلامة والأعمال الساخنة",
      ],
      en: [
        "Structural and steel-frame welding",
        "Pipe and pipeline welding",
        "Maintenance and repair welding",
        "Workshop fabrication and assembly",
        "Site quality and inspection requirements",
        "Safety and hot-work procedures",
      ],
    },
    faqs: {
      ar: [
        {
          q: "هل يمكن توريد لحامين لمدة قصيرة؟",
          a: "نعم، نورّد لحامين بشكل مؤقت أو بحسب مدة المشروع.",
        },
        {
          q: "كيف أتأكد من مهارة اللحامين؟",
          a: "يمكن مراجعة المؤهلات أو إجراء اختبار مهارة قبل المباشرة، بحسب متطلبات مشروعك وجهة التشغيل.",
        },
      ],
      en: [
        {
          q: "Can you supply welders for a short period?",
          a: "Yes. We supply welders temporarily or for the length of the project.",
        },
        {
          q: "How can I verify the welders' skills?",
          a: "Qualifications can be reviewed or a skills test arranged before mobilisation, according to your project and site requirements.",
        },
      ],
    },
  },
  {
    slug: "manpower-supply",
    icon: "users",
    image: "/images/services/manpower-supply.jpg",
    name: { ar: "توريد العمالة العامة والمتخصصة", en: "General & Specialized Manpower" },
    short: {
      ar: "عمالة ماهرة ونصف ماهرة وعامة لتلبية جميع احتياجات المشاريع.",
      en: "Skilled, semi-skilled and general workers for all project needs.",
    },
    intro: {
      ar: "نوفر عمالة ماهرة ونصف ماهرة وعامة لمشاريعك بتوريد مرن مؤقت أو بحسب مدة المشروع، بنطاق مكتوب يحدد التخصصات والأعداد.",
      en: "We supply skilled, semi-skilled and general workers with flexible supply, temporary or for the length of the project, under a written scope that fixes trades and numbers.",
    },
    includes: {
      ar: [
        "عمال ماهرون في البناء والتشطيب",
        "عمال نصف ماهرين ومساعدون",
        "عمالة عامة للمواقع والمشاريع",
        "فنيون متخصصون بحسب طلبك",
        "توريد مؤقت أو بحسب مدة المشروع",
        "شفافية في تتبع التكاليف ودفع المستحقات في وقتها",
      ],
      en: [
        "Skilled workers for construction and finishing",
        "Semi-skilled workers and helpers",
        "General labour for sites and projects",
        "Specialist technicians on request",
        "Temporary or project-length supply",
        "Transparent cost tracking and timely payments",
      ],
    },
    faqs: {
      ar: [
        {
          q: "كيف أطلب عمالة لمشروعي؟",
          a: "أرسل لنا التخصصات والأعداد وموقع المشروع ومدة العمل المتوقعة، وسنرد عليك بعرض سعر مكتوب.",
        },
        {
          q: "ما مدة توريد العمالة؟",
          a: "نورّد بشكل مؤقت أو بحسب مدة مشروعك.",
        },
      ],
      en: [
        {
          q: "How do I request workers for my project?",
          a: "Send us the trades, numbers, project location and expected duration, and we will reply with a written quotation.",
        },
        {
          q: "How long can the manpower be supplied for?",
          a: "Temporarily or for the length of your project.",
        },
      ],
    },
  },
  {
    slug: "equipment-rental",
    icon: "tractor",
    image: "/images/services/equipment-rental.jpg",
    name: { ar: "تأجير المعدات", en: "Equipment Rental" },
    short: {
      ar: "معدات وأدوات لأعمال البناء والمهام الصناعية، ويُؤكَّد توفرها في عرض السعر.",
      en: "Equipment and tools for construction and industrial tasks, with availability confirmed in the quotation.",
    },
    intro: {
      ar: "نؤجر معدات وأدوات لأعمال البناء والمهام الصناعية. أخبرنا بنوع المعدة وقدرتها ومدة الإيجار وموقع العمل، ونؤكد التوفر وحالة المعدة والمشغل في عرض السعر.",
      en: "We rent equipment and tools for construction and industrial work. Tell us the type, capacity, rental period and site, and we confirm availability, condition and operator in the quotation.",
    },
    includes: {
      ar: [
        "معدات الحفر والتسوية والدك",
        "الرافعات والمعدات الثقيلة",
        "معدات النقل والتحميل",
        "أدوات وعدد البناء",
        "توفير مشغلين عند الحاجة",
        "إيجار يومي أو أسبوعي أو شهري",
      ],
      en: [
        "Excavation, grading and compaction equipment",
        "Cranes and heavy equipment",
        "Transport and loading equipment",
        "Construction tools and equipment",
        "Operators supplied when required",
        "Daily, weekly or monthly rental",
      ],
    },
    faqs: {
      ar: [
        {
          q: "هل يشمل الإيجار مشغلًا؟",
          a: "يمكن التأجير مع مشغل أو بدونه بحسب طلبك، وتُوضَّح التفاصيل في عرض السعر.",
        },
        {
          q: "ما مدة الإيجار المتاحة؟",
          a: "يمكن الإيجار بنظام يومي أو أسبوعي أو شهري، أو بحسب مدة المشروع.",
        },
      ],
      en: [
        {
          q: "Does the rental include an operator?",
          a: "Equipment can be rented with or without an operator as you prefer, and the details are stated in the quotation.",
        },
        {
          q: "What rental periods are available?",
          a: "Daily, weekly or monthly, or to match the length of your project.",
        },
      ],
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
