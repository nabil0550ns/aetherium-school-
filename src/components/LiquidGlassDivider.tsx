import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LiquidGlassDividerProps {
  inverted?: boolean;
}

export const LiquidGlassDivider: React.FC<LiquidGlassDividerProps> = ({ inverted = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const path = pathRef.current;
    if (!path) return;

    // Subtle breathing wave morph
    const tween = gsap.to(path, {
      attr: {
        d: inverted
          ? 'M 0 40 Q 300 0, 600 40 T 1200 40 L 1200 0 L 0 0 Z'
          : 'M 0 0 Q 300 40, 600 0 T 1200 0 L 1200 40 L 0 40 Z',
      },
      duration: 6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [inverted]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden leading-none pointer-events-none z-10 ${
        inverted ? '-mb-1' : '-mt-1'
      }`}
      style={{ filter: 'url(#liquid-glass-morph)' }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-12 sm:h-16 text-[#0B0F1A]"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={
            inverted
              ? 'M 0 20 Q 300 40, 600 20 T 1200 20 L 1200 0 L 0 0 Z'
              : 'M 0 20 Q 300 0, 600 20 T 1200 20 L 1200 40 L 0 40 Z'
          }
          fill="currentColor"
          className="transition-all duration-1000"
        />
      </svg>
    </div>
  );
};
