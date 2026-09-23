import { useState, useEffect } from 'react';
import { Sparkles, Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import { mockScarcity } from '../data/mockData';

interface AdmissionsFunnelProps {
  onOpenTourModal: () => void;
}

export const AdmissionsFunnel = ({ onOpenTourModal }: AdmissionsFunnelProps) => {
  const [yearsEnrolled, setYearsEnrolled] = useState<number>(6); // Slider from 1 to 10 years

  // Real-time animated seats counter
  const [seats, setSeats] = useState(mockScarcity);

  useEffect(() => {
    // Subtle periodic telemetry pulse
    const timer = setInterval(() => {
      // Keep within realistic bounds
      setSeats((prev) =>
        prev.map((s) => ({
          ...s,
        }))
      );
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Compute ROI Metrics based on slider
  const conventionalAgency = Math.round(30 + yearsEnrolled * 3.5);
  const aetheriumAgency = Math.min(99, Math.round(65 + yearsEnrolled * 3.4));

  const conventionalAnxiety = Math.round(45 + yearsEnrolled * 3.2);
  const aetheriumAnxiety = Math.max(3, Math.round(18 - yearsEnrolled * 1.5));

  const conventionalComputational = Math.round(35 + yearsEnrolled * 4.0);
  const aetheriumComputational = Math.min(98, Math.round(60 + yearsEnrolled * 3.8));

  // Dynamic SVG Path Points for the Trajectory Morph
  // Starting at x=20, y=160
  // Conventional path rises linearly and plateaus
  const convEndY = 160 - conventionalAgency * 1.2;
  const aethEndY = 160 - aetheriumAgency * 1.4;

  const convPath = `M 20 160 Q ${150 + yearsEnrolled * 10} 140, 380 ${convEndY}`;
  const aethPath = `M 20 160 C ${100 + yearsEnrolled * 5} 120, ${220 + yearsEnrolled * 8} ${40 + (10 - yearsEnrolled) * 6}, 380 ${aethEndY}`;

  return (
    <section id="admissions" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A876]/15 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#C9A876]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A876]/30 text-[#C9A876] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" />
            Strict Cohort Exclusivity & Admissions
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6">
            Begin Their Story in the <span className="italic text-[#C9A876]">Sanctuary</span>
          </h2>
          <p className="font-sans-ui text-[#F7F5F1]/75 text-base sm:text-lg leading-relaxed">
            To preserve our inviolable 1:6 educator ratio and intimate community, admissions are strictly capped. Every cohort is carefully balanced to cultivate collaborative genius.
          </p>
        </div>

        {/* 1. Scarcity & Prestige Odometer Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
              Real-Time Cohort Seat Availability · 2026–2027 Academic Cycle
            </span>
            <span className="text-xs font-mono-tech text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Ledger Synced
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seats.map((seat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-panel border border-[#C9A876]/30 hover:border-[#4DE1FF]/60 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono-tech text-[#C9A876] uppercase">
                    {seat.ageRange}
                  </span>
                  <span className="text-[11px] font-mono-tech px-2.5 py-0.5 rounded-full bg-white/5 text-[#F7F5F1]/70 border border-white/10">
                    {seat.ratio}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl text-white font-medium mb-1">
                  {seat.pillar}
                </h3>
                <div className="text-xs font-sans-ui text-[#F7F5F1]/50 mb-6">
                  {seat.cohortYear}
                </div>

                {/* Animated Odometer Number */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl sm:text-6xl font-editorial text-white font-semibold tracking-tight">
                    0{seat.seatsRemaining}
                  </span>
                  <span className="text-sm font-mono-tech text-[#C9A876]">
                    / {seat.totalCap} Total Seats
                  </span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden mb-6">
                  <div
                    className="bg-gradient-to-r from-[#C9A876] to-[#4DE1FF] h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${((seat.totalCap - seat.seatsRemaining) / seat.totalCap) * 100}%`,
                    }}
                  />
                </div>

                <button
                  onClick={onOpenTourModal}
                  className="w-full py-3 rounded-xl bg-[#141B2D] border border-[#C9A876]/40 text-xs font-mono-tech tracking-wider uppercase text-[#C9A876] group-hover:text-[#4DE1FF] group-hover:border-[#4DE1FF] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Reserve Tour for this Pillar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Embedded Animated ROI / Trajectory Visualizer */}
        <div className="rounded-3xl glass-panel border border-[#C9A876]/30 p-8 sm:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visualizer Controls & Explanation */}
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A876]/10 text-[#C9A876] text-xs font-mono-tech uppercase mb-4 border border-[#C9A876]/30">
                <TrendingUp className="w-3.5 h-3.5" />
                The Compound Advantage Visualizer
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-white font-medium mb-4">
                Conventional Schooling vs. <span className="italic text-[#C9A876]">Aetherium Trajectory</span>
              </h3>
              <p className="font-sans-ui text-sm text-[#F7F5F1]/80 leading-relaxed mb-8">
                Adjust the timeline to model the cognitive divergence across your child’s formative years. Where conventional schooling optimizes for compliance, Aetherium compounds intellectual autonomy and emotional fortitude.
              </p>

              {/* Years Enrolled Slider */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-[#C9A876]">YEARS IN AETHERIUM SANCTUARY</span>
                  <span className="text-white text-base font-editorial">{yearsEnrolled} Years (Age {3 + yearsEnrolled})</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={yearsEnrolled}
                  onChange={(e) => setYearsEnrolled(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#141B2D] rounded-lg appearance-none cursor-pointer accent-[#C9A876]"
                />
                <div className="flex justify-between text-[10px] font-mono-tech text-[#F7F5F1]/40">
                  <span>Preparatory Entry (Age 4)</span>
                  <span>Middle School Graduation (Age 14)</span>
                </div>
              </div>

              {/* Comparative Metrics Badges */}
              <div className="space-y-3 border-t border-white/10 pt-6">
                <div>
                  <div className="flex justify-between text-xs font-sans-ui mb-1">
                    <span className="text-[#F7F5F1]/80">Autonomous Executive Function</span>
                    <span className="text-[#4DE1FF] font-mono-tech">{aetheriumAgency}% vs {conventionalAgency}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden flex">
                    <div style={{ width: `${aetheriumAgency}%` }} className="bg-[#4DE1FF] h-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-sans-ui mb-1">
                    <span className="text-[#F7F5F1]/80">Academic Anxiety / Burnout Index</span>
                    <span className="text-emerald-400 font-mono-tech">{aetheriumAnxiety}% vs {conventionalAnxiety}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden flex">
                    <div style={{ width: `${aetheriumAnxiety}%` }} className="bg-emerald-400 h-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-sans-ui mb-1">
                    <span className="text-[#F7F5F1]/80">Empirical & Computational Synthesis</span>
                    <span className="text-[#C9A876] font-mono-tech">{aetheriumComputational}% vs {conventionalComputational}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden flex">
                    <div style={{ width: `${aetheriumComputational}%` }} className="bg-[#C9A876] h-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Morphing Curve Canvas */}
            <div className="lg:col-span-7 bg-[#0F1424] rounded-2xl border border-[#C9A876]/30 p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-tech text-[#C9A876]">TRAJECTORY MODELING ENGINE</span>
                <div className="flex items-center gap-4 text-xs font-mono-tech">
                  <span className="flex items-center gap-1.5 text-[#4DE1FF]">
                    <span className="w-2.5 h-0.5 bg-[#4DE1FF]" /> Aetherium Sanctuary
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <span className="w-2.5 h-0.5 bg-gray-500" /> Conventional Elite
                  </span>
                </div>
              </div>

              {/* SVG Trajectory Chart */}
              <div className="relative h-64 w-full flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="20" y1="40" x2="380" y2="40" stroke="#1E2942" strokeDasharray="3 3" />
                  <line x1="20" y1="80" x2="380" y2="80" stroke="#1E2942" strokeDasharray="3 3" />
                  <line x1="20" y1="120" x2="380" y2="120" stroke="#1E2942" strokeDasharray="3 3" />
                  <line x1="20" y1="160" x2="380" y2="160" stroke="#1E2942" />

                  {/* Conventional Curve */}
                  <path
                    d={convPath}
                    fill="none"
                    stroke="#4B5563"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Aetherium Exponential Curve */}
                  <path
                    d={aethPath}
                    fill="none"
                    stroke="url(#trajectoryGrad)"
                    strokeWidth="4"
                    className="transition-all duration-700 ease-out drop-shadow-[0_0_12px_rgba(77,225,255,0.4)]"
                  />

                  <defs>
                    <linearGradient id="trajectoryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C9A876" />
                      <stop offset="100%" stopColor="#4DE1FF" />
                    </linearGradient>
                  </defs>

                  {/* End node markers */}
                  <circle cx="380" cy={convEndY} r="4" fill="#9CA3AF" />
                  <circle cx="380" cy={aethEndY} r="6" fill="#4DE1FF" className="animate-pulse" />
                </svg>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-tech text-[#F7F5F1]/60">
                <span>Baseline Foundation</span>
                <span>Long-Term Synthesis</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. The 4-Stage Low-Commitment Admissions Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            {
              step: '01',
              title: 'Private Sanctuary Tour',
              desc: 'Walk our biophilic atriums during active morning sessions with our Director of Admissions.',
            },
            {
              step: '02',
              title: 'Family Socratic Dialogue',
              desc: 'A reciprocal conversation exploring family values, child passions, and developmental philosophy.',
            },
            {
              step: '03',
              title: 'Child Discovery Atelier',
              desc: 'A gentle, observation-based morning where your child explores materials freely without testing pressure.',
            },
            {
              step: '04',
              title: 'Cohort Grant Placement',
              desc: 'Formal covenant offer and activation of your child’s NeuroPulse digital twin credentials.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#141B2D]/50 border border-[#C9A876]/20">
              <span className="text-2xl font-editorial text-[#C9A876] block mb-2">{item.step}</span>
              <h4 className="font-editorial text-lg text-white font-medium mb-2">{item.title}</h4>
              <p className="font-sans-ui text-xs text-[#F7F5F1]/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center">
          <button
            onClick={onOpenTourModal}
            className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-[#C9A876] via-[#dfc79b] to-[#C9A876] text-[#0B0F1A] font-semibold text-sm tracking-wider uppercase shadow-[0_15px_40px_rgba(201,168,118,0.3)] hover:shadow-[0_20px_50px_rgba(77,225,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cognition-interactive"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Calendar className="w-4 h-4 text-[#0B0F1A]" />
              Begin Their Story · Reserve Private Tour
              <ArrowRight className="w-4 h-4 text-[#0B0F1A]" />
            </span>
          </button>
          <div className="text-xs font-mono-tech text-[#F7F5F1]/50 mt-4">
            Zero commitment required · Strict confidentiality assured
          </div>
        </div>
      </div>
    </section>
  );
};
