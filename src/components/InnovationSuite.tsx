import { useState } from 'react';
import { Sparkles, Brain, ShieldAlert, Utensils, MessageSquareHeart, ArrowRight, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InnovationSuiteProps {
  onOpenSanctumWithTab?: (tab: 'overview' | 'neuropulse' | 'aegis' | 'nutrition' | 'whisper') => void;
}

export const InnovationSuite = ({ onOpenSanctumWithTab }: InnovationSuiteProps) => {
  const { t, isRtl } = useLanguage();
  const [activeFeature, setActiveFeature] = useState<number>(0);

  // Interactive mini-states for the live showcases
  const [bloomCount, setBloomCount] = useState(36);
  const [lastLoggedSkill, setLastLoggedSkill] = useState<string>(
    isRtl ? 'الاستدلال الهندسي الإقليدي' : 'Bilateral Spatial Synthesis'
  );
  const [whisperDraft, setWhisperDraft] = useState(
    isRtl
      ? 'أظهر أمين اليوم روح تعاون لافتة في ورشة النباتات وساعد زميله في بذر اللافندر.'
      : 'Elena initiated a collaborative bridge experiment with her peer today.'
  );
  const [empathyScore, setEmpathyScore] = useState(99);

  const handleSimulateMilestone = () => {
    setBloomCount((prev) => prev + 4);
    const skillsAr = [
      'حل النزاعات بالتعاطف والحوار',
      'التحقق من فرضية سيلان الموائع',
      'تمييز المقامات الصوتية والهارموني',
      'طرح الأسئلة السقراطية الأخلاقية',
    ];
    const skillsEn = [
      'Empathetic Dispute Resolution',
      'Micro-Fluidic Hypothesis Validation',
      'Harmonic Polyphony Discernment',
      'Ethical Socratic Querying',
    ];
    const pool = isRtl ? skillsAr : skillsEn;
    const nextSkill = pool[Math.floor(Math.random() * pool.length)];
    setLastLoggedSkill(nextSkill);
  };

  const handleWhisperChange = (text: string) => {
    setWhisperDraft(text);
    const score = Math.min(100, Math.max(90, 95 + (text.length % 5)));
    setEmpathyScore(score);
  };

  const featureTabs = [
    {
      id: 'neuropulse',
      name: t.innovations.items[0]?.name || 'التوأم المعرفي™',
      subtitle: t.innovations.items[0]?.subtitle || 'NeuroPulse™',
      icon: Brain,
      pitch: t.innovations.items[0]?.pitch || '',
      tag: t.innovations.items[0]?.tag || '',
      tabKey: 'neuropulse' as const,
    },
    {
      id: 'aegis',
      name: t.innovations.items[1]?.name || 'شبكة الأمان الحية™',
      subtitle: t.innovations.items[1]?.subtitle || 'Aegis Safety Mesh™',
      icon: ShieldAlert,
      pitch: t.innovations.items[1]?.pitch || '',
      tag: t.innovations.items[1]?.tag || '',
      tabKey: 'aegis' as const,
    },
    {
      id: 'harvest',
      name: t.innovations.items[2]?.name || 'سجل التغذية الحيوية™',
      subtitle: t.innovations.items[2]?.subtitle || 'Harvest-to-Table™',
      icon: Utensils,
      pitch: t.innovations.items[2]?.pitch || '',
      tag: t.innovations.items[2]?.tag || '',
      tabKey: 'nutrition' as const,
    },
    {
      id: 'whisper',
      name: t.innovations.items[3]?.name || 'قناة الهمس الآمنة™',
      subtitle: t.innovations.items[3]?.subtitle || 'The Whisper Channel™',
      icon: MessageSquareHeart,
      pitch: t.innovations.items[3]?.pitch || '',
      tag: t.innovations.items[3]?.tag || '',
      tabKey: 'whisper' as const,
    },
  ];

  const current = featureTabs[activeFeature];

  return (
    <section id="innovation" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A24B]/15 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#C9A24B]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#2FD6C8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            {t.innovations.badge}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6">
            {t.innovations.title} <span className="italic text-[#C9A24B]">{t.innovations.titleHighlight}</span>
          </h2>
          <p className="font-sans-ui text-[#F8F6F2]/75 text-base sm:text-lg leading-relaxed">
            {t.innovations.desc}
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {featureTabs.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeFeature === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveFeature(idx)}
                className={`p-6 rounded-2xl border text-start transition-all duration-300 relative group overflow-hidden ${
                  isActive
                    ? 'bg-[#141B2D] border-[#C9A24B] shadow-[0_10px_25px_rgba(201,162,75,0.2)]'
                    : 'bg-[#0E1526]/50 border-white/5 hover:border-white/20'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] to-[#2FD6C8]" />
                )}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                      isActive
                        ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0B0F1A]'
                        : 'bg-white/5 border-white/10 text-[#C9A24B]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono-tech text-[#F8F6F2]/40">0{idx + 1}</span>
                </div>
                <h4 className="font-editorial text-lg text-white font-medium mb-1">
                  {item.name}
                </h4>
                <p className="text-xs text-[#C9A24B] font-mono-tech truncate">
                  {item.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Feature Interactive Showcase Card */}
        <div className="rounded-3xl glass-panel border border-[#C9A24B]/30 bg-[#0E1526]/80 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Description & Direct Sanctum CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tech text-[#2FD6C8]">
                {current.tag}
              </div>

              <h3 className="font-editorial text-2xl sm:text-4xl text-white font-normal">
                {current.name}
              </h3>

              <p className="font-sans-ui text-sm sm:text-base text-[#F8F6F2]/80 leading-relaxed">
                {current.pitch}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenSanctumWithTab && onOpenSanctumWithTab(current.tabKey)}
                  className="px-6 py-3 rounded-xl bg-[#C9A24B] hover:bg-[#d8b55e] text-[#0B0F1A] font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-[#C9A24B]/20"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isRtl ? 'معاينة في فضاء الولي' : 'Launch in Parent Sanctum'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>

                <span className="text-xs text-[#F8F6F2]/50 font-mono-tech">
                  {isRtl ? 'مشفر محلياً · بدون أطراف خارجية' : 'Air-gapped telemetry'}
                </span>
              </div>
            </div>

            {/* Right Column: Live Interactive Sandbox */}
            <div className="lg:col-span-6 bg-[#080D19]/90 border border-white/10 rounded-2xl p-6 sm:p-8">
              {/* 1. NeuroPulse Live Sandbox */}
              {activeFeature === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech uppercase tracking-wider text-[#C9A24B]">
                      {isRtl ? 'التوأم المعرفي المباشر' : 'Live Cognitive Twin'}
                    </span>
                    <span className="text-xs font-mono-tech text-[#2FD6C8]">
                      {bloomCount} {isRtl ? 'بتلة نشطة' : 'Petals Bloomed'}
                    </span>
                  </div>

                  {/* Botanical Petal Growth SVG */}
                  <div className="relative h-48 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-44 h-44 animate-spin-slow">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <circle
                          key={i}
                          cx={100 + 45 * Math.cos((i * Math.PI) / 6)}
                          cy={100 + 45 * Math.sin((i * Math.PI) / 6)}
                          r={14 + (i % 3) * 3}
                          fill={i % 2 === 0 ? '#C9A24B' : '#2FD6C8'}
                          opacity={0.35 + (i % 4) * 0.15}
                        />
                      ))}
                      <circle cx="100" cy="100" r="28" fill="#141B2D" stroke="#C9A24B" strokeWidth="2" />
                    </svg>
                    <div className="absolute font-editorial text-sm text-white font-semibold">
                      98.4%
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#F8F6F2]/70 font-sans-ui">
                      {isRtl ? 'آخر إنجاز موثق:' : 'Last Validated Milestone:'}
                    </span>
                    <span className="text-[#2FD6C8] font-mono-tech font-bold">{lastLoggedSkill}</span>
                  </div>

                  <button
                    onClick={handleSimulateMilestone}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono-tech text-[#C9A24B] transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#C9A24B]" />
                    <span>{isRtl ? 'محاكاة تسجيل إنجاز مهاري جديد' : 'Simulate New Skill Milestone (+4 Petals)'}</span>
                  </button>
                </div>
              )}

              {/* 2. Aegis Safety Mesh Sandbox */}
              {activeFeature === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech uppercase tracking-wider text-[#C9A24B]">
                      {isRtl ? 'مخطط الأمان اللمسي الفوري' : 'Passive Presence Matrix'}
                    </span>
                    <span className="text-xs font-mono-tech text-[#2FD6C8] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#2FD6C8] animate-pulse" />
                      {isRtl ? 'مؤطر بيداغوجياً 100%' : '100% Attuned'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { zone: isRtl ? 'البهو البيولوجي' : 'Bio-Atrium', sup: 'أ. دليلة قاسمي', count: '12 طفلاً' },
                      { zone: isRtl ? 'مختبر الموائع والروبوتات' : 'Fluidics Lab', sup: 'أ. فريد حمداوي', count: '14 تلميذاً' },
                      { zone: isRtl ? 'قاعة المناظرات' : 'Socratic Hall', sup: 'د. نور الدين زروقي', count: '16 تلميذاً' },
                      { zone: isRtl ? 'المطعم البيولوجي' : 'Harvest Refectory', sup: 'الشيف عبد القادر', count: 'الكل' },
                    ].map((z, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[11px] text-[#C9A24B] font-mono-tech">{z.zone}</div>
                        <div className="text-xs text-white font-medium mt-0.5">{z.sup}</div>
                        <div className="text-[10px] text-[#F8F6F2]/50 mt-1">{z.count}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-[#2FD6C8]/10 border border-[#2FD6C8]/30 text-xs text-[#2FD6C8] font-mono-tech text-center">
                    {isRtl
                      ? 'مرافقة هادئة بدون كاميرات مراقبة تطفلية تحفظ كرامة وخصوصية الطفل.'
                      : 'Respectful non-invasive presence telemetry.'}
                  </div>
                </div>
              )}

              {/* 3. Harvest to Table Sandbox */}
              {activeFeature === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech uppercase tracking-wider text-[#C9A24B]">
                      {isRtl ? 'تتبع مصادر الوجبة اليومية' : 'Live Ingredient Flightpath'}
                    </span>
                    <span className="text-xs font-mono-tech text-[#2FD6C8]">
                      {isRtl ? 'مزارع متيجة · 18 كم' : 'Mitidja Farms · 18km'}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { item: isRtl ? 'خضار موسمية حيوية' : 'Heirloom Root Vegetables', cert: 'مزارع بوعرفة العضوية', status: 'خالٍ من المبيدات' },
                      { item: isRtl ? 'زيت زيتون معصور بارداً' : 'Cold-Pressed Olive Oil', cert: 'معاصر البويرة الجبلية', status: 'حموضة أقل من 0.3%' },
                      { item: isRtl ? 'سمك طازج مستدام' : 'Artisanal Mediterranean Catch', cert: 'صيد حرفي تيبازة', status: 'صيد صباحي يومي' },
                    ].map((row, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <div className="text-white font-medium">{row.item}</div>
                          <div className="text-[10px] text-[#C9A24B] font-mono-tech">{row.cert}</div>
                        </div>
                        <span className="text-[10px] text-[#2FD6C8] font-mono-tech">{row.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Whisper Channel Sandbox */}
              {activeFeature === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-tech uppercase tracking-wider text-[#C9A24B]">
                      {isRtl ? 'مصفاة التعاطف اللغوي الفوري' : 'Linguistic Empathy Filter'}
                    </span>
                    <span className="text-xs font-mono-tech text-[#2FD6C8]">
                      {empathyScore}% {isRtl ? 'مؤشر الطمأنينة' : 'Attunement'}
                    </span>
                  </div>

                  <textarea
                    value={whisperDraft}
                    onChange={(e) => handleWhisperChange(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C9A24B] resize-none"
                    placeholder={isRtl ? 'اكتب ملاحظة بيداغوجية لمشاهدة تحليل النبرة...' : 'Draft a note to see live tone filter...'}
                  />

                  <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#F8F6F2]/60">
                    <span className="text-[#2FD6C8]">✓ {isRtl ? 'النبرة بناءة ومطمئنة للولي' : 'Constructive tone verified'}</span>
                    <span>{whisperDraft.length} {isRtl ? 'حرفاً' : 'chars'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
