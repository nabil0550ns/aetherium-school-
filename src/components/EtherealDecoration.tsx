import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Glyph {
  char: string;
  top: string;
  left: string;
  layer: number; // 1 to 4
  size: string;
  color: string;
}

const glyphs: Glyph[] = [
  // Layer 1 - Deep background (blurred, slow)
  { char: '∫', top: '12%', left: '8%', layer: 1, size: 'text-4xl', color: 'text-[#C9A876]/15' },
  { char: '♫', top: '24%', left: '88%', layer: 1, size: 'text-3xl', color: 'text-[#C9A876]/15' },
  { char: 'Ω', top: '58%', left: '4%', layer: 1, size: 'text-5xl', color: 'text-[#C9A876]/10' },
  { char: '∇', top: '78%', left: '92%', layer: 1, size: 'text-4xl', color: 'text-[#C9A876]/15' },

  // Layer 2 - Mid-deep
  { char: '∑', top: '18%', left: '32%', layer: 2, size: 'text-3xl', color: 'text-[#C9A876]/25' },
  { char: 'H₂O', top: '42%', left: '94%', layer: 2, size: 'text-xl font-mono-tech', color: 'text-[#C9A876]/20' },
  { char: '♩', top: '70%', left: '16%', layer: 2, size: 'text-4xl', color: 'text-[#C9A876]/20' },
  { char: 'Φ', top: '88%', left: '65%', layer: 2, size: 'text-3xl font-editorial', color: 'text-[#C9A876]/25' },

  // Layer 3 - Mid-foreground
  { char: '∞', top: '30%', left: '12%', layer: 3, size: 'text-3xl', color: 'text-[#C9A876]/30' },
  { char: 'π', top: '38%', left: '82%', layer: 3, size: 'text-4xl', color: 'text-[#C9A876]/30' },
  { char: 'C₆H₁₂O₆', top: '64%', left: '42%', layer: 3, size: 'text-xs font-mono-tech tracking-widest', color: 'text-[#C9A876]/25' },
  { char: '∆', top: '82%', left: '28%', layer: 3, size: 'text-2xl', color: 'text-[#C9A876]/30' },

  // Layer 4 - Foreground subtle accents
  { char: 'λ', top: '15%', left: '74%', layer: 4, size: 'text-2xl font-editorial', color: 'text-[#C9A876]/40' },
  { char: '♪', top: '50%', left: '22%', layer: 4, size: 'text-2xl', color: 'text-[#C9A876]/35' },
  { char: 'Ψ', top: '74%', left: '80%', layer: 4, size: 'text-3xl font-editorial', color: 'text-[#C9A876]/40' },
  { char: '√', top: '92%', left: '10%', layer: 4, size: 'text-2xl', color: 'text-[#C9A876]/35' },
];

export const EtherealDecoration: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.ethereal-glyph');
    const animations: gsap.core.Tween[] = [];

    items.forEach((item, i) => {
      const layer = parseInt(item.getAttribute('data-layer') || '1', 10);
      const duration = 7 + layer * 2 + (i % 3);
      const yOffset = 15 + layer * 6;
      const rot = (i % 2 === 0 ? 1 : -1) * (8 + layer * 4);

      const tween = gsap.to(item, {
        y: `+=${yOffset}`,
        x: (i % 3 === 0 ? '+=10' : '-=10'),
        rotation: `+=${rot}`,
        duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: (i * 0.4) % 3,
      });
      animations.push(tween);
    });

    return () => {
      animations.forEach((a) => a.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      aria-hidden="true"
    >
      {glyphs.map((g, idx) => {
        const zTranslate = (g.layer - 2.5) * 45; // layer 1: -67px, layer 4: +67px
        return (
          <div
            key={idx}
            data-layer={g.layer}
            className={`ethereal-glyph absolute ${g.size} ${g.color} transition-opacity duration-1000 will-change-transform`}
            style={{
              top: g.top,
              left: g.left,
              transform: `translateZ(${zTranslate}px)`,
              filter: g.layer === 1 ? 'blur(1.5px)' : 'none',
            }}
          >
            {g.char}
          </div>
        );
      })}
    </div>
  );
};
