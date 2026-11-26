import type { Bi } from "@/lib/i18n";

/**
 * In-depth content for each service page, following the Gulf Orbit page standard:
 * direct answer first, a facts table, buyer sections, a comparison table, what to put in a
 * request, checks to run on arrival, and extra FAQs.
 *
 * Rule: general trade guidance is fine; anything said ABOUT THE COMPANY must be something
 * the owner can evidence. See scripts/banned-claims.mjs.
 */
export type ServiceDetail = {
  /** 40–60 word direct answer, shown directly under the H1. */
  answer: string;
  facts: [string, string][];
  sections: { h: string; p: string[] }[];
  table: { caption: string; head: [string, string]; rows: [string, string][] };
  request: string[];
  checks: string[];
  faqs: { q: string; a: string }[];
};

export const serviceDetails: Record<string, Bi<ServiceDetail>> = {
  "scaffolders-supply": {
    ar: {
      answer:
        "تورّد مؤسسة سعد جمال للمقاولات عمال سقالات لتركيب السقالات وتعديلها وفكها في مشاريع البناء والصيانة والأعمال الصناعية في المملكة العربية السعودية. أرسل لنا نظام السقالة وعدد العمال والموقع والمدة وتاريخ البدء، ونرد عليك بعرض سعر مكتوب.",
      facts: [
        ["الخدمة", "توريد عمال سقالات: تركيب وتعديل وفك"],
        ["مدة التوريد", "مؤقتة أو بحسب مدة المشروع"],
        ["نطاق العمل", "المملكة العربية السعودية، من مقرنا في الدمام"],
        ["التسعير", "بعرض سعر مكتوب بعد استلام المتطلبات"],
        ["ما نحتاجه منك", "النظام، العدد، الموقع، المدة، متطلبات البطاقات"],
      ],
      sections: [
        {
          h: "ماذا يعمل عامل السقالات في الموقع",
          p: [
            "يجهّز عامل السقالات منصة عمل آمنة يستخدمها غيره: يفحص قاعدة الارتكاز، ويركّب القوائم والعوارض والمدادات، ويثبّت الدعامات القطرية، ويضع ألواح المنصة والحواجز الواقية ولوح القدم، ثم يسلّم السقالة بعد فحصها.",
            "ويشمل عمله كذلك تعديل السقالة عند تغيّر نطاق العمل، وفكّها بالترتيب الصحيح دون إسقاط المواد من أعلى. أي تعديل على سقالة مستلمة يجب أن يقوم به عامل سقالات ثم يُعاد فحصها.",
          ],
        },
        {
          h: "كيف تختار نظام السقالة",
          p: [
            "اختيار النظام يعتمد على شكل المنشأة والارتفاع والأحمال ومدة العمل. الأنظمة النظامية أسرع في الأسطح المستوية المتكررة، بينما يمنح نظام الأنبوب والوصلة مرونة أكبر حول المعدات والأنابيب في المنشآت الصناعية.",
            "اذكر في طلبك النظام المستخدم في موقعك، لأن خبرة العامل في نظام معين لا تعني بالضرورة خبرته في غيره.",
          ],
        },
        {
          h: "السلامة وبطاقات الفحص",
          p: [
            "تعتمد كثير من المواقع نظام بطاقات على مدخل السقالة: بطاقة خضراء تعني أنها جاهزة للاستخدام، وصفراء تعني استخدامًا بشروط، وحمراء تعني منع الاستخدام. تختلف التفاصيل من موقع لآخر، فأرسل لنا إجراءات موقعك.",
            "العمل على المرتفعات يتطلب حزام أمان كامل ونقطة تثبيت مناسبة وإحاطة للمنطقة أسفل العمل. اتفق على هذه المتطلبات وعلى الجهة التي توفر معدات الوقاية قبل المباشرة.",
          ],
        },
      ],
      table: {
        caption: "مقارنة مختصرة بين أنظمة السقالات",
        head: ["النظام", "يناسب عادة"],
        rows: [
          ["كابلوك", "الواجهات والأعمال الخرسانية المتكررة"],
          ["رينج لوك", "الأشكال المتغيرة والارتفاعات، بوصلات متعددة الاتجاهات"],
          ["كويكستيج", "أعمال الواجهات والبناء السكني"],
          ["أنبوب ووصلة", "المنشآت الصناعية والأشكال غير المنتظمة"],
          ["أبراج متنقلة", "أعمال قصيرة على أرضيات مستوية وصلبة"],
        ],
      },
      request: [
        "نظام السقالة المستخدم أو المطلوب",
        "عدد عمال السقالات وهل تحتاج مشرفًا",
        "موقع العمل وتاريخ البدء والمدة وساعات الدوام",
        "البطاقات أو الدورات التي يشترطها الموقع",
        "من يوفر مواد السقالات ومعدات الوقاية",
        "ترتيبات السكن والنقل والوجبات",
      ],
      checks: [
        "مطابقة الأسماء مع الهويات أو الإقامات",
        "مراجعة البطاقات المهنية وتواريخ انتهائها",
        "التأكد من اكتمال معدات الوقاية قبل الصعود",
        "إتمام التعريف بإجراءات سلامة الموقع",
        "سؤال العامل عن خبرته في نظام السقالة المستخدم لديكم",
      ],
      faqs: [
        {
          q: "هل توريد عمال السقالات يشمل مواد السقالات؟",
          a: "توريد العمال خدمة مستقلة عن المواد. إذا احتجت إلى مواد، اذكر ذلك في طلبك لنوضح لك ما يمكن توفيره في عرض السعر.",
        },
        {
          q: "من يفحص السقالة بعد تركيبها؟",
          a: "يحدد ذلك نظام موقعك؛ غالبًا يفحصها مشرف أو مفتش سقالات مؤهل قبل وضع البطاقة. اتفق على المسؤولية قبل البدء.",
        },
        {
          q: "هل تقدمون وثائق العمال قبل وصولهم؟",
          a: "اطلب في عرض السعر الوثائق التي يحتاجها موقعك، مثل الهوية أو الإقامة والبطاقة المهنية، لمراجعتها قبل المباشرة.",
        },
        {
          q: "كم من الوقت يلزم لتوفير العمال؟",
          a: "يعتمد على العدد والتخصص ومتطلبات دخول الموقع. نذكر الموعد المتوقع في عرض السعر بعد مراجعة طلبك.",
        },
      ],
    },
    en: {
      answer:
        "Saad Jamal Contracting supplies scaffolders to erect, alter and dismantle scaffolds on construction, maintenance and industrial projects in Saudi Arabia. Send us the scaffold system, number of workers, site, duration and start date, and we reply with a written quotation.",
      facts: [
        ["Service", "Scaffolder supply: erection, alteration, dismantling"],
        ["Supply period", "Temporary or for the length of the project"],
        ["Coverage", "Saudi Arabia, from our office in Dammam"],
        ["Pricing", "Written quotation once requirements are received"],
        ["What we need from you", "System, numbers, site, duration, card requirements"],
      ],
      sections: [
        {
          h: "What a scaffolder does on site",
          p: [
            "A scaffolder builds a safe working platform that other trades rely on: checking the base and ground, setting standards, ledgers and transoms, fixing diagonal bracing, laying boards with guard rails and toe boards, and handing the scaffold over after inspection.",
            "The work also covers altering a scaffold when the job changes and dismantling it in the correct order without dropping material. Any change to a handed-over scaffold should be made by a scaffolder and inspected again.",
          ],
        },
        {
          h: "How to choose a scaffold system",
          p: [
            "The right system depends on the structure, height, loads and duration. System scaffolds are quicker on flat, repetitive faces, while tube and fitting gives more freedom around equipment and pipework in industrial plants.",
            "State the system used on your site in the request: experience on one system does not automatically mean experience on another.",
          ],
        },
        {
          h: "Safety and scaffold tags",
          p: [
            "Many sites use a tag at the scaffold access point: green means ready for use, yellow means use with conditions, red means do not use. The details vary by site, so send us your procedure.",
            "Work at height needs a full body harness, a suitable anchor point and a barricaded area below. Agree these requirements, and who provides protective equipment, before work starts.",
          ],
        },
      ],
      table: {
        caption: "Scaffold systems at a glance",
        head: ["System", "Usually suits"],
        rows: [
          ["Cuplock", "Facades and repetitive concrete works"],
          ["Ringlock", "Changing shapes and height, multi-direction joints"],
          ["Kwikstage", "Facade work and residential building"],
          ["Tube and fitting", "Industrial plants and irregular shapes"],
          ["Mobile towers", "Short tasks on firm, level floors"],
        ],
      },
      request: [
        "The scaffold system in use or required",
        "Number of scaffolders, and whether you need a supervisor",
        "Site location, start date, duration and shift hours",
        "Cards or training your site requires",
        "Who provides scaffold material and protective equipment",
        "Accommodation, transport and meal arrangements",
      ],
      checks: [
        "Names match IDs or iqamas",
        "Trade cards reviewed, including expiry dates",
        "Protective equipment complete before anyone climbs",
        "Site safety induction completed",
        "Ask each worker about experience on your scaffold system",
      ],
      faqs: [
        {
          q: "Does scaffolder supply include scaffold material?",
          a: "Labour and material are separate. If you need material, say so in your request and the quotation will state what can be provided.",
        },
        {
          q: "Who inspects the scaffold after erection?",
          a: "Your site rules decide; usually a qualified scaffolding supervisor or inspector checks it before tagging. Agree the responsibility before work starts.",
        },
        {
          q: "Can we see worker documents before they arrive?",
          a: "List the documents your site needs in the request, such as ID or iqama and trade card, so they can be reviewed before mobilisation.",
        },
        {
          q: "How soon can scaffolders start?",
          a: "That depends on the numbers, skills and site entry requirements. The expected date is stated in the quotation after we review your request.",
        },
      ],
    },
  },

  "welder-supply": {
    ar: {
      answer:
        "تورّد مؤسسة سعد جمال للمقاولات لحامين لأعمال اللحام الإنشائية والأنابيب والصيانة والتصنيع في المملكة العربية السعودية. حدّد عملية اللحام ونوع المعدن والأوضاع المطلوبة وعدد اللحامين ومدة العمل، ونرسل لك عرض سعر مكتوبًا.",
      facts: [
        ["الخدمة", "توريد لحامين: إنشائي، أنابيب، صيانة، ورش"],
        ["مدة التوريد", "مؤقتة أو بحسب مدة المشروع"],
        ["نطاق العمل", "المملكة العربية السعودية، من مقرنا في الدمام"],
        ["التسعير", "بعرض سعر مكتوب"],
        ["ما نحتاجه منك", "العملية، المعدن، السماكة، الأوضاع، الكود المطلوب"],
      ],
      sections: [
        {
          h: "عمليات اللحام الشائعة",
          p: [
            "SMAW (اللحام بالقطب المغلف) شائع في المواقع المفتوحة والإنشاءات. GTAW (تيج) يستخدم للدقة العالية وتمريرة الجذر في الأنابيب. GMAW (ميج) أسرع في الورش، وFCAW مناسب للسماكات الكبيرة وأعمال الهياكل.",
            "كثير من أعمال الأنابيب تجمع بين عمليتين، مثل تيج للجذر والقطب المغلف للتعبئة، فاذكر المطلوب بدقة.",
          ],
        },
        {
          h: "التأهيل واختبار اللحام",
          p: [
            "المشاريع المحكومة بكود تطلب إجراء لحام معتمدًا (WPS) ولحامًا مؤهلًا عليه. من الأكواد الشائعة ASME Section IX للأوعية والأنابيب، وAWS D1.1 للهياكل الحديدية.",
            "المؤهل مرتبط بالعملية ونطاق المعدن والسماكة والوضع، لذلك تُجرى عادة تجربة لحام في موقع العميل قبل المباشرة. حدّد من يشرف على الاختبار ومن يتحمل تكلفته.",
          ],
        },
        {
          h: "سلامة الأعمال الساخنة",
          p: [
            "يتطلب اللحام في المواقع تصريح عمل ساخن، وإزالة المواد القابلة للاشتعال أو تغطيتها، ومراقب حريق مع طفاية، وتهوية كافية خاصة في الأماكن المغلقة التي تحتاج تصريح دخول مستقلًا.",
            "تشمل معدات الوقاية قناع اللحام بعدسة مناسبة، وقفازات وملابس مقاومة للحرارة، وحماية للتنفس عند الحاجة.",
          ],
        },
      ],
      table: {
        caption: "أوضاع اللحام التي يجب تحديدها",
        head: ["الوضع", "المعنى"],
        rows: [
          ["1G / 1F", "مسطح"],
          ["2G / 2F", "أفقي"],
          ["3G / 3F", "رأسي"],
          ["4G / 4F", "فوق الرأس"],
          ["6G", "أنبوب ثابت بزاوية 45 درجة"],
        ],
      },
      request: [
        "عملية اللحام المطلوبة",
        "نوع المعدن ونطاق السماكة أو قطر الأنبوب",
        "أوضاع اللحام والكود أو مواصفة العميل",
        "عدد اللحامين وهل تحتاج مساعدين أو فنيي تركيب",
        "من يوفر ماكينات اللحام والمستهلكات",
        "الموقع وتاريخ البدء والمدة",
      ],
      checks: [
        "مطابقة الهوية أو الإقامة",
        "مراجعة شهادات التأهيل ونطاقها",
        "إجراء اختبار لحام قبل المباشرة عند الحاجة",
        "اكتمال معدات الوقاية",
        "التعريف بنظام تصاريح العمل الساخن في الموقع",
      ],
      faqs: [
        {
          q: "هل يمكن اختبار اللحامين قبل قبولهم؟",
          a: "نعم، يمكنك طلب اختبار لحام ضمن شروط الطلب. اتفق على مكان الاختبار ومعايير القبول مسبقًا.",
        },
        {
          q: "هل توفرون ماكينات اللحام والمستهلكات؟",
          a: "يُحدد ذلك في عرض السعر. اذكر في طلبك إن كنت تحتاج المعدات أو ستوفرها من موقعك.",
        },
        {
          q: "هل يمكن توريد لحامين لأعمال الإيقاف والصيانة؟",
          a: "أرسل لنا نافذة الإيقاف والأعداد والتخصصات في أقرب وقت لنرد عليك بما يمكن توفيره ومواعيده.",
        },
        {
          q: "ما الفرق بين لحام 3G و6G؟",
          a: "3G لحام رأسي على الألواح، أما 6G فهو لحام أنبوب ثابت بميل 45 درجة ويغطي عادة نطاق أوضاع أوسع.",
        },
      ],
    },
    en: {
      answer:
        "Saad Jamal Contracting supplies welders for structural, pipe, maintenance and fabrication work in Saudi Arabia. Tell us the welding process, material, positions, number of welders and duration, and we send you a written quotation.",
      facts: [
        ["Service", "Welder supply: structural, pipe, maintenance, workshop"],
        ["Supply period", "Temporary or for the length of the project"],
        ["Coverage", "Saudi Arabia, from our office in Dammam"],
        ["Pricing", "Written quotation"],
        ["What we need from you", "Process, material, thickness, positions, code"],
      ],
      sections: [
        {
          h: "Common welding processes",
          p: [
            "SMAW (stick) is common on open sites and construction. GTAW (TIG) is used for precision and for root passes on pipe. GMAW (MIG) is faster in workshops, and FCAW suits thicker sections and structural work.",
            "Much pipe work combines two processes, for example a TIG root with stick fill, so state exactly what you need.",
          ],
        },
        {
          h: "Qualification and weld tests",
          p: [
            "Code work calls for a welding procedure specification (WPS) and a welder qualified to it. Common codes are ASME Section IX for vessels and piping, and AWS D1.1 for structural steel.",
            "A qualification is tied to process, material range, thickness and position, so a test weld at the client's site is normal before work starts. Decide who witnesses the test and who pays for it.",
          ],
        },
        {
          h: "Hot work safety",
          p: [
            "Site welding needs a hot work permit, combustibles removed or covered, a fire watch with an extinguisher and enough ventilation, especially in confined spaces, which need their own entry permit.",
            "Protective equipment includes a welding helmet with a suitable lens, heat-resistant gloves and clothing, and respiratory protection where required.",
          ],
        },
      ],
      table: {
        caption: "Welding positions to specify",
        head: ["Position", "Meaning"],
        rows: [
          ["1G / 1F", "Flat"],
          ["2G / 2F", "Horizontal"],
          ["3G / 3F", "Vertical"],
          ["4G / 4F", "Overhead"],
          ["6G", "Fixed pipe inclined at 45 degrees"],
        ],
      },
      request: [
        "The welding process required",
        "Material, thickness range or pipe diameter",
        "Positions and the code or client specification",
        "Number of welders, and whether you need helpers or fitters",
        "Who provides welding machines and consumables",
        "Site, start date and duration",
      ],
      checks: [
        "ID or iqama matches",
        "Qualification certificates and their range reviewed",
        "Test weld completed before work where required",
        "Protective equipment complete",
        "Briefed on the site's hot work permit system",
      ],
      faqs: [
        {
          q: "Can we test welders before accepting them?",
          a: "Yes, make a weld test a condition of your request. Agree the test location and acceptance criteria in advance.",
        },
        {
          q: "Do you provide welding machines and consumables?",
          a: "That is set in the quotation. Say in your request whether you need equipment or will provide it on site.",
        },
        {
          q: "Can you supply welders for a shutdown?",
          a: "Send us the shutdown window, numbers and skills as early as possible and we reply with what can be supplied and when.",
        },
        {
          q: "What is the difference between 3G and 6G?",
          a: "3G is vertical plate welding. 6G is a fixed pipe inclined at 45 degrees and usually qualifies a wider range of positions.",
        },
      ],
    },
  },

  "manpower-supply": {
    ar: {
      answer:
        "تورّد مؤسسة سعد جمال للمقاولات عمالة ماهرة ونصف ماهرة وعامة لمشاريع البناء والصيانة والأعمال الصناعية في المملكة العربية السعودية، بشكل مؤقت أو بحسب مدة المشروع. أرسل المهن والأعداد والموقع والمدة، ونرد عليك بعرض سعر مكتوب.",
      facts: [
        ["الخدمة", "توريد عمالة ماهرة ونصف ماهرة وعامة"],
        ["مدة التوريد", "مؤقتة أو بحسب مدة المشروع"],
        ["نطاق العمل", "المملكة العربية السعودية، من مقرنا في الدمام"],
        ["التسعير", "بعرض سعر مكتوب"],
        ["ما نحتاجه منك", "المهن، الأعداد، الموقع، المدة، ساعات العمل"],
      ],
      sections: [
        {
          h: "فئات العمالة",
          p: [
            "العمالة الماهرة تؤدي مهنة محددة باستقلالية مثل النجار والحداد والكهربائي والسبّاك واللياس. العمالة نصف الماهرة تساعد في المهنة تحت إشراف، والعمالة العامة تقوم بأعمال المناولة والتنظيف وتجهيز الموقع.",
            "تحديد الفئة بدقة يمنع الخلاف حول الأجر والإنتاجية، فاكتب المهام الفعلية لا المسمى فقط.",
          ],
        },
        {
          h: "ما يجب الاتفاق عليه في العقد",
          p: [
            "ساعات العمل والإضافي وأيام الراحة، ومن يوفر السكن والنقل والوجبات ومعدات الوقاية، وإجراءات استبدال العامل، وطريقة اعتماد كشوف الحضور، ومواعيد الفوترة والدفع.",
            "يخضع توريد العمالة في المملكة لأنظمة العمل والجهات المختصة. اطلب ما يلزمك من مستندات نظامية قبل التعاقد.",
          ],
        },
        {
          h: "التخطيط للأعداد",
          p: [
            "وزّع الأعداد على مراحل المشروع بدل طلب العدد الأقصى من اليوم الأول: أعمال الموقع ثم الهيكل ثم التشطيب. يخفض ذلك وقت الانتظار ويسهل الإشراف.",
            "عيّن من طرفك مشرفًا يوزع المهام يوميًا ويوقّع كشف الحضور.",
          ],
        },
      ],
      table: {
        caption: "أمثلة على المهن بحسب مرحلة المشروع",
        head: ["المرحلة", "أمثلة على المهن"],
        rows: [
          ["تجهيز الموقع", "عمال عامون، مشغلو معدات"],
          ["الهيكل الإنشائي", "نجار مسلح، حداد مسلح، عمال صب، سقالات"],
          ["التشطيب", "لياس، دهان، مبلط، نجار"],
          ["الكهرباء والميكانيكا", "كهربائي، سبّاك، فني تكييف"],
          ["الصيانة الصناعية", "لحام، فني تركيب، سقالات، مساعدون"],
        ],
      },
      request: [
        "المهن المطلوبة وعدد كل مهنة",
        "وصف المهام ومستوى الخبرة",
        "الموقع وتاريخ البدء والمدة",
        "ساعات العمل وأيام الأسبوع",
        "ترتيبات السكن والنقل والوجبات ومعدات الوقاية",
        "المستندات أو التصاريح التي يشترطها الموقع",
      ],
      checks: [
        "مطابقة الإقامة أو الهوية وسريانها",
        "مطابقة المهنة مع المطلوب",
        "تجربة عملية قصيرة للمهن الماهرة",
        "اكتمال معدات الوقاية والتعريف بالسلامة",
        "تسجيل الحضور من أول يوم",
      ],
      faqs: [
        {
          q: "ما أقل عدد يمكن طلبه؟",
          a: "أرسل لنا احتياجك كما هو، وسنوضح في الرد ما يمكن توفيره وشروطه.",
        },
        {
          q: "هل يمكن زيادة العدد أثناء المشروع؟",
          a: "نعم يمكن طلب زيادة أو تخفيض، ويُحدد أسلوب ذلك ومهلة الإشعار في العقد.",
        },
        {
          q: "ماذا لو لم يناسبنا أحد العمال؟",
          a: "اتفق مسبقًا على شروط الاستبدال ومهلته ضمن العقد حتى لا يتوقف العمل.",
        },
        {
          q: "هل يشمل السعر السكن والنقل؟",
          a: "لا يُفترض ذلك ما لم يُذكر. يوضح عرض السعر ما هو مشمول وما هو على العميل.",
        },
      ],
    },
    en: {
      answer:
        "Saad Jamal Contracting supplies skilled, semi-skilled and general workers to construction, maintenance and industrial projects in Saudi Arabia, temporarily or for the length of the project. Send the trades, numbers, site and duration, and we reply with a written quotation.",
      facts: [
        ["Service", "Skilled, semi-skilled and general manpower supply"],
        ["Supply period", "Temporary or for the length of the project"],
        ["Coverage", "Saudi Arabia, from our office in Dammam"],
        ["Pricing", "Written quotation"],
        ["What we need from you", "Trades, numbers, site, duration, working hours"],
      ],
      sections: [
        {
          h: "Worker categories",
          p: [
            "Skilled workers carry out a trade on their own, such as carpenters, steel fixers, electricians, plumbers and plasterers. Semi-skilled workers assist a trade under supervision, and general workers handle moving, cleaning and site preparation.",
            "Defining the category precisely avoids disputes about rate and output, so describe the actual tasks, not only the job title.",
          ],
        },
        {
          h: "What to agree in the contract",
          p: [
            "Working hours, overtime and rest days; who provides accommodation, transport, meals and protective equipment; how a worker is replaced; how timesheets are approved; and when invoices are issued and paid.",
            "Manpower supply in the Kingdom is governed by labour regulations and the competent authorities. Ask for the regulatory documents you need before contracting.",
          ],
        },
        {
          h: "Planning the numbers",
          p: [
            "Spread headcount across project phases instead of ordering the peak on day one: site works, then structure, then finishing. It reduces idle time and makes supervision easier.",
            "Name a supervisor on your side to allocate tasks daily and sign the timesheet.",
          ],
        },
      ],
      table: {
        caption: "Example trades by project phase",
        head: ["Phase", "Example trades"],
        rows: [
          ["Site preparation", "General workers, plant operators"],
          ["Structure", "Shuttering carpenter, steel fixer, concrete crew, scaffolders"],
          ["Finishing", "Plasterer, painter, tiler, joiner"],
          ["Electrical and mechanical", "Electrician, plumber, AC technician"],
          ["Industrial maintenance", "Welder, fitter, scaffolders, helpers"],
        ],
      },
      request: [
        "Trades needed and the number of each",
        "Task description and experience level",
        "Site, start date and duration",
        "Working hours and days per week",
        "Accommodation, transport, meals and protective equipment",
        "Documents or permits your site requires",
      ],
      checks: [
        "Iqama or ID matches and is valid",
        "Trade matches what was requested",
        "A short practical test for skilled trades",
        "Protective equipment complete and safety briefing done",
        "Attendance recorded from day one",
      ],
      faqs: [
        {
          q: "Is there a minimum number of workers?",
          a: "Send your requirement as it is and our reply will say what can be supplied and on what terms.",
        },
        {
          q: "Can we change the numbers during the project?",
          a: "Yes, you can ask for more or fewer; the method and notice period are set in the contract.",
        },
        {
          q: "What if a worker is not suitable?",
          a: "Agree replacement terms and timing in the contract in advance so work does not stop.",
        },
        {
          q: "Does the price include accommodation and transport?",
          a: "Do not assume so unless it is written. The quotation states what is included and what is on the client.",
        },
      ],
    },
  },
};
