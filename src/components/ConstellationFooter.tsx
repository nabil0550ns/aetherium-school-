import { useState } from 'react';
import { Compass, Lock, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ConstellationNode {
  id: string;
  name: string;
  category: string;
  x: number; // percentage
  y: number; // percentage
  desc: string;
}

export const ConstellationFooter = ({
  onOpenSanctum,
  onOpenStudentPortal,
  onOpenTour,
}: {
  onOpenSanctum: () => void;
  onOpenStudentPortal?: () => void;
  onOpenTour: () => void;
}) => {
  const { t, isRtl } = useLanguage();

  const constellationNodes: ConstellationNode[] = [
    {
      id: 'n1',
      name: isRtl ? 'البهو البيولوجي المركزي' : 'Sanctuary Main Atrium',
      category: isRtl ? 'الطور التحضيري (3–5)' : 'Preparatory (Ages 3-5)',
      x: 25,
      y: 35,
      desc: isRtl ? 'جناح النباتات اللمسية والإضاءة الحيوية لتنمية حواس الأطفال الصغار.' : 'Central biophilic pavilion for early sensory discovery.',
    },
    {
      id: 'n2',
      name: isRtl ? 'مختبر الموائع والروبوتات' : 'Biomimicry & Fluidics Lab',
      category: isRtl ? 'الطور الابتدائي والمتوسط' : 'Primary & Middle',
      x: 50,
      y: 25,
      desc: isRtl ? 'أنفاق الهواء المائية وأنظمة البرمجة بالذكاء الاصطناعي.' : 'Laminar wind tunnels & autonomous robotics atelier.',
    },
    {
      id: 'n3',
      name: isRtl ? 'الشرفة الزراعية العضوية' : 'Micro-Botanical Terrace',
      category: isRtl ? 'البحث البيئي التطبيقي' : 'Ecological Research',
      x: 75,
      y: 38,
      desc: isRtl ? 'مشاتل زراعية وتربة خصبة يتعلم فيها التلاميذ دورة الحياة الطبيعية.' : 'Heirloom permaculture terrace providing daily harvest.',
    },
    {
      id: 'n4',
      name: isRtl ? 'مرصد الفلك ومراقبة السماء' : 'Solar & Sky Observatory',
      category: isRtl ? 'علوم الفضاء والفيزياء' : 'Astrophysics',
      x: 35,
      y: 70,
      desc: isRtl ? 'تلسكوبات بصرية لرصد حركة الأجرام وتطبيق نظريات علم الفلك الأندلسي.' : 'Optical telescope network for observational astronomy.',
    },
    {
      id: 'n5',
      name: isRtl ? 'مجلس المناظرات السقراطية' : 'Socratic Senate Forum',
      category: isRtl ? 'الطور المتوسط (11–14)' : 'Middle School',
      x: 65,
      y: 72,
      desc: isRtl ? 'مدرج للحوار الفلسفي، البلاغة، والقوانين باللغات الثلاث.' : 'Chamber for philosophical inquiry, law, and diplomacy.',
    },
    {
      id: 'n6',
      name: isRtl ? 'عقدة فضاء الولي السيادية' : 'Parent Sanctum Sovereign Node',
      category: isRtl ? 'الخادم المشفر الآمن' : 'Sovereign Network',
      x: 50,
      y: 55,
      desc: isRtl ? 'خوادم محلية معزولة تماماً لحماية سجلات وبيانات التلاميذ بنكياً.' : 'Air-gapped local encrypted parental intelligence terminal.',
    },
  ];

  const [activeNode, setActiveNode] = useState<ConstellationNode | null>(constellationNodes[0]);

  return (
    <footer className="relative bg-[#070A12] border-t border-[#C9A24B]/20 pt-24 pb-16 overflow-hidden">
      {/* Background Subtle Starfield / Grid */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Constellation Map Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A24B]/30 text-[#C9A24B] text-xs font-mono-tech uppercase tracking-[0.25em] mb-3">
                <Compass className="w-3.5 h-3.5 text-[#C9A24B]" />
                {isRtl ? 'تخطيط أجنحة الحرم المدرسي' : 'Institutional Topography'}
              </div>
              <h3 className="font-editorial text-2xl sm:text-4xl text-white font-normal">
                {isRtl ? (
                  <>خريطة أجنحة <span className="italic text-[#C9A24B]">صرح الأندلس</span></>
                ) : (
                  <>The El Andalus <span className="italic text-[#C9A24B]">Constellation Map</span></>
                )}
              </h3>
            </div>
            <p className="font-sans-ui text-xs text-[#F8F6F2]/60 max-w-sm">
              {isRtl
                ? 'انقر على أي جناح أو فضاء تعليمي لاستكشاف بيئتنا المادية والبيداغوجية المتخصصة.'
                : 'Click any node across our physical and pedagogical ecosystem to reveal our specialized learning laboratories.'}
            </p>
          </div>

          {/* Interactive SVG Node Canvas */}
          <div className="relative w-full h-80 sm:h-96 rounded-3xl glass-panel border border-[#C9A24B]/30 bg-[#0B0F1A]/80 p-6 overflow-hidden flex items-center justify-center">
            {/* SVG Connecting Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="25%" y1="35%" x2="50%" y2="25%" stroke="#C9A24B" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="50%" y1="25%" x2="75%" y2="38%" stroke="#C9A24B" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="25%" y1="35%" x2="35%" y2="70%" stroke="#C9A24B" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="75%" y1="38%" x2="65%" y2="72%" stroke="#C9A24B" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="35%" y1="70%" x2="65%" y2="72%" stroke="#C9A24B" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="50%" y1="25%" x2="50%" y2="55%" stroke="#2FD6C8" strokeWidth="1" opacity="0.5" />
              <line x1="50%" y1="55%" x2="35%" y2="70%" stroke="#2FD6C8" strokeWidth="1" opacity="0.5" />
              <line x1="50%" y1="55%" x2="65%" y2="72%" stroke="#2FD6C8" strokeWidth="1" opacity="0.5" />
            </svg>

            {/* Interactive Nodes */}
            {constellationNodes.map((node) => {
              const isActive = activeNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-10"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#2FD6C8] ring-4 ring-[#2FD6C8]/30 scale-125'
                        : 'bg-[#141B2D] border border-[#C9A24B] group-hover:border-[#2FD6C8] group-hover:scale-110'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-[#0B0F1A]' : 'bg-[#C9A24B] group-hover:bg-[#2FD6C8]'
                      }`}
                    />
                  </div>
                  <span className="hidden sm:block absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono-tech text-[#F8F6F2]/70 group-hover:text-white transition-colors bg-[#0B0F1A]/80 px-2 py-0.5 rounded border border-white/5">
                    {node.name}
                  </span>
                </button>
              );
            })}

            {/* Active Node Detail Card Overlay */}
            {activeNode && (
              <div className={`absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'} max-w-xs p-4 rounded-2xl glass-panel border border-[#C9A24B]/40 bg-[#0E1526]/90 backdrop-blur-md z-20 animate-in fade-in duration-300`}>
                <span className="text-[10px] font-mono-tech text-[#2FD6C8] uppercase tracking-wider block">
                  {activeNode.category}
                </span>
                <h5 className="font-editorial text-sm text-white font-medium mt-0.5 mb-1">
                  {activeNode.name}
                </h5>
                <p className="font-sans-ui text-[11px] text-[#F8F6F2]/70 leading-relaxed">
                  {activeNode.desc}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#141B2D] border border-[#C9A24B]/50 flex items-center justify-center text-[#C9A24B] font-editorial text-lg font-bold">
                {isRtl ? 'أ' : 'Æ'}
              </div>
              <div>
                <span className="font-editorial text-lg text-white font-semibold">
                  {t.schoolName}
                </span>
                <span className="text-[10px] font-mono-tech text-[#C9A24B] block">
                  {t.schoolSubname}
                </span>
              </div>
            </div>
            <p className="font-sans-ui text-xs text-[#F8F6F2]/60 leading-relaxed">
              {t.tagline} · {t.ageSpan}.
            </p>
            <div className="inline-block px-3 py-1 rounded-md bg-[#C9A24B]/10 border border-[#C9A24B]/30 text-[10px] font-mono-tech text-[#C9A24B]">
              {t.noSecondaryBadge}
            </div>
          </div>

          {/* Quick Academic Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-tech text-[#C9A24B] uppercase tracking-wider">
              {isRtl ? 'المسار التعليمي (3–14)' : 'Academic Stages'}
            </h4>
            <ul className="space-y-2 text-xs font-sans-ui text-[#F8F6F2]/70">
              <li><a href="#pillars" className="hover:text-white transition-colors">الطور التحضيري (3–5 سنوات)</a></li>
              <li><a href="#pillars" className="hover:text-white transition-colors">الطور الابتدائي (6–10 سنوات)</a></li>
              <li><a href="#pillars" className="hover:text-white transition-colors">الطور المتوسط (11–14 سنة)</a></li>
              <li><a href="#campus" className="hover:text-white transition-colors">البهو البيولوجي ومختبرات العلوم</a></li>
              <li><a href="#admissions" className="hover:text-white transition-colors">شروط ومعايير القبول</a></li>
            </ul>
          </div>

          {/* Portals & Systems */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-tech text-[#C9A24B] uppercase tracking-wider">
              {isRtl ? 'البوابات الرقمية' : 'Digital Portals'}
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenSanctum}
                className="w-full text-start p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech text-[#C9A24B] flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.nav.parentPortal}</span>
                </span>
                <span>→</span>
              </button>
              {onOpenStudentPortal && (
                <button
                  onClick={onOpenStudentPortal}
                  className="w-full text-start p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tech text-[#2FD6C8] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{t.nav.studentPortal}</span>
                  </span>
                  <span>→</span>
                </button>
              )}
              <button
                onClick={onOpenTour}
                className="w-full text-start p-2.5 rounded-xl bg-[#C9A24B]/20 hover:bg-[#C9A24B]/30 border border-[#C9A24B]/40 text-xs font-mono-tech text-white flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>{isRtl ? 'طلب زيارة استكشافية خاصة' : 'Book Private Walkthrough'}</span>
                </span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono-tech text-[#C9A24B] uppercase tracking-wider">
              {isRtl ? 'الاتصال والاعتماد' : 'Secretariat'}
            </h4>
            <div className="space-y-2 text-xs font-sans-ui text-[#F8F6F2]/70">
              <p>طريق الساحل، حيدرة / الأبيار، الجزائر العاصمة</p>
              <p className="font-mono-tech text-[#C9A24B]">+213 (0) 23 88 44 20</p>
              <p className="font-mono-tech text-white">contact@elandalus-academy.dz</p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#2FD6C8] font-mono-tech">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>معتمدة من وزارة التربية الوطنية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#F8F6F2]/40">
          <div>
            © {new Date().getFullYear()} {t.schoolName}. {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-6">
            <a href="#philosophy" className="hover:text-white transition-colors">{isRtl ? 'الميثاق التربوي' : 'Pedagogic Charter'}</a>
            <a href="#contact" className="hover:text-white transition-colors">{isRtl ? 'الأمانة العامة' : 'Secretariat'}</a>
            <span className="text-[#C9A24B]">{isRtl ? 'الجزائر العاصمة 🇩🇿' : 'Algiers, Algeria'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
