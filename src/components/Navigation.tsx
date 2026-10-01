import { useState, useEffect } from 'react';
import { Lock, Menu, X, Sparkles, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../locales';

interface NavigationProps {
  onOpenTourModal: () => void;
  onOpenSanctum: () => void;
  onOpenStudentPortal?: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navigation = ({
  onOpenTourModal,
  onOpenSanctum,
  onOpenStudentPortal,
  onNavigate,
}: NavigationProps) => {
  const { language, setLanguage, isRtl, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, id: 'hero' },
    { label: t.nav.about, id: 'philosophy' },
    { label: t.nav.pillars, id: 'pillars' },
    { label: t.nav.campusLife, id: 'campus' },
    { label: t.nav.news || 'الأخبار', id: 'news' },
    { label: t.nav.gallery || 'معرض الصور', id: 'gallery' },
    { label: t.nav.admissions, id: 'admissions' },
    { label: t.nav.faq || 'الأسئلة الشائعة', id: 'faq' },
    { label: t.nav.contact || 'اتصل بنا', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية', flag: '🇩🇿' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#0B0F1A]/92 backdrop-blur-xl border-b border-[#C9A24B]/20 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
          : 'py-5 bg-gradient-to-b from-[#0B0F1A]/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Monogram & Seal */}
        <div
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a233a] to-[#0B1526] border border-[#C9A24B]/60 flex items-center justify-center shadow-[0_0_15px_rgba(201,162,75,0.25)] group-hover:border-[#2FD6C8] group-hover:shadow-[0_0_20px_rgba(47,214,200,0.4)] transition-all duration-300">
            <span className="font-editorial text-lg text-[#C9A24B] group-hover:text-[#2FD6C8] transition-colors font-bold">
              {isRtl ? 'أ' : 'Æ'}
            </span>
          </div>
          <div className="flex flex-col text-start">
            <span className="font-editorial text-lg tracking-wider text-white font-semibold group-hover:text-[#C9A24B] transition-colors">
              {t.schoolName}
            </span>
            <span className="text-[10px] font-mono-tech tracking-[0.18em] text-[#C9A24B]/90 hidden sm:inline">
              {t.schoolSubname}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-xs tracking-wider font-sans-ui text-[#F8F6F2]/80 hover:text-white transition-all duration-200 relative group py-1 whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C9A24B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center group-hover:bg-[#2FD6C8]" />
            </button>
          ))}
        </nav>

        {/* Header Right Actions (Language Switcher + Portals + CTA) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Trilingual Switcher (Always Visible) */}
          <div className="flex items-center bg-[#141B2D]/90 p-1 rounded-xl border border-[#C9A24B]/30 shadow-inner">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                title={l.label}
                className={`px-2 py-1 rounded-lg text-xs font-mono-tech transition-all flex items-center gap-1 ${
                  language === l.code
                    ? 'bg-[#C9A24B] text-[#0B0F1A] font-bold shadow-sm'
                    : 'text-[#F8F6F2]/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{l.flag}</span>
                <span className="hidden md:inline text-[11px]">{l.code.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Student Hub Portal Button */}
          {onOpenStudentPortal && (
            <button
              onClick={onOpenStudentPortal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#141B2D]/80 border border-[#2FD6C8]/40 hover:border-[#2FD6C8] text-xs font-mono-tech tracking-wider text-[#2FD6C8] hover:bg-[#2FD6C8]/10 transition-all duration-300 cognition-interactive shadow-sm"
              title={t.nav.studentPortal}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.nav.studentPortal}</span>
            </button>
          )}

          {/* Parent Sanctum Portal Button */}
          <button
            onClick={onOpenSanctum}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#141B2D]/80 border border-[#C9A24B]/40 hover:border-[#2FD6C8] text-xs font-mono-tech tracking-wider text-[#C9A24B] hover:text-[#2FD6C8] transition-all duration-300 cognition-interactive shadow-sm"
            title={t.nav.parentPortal}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t.nav.parentPortal}</span>
          </button>

          {/* Register / Tour Modal Button */}
          <button
            onClick={onOpenTourModal}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#C9A24B] hover:bg-[#d6b059] text-[#0B0F1A] font-semibold text-xs tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(201,162,75,0.3)] hover:shadow-[0_6px_25px_rgba(47,214,200,0.4)] cognition-interactive flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0B0F1A]" />
            <span>{t.nav.registerCta || 'سجّل الآن'}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#2FD6C8]" /> : <Menu className="w-5 h-5 text-[#C9A24B]" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#0B0F1A]/95 backdrop-blur-2xl border-b border-[#C9A24B]/20 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-3">
            {/* Quick Portals inside drawer */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSanctum();
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#141B2D] border border-[#C9A24B]/50 text-xs font-mono-tech text-[#C9A24B]"
              >
                <Lock className="w-4 h-4" />
                <span>{t.nav.parentPortal}</span>
              </button>
              {onOpenStudentPortal && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenStudentPortal();
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#141B2D] border border-[#2FD6C8]/50 text-xs font-mono-tech text-[#2FD6C8]"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{t.nav.studentPortal}</span>
                </button>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1 border-t border-[#C9A24B]/15 pt-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="w-full text-start py-3 px-4 rounded-xl hover:bg-white/5 text-sm font-sans-ui text-[#F8F6F2]/80 hover:text-[#C9A24B] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[#C9A24B]/40 text-xs font-mono-tech">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#C9A24B]/20 pt-6 mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-[#F8F6F2]/60">
              <span>{t.schoolSubname}</span>
              <span className="text-[#C9A24B] font-mono-tech">+213 (0) 23 88 44 20</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTourModal();
              }}
              className="w-full py-3 rounded-xl bg-[#C9A24B] text-[#0B0F1A] font-semibold text-xs tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.registerCta || 'سجّل الآن'} · {t.hero.secondaryCta}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
