import { CheckCircle2, ChevronRight, FileSignature } from 'lucide-react';
import type { Student, AdministrativeSummons } from '../../types';

interface SanctumBentoProps {
  currentStudent: Student;
  summonsData: AdministrativeSummons;
  onNavigateTab: (tab: 'overview' | 'river' | 'logs' | 'summons' | 'nutrition') => void;
}

export const SanctumBento = ({
  currentStudent,
  summonsData,
  onNavigateTab,
}: SanctumBentoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {/* Bento 1: Student Vitality & Attendance */}
      <div className="p-6 rounded-2xl bg-[#101626] border border-[#C9A876]/25 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono-tech text-[#C9A876] uppercase">Attendance & Vitality</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              100% Present
            </span>
          </div>
          <h4 className="font-editorial text-2xl text-white mb-1">{currentStudent.name}</h4>
          <p className="text-xs text-[#F7F5F1]/60 font-sans-ui">{currentStudent.grade}</p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs font-mono-tech">
          <div className="flex justify-between">
            <span className="text-[#F7F5F1]/60">Cortisol Baseline:</span>
            <span className="text-emerald-400">Neutral (Calm)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#F7F5F1]/60">Resting Rhythm:</span>
            <span className="text-white">76 BPM (Balanced)</span>
          </div>
        </div>
      </div>

      {/* Bento 2: Active NeuroPulse Twin Snapshot */}
      <div className="p-6 rounded-2xl bg-[#101626] border border-[#C9A876]/25 flex flex-col justify-between md:col-span-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono-tech text-[#C9A876] uppercase">
              NeuroPulse™ Cognitive Twin Snapshot
            </span>
            <span className="text-xs font-mono-tech text-[#4DE1FF]">
              {currentStudent.cognitiveTwin.activePetals} Petals Active
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Mini Spinning Bloom */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center bg-[#0B0F1A] rounded-2xl border border-white/10">
              <svg className="w-24 h-24 animate-spin-slow" viewBox="0 0 100 100">
                {Array.from({ length: 16 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="50"
                    cy="50"
                    rx="28"
                    ry="6"
                    fill="#C9A876"
                    opacity="0.6"
                    transform={`rotate(${(i * 360) / 16} 50 50)`}
                  />
                ))}
                <circle cx="50" cy="50" r="8" fill="#4DE1FF" />
              </svg>
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="font-editorial text-lg text-white">
                {currentStudent.cognitiveTwin.stage}
              </div>
              <div className="text-xs text-[#C9A876] font-mono-tech">
                Dominant: {currentStudent.cognitiveTwin.dominantPillar}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-sans-ui text-[#F7F5F1]/70">
                {currentStudent.cognitiveTwin.skills.map((sk, i) => (
                  <div key={i} className="flex justify-between bg-white/[0.03] p-1.5 rounded">
                    <span>{sk.name}</span>
                    <span className="text-[#4DE1FF] font-mono-tech">{sk.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono-tech text-[#C9A876]">
          <span>Next Autonomous Sync: 4:30 PM Atelier</span>
          <button onClick={() => onNavigateTab('river')} className="hover:text-white flex items-center gap-1">
            View River <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Bento 3: Aegis Safety Mesh Live Zone */}
      <div className="p-6 rounded-2xl bg-[#101626] border border-[#C9A876]/25 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono-tech text-[#C9A876] uppercase">Aegis Safety Mesh™</span>
            <span className="w-2 h-2 rounded-full bg-[#4DE1FF] animate-ping" />
          </div>
          <div className="text-xs text-[#F7F5F1]/60 font-sans-ui">Current Zone</div>
          <h4 className="font-editorial text-xl text-white mb-2">{currentStudent.supervisedZone}</h4>
          <p className="text-xs text-[#C9A876] font-mono-tech">
            Faculty: {currentStudent.zoneSupervisor}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono-tech text-emerald-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Passive Ultrasonic Supervised
        </div>
      </div>

      {/* Bento 4: Harvest-to-Table Today's Lunch */}
      <div className="p-6 rounded-2xl bg-[#101626] border border-[#C9A876]/25 flex flex-col justify-between md:col-span-2">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono-tech text-[#C9A876] uppercase">
              Harvest-to-Table Nutrition Ledger™
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Bio-Screen Passed
            </span>
          </div>
          <h4 className="font-editorial text-xl text-white mb-1">
            {currentStudent.todaysNutrition.mealName}
          </h4>
          <div className="text-xs text-[#F7F5F1]/70 font-sans-ui">
            Curated by {currentStudent.todaysNutrition.chef}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-mono-tech">
            <div className="bg-white/5 p-2 rounded-xl text-center">
              <div className="text-[#C9A876]">{currentStudent.todaysNutrition.calories}</div>
              <div className="text-[10px] text-[#F7F5F1]/50">Kcal</div>
            </div>
            <div className="bg-white/5 p-2 rounded-xl text-center">
              <div className="text-[#4DE1FF]">{currentStudent.todaysNutrition.proteinG}g</div>
              <div className="text-[10px] text-[#F7F5F1]/50">Protein</div>
            </div>
            <div className="bg-white/5 p-2 rounded-xl text-center">
              <div className="text-emerald-400">{currentStudent.todaysNutrition.greensScore}%</div>
              <div className="text-[10px] text-[#F7F5F1]/50">Bio-Purity</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono-tech">
          <span className="text-[#F7F5F1]/60">Source: {currentStudent.todaysNutrition.origin}</span>
          <span className="text-[#4DE1FF]">{currentStudent.todaysNutrition.distanceMiles} miles</span>
        </div>
      </div>

      {/* Bento 5: Administrative Summons Quick Notice */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101626] to-[#1a1c29] border border-[#C9A876]/30 flex flex-col justify-between md:col-span-2">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono-tech text-[#C9A876] uppercase">
              Encrypted Administrative Summons
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono-tech ${
              summonsData.status === 'signed'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}>
              {summonsData.status === 'signed' ? 'SEALED & RECORDED' : 'E-SIGNATURE REQUIRED'}
            </span>
          </div>
          <h4 className="font-editorial text-xl text-white mb-2">{summonsData.title}</h4>
          <p className="text-xs text-[#F7F5F1]/70 font-sans-ui line-clamp-2">
            {summonsData.legalSummary}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs font-mono-tech text-[#C9A876]">Deadline: {summonsData.deadline}</span>
          <button
            onClick={() => onNavigateTab('summons')}
            className="px-4 py-2 rounded-xl bg-[#C9A876] text-[#0B0F1A] font-semibold text-xs uppercase tracking-wider hover:bg-[#dfc79b] transition-all flex items-center gap-1.5"
          >
            <FileSignature className="w-3.5 h-3.5" />
            {summonsData.status === 'signed' ? 'View Executed Deed' : 'Sign Deed Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
