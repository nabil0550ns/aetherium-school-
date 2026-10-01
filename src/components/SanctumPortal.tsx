import React, { useState, useEffect } from 'react';
import { Clock, Bell, X } from 'lucide-react';
import { mockStudents, mockTouchpoints, mockSummons } from '../data/mockData';
import { SanctumAuth } from './sanctum/SanctumAuth';
import { SanctumBento } from './sanctum/SanctumBento';
import { SanctumGrowthRiver } from './sanctum/SanctumGrowthRiver';
import { SanctumWhisper } from './sanctum/SanctumWhisper';
import { SanctumSummons } from './sanctum/SanctumSummons';
import { useLanguage } from '../context/LanguageContext';

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
  const { isRtl } = useLanguage();
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

  const tabsList = [
    { id: 'overview', label: isRtl ? 'لوحة القيادة البيداغوجية' : 'Bento Command Center' },
    { id: 'river', label: isRtl ? 'مسار النمو المعرفي' : 'Academic Growth River' },
    { id: 'logs', label: isRtl ? 'سجل الملاحظات وقناة الهمس' : 'Educator Logs & Whisper Channel' },
    { id: 'summons', label: isRtl ? 'المعاملات والتراخيص الإدارية' : 'Administrative Summons' },
    { id: 'nutrition', label: isRtl ? 'السلامة والتغذية الحيوية' : 'Nutrition & Safety Mesh' },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-6 bg-[#060911]/90 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-7xl h-[95vh] rounded-3xl bg-[#0B0F1A] border border-[#C9A24B]/40 shadow-2xl flex flex-col overflow-hidden text-white font-sans-ui">
        {!isAuthenticated ? (
          <SanctumAuth
            onAuthenticated={() => setIsAuthenticated(true)}
            onCancel={onClose}
          />
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Top Bar Header */}
            <div className="px-6 py-4 border-b border-[#C9A24B]/20 bg-[#0E1526] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#141B2D] border border-[#C9A24B]/50 flex items-center justify-center text-[#C9A24B] font-editorial text-sm font-semibold">
                    {isRtl ? 'أ' : 'Æ'}
                  </div>
                  <div>
                    <div className="font-editorial text-base text-white">
                      {isRtl ? 'فضاء الولي · مدرسة الأندلس' : 'PARENT SANCTUM VAULT'}
                    </div>
                    <div className="text-[10px] font-mono-tech text-[#C9A24B]">
                      {isRtl ? 'الخادم السيادي المشفر #09' : 'Air-Gapped Sovereign Node #09'}
                    </div>
                  </div>
                </div>

                <div className="h-6 w-px bg-white/10 hidden sm:block" />

                {/* Student Selector */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  {mockStudents.map((st, idx) => (
                    <button
                      key={st.id}
                      onClick={() => setCurrentStudentIndex(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono-tech transition-all whitespace-nowrap ${
                        currentStudentIndex === idx
                          ? 'bg-[#141B2D] border-[#C9A24B] text-white shadow-sm'
                          : 'border-transparent text-[#F8F6F2]/60 hover:text-white'
                      }`}
                    >
                      <img src={st.avatar} alt={st.name} className="w-5 h-5 rounded-full object-cover" />
                      <span>{st.name}</span>
                      <span className="text-[10px] text-[#C9A24B] hidden md:inline">({st.grade.split(' ')[0]})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Telemetry & Actions */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono-tech text-[#F8F6F2]/70">
                  <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>{isRtl ? 'الجلسة:' : 'Session:'} {formatTimer(sessionSeconds)}</span>
                </div>

                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setUnreadCount(0);
                  }}
                  className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#C9A24B]"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2FD6C8] text-[#0B0F1A] text-[9px] font-mono-tech font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-[#F8F6F2]/70 hover:text-red-400 border border-white/10 transition-colors"
                  title="Close Sanctum"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="px-6 py-2.5 bg-[#090D17] border-b border-[#C9A24B]/15 flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0">
              {tabsList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono-tech tracking-wider uppercase transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#C9A24B] text-[#0B0F1A] font-semibold shadow-sm'
                      : 'text-[#F8F6F2]/70 hover:text-white hover:bg-white/5'
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
                  <div className="p-6 rounded-3xl bg-[#101626] border border-[#C9A24B]/30">
                    <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A24B]">
                      {isRtl ? 'سجل الوجبة البيولوجية لليوم' : 'Bio-Traceable Culinary Ledger'}
                    </span>
                    <h4 className="font-editorial text-2xl text-white mt-1 mb-4">
                      {currentStudent.todaysNutrition.mealName}
                    </h4>

                    <div className="space-y-3 text-xs font-sans-ui text-[#F8F6F2]/80">
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>{isRtl ? 'إشراف وتحضير:' : 'Prepared by:'}</span>
                        <span className="text-[#C9A24B] font-mono-tech">{currentStudent.todaysNutrition.chef}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>{isRtl ? 'المصدر المزرعي:' : 'Origin Farm:'}</span>
                        <span className="text-white font-mono-tech">{currentStudent.todaysNutrition.origin}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>{isRtl ? 'مسافة النقل المباشر:' : 'Transport Radius:'}</span>
                        <span className="text-[#2FD6C8] font-mono-tech">{currentStudent.todaysNutrition.distanceMiles} {isRtl ? 'كم من متيجة' : 'Miles'}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>{isRtl ? 'فحص مسببات الحساسية:' : 'Allergen Shield:'}</span>
                        <span className="text-emerald-400 font-mono-tech">
                          {isRtl ? 'اجتاز الفحص بنجاح (100% طبيعي)' : '100% Passed'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#101626] border border-[#C9A24B]/30">
                    <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A24B]">
                      {isRtl ? 'شبكة الأمان والتحقق اللمسي' : 'Aegis Safety Mesh™ Campus Status'}
                    </span>
                    <h4 className="font-editorial text-2xl text-white mt-1 mb-4">
                      {currentStudent.supervisedZone}
                    </h4>

                    <div className="space-y-3 text-xs font-sans-ui text-[#F8F6F2]/80">
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>{isRtl ? 'الأستاذ المؤطر الميداني:' : 'Zone Supervisor:'}</span>
                        <span className="text-[#C9A24B] font-mono-tech">{currentStudent.zoneSupervisor}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>{isRtl ? 'حالة الحضور والتواجد:' : 'Attendance Integrity:'}</span>
                        <span className="text-[#2FD6C8] font-mono-tech">{currentStudent.attendance}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>{isRtl ? 'معيار جودة الهواء في الحجرة:' : 'Air Quality Index:'}</span>
                        <span className="text-emerald-400 font-mono-tech">AQI 12 (نقاء HEPA H14)</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 flex justify-between">
                        <span>{isRtl ? 'بروتوكول الخصوصية:' : 'Privacy Guard:'}</span>
                        <span className="text-white font-mono-tech">
                          {isRtl ? 'بدون كاميرات تطفلية · تواجد مؤطر فقط' : 'Zero Public Video'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
