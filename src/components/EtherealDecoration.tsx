import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Glyph {
  type: 'char' | 'star' | 'arch';
  char?: string;
  top: string;
  left: string;
  layer: number; // 1 to 4
  size: string;
  color: string;
}

const itemsData: Glyph[] = [
  // Layer 1 - Deep background (blurred, slow)
  { type: 'char', char: 'أ', top: '10%', left: '7%', layer: 1, size: 'text-5xl font-editorial', color: 'text-[#C9A24B]/15' },
  { type: 'star', top: '22%', left: '88%', layer: 1, size: 'w-16 h-16', color: 'text-[#C9A24B]/10' },
  { type: 'char', char: '∫', top: '56%', left: '4%', layer: 1, size: 'text-4xl', color: 'text-[#C9A24B]/10' },
  { type: 'star', top: '78%', left: '92%', layer: 1, size: 'w-20 h-20', color: 'text-[#C9A24B]/12' },

  // Layer 2 - Mid-deep
  { type: 'char', char: 'ض', top: '16%', left: '30%', layer: 2, size: 'text-3xl font-editorial', color: 'text-[#C9A24B]/20' },
  { type: 'arch', top: '38%', left: '92%', layer: 2, size: 'w-12 h-16', color: 'text-[#2FD6C8]/15' },
  { type: 'char', char: '∑', top: '68%', left: '14%', layer: 2, size: 'text-3xl', color: 'text-[#C9A24B]/20' },
  { type: 'char', char: 'Φ', top: '86%', left: '68%', layer: 2, size: 'text-3xl font-editorial', color: 'text-[#C9A24B]/20' },

  // Layer 3 - Mid-foreground
  { type: 'star', top: '28%', left: '12%', layer: 3, size: 'w-12 h-12', color: 'text-[#C9A24B]/25' },
  { type: 'char', char: '∞', top: '36%', left: '80%', layer: 3, size: 'text-3xl', color: 'text-[#2FD6C8]/25' },
  { type: 'char', char: 'ق', top: '62%', left: '40%', layer: 3, size: 'text-2xl font-editorial', color: 'text-[#C9A24B]/25' },
  { type: 'char', char: 'π', top: '80%', left: '26%', layer: 3, size: 'text-3xl', color: 'text-[#C9A24B]/25' },

  // Layer 4 - Foreground subtle accents
  { type: 'arch', top: '14%', left: '76%', layer: 4, size: 'w-10 h-14', color: 'text-[#C9A24B]/35' },
  { type: 'char', char: 'ع', top: '48%', left: '20%', layer: 4, size: 'text-2xl font-editorial', color: 'text-[#C9A24B]/35' },
  { type: 'star', top: '72%', left: '82%', layer: 4, size: 'w-8 h-8', color: 'text-[#2FD6C8]/30' },
  { type: 'char', char: 'λ', top: '90%', left: '12%', layer: 4, size: 'text-2xl font-editorial', color: 'text-[#C9A24B]/30' },
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
      const yOffset = 14 + layer * 5;
      const rot = (i % 2 === 0 ? 1 : -1) * (6 + layer * 3);

      const tween = gsap.to(item, {
        y: `+=${yOffset}`,
        x: i % 3 === 0 ? '+=8' : '-=8',
        rotation: `+=${rot}`,
        duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: (i * 0.3) % 2.5,
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
      {itemsData.map((g, idx) => {
        const zTranslate = (g.layer - 2.5) * 40;
        return (
          <div
            key={idx}
            data-layer={g.layer}
            className={`ethereal-glyph absolute ${g.color} transition-opacity duration-1000 will-change-transform flex items-center justify-center`}
            style={{
              top: g.top,
              left: g.left,
              transform: `translateZ(${zTranslate}px)`,
              filter: g.layer === 1 ? 'blur(1px)' : 'none',
            }}
          >
            {g.type === 'char' && <span className={g.size}>{g.char}</span>}
            {g.type === 'star' && (
              <svg viewBox="0 0 100 100" className={g.size} fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Abstracted Andalusian 8-point geometric star */}
                <rect x="25" y="25" width="50" height="50" transform="rotate(0 50 50)" />
                <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" strokeOpacity="0.8" />
                <circle cx="50" cy="50" r="14" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            )}
            {g.type === 'arch' && (
              <svg viewBox="0 0 60 80" className={g.size} fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Abstracted Moorish Horseshoe Arch */}
                <path d="M 10 80 L 10 40 C 10 20 20 10 30 10 C 40 10 50 20 50 40 L 50 80" />
                <path d="M 18 80 L 18 42 C 18 26 24 18 30 18 C 36 18 42 26 42 42 L 42 80" strokeOpacity="0.5" strokeDasharray="2 2" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};
