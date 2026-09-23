import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Shield, Sparkles, Lock } from 'lucide-react';
import { ThresholdCanvas } from './ThresholdCanvas';

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
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Kinetic typography blur-to-sharp focus-pull effect
    const headline = headlineRef.current;
    if (!headline) return;

    const chars = headline.querySelectorAll('.kinetic-char');
    
    const tl = gsap.timeline({ delay: 0.6 });

    // Badge entrance
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
      );
    }

    // Character-by-character focus-pull reveal
    tl.fromTo(
      chars,
      {
        opacity: 0,
        y: 40,
        filter: 'blur(16px)',
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.4,
        stagger: 0.028,
        ease: 'power4.inOut',
      },
      '-=0.8'
    );

    // Subtext & CTAs
    if (subtextRef.current && ctaGroupRef.current && telemetryRef.current) {
      tl.fromTo(
        [subtextRef.current, ctaGroupRef.current, telemetryRef.current],
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.2, ease: 'power3.out' },
        '-=0.6'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const headlineText = "The Sanctuary Where Curiosity Becomes Destiny";

  return (
    <section
      ref={heroContainerRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0B0F1A]"
    >
      {/* Volumetric Light-Shafts & God Rays */}
      <div className="absolute inset-0 god-rays pointer-events-none z-[1]" />

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none z-[2] mix-blend-overlay opacity-30" />

      {/* Three.js Particle WebGL System */}
      <div className="absolute inset-0 w-full h-full z-[3]">
        <ThresholdCanvas
          scrollTriggerElement={heroContainerRef.current}
          onPortalSelect={(_p) => onExplorePillars()}
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-36 pb-16 flex-1 flex flex-col justify-center items-center text-center">
        {/* Institutional Prestige Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-[#C9A876]/40 mb-6 backdrop-blur-xl"
        >
          <span className="w-2 h-2 rounded-full bg-[#C9A876] animate-pulse" />
          <span className="text-xs font-mono-tech uppercase tracking-[0.22em] text-[#C9A876]">
            Exclusive Preparatory · Primary · Middle School (Ages 3–14)
          </span>
          <span className="text-[#C9A876]/40">|</span>
          <span className="text-xs text-[#F7F5F1]/80 font-sans-ui flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#C9A876]" /> Zero High School Disruption
          </span>
        </div>

        {/* Focus-Pull Kinetic Typography Headline */}
        <h1
          ref={headlineRef}
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white max-w-5xl leading-[1.08] mb-6 select-none"
        >
          {headlineText.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap mr-3 sm:mr-4">
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="kinetic-char inline-block will-change-transform"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Emotionally Paced Microcopy */}
        <p
          ref={subtextRef}
          className="font-sans-ui text-base sm:text-xl text-[#F7F5F1]/80 max-w-2xl leading-relaxed mb-10 font-normal"
        >
          An architected haven of cognitive acceleration and deep biological safety.
          <br className="hidden sm:inline" />
          <span className="italic font-editorial text-[#C9A876] font-medium">
            {" \"Where every meal, every milestone, every moment — is seen.\""}
          </span>
        </p>

        {/* Conversion & Action CTAs */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          {/* Primary CTA (Benefit-Framed) */}
          <button
            onClick={onOpenTourModal}
            className="w-full sm:w-auto group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A876] via-[#dfc79b] to-[#C9A876] text-[#0B0F1A] font-semibold text-sm tracking-wide shadow-[0_10px_30px_rgba(201,168,118,0.3)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(77,225,255,0.4)] hover:scale-[1.03] active:scale-[0.98] cognition-interactive overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0B0F1A]" />
              Begin Their Story · Reserve Private Tour
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </button>

          {/* Secondary Exploratory CTA */}
          <button
            onClick={onExplorePillars}
            className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel text-white font-medium text-sm border border-[#C9A876]/40 hover:border-[#4DE1FF] transition-all duration-300 hover:bg-white/[0.08] cognition-interactive flex items-center justify-center gap-2"
          >
            Explore The Three Pillars (3–14)
          </button>

          {/* Direct Sanctum Gateway CTA */}
          <button
            onClick={onOpenSanctum}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#141B2D]/80 border border-[#C9A876]/30 text-xs font-mono-tech tracking-wider text-[#C9A876] hover:text-[#4DE1FF] hover:border-[#4DE1FF] transition-all duration-300 cognition-interactive flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            Enter Sanctum
          </button>
        </div>

        {/* Real-time Sanctuary Telemetry Banner */}
        <div
          ref={telemetryRef}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full border-t border-[#C9A876]/15 pt-8 text-left"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-editorial text-white font-medium">1 : 6</div>
            <div className="text-xs text-[#F7F5F1]/60 font-sans-ui mt-0.5">Faculty-to-Child Ratio</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-editorial text-white font-medium">100%</div>
            <div className="text-xs text-[#F7F5F1]/60 font-sans-ui mt-0.5">HEPA H14 Air Purity</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-editorial text-[#C9A876] font-medium">Ages 3–14</div>
            <div className="text-xs text-[#F7F5F1]/60 font-sans-ui mt-0.5">Prep · Primary · Middle</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-editorial text-white font-medium">SHA-256</div>
            <div className="text-xs text-[#F7F5F1]/60 font-sans-ui mt-0.5">Encrypted Parent Portal</div>
          </div>
        </div>
      </div>

      {/* Scroll Down Visual Indicator */}
      <div className="relative z-10 w-full pb-8 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[11px] font-mono-tech tracking-[0.25em] text-[#C9A876]/70 uppercase mb-2">
          Scroll to unbind neural threshold
        </span>
        <ArrowDown className="w-4 h-4 text-[#C9A876] animate-bounce" />
      </div>
    </section>
  );
};
