import { useState } from 'react';
import { Sparkles, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { mockNews } from '../data/mockData';
import type { NewsArticle } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const NewsSection = () => {
  const { isRtl } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = [
    { id: 'all', label: isRtl ? 'جميع الأخبار' : 'All News' },
    { id: 'success', label: isRtl ? 'تتويجات ونجاحات' : 'Success & Awards' },
    { id: 'activities', label: isRtl ? 'أنشطة حية' : 'Activities' },
    { id: 'workshops', label: isRtl ? 'ورشات ومناظرات' : 'Workshops' },
    { id: 'trips', label: isRtl ? 'رحلات واستكشاف' : 'Field Trips' },
  ];

  const filteredNews = selectedCategory === 'all'
    ? mockNews
    : mockNews.filter((n) => n.category === selectedCategory);

  return (
    <section id="news" className="relative py-32 bg-[#0B0F1A] border-t border-[#C9A24B]/15 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#2FD6C8]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              {isRtl ? 'الحياة الميدانية والأكاديمية' : 'Campus Chronicles'}
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              {isRtl ? (
                <>أخبار وفعاليات <span className="italic text-[#C9A24B]">مدرسة الأندلس</span></>
              ) : (
                <>News & Insights from <span className="italic text-[#C9A24B]">El Andalus</span></>
              )}
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-[#C9A24B]/30 overflow-x-auto self-start md:self-auto max-w-full">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedCategory === c.id
                    ? 'bg-[#C9A24B] text-[#0B0F1A] font-bold shadow-md'
                    : 'text-[#F8F6F2]/70 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group rounded-3xl glass-panel border border-[#C9A24B]/20 hover:border-[#2FD6C8]/60 bg-[#0E1526]/80 p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden relative"
            >
              <div>
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-white/10">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent opacity-60" />
                  <span className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} px-2.5 py-0.5 rounded-md bg-[#0B0F1A]/85 backdrop-blur-md border border-[#C9A24B]/40 text-[#C9A24B] text-[10px] font-mono-tech`}>
                    {article.author}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono-tech text-[#F8F6F2]/50 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C9A24B]" />
                    {article.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#2FD6C8]" />
                    {article.readTime} {isRtl ? 'دقائق قراءة' : 'min'}
                  </span>
                </div>

                <h3 className="font-editorial text-lg text-white font-medium mb-3 group-hover:text-[#C9A24B] transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="font-sans-ui text-xs text-[#F8F6F2]/70 leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#C9A24B]/15 flex items-center justify-between text-xs font-mono-tech text-[#2FD6C8]">
                <span>{isRtl ? 'قراءة الخبر كاملاً' : 'Read Article'}</span>
                <ArrowRight className={`w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Lightbox Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#0B0F1A]/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-[#C9A24B]/50 bg-[#0E1526] p-8 sm:p-10 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-[#C9A24B]/30">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent opacity-70" />
            </div>

            <div className="flex items-center gap-3 text-xs font-mono-tech text-[#C9A24B] mb-3">
              <span>{activeArticle.author}</span>
              <span>·</span>
              <span>{activeArticle.date}</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl text-white mb-4">
              {activeArticle.title}
            </h3>

            <p className="font-sans-ui text-sm sm:text-base text-[#F8F6F2]/80 leading-relaxed space-y-4">
              {activeArticle.excerpt}
            </p>

            <div className="mt-8 pt-6 border-t border-[#C9A24B]/20 flex items-center justify-between text-xs font-mono-tech text-[#F8F6F2]/60">
              <span>مدرسة الأندلس · الجزائر العاصمة</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-[#C9A24B] text-[#0B0F1A] font-bold"
              >
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
