import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const MagneticCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3.out' });
    const ringXTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const ringYTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    let isHoveringInteractive = false;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xTo(clientX);
      yTo(clientY);
      ringXTo(clientX);
      ringYTo(clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, input, select, textarea, [data-interactive="true"]');
      if (interactive && !isHoveringInteractive) {
        isHoveringInteractive = true;
        gsap.to(ring, {
          scale: 2.2,
          borderColor: '#4DE1FF',
          backgroundColor: 'rgba(77, 225, 255, 0.08)',
          boxShadow: '0 0 20px rgba(77, 225, 255, 0.4)',
          duration: 0.3,
        });
        gsap.to(cursor, {
          scale: 0.4,
          backgroundColor: '#4DE1FF',
          duration: 0.2,
        });
      } else if (!interactive && isHoveringInteractive) {
        isHoveringInteractive = false;
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(201, 168, 118, 0.4)',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          duration: 0.3,
        });
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: '#C9A876',
          duration: 0.2,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#C9A876] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-[#C9A876]/40 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9998] transition-colors hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
