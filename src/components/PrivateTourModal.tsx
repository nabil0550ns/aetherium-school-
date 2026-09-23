import { useState, type FormEvent } from 'react';
import { X, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PrivateTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateTourModal = ({ isOpen, onClose }: PrivateTourModalProps) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [childAge, setChildAge] = useState('4');
  const [selectedPillar, setSelectedPillar] = useState<'Preparatory (Ages 3–5)' | 'Primary (Ages 6–10)' | 'Middle School (Ages 11–14)'>('Preparatory (Ages 3–5)');
  const [preferredDate, setPreferredDate] = useState('2026-10-15');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep('confirmed');

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A876', '#4DE1FF', '#F7F5F1'],
      });
    } catch {
      // fallback safe
    }
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B0F1A]/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-[#C9A876]/40 p-8 sm:p-10 shadow-2xl bg-[#0F1424] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[#F7F5F1]/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
                VIP Private Sanctuary Experience
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium mt-1">
                Reserve an Attuned Campus Tour
              </h3>
              <p className="font-sans-ui text-xs sm:text-sm text-[#F7F5F1]/70 mt-2">
                A private, 60-minute walking dialogue through our living atriums while active classes are in session. Includes tailored consultation with our Academic Provost.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono-tech text-[#C9A876] block mb-1">
                    Parent / Guardian Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Eleanor Sterling"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4DE1FF] font-sans-ui"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono-tech text-[#C9A876] block mb-1">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sterling@capital.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4DE1FF] font-sans-ui"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono-tech text-[#C9A876] block mb-1">
                    Direct Telephone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4DE1FF] font-sans-ui"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono-tech text-[#C9A876] block mb-1">
                    Academic Pillar of Interest
                  </label>
                  <select
                    value={selectedPillar}
                    onChange={(e: any) => setSelectedPillar(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4DE1FF] font-sans-ui"
                  >
                    <option value="Preparatory (Ages 3–5)">Preparatory (Ages 3–5)</option>
                    <option value="Primary (Ages 6–10)">Primary (Ages 6–10)</option>
                    <option value="Middle School (Ages 11–14)">Middle School (Ages 11–14)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono-tech text-[#C9A876] block mb-1">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4DE1FF] font-sans-ui"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono-tech text-[#C9A876] block mb-1">
                    Child Age at Entry
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="14"
                    required
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full bg-[#141B2D] border border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4DE1FF] font-sans-ui"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono-tech text-[#C9A876] block mb-1">
                  Specific Intellectual Interests or Sensitivities
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Fascinated by botanical patterns; sensory sensitive to harsh overhead lighting."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#141B2D] border border-[#C9A876]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#4DE1FF] font-sans-ui"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A876] via-[#dfc79b] to-[#C9A876] text-[#0B0F1A] font-semibold text-xs uppercase tracking-wider shadow-[0_10px_30px_rgba(201,168,118,0.3)] hover:shadow-[0_15px_40px_rgba(77,225,255,0.4)] transition-all flex items-center justify-center gap-2 cognition-interactive"
                >
                  <Sparkles className="w-4 h-4 text-[#0B0F1A]" />
                  Confirm Private Sanctuary Tour Itinerary
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono-tech text-[#F7F5F1]/50 text-center pt-2">
                <Shield className="w-3.5 h-3.5 text-[#C9A876]" />
                Protected under Aetherium Sovereign Confidentiality Trust
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
              VIP Itinerary Confirmed · Protocol #ATH-2026-TOUR
            </span>
            <h3 className="font-editorial text-3xl text-white font-medium mt-2 mb-4">
              We Await Your Family
            </h3>
            <p className="font-sans-ui text-sm text-[#F7F5F1]/80 max-w-md mx-auto leading-relaxed mb-6">
              Thank you, <span className="text-[#C9A876] font-medium">{parentName || 'Esteemed Parent'}</span>. A confidential itinerary and security pass for <span className="text-white font-medium">{selectedPillar}</span> on <span className="text-[#4DE1FF] font-medium">{preferredDate}</span> has been transmitted to <span className="text-white">{parentEmail || 'your email'}</span>.
            </p>

            <div className="p-4 rounded-2xl bg-[#141B2D] border border-[#C9A876]/30 max-w-md mx-auto text-left mb-6 space-y-2 text-xs font-mono-tech">
              <div className="flex items-center justify-between text-[#C9A876]">
                <span>SANCTUARY CONCIERGE:</span>
                <span className="text-white">Dame Eleanor Vance</span>
              </div>
              <div className="flex items-center justify-between text-[#C9A876]">
                <span>ARRIVAL PROTOCOL:</span>
                <span className="text-white">Valet West Gate · 9:15 AM</span>
              </div>
              <div className="flex items-center justify-between text-[#C9A876]">
                <span>AIR PURITY CLEARANCE:</span>
                <span className="text-emerald-400">Class 100 Verified</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3 rounded-xl bg-[#C9A876] text-[#0B0F1A] font-semibold text-xs uppercase tracking-wider hover:bg-[#dfc79b] transition-all"
            >
              Return to Presentation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
