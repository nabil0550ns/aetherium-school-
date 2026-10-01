import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Clock, Award, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const PillarsDiorama = () => {
  const { t, isRtl } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const pillarsList = [
    {
      id: 'preparatory',
      name: t.pillars.stages.prep.name,
      ageRange: t.pillars.stages.prep.age,
      tagline: t.pillars.stages.prep.tagline,
      themeColor: '#C9A24B',
      description: t.pillars.stages.prep.desc,
      quote: t.pillars.stages.prep.quote,
      lead: t.pillars.stages.prep.lead,
      steps: t.pillars.stages.prep.steps,
    },
    {
      id: 'primary',
      name: t.pillars.stages.primary.name,
      ageRange: t.pillars.stages.primary.age,
      tagline: t.pillars.stages.primary.tagline,
      themeColor: '#2FD6C8',
      description: t.pillars.stages.primary.desc,
      quote: t.pillars.stages.primary.quote,
      lead: t.pillars.stages.primary.lead,
      steps: t.pillars.stages.primary.steps,
    },
    {
      id: 'middle',
      name: t.pillars.stages.middle.name,
      ageRange: t.pillars.stages.middle.age,
      tagline: t.pillars.stages.middle.tagline,
      themeColor: '#E2C275',
      description: t.pillars.stages.middle.desc,
      quote: t.pillars.stages.middle.quote,
      lead: t.pillars.stages.middle.lead,
      steps: t.pillars.stages.middle.steps,
    },
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isMobile && !prefersReducedMotion && containerRef.current && trackRef.current) {
      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth + 120;
      const xDistance = isRtl ? totalWidth : -totalWidth;

      const tween = gsap.to(track, {
        x: xDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth * 1.1}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    }
  }, [isRtl]);

  const handleSelectTab = (index: number) => {
    setActivePillarIndex(index);
    if (trackRef.current) {
      const cards = trackRef.current.children;
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <section
      id="pillars"
      ref={containerRef}
      className="relative bg-[#0B0F1A] border-t border-[#C9A24B]/15 overflow-hidden min-h-screen py-24"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#2FD6C8]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header & Pillar Selector Switcher */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              {t.pillars.badge}
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              {t.pillars.title} <span className="italic text-[#C9A24B]">{t.pillars.titleHighlight}</span>
            </h2>
          </div>

          {/* Quick Pillar Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-[#C9A24B]/30 self-start md:self-auto overflow-x-auto max-w-full">
            {pillarsList.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleSelectTab(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                  activePillarIndex === idx
                    ? 'bg-[#C9A24B] text-[#0B0F1A] font-bold shadow-md'
                    : 'text-[#F8F6F2]/70 hover:text-white'
                }`}
              >
                {p.name} ({p.ageRange})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontally Pin-Scrolled Diorama Track */}
      <div className="relative w-full overflow-x-auto lg:overflow-visible no-scrollbar">
        <div
          ref={trackRef}
          className="flex gap-10 px-6 lg:px-16 w-max items-stretch pb-10"
        >
          {pillarsList.map((pillar, pIdx) => (
            <div
              key={pillar.id}
              className={`w-[85vw] max-w-[720px] rounded-3xl glass-panel border p-8 sm:p-12 flex flex-col justify-between shrink-0 transition-all duration-500 relative overflow-hidden ${
                activePillarIndex === pIdx
                  ? 'border-[#C9A24B] shadow-[0_15px_40px_rgba(201,162,75,0.15)]'
                  : 'border-[#C9A24B]/20'
              }`}
              style={{
                backgroundColor: 'rgba(14, 21, 38, 0.85)',
              }}
            >
              {/* Subtle top indicator bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: pillar.themeColor }}
              />

              <div>
                {/* Pillar Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span
                        className="text-xs font-mono-tech uppercase tracking-widest px-2.5 py-0.5 rounded border"
                        style={{
                          color: pillar.themeColor,
                          borderColor: `${pillar.themeColor}50`,
                          backgroundColor: `${pillar.themeColor}10`,
                        }}
                      >
                        {pillar.ageRange}
                      </span>
                      <span className="text-xs font-mono-tech text-[#F8F6F2]/50">
                        {pillar.tagline}
                      </span>
                    </div>
                    <h3 className="font-editorial text-2xl sm:text-4xl text-white font-normal">
                      {pillar.name}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6" style={{ color: pillar.themeColor }} />
                  </div>
                </div>

                <p className="font-sans-ui text-sm sm:text-base text-[#F8F6F2]/75 leading-relaxed mb-8">
                  {pillar.description}
                </p>

                {/* Day Progression Steps */}
                <div className="space-y-4 mb-8">
                  <div className="text-xs font-mono-tech uppercase tracking-wider text-[#C9A24B] flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>محطات اليوم الدراسي الميداني</span>
                  </div>

                  {pillar.steps.map((st, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A24B]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-mono-tech mb-1.5">
                        <span className="text-[#C9A24B] font-semibold">{st.time}</span>
                      </div>
                      <h4 className="font-editorial text-base text-white mb-1">
                        {st.title}
                      </h4>
                      <p className="font-sans-ui text-xs text-[#F8F6F2]/65 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone Quote & Lead */}
              <div className="pt-6 border-t border-[#C9A24B]/15 flex flex-col gap-3">
                <blockquote className="font-sans-ui text-xs sm:text-sm text-[#F8F6F2]/80 italic leading-relaxed">
                  {pillar.quote}
                </blockquote>
                <div className="flex items-center justify-between text-xs font-mono-tech text-[#C9A24B]">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    {pillar.lead}
                  </span>
                  <span className="text-[11px] text-[#F8F6F2]/40">الدفعة معتمدة وزارياً</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
