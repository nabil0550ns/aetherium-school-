import type {
  Student,
  TouchpointLog,
  AdministrativeSummons,
  SeatScarcity,
  NewsArticle,
  GalleryPhoto,
  FaqItem,
  TimetableSlot,
  HomeworkQuest,
  StudentBadge,
  Testimonial,
} from '../types';

export const mockStudents: Student[] = [
  {
    id: 'and-st-01',
    name: 'أمين بن زروال',
    grade: 'الطور التحضيري (4 سنوات)',
    pillar: 'preparatory',
    avatar: 'https://images.unsplash.com/photo-1595454223600-91fbdd776735?auto=format&fit=crop&w=300&q=80',
    attendance: 'حاضر — 100% انضباط',
    supervisedZone: 'ورشة النباتات اللمسية (البهو الأخضر)',
    zoneSupervisor: 'أ. دليلة قاسمي (مختصة ريجيو إميليا)',
    cognitiveTwin: {
      stage: 'المجموعة العصبية النامية الرابعة',
      dominantPillar: 'اليقظة الحسية والتآزر الحركي الدقيق',
      activePetals: 32,
      skills: [
        { name: 'تمييز الأنماط الهندسية في الطبيعة', score: 95, category: 'الإدراك الرياضي' },
        { name: 'العناية بالشتلات والتربة اللمسية', score: 98, category: 'المهارات الحركية' },
        { name: 'التعاطف والمشاركة التعاونية مع الأقران', score: 94, category: 'الذكاء الوجداني' },
        { name: 'الفصاحة ومخارج الحروف العربية', score: 91, category: 'اللغة والتعبير' },
      ],
    },
    todaysNutrition: {
      mealName: 'حساء الخضار العطرية مع كسكسي القمح الكامل المطهو على البخار',
      chef: 'الشيف عبد القادر مقراني (خبير التغذية الحيوية)',
      origin: 'مزارع متيجة العضوية المعتمدة (البليدة)',
      distanceMiles: 18,
      calories: 440,
      proteinG: 20,
      greensScore: 99,
      allergens: ['خالٍ تماماً من المكسرات', 'خالٍ من الزيوت المهدرجة', 'مكونات بيولوجية 100%'],
      allergenCheckPassed: true,
    },
  },
  {
    id: 'and-st-02',
    name: 'مريم سعيدي',
    grade: 'الطور الابتدائي (السنة الثالثة - 8 سنوات)',
    pillar: 'primary',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    attendance: 'حاضرة — 100% انضباط',
    supervisedZone: 'مختبر الروبوتات والمنطق الرياضي',
    zoneSupervisor: 'أ. فريد حمداوي',
    cognitiveTwin: {
      stage: 'التبلور الهندسي والاستدلال التحليلي VI',
      dominantPillar: 'الخوارزميات التجريبية واللغات الحية',
      activePetals: 52,
      skills: [
        { name: 'الاستدلال الهندسي الإقليدي', score: 97, category: 'الرياضيات' },
        { name: 'برمجة الحساسات وتدفق الموائع', score: 93, category: 'الروبوتات' },
        { name: 'الطلاقة الخطابية باللغات الثلاث', score: 96, category: 'اللغات' },
        { name: 'المرونة في حل المشكلات المعقدة', score: 92, category: 'المهارات التنفيذية' },
      ],
    },
    todaysNutrition: {
      mealName: 'سمك السردين الطازج المشوي مع كينوا وزيت زيتون بوعيرة المعصور بارداً',
      chef: 'الشيف عبد القادر مقراني',
      origin: 'ميناء تيبازة للصيد الحرفي المستدام + معاصر البويرة',
      distanceMiles: 32,
      calories: 590,
      proteinG: 36,
      greensScore: 96,
      allergens: ['سمك بحري طازج', 'خالٍ من الغلوتين', 'خالٍ من مشتقات الحليب'],
      allergenCheckPassed: true,
    },
  },
  {
    id: 'and-st-03',
    name: 'يانيس بلقاسم',
    grade: 'الطور المتوسط (السنة الثالثة - 13 سنة)',
    pillar: 'middle',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    attendance: 'حاضر — 100% انضباط',
    supervisedZone: 'غرفة المناظرات السقراطية ونفق الرياح',
    zoneSupervisor: 'د. نور الدين زروقي',
    cognitiveTwin: {
      stage: 'التكامل السقراطي والبحث الأكاديمي VIII',
      dominantPillar: 'البيوميميتيكس والحوار الفلسفي القيادي',
      activePetals: 74,
      skills: [
        { name: 'المحاكاة الحيوية وديناميكا الموائع', score: 98, category: 'الفيزياء' },
        { name: 'المناظرة المنطقية وتحليل السياسات', score: 99, category: 'الفلسفة والحوار' },
        { name: 'التفكير النقدي واستقراء الوثائق', score: 95, category: 'العلوم الإنسانية' },
        { name: 'القيادة الفردية وإدارة المشاريع', score: 94, category: 'الريادة' },
      ],
    },
    todaysNutrition: {
      mealName: 'فيليه دجاج المزارع الحرة مع خضار جبلية مخبوزة وزعتر الأطلس البليدي',
      chef: 'الشيف عبد القادر مقراني',
      origin: 'مزارع أطلس متيجة الحرة المستدامة',
      distanceMiles: 14,
      calories: 680,
      proteinG: 42,
      greensScore: 98,
      allergens: ['خالٍ تماماً من المكسرات', 'شهادة بيولوجية معتمدة'],
      allergenCheckPassed: true,
    },
  },
];

export const mockTouchpoints: TouchpointLog[] = [
  {
    id: 'tp-ar-01',
    studentId: 'and-st-01',
    timestamp: 'اليوم، 10:45 صباحاً',
    educatorName: 'أ. دليلة قاسمي',
    educatorRole: 'مديرة قسم الطفولة المبكرة',
    category: 'curiosity',
    note: 'لاحظ أمين بشكل مستقل النمط اللولبي في بذور دوار الشمس أثناء ورشة النباتات، وقارنه طوعاً بقشور الصنوبر دون أي توجيه مسبق من المعلم.',
    empathyScore: 99,
    encryptedReceipt: 'SHA256: 8f3c7e492b6a1...موثق محلياً',
  },
  {
    id: 'tp-ar-02',
    studentId: 'and-st-01',
    timestamp: 'اليوم، 08:30 صباحاً',
    educatorName: 'الشيف عبد القادر مقراني',
    educatorRole: 'خبير التغذية الحيوية',
    category: 'milestone',
    note: 'تذوق أمين طبق البطاطا الحلوة المشوية بالروزماري بحماس كبير، وأبدى فضولاً علمياً حول كيفية تخزين الجذور للغذاء تحت الأرض.',
    empathyScore: 97,
    encryptedReceipt: 'SHA256: 4b12aa908f...موثق محلياً',
  },
  {
    id: 'tp-ar-03',
    studentId: 'and-st-01',
    timestamp: 'أمس، 02:15 زوالاً',
    educatorName: 'أ. فريد حمداوي',
    educatorRole: 'مرشد النشاطات الجماعية',
    category: 'empathy',
    note: 'سارع أمين لمواساة زميله بعد تشقق قالبه الخزفي أثناء التجفيف، وقاسمه مادة الطين الخاصة به بكل عفوية وسرور.',
    empathyScore: 100,
    encryptedReceipt: 'SHA256: 9e32bb821a...موثق محلياً',
  },
];

export const mockSummons: AdministrativeSummons = {
  id: 'SUMMONS-DZ-2026-042',
  title: 'ميثاق الاستكشاف العلمي والمرافقة المخبرية للموسم الدراسي',
  type: 'إذن رسمي لممارسة الأنشطة المخبرية',
  issuingOfficer: 'أ. عبد الحفيظ بوعبد الله · مدير الشؤون البيداغوجية',
  dateIssued: '18 سبتمبر 2026',
  deadline: '05 أكتوبر 2026 (ضروري لدخول مختبرات الفيزياء الحيوية)',
  status: 'pending',
  legalSummary: 'ترخيص أبوي رسمي يخول للتلميذ دخول ورشات الروبوتات، ومجهر الليزر البصري، وأنفاق الرياح التوربينية تحت إشراف بيداغوجي مشدد بنسبة 1 إلى 6.',
  fullTerms: [
    'يمنح التلميذ حق الاستخدام المشرف عليه لأدوات المختبر والمجهر البصري والسبائك الهندسية الخفيفة.',
    'جميع البيانات الفيزيولوجية والقياسات الحركية للتلميذ تبقى مخزنة حصرياً على سيرفرات المدرسة المحلية المشفرة دون أي معالجة سحابية خارجية.',
    'تلتزم مدرسة الأندلس بنسبة تأطير لا تتجاوز 6 تلاميذ للأستاذ الواحد في كافة التجارب العملية.',
    'يقر الولي باطلاعه على النظام الداخلي للمدرسة وميثاق السلامة والأخلاقيات المدرسية.',
  ],
};

export const mockScarcity: SeatScarcity[] = [
  {
    pillar: 'Preparatory',
    pillarAr: 'الطور التحضيري',
    ageRange: '3–5 سنوات',
    totalCap: 24,
    seatsRemaining: 4,
    cohortYear: 'دفعة 2039',
    ratio: 'معلم لكل 5 أطفال',
  },
  {
    pillar: 'Primary',
    pillarAr: 'الطور الابتدائي',
    ageRange: '6–10 سنوات',
    totalCap: 36,
    seatsRemaining: 3,
    cohortYear: 'دفعة 2035',
    ratio: 'معلم لكل 6 تلاميذ',
  },
  {
    pillar: 'Middle School',
    pillarAr: 'الطور المتوسط',
    ageRange: '11–14 سنة',
    totalCap: 40,
    seatsRemaining: 5,
    cohortYear: 'دفعة 2031 (شهادة B.E.M.)',
    ratio: 'أستاذ لكل 6 تلاميذ',
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: 'n-01',
    title: 'تتويج تلامذة الأندلس بالمراتب الأولى في الأولمبياد الوطني للذكاء الاصطناعي',
    category: 'success',
    excerpt: 'حصد فريق المرحلة المتوسطة المرتبة الذهبية بمشروع بيئي مبتكر يعتمد على حساسات الري الذكي الموفر للطاقة.',
    date: '28 سبتمبر 2026',
    readTime: '3',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    author: 'أمانة الإعلام التربوي',
  },
  {
    id: 'n-02',
    title: 'انطلاق موسم جني الزيتون وعصره في البهو البيولوجي لمدرسة الأندلس',
    category: 'activities',
    excerpt: 'شارك أطفال الطور التحضيري والابتدائي في تجربة حية لقطف ثمار الزيتون والتعرف على مراحل استخلاص الزيت الطبيعي.',
    date: '24 سبتمبر 2026',
    readTime: '4',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
    author: 'نادي البيئة المستدامة',
  },
  {
    id: 'n-03',
    title: 'ورشة المناظرات الفلسفية الكبرى لطلاب الطور المتوسط حول أخلاقيات العلوم',
    category: 'workshops',
    excerpt: 'مناظرة سقراطية شيقة باللغات العربية والفرنسية والإنجليزية أظهر فيها التلاميذ قدرة بلاغية واستدلالاً منطقياً لافتاً.',
    date: '20 سبتمبر 2026',
    readTime: '5',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    author: 'قسم العلوم الإنسانية',
  },
  {
    id: 'n-04',
    title: 'رحلة علمية جيولوجية لاستكشاف محمية الشريعة والتشكيلات الصخرية',
    category: 'trips',
    excerpt: 'يوم استكشاف ميداني ممتع جمع بين دراسة التنوع النباتي والحيواني وجمع عينات التربة للفحص المخبري.',
    date: '15 سبتمبر 2026',
    readTime: '4',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    author: 'نادي الجغرافيا والبيئة',
  },
];

export const mockGallery: GalleryPhoto[] = [
  {
    id: 'g-01',
    title: 'البهو الزجاجي البيولوجي ذو الإضاءة الحيوية',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    caption: 'فضاء بيئي مهدئ للأعصاب يضم نباتات متوسطية نادرة لتصفية الهواء.',
  },
  {
    id: 'g-02',
    title: 'مختبر الروبوتات والبرمجة بالذكاء الاصطناعي',
    category: 'labs',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    caption: 'أجهزة اختبار موائع وأنفاق هواء وحساسات دقيقة لتطبيق الأفكار الفيزيائية.',
  },
  {
    id: 'g-03',
    title: 'قاعة الهدوء والمطالعة الفردية العميقة',
    category: 'classes',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    caption: 'مساحات مصممة بعزل صوتي وألوان دافئة لدعم التركيز دون أي تشويش.',
  },
  {
    id: 'g-04',
    title: 'الملاعب الرياضية والمسبح نصف الأولمبي',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    caption: 'منشآت رياضية مغطاة لتنمية اللياقة البدنية والروح الرياضية العالية.',
  },
];

export const mockFaqs: FaqItem[] = [
  {
    id: 'faq-01',
    question: 'كيف يتوافق منهج مدرسة الأندلس مع البرامج الرسمية لوزارة التربية الوطنية؟',
    answer: 'مدرسة الأندلس معتمدة كلياً من وزارة التربية الوطنية الجزائرية، وتطبق المنهاج الوزاري الرسمي كاملاً مع إثرائه بمناهج عالمية معتمدة في الرياضيات التجريبية، الروبوتات، واللغات الحية (فرنسية وإنجليزية مكثفة)، مما يضمن تفوق التلاميذ في امتحانات شهادة التعليم المتوسط (B.E.M.).',
    category: 'بيداغوجيا',
  },
  {
    id: 'faq-02',
    question: 'ما هي منهجية تدريس اللغات في مدرستكم؟',
    answer: 'نعتمد الانغماس اللغوي المتوازن؛ حيث يتعلم التلميذ اللغة العربية الفصحى كلغة تفكير وهوية أساسية، بالتوازي مع تعليم مكثف وتطبيقي للغة الفرنسية واللغة الإنجليزية منذ الطور التحضيري على أيدي أساتذة متخصصين.',
    category: 'اللغات',
  },
  {
    id: 'faq-03',
    question: 'هل توفر المدرسة خدمة النقل المدرسي لمختلف بلديات العاصمة؟',
    answer: 'نعم، تمتلك المدرسة أسطولاً من الحافلات الحديثة المكيفة والمجهزة بأنظمة تتبع رقمية ومرافقة بيداغوجية، يغطي بلديات: حيدرة، الأبيار، بن عكنون، بوزريعة، دالي براهيم، الشراقة، زرالدة، والقبة.',
    category: 'الخدمات',
  },
  {
    id: 'faq-04',
    question: 'كيف يتم قبول التلاميذ في مختلف الأطوار؟',
    answer: 'يتم القبول بعد إجراء مقابلة بيداغوجية واستكشافية هادئة مع التلميذ وولي أمره لتحديد الميول ومستوى المكتسبات، دون أي اختبارات تقليدية مرهقة، حفاظاً على التوازن النفسي للطفل.',
    category: 'التسجيل',
  },
];

export const mockTimetable: TimetableSlot[] = [
  { day: 'الأحد', period: '08:00 - 09:30', subject: 'الرياضيات التطبيقية', teacher: 'أ. فريد حمداوي', room: 'قاعة الخوارزمي 03' },
  { day: 'الأحد', period: '09:45 - 11:15', subject: 'اللغة العربية والبلاغة', teacher: 'د. نور الدين زروقي', room: 'مدرج ابن رشد' },
  { day: 'الأحد', period: '11:30 - 12:30', subject: 'الروبوتات والمحاكاة', teacher: 'م. سليم مزيان', room: 'مختبر STEM 01' },
  { day: 'الأحد', period: '01:30 - 03:00', subject: 'اللغة الإنجليزية العلمية', teacher: 'أ. سارة بن ناصر', room: 'قاعة اللغات 02' },
  { day: 'الاثنين', period: '08:00 - 09:30', subject: 'الفيزياء ونفق الرياح', teacher: 'د. عمار شريفي', room: 'مختبر الموائع' },
  { day: 'الاثنين', period: '09:45 - 11:15', subject: 'التربية المدنية والقيادة', teacher: 'أ. دليلة قاسمي', room: 'غرفة المناظرات' },
];

export const mockHomework: HomeworkQuest[] = [
  { id: 'hw-01', title: 'بناء نموذج مجسم لخلية نباتية متوازنة', subject: 'علوم الطبيعة والحياة', dueDate: 'الخميس، 04 أكتوبر', status: 'completed', xpReward: 150 },
  { id: 'hw-02', title: 'كتابة مقال تحليلي حول أثر ابن خلدون في العمران', subject: 'اللغة العربية والتاريخ', dueDate: 'الأحد، 07 أكتوبر', status: 'in_progress', xpReward: 200 },
  { id: 'hw-03', title: 'برمجة خوارزمية فرز بياني بحساس الألوان', subject: 'الروبوتات', dueDate: 'الثلاثاء، 09 أكتوبر', status: 'pending', xpReward: 180 },
];

export const mockBadges: StudentBadge[] = [
  { id: 'b-01', title: 'وسام الفصاحة والبيان', description: 'ألقى مرافعة نموذجية في نادي المناظرات باللغة الفصحى.', iconName: 'Award', dateEarned: '15 سبتمبر 2026', color: '#C9A24B' },
  { id: 'b-02', title: 'وسام المستكشف البيئي', description: 'نجح في زراعة وتوثيق دورة حياة بذور اللافندر بالكامل.', iconName: 'Sparkles', dateEarned: '22 سبتمبر 2026', color: '#2FD6C8' },
  { id: 'b-03', title: 'وسام المروءة والتعاون', description: 'قدم مساعدة نموذجية لزملائه في ورشة الروبوتات.', iconName: 'HeartHandshake', dateEarned: '26 سبتمبر 2026', color: '#E2C275' },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 'voice-01',
    name: 'د. سمية بن يحيى',
    title: 'رئيسة قسم جراحة الأعصاب · والدة تلميذة بالطور الابتدائي',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    quote: '«كأم وطبيبة متخصصة في الدماغ البشري، أدرك تماماً كيف يُدمر القلق الإبداع. في مدرسة الأندلس، رأيت ابنتي تتحول من طفلة مترددة إلى عقلية باحثة واثقة، تناقش الفرضيات العلمية بشغف وتتحدث ثلاث لغات بطلاقة لا مثيل لها.»',
    childInfo: 'والدة مريم (8 سنوات - الطور الابتدائي)',
    audioDuration: '01:45',
  },
  {
    id: 'voice-02',
    name: 'م. كريم براهيمي',
    title: 'مهندس نظم طيران وروبوتات · والد تلميذ بالطور المتوسط',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    quote: '«قرار استبعاد الطور الثانوي كان هو العامل الحاسم بالنسبة لي. الأجواء داخل المدرسة آمنة وخالية من المظاهر السلوكية المشوشة. يانيس يقضي أمسياته يبرمج خوارزميات نفق الرياح بدلاً من إضاعة الوقت في الحفظ الآلي.»',
    childInfo: 'والد يانيس (13 سنة - الطور المتوسط)',
    audioDuration: '02:10',
  },
  {
    id: 'voice-03',
    name: 'د. ياسين بن عيسى',
    title: 'أستاذ الاقتصاد القياسي الدولي · والد طفل بالطور التحضيري',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    quote: '«كنت أبحث عن مؤسسة لا تعامل طفلي كرقم في قائمة حضور. في الأندلس، بفضل نسبة 1 إلى 6، يتعلم أمين في البهو البيولوجي النظم الطبيعية بحواسه، ويتم توثيق كل خطوة في مساره بنزاهة واهتمام يفوق التوقعات.»',
    childInfo: 'والد أمين (4 سنوات - الطور التحضيري)',
    audioDuration: '01:55',
  },
];
