import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { mockFaqs } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

export const FaqSection = () => {
  const { isRtl } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(mockFaqs[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A24B]/15 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#C9A24B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#C9A24B]" />
            {isRtl ? 'إجابات واضحة وشفافة' : 'Frequently Answered Questions'}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-normal tracking-tight mb-4">
            {isRtl ? (
              <>الأسئلة <span className="italic text-[#C9A24B]">الشائعة</span></>
            ) : (
              <>Everything Parents <span className="italic text-[#C9A24B]">Ask</span></>
            )}
          </h2>
          <p className="font-sans-ui text-[#F8F6F2]/75 text-sm sm:text-base leading-relaxed">
            {isRtl
              ? 'إجابات دقيقة حول نظام مدرسة الأندلس، اعتمادنا الوزاري، حصرية الأطوار الثلاثة، ومنهجيتنا في رعاية أبنائكم.'
              : 'Detailed clarification regarding our pedagogical standards, ministerial compliance, and 3–14 perimeter.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {mockFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#141B2D] border-[#C9A24B]/60 shadow-[0_8px_25px_rgba(201,162,75,0.12)]'
                    : 'bg-[#0E1526]/70 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-start flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded bg-[#C9A24B]/10 text-[#C9A24B] border border-[#C9A24B]/30 shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="font-editorial text-lg sm:text-xl text-white font-medium">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`p-1.5 rounded-full bg-white/5 border border-white/10 text-[#C9A24B] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#2FD6C8]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm font-sans-ui text-[#F8F6F2]/80 leading-relaxed border-t border-white/5 animate-in fade-in duration-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-12 text-center text-xs font-mono-tech text-[#F8F6F2]/60">
          <span>{isRtl ? 'هل لديكم سؤال خاص لم تجدوا إجابته هنا؟' : 'Have a specialized inquiry?'} </span>
          <a href="#contact" className="text-[#C9A24B] hover:underline font-bold">
            {isRtl ? 'تواصلوا مباشرة مع الإدارة البيداغوجية' : 'Contact our admissions directorate'}
          </a>
        </div>
      </div>
    </section>
  );
};
