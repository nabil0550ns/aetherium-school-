import { useState } from 'react';
import { Sparkles, Brain, ShieldAlert, Utensils, MessageSquareHeart, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface InnovationSuiteProps {
  onOpenSanctumWithTab?: (tab: 'overview' | 'neuropulse' | 'aegis' | 'nutrition' | 'whisper') => void;
}

export const InnovationSuite = ({ onOpenSanctumWithTab }: InnovationSuiteProps) => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  
  // Interactive mini-states for the live showcases
  const [bloomCount, setBloomCount] = useState(36);
  const [lastLoggedSkill, setLastLoggedSkill] = useState<string>('Bilateral Spatial Synthesis');
  const [whisperDraft, setWhisperDraft] = useState('Elena initiated a collaborative bridge experiment with her peer today.');
  const [empathyScore, setEmpathyScore] = useState(99);

  const handleSimulateMilestone = () => {
    setBloomCount((prev) => prev + 4);
    const skills = [
      'Empathetic Dispute Resolution',
      'Micro-Fluidic Hypothesis Validation',
      'Harmonic Polyphony Discernment',
      'Ethical Socratic Querying',
    ];
    const nextSkill = skills[Math.floor(Math.random() * skills.length)];
    setLastLoggedSkill(nextSkill);
  };

  const handleWhisperChange = (text: string) => {
    setWhisperDraft(text);
    // Simulate empathy score computation
    const score = Math.min(100, Math.max(90, 95 + (text.length % 5)));
    setEmpathyScore(score);
  };

  const features = [
    {
      id: 'neuropulse',
      name: 'NeuroPulse™',
      subtitle: 'Cognitive Growth Twin',
      icon: Brain,
      pitch:
        'A living, animated digital twin visualization of your child’s cognitive, motor, and emotional milestones. Parents watch their child’s twin literally grow new petals across the term as authentic learning occurs.',
      tag: 'Neural Topology & Synaptic Mapping',
      tabKey: 'neuropulse' as const,
    },
    {
      id: 'aegis',
      name: 'Aegis Safety Mesh™',
      subtitle: 'Gentle Spatial Verification',
      icon: ShieldAlert,
      pitch:
        'A real-time, privacy-respecting campus safety visualization showing gentle presence heat and supervisor confirmations. Never invasive video feeds — pure felt peace of mind.',
      tag: 'Zero Invasive Surveillance',
      tabKey: 'aegis' as const,
    },
    {
      id: 'harvest',
      name: 'Harvest-to-Table™',
      subtitle: 'Biodynamic Culinary Ledger',
      icon: Utensils,
      pitch:
        'A 100% traceable nutrition ledger where every dish is mapped from partner organic farms to the plate. Includes active allergen cross-checks and live daily macronutrient balance rings.',
      tag: 'Farm-to-Plate Flight Paths',
      tabKey: 'nutrition' as const,
    },
    {
      id: 'whisper',
      name: 'The Whisper Channel™',
      subtitle: 'Empathy-Filtered Parent Comms',
      icon: MessageSquareHeart,
      pitch:
        'An encrypted micro-communication pipeline between educators and parents. Every note passes through a real-time linguistic empathy filter, removing anxiety and grounding updates in constructive joy.',
      tag: 'Real-Time Attunement Waveform',
      tabKey: 'whisper' as const,
    },
  ];

  return (
    <section id="innovation" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A876]/15 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#C9A876]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#4DE1FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A876]/30 text-[#C9A876] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" />
            World-First Educational Technologies
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6">
            The Exclusive <span className="italic text-[#C9A876]">Innovation Suite</span>
          </h2>
          <p className="font-sans-ui text-[#F7F5F1]/75 text-base sm:text-lg leading-relaxed">
            Four proprietary systems engineered exclusively for Aetherium Academy. Transforming parental visibility from retrospective report cards into a living, reassuring stream of intelligence.
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const isSelected = activeFeature === idx;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveFeature(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#141B2D] border-[#4DE1FF] shadow-[0_0_25px_rgba(77,225,255,0.2)]'
                    : 'glass-panel border-[#C9A876]/20 hover:border-[#C9A876]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#4DE1FF]/10 text-[#4DE1FF]' : 'bg-[#C9A876]/10 text-[#C9A876]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono-tech text-[#C9A876]">0{idx + 1}</span>
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-white font-medium">{feat.name}</h4>
                  <p className="text-xs text-[#F7F5F1]/60 font-sans-ui mt-0.5">{feat.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Feature Interactive Showcase Canvas / Playground */}
        <div className="rounded-3xl glass-panel border border-[#C9A876]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Feature Story & CTAs */}
            <div className="lg:col-span-5 text-left">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono-tech uppercase tracking-[0.2em] bg-[#C9A876]/10 text-[#C9A876] border border-[#C9A876]/30 mb-4">
                {features[activeFeature].tag}
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-white font-medium mb-2">
                {features[activeFeature].name}
              </h3>
              <p className="text-sm font-mono-tech text-[#4DE1FF] mb-6">
                {features[activeFeature].subtitle}
              </p>
              <p className="font-sans-ui text-base text-[#F7F5F1]/80 leading-relaxed mb-8">
                {features[activeFeature].pitch}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onOpenSanctumWithTab?.(features[activeFeature].tabKey)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C9A876] hover:bg-[#dfc79b] text-[#0B0F1A] font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cognition-interactive"
                >
                  <Lock className="w-3.5 h-3.5" />
                  See It in the Sanctum Portal
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Live Interactive Interactive Dashboard Module */}
            <div className="lg:col-span-7 rounded-2xl bg-[#0F1424] border border-[#C9A876]/30 p-6 sm:p-8 relative">
              {/* 1. NeuroPulse Interactive Bloom Simulation */}
              {activeFeature === 0 && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div>
                      <span className="text-xs font-mono-tech text-[#C9A876]">DIGITAL TWIN · REAL-TIME EVOLUTION</span>
                      <h4 className="font-editorial text-xl text-white">Elena Rostova (Prep IV)</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-editorial text-[#4DE1FF]">{bloomCount}</span>
                      <div className="text-[10px] font-mono-tech text-[#F7F5F1]/50">Active Synaptic Petals</div>
                    </div>
                  </div>

                  {/* SVG Animated Bloom Petal Cluster */}
                  <div className="relative h-64 w-full flex items-center justify-center bg-[#0B0F1A]/80 rounded-xl border border-white/5 overflow-hidden">
                    <svg className="w-56 h-56 animate-spin-slow" viewBox="0 0 200 200">
                      <defs>
                        <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#C9A876" stopOpacity="0.8" />
                          <stop offset="70%" stopColor="#4DE1FF" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#141B2D" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      {Array.from({ length: Math.min(bloomCount, 40) }).map((_, i) => {
                        const angle = (i * 360) / Math.min(bloomCount, 40);
                        const rad = 25 + (i % 3) * 15;
                        return (
                          <ellipse
                            key={i}
                            cx="100"
                            cy="100"
                            rx={rad}
                            ry="12"
                            fill="url(#petalGrad)"
                            transform={`rotate(${angle} 100 100)`}
                            className="transition-all duration-700 opacity-70 hover:opacity-100"
                          />
                        );
                      })}
                      <circle cx="100" cy="100" r="16" fill="#C9A876" className="animate-pulse" />
                      <circle cx="100" cy="100" r="8" fill="#4DE1FF" />
                    </svg>
                    <div className="absolute bottom-3 left-4 text-xs font-mono-tech text-[#C9A876]">
                      Latest Logged Milestone: <span className="text-white">{lastLoggedSkill}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={handleSimulateMilestone}
                      className="px-4 py-2 rounded-lg bg-[#141B2D] border border-[#C9A876]/40 text-xs font-mono-tech text-[#C9A876] hover:text-[#4DE1FF] hover:border-[#4DE1FF] transition-all"
                    >
                      + Simulate New Milestone Log
                    </button>
                    <span className="text-[11px] text-[#F7F5F1]/50 font-sans-ui">
                      Syncs with daily educator evaluations
                    </span>
                  </div>
                </div>
              )}

              {/* 2. Aegis Safety Mesh Interactive Blueprint */}
              {activeFeature === 1 && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div>
                      <span className="text-xs font-mono-tech text-[#C9A876]">SPATIAL TOPOLOGY · ANONYMIZED HEAT</span>
                      <h4 className="font-editorial text-xl text-white">Zone 03: Tactile Conservatory</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono-tech flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Supervised
                    </span>
                  </div>

                  {/* Abstract Floorplan Grid */}
                  <div className="grid grid-cols-2 gap-4 h-64">
                    <div className="p-4 rounded-xl bg-[#0B0F1A] border border-[#4DE1FF]/30 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#4DE1FF] animate-ping" />
                      <div>
                        <span className="text-[10px] font-mono-tech text-[#C9A876]">ZONE 01</span>
                        <div className="font-editorial text-sm text-white">Botanical Atelier</div>
                      </div>
                      <div className="text-xs text-[#F7F5F1]/70 font-sans-ui">
                        Educator: <span className="text-[#C9A876]">Dr. Clara Beauchamp</span>
                        <br />Presence: 6 Scholars (1:6 Met)
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0B0F1A] border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono-tech text-[#C9A876]">ZONE 02</span>
                        <div className="font-editorial text-sm text-white">Fluidics Lab</div>
                      </div>
                      <div className="text-xs text-[#F7F5F1]/70 font-sans-ui">
                        Educator: <span className="text-[#C9A876]">Prof. Marcus Vance</span>
                        <br />Status: Active Experimentation
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0B0F1A] border border-white/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono-tech text-[#C9A876]">ZONE 03</span>
                        <div className="font-editorial text-sm text-white">Socratic Amphitheater</div>
                      </div>
                      <div className="text-xs text-[#F7F5F1]/70 font-sans-ui">
                        Status: Circadian Transition
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0B0F1A] border border-[#C9A876]/30 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono-tech text-[#C9A876]">ZONE 04</span>
                        <div className="font-editorial text-sm text-white">Aromatherapeutic Court</div>
                      </div>
                      <div className="text-xs text-[#F7F5F1]/70 font-sans-ui">
                        Supervised Rest Period
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-[11px] font-mono-tech text-[#F7F5F1]/50">
                    * Zero cameras or face recognition. 100% passive ultrasonic presence verification.
                  </div>
                </div>
              )}

              {/* 3. Harvest-to-Table Nutrition Ledger */}
              {activeFeature === 2 && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div>
                      <span className="text-xs font-mono-tech text-[#C9A876]">TODAY’S CULINARY LOG · PREPARATORY</span>
                      <h4 className="font-editorial text-xl text-white">Chef Sebastien Vane</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#C9A876]/10 border border-[#C9A876]/40 text-[#C9A876] text-xs font-mono-tech">
                      Permaculture Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#0B0F1A] border border-white/10">
                      <div className="text-xs text-[#C9A876] font-mono-tech uppercase mb-1">Dish Composition</div>
                      <div className="font-editorial text-sm text-white mb-2">
                        Braised Golden Beets & Heirloom Farro
                      </div>
                      <div className="text-xs text-[#F7F5F1]/70 font-sans-ui space-y-1">
                        <div>Farm: <span className="text-[#C9A876]">Campus Terrace Zone 3</span></div>
                        <div>Distance: <span className="text-[#4DE1FF]">0.1 miles (Zero Transport)</span></div>
                        <div>Allergens: <span className="text-emerald-400">Nut & Seed-Oil Free (Verified)</span></div>
                      </div>
                    </div>

                    {/* Animated SVG Donut Chart */}
                    <div className="p-4 rounded-xl bg-[#0B0F1A] border border-white/10 flex items-center justify-center">
                      <svg className="w-32 h-32" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#1E2942" strokeWidth="10" />
                        {/* Protein Ring */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="none"
                          stroke="#C9A876"
                          strokeWidth="10"
                          strokeDasharray="70 200"
                          strokeDashoffset="25"
                        />
                        {/* Phytonutrient Ring */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="none"
                          stroke="#4DE1FF"
                          strokeWidth="10"
                          strokeDasharray="90 200"
                          strokeDashoffset="-45"
                        />
                        <text x="50" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Fraunces">
                          420
                        </text>
                        <text x="50" y="60" textAnchor="middle" fill="#C9A876" fontSize="7" fontFamily="Space Grotesk">
                          KCAL BALANCED
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 text-xs font-mono-tech text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Allergen Cross-Check: Passed 3-tier bio-screening before service.
                  </div>
                </div>
              )}

              {/* 4. The Whisper Channel Empathy Filter */}
              {activeFeature === 3 && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div>
                      <span className="text-xs font-mono-tech text-[#C9A876]">THE WHISPER PROTOCOL</span>
                      <h4 className="font-editorial text-xl text-white">Tone & Empathy Verification</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-editorial text-emerald-400">{empathyScore}%</span>
                      <div className="text-[10px] font-mono-tech text-[#F7F5F1]/50">Attunement Index</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B0F1A] border border-white/10 mb-4">
                    <label className="text-xs font-mono-tech text-[#C9A876] block mb-2">
                      Live Message Composer Simulator
                    </label>
                    <textarea
                      value={whisperDraft}
                      onChange={(e) => handleWhisperChange(e.target.value)}
                      rows={2}
                      className="w-full bg-[#141B2D] border border-[#C9A876]/30 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#4DE1FF] font-sans-ui"
                    />

                    {/* Simulated Empathy Waveform */}
                    <div className="mt-3 flex items-center gap-1 h-8 px-2 bg-[#0B0F1A] rounded border border-white/5">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const height = 15 + Math.sin(i * 0.7 + empathyScore) * 12;
                        return (
                          <div
                            key={i}
                            className="flex-1 bg-[#4DE1FF] rounded-full transition-all duration-300"
                            style={{ height: `${height}px`, opacity: 0.4 + (i % 3) * 0.2 }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400 font-mono-tech flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Tone Assessment: Grounded in positive growth, zero alarmism, high relational safety.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
