import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, Sparkles, Compass, Feather } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const Philosophy: React.FC = () => {
  const pillars = [
    {
      icon: HeartHandshake,
      title: 'Unconditional Psychological Sanctuary',
      tag: 'The Precondition for Genius',
      description:
        'Cognitive science proves that curiosity is neurologically suppressed in high-anxiety environments. We engineer absolute emotional warmth, sensory harmony, and relational security so a child’s neurological capacity can expand without self-censorship.',
      stat: '0% Threat Index',
      statLabel: 'Peer-validated bio-metric comfort',
    },
    {
      icon: ShieldCheck,
      title: 'The 3–14 Developmental Perimeter',
      tag: 'Why We Exclude High School',
      description:
        'Adolescent high school cultures inherently impose social posturing and rigid test optimization. By dedicating our campus exclusively to ages 3 to 14, our children retain wonder, purity of inquiry, and genuine childhood joy during their most critical neurodevelopmental window.',
      stat: 'Ages 3 to 14 Only',
      statLabel: 'Pristine developmental cocoon',
    },
    {
      icon: Eye,
      title: 'Pervasive, Gentle Visibility',
      tag: 'Where Every Moment Is Seen',
      description:
        'From micro-botanical exploration in our atriums to nutritional traceability at lunch, no child slips through the cracks. Our 1:6 educator ratio ensures that silent hesitations, sudden breakthroughs, and subtle emotional shifts are instantly met with attuned mentorship.',
      stat: '1 : 6 Ratio',
      statLabel: 'Dedicated Socratic master faculty',
    },
  ];

  return (
    <section id="philosophy" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A876]/15 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C9A876]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A876]/30 text-[#C9A876] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" />
            Foundational Pedagogy
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6">
            A Sanctuary Built for the <span className="italic text-[#C9A876]">Formative Decades</span>
          </h2>
          <p className="font-sans-ui text-[#F7F5F1]/75 text-base sm:text-lg leading-relaxed">
            We reject the industrial assembly line of conventional education. Between ages 3 and 14, the human brain forms more synaptic density than at any other period in life. Aetherium Academy was conceived as an impregnable sanctuary for this sacred window.
          </p>
        </div>

        {/* The 3 Core Tenets Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <TiltCard
                key={idx}
                className="group relative p-8 rounded-3xl glass-panel border border-[#C9A876]/25 hover:border-[#4DE1FF]/60 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#141B2D] border border-[#C9A876]/30 flex items-center justify-center mb-6 text-[#C9A876] group-hover:text-[#4DE1FF] group-hover:border-[#4DE1FF]/60 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#C9A876] block mb-2">
                    {pillar.tag}
                  </span>
                  <h3 className="font-editorial text-2xl text-white font-medium mb-4 group-hover:text-[#F7F5F1] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-sans-ui text-sm text-[#F7F5F1]/70 leading-relaxed mb-8">
                    {pillar.description}
                  </p>
                </div>

                <div className="border-t border-[#C9A876]/15 pt-5 flex items-center justify-between">
                  <div>
                    <div className="font-editorial text-xl text-[#C9A876] group-hover:text-[#4DE1FF] transition-colors">
                      {pillar.stat}
                    </div>
                    <div className="text-[11px] text-[#F7F5F1]/50 font-sans-ui">{pillar.statLabel}</div>
                  </div>
                  <Compass className="w-5 h-5 text-[#C9A876]/40 group-hover:text-[#4DE1FF] transition-colors" />
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Emotional Microcopy Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#141B2D] via-[#101626] to-[#141B2D] border border-[#C9A876]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-xl bg-[#C9A876]/10 border border-[#C9A876]/30 text-[#C9A876]">
              <Feather className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-editorial text-lg text-white font-medium">The Aetherium Parent Promise</h4>
              <p className="text-xs text-[#F7F5F1]/70 font-sans-ui mt-0.5">
                Every child is recognized as an unrepeatable intellectual constellation. Not graded by standardization, but illuminated by mentorship.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono-tech text-[#C9A876] tracking-wider uppercase">
              Independent Accreditation Tier-1
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
