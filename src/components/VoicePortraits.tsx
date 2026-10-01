import { useState } from 'react';
import { Play, Pause, Sparkles, Quote } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';
import { TiltCard } from './TiltCard';
import { useLanguage } from '../context/LanguageContext';

export const VoicePortraits = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { isRtl } = useLanguage();

  const toggleAudio = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="voices" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A876]/15 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#C9A876]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A876]/30 text-[#C9A876] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A876]" />
            {isRtl ? 'شهادات أولياء الأمور والتوثيق' : 'Parent Perspectives & Verification'}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6">
            {isRtl ? (
              <>أصوات من <span className="italic text-[#C9A876]">مجتمع الأندلس</span></>
            ) : (
              <>Cinematic <span className="italic text-[#C9A876]">Voice Portraits</span></>
            )}
          </h2>
          <p className="font-sans-ui text-[#F7F5F1]/75 text-base sm:text-lg leading-relaxed">
            {isRtl
              ? 'انطباعات وتجارب حية من نخبة أولياء الأمور (أطباء، مهندسون، وأكاديميون) وجد أبناؤهم في مدرسة الأندلس البيئة الفكرية والتربوية المثلى لتفجير طاقاتهم الإبداعية.'
              : 'Reflections from leaders across neurosurgery, technology, and academia whose children have found their true intellectual home within our sanctuary.'}
          </p>
        </div>

        {/* Voice Portrait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map((item) => {
            const isPlaying = playingId === item.id;
            return (
              <TiltCard
                key={item.id}
                className="group rounded-3xl glass-panel border border-[#C9A876]/25 hover:border-[#2FD6C8]/60 p-8 flex flex-col justify-between transition-all duration-500 overflow-hidden relative"
              >
                <div>
                  {/* Avatar & Pan/Zoom Container */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#C9A876]/40 shrink-0">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                          isPlaying ? 'scale-125 translate-x-1' : 'group-hover:scale-110'
                        }`}
                      />
                      <div className="absolute inset-0 bg-[#0B0F1A]/20" />
                    </div>

                    <div className={isRtl ? 'text-right' : 'text-left'}>
                      <h4 className="font-editorial text-base sm:text-lg text-white font-medium">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#C9A876] font-mono-tech mt-0.5">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  {/* Student Affiliation Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-sans-ui text-[#C9A876] mb-6">
                    {item.childInfo}
                  </div>

                  {/* Quote Body */}
                  <blockquote className="font-sans-ui text-xs sm:text-sm text-[#F7F5F1]/80 leading-relaxed italic mb-8 relative">
                    <Quote className={`w-6 h-6 text-[#C9A876]/20 absolute -top-3 ${isRtl ? '-right-2' : '-left-2'} -z-10`} />
                    {item.quote}
                  </blockquote>
                </div>

                {/* Audio Waveform Player Bar */}
                <div className="pt-5 border-t border-[#C9A876]/15 flex items-center justify-between gap-4">
                  <button
                    onClick={() => toggleAudio(item.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141B2D] border border-[#C9A876]/30 text-xs font-mono-tech text-[#C9A876] hover:text-[#2FD6C8] hover:border-[#2FD6C8] transition-all cognition-interactive"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#2FD6C8]" /> : <Play className="w-3.5 h-3.5 text-[#C9A876]" />}
                    <span>{isPlaying ? (isRtl ? 'إيقاف التسجيل' : 'PAUSE VOICE') : (isRtl ? 'استمع للتسجيل' : 'PLAY VOICE')}</span>
                    <span className="text-[10px] text-[#F7F5F1]/40">({item.audioDuration})</span>
                  </button>

                  {/* Animated Waveform Visualizer */}
                  <div className="flex items-center gap-0.5 h-5 flex-1 max-w-[100px] justify-end">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const h = isPlaying
                        ? 4 + ((i * 7 + (Date.now() / 100) % 20) % 18)
                        : 3 + (i % 4) * 2;
                      return (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-150 ${
                            isPlaying ? 'bg-[#2FD6C8]' : 'bg-[#C9A876]/30'
                          }`}
                          style={{ height: `${h}px` }}
                        />
                      );
                    })}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
