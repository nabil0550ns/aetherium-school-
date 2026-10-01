import React, { useState } from 'react';
import { Lock, Unlock, Shield, ScanFace, Fingerprint } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SanctumAuthProps {
  onAuthenticated: () => void;
  onCancel: () => void;
}

export const SanctumAuth: React.FC<SanctumAuthProps> = ({ onAuthenticated, onCancel }) => {
  const { isRtl } = useLanguage();
  const [authStep, setAuthStep] = useState<'biometric' | 'otp' | 'handshake'>('biometric');
  const [otpCode, setOtpCode] = useState<string>('');
  const [isScanningBiometric, setIsScanningBiometric] = useState<boolean>(false);
  const [handshakeProgress, setHandshakeProgress] = useState<number>(0);

  const handleTriggerBiometric = () => {
    setIsScanningBiometric(true);
    setTimeout(() => {
      setIsScanningBiometric(false);
      setAuthStep('otp');
      setOtpCode('882901'); // Pre-filled OTP for frictionless review
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStep('handshake');

    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      setHandshakeProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onAuthenticated();
        }, 400);
      }
    }, 180);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* Padlock Morph Graphic */}
      <div className="relative mb-8">
        <div
          className={`w-20 h-20 rounded-3xl bg-[#141B2D] border flex items-center justify-center transition-all duration-700 ${
            authStep === 'handshake'
              ? 'border-[#2FD6C8] shadow-[0_0_35px_rgba(47,214,200,0.4)]'
              : 'border-[#C9A24B]/40 shadow-[0_0_20px_rgba(201,162,75,0.2)]'
          }`}
        >
          {authStep === 'handshake' ? (
            <Lock className="w-10 h-10 text-[#2FD6C8] transition-transform duration-500 scale-110" />
          ) : (
            <Unlock className="w-10 h-10 text-[#C9A24B]" />
          )}
        </div>
        <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#0B0F1A] border border-[#C9A24B]/40 text-[#C9A24B]">
          <Shield className="w-4 h-4" />
        </span>
      </div>

      <span className="text-xs font-mono-tech tracking-[0.25em] text-[#C9A24B] uppercase mb-2">
        {isRtl ? 'البوابة المشفرة لفضاء الولي' : 'Parent Sanctum Node #09'}
      </span>

      <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal mb-3">
        {isRtl ? 'تسجيل الدخول الآمن' : 'Sovereign Verification'}
      </h3>

      <p className="font-sans-ui text-xs sm:text-sm text-[#F8F6F2]/70 leading-relaxed mb-8">
        {isRtl
          ? 'نظام دخول مشفر بتقنيات بنكية محلية يضمن خصوصية وسرية السجلات التربوية والبيومترية لأبنائكم.'
          : 'Air-gapped verification terminal. All biometric identity checks processed locally with zero public cloud telemetry.'}
      </p>

      {/* STEP 1: Biometric Verification */}
      {authStep === 'biometric' && (
        <div className="w-full space-y-4 animate-in fade-in duration-300">
          <button
            onClick={handleTriggerBiometric}
            disabled={isScanningBiometric}
            className="w-full py-4 rounded-2xl bg-[#141B2D] border border-[#C9A24B]/40 hover:border-[#2FD6C8] text-white flex items-center justify-center gap-3 transition-all duration-300 group shadow-lg"
          >
            {isScanningBiometric ? (
              <ScanFace className="w-6 h-6 text-[#2FD6C8] animate-spin" />
            ) : (
              <Fingerprint className="w-6 h-6 text-[#C9A24B] group-hover:text-[#2FD6C8] transition-colors" />
            )}
            <span className="font-mono-tech text-xs tracking-wider uppercase">
              {isScanningBiometric
                ? (isRtl ? 'جاري التحقق البيومتري الموضعي...' : 'Calibrating Biometric Signature...')
                : (isRtl ? 'المصادقة بالبصمة / معرف الوجه' : 'Simulate Biometric Face / TouchID')}
            </span>
          </button>

          <button
            onClick={() => setAuthStep('otp')}
            className="text-xs font-mono-tech text-[#C9A24B] hover:underline"
          >
            {isRtl ? 'أو الدخول عبر رمز التوثيق السريع (OTP) ←' : 'Or bypass via VIP One-Time Passcode →'}
          </button>
        </div>
      )}

      {/* STEP 2: One-Time Passcode */}
      {authStep === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="w-full space-y-4 animate-in fade-in duration-300">
          <div className="relative">
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="000-000"
              maxLength={6}
              className="w-full py-3.5 px-4 text-center font-mono-tech text-xl tracking-[0.4em] bg-white/5 border border-[#C9A24B]/40 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-[#2FD6C8] transition-colors"
            />
            <span className="absolute -bottom-5 left-0 right-0 text-[10px] font-mono-tech text-[#2FD6C8]">
              {isRtl ? 'تم إدخال الرمز التجريبي المسبق بنجاح: 882901' : 'Demo Passkey pre-populated: 882901'}
            </span>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#C9A24B] hover:bg-[#d6b059] text-[#0B0F1A] font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#C9A24B]/20"
            >
              {isRtl ? 'تأكيد الدخول لفضاء الولي' : 'Authenticate Vault Session'}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Cryptographic Handshake Animation */}
      {authStep === 'handshake' && (
        <div className="w-full space-y-4 animate-in fade-in duration-300">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C9A24B] to-[#2FD6C8] transition-all duration-200"
              style={{ width: `${handshakeProgress}%` }}
            />
          </div>
          <div className="text-xs font-mono-tech text-[#2FD6C8] flex items-center justify-center gap-2">
            <span>{isRtl ? 'مصافحة تشفيرية محلية SHA-256...' : 'Securing sovereign local handshake...'}</span>
            <span>{handshakeProgress}%</span>
          </div>
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-[#C9A24B]/15 w-full flex items-center justify-between text-xs font-mono-tech text-[#F8F6F2]/40">
        <span>مدرسة الأندلس</span>
        <button onClick={onCancel} className="hover:text-white transition-colors">
          {isRtl ? 'إلغاء' : 'Cancel'}
        </button>
      </div>
    </div>
  );
};
