import { useState } from 'react';
import { Camera, X, Maximize2 } from 'lucide-react';
import { mockGallery } from '../data/mockData';
import type { GalleryPhoto } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const GallerySection = () => {
  const { isRtl } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { id: 'all', label: isRtl ? 'جميع الفضاءات' : 'All Spaces' },
    { id: 'nature', label: isRtl ? 'البهو البيولوجي' : 'Bio-Atrium' },
    { id: 'labs', label: isRtl ? 'مختبرات الروبوتات والعلوم' : 'Science & STEM Labs' },
    { id: 'classes', label: isRtl ? 'حجرات المطالعة والتركيز' : 'Quiet Ateliers' },
    { id: 'sports', label: isRtl ? 'المرافق الرياضية' : 'Sports & Athletics' },
  ];

  const filteredPhotos = activeCategory === 'all'
    ? mockGallery
    : mockGallery.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A24B]/15 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#C9A24B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
              <Camera className="w-3.5 h-3.5 text-[#C9A24B]" />
              {isRtl ? 'جولة بصرية في رحاب المدرسة' : 'Visual Diorama'}
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              {isRtl ? (
                <>معرض الفضاءات <span className="italic text-[#C9A24B]">والمرافق الحيوية</span></>
              ) : (
                <>Architectural & <span className="italic text-[#C9A24B]">Living Spaces</span></>
              )}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-[#C9A24B]/30 overflow-x-auto self-start md:self-auto max-w-full">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeCategory === c.id
                    ? 'bg-[#C9A24B] text-[#0B0F1A] font-bold shadow-md'
                    : 'text-[#F8F6F2]/70 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden border border-[#C9A24B]/20 hover:border-[#2FD6C8]/60 bg-[#0E1526] h-80 cursor-pointer transition-all duration-500 shadow-lg"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#0B0F1A]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[#2FD6C8]" />
              </div>

              {/* Card Footer Info */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <h3 className="font-editorial text-lg text-white font-medium mb-1">
                  {photo.title}
                </h3>
                <p className="font-sans-ui text-xs text-[#F8F6F2]/70 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#0B0F1A]/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-[#C9A24B]/40 bg-[#0E1526] shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 hover:bg-black/90 text-white border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[70vh] overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain bg-black"
              />
            </div>

            <div className="p-6 bg-[#0E1526] border-t border-[#C9A24B]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-editorial text-2xl text-white mb-1">
                  {selectedPhoto.title}
                </h4>
                <p className="font-sans-ui text-xs text-[#F8F6F2]/70">
                  {selectedPhoto.caption}
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tech text-[#C9A24B] shrink-0">
                مدرسة الأندلس · صرح الريادة
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
