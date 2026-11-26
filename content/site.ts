import type { Bi } from "@/lib/i18n";

/**
 * All shared copy for the site, authored once as {ar, en}.
 * Nothing here states a number, certification, client or year of experience
 * that is not documented — the company's CR was issued on 19 Nov 2026, so the
 * copy sells method and commitments, not history.
 */

export const nav = [
  { href: "/", label: { ar: "الرئيسية", en: "Home" } },
  { href: "/about/", label: { ar: "من نحن", en: "About Us" } },
  { href: "/services/", label: { ar: "خدماتنا", en: "Services" } },
  { href: "/contact/", label: { ar: "تواصل معنا", en: "Contact" } },
] satisfies { href: string; label: Bi }[];

export const ui = {
  requestQuote: { ar: "اطلب عرض سعر", en: "Request a Quote" },
  whatsapp: { ar: "تواصل عبر واتساب", en: "Chat on WhatsApp" },
  callUs: { ar: "اتصل بنا", en: "Call us" },
  learnMore: { ar: "اعرف المزيد", en: "Learn more" },
  viewAllServices: { ar: "عرض كل الخدمات", en: "View all services" },
  readMore: { ar: "تفاصيل الخدمة", en: "Service details" },
  home: { ar: "الرئيسية", en: "Home" },
  menu: { ar: "القائمة", en: "Menu" },
  close: { ar: "إغلاق", en: "Close" },
  skipToContent: { ar: "تخطي إلى المحتوى", en: "Skip to content" },
  switchLanguage: { ar: "English", en: "العربية" },
  switchLanguageLabel: { ar: "Switch to English", en: "التبديل إلى العربية" },
  allRightsReserved: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  privacy: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  whatWeDo: { ar: "ما نقدمه", en: "What we do" },
  whatsIncluded: { ar: "ما تشمله الخدمة", en: "What the service covers" },
  relatedServices: { ar: "خدمات أخرى قد تهمك", en: "Other services you may need" },
  faqTitle: { ar: "أسئلة شائعة", en: "Frequently asked questions" },
};

export const hero = {
  eyebrow: { ar: "عمال سقالات · لحامون · عمالة متخصصة · تأجير معدات", en: "Scaffolders · Welders · Specialized manpower · Equipment rental" },
  titleA: { ar: "توريد عمال السقالات والعمالة المتخصصة", en: "Scaffolders & specialized manpower" },
  titleB: { ar: "لمشاريعك في أنحاء المملكة", en: "for projects across Saudi Arabia" },
  text: {
    ar: "مؤسسة سعد جمال الاسمري للمقاولات (سجل تجاري 7055602549) تورّد عمال السقالات واللحامين والعمالة العامة والمتخصصة وتؤجر المعدات لمشاريع البناء والصيانة والأعمال الصناعية في المملكة العربية السعودية، من مقرها في الدمام.",
    en: "Saad Jamal Al-Asmari Contracting Establishment (CR 7055602549) supplies scaffolders, welders, general and specialized workers and rents equipment for construction, maintenance and industrial projects across Saudi Arabia, from its office in Dammam.",
  },
  badges: [
    { ar: "سجل تجاري نشط", en: "Active commercial registration" },
    { ar: "عرض سعر مكتوب لكل طلب", en: "Written quotation for every request" },
    { ar: "توريد مؤقت أو بحسب مدة المشروع", en: "Temporary or project-length supply" },
  ] as Bi[],
};

export const trust = {
  items: [
    {
      icon: "badge",
      title: { ar: "منشأة مسجلة رسميًا", en: "Officially registered" },
      text: { ar: "سجل تجاري نشط من وزارة التجارة", en: "Active Commercial Registration, Ministry of Commerce" },
    },
    {
      icon: "hardhat",
      title: { ar: "عمالة بحسب تخصصك", en: "Crews matched to your scope" },
      text: { ar: "سقالات ولحام وعمالة عامة ومتخصصة", en: "Scaffolding, welding, general and specialist labour" },
    },
    {
      icon: "shield",
      title: { ar: "السلامة أولًا", en: "Safety first" },
      text: { ar: "اتفاق على متطلبات السلامة قبل المباشرة", en: "Site safety requirements agreed before work starts" },
    },
    {
      icon: "file",
      title: { ar: "شفافية في التكاليف", en: "Transparent costs" },
      text: { ar: "تتبع واضح للتكاليف ودفع المستحقات في وقتها", en: "Clear cost tracking and timely payments" },
    },
  ] as { icon: string; title: Bi; text: Bi }[],
};

export const aboutHome = {
  eyebrow: { ar: "نبذة عن شركتنا", en: "About our company" },
  title: { ar: "حلول عمالة متخصصة بتركيز على عمال السقالات", en: "Specialist manpower, with a focus on scaffolders" },
  paragraphs: {
    ar: [
      "في سعد جمال للمقاولات، نركّز على تقديم حلول عمالة متخصصة، مع اهتمام خاص بعمال السقالات، إلى جانب اللحامين والعمالة العامة والمتخصصة وتأجير المعدات.",
      "نلبي احتياجات مشاريعكم بتوريد مرن مؤقت أو بحسب مدة المشروع، بنطاق مكتوب يحدد الأعداد والتخصصات والمدة ومتطلبات الموقع قبل المباشرة.",
    ],
    en: [
      "At Saad Jamal Contracting we focus on specialist manpower, scaffolders above all, together with welders, general and specialist workers and equipment rental.",
      "We meet your project needs with flexible supply, temporary or for the length of the project, under a written scope that fixes numbers, trades, duration and site requirements before work starts.",
    ],
  } as Bi<string[]>,
  points: {
    ar: ["تركيز على عمال السقالات", "توريد مرن، مؤقت أو بحسب مدة المشروع", "التزام بالسلامة والجودة"],
    en: ["A focus on scaffolders", "Flexible supply, temporary or project-length", "Commitment to safety and quality"],
  } as Bi<string[]>,
  imageAlt: {
    ar: "مهندس وفريق موقع يراجعون مخططات مشروع إنشائي",
    en: "Site engineer and team reviewing construction drawings",
  },
  imageAlt2: {
    ar: "أعمال خرسانة وتسليح في موقع بناء",
    en: "Concrete and reinforcement works on a building site",
  },
};

export const servicesSection = {
  eyebrow: { ar: "خدماتنا", en: "Our services" },
  title: { ar: "عمالة ومعدات لمشاريع البناء والصناعة", en: "Workforce and equipment for construction and industry" },
  text: {
    ar: "أربع خدمات تغطي احتياج مشروعك من العمالة والمعدات، بعدد ومدة تناسب عملك.",
    en: "Four services covering your project's workforce and equipment needs, in the numbers and duration you need.",
  },
};

export const process = {
  eyebrow: { ar: "كيف نعمل", en: "How we work" },
  title: { ar: "خمس خطوات واضحة من الطلب إلى الموقع", en: "Five clear steps from request to site" },
  steps: [
    {
      title: { ar: "تحديد المتطلبات", en: "Define requirements" },
      text: {
        ar: "تخبرنا بالتخصصات والأعداد والمدة وموقع المشروع.",
        en: "You tell us the trades, numbers, duration and project location.",
      },
    },
    {
      title: { ar: "عرض السعر", en: "Written quotation" },
      text: {
        ar: "نرسل عرضًا مكتوبًا واضحًا يشمل الأعداد والمدة والتكلفة.",
        en: "We send a clear written quotation covering numbers, duration and cost.",
      },
    },
    {
      title: { ar: "التعاقد والتوثيق", en: "Contract & documents" },
      text: {
        ar: "نوقّع العقد ونجهّز وثائق العمال وفق متطلبات الموقع.",
        en: "We sign the contract and prepare worker documents to your site's requirements.",
      },
    },
    {
      title: { ar: "التوريد والمباشرة", en: "Supply & mobilisation" },
      text: {
        ar: "يباشر العمال أو تصل المعدات إلى موقعك بحسب الاتفاق.",
        en: "Workers start, or equipment arrives, at your site as agreed.",
      },
    },
    {
      title: { ar: "المتابعة والدعم", en: "Follow-up & support" },
      text: {
        ar: "نتابع الأداء والسلامة والالتزام ونوفر البدائل عند الحاجة.",
        en: "We follow up on performance, safety and compliance, and provide replacements when needed.",
      },
    },
  ],
};

export const why = {
  eyebrow: { ar: "لماذا سعد جمال", en: "Why Saad Jamal" },
  title: { ar: "أهم أسباب اختيارنا", en: "Key reasons to choose us" },
  items: [
    {
      icon: "hardhat",
      title: { ar: "تركيز على السقالات", en: "A scaffolding focus" },
      text: {
        ar: "عمال سقالات للتركيب والتعديل والفك بحسب نظام السقالة المطلوب في موقعك.",
        en: "Scaffolders for erection, alteration and dismantling, matched to the system used on your site.",
      },
    },
    {
      icon: "badge",
      title: { ar: "وثائق قبل المباشرة", en: "Documents before mobilisation" },
      text: {
        ar: "اطلب هويات وإقامات العمال وبطاقاتهم المهنية وراجعها قبل وصولهم إلى الموقع.",
        en: "Ask for worker IDs, iqamas and trade cards and review them before anyone arrives on site.",
      },
    },
    {
      icon: "shield",
      title: { ar: "نطاق مكتوب", en: "Written scope" },
      text: {
        ar: "الأعداد والتخصصات والمدة والمسؤوليات موثقة في عرض السعر قبل البدء.",
        en: "Numbers, trades, duration and responsibilities are written into the quotation before work starts.",
      },
    },
    {
      icon: "users",
      title: { ar: "توريد مرن", en: "Flexible supply" },
      text: {
        ar: "توريد مؤقت أو بحسب مدة مشروعك واحتياجه.",
        en: "Temporary or project-length supply to match your schedule.",
      },
    },
    {
      icon: "file",
      title: { ar: "شفافية في التكاليف", en: "Transparent cost tracking" },
      text: {
        ar: "تتبع واضح للتكاليف ودفع المستحقات في وقتها.",
        en: "Clear cost tracking and timely payment of dues.",
      },
    },
    {
      icon: "gem",
      title: { ar: "التزام قوي بالسلامة والجودة", en: "Strong commitment to safety and quality" },
      text: {
        ar: "نعمل على دعم جدول مشروعكم مع الالتزام بمتطلبات الجودة والسلامة في الموقع.",
        en: "We work to support your programme while meeting the site's quality and safety requirements.",
      },
    },
  ] as { icon: string; title: Bi; text: Bi }[],
};

export const audience = {
  eyebrow: { ar: "نخدم", en: "Who we work with" },
  title: { ar: "من نخدم في مشاريع البناء والصيانة", en: "Who we serve on construction and maintenance projects" },
  items: [
    {
      icon: "building",
      title: { ar: "شركات المقاولات", en: "Contracting companies" },
      text: { ar: "عمالة وسقالات ولحامون لمشاريع البناء الكبيرة والصغيرة.", en: "Workers, scaffolders and welders for projects large and small." },
    },
    {
      icon: "factory",
      title: { ar: "المنشآت الصناعية", en: "Industrial facilities" },
      text: { ar: "دعم أعمال الصيانة والإيقاف والأعمال الصناعية.", en: "Support for maintenance, shutdown and industrial works." },
    },
    {
      icon: "home",
      title: { ar: "المطورون وملّاك المشاريع", en: "Developers & project owners" },
      text: { ar: "تغطية احتياج المشروع من العمالة والمعدات حتى التسليم.", en: "Covering the project's workforce and equipment needs through to handover." },
    },
    {
      icon: "handshake",
      title: { ar: "مقاولو الباطن", en: "Subcontractors" },
      text: { ar: "عمالة متخصصة تدعم تنفيذكم عند الحاجة.", en: "Specialist labour that supports your delivery when you need it." },
    },
  ] as { icon: string; title: Bi; text: Bi }[],
};

export const faq = {
  eyebrow: { ar: "الأسئلة الشائعة", en: "FAQ" },
  title: { ar: "إجابات سريعة قبل أن تتواصل معنا", en: "Quick answers before you get in touch" },
  items: [
    {
      q: { ar: "ما الخدمات التي تقدمها مؤسسة سعد جمال للمقاولات؟", en: "What services does Saad Jamal Contracting provide?" },
      a: {
        ar: "نقدم توريد عمال السقالات، وتوريد اللحامين، وتوريد العمالة العامة والمتخصصة، وتأجير المعدات لمشاريع البناء والصيانة والأعمال الصناعية في المملكة العربية السعودية.",
        en: "We provide scaffolders supply, welder supply, general and specialized manpower, and equipment rental for construction, maintenance and industrial projects across Saudi Arabia.",
      },
    },
    {
      q: { ar: "ما أنواع السقالات التي يتعامل معها عمالكم؟", en: "Which scaffolding types can your workers handle?" },
      a: {
        ar: "السقالات النظامية (كابلوك، رينج لوك، كويكستيج)، والأنبوبية والمثبتة، والمتنقلة والبرجية، والمعلقة والكابولية، مع أعمال التركيب والفحص والفك.",
        en: "System scaffolding (Cuplock, Ringlock, Kwikstage), tube and fitting, mobile and tower, and suspended and cantilever scaffolds, including erection, inspection and dismantling.",
      },
    },
    {
      q: { ar: "كيف أحصل على عرض سعر؟", en: "How do I get a quotation?" },
      a: {
        ar: "تواصل معنا عبر نموذج الاتصال أو الواتساب أو الهاتف، وأخبرنا بالتخصصات والأعداد ومدة العمل وموقع المشروع. سنراجع الطلب ونرسل لك عرضًا مكتوبًا.",
        en: "Contact us through the form, WhatsApp or phone and tell us the trades, numbers, duration and project location. We review the request and send a written quotation.",
      },
    },
    {
      q: { ar: "ما مدة التوريد المتاحة؟", en: "How long can you supply workers for?" },
      a: {
        ar: "نورّد بشكل مؤقت أو بحسب مدة المشروع. اذكر المدة المتوقعة وتاريخ البدء في طلبك، وتُثبت في عرض السعر.",
        en: "Temporary or for the length of the project. State the expected duration and start date in your request and they are fixed in the quotation.",
      },
    },
    {
      q: { ar: "هل المؤسسة مسجلة رسميًا؟", en: "Is the company officially registered?" },
      a: {
        ar: "نعم، مؤسسة سعد جمال الاسمري للمقاولات مسجلة بسجل تجاري رقم 7055602549 صادر من وزارة التجارة، وحالة السجل نشطة. يمكنك التحقق منه عبر منصة وزارة التجارة.",
        en: "Yes. Saad Jamal Al-Asmari Contracting Establishment holds Commercial Registration No. 7055602549 issued by the Ministry of Commerce, and the registration is active. You can verify it through the Ministry of Commerce platform.",
      },
    },
    {
      q: { ar: "هل تخدمون مدنًا محددة فقط؟", en: "Do you serve only specific cities?" },
      a: {
        ar: "نخدم المشاريع في جميع أنحاء المملكة العربية السعودية، ومقرنا في الدمام.",
        en: "We serve projects across Saudi Arabia, and our office is in Dammam.",
      },
    },
  ] as { q: Bi; a: Bi }[],
};

export const cta = {
  title: { ar: "لديك مشروع؟ لنبدأ بمحادثة", en: "Have a project? Let's start with a conversation" },
  text: {
    ar: "أخبرنا عن مشروعك وسنعود إليك بالخطوات التالية وعرض سعر مكتوب.",
    en: "Tell us about your project and we will come back with the next steps and a written quotation.",
  },
};

export const aboutPage = {
  title: { ar: "من نحن", en: "About Us" },
  lead: {
    ar: "مؤسسة سعد جمال الاسمري للمقاولات منشأة سعودية مسجلة بالسجل التجاري 7055602549 ومقرها الدمام، تورّد عمال السقالات واللحامين والعمالة وتؤجر المعدات.",
    en: "Saad Jamal Al-Asmari Contracting Establishment is a Saudi establishment, Commercial Registration 7055602549, based in Dammam, supplying scaffolders, welders and manpower and renting equipment.",
  },
  storyTitle: { ar: "نبذة عن شركتنا", en: "About our company" },
  story: {
    ar: [
      "في سعد جمال للمقاولات، نركّز على تقديم حلول عمالة متخصصة، مع اهتمام خاص بعمال السقالات، إلى جانب اللحامين والعمالة العامة والمتخصصة وتأجير المعدات.",
      "نلبي احتياجات مشاريعكم بتوريد مرن مؤقت أو بحسب مدة المشروع، بنطاق مكتوب يحدد الأعداد والتخصصات والمدة ومتطلبات الموقع قبل المباشرة.",
      "نحن منشأة حديثة، ونعتبر ذلك ميزة: نعمل بأساليب إدارة واضحة، ونوثّق كل شيء، ونحرص على أن يكون أول مشروع معنا بداية علاقة طويلة.",
    ],
    en: [
      "At Saad Jamal Contracting we focus on specialist manpower, scaffolders above all, together with welders, general and specialist workers and equipment rental.",
      "We meet your project needs with flexible supply, temporary or for the length of the project, under a written scope that fixes numbers, trades, duration and site requirements before work starts.",
      "We are a new company, and we treat that as an advantage: we work with clear management methods, document everything, and aim to make your first project with us the start of a long relationship.",
    ],
  } as Bi<string[]>,
  valuesTitle: { ar: "قيمنا", en: "Our values" },
  values: [
    {
      icon: "target",
      title: { ar: "الشفافية", en: "Transparency" },
      text: { ar: "تكاليف ومدة وأعداد مكتوبة وواضحة قبل البدء.", en: "Costs, duration and numbers stated clearly in writing before we start." },
    },
    {
      icon: "gem",
      title: { ar: "الجودة", en: "Quality" },
      text: { ar: "اختيار العمالة بحسب التخصص وعمل متقن.", en: "People chosen for the trade, and careful work." },
    },
    {
      icon: "shield",
      title: { ar: "السلامة", en: "Safety" },
      text: { ar: "لا مشروع يستحق المخاطرة بسلامة العاملين.", en: "No project is worth risking the safety of workers." },
    },
    {
      icon: "handshake",
      title: { ar: "الشراكة", en: "Partnership" },
      text: { ar: "نبني شراكات طويلة الأمد مع عملائنا وموظفينا.", en: "We build lasting partnerships with our clients and employees." },
    },
  ] as { icon: string; title: Bi; text: Bi }[],
  missionTitle: { ar: "مهمتنا", en: "Our mission" },
  mission: {
    ar: "تقديم حلول عمالة ماهرة لمشاريع المملكة العربية السعودية، مع تركيز خاص على عمال السقالات، تدعم كفاءة العمل وسلامة العاملين ورضا العملاء، ونبني شراكات طويلة الأمد بالشفافية وإدارة الجودة والالتزام بالمواعيد المتفق عليها.",
    en: "To deliver skilled manpower to projects in Saudi Arabia, with a special focus on scaffolders, supporting efficient work, worker safety and client satisfaction, and to build lasting partnerships through transparency, quality management and keeping agreed dates.",
  },
  visionTitle: { ar: "رؤيتنا", en: "Our vision" },
  vision: {
    ar: "أن نكون خيارًا يعتمد عليه العملاء لتوفير العمالة المتخصصة، وخاصة عمال السقالات، في قطاعي البناء والبنية التحتية، بممارسات منظمة ومستدامة تدعم نجاح المشاريع وأهداف التنمية الوطنية.",
    en: "To be a supplier clients can rely on for specialist labour, scaffolders above all, in construction and infrastructure, with organised, sustainable practices that support project success and national development goals.",
  },
  regTitle: { ar: "بيانات التسجيل", en: "Registration details" },
  regText: {
    ar: "نفخر بشفافية بياناتنا الرسمية. هذه بيانات السجل التجاري كما وردت في شهادة وزارة التجارة.",
    en: "We are open about our official details. These are the Commercial Registration details as shown on the Ministry of Commerce certificate.",
  },
  regRows: [
    { label: { ar: "اسم المنشأة", en: "Registered name" } },
    { label: { ar: "الرقم الوطني الموحد", en: "Unified national number" } },
    { label: { ar: "تاريخ الإصدار", en: "Issue date" } },
    { label: { ar: "نوع الكيان", en: "Entity type" } },
    { label: { ar: "حالة السجل", en: "Registration status" } },
  ] as { label: Bi }[],
  statusActive: { ar: "نشط", en: "Active" },
  verify: { ar: "التحقق عبر وزارة التجارة", en: "Verify via the Ministry of Commerce" },
};

export const servicesPage = {
  title: { ar: "خدماتنا", en: "Our Services" },
  lead: {
    ar: "توريد عمال السقالات واللحامين والعمالة العامة والمتخصصة وتأجير المعدات، لمشاريع البناء والصيانة والأعمال الصناعية في أنحاء المملكة.",
    en: "Scaffolders, welders, general and specialized manpower and equipment rental for construction, maintenance and industrial projects across the Kingdom.",
  },
  helpTitle: { ar: "تحتاج عمالة أو معدات لمشروعك؟", en: "Need workers or equipment for your project?" },
  helpText: {
    ar: "أخبرنا بالتخصصات والأعداد والمدة وسنجهز لك عرض سعر مكتوب.",
    en: "Tell us the trades, numbers and duration and we will prepare a written quotation.",
  },
};

export const contactPage = {
  title: { ar: "تواصل معنا", en: "Contact Us" },
  lead: {
    ar: "أخبرنا عن مشروعك. سنراجع التفاصيل ونعود إليك بالخطوات التالية وعرض سعر مكتوب.",
    en: "Tell us about your project. We will review the details and come back with the next steps and a written quotation.",
  },
  cardsTitle: { ar: "طرق التواصل", en: "Get in touch" },
  phone: { ar: "الهاتف", en: "Phone" },
  whatsapp: { ar: "واتساب", en: "WhatsApp" },
  email: { ar: "البريد الإلكتروني", en: "Email" },
  hours: { ar: "ساعات العمل", en: "Working hours" },
  address: { ar: "العنوان", en: "Address" },
  cr: { ar: "السجل التجاري", en: "Commercial Registration" },
  formTitle: { ar: "أرسل لنا تفاصيل مشروعك", en: "Send us your project details" },
  formText: {
    ar: "املأ النموذج وسيفتح واتساب برسالة جاهزة للإرسال، أو أرسلها عبر البريد.",
    en: "Fill in the form and WhatsApp opens with a ready-to-send message, or send it by email instead.",
  },
  fields: {
    name: { ar: "الاسم", en: "Full name" },
    phone: { ar: "رقم الجوال", en: "Mobile number" },
    email: { ar: "البريد الإلكتروني (اختياري)", en: "Email (optional)" },
    service: { ar: "نوع الخدمة", en: "Service needed" },
    location: { ar: "موقع المشروع (المدينة)", en: "Project location (city)" },
    message: { ar: "تفاصيل المشروع", en: "Project details" },
    messagePlaceholder: {
      ar: "مثال: أحتاج 20 عامل سقالات لمشروع في الدمام لمدة 3 أشهر…",
      en: "e.g. I need 20 scaffolders for a project in Dammam for 3 months…",
    },
    other: { ar: "أخرى / لست متأكدًا", en: "Other / not sure" },
    select: { ar: "اختر الخدمة", en: "Choose a service" },
  },
  sendWhatsapp: { ar: "إرسال عبر واتساب", en: "Send via WhatsApp" },
  sendEmail: { ar: "أو أرسل عبر البريد", en: "Or send by email" },
  required: { ar: "يرجى تعبئة الاسم والجوال والتفاصيل.", en: "Please fill in your name, mobile number and project details." },
  privacyNote: {
    ar: "بياناتك لا تُحفظ على هذا الموقع؛ تُرسل مباشرة إلى واتساب أو بريدك.",
    en: "Your details are not stored on this website; they are sent straight to WhatsApp or your email app.",
  },
  waGreeting: { ar: "السلام عليكم، أرغب بطلب عرض سعر.", en: "Hello, I would like to request a quotation." },
  labels: {
    name: { ar: "الاسم", en: "Name" },
    phone: { ar: "الجوال", en: "Mobile" },
    service: { ar: "الخدمة", en: "Service" },
    location: { ar: "الموقع", en: "Location" },
    details: { ar: "التفاصيل", en: "Details" },
  },
  notYetAddress: {
    ar: "سيتم إضافة العنوان قريبًا",
    en: "Address coming soon",
  },
};

export const privacy = {
  title: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  updated: { ar: "آخر تحديث: نوفمبر 2026", en: "Last updated: November 2026" },
  sections: [
    {
      h: { ar: "من نحن", en: "Who we are" },
      p: {
        ar: "هذا الموقع (saadjamal.sa) تديره مؤسسة سعد جمال الاسمري للمقاولات، سجل تجاري رقم 7055602549.",
        en: "This website (saadjamal.sa) is operated by Saad Jamal Al-Asmari Contracting Establishment, Commercial Registration No. 7055602549.",
      },
    },
    {
      h: { ar: "البيانات التي نجمعها", en: "What we collect" },
      p: {
        ar: "لا يحفظ هذا الموقع بيانات النماذج على خوادمنا. عند استخدام نموذج الاتصال، تُجهَّز رسالة تُرسل عبر واتساب أو تطبيق البريد في جهازك، وتصلنا فقط عند إرسالك لها. قد يستخدم الموقع ملفات تعريف الارتباط الضرورية فقط، أو أدوات إحصاء مجهولة إذا فعّلناها مستقبلًا.",
        en: "This website does not store form data on our servers. When you use the contact form, a message is prepared for WhatsApp or your email app and reaches us only when you send it. The site may use strictly necessary cookies or anonymous analytics if we enable them in future.",
      },
    },
    {
      h: { ar: "كيف نستخدم بياناتك", en: "How we use your data" },
      p: {
        ar: "نستخدم المعلومات التي ترسلها لنا للرد على استفسارك وإعداد عرض السعر فقط. لا نبيع بياناتك ولا نشاركها مع أطراف أخرى لأغراض تسويقية.",
        en: "We use the information you send us only to answer your enquiry and prepare a quotation. We do not sell your data or share it with third parties for marketing.",
      },
    },
    {
      h: { ar: "حقوقك", en: "Your rights" },
      p: {
        ar: "يحق لك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها في أي وقت عبر التواصل معنا.",
        en: "You may ask to see, correct or delete your data at any time by contacting us.",
      },
    },
    {
      h: { ar: "التواصل", en: "Contact" },
      p: {
        ar: "لأي استفسار حول هذه السياسة تواصل معنا عبر صفحة اتصل بنا.",
        en: "For any question about this policy, please reach us through the Contact page.",
      },
    },
  ] as { h: Bi; p: Bi }[],
};

export const footer = {
  about: {
    ar: "مؤسسة سعد جمال الاسمري للمقاولات: توريد عمال السقالات واللحامين والعمالة المتخصصة وتأجير المعدات لمشاريع البناء والصناعة في المملكة العربية السعودية.",
    en: "Saad Jamal Al-Asmari Contracting Establishment: scaffolders, welders, specialized manpower and equipment rental for construction and industrial projects across Saudi Arabia.",
  },
  quickLinks: { ar: "روابط سريعة", en: "Quick links" },
  services: { ar: "خدماتنا", en: "Services" },
  contact: { ar: "تواصل معنا", en: "Contact" },
  registered: { ar: "سجل تجاري رقم", en: "Commercial Reg. No." },
};

export const notFound = {
  title: { ar: "الصفحة غير موجودة", en: "Page not found" },
  text: {
    ar: "الرابط الذي طلبته غير موجود أو تم نقله.",
    en: "The page you requested doesn't exist or has moved.",
  },
  back: { ar: "العودة إلى الرئيسية", en: "Back to home" },
};
