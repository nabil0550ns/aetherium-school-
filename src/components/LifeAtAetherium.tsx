import { useState } from 'react';
import { Shield, Sparkles, Building, Utensils, CheckCircle2 } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { useLanguage } from '../context/LanguageContext';

export const LifeAtAetherium = () => {
  const { t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<'campus' | 'safety' | 'nutrition'>('campus');

  const campusFacilities = [
    {
      title: t.campus.facilitiesList[0]?.title || 'البهو البيولوجي ذو الإضاءة الحيوية',
      tag: t.campus.facilitiesList[0]?.tag || 'عمارة توافقية',
      description: t.campus.facilitiesList[0]?.desc || 'بهو زجاجي بارتفاع ثلاثة طوابق مزود بمرشحات ضوئية تحاكي الدورة الطبيعية لليوم لدعم التركيز والنشاط الطبيعي.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      specs: t.campus.facilitiesList[0]?.specs || '1200 م² · 35 نوعاً من النباتات المحلية المنقية للهواء',
    },
    {
      title: t.campus.facilitiesList[1]?.title || 'مختبر الميكانيكا ومحاكاة الموائع',
      tag: t.campus.facilitiesList[1]?.tag || 'فيزياء تطبيقية',
      description: t.campus.facilitiesList[1]?.desc || 'أنفاق هواء مائية متطورة لاختبار النماذج الهندسية والميكانيكية بإشراف هندسي مؤهل.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      specs: t.campus.facilitiesList[1]?.specs || 'أجهزة قياس رقمية · شاشات عرض البيانات الحية',
    },
    {
      title: t.campus.facilitiesList[2]?.title || 'قاعات الهدوء والمعايرة الحسية',
      tag: t.campus.facilitiesList[2]?.tag || 'توازن واستشفاء ذهني',
      description: t.campus.facilitiesList[2]?.desc || 'مساحات مهدئة ومجهزة بأثاث حسي مريح وأنظمة عزل صوتي متطورة لإعادة شحن طاقة التلميذ.',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
      specs: t.campus.facilitiesList[2]?.specs || 'عزل صوتي 15 ديسيبل · إضاءة دافئة بدون إجهاد',
    },
  ];

  const safetyProtocols = [
    {
      title: t.campus.safetyList[0]?.title || 'نقاء الهواء: فلاتر HEPA H14 الطبية',
      desc: t.campus.safetyList[0]?.desc || 'تجديد هواء الحجرات المدرسية بنسبة 100% كل 8 دقائق بمواصفات غرف العمليات الطبية.',
      badge: t.campus.safetyList[0]?.badge || 'تنقية بنسبة 99.995% من الجسيمات الدقيقة',
    },
    {
      title: t.campus.safetyList[1]?.title || 'المياه النقية: فلترة رباعية ومعادلة قلوية',
      desc: t.campus.safetyList[1]?.desc || 'شبكة مياه شرب ومطابخ مفلترة بتقنية التناضح العكسي مع إعادة التمعدن الطبيعي.',
      badge: t.campus.safetyList[1]?.badge || 'مياه قلوية نقية 100%',
    },
    {
      title: t.campus.safetyList[2]?.title || 'حزام الأمان الذكي: حماية غير مرئية',
      desc: t.campus.safetyList[2]?.desc || 'بوابات ذكية غير تداخلية تضمن دخول وخروج التلاميذ بأعلى درجات الانسيابية والأمان.',
      badge: t.campus.safetyList[2]?.badge || 'استجابة وتحكم فوري 24/7',
    },
    {
      title: isRtl ? 'خزينة البيانات السيادية المحلية' : 'Air-Gapped Sovereign Data Vault',
      desc: isRtl
        ? 'بيانات وسجلات التلاميذ الطبية والتربوية محفوظة على خوادم محلية مشفرة ببروتوكولات بنكية داخل مقر المدرسة دون سحابة خارجية.'
        : 'All student biometric, health, and academic records reside on local encrypted servers with zero external telemetry.',
      badge: isRtl ? 'تشفير عالي AES-256' : 'AES-256 Bank Grade',
    },
  ];

  return (
    <section id="campus" className="relative py-28 bg-[#0B0F1A] border-t border-[#C9A24B]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              {t.campus.badge}
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              {t.campus.title} <span className="italic text-[#C9A24B]">{t.campus.titleHighlight}</span>
            </h2>
          </div>

          {/* Sub-section Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-[#C9A24B]/30 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('campus')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'campus'
                  ? 'bg-[#C9A24B] text-[#0B0F1A] font-bold shadow-md'
                  : 'text-[#F8F6F2]/70 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>{t.campus.tabs.facilities}</span>
            </button>

            <button
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'safety'
                  ? 'bg-[#C9A24B] text-[#0B0F1A] font-bold shadow-md'
                  : 'text-[#F8F6F2]/70 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t.campus.tabs.safety}</span>
            </button>

            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'nutrition'
                  ? 'bg-[#C9A24B] text-[#0B0F1A] font-bold shadow-md'
                  : 'text-[#F8F6F2]/70 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>{isRtl ? 'التغذية الحيوية' : 'Biodynamic Nutrition'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Campus Architecture Facilities */}
        {activeTab === 'campus' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {campusFacilities.map((fac, idx) => (
              <TiltCard
                key={idx}
                className="group rounded-3xl glass-panel border border-[#C9A24B]/20 hover:border-[#2FD6C8]/60 p-6 flex flex-col justify-between transition-all duration-500 overflow-hidden"
              >
                <div>
                  <div className="relative h-56 rounded-2xl overflow-hidden mb-6 border border-white/10">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent opacity-80" />
                    <span className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} px-3 py-1 rounded-full bg-[#0B0F1A]/80 backdrop-blur-md border border-[#C9A24B]/40 text-[#C9A24B] text-[10px] font-mono-tech uppercase tracking-wider`}>
                      {fac.tag}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl text-white font-normal mb-3 group-hover:text-[#C9A24B] transition-colors">
                    {fac.title}
                  </h3>

                  <p className="font-sans-ui text-xs sm:text-sm text-[#F8F6F2]/70 leading-relaxed mb-6">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C9A24B]/15 text-[11px] font-mono-tech text-[#2FD6C8]">
                  {fac.specs}
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {/* Tab 2: Bio-Security & Safety Protocols */}
        {activeTab === 'safety' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            {safetyProtocols.map((sec, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-panel border border-[#C9A24B]/20 bg-[#0E1526]/80 flex flex-col justify-between hover:border-[#2FD6C8]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#141B2D] border border-[#C9A24B]/40 flex items-center justify-center text-[#C9A24B]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono-tech px-2.5 py-1 rounded-md bg-[#2FD6C8]/10 text-[#2FD6C8] border border-[#2FD6C8]/30">
                      {sec.badge}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl text-white mb-3">
                    {sec.title}
                  </h3>

                  <p className="font-sans-ui text-sm text-[#F8F6F2]/70 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Chef Abdelkader Mekrani & Mitidja Organic Culinary Ledger */}
        {activeTab === 'nutrition' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-1 rounded-3xl glass-panel border border-[#C9A24B]/30 p-8 bg-[#0E1526]/90 flex flex-col justify-between">
              <div>
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#C9A24B]/40 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"
                    alt="Chef Abdelkader"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-mono-tech text-[#C9A24B] uppercase tracking-wider block mb-1">
                  {isRtl ? 'المشرف على المطبخ البيولوجي' : 'Executive Chef'}
                </span>
                <h3 className="font-editorial text-2xl text-white mb-2">
                  {isRtl ? 'الشيف عبد القادر مقراني' : 'Chef Abdelkader Mekrani'}
                </h3>
                <p className="font-sans-ui text-xs text-[#F8F6F2]/70 leading-relaxed mb-6">
                  {isRtl
                    ? 'خبير التغذية العضوية وتوازن الطاقة الذهنية، يصمم يومياً قوائم وجبات متوازنة تعتمد حصرياً على مزارع متيجة والبويرة، خالية من الزيوت المهدرجة والسكريات المكررة.'
                    : 'Specialist in organic nutrition and cognitive energy, designing fresh seasonal meals sourced exclusively from Mitidja farms.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tech text-[#2FD6C8]">
                {isRtl ? '100% مكونات محلية عضوية معتمدة' : '100% Certified Organic Algerian Produce'}
              </div>
            </div>

            <div className="lg:col-span-2 rounded-3xl glass-panel border border-[#C9A24B]/20 p-8 bg-[#0E1526]/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono-tech uppercase tracking-wider text-[#C9A24B]">
                    {isRtl ? 'عينة من جدول الغذاء اليومي للتلاميذ' : "Sample Student Daily Nutrition Ledger"}
                  </span>
                  <span className="text-xs font-mono-tech text-[#2FD6C8] px-2.5 py-0.5 rounded bg-[#2FD6C8]/10 border border-[#2FD6C8]/30">
                    {isRtl ? 'مؤشر النقاء: 99%' : 'Purity Index: 99%'}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-xs text-[#C9A24B] font-mono-tech mb-1">{isRtl ? 'الطور التحضيري (3–5 سنوات)' : 'Preparatory'}</div>
                    <div className="font-editorial text-base text-white">{isRtl ? 'حساء الخضار العطرية مع كسكسي القمح الكامل وزيت زيتون بوعيرة' : 'Steamed heirloom grain couscous with mountain herbs'}</div>
                    <div className="text-xs text-[#F8F6F2]/60 mt-1">{isRtl ? 'المصدر: مزارع متيجة العضوية · 440 سعرة حرارية · خالٍ من الغلوتين المصنع' : 'Origin: Mitidja Organic Farms · 440 kcal'}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-xs text-[#C9A24B] font-mono-tech mb-1">{isRtl ? 'الطور الابتدائي (6–10 سنوات)' : 'Primary'}</div>
                    <div className="font-editorial text-base text-white">{isRtl ? 'سمك السردين الطازج المشوي مع كينوا وخضار تيبازة الموسمية' : 'Fresh grilled artisanal catch with seasonal Mediterranean salad'}</div>
                    <div className="text-xs text-[#F8F6F2]/60 mt-1">{isRtl ? 'المصدر: صيد بحري حرفي تيبازة · 590 سعرة حرارية · بروتين عالي' : 'Origin: Tipaza Artisanal Fishery · 590 kcal'}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-xs text-[#C9A24B] font-mono-tech mb-1">{isRtl ? 'الطور المتوسط (11–14 سنة)' : 'Middle School'}</div>
                    <div className="font-editorial text-base text-white">{isRtl ? 'فيليه دجاج المزارع الحرة مع خضار جبلية مخبوزة وزعتر الأطلس البليدي' : 'Free-range poultry breast with roasted root vegetables'}</div>
                    <div className="text-xs text-[#F8F6F2]/60 mt-1">{isRtl ? 'المصدر: مزارع الأطلس البليدي المستدامة · 680 سعرة حرارية' : 'Origin: Atlas Blida Sustainable Farms · 680 kcal'}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#C9A24B]/15 text-xs text-[#F8F6F2]/60 font-mono-tech flex items-center justify-between">
                <span>{isRtl ? 'تحقق حساسية أوتوماتيكي لكل تلميذ قبل التقديم' : 'Automated per-student allergen verification'}</span>
                <span className="text-[#C9A24B]">{isRtl ? 'صفر سكريات مكررة' : 'Zero Refined Sugars'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
