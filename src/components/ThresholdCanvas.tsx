import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ThresholdCanvasProps {
  onPortalSelect?: (pillar: 'preparatory' | 'primary' | 'middle') => void;
  scrollTriggerElement?: HTMLElement | null;
}

export const ThresholdCanvas: React.FC<ThresholdCanvasProps> = ({
  onPortalSelect,
  scrollTriggerElement,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePortalHover, setActivePortalHover] = useState<'preparatory' | 'primary' | 'middle' | null>(null);
  const [scrollMorphVal, setScrollMorphVal] = useState<number>(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check device / reduced motion
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = isMobile ? 1800 : 4200;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0B0F1A, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Geometry Buffers
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const chaosPositions = new Float32Array(particleCount * 3);
    const monogramPositions = new Float32Array(particleCount * 3);
    const portalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const goldColor = new THREE.Color(0xC9A876);
    const porcelainColor = new THREE.Color(0xF7F5F1);
    const cognitionColor = new THREE.Color(0x4DE1FF);

    // Generate Chaos positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 25 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      chaosPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      chaosPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      chaosPositions[i3 + 2] = radius * Math.cos(phi);

      // Start initially at chaos
      positions[i3] = chaosPositions[i3];
      positions[i3 + 1] = chaosPositions[i3 + 1];
      positions[i3 + 2] = chaosPositions[i3 + 2];

      // Default colors: blend of gold and porcelain with occasional cognition spark
      const r = Math.random();
      const col = r > 0.85 ? cognitionColor : r > 0.35 ? goldColor : porcelainColor;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i] = 1.2 + Math.random() * 2.2;
    }

    // Generate Aetherium Monogram (Stylized AA Crest with Sacred Chevron)
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const p = i / particleCount;

      let x = 0;
      let y = 0;
      let z = (Math.random() - 0.5) * 1.5;

      if (p < 0.28) {
        // Outer Left Pillar of 'A'
        const t = p / 0.28;
        x = -4.5 + t * 4.5;
        y = -5.0 + t * 9.5;
      } else if (p < 0.56) {
        // Outer Right Pillar of 'A'
        const t = (p - 0.28) / 0.28;
        x = 0.0 + t * 4.5;
        y = 4.5 - t * 9.5;
      } else if (p < 0.72) {
        // Central Transverse Crossbar of 'A'
        const t = (p - 0.56) / 0.16;
        x = -2.5 + t * 5.0;
        y = -0.5 + (Math.random() - 0.5) * 0.4;
      } else if (p < 0.88) {
        // Inner Ascending Crest (Sanctuary Crown)
        const t = (p - 0.72) / 0.16;
        const angle = t * Math.PI * 2;
        const rad = 2.2 + (Math.random() - 0.5) * 0.6;
        x = Math.cos(angle) * rad;
        y = 1.0 + Math.sin(angle) * rad;
      } else {
        // Core Neural Nexus Center
        const rad = Math.random() * 1.8;
        const ang = Math.random() * Math.PI * 2;
        x = Math.cos(ang) * rad;
        y = Math.sin(ang) * rad;
        z = (Math.random() - 0.5) * 2.5;
      }

      // Add gentle jitter for organic neural feel
      monogramPositions[i3] = x + (Math.random() - 0.5) * 0.35;
      monogramPositions[i3 + 1] = y + (Math.random() - 0.5) * 0.35;
      monogramPositions[i3 + 2] = z;
    }

    // Generate 3 Floating Portals (Preparatory: Left, Primary: Center, Middle: Right)
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const portalIndex = i % 3; // 0: Prep, 1: Primary, 2: Middle
      let cx = 0;
      let cy = 0;
      let cz = 0;

      if (portalIndex === 0) {
        // Preparatory Portal (Ages 3-5): Warm, organic ring
        cx = -8.5;
        cy = -0.5;
        cz = 0;
      } else if (portalIndex === 1) {
        // Primary Portal (Ages 6-10): Elevated, vibrant sphere
        cx = 0;
        cy = 2.2;
        cz = 1.5;
      } else {
        // Middle School Portal (Ages 11-14): Socratic, crystalline torus
        cx = 8.5;
        cy = -0.5;
        cz = 0;
      }

      // Shell distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.8 + Math.random() * 0.8;

      const px = r * Math.sin(phi) * Math.cos(theta);
      const py = r * Math.sin(phi) * Math.sin(theta);
      const pz = r * Math.cos(phi);

      portalPositions[i3] = cx + px;
      portalPositions[i3 + 1] = cy + py;
      portalPositions[i3 + 2] = cz + pz;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // 3. Custom Circular Glow Texture
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(201, 168, 118, 0.85)');
      grad.addColorStop(0.65, 'rgba(77, 225, 255, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 0.22,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 4. Volumetric Light Accent
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 5. Animation State
    const state = {
      assemble: 0, // 0 (chaos) -> 1 (monogram)
      morph: 0,    // 0 (monogram) -> 1 (3 portals)
      pointerX: 0,
      pointerY: 0,
      targetPointerX: 0,
      targetPointerY: 0,
    };

    // Animate Assembly from chaos to monogram on load
    gsap.to(state, {
      assemble: 1,
      duration: 2.6,
      ease: 'power4.out',
      delay: 0.2,
    });

    // 6. ScrollTrigger Integration (Pin Hero & Scrub Morph)
    let scrollTriggerInstance: ScrollTrigger | null = null;
    if (scrollTriggerElement && !prefersReducedMotion) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: scrollTriggerElement,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          state.morph = self.progress;
          setScrollMorphVal(self.progress);
        },
      });
    }

    // 7. Cursor Reactive Raycaster-lite Vector Field
    const handlePointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      state.targetPointerX = x * 7;
      state.targetPointerY = y * 5;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // 8. Render Loop (60 FPS Hand-rolled)
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Damped pointer follow
      state.pointerX += (state.targetPointerX - state.pointerX) * 0.06;
      state.pointerY += (state.targetPointerY - state.pointerY) * 0.06;

      const currentPos = geometry.attributes.position.array as Float32Array;
      const a = state.assemble;
      const m = state.morph;

      // Rotate whole system gently
      particleSystem.rotation.y = elapsedTime * 0.04 + state.pointerX * 0.04;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.08) * 0.04 - state.pointerY * 0.03;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Base target between chaos and monogram
        const cX = chaosPositions[i3];
        const cY = chaosPositions[i3 + 1];
        const cZ = chaosPositions[i3 + 2];

        const mX = monogramPositions[i3];
        const mY = monogramPositions[i3 + 1];
        const mZ = monogramPositions[i3 + 2];

        const pX = portalPositions[i3];
        const pY = portalPositions[i3 + 1];
        const pZ = portalPositions[i3 + 2];

        // First interpolate chaos -> monogram
        const baseCurX = cX + (mX - cX) * a;
        const baseCurY = cY + (mY - cY) * a;
        const baseCurZ = cZ + (mZ - cZ) * a;

        // Second interpolate monogram -> portal
        let targetX = baseCurX + (pX - baseCurX) * m;
        let targetY = baseCurY + (pY - baseCurY) * m;
        let targetZ = baseCurZ + (pZ - baseCurZ) * m;

        // Add gentle breathing noise
        const breath = Math.sin(elapsedTime * 1.5 + i * 0.05) * 0.08;
        targetX += breath * 0.5;
        targetY += breath * 0.5;

        // Mouse repulsion physics
        const dx = currentPos[i3] - state.pointerX;
        const dy = currentPos[i3 + 1] - state.pointerY;
        const distSq = dx * dx + dy * dy;
        const influenceRadiusSq = 16.0;

        if (distSq < influenceRadiusSq && a > 0.8) {
          const force = (1.0 - distSq / influenceRadiusSq) * 1.2;
          targetX += dx * force;
          targetY += dy * force;
        }

        // Restorative spring lerp
        currentPos[i3] += (targetX - currentPos[i3]) * 0.12;
        currentPos[i3 + 1] += (targetY - currentPos[i3 + 1]) * 0.12;
        currentPos[i3 + 2] += (targetZ - currentPos[i3 + 2]) * 0.12;
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      scrollTriggerInstance?.kill();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleTexture?.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [scrollTriggerElement]);

  return (
    <div className="relative w-full h-full min-h-screen">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing" />

      {/* Floating Interactive Portal Overlays (revealed when scrollMorphVal > 0.45) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 flex items-center justify-between px-6 md:px-16 z-20 ${
          scrollMorphVal > 0.4 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Preparatory Portal Tag */}
        <div
          onClick={() => onPortalSelect?.('preparatory')}
          onMouseEnter={() => setActivePortalHover('preparatory')}
          onMouseLeave={() => setActivePortalHover(null)}
          className={`pointer-events-auto cursor-pointer p-4 rounded-2xl glass-panel border transition-all duration-300 transform -translate-y-4 max-w-[240px] text-center ${
            activePortalHover === 'preparatory'
              ? 'border-[#4DE1FF] shadow-[0_0_30px_rgba(77,225,255,0.4)] scale-105'
              : 'border-[#C9A876]/30 hover:border-[#C9A876]'
          }`}
        >
          <div className="text-[10px] tracking-[0.25em] text-[#C9A876] font-mono-tech uppercase mb-1">
            Pillar I · Threshold
          </div>
          <h4 className="font-editorial text-lg text-white font-medium">Preparatory</h4>
          <p className="text-xs text-[#F7F5F1]/70 mt-1 font-sans-ui">
            Ages 3–5 · Sensory Ateliers & Tactile Wonder
          </p>
        </div>

        {/* Primary Portal Tag */}
        <div
          onClick={() => onPortalSelect?.('primary')}
          onMouseEnter={() => setActivePortalHover('primary')}
          onMouseLeave={() => setActivePortalHover(null)}
          className={`pointer-events-auto cursor-pointer p-4 rounded-2xl glass-panel border transition-all duration-300 transform -translate-y-20 max-w-[240px] text-center ${
            activePortalHover === 'primary'
              ? 'border-[#4DE1FF] shadow-[0_0_30px_rgba(77,225,255,0.4)] scale-105'
              : 'border-[#C9A876]/30 hover:border-[#C9A876]'
          }`}
        >
          <div className="text-[10px] tracking-[0.25em] text-[#C9A876] font-mono-tech uppercase mb-1">
            Pillar II · Expansion
          </div>
          <h4 className="font-editorial text-lg text-white font-medium">Primary</h4>
          <p className="text-xs text-[#F7F5F1]/70 mt-1 font-sans-ui">
            Ages 6–10 · Scientific Inquiry & Computational Logic
          </p>
        </div>

        {/* Middle School Portal Tag */}
        <div
          onClick={() => onPortalSelect?.('middle')}
          onMouseEnter={() => setActivePortalHover('middle')}
          onMouseLeave={() => setActivePortalHover(null)}
          className={`pointer-events-auto cursor-pointer p-4 rounded-2xl glass-panel border transition-all duration-300 transform -translate-y-4 max-w-[240px] text-center ${
            activePortalHover === 'middle'
              ? 'border-[#4DE1FF] shadow-[0_0_30px_rgba(77,225,255,0.4)] scale-105'
              : 'border-[#C9A876]/30 hover:border-[#C9A876]'
          }`}
        >
          <div className="text-[10px] tracking-[0.25em] text-[#C9A876] font-mono-tech uppercase mb-1">
            Pillar III · Governance
          </div>
          <h4 className="font-editorial text-lg text-white font-medium">Middle School</h4>
          <p className="text-xs text-[#F7F5F1]/70 mt-1 font-sans-ui">
            Ages 11–14 · Socratic Seminars & Biomimetic Design
          </p>
        </div>
      </div>
    </div>
  );
};
