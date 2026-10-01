import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { useLanguage } from '../context/LanguageContext';

export const Philosophy: React.FC = () => {
  const { t, isRtl } = useLanguage();

  const tenets = [
    {
      icon: HeartHandshake,
      title: t.about.pillar1.title,
      tag: t.about.pillar1.tag,
      description: t.about.pillar1.desc,
      stat: t.about.pillar1.stat,
      statLabel: t.about.pillar1.statLabel,
      accent: '#C9A24B',
    },
    {
      icon: ShieldCheck,
      title: t.about.pillar2.title,
      tag: t.about.pillar2.tag,
      description: t.about.pillar2.desc,
      stat: t.about.pillar2.stat,
      statLabel: t.about.pillar2.statLabel,
      accent: '#2FD6C8',
    },
    {
      icon: Eye,
      title: t.about.pillar3.title,
      tag: t.about.pillar3.tag,
      description: t.about.pillar3.desc,
      stat: t.about.pillar3.stat,
      statLabel: t.about.pillar3.statLabel,
      accent: '#C9A24B',
    },
  ];

  return (
    <section id="philosophy" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A24B]/15 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C9A24B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            {t.about.badge}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6">
            {t.about.title} <span className="italic text-[#C9A24B]">{t.about.titleHighlight}</span>
          </h2>
          <p className="font-sans-ui text-[#F8F6F2]/75 text-base sm:text-lg leading-relaxed">
            {t.about.description}
          </p>
        </div>

        {/* The 3 Core Tenets Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tenets.map((tenet, idx) => {
            const Icon = tenet.icon;
            return (
              <TiltCard
                key={idx}
                className="group rounded-3xl glass-panel border border-[#C9A24B]/20 hover:border-[#2FD6C8]/60 p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 overflow-hidden relative"
              >
                {/* Decorative Andalusian subtle watermark */}
                <div
                  className={`absolute -bottom-8 ${
                    isRtl ? '-left-8' : '-right-8'
                  } w-36 h-36 border border-[#C9A24B]/10 rounded-full group-hover:scale-125 transition-transform duration-700 pointer-events-none`}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md transition-all duration-300"
                      style={{
                        backgroundColor: '#141B2D',
                        borderColor: `${tenet.accent}60`,
                        color: tenet.accent,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-mono-tech uppercase tracking-wider text-[#C9A24B]/80 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                      {tenet.tag}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal mb-4 group-hover:text-[#C9A24B] transition-colors">
                    {tenet.title}
                  </h3>

                  <p className="font-sans-ui text-sm text-[#F8F6F2]/70 leading-relaxed mb-8">
                    {tenet.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#C9A24B]/15 flex items-baseline justify-between">
                  <span className="font-editorial text-2xl font-bold text-[#2FD6C8]">
                    {tenet.stat}
                  </span>
                  <span className="text-[11px] font-mono-tech text-[#F8F6F2]/50 tracking-wider">
                    {tenet.statLabel}
                  </span>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Andalus Promise Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#141B2D]/80 via-[#0E1526]/90 to-[#141B2D]/80 border border-[#C9A24B]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-start">
            <div className="w-12 h-12 rounded-xl bg-[#C9A24B]/10 border border-[#C9A24B]/40 flex items-center justify-center shrink-0 text-[#C9A24B]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="font-editorial text-lg text-white font-medium">
                {t.about.promise}
              </p>
              <p className="text-xs text-[#C9A24B] font-mono-tech mt-1">
                {t.ageSpan}
              </p>
            </div>
          </div>
          <div className="shrink-0 px-4 py-2 rounded-xl bg-[#C9A24B]/10 border border-[#C9A24B]/30 text-xs font-mono-tech text-[#C9A24B] tracking-wider whitespace-nowrap">
            {t.noSecondaryBadge}
          </div>
        </div>
      </div>
    </section>
  );
};
