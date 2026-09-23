import React, { useState } from 'react';

export const SanctumGrowthRiver: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(0);

  const riverMilestones = [
    {
      id: 1,
      title: 'Bilateral Tactile Discernment',
      date: 'Sept 08',
      score: '96% Mastery',
      educator: 'Dr. Clara Beauchamp',
      observation: 'Elena calibrated bilateral grip strength while sculpting clay seed-vessels.',
      domain: 'Sensory & Motor',
      x: 80,
      y: 110,
    },
    {
      id: 2,
      title: 'Fibonacci Spiral Discovery',
      date: 'Sept 15',
      score: '98% Mastery',
      educator: 'Chef Sebastien Vane',
      observation: 'Identified mathematical recurring ratios in sunflower seeds without prompting.',
      domain: 'Early Number Theory',
      x: 230,
      y: 70,
    },
    {
      id: 3,
      title: 'Empathetic Peer Mediation',
      date: 'Sept 20',
      score: '100% Mastery',
      educator: 'Julian Vance Sr.',
      observation: 'Calmed distressed peer whose clay kiln cracked, offering her own materials.',
      domain: 'Social-Emotional Attunement',
      x: 390,
      y: 130,
    },
    {
      id: 4,
      title: 'Bilingual Shadow Theatre Monologue',
      date: 'Sept 22',
      score: '94% Mastery',
      educator: 'Madame Sophie Laurent',
      observation: 'Presented animal fable in French with rhythmic musical cadence.',
      domain: 'Linguistic Resonance',
      x: 540,
      y: 90,
    },
    {
      id: 5,
      title: 'Micro-Fluidic Surface Tension Capstone',
      date: 'Scheduled Oct 04',
      score: 'Upcoming',
      educator: 'Prof. Marcus Vance',
      observation: 'Hands-on experimentation with droplet cohesion in the laminar fluidics lab.',
      domain: 'Empirical Physics',
      x: 690,
      y: 120,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
            Continuous Non-Linear Development
          </span>
          <h3 className="font-editorial text-3xl text-white mt-1">
            The Academic Growth River
          </h3>
          <p className="text-xs text-[#F7F5F1]/70 font-sans-ui mt-1">
            Replacing rigid report cards with an undulating current of organic mastery and cognitive breakthroughs.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono-tech">
          <span className="flex items-center gap-1.5 text-[#C9A876]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9A876]" /> Mastered Milestone
          </span>
          <span className="flex items-center gap-1.5 text-[#4DE1FF]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4DE1FF] animate-pulse" /> Approaching Horizon
          </span>
        </div>
      </div>

      {/* Flowing SVG River Canvas */}
      <div className="relative w-full h-80 rounded-3xl bg-[#101626] border border-[#C9A876]/30 p-6 overflow-hidden flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A876" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#4DE1FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#141B2D" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* River Outer Currents */}
          <path
            d="M 0 100 Q 200 40, 400 130 T 800 100"
            fill="none"
            stroke="#1F2942"
            strokeWidth="48"
            strokeLinecap="round"
          />
          {/* Flowing River Centerline */}
          <path
            d="M 0 100 Q 200 40, 400 130 T 800 100"
            fill="none"
            stroke="url(#riverGradient)"
            strokeWidth="12"
            className="animate-pulse"
          />

          {/* Milestone Interactive Nodes along current */}
          {riverMilestones.map((m, idx) => (
            <g key={m.id} className="cursor-pointer group" onClick={() => setSelectedMilestone(idx)}>
              <circle
                cx={m.x}
                cy={m.y}
                r={selectedMilestone === idx ? "12" : "8"}
                fill={idx === 4 ? "#4DE1FF" : "#C9A876"}
                stroke="#0B0F1A"
                strokeWidth="3"
                className="transition-all duration-300 group-hover:scale-125"
              />
              <text
                x={m.x}
                y={m.y - 18}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="10"
                fontFamily="Space Grotesk"
                className="font-medium"
              >
                {m.date}
              </text>
            </g>
          ))}
        </svg>

        {/* Milestone Inspector Drawer / Card */}
        {selectedMilestone !== null && (
          <div className="absolute bottom-4 left-6 right-6 p-4 rounded-2xl glass-panel border border-[#4DE1FF]/50 bg-[#0F1424]/95 animate-in fade-in duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-mono-tech px-2 py-0.5 rounded bg-[#4DE1FF]/10 text-[#4DE1FF]">
                  {riverMilestones[selectedMilestone].domain}
                </span>
                <span className="text-xs font-mono-tech text-[#C9A876]">
                  {riverMilestones[selectedMilestone].score}
                </span>
              </div>
              <h4 className="font-editorial text-lg text-white font-medium">
                {riverMilestones[selectedMilestone].title}
              </h4>
              <p className="text-xs text-[#F7F5F1]/80 font-sans-ui mt-1 max-w-2xl">
                {riverMilestones[selectedMilestone].observation}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs font-mono-tech text-white">
                {riverMilestones[selectedMilestone].educator}
              </div>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="text-[10px] text-[#F7F5F1]/50 hover:text-white mt-1"
              >
                Close Inspector
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
