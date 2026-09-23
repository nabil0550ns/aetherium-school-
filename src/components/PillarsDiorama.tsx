import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Clock, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PillarData {
  id: string;
  name: string;
  ageRange: string;
  tagline: string;
  themeColor: string;
  description: string;
  stages: {
    time: string;
    title: string;
    description: string;
    highlight: string;
    tag: string;
  }[];
  milestoneQuote: string;
  facultyLead: string;
}

const pillarsData: PillarData[] = [
  {
    id: 'preparatory',
    name: 'Preparatory Atelier',
    ageRange: 'Ages 3–5',
    tagline: 'Sensory Awakening & Neural Primacy',
    themeColor: '#C9A876',
    description:
      'The foundational sanctuary. We blend Reggio Emilia spatial aesthetics with Montessori tactile autonomy, creating an environment where young neurons fire in joyful discovery without artificial pressure.',
    milestoneQuote: '“At four years old, a child shouldn’t just memorize the alphabet; they should feel the texture of phonemes and the geometry of physical space.”',
    facultyLead: 'Dr. Clara Beauchamp, Director of Early Childhood Cognition',
    stages: [
      {
        time: '7:45 AM · The Morning Breath',
        title: 'Sensory Attunement & Aromatherapeutic Transition',
        description:
          'Children transition from parents into a biophilic greenhouse foyer filled with lavender mist and acoustic birdsong, lowering cortisol immediately.',
        highlight: '100% Cortisol-neutral morning baseline',
        tag: 'Emotional Safety',
      },
      {
        time: '10:00 AM · The Atelier of Matter',
        title: 'Micro-Botanical Seedlings & Clay Sculpture',
        description:
          'Children dissect heirloom botanicals under kid-safe optical lenses, feeling the Fibonacci spiral of seeds with their fingers before naming numbers.',
        highlight: 'Bilateral fine motor calibration',
        tag: 'Physical Math',
      },
      {
        time: '1:30 PM · Melodic Resonance',
        title: 'Bilingual Story Theatre & Harmonic Auditory Gym',
        description:
          'Native French and Mandarin educators present narrative tales using physical shadow puppetry and classical instruments.',
        highlight: 'Bilingual phonemic neuro-wiring',
        tag: 'Language',
      },
    ],
  },
  {
    id: 'primary',
    name: 'Primary Academy',
    ageRange: 'Ages 6–10',
    tagline: 'Empirical Logic & Computational Horizons',
    themeColor: '#4DE1FF',
    description:
      'Where curiosity transitions into rigorous inquiry. Children master physical mathematics, algorithmic systems thinking, and comparative literature in collaborative ateliers designed like scientific research institutes.',
    milestoneQuote: '“Our primary students don’t do homework worksheets. They construct working physical models of ecosystems and defend their mathematical proofs.”',
    facultyLead: 'Dr. Alistair Thorne, Chair of Foundational Sciences',
    stages: [
      {
        time: '8:30 AM · Socratic Circle',
        title: 'Physical Number Theory & Geometric Construction',
        description:
          'Euclidean geometry taught through wooden modular pulleys, optical mirrors, and architectural balance beams.',
        highlight: 'Zero rote memorization; 100% conceptual mastery',
        tag: 'Pure Math',
      },
      {
        time: '11:15 AM · The Living Laboratory',
        title: 'Bio-Regenerative Hydroponics & Python Robotics',
        description:
          'Students monitor nutrient chemistry in campus waterbeds using visual code blocks and sensor microcontrollers.',
        highlight: 'Applied systems thinking & data telemetry',
        tag: 'Computing & Biology',
      },
      {
        time: '2:00 PM · The Polyglot Forum',
        title: 'Comparative Literature & Philosophical Discourse',
        description:
          'Reading ancient fables and historical records in translation, debating ethical paradoxes with faculty moderators.',
        highlight: 'Cognitive nuance & ethical discernment',
        tag: 'Humanities',
      },
    ],
  },
  {
    id: 'middle',
    name: 'Middle School Colloquium',
    ageRange: 'Ages 11–14',
    tagline: 'Socratic Governance & Biomimetic Innovation',
    themeColor: '#E0C79D',
    description:
      'The zenith of pre-secondary intellectual agency. Our scholars study geopolitical treaties, design biomimetic aerostructures, and undergo rigorous classical Socratic defense before industry fellows.',
    milestoneQuote: '“By age 14, an Aetherium graduate possesses the research discipline of an undergraduate and the moral clarity of an enlightened statesman.”',
    facultyLead: 'Dame Eleanor Vance, Provost of Academics',
    stages: [
      {
        time: '8:15 AM · The Senate Chamber',
        title: 'Ethical Governance & Geopolitical Case Studies',
        description:
          'Students simulate international environmental pacts and economic allocation models, defending perspectives with primary source citations.',
        highlight: 'High-stakes rhetorical poise & empathy',
        tag: 'Ethics & Law',
      },
      {
        time: '11:00 AM · The Wind Tunnel Atelier',
        title: 'Biomimicry & Aerodynamic Computational Fluid Dynamics',
        description:
          'Studying falcon wing geometries and whale fin tubercles, sculpting test fins for laminar flow wind-tunnel trials.',
        highlight: 'Advanced physics & CAD generative design',
        tag: 'Engineering',
      },
      {
        time: '2:45 PM · The Master Studio',
        title: 'Independent Capstone Mentorship & Thesis Defense',
        description:
          'One-on-one sessions with visiting neuroscientists, venture founders, and classical musicians to refine individual 1-year inquiry monographs.',
        highlight: 'Published original student monograph',
        tag: 'Capstone',
      },
    ],
  },
];

export const PillarsDiorama = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // In desktop without reduced motion, create horizontal scroll pinning
    if (!isMobile && !prefersReducedMotion && containerRef.current && trackRef.current) {
      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth + 120;

      const tween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth * 1.2}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    }
  }, []);

  return (
    <section
      id="pillars"
      ref={containerRef}
      className="relative bg-[#0B0F1A] border-t border-[#C9A876]/15 overflow-hidden min-h-screen py-24"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#4DE1FF]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header & Pillar Selector Switcher */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A876]/30 text-[#C9A876] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" />
              The Tripartite Continuum (Ages 3–14)
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              A Day in the Life of an <span className="italic text-[#C9A876]">Aetherium Scholar</span>
            </h2>
          </div>

          {/* Quick Pillar Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-[#C9A876]/30 self-start md:self-auto">
            {pillarsData.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActivePillarIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all duration-300 ${
                  activePillarIndex === idx
                    ? 'bg-[#C9A876] text-[#0B0F1A] font-semibold shadow-md'
                    : 'text-[#F7F5F1]/70 hover:text-white'
                }`}
              >
                {p.name.split(' ')[0]} ({p.ageRange})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontally Pin-Scrolled Diorama Track */}
      <div className="relative w-full overflow-x-auto lg:overflow-visible no-scrollbar">
        <div
          ref={trackRef}
          className="flex gap-12 px-6 lg:px-16 w-max items-stretch pb-10"
        >
          {pillarsData.map((pillar, pIdx) => (
            <div
              key={pillar.id}
              className="w-[90vw] sm:w-[680px] lg:w-[820px] rounded-3xl glass-panel border border-[#C9A876]/30 p-8 sm:p-10 flex flex-col justify-between shrink-0 shadow-2xl relative group overflow-hidden"
              style={{
                perspective: '1200px',
              }}
            >
              {/* Header of Pillar */}
              <div className="relative z-10 mb-8 border-b border-[#C9A876]/20 pb-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
                    Pillar {pIdx === 0 ? 'I' : pIdx === 1 ? 'II' : 'III'} · {pillar.ageRange}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono-tech bg-[#C9A876]/10 text-[#C9A876] border border-[#C9A876]/30">
                    Faculty Ratio 1:6
                  </span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-white font-medium mb-3">
                  {pillar.name}
                </h3>
                <p className="font-sans-ui text-sm sm:text-base text-[#F7F5F1]/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Diorama 3-Stage Cinematic Timeline */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {pillar.stages.map((stage, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 rounded-2xl bg-[#141B2D]/80 border border-[#C9A876]/20 hover:border-[#4DE1FF]/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#C9A876] mb-2">
                        <Clock className="w-3.5 h-3.5 text-[#C9A876]" />
                        <span>{stage.time}</span>
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono-tech bg-white/5 text-[#4DE1FF] mb-2">
                        {stage.tag}
                      </span>
                      <h4 className="font-editorial text-base text-white font-medium mb-2 leading-snug">
                        {stage.title}
                      </h4>
                      <p className="text-xs text-[#F7F5F1]/70 leading-relaxed font-sans-ui">
                        {stage.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#C9A876] font-sans-ui">
                      <Award className="w-3.5 h-3.5 text-[#C9A876]" />
                      <span>{stage.highlight}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Milestone Quote & Faculty Signature */}
              <div className="relative z-10 pt-6 border-t border-[#C9A876]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <blockquote className="italic font-editorial text-sm sm:text-base text-[#C9A876]/90 max-w-lg">
                  {pillar.milestoneQuote}
                </blockquote>
                <div className="text-right sm:self-end">
                  <div className="text-xs font-mono-tech text-white">{pillar.facultyLead}</div>
                  <div className="text-[10px] text-[#F7F5F1]/50 font-sans-ui">Master Faculty Fellow</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
