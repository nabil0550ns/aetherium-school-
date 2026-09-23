import React, { useState, useEffect } from 'react';
import { Clock, Bell, X } from 'lucide-react';
import { mockStudents, mockTouchpoints, mockSummons } from '../data/mockData';
import { SanctumAuth } from './sanctum/SanctumAuth';
import { SanctumBento } from './sanctum/SanctumBento';
import { SanctumGrowthRiver } from './sanctum/SanctumGrowthRiver';
import { SanctumWhisper } from './sanctum/SanctumWhisper';
import { SanctumSummons } from './sanctum/SanctumSummons';

interface SanctumPortalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'overview' | 'neuropulse' | 'aegis' | 'nutrition' | 'whisper';
}

export const SanctumPortal: React.FC<SanctumPortalProps> = ({
  isOpen,
  onClose,
  initialTab = 'overview',
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentStudentIndex, setCurrentStudentIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'river' | 'logs' | 'summons' | 'nutrition'>('overview');
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(3);
  const [sessionSeconds, setSessionSeconds] = useState<number>(892);

  const currentStudent = mockStudents[currentStudentIndex];

  useEffect(() => {
    if (initialTab === 'nutrition' || initialTab === 'aegis') {
      setActiveTab('nutrition');
    } else if (initialTab === 'whisper') {
      setActiveTab('logs');
    } else {
      setActiveTab('overview');
    }
  }, [initialTab]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-6 bg-[#060911]/90 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-7xl h-[95vh] rounded-3xl bg-[#0B0F1A] border border-[#C9A876]/40 shadow-2xl flex flex-col overflow-hidden text-white font-sans-ui">
        {!isAuthenticated ? (
          <SanctumAuth
            onAuthenticated={() => setIsAuthenticated(true)}
            onCancel={onClose}
          />
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Top Bar Header */}
            <div className="px-6 py-4 border-b border-[#C9A876]/20 bg-[#0E1322] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#141B2D] border border-[#C9A876]/50 flex items-center justify-center text-[#C9A876] font-editorial text-sm font-semibold">
                    Æ
                  </div>
                  <div>
                    <div className="font-editorial text-base text-white">SANCTUM VAULT</div>
                    <div className="text-[10px] font-mono-tech text-[#C9A876]">
                      Air-Gapped Sovereign Node #09
                    </div>
                  </div>
                </div>

                <div className="h-6 w-px bg-white/10 hidden sm:block" />

                {/* Student Selector */}
                <div className="flex items-center gap-2">
                  {mockStudents.map((st, idx) => (
                    <button
                      key={st.id}
                      onClick={() => setCurrentStudentIndex(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono-tech transition-all ${
                        currentStudentIndex === idx
                          ? 'bg-[#141B2D] border-[#C9A876] text-white shadow-sm'
                          : 'border-transparent text-[#F7F5F1]/60 hover:text-white'
                      }`}
                    >
                      <img src={st.avatar} alt={st.name} className="w-5 h-5 rounded-full object-cover" />
                      <span>{st.name}</span>
                      <span className="text-[10px] text-[#C9A876] hidden md:inline">({st.grade.split(' ')[0]})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Telemetry & Actions */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono-tech text-[#F7F5F1]/70">
                  <Clock className="w-3.5 h-3.5 text-[#C9A876]" />
                  <span>Session: {formatTimer(sessionSeconds)}</span>
                </div>

                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setUnreadCount(0);
                  }}
                  className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#C9A876]"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4DE1FF] text-[#0B0F1A] text-[9px] font-mono-tech font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-[#F7F5F1]/70 hover:text-red-400 border border-white/10 transition-colors"
                  title="Close Sanctum"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="px-6 py-2.5 bg-[#090D17] border-b border-[#C9A876]/15 flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0">
              {[
                { id: 'overview', label: 'Bento Command Center' },
                { id: 'river', label: 'Academic Growth River' },
                { id: 'logs', label: 'Educator Logs & Whisper Channel' },
                { id: 'summons', label: 'Encrypted Administrative Summons' },
                { id: 'nutrition', label: 'Nutrition & Safety Mesh' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono-tech tracking-wider uppercase transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#C9A876] text-[#0B0F1A] font-semibold shadow-sm'
                      : 'text-[#F7F5F1]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Main Content Workspace */}
            <div className="flex-1 overflow-y-auto p-6 relative">
              {activeTab === 'overview' && (
                <SanctumBento
                  currentStudent={currentStudent}
                  summonsData={mockSummons}
                  onNavigateTab={(t) => setActiveTab(t)}
                />
              )}

              {activeTab === 'river' && <SanctumGrowthRiver />}

              {activeTab === 'logs' && (
                <SanctumWhisper
                  currentStudent={currentStudent}
                  initialLogs={mockTouchpoints}
                />
              )}

              {activeTab === 'summons' && (
                <SanctumSummons initialSummons={mockSummons} />
              )}

              {activeTab === 'nutrition' && (
                <div className="max-w-6xl mx-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-3xl bg-[#101626] border border-[#C9A876]/30">
                    <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
                      Bio-Traceable Culinary Ledger
                    </span>
                    <h4 className="font-editorial text-2xl text-white mt-1 mb-4">
                      {currentStudent.todaysNutrition.mealName}
                    </h4>

                    <div className="space-y-3 text-xs font-sans-ui text-[#F7F5F1]/80">
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>Prepared by:</span>
                        <span className="text-[#C9A876] font-mono-tech">{currentStudent.todaysNutrition.chef}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>Terroir Origin:</span>
                        <span className="text-white font-mono-tech">{currentStudent.todaysNutrition.origin}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>Carbon Transport Radius:</span>
                        <span className="text-[#4DE1FF] font-mono-tech">{currentStudent.todaysNutrition.distanceMiles} Miles</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>Allergen Shield:</span>
                        <span className="text-emerald-400 font-mono-tech">100% Nut & Seed-Oil Free (Passed)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#101626] border border-[#C9A876]/30">
                    <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
                      Aegis Safety Mesh™ Campus Status
                    </span>
                    <h4 className="font-editorial text-2xl text-white mt-1 mb-4">
                      {currentStudent.supervisedZone}
                    </h4>

                    <div className="space-y-3 text-xs font-sans-ui text-[#F7F5F1]/80">
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>Dedicated Supervisor:</span>
                        <span className="text-[#C9A876] font-mono-tech">{currentStudent.zoneSupervisor}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>Air Quality Index (AQI):</span>
                        <span className="text-emerald-400 font-mono-tech">AQI 02 · 100% HEPA H14 Displaced</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>Perimeter Status:</span>
                        <span className="text-emerald-400 font-mono-tech">Level 1 Shield · Secure</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Slide-in Notifications Glassmorphic Panel */}
            {notificationsOpen && (
              <div className="absolute top-[65px] right-0 bottom-0 w-80 sm:w-96 bg-[#0E1322]/95 backdrop-blur-2xl border-l border-[#C9A876]/30 p-6 z-40 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <h4 className="font-editorial text-lg text-white">Live Intelligence Stream</h4>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-mono-tech text-[#F7F5F1]/50 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-[#141B2D] border border-white/5 text-xs">
                      <span className="text-[10px] font-mono-tech text-[#C9A876]">10:42 AM · NEUROPULSE</span>
                      <p className="text-[#F7F5F1]/80 mt-1">
                        Dr. Clara Beauchamp logged new petal: Spatial Pattern Discernment (94%).
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#141B2D] border border-white/5 text-xs">
                      <span className="text-[10px] font-mono-tech text-emerald-400">8:15 AM · NUTRITION</span>
                      <p className="text-[#F7F5F1]/80 mt-1">
                        Chef Sebastien confirmed organic farro harvest delivery from Campus Terrace.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#141B2D] border border-white/5 text-xs">
                      <span className="text-[10px] font-mono-tech text-[#4DE1FF]">7:45 AM · AEGIS MESH</span>
                      <p className="text-[#F7F5F1]/80 mt-1">
                        Elena checked into West Gate Conservatory. Cortisol-neutral morning baseline verified.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-[10px] font-mono-tech text-[#F7F5F1]/40 text-center">
                  Encrypted Push Telemetry · Sovereign Node #09
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
