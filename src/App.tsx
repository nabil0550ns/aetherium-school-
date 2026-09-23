import { useEffect, useState } from 'react';
import { initSmoothScroll } from './utils/scrollEngine';
import { MagneticCursor } from './components/MagneticCursor';
import { EtherealDecoration } from './components/EtherealDecoration';
import { Navigation } from './components/Navigation';
import { KineticHero } from './components/KineticHero';
import { Philosophy } from './components/Philosophy';
import { PillarsDiorama } from './components/PillarsDiorama';
import { LifeAtAetherium } from './components/LifeAtAetherium';
import { InnovationSuite } from './components/InnovationSuite';
import { AdmissionsFunnel } from './components/AdmissionsFunnel';
import { VoicePortraits } from './components/VoicePortraits';
import { ConstellationFooter } from './components/ConstellationFooter';
import { LiquidGlassDivider } from './components/LiquidGlassDivider';
import { PrivateTourModal } from './components/PrivateTourModal';
import { SanctumPortal } from './components/SanctumPortal';

export function App() {
  const [tourModalOpen, setTourModalOpen] = useState<boolean>(false);
  const [sanctumOpen, setSanctumOpen] = useState<boolean>(false);
  const [sanctumInitialTab, setSanctumInitialTab] = useState<'overview' | 'neuropulse' | 'aegis' | 'nutrition' | 'whisper'>('overview');

  useEffect(() => {
    // Initialize Lenis Smooth Scroll Engine
    const lenis = initSmoothScroll();

    return () => {
      lenis?.destroy();
    };
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSanctumWithTab = (tab: 'overview' | 'neuropulse' | 'aegis' | 'nutrition' | 'whisper') => {
    setSanctumInitialTab(tab);
    setSanctumOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F1A] text-[#F7F5F1] selection:bg-[#C9A876]/30 selection:text-[#4DE1FF]">
      {/* Magnetic Cursor Follower */}
      <MagneticCursor />

      {/* 4-Plane Ethereal Parallax Glyph Decoration */}
      <EtherealDecoration />

      {/* Fixed Luxury Navigation Header */}
      <Navigation
        onOpenTourModal={() => setTourModalOpen(true)}
        onOpenSanctum={() => {
          setSanctumInitialTab('overview');
          setSanctumOpen(true);
        }}
        onNavigate={handleScrollToSection}
      />

      {/* 1. The Threshold (WebGL Hero with Particle Monogram & Morph) */}
      <div id="hero">
        <KineticHero
          onExplorePillars={() => handleScrollToSection('pillars')}
          onOpenTourModal={() => setTourModalOpen(true)}
          onOpenSanctum={() => {
            setSanctumInitialTab('overview');
            setSanctumOpen(true);
          }}
        />
      </div>

      <LiquidGlassDivider />

      {/* 2. Philosophy / Why Aetherium (Sanctuary Ethos & 3–14 Perimeter) */}
      <Philosophy />

      <LiquidGlassDivider inverted />

      {/* 3. The Three Pillars (Preparatory 3-5, Primary 6-10, Middle 11-14 Horizontal Diorama) */}
      <PillarsDiorama />

      <LiquidGlassDivider />

      {/* 4. Life at Aetherium (Campus Architecture, Hospital Air Purity, Safety Mesh) */}
      <LifeAtAetherium />

      <LiquidGlassDivider inverted />

      {/* 5. The Exclusive Innovation Suite (4 World-First Breakthroughs) */}
      <InnovationSuite onOpenSanctumWithTab={handleOpenSanctumWithTab} />

      <LiquidGlassDivider />

      {/* 6. Admissions Funnel (Scarcity Odometer & Morphing ROI Trajectory Slider) */}
      <AdmissionsFunnel onOpenTourModal={() => setTourModalOpen(true)} />

      <LiquidGlassDivider inverted />

      {/* 7. Voice Portraits (Cinematic Ken Burns Testimonials) */}
      <VoicePortraits />

      <LiquidGlassDivider />

      {/* 8. Constellation Map & Community Footer */}
      <ConstellationFooter
        onOpenSanctum={() => {
          setSanctumInitialTab('overview');
          setSanctumOpen(true);
        }}
        onOpenTour={() => setTourModalOpen(true)}
      />

      {/* Modals & Portals */}
      <PrivateTourModal
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
      />

      <SanctumPortal
        isOpen={sanctumOpen}
        onClose={() => setSanctumOpen(false)}
        initialTab={sanctumInitialTab}
      />
    </div>
  );
}

export default App;
