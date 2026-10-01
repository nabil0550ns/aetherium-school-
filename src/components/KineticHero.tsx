import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Shield, Sparkles, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { ThresholdCanvas } from './ThresholdCanvas';
import { useLanguage } from '../context/LanguageContext';

interface KineticHeroProps {
  onExplorePillars: () => void;
  onOpenTourModal: () => void;
  onOpenSanctum: () => void;
}

export const KineticHero: React.FC<KineticHeroProps> = ({
  onExplorePillars,
  onOpenTourModal,
  onOpenSanctum,
}) => {
  const { t, isRtl } = useLanguage();
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const words = headline.querySelectorAll('.kinetic-word');
    const tl = gsap.timeline({ delay: 0.5 });

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' }
      );
    }

    // Word-chunk reveal preserving Arabic ligatures
    tl.fromTo(
      words,
      {
        opacity: 0,
        y: 35,
        filter: 'blur(14px)',
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out',
      },
      '-=0.6'
    );

    if (subtextRef.current && ctaGroupRef.current && telemetryRef.current) {
      tl.fromTo(
        [subtextRef.current, ctaGroupRef.current, telemetryRef.current],
        { opacity: 0, y: 25, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, stagger: 0.18, ease: 'power3.out' },
        '-=0.5'
      );
    }

    return () => {
      tl.kill();
    };
  }, [t]);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={heroContainerRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0B1526]"
    >
      {/* Volumetric God-Rays */}
      <div className="absolute inset-0 god-rays pointer-events-none z-[1]" />

      {/* Andalusian Geometric Vector Linework Texture */}
      <div className="absolute inset-0 bg-zellige-pattern pointer-events-none z-[2] opacity-40" />

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-[2] mix-blend-overlay opacity-30" />

      {/* WebGL Particle Scene */}
      <div className="absolute inset-0 w-full h-full z-[3]">
        <ThresholdCanvas
          scrollTriggerElement={heroContainerRef.current}
          onPortalSelect={(_p) => onExplorePillars()}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-36 pb-16 flex-1 flex flex-col justify-center items-center text-center">
        {/* Prestige Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-[#C9A24B]/40 mb-6 backdrop-blur-xl"
        >
          <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse" />
          <span className="text-xs tracking-wider text-[#C9A24B] font-bold">
            {t.hero.badge}
          </span>
          <span className="text-[#C9A24B]/40">|</span>
          <span className="text-xs text-[#F8F6F2]/85 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#C9A24B]" /> {t.noSecondaryBadge}
          </span>
        </div>

        {/* Word-chunk Kinetic Typography Reveal */}
        <h1
          ref={headlineRef}
          className="font-arabic-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white max-w-5xl leading-[1.25] mb-6 select-none"
        >
          <span className="kinetic-word inline-block mr-2 ml-2 text-white">
            {t.hero.headlinePart1}
          </span>
          <span className="kinetic-word inline-block text-[#C9A24B] italic">
            {t.hero.headlinePart2}
          </span>
        </h1>

        {/* Supporting Microcopy */}
        <p
          ref={subtextRef}
          className="text-base sm:text-xl text-[#F8F6F2]/85 max-w-2xl leading-relaxed mb-10 font-arabic-body"
        >
          {t.hero.subtext}
          <br className="hidden sm:inline" />
          <span className="text-[#C9A24B] font-semibold block sm:inline mt-2 sm:mt-0">
            {' '}{t.hero.quote}
          </span>
        </p>

        {/* Action CTAs */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={onOpenTourModal}
            className="w-full sm:w-auto group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A24B] via-[#E2C275] to-[#C9A24B] text-[#0B1526] font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(201,162,75,0.3)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(47,214,200,0.4)] hover:scale-[1.03] active:scale-[0.98] cognition-interactive overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0B1526]" />
              {t.hero.primaryCta}
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </button>

          <button
            onClick={onExplorePillars}
            className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel text-white font-medium text-sm border border-[#C9A24B]/40 hover:border-[#2FD6C8] transition-all duration-300 hover:bg-white/[0.08] cognition-interactive flex items-center justify-center gap-2"
          >
            <span>{t.hero.secondaryCta}</span>
            <ArrowIcon className="w-4 h-4 text-[#C9A24B]" />
          </button>

          <button
            onClick={onOpenSanctum}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#14243D]/80 border border-[#C9A24B]/30 text-xs tracking-wider text-[#C9A24B] hover:text-[#2FD6C8] hover:border-[#2FD6C8] transition-all duration-300 cognition-interactive flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            {t.hero.portalCta}
          </button>
        </div>

        {/* Live Institutional Telemetry */}
        <div
          ref={telemetryRef}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full border-t border-[#C9A24B]/20 pt-8"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{t.hero.stats.ratio}</div>
            <div className="text-xs text-[#F8F6F2]/65 mt-0.5">{t.hero.stats.ratioLabel}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{t.hero.stats.air}</div>
            <div className="text-xs text-[#F8F6F2]/65 mt-0.5">{t.hero.stats.airLabel}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#C9A24B]">{t.hero.stats.ages}</div>
            <div className="text-xs text-[#F8F6F2]/65 mt-0.5">{t.hero.stats.agesLabel}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{t.hero.stats.security}</div>
            <div className="text-xs text-[#F8F6F2]/65 mt-0.5">{t.hero.stats.securityLabel}</div>
          </div>
        </div>
      </div>

      {/* Scroll Down Visual Indicator */}
      <div className="relative z-10 w-full pb-8 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[11px] tracking-widest text-[#C9A24B]/80 uppercase mb-2">
          {t.hero.scrollPrompt}
        </span>
        <ArrowDown className="w-4 h-4 text-[#C9A24B] animate-bounce" />
      </div>
    </section>
  );
};
