import { useState } from 'react';
import { Shield, Sparkles, Building, CheckCircle2 } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const LifeAtAetherium = () => {
  const [activeTab, setActiveTab] = useState<'campus' | 'safety' | 'nutrition'>('campus');

  const campusFacilities = [
    {
      title: 'The Biophilic Light Atrium',
      tag: 'Circadian Architecture',
      description: 'Triple-height glass conservatory regulating daylight spectrum to match natural melatonin-cortisol curves, keeping child alertness organic.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      specs: '14,000 sq ft · 42 Plant Species · Natural Acoustic Damping',
    },
    {
      title: 'The Micro-Gravity Fluidics Lab',
      tag: 'Empirical Physics Atelier',
      description: 'Hands-on water tunnels and vacuum drop towers where primary and middle scholars test biomimetic hulls and fluid drag.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      specs: 'Laminar Wind Flow · Precision Sensors · Child-Safe Enclosures',
    },
    {
      title: 'Sensory Calibration Pods',
      tag: 'Neuro-Emotional Reset',
      description: 'Dedicated acoustic chambers equipped with weighted silk hammocks, binaural alpha-wave audio, and zero fluorescent glare.',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
      specs: 'Soundproofed to 15dB · Tactile Felt Textures · On-Demand Use',
    },
  ];

  const safetyProtocols = [
    {
      title: 'Air Hygiene: Hospital-Grade H14 HEPA',
      desc: 'Active displacement ventilation cycling 100% outside air every 7 minutes. Zero VOC paints, formaldehyde-free timbers.',
      badge: '99.995% Airborne Particle Filtration',
    },
    {
      title: 'Water Purity: Micro-Filtered Alkaline Springs',
      desc: 'Quadruple reverse osmosis with remineralization across every drinking hydration fountain and culinary prep sink.',
      badge: 'Zero Microplastics · Zero Fluoride Additives',
    },
    {
      title: 'Physical Perimeter: Discrete Non-Invasive Armor',
      desc: 'Sub-surface biometric entry gates and passive optical spatial mesh. No intrusive metal detectors or police presence.',
      badge: 'Sub-Second Perimeter Lockdown Ready',
    },
    {
      title: 'Air-Gapped Sovereign Data Vault',
      desc: 'All child biometric, academic, and behavioral records reside on local quantum-encrypted servers with zero public cloud telemetry.',
      badge: 'Bank-Grade AES-256 / SHA-256 Vault',
    },
  ];

  return (
    <section id="campus" className="relative py-28 bg-[#0B0F1A] border-t border-[#C9A876]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A876]/30 text-[#C9A876] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" />
              Physical Sanctuary
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              An Architectural <span className="italic text-[#C9A876]">Masterpiece of Wellbeing</span>
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-[#C9A876]/30 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('campus')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'campus'
                  ? 'bg-[#C9A876] text-[#0B0F1A] font-semibold'
                  : 'text-[#F7F5F1]/70 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              Campus Architecture
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'safety'
                  ? 'bg-[#C9A876] text-[#0B0F1A] font-semibold'
                  : 'text-[#F7F5F1]/70 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Safety Mesh
            </button>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'campus' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campusFacilities.map((fac, idx) => (
              <TiltCard
                key={idx}
                className="group rounded-3xl glass-panel border border-[#C9A876]/25 hover:border-[#4DE1FF]/60 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101626] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono-tech tracking-wider uppercase bg-[#0B0F1A]/80 backdrop-blur-md text-[#C9A876] border border-[#C9A876]/30">
                    {fac.tag}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-editorial text-2xl text-white font-medium mb-3 group-hover:text-[#4DE1FF] transition-colors">
                    {fac.title}
                  </h3>
                  <p className="font-sans-ui text-xs sm:text-sm text-[#F7F5F1]/70 leading-relaxed mb-6">
                    {fac.description}
                  </p>
                  <div className="pt-4 border-t border-[#C9A876]/15 text-[11px] font-mono-tech text-[#C9A876]/90">
                    {fac.specs}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyProtocols.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-panel border border-[#C9A876]/25 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#4DE1FF]">
                      <CheckCircle2 className="w-4 h-4 text-[#4DE1FF]" />
                      Active 24/7 Shield
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-mono-tech text-[#C9A876] px-2.5 py-1 rounded-full bg-[#C9A876]/10 border border-[#C9A876]/30">
                      Standard Grade IV
                    </span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-white font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans-ui text-sm text-[#F7F5F1]/75 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-[#C9A876]/20 text-xs font-mono-tech text-[#C9A876]">
                  {item.badge}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
