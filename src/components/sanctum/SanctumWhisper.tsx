import { useState, type FormEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';
import type { TouchpointLog, Student } from '../../types';

interface SanctumWhisperProps {
  currentStudent: Student;
  initialLogs: TouchpointLog[];
}

export const SanctumWhisper = ({ currentStudent, initialLogs }: SanctumWhisperProps) => {
  const [whisperMessage, setWhisperMessage] = useState<string>('');
  const [whisperHistory, setWhisperHistory] = useState<TouchpointLog[]>(initialLogs);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleSendWhisper = (e: FormEvent) => {
    e.preventDefault();
    if (!whisperMessage.trim()) return;

    const newLog: TouchpointLog = {
      id: `tp-${Date.now()}`,
      studentId: currentStudent.id,
      timestamp: 'Just now',
      educatorName: 'Dr. Clara Beauchamp (Direct Channel)',
      educatorRole: 'Director of Early Childhood Discovery',
      category: 'curiosity',
      note: whisperMessage,
      empathyScore: 99,
      encryptedReceipt: 'SHA256: e839a9c2...verified',
    };

    setWhisperHistory([newLog, ...whisperHistory]);
    setWhisperMessage('');
  };

  const filteredLogs = whisperHistory.filter((tp) => {
    if (categoryFilter === 'all') return true;
    return tp.category === categoryFilter;
  });

  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* Whisper Channel Interactive Live Micro-Composer */}
      <div className="p-6 rounded-3xl bg-[#101626] border border-[#C9A876]/30 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
              The Whisper Channel™ Protocol
            </span>
            <h4 className="font-editorial text-2xl text-white mt-0.5">
              Direct Attuned Educator Comms
            </h4>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono-tech text-emerald-400">
              Empathy Filter Active · 99%
            </span>
          </div>
        </div>

        <form onSubmit={handleSendWhisper}>
          <textarea
            value={whisperMessage}
            onChange={(e) => setWhisperMessage(e.target.value)}
            placeholder={`Inquire directly with ${currentStudent.zoneSupervisor} regarding today's sensory patterns...`}
            rows={2}
            className="w-full bg-[#0B0F1A] border border-[#C9A876]/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#4DE1FF] font-sans-ui"
          />

          {/* Live Waveform Indicator */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#4DE1FF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Constructive Tone Filter Verified</span>
            </div>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#C9A876] hover:bg-[#dfc79b] text-[#0B0F1A] font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Transmit Secure Note
            </button>
          </div>
        </form>
      </div>

      {/* Filterable Chronological Touchpoint Timeline */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h4 className="font-editorial text-xl text-white">Chronological Touchpoint Log</h4>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['all', 'curiosity', 'milestone', 'empathy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono-tech uppercase tracking-wider transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#C9A876] text-[#0B0F1A] font-semibold'
                    : 'bg-white/5 text-[#F7F5F1]/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredLogs.map((tp) => (
            <div
              key={tp.id}
              className="p-5 rounded-2xl bg-[#101626]/80 border border-[#C9A876]/20 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono-tech text-[#C9A876]">{tp.educatorName}</span>
                  <span className="text-[10px] text-[#F7F5F1]/40 font-sans-ui">({tp.educatorRole})</span>
                </div>
                <span className="text-[10px] font-mono-tech text-[#F7F5F1]/50">{tp.timestamp}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#F7F5F1]/85 font-sans-ui leading-relaxed my-2">
                {tp.note}
              </p>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-tech text-[#F7F5F1]/50">
                <span className="text-emerald-400">Empathy Attunement: {tp.empathyScore}%</span>
                <span>{tp.encryptedReceipt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
