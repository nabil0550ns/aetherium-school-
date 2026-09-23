import { useState, useRef, type MouseEvent, type TouchEvent } from 'react';
import { FileSignature } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { AdministrativeSummons } from '../../types';

interface SanctumSummonsProps {
  initialSummons: AdministrativeSummons;
}

export const SanctumSummons = ({ initialSummons }: SanctumSummonsProps) => {
  const [summonsData, setSummonsData] = useState<AdministrativeSummons>(initialSummons);
  const [showWaxSealAnimation, setShowWaxSealAnimation] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);

  const startDrawing = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.strokeStyle = '#C9A876';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleAffixSignature = () => {
    setShowWaxSealAnimation(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#C9A876', '#8F7249', '#F7F5F1'],
      });
    } catch {}

    setTimeout(() => {
      setSummonsData({
        ...summonsData,
        status: 'signed',
        signedTimestamp: 'September 23, 2026 · 11:42 AM GMT',
        hashVerification: 'SHA256: 7f89d3119aa01824bba72110c4d9',
      });
      setShowWaxSealAnimation(false);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="p-8 sm:p-10 rounded-3xl bg-[#101626] border border-[#C9A876]/40 shadow-2xl relative overflow-hidden">
        {/* Animated Wax-Seal Stamp Overlay */}
        {showWaxSealAnimation && (
          <div className="absolute inset-0 z-50 bg-[#0B0F1A]/85 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#8F1D1D] to-[#5A0F0F] border-4 border-[#C9A876] flex items-center justify-center shadow-[0_0_50px_rgba(201,168,118,0.6)] animate-bounce">
              <span className="font-editorial text-3xl text-[#C9A876] font-bold">Æ</span>
            </div>
            <div className="mt-4 font-editorial text-xl text-white">Affixing Sovereign Document Seal...</div>
            <div className="text-xs font-mono-tech text-[#C9A876] mt-1">Recording to Air-Gapped Ledger</div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C9A876]/20 mb-6">
          <div>
            <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-[#C9A876]">
              Official Sovereign Instrument · {summonsData.id}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium mt-1">
              {summonsData.title}
            </h3>
            <p className="text-xs font-mono-tech text-[#F7F5F1]/60 mt-1">
              Issued by {summonsData.issuingOfficer} · {summonsData.dateIssued}
            </p>
          </div>

          <div className="shrink-0">
            <span className={`px-3 py-1 rounded-full text-xs font-mono-tech uppercase ${
              summonsData.status === 'signed'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse'
            }`}>
              {summonsData.status === 'signed' ? 'Executed Deed' : 'Signature Required'}
            </span>
          </div>
        </div>

        {/* Legal Clauses */}
        <div className="space-y-4 mb-8 text-xs sm:text-sm font-sans-ui text-[#F7F5F1]/80 leading-relaxed bg-[#0B0F1A] p-6 rounded-2xl border border-white/5">
          <p className="font-semibold text-[#C9A876] font-editorial text-base">
            Summary of Instrument:
          </p>
          <p>{summonsData.legalSummary}</p>
          <div className="border-t border-white/5 pt-4 space-y-2">
            {summonsData.fullTerms.map((term, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#C9A876] font-mono-tech">0{i + 1}.</span>
                <span>{term}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signature Interaction Pad */}
        {summonsData.status === 'pending' ? (
          <div className="p-6 rounded-2xl bg-[#0B0F1A] border border-[#C9A876]/30">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono-tech text-[#C9A876]">
                Affix Digital Holographic Signature (Draw with mouse or stylus)
              </label>
              <button
                onClick={clearSignature}
                className="text-[11px] font-mono-tech text-[#F7F5F1]/50 hover:text-white"
              >
                Clear Signature Pad
              </button>
            </div>

            <canvas
              ref={sigCanvasRef}
              width={600}
              height={120}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-28 bg-[#141B2D] border border-dashed border-[#C9A876]/40 rounded-xl cursor-crosshair touch-none"
            />

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] font-mono-tech text-[#F7F5F1]/50">
                By signing, you execute this deed with legally binding authority under Aetherium Covenant.
              </div>
              <button
                onClick={handleAffixSignature}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#C9A876] to-[#dfc79b] text-[#0B0F1A] font-semibold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_25px_rgba(77,225,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <FileSignature className="w-4 h-4 text-[#0B0F1A]" />
                Affix Sovereign E-Signature & Seal
              </button>
            </div>
          </div>
        ) : (
          /* Executed Deed Verification State */
          <div className="p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8F1D1D] border-2 border-[#C9A876] flex items-center justify-center text-[#C9A876] font-editorial text-lg font-bold shadow-md">
                Æ
              </div>
              <div>
                <div className="font-editorial text-base text-white">Deed Formally Executed & Wax-Sealed</div>
                <div className="text-xs font-mono-tech text-emerald-400">{summonsData.signedTimestamp}</div>
                <div className="text-[10px] font-mono-tech text-[#F7F5F1]/40">{summonsData.hashVerification}</div>
              </div>
            </div>
            <span className="text-xs font-mono-tech text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              Air-Gapped Audit Passed
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
