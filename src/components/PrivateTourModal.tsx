import { useState, type FormEvent } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

interface PrivateTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateTourModal = ({ isOpen, onClose }: PrivateTourModalProps) => {
  const { isRtl } = useLanguage();
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [phone, setPhone] = useState('+213 ');
  const [childAge, setChildAge] = useState('4');
  const [selectedPillar, setSelectedPillar] = useState<'preparatory' | 'primary' | 'middle'>('preparatory');
  const [preferredDate, setPreferredDate] = useState('2026-10-15');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep('confirmed');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A24B', '#2FD6C8', '#F8F6F2'],
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
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-[#C9A24B]/40 p-8 sm:p-10 shadow-2xl bg-[#0F1424] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[#F8F6F2]/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A24B]">
                {isRtl ? 'حجز موعد استكشافي خاص' : 'VIP Private Campus Walkthrough'}
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl text-white font-normal mt-1">
                {isRtl ? (
                  <>اكتشف صرح <span className="italic text-[#C9A24B]">مدرسة الأندلس</span></>
                ) : (
                  <>Experience <span className="italic text-[#C9A24B]">El Andalus</span></>
                )}
              </h3>
              <p className="font-sans-ui text-xs sm:text-sm text-[#F8F6F2]/70 mt-2">
                {isRtl
                  ? 'جولة ميدانية هادئة للأولياء تشمل البهو البيولوجي، ومختبرات الروبوتات والموائع، واللقاء المباشر مع الطاقم البيداغوجي.'
                  : 'A bespoke 60-minute walkthrough through our living atriums, science labs, and pedagogical council.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-[#C9A24B] mb-1.5">
                    {isRtl ? 'اسم ولقب الولي *' : 'Parent Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder={isRtl ? 'د. سليم بلحاج' : 'Dr. Salim Belhadj'}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-[#C9A24B] mb-1.5">
                    {isRtl ? 'البريد الإلكتروني *' : 'Parent Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    placeholder="parent@algeria.dz"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-[#C9A24B] mb-1.5">
                    {isRtl ? 'رقم الهاتف (+213) *' : 'Phone Number (+213) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-[#C9A24B] mb-1.5">
                    {isRtl ? 'الطور المستهدف (3–14 فقط) *' : 'Target Pillar (Ages 3–14 Only) *'}
                  </label>
                  <select
                    value={selectedPillar}
                    onChange={(e) => setSelectedPillar(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#141B2D] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A24B]"
                  >
                    <option value="preparatory">{isRtl ? 'الطور التحضيري (3–5 سنوات)' : 'Preparatory (Ages 3–5)'}</option>
                    <option value="primary">{isRtl ? 'الطور الابتدائي (6–10 سنوات)' : 'Primary (Ages 6–10)'}</option>
                    <option value="middle">{isRtl ? 'الطور المتوسط (11–14 سنة)' : 'Middle School (Ages 11–14)'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-[#C9A24B] mb-1.5">
                    {isRtl ? 'عمر الطفل حالياً' : 'Child Age'}
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="14"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-[#C9A24B] mb-1.5">
                    {isRtl ? 'التاريخ المفضل للزيارة' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-[#C9A24B] mb-1.5">
                  {isRtl ? 'اهتمامات خاصة أو ملاحظات استكشافية' : 'Areas of Inquiry or Notes'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isRtl ? 'أي جوانب تودون التركيز عليها أثناء الجولة...' : 'Particular interests (robotics, languages, arts)...'}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#C9A24B] resize-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#2FD6C8]/10 border border-[#2FD6C8]/25 text-[11px] font-mono-tech text-[#2FD6C8]">
                {isRtl
                  ? '🔒 خصوصية كاملة: لا تشمل الجولات أي تصوير إعلامي، مع احترام خصوصية التلاميذ داخل الحرم.'
                  : '🔒 Confidentiality: Private walkthroughs adhere to strict campus privacy protocols.'}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#C9A24B] hover:bg-[#d6b059] text-[#0B0F1A] font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#C9A24B]/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isRtl ? 'تأكيد حجز الموعد الاستكشافي' : 'Confirm Tour Request'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-10 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#2FD6C8]/10 border border-[#2FD6C8] text-[#2FD6C8] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="font-editorial text-2xl sm:text-3xl text-white">
              {isRtl ? 'تم تأكيد موعدكم الاستكشافي!' : 'VIP Tour Reservation Logged'}
            </h4>

            <p className="font-sans-ui text-sm text-[#F8F6F2]/75 max-w-md mx-auto leading-relaxed">
              {isRtl
                ? `شكراً لك ${parentName || 'سيدي/سيدتي'}. لقد تم حجز الموعد بتاريخ ${preferredDate}. سيتصل بكم منسق الاستقبال لتأكيد بطاقة الدخول إلى الحرم المدرسي.`
                : `Thank you, ${parentName || 'esteemed parent'}. Your visit has been slotted for ${preferredDate}. An admissions advisor will confirm your campus pass.`}
            </p>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="px-8 py-2.5 rounded-xl bg-[#C9A24B] text-[#0B0F1A] font-bold text-xs font-mono-tech tracking-wider uppercase"
              >
                {isRtl ? 'العودة للموقع' : 'Return to Site'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
