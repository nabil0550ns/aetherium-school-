import { useState, useEffect } from 'react';
import { Lock, Menu, X, Sparkles } from 'lucide-react';

interface NavigationProps {
  onOpenTourModal: () => void;
  onOpenSanctum: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navigation = ({
  onOpenTourModal,
  onOpenSanctum,
  onNavigate,
}: NavigationProps) => {
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
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'The Three Pillars', id: 'pillars' },
    { label: 'Campus Life', id: 'campus' },
    { label: 'Innovation Suite', id: 'innovation' },
    { label: 'Admissions & ROI', id: 'admissions' },
    { label: 'Voices', id: 'voices' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-[#0B0F1A]/85 backdrop-blur-xl border-b border-[#C9A876]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Monogram & Seal */}
        <div
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a233a] to-[#0B0F1A] border border-[#C9A876]/50 flex items-center justify-center shadow-[0_0_15px_rgba(201,168,118,0.2)] group-hover:border-[#4DE1FF] group-hover:shadow-[0_0_20px_rgba(77,225,255,0.4)] transition-all duration-300">
            <span className="font-editorial text-lg text-[#C9A876] group-hover:text-[#4DE1FF] transition-colors font-semibold">
              Æ
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-editorial text-lg tracking-wider text-white font-medium group-hover:text-[#C9A876] transition-colors">
              AETHERIUM
            </span>
            <span className="text-[10px] font-mono-tech tracking-[0.22em] text-[#C9A876] uppercase">
              Sanctuary of Future Minds
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-xs uppercase tracking-[0.18em] font-sans-ui text-[#F7F5F1]/70 hover:text-white transition-all duration-200 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A876] group-hover:w-full transition-all duration-300 group-hover:bg-[#4DE1FF]" />
            </button>
          ))}
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Sanctum Portal Button */}
          <button
            onClick={onOpenSanctum}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#141B2D]/80 border border-[#C9A876]/40 hover:border-[#4DE1FF] text-xs font-mono-tech tracking-wider text-[#C9A876] hover:text-[#4DE1FF] transition-all duration-300 cognition-interactive shadow-sm"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>SANCTUM LOGIN</span>
          </button>

          {/* Reserve Tour Button */}
          <button
            onClick={onOpenTourModal}
            className="group relative px-5 py-2.5 rounded-lg bg-[#C9A876] hover:bg-[#dfc79b] text-[#0B0F1A] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(201,168,118,0.25)] hover:shadow-[0_6px_25px_rgba(77,225,255,0.35)] cognition-interactive flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0B0F1A]" />
            <span>Reserve Tour</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg border border-[#C9A876]/30 text-[#C9A876] hover:text-[#4DE1FF]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-[#0B0F1A]/95 backdrop-blur-2xl border-b border-[#C9A876]/20 px-6 py-8 flex flex-col gap-5 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left text-sm uppercase tracking-widest font-sans-ui text-[#F7F5F1]/80 hover:text-[#4DE1FF] py-2 border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={() => {
                onOpenSanctum();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#141B2D] border border-[#C9A876]/40 text-xs font-mono-tech tracking-wider text-[#C9A876]"
            >
              <Lock className="w-4 h-4" />
              SANCTUM PORTAL ACCESS
            </button>
            <button
              onClick={() => {
                onOpenTourModal();
                setMobileMenuOpen(false);
              }}
              className="py-3 rounded-xl bg-[#C9A876] text-[#0B0F1A] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              RESERVE PRIVATE TOUR
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
