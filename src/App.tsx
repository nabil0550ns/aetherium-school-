import { useEffect, useState } from 'react';
import { initSmoothScroll } from './utils/scrollEngine';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { MagneticCursor } from './components/MagneticCursor';
import { EtherealDecoration } from './components/EtherealDecoration';
import { Navigation } from './components/Navigation';
import { KineticHero } from './components/KineticHero';
import { Philosophy } from './components/Philosophy';
import { PillarsDiorama } from './components/PillarsDiorama';
import { LifeAtAetherium } from './components/LifeAtAetherium';
import { InnovationSuite } from './components/InnovationSuite';
import { NewsSection } from './components/NewsSection';
import { GallerySection } from './components/GallerySection';
import { AdmissionsFunnel } from './components/AdmissionsFunnel';
import { VoicePortraits } from './components/VoicePortraits';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { ConstellationFooter } from './components/ConstellationFooter';
import { LiquidGlassDivider } from './components/LiquidGlassDivider';
import { PrivateTourModal } from './components/PrivateTourModal';
import { SanctumPortal } from './components/SanctumPortal';
import { StudentPortal } from './components/student/StudentPortal';

function MainAppContent() {
  const { isRtl } = useLanguage();
  const [tourModalOpen, setTourModalOpen] = useState<boolean>(false);
  const [sanctumOpen, setSanctumOpen] = useState<boolean>(false);
  const [studentPortalOpen, setStudentPortalOpen] = useState<boolean>(false);
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
    <div className={`relative min-h-screen bg-[#0B0F1A] text-[#F8F6F2] selection:bg-[#C9A24B]/30 selection:text-[#2FD6C8] ${isRtl ? 'font-arabic' : 'font-sans-ui'}`}>
      {/* Magnetic Cursor Follower */}
      <MagneticCursor />

      {/* 4-Plane Ethereal Parallax Glyph & Andalusian Star Decoration */}
      <EtherealDecoration />

      {/* Fixed Luxury Navigation Header */}
      <Navigation
        onOpenTourModal={() => setTourModalOpen(true)}
        onOpenSanctum={() => {
          setSanctumInitialTab('overview');
          setSanctumOpen(true);
        }}
        onOpenStudentPortal={() => setStudentPortalOpen(true)}
        onNavigate={handleScrollToSection}
      />

      {/* 1. The Threshold (WebGL Hero with Particle Monogram & Arabic Typography) */}
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

      {/* 2. Philosophy / Why El Andalus (Sanctuary Ethos & 3–14 Perimeter without High School) */}
      <Philosophy />

      <LiquidGlassDivider inverted />

      {/* 3. The Three Pillars (Preparatory 3-5, Primary 6-10, Middle 11-14 Horizontal Diorama) */}
      <PillarsDiorama />

      <LiquidGlassDivider />

      {/* 4. Life at El Andalus (Biophilic Architecture, HEPA Air Hygiene, Bio-Safety, Chef Abdelkader) */}
      <LifeAtAetherium />

      <LiquidGlassDivider inverted />

      {/* 5. The Exclusive Innovation Suite (NeuroPulse, Aegis Mesh, Harvest Ledger, Whisper Channel) */}
      <InnovationSuite onOpenSanctumWithTab={handleOpenSanctumWithTab} />

      <LiquidGlassDivider />

      {/* 6. Campus Chronicles & News */}
      <NewsSection />

      <LiquidGlassDivider inverted />

      {/* 7. Gallery of Spaces & Ateliers */}
      <GallerySection />

      <LiquidGlassDivider />

      {/* 8. Admissions Funnel (Seat Availability, Trajectory Slider & Multi-step RTL Form) */}
      <AdmissionsFunnel onOpenTourModal={() => setTourModalOpen(true)} />

      <LiquidGlassDivider inverted />

      {/* 9. Voice Portraits (Parent Testimonials) */}
      <VoicePortraits />

      <LiquidGlassDivider />

      {/* 10. Frequently Asked Questions (FAQ Accordion) */}
      <FaqSection />

      <LiquidGlassDivider inverted />

      {/* 11. Campus Directorate & Contact (Hydra / El Biar, Algiers) */}
      <ContactSection />

      {/* 12. Constellation Topography Map & Community Footer */}
      <ConstellationFooter
        onOpenSanctum={() => {
          setSanctumInitialTab('overview');
          setSanctumOpen(true);
        }}
        onOpenStudentPortal={() => setStudentPortalOpen(true)}
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

      <StudentPortal
        isOpen={studentPortalOpen}
        onClose={() => setStudentPortalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}

export default App;
