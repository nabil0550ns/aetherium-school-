import { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Printer } from 'lucide-react';
import { mockScarcity } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

interface AdmissionsFunnelProps {
  onOpenTourModal: () => void;
}

export const AdmissionsFunnel = ({ onOpenTourModal }: AdmissionsFunnelProps) => {
  const { t, isRtl } = useLanguage();
  const [yearsEnrolled, setYearsEnrolled] = useState<number>(6);

  // Multi-step Registration Form state
  const [formStep, setFormStep] = useState<1 | 2 | 3 | 4>(1);
  const [childName, setChildName] = useState('');
  const [childDob, setChildDob] = useState('2020-05-12');
  const [targetPillar, setTargetPillar] = useState<'preparatory' | 'primary' | 'middle'>('primary');
  
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('+213 ');
  const [parentEmail, setParentEmail] = useState('');
  const [parentRelation, setParentRelation] = useState<'أب' | 'أم' | 'ولي أمر'>('أب');

  const [dietaryNotes, setDietaryNotes] = useState('');
  const [interestsNotes, setInterestsNotes] = useState('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // Trajectory calculations
  const conventionalAgency = Math.round(30 + yearsEnrolled * 3.5);
  const andalusAgency = Math.min(99, Math.round(65 + yearsEnrolled * 3.4));

  const conventionalAnxiety = Math.round(45 + yearsEnrolled * 3.2);
  const andalusAnxiety = Math.max(3, Math.round(18 - yearsEnrolled * 1.5));

  const convEndY = 160 - conventionalAgency * 1.2;
  const andalusEndY = 160 - andalusAgency * 1.4;

  const convPath = `M 20 160 Q ${150 + yearsEnrolled * 10} 140, 380 ${convEndY}`;
  const andalusPath = `M 20 160 C ${100 + yearsEnrolled * 5} 120, ${220 + yearsEnrolled * 8} ${40 + (10 - yearsEnrolled) * 6}, 380 ${andalusEndY}`;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep < 3) {
      setFormStep((prev) => (prev + 1) as any);
    } else if (formStep === 3) {
      // Generate unique registration reference
      const code = `AND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmationCode(code);
      setFormStep(4);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C9A24B', '#2FD6C8', '#F8F6F2'],
        });
      } catch {
        // fallback safe
      }
    }
  };

  return (
    <section id="admissions" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A24B]/15 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#C9A24B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            {t.admissions.badge}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6">
            {t.admissions.title} <span className="italic text-[#C9A24B]">{t.admissions.titleHighlight}</span>
          </h2>
          <p className="font-sans-ui text-[#F8F6F2]/75 text-base sm:text-lg leading-relaxed">
            {t.admissions.desc}
          </p>
        </div>

        {/* 1. Real-time Seat Availability Cards (3–14 Only) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-wider text-[#C9A24B]">
                {t.admissions.scarcityBadge}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl text-white">
                {t.admissions.scarcityTitle}
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-[#2FD6C8]">
              <span className="w-2 h-2 rounded-full bg-[#2FD6C8] animate-ping" />
              <span>{t.admissions.syncNotice}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockScarcity.map((sc, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-panel border border-[#C9A24B]/30 bg-[#0E1526]/85 flex flex-col justify-between hover:border-[#2FD6C8]/60 transition-all duration-300 relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded bg-[#C9A24B]/10 text-[#C9A24B] border border-[#C9A24B]/30">
                      {sc.ageRange}
                    </span>
                    <span className="text-xs font-mono-tech text-[#F8F6F2]/50">
                      {sc.cohortYear}
                    </span>
                  </div>

                  <h4 className="font-editorial text-2xl text-white mb-2">
                    {sc.pillarAr}
                  </h4>

                  <p className="text-xs text-[#2FD6C8] font-mono-tech mb-6">
                    {sc.ratio}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <div className="text-3xl font-editorial font-bold text-[#C9A24B] mb-1">
                      {sc.seatsRemaining}
                    </div>
                    <div className="text-xs font-mono-tech text-[#F8F6F2]/70">
                      {t.admissions.seatsLeft} ({sc.totalCap} {t.admissions.totalCap})
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenTourModal}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#C9A24B] hover:text-[#0B0F1A] text-white text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-[#C9A24B] group-hover:text-[#0B0F1A]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.admissions.reservePillarCta}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Interactive Developmental Trajectory Comparison Slider */}
        <div className="mb-20 rounded-3xl glass-panel border border-[#C9A24B]/30 bg-[#0E1526]/90 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-[#C9A24B]">
                {isRtl ? 'محاكاة الأثر التربوي التراكمي (1 إلى 10 سنوات)' : 'Longitudinal Developmental Compounding'}
              </span>

              <h3 className="font-editorial text-2xl sm:text-4xl text-white font-normal">
                {isRtl ? 'كيف يتبلور ذكاء الطفل عبر السنوات؟' : 'The Neural Advantage Over Time'}
              </h3>

              <p className="font-sans-ui text-sm text-[#F8F6F2]/75 leading-relaxed">
                {isRtl
                  ? 'حرك المؤشر لاستكشاف الفارق الإحصائي التراكمي بين البيئات المدرسية التقليدية القائمة على التلقين، والبيئة الأندلسية القائمة على الفضول والمرافقة بنسبة 1 إلى 6.'
                  : 'Slide across developmental duration to see compounding divergence in intellectual autonomy versus chronic anxiety.'}
              </p>

              {/* Slider Controller */}
              <div className="space-y-3 pt-4">
                <div className="flex justify-between text-xs font-mono-tech text-[#C9A24B]">
                  <span>{isRtl ? 'مدة التمدرس بالأندلس:' : 'Enrolled Duration:'}</span>
                  <span className="font-bold text-base text-white">{yearsEnrolled} {isRtl ? 'سنوات' : 'Years'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={yearsEnrolled}
                  onChange={(e) => setYearsEnrolled(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C9A24B]"
                />
              </div>

              {/* Metrics Readouts */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-[#2FD6C8] font-mono-tech mb-1">
                    {isRtl ? 'الاستقلالية الفكرية بالأندلس' : 'Intellectual Agency (El Andalus)'}
                  </div>
                  <div className="text-2xl font-editorial text-white font-bold">{andalusAgency}%</div>
                  <div className="text-[10px] text-[#F8F6F2]/50 mt-1">
                    {isRtl ? `مقابل ${conventionalAgency}% في التعليم النمطي` : `vs ${conventionalAgency}% conventional`}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-[#C9A24B] font-mono-tech mb-1">
                    {isRtl ? 'مؤشر القلق والتوتر' : 'Chronic Anxiety Index'}
                  </div>
                  <div className="text-2xl font-editorial text-white font-bold">{andalusAnxiety}%</div>
                  <div className="text-[10px] text-[#F8F6F2]/50 mt-1">
                    {isRtl ? `مقابل ${conventionalAnxiety}% في البيئات المرهقة` : `vs ${conventionalAnxiety}% high-stress`}
                  </div>
                </div>
              </div>
            </div>

            {/* SVG Visual Trajectory Curve */}
            <div className="lg:col-span-6 bg-[#080D19] p-6 rounded-2xl border border-white/10">
              <div className="text-xs font-mono-tech text-[#F8F6F2]/60 mb-4 flex items-center justify-between">
                <span>{isRtl ? 'منحنى النمو المعرفي التراكمي' : 'Compounding Growth Trajectory'}</span>
                <span className="text-[#C9A24B]">أعمار 3 إلى 14 سنة</span>
              </div>
              <svg viewBox="0 0 400 200" className="w-full h-48">
                {/* Grid lines */}
                <line x1="20" y1="160" x2="380" y2="160" stroke="#ffffff" strokeOpacity="0.1" />
                <line x1="20" y1="100" x2="380" y2="100" stroke="#ffffff" strokeOpacity="0.05" />
                <line x1="20" y1="40" x2="380" y2="40" stroke="#ffffff" strokeOpacity="0.05" />

                {/* Conventional Curve */}
                <path d={convPath} fill="none" stroke="#F8F6F2" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />

                {/* El Andalus Curve */}
                <path d={andalusPath} fill="none" stroke="#C9A24B" strokeWidth="3.5" />

                {/* Glow endpoint */}
                <circle cx="380" cy={andalusEndY} r="6" fill="#2FD6C8" />
              </svg>
              <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#F8F6F2]/60 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1.5 text-[#C9A24B]">
                  <span className="w-3 h-0.5 bg-[#C9A24B]" />
                  {isRtl ? 'مسار مدرسة الأندلس (شغف واكتشاف)' : 'El Andalus Path'}
                </span>
                <span className="flex items-center gap-1.5 text-[#F8F6F2]/40">
                  <span className="w-3 h-0.5 bg-white/30" />
                  {isRtl ? 'المسار النمطي (تلقين واختبارات)' : 'Conventional Path'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Production-Grade Multi-Step RTL Registration Form */}
        <div className="rounded-3xl glass-panel border border-[#C9A24B]/40 bg-[#0E1526]/95 p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-[#C9A24B]">
                {t.admissions.formTitle}
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl text-white font-normal mt-1 mb-2">
                {isRtl ? 'تسجيل أولي لحجز المقابلة البيداغوجية' : 'Initial Admissions Application'}
              </h3>
              <p className="font-sans-ui text-xs sm:text-sm text-[#F8F6F2]/70">
                {t.admissions.formSubtitle}
              </p>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-2 mb-10">
              {[
                { step: 1, label: isRtl ? 'التلميذ' : 'Student' },
                { step: 2, label: isRtl ? 'الولي' : 'Parent' },
                { step: 3, label: isRtl ? 'الملاحظات' : 'Details' },
                { step: 4, label: isRtl ? 'التأكيد' : 'Done' },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`text-center pb-2 border-b-2 transition-all ${
                    formStep >= s.step
                      ? 'border-[#C9A24B] text-[#C9A24B] font-bold'
                      : 'border-white/10 text-[#F8F6F2]/40'
                  }`}
                >
                  <div className="text-xs font-mono-tech">0{s.step}</div>
                  <div className="text-[11px] font-sans-ui truncate">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Step 1: Student Information */}
            {formStep === 1 && (
              <form onSubmit={handleNextStep} className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                    {isRtl ? 'الاسم واللقب الكامل للتلميذ *' : 'Child Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder={isRtl ? 'مثال: يوسف بلقاسم' : 'e.g. Youssef Belkacem'}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                      {isRtl ? 'تاريخ الميلاد *' : 'Date of Birth *'}
                    </label>
                    <input
                      type="date"
                      required
                      value={childDob}
                      onChange={(e) => setChildDob(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                      {isRtl ? 'الطور المراد التسجيل فيه *' : 'Target Pillar (Ages 3–14 Only) *'}
                    </label>
                    <select
                      value={targetPillar}
                      onChange={(e) => setTargetPillar(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-[#141B2D] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                    >
                      <option value="preparatory">{isRtl ? 'الطور التحضيري (3–5 سنوات)' : 'Preparatory (Ages 3–5)'}</option>
                      <option value="primary">{isRtl ? 'الطور الابتدائي (6–10 سنوات)' : 'Primary (Ages 6–10)'}</option>
                      <option value="middle">{isRtl ? 'الطور المتوسط (11–14 سنة)' : 'Middle School (Ages 11–14)'}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-[#C9A24B] hover:bg-[#d6b059] text-[#0B0F1A] font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
                  >
                    <span>{isRtl ? 'متابعة إلى بيانات الولي' : 'Continue to Parent Info'}</span>
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Parent Information */}
            {formStep === 2 && (
              <form onSubmit={handleNextStep} className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                      {isRtl ? 'اسم ولقب الولي / الوصي *' : 'Parent Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder={isRtl ? 'مثال: د. عبد الحميد بلقاسم' : 'e.g. Dr. Abdelhamid'}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                      {isRtl ? 'صلة القرابة *' : 'Relationship *'}
                    </label>
                    <select
                      value={parentRelation}
                      onChange={(e) => setParentRelation(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-[#141B2D] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                    >
                      <option value="أب">{isRtl ? 'الأب' : 'Father'}</option>
                      <option value="أم">{isRtl ? 'الأم' : 'Mother'}</option>
                      <option value="ولي أمر">{isRtl ? 'وصي شرعي' : 'Legal Guardian'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                      {isRtl ? 'رقم الهاتف الجزائري (+213) *' : 'Phone Number (+213) *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="+213 550 12 34 56"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                      {isRtl ? 'البريد الإلكتروني للولي *' : 'Parent Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="parent@domain.dz"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setFormStep(1)}
                    className="px-6 py-2.5 rounded-xl border border-white/20 text-xs font-mono-tech text-[#F8F6F2]/70 hover:text-white"
                  >
                    {isRtl ? 'السابق' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-[#C9A24B] hover:bg-[#d6b059] text-[#0B0F1A] font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
                  >
                    <span>{isRtl ? 'متابعة إلى الملاحظات' : 'Continue to Details'}</span>
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Special Notes & Interests */}
            {formStep === 3 && (
              <form onSubmit={handleNextStep} className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                    {isRtl ? 'اهتمامات ومواهب التلميذ (لغات، رسم، رياضيات، برمجة...)' : 'Student Talents & Interests'}
                  </label>
                  <textarea
                    rows={2}
                    value={interestsNotes}
                    onChange={(e) => setInterestsNotes(e.target.value)}
                    placeholder={isRtl ? 'أخبرنا عما يُثير فضول وشغف طفلك...' : 'Tell us what sparks your child’s curiosity...'}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-[#C9A24B] mb-2">
                    {isRtl ? 'أي حساسيات غذائية أو اعتبارات صحية (للتحقق مع الشيف عبد القادر)' : 'Dietary Allergies or Medical Considerations'}
                  </label>
                  <textarea
                    rows={2}
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder={isRtl ? 'مثال: حساسية طفيفة من الفول السوداني أو الغلوتين...' : 'e.g. slight peanut or gluten allergy...'}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#2FD6C8]/10 border border-[#2FD6C8]/30 text-xs font-mono-tech text-[#2FD6C8]">
                  {isRtl
                    ? 'تنبيه أمان: جميع المعلومات تُحفظ محلياً وفق معايير الخصوصية المعتمدة ولا تُشارك إطلاقاً.'
                    : 'Confidentiality guarantee: All records encrypted and kept on local sovereign vault.'}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="px-6 py-2.5 rounded-xl border border-white/20 text-xs font-mono-tech text-[#F8F6F2]/70 hover:text-white"
                  >
                    {isRtl ? 'السابق' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-[#C9A24B] hover:bg-[#d6b059] text-[#0B0F1A] font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isRtl ? 'تأكيد الطلب واستخراج الوصل' : 'Submit Application & Print Receipt'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Celebratory Receipt & Confirmation */}
            {formStep === 4 && (
              <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-[#2FD6C8]/10 border border-[#2FD6C8] text-[#2FD6C8] flex items-center justify-center mx-auto shadow-lg shadow-[#2FD6C8]/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="font-editorial text-2xl sm:text-3xl text-white mb-2">
                    {isRtl ? 'تم تسجيل طلبكم بنجاح ومبارك قبول الملف الأولي!' : 'Application Successfully Logged!'}
                  </h4>
                  <p className="font-sans-ui text-sm text-[#F8F6F2]/70 max-w-lg mx-auto">
                    {isRtl
                      ? `سيتصل بكم المنسق البيداغوجي لمدرسة الأندلس في غضون 24 ساعة لتأكيد موعد المقابلة الاستكشافية.`
                      : 'Our pedagogical coordinator will contact you within 24 hours to confirm your private interview slot.'}
                  </p>
                </div>

                {/* Printable Receipt Card */}
                <div className="p-6 rounded-2xl bg-white/5 border border-[#C9A24B]/40 max-w-md mx-auto text-start space-y-3 font-mono-tech text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-[#F8F6F2]/60">{isRtl ? 'الرقم المرجعي للطلب:' : 'Reference Code:'}</span>
                    <span className="text-[#C9A24B] font-bold text-sm">{confirmationCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8F6F2]/60">{isRtl ? 'اسم التلميذ:' : 'Student Name:'}</span>
                    <span className="text-white">{childName || (isRtl ? 'يوسف بلقاسم' : 'Youssef Belkacem')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8F6F2]/60">{isRtl ? 'المرحلة الدراسية:' : 'Stage:'}</span>
                    <span className="text-[#2FD6C8]">
                      {targetPillar === 'preparatory' ? (isRtl ? 'التحضيري (3–5)' : 'Preparatory') : targetPillar === 'primary' ? (isRtl ? 'الابتدائي (6–10)' : 'Primary') : (isRtl ? 'المتوسط (11–14)' : 'Middle School')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8F6F2]/60">{isRtl ? 'ولي الأمر:' : 'Parent:'}</span>
                    <span className="text-white">{parentName || (isRtl ? 'د. عبد الحميد بلقاسم' : 'Parent')}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 text-[10px] text-[#F8F6F2]/40">
                    <span>مدرسة الأندلس · الجزائر العاصمة</span>
                    <span>معتمد وزارياً · بدون ثانوي</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono-tech text-white flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-[#C9A24B]" />
                    <span>{isRtl ? 'طباعة وصل التسجيل' : 'Print Receipt'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setFormStep(1);
                      setChildName('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#C9A24B] text-[#0B0F1A] text-xs font-bold font-mono-tech"
                  >
                    {isRtl ? 'تسجيل تلميذ آخر' : 'Register Another Child'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
