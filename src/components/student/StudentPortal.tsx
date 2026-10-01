import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  CheckCircle2,
  Award,
  GraduationCap,
  Flame,
  Zap,
} from 'lucide-react';
import { mockStudents, mockTimetable, mockHomework, mockBadges } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

interface StudentPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ isOpen, onClose }) => {
  const { isRtl } = useLanguage();
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'hub' | 'timetable' | 'quests' | 'badges'>('hub');
  const [rfidScanned, setRfidScanned] = useState(false);

  if (!isOpen) return null;

  const currentStudent = mockStudents[selectedStudentIndex];

  const handleSimulateScan = () => {
    setRfidScanned(true);
    setTimeout(() => setRfidScanned(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-6 bg-[#060911]/90 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-7xl h-[95vh] rounded-3xl bg-[#0B0F1A] border border-[#2FD6C8]/40 shadow-2xl flex flex-col overflow-hidden text-white font-sans-ui">
        {/* Top Bar Header */}
        <div className="px-6 py-4 border-b border-[#2FD6C8]/20 bg-[#0E1526] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#141B2D] border border-[#2FD6C8]/60 flex items-center justify-center text-[#2FD6C8] font-editorial text-sm font-bold shadow-md shadow-[#2FD6C8]/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-editorial text-base text-white font-medium">
                  {isRtl ? 'فضاء التلميذ · مدرسة الأندلس' : 'Student Hub · El Andalus'}
                </div>
                <div className="text-[10px] font-mono-tech text-[#2FD6C8]">
                  {isRtl ? 'البوابة الذكية للمهام والإنجازات' : 'Academic Quests & Achievements'}
                </div>
              </div>
            </div>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            {/* Student Persona Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-xs sm:max-w-none">
              {mockStudents.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStudentIndex(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono-tech transition-all shrink-0 ${
                    selectedStudentIndex === idx
                      ? 'bg-[#141B2D] border-[#2FD6C8] text-[#2FD6C8] shadow-sm'
                      : 'border-transparent text-[#F8F6F2]/60 hover:text-white'
                  }`}
                >
                  <img src={st.avatar} alt={st.name} className="w-5 h-5 rounded-full object-cover" />
                  <span>{st.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateScan}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-tech transition-all ${
                rfidScanned
                  ? 'bg-[#2FD6C8] text-[#0B0F1A] font-bold'
                  : 'bg-white/5 border border-white/10 text-[#2FD6C8] hover:bg-white/10'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{rfidScanned ? (isRtl ? 'تم التحقق من الشارة!' : 'Badge Verified!') : (isRtl ? 'محاكاة مسح الشارة RFID' : 'Simulate NFC Tap')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-[#F8F6F2]/70 hover:text-red-400 border border-white/10 transition-colors"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portal Navigation Tabs Bar */}
        <div className="px-6 py-2.5 bg-[#090D17] border-b border-[#2FD6C8]/15 flex items-center gap-3 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'hub', label: isRtl ? 'لوحة القيادة والموجز' : 'Student Cockpit' },
            { id: 'timetable', label: isRtl ? 'جدول الحصص الأسبوعي' : 'Weekly Timetable' },
            { id: 'quests', label: isRtl ? 'مهام الواجبات والمشاريع (XP)' : 'Homework Quests' },
            { id: 'badges', label: isRtl ? 'أوسمة الإنجاز والشارات' : 'Badges of Honor' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono-tech tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#2FD6C8] text-[#0B0F1A] font-bold shadow-sm'
                  : 'text-[#F8F6F2]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#090D18]">
          {/* TAB 1: Hub Cockpit */}
          {activeTab === 'hub' && (
            <div className="space-y-8">
              {/* Student Hero Header Banner */}
              <div className="rounded-3xl glass-panel border border-[#2FD6C8]/30 bg-gradient-to-r from-[#141B2D] via-[#0E1526] to-[#141B2D] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#2FD6C8] shadow-lg shadow-[#2FD6C8]/20 shrink-0">
                    <img src={currentStudent.avatar} alt={currentStudent.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#2FD6C8] border-2 border-[#0B0F1A]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded bg-[#2FD6C8]/10 text-[#2FD6C8] border border-[#2FD6C8]/30">
                        {currentStudent.grade}
                      </span>
                      <span className="text-xs font-mono-tech text-[#C9A24B]">
                        {currentStudent.id}
                      </span>
                    </div>
                    <h2 className="font-editorial text-2xl sm:text-3xl text-white font-medium">
                      {isRtl ? `مرحباً بك يا ${currentStudent.name}` : `Welcome back, ${currentStudent.name}`}
                    </h2>
                    <p className="font-sans-ui text-xs text-[#F8F6F2]/70 mt-1">
                      {isRtl ? 'الموقع الحالي: ' : 'Supervised in: '}
                      <span className="text-white font-medium">{currentStudent.supervisedZone}</span>
                      <span className="text-[#C9A24B] mx-2">·</span>
                      {isRtl ? 'المؤطر: ' : 'Mentor: '}
                      <span className="text-[#2FD6C8]">{currentStudent.zoneSupervisor}</span>
                    </p>
                  </div>
                </div>

                {/* Level / XP Pill */}
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[#2FD6C8]/10 border border-[#2FD6C8]/40 flex items-center justify-center text-[#2FD6C8]">
                    <Flame className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono-tech text-[#F8F6F2]/50">
                      {isRtl ? 'النقاط الأكاديمية (XP)' : 'Total XP'}
                    </div>
                    <div className="text-xl font-editorial font-bold text-white">
                      1,850 XP
                    </div>
                    <div className="text-[10px] text-[#2FD6C8] font-mono-tech">
                      {isRtl ? 'المستوى 06 · مفكر متقدم' : 'Level 06 · Advanced Scholar'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Grid: Today's Schedule + Active Quests + Badges Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Schedule Today */}
                <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#0E1526]/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono-tech text-[#2FD6C8] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {isRtl ? 'حصص اليوم الدراسي' : "Today's Timetable"}
                      </span>
                      <button
                        onClick={() => setActiveTab('timetable')}
                        className="text-[11px] font-mono-tech text-[#C9A24B] hover:underline"
                      >
                        {isRtl ? 'عرض الجدول كاملاً ←' : 'View Full Schedule →'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      {mockTimetable.slice(0, 3).map((slot, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                          <div className="flex justify-between text-[11px] font-mono-tech mb-1">
                            <span className="text-[#C9A24B]">{slot.period}</span>
                            <span className="text-[#F8F6F2]/50">{slot.room}</span>
                          </div>
                          <div className="text-sm font-editorial text-white">{slot.subject}</div>
                          <div className="text-[11px] text-[#2FD6C8] font-sans-ui mt-0.5">{slot.teacher}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-xs text-[#F8F6F2]/50 font-mono-tech">
                    {isRtl ? 'استراحة الغداء مع الشيف: 12:30 زوالاً' : 'Lunch break at 12:30 PM'}
                  </div>
                </div>

                {/* 2. Homework Quests Progress */}
                <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#0E1526]/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono-tech text-[#C9A24B] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {isRtl ? 'المشاريع والواجبات النشطة' : 'Active Quests'}
                      </span>
                      <button
                        onClick={() => setActiveTab('quests')}
                        className="text-[11px] font-mono-tech text-[#2FD6C8] hover:underline"
                      >
                        {isRtl ? 'كل المهام ←' : 'All Quests →'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      {mockHomework.map((hw) => (
                        <div key={hw.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-editorial text-white">{hw.title}</span>
                            <span className="text-[11px] font-mono-tech text-[#2FD6C8]">+{hw.xpReward} XP</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#F8F6F2]/60">
                            <span>{hw.subject}</span>
                            <span className={hw.status === 'completed' ? 'text-[#2FD6C8]' : 'text-[#C9A24B]'}>
                              {hw.dueDate}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-xs text-[#2FD6C8] font-mono-tech">
                    {isRtl ? '✓ تسليم الواجبات يتم بنقرة واحدة' : '1-click submission ready'}
                  </div>
                </div>

                {/* 3. Badges Showcase */}
                <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#0E1526]/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono-tech text-[#2FD6C8] flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        {isRtl ? 'أوسمة الإنجاز الأخيرة' : 'Earned Badges'}
                      </span>
                      <button
                        onClick={() => setActiveTab('badges')}
                        className="text-[11px] font-mono-tech text-[#C9A24B] hover:underline"
                      >
                        {isRtl ? 'عرض الخزانة ←' : 'View Trophy Case →'}
                      </button>
                    </div>

                    <div className="space-y-3">
                      {mockBadges.map((b) => (
                        <div key={b.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                            style={{
                              backgroundColor: `${b.color}15`,
                              borderColor: `${b.color}40`,
                              color: b.color,
                            }}
                          >
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-editorial text-white font-medium">{b.title}</div>
                            <div className="text-[10px] text-[#F8F6F2]/60 line-clamp-1">{b.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-xs text-[#C9A24B] font-mono-tech">
                    {isRtl ? 'مستمر في حصد الشارات!' : 'Active streak maintained'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Full Weekly Timetable */}
          {activeTab === 'timetable' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-2xl text-white">
                    {isRtl ? 'جدول التوزيع البيداغوجي الأسبوعي' : 'Weekly Timetable'}
                  </h3>
                  <p className="font-sans-ui text-xs text-[#F8F6F2]/70">
                    {isRtl ? 'موزع وفق وتيرة التركيز البيولوجي للتلاميذ' : 'Circadian synchronized schedule'}
                  </p>
                </div>
                <div className="text-xs font-mono-tech text-[#2FD6C8] px-3 py-1 rounded-xl bg-white/5 border border-white/10">
                  {currentStudent.grade}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-[#C9A24B] font-mono-tech text-start">
                      <th className="p-3.5 text-start">{isRtl ? 'اليوم' : 'Day'}</th>
                      <th className="p-3.5 text-start">{isRtl ? 'التوقيت' : 'Period'}</th>
                      <th className="p-3.5 text-start">{isRtl ? 'المادة البيداغوجية' : 'Subject'}</th>
                      <th className="p-3.5 text-start">{isRtl ? 'الأستاذ المؤطر' : 'Instructor'}</th>
                      <th className="p-3.5 text-start">{isRtl ? 'الفضاء / المختبر' : 'Room / Atelier'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {mockTimetable.map((slot, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-bold text-white">{slot.day}</td>
                        <td className="p-3.5 font-mono-tech text-[#2FD6C8]">{slot.period}</td>
                        <td className="p-3.5 font-editorial text-sm text-white">{slot.subject}</td>
                        <td className="p-3.5 text-[#F8F6F2]/80">{slot.teacher}</td>
                        <td className="p-3.5 font-mono-tech text-[#C9A24B]">{slot.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Homework Quests */}
          {activeTab === 'quests' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="font-editorial text-2xl text-white">
                  {isRtl ? 'مغامرات الواجبات والمشاريع المفتوحة' : 'Homework & Research Quests'}
                </h3>
                <p className="font-sans-ui text-xs text-[#F8F6F2]/70">
                  {isRtl ? 'أكمل المهام الموكلة إليك واكسب نقاط الخبرة والشارات' : 'Complete quests to earn XP and level up your scholar ranking.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockHomework.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#0E1526]/90 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded bg-[#2FD6C8]/10 text-[#2FD6C8] border border-[#2FD6C8]/30">
                          {hw.subject}
                        </span>
                        <span className="text-xs font-mono-tech text-[#C9A24B] font-bold">
                          +{hw.xpReward} XP
                        </span>
                      </div>

                      <h4 className="font-editorial text-lg text-white mb-2">
                        {hw.title}
                      </h4>

                      <p className="text-xs font-mono-tech text-[#F8F6F2]/60 mb-6">
                        {isRtl ? 'الموعد الأخير للتسليم:' : 'Deadline:'} <span className="text-white">{hw.dueDate}</span>
                      </p>
                    </div>

                    <button
                      className={`w-full py-2.5 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                        hw.status === 'completed'
                          ? 'bg-[#2FD6C8]/20 text-[#2FD6C8] border border-[#2FD6C8]/40'
                          : 'bg-[#C9A24B] text-[#0B0F1A] font-bold'
                      }`}
                    >
                      {hw.status === 'completed' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#2FD6C8]" />
                          <span>{isRtl ? 'تم الإنجاز والتقييم' : 'Completed'}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>{isRtl ? 'تسليم الواجب الآن' : 'Submit Quest Work'}</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Badges of Honor */}
          {activeTab === 'badges' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="font-editorial text-2xl text-white">
                  {isRtl ? 'خزانة الأوسمة والشارات التكريمية' : 'Trophy Case & Badges'}
                </h3>
                <p className="font-sans-ui text-xs text-[#F8F6F2]/70">
                  {isRtl ? 'أوسمة تُمنح للتلاميذ المتميزين في الفصاحة، البحث، التعاون، والأخلاق' : 'Official badges awarded for outstanding ethical and academic milestones.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#0E1526]/90 text-center flex flex-col items-center justify-between"
                  >
                    <div>
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-lg"
                        style={{
                          backgroundColor: `${badge.color}15`,
                          borderColor: `${badge.color}50`,
                          color: badge.color,
                        }}
                      >
                        <Award className="w-8 h-8" />
                      </div>

                      <h4 className="font-editorial text-xl text-white mb-2">
                        {badge.title}
                      </h4>

                      <p className="font-sans-ui text-xs text-[#F8F6F2]/75 leading-relaxed mb-6">
                        {badge.description}
                      </p>
                    </div>

                    <div className="text-[11px] font-mono-tech text-[#C9A24B]">
                      {isRtl ? 'تاريخ التتويج:' : 'Awarded on:'} {badge.dateEarned}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
