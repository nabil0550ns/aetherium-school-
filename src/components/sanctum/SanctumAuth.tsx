import React, { useState } from 'react';
import { Lock, Unlock, Shield, ScanFace, Fingerprint } from 'lucide-react';

interface SanctumAuthProps {
  onAuthenticated: () => void;
  onCancel: () => void;
}

export const SanctumAuth: React.FC<SanctumAuthProps> = ({ onAuthenticated, onCancel }) => {
  const [authStep, setAuthStep] = useState<'biometric' | 'otp' | 'handshake'>('biometric');
  const [otpCode, setOtpCode] = useState<string>('');
  const [isScanningBiometric, setIsScanningBiometric] = useState<boolean>(false);
  const [handshakeProgress, setHandshakeProgress] = useState<number>(0);

  const handleTriggerBiometric = () => {
    setIsScanningBiometric(true);
    setTimeout(() => {
      setIsScanningBiometric(false);
      setAuthStep('otp');
      setOtpCode('882901'); // Pre-filled VIP OTP for frictionless review
    }, 1300);
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
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      {/* Padlock Morph Graphic */}
      <div className="relative mb-8">
        <div
          className={`w-20 h-20 rounded-3xl bg-[#141B2D] border flex items-center justify-center transition-all duration-700 ${
            authStep === 'handshake'
              ? 'border-[#4DE1FF] shadow-[0_0_35px_rgba(77,225,255,0.4)]'
              : 'border-[#C9A876]/40 shadow-[0_0_20px_rgba(201,168,118,0.2)]'
          }`}
        >
          {authStep === 'handshake' ? (
            <Lock className="w-10 h-10 text-[#4DE1FF] transition-transform duration-500 scale-110" />
          ) : (
            <Unlock className="w-10 h-10 text-[#C9A876]" />
          )}
        </div>
        <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#0B0F1A] border border-[#C9A876]/40 text-[#C9A876]">
          <Shield className="w-4 h-4" />
        </span>
      </div>

      <div className="mb-8">
        <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
          Aetherium Sovereign Cryptographic Gateway
        </span>
        <h3 className="font-editorial text-3xl text-white font-medium mt-1">
          Sanctum Access Protocol
        </h3>
        <p className="text-xs text-[#F7F5F1]/70 mt-2 font-sans-ui leading-relaxed">
          Bank-grade multi-factor biometric authentication required to access private child telemetry and air-gapped developmental logs.
        </p>
      </div>

      {authStep === 'biometric' && (
        <div className="w-full space-y-6">
          <div
            onClick={handleTriggerBiometric}
            className={`p-6 rounded-2xl bg-[#141B2D] border cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 group ${
              isScanningBiometric
                ? 'border-[#4DE1FF] shadow-[0_0_25px_rgba(77,225,255,0.4)]'
                : 'border-[#C9A876]/30 hover:border-[#4DE1FF]'
            }`}
          >
            <div className="relative">
              <ScanFace
                className={`w-14 h-14 ${
                  isScanningBiometric ? 'text-[#4DE1FF] animate-pulse' : 'text-[#C9A876] group-hover:text-[#4DE1FF]'
                }`}
              />
              {isScanningBiometric && (
                <div className="absolute inset-0 rounded-full border-2 border-[#4DE1FF] animate-ping" />
              )}
            </div>
            <div className="text-xs font-mono-tech text-white">
              {isScanningBiometric ? 'Authenticating Biometric Key...' : 'Tap for Biometric / FaceID Scan'}
            </div>
            <div className="text-[10px] text-[#F7F5F1]/50 font-sans-ui">
              Simulated Hardware Key Validation
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] font-mono-tech text-[#C9A876]">
            <Fingerprint className="w-3.5 h-3.5" />
            <span>Hardware Enclave Ready (FIPS 140-3 Level 4)</span>
          </div>
        </div>
      )}

      {authStep === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="w-full space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech mb-2">
              <span className="text-[#C9A876]">SECURE OTP DISPATCHED</span>
              <span className="text-emerald-400">Pre-filled VIP Code</span>
            </div>
            <input
              type="text"
              required
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="w-full bg-[#141B2D] border border-[#C9A876]/40 rounded-xl px-4 py-3 text-center text-xl font-mono-tech tracking-[0.4em] text-white focus:outline-none focus:border-[#4DE1FF]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A876] to-[#dfc79b] text-[#0B0F1A] font-semibold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(77,225,255,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5 text-[#0B0F1A]" />
            Establish Encrypted Handshake
          </button>
        </form>
      )}

      {authStep === 'handshake' && (
        <div className="w-full space-y-4">
          <div className="w-full bg-[#141B2D] h-2 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-[#C9A876] to-[#4DE1FF] h-full transition-all duration-300"
              style={{ width: `${handshakeProgress}%` }}
            />
          </div>
          <div className="text-xs font-mono-tech text-[#4DE1FF] animate-pulse">
            Establishing Quantum-Resistant TLS 1.3 Tunnel... {handshakeProgress}%
          </div>
          <div className="text-[10px] font-mono-tech text-[#F7F5F1]/50">
            Node #09 · Zero Cloud Interception Verified
          </div>
        </div>
      )}

      <button
        onClick={onCancel}
        className="mt-8 text-xs font-mono-tech text-[#F7F5F1]/50 hover:text-white transition-colors"
      >
        Cancel & Exit Sanctum
      </button>
    </div>
  );
};
