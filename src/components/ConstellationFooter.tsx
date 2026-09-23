import { useState } from 'react';
import { Shield, Compass, Lock } from 'lucide-react';

interface ConstellationNode {
  id: string;
  name: string;
  category: string;
  x: number; // percentage
  y: number; // percentage
  desc: string;
}

const constellationNodes: ConstellationNode[] = [
  { id: 'n1', name: 'Sanctuary Main Atrium', category: 'Core Campus', x: 25, y: 35, desc: 'Central biophilic pavilion for Preparatory (Ages 3-5)' },
  { id: 'n2', name: 'Biomimicry & Fluidics Lab', category: 'Primary & Middle', x: 50, y: 25, desc: 'Laminar wind tunnels & autonomous robotics atelier' },
  { id: 'n3', name: 'Micro-Botanical Conservatory', category: 'Ecological Research', x: 75, y: 38, desc: 'Heirloom permaculture terrace providing daily harvest' },
  { id: 'n4', name: 'High-Altitude Solar Observatory', category: 'Astrophysics', x: 35, y: 70, desc: 'Optical telescope network linked to European Southern Observatory' },
  { id: 'n5', name: 'Socratic Senate Forum', category: 'Middle School', x: 65, y: 72, desc: 'Chamber for philosophical inquiry, law, and diplomacy' },
  { id: 'n6', name: 'Parent Sanctum Node', category: 'Sovereign Network', x: 50, y: 55, desc: 'Air-gapped quantum-encrypted parental intelligence terminal' },
];

export const ConstellationFooter = ({
  onOpenSanctum,
  onOpenTour,
}: {
  onOpenSanctum: () => void;
  onOpenTour: () => void;
}) => {
  const [activeNode, setActiveNode] = useState<ConstellationNode | null>(constellationNodes[0]);

  return (
    <footer className="relative bg-[#070A12] border-t border-[#C9A876]/20 pt-24 pb-16 overflow-hidden">
      {/* Background Subtle Starfield / Grid */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Constellation Map Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#C9A876]/30 text-[#C9A876] text-xs font-mono-tech uppercase tracking-[0.25em] mb-3">
                <Compass className="w-3.5 h-3.5 text-[#C9A876]" />
                Institutional Topography
              </div>
              <h3 className="font-editorial text-2xl sm:text-4xl text-white font-normal">
                The Aetherium <span className="italic text-[#C9A876]">Constellation Map</span>
              </h3>
            </div>
            <p className="font-sans-ui text-xs text-[#F7F5F1]/60 max-w-sm">
              Click any node in our physical and pedagogical ecosystem to reveal our specialized learning laboratories.
            </p>
          </div>

          {/* Interactive SVG Node Canvas */}
          <div className="relative w-full h-80 sm:h-96 rounded-3xl glass-panel border border-[#C9A876]/30 bg-[#0B0F1A]/80 p-6 overflow-hidden flex items-center justify-center">
            {/* SVG Connecting Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="25%" y1="35%" x2="50%" y2="25%" stroke="#C9A876" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="50%" y1="25%" x2="75%" y2="38%" stroke="#C9A876" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="25%" y1="35%" x2="35%" y2="70%" stroke="#C9A876" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="75%" y1="38%" x2="65%" y2="72%" stroke="#C9A876" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <line x1="35%" y1="70%" x2="50%" y2="55%" stroke="#4DE1FF" strokeWidth="1.5" opacity="0.5" />
              <line x1="65%" y1="72%" x2="50%" y2="55%" stroke="#4DE1FF" strokeWidth="1.5" opacity="0.5" />
              <line x1="50%" y1="25%" x2="50%" y2="55%" stroke="#4DE1FF" strokeWidth="1.5" opacity="0.5" />
            </svg>

            {/* Interactive Nodes */}
            {constellationNodes.map((node) => {
              const isSelected = activeNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#4DE1FF] shadow-[0_0_20px_rgba(77,225,255,0.8)] scale-125'
                        : 'bg-[#C9A876]/30 border border-[#C9A876] group-hover:bg-[#4DE1FF]/60 group-hover:scale-110'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono-tech tracking-wider text-white opacity-80 group-hover:opacity-100 group-hover:text-[#4DE1FF]">
                    {node.name}
                  </span>
                </div>
              );
            })}

            {/* Node Info Inspector Card */}
            {activeNode && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-2xl glass-panel border border-[#4DE1FF]/40 bg-[#101626]/95 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#C9A876] mb-1">
                  <span>{activeNode.category}</span>
                  <span className="text-[#4DE1FF]">NODE ACTIVE</span>
                </div>
                <h4 className="font-editorial text-base text-white font-medium">{activeNode.name}</h4>
                <p className="text-xs text-[#F7F5F1]/70 font-sans-ui mt-1">{activeNode.desc}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation & Accreditation Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-[#C9A876]/15">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#141B2D] border border-[#C9A876]/50 flex items-center justify-center text-[#C9A876] font-editorial text-sm font-semibold">
                Æ
              </div>
              <span className="font-editorial text-xl text-white tracking-wider">AETHERIUM ACADEMY</span>
            </div>
            <p className="font-sans-ui text-xs text-[#F7F5F1]/70 max-w-sm leading-relaxed mb-6">
              A private educational sanctuary serving exclusively Preparatory, Primary, and Middle School students (ages 3–14). Where natural curiosity is protected and elevated into deliberate mastery.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenTour}
                className="px-4 py-2 rounded-lg bg-[#C9A876] text-[#0B0F1A] text-xs font-semibold uppercase tracking-wider hover:bg-[#dfc79b] transition-all"
              >
                Reserve Tour
              </button>
              <button
                onClick={onOpenSanctum}
                className="px-4 py-2 rounded-lg bg-[#141B2D] border border-[#C9A876]/40 text-[#C9A876] text-xs font-mono-tech flex items-center gap-1.5 hover:text-[#4DE1FF] hover:border-[#4DE1FF] transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                Sanctum Gateway
              </button>
            </div>
          </div>

          <div>
            <h5 className="font-editorial text-sm text-[#C9A876] uppercase tracking-wider mb-4">
              Sanctuary Continuum
            </h5>
            <ul className="space-y-2 text-xs font-sans-ui text-[#F7F5F1]/70">
              <li>Preparatory Atelier (Ages 3–5)</li>
              <li>Primary Academy (Ages 6–10)</li>
              <li>Middle School Colloquium (Ages 11–14)</li>
              <li>Biomimicry & Robotics Atelier</li>
              <li>Permaculture Nutrition Lab</li>
              <li>Hospital-Grade Air Purity Standard</li>
            </ul>
          </div>

          <div>
            <h5 className="font-editorial text-sm text-[#C9A876] uppercase tracking-wider mb-4">
              Accreditation & Trust
            </h5>
            <ul className="space-y-2 text-xs font-sans-ui text-[#F7F5F1]/70">
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C9A876]" />
                Independent Schools Inspectorate Tier 1
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C9A876]" />
                Bio-Safety Class 100 Air Certificate
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C9A876]" />
                Air-Gapped Sovereign Data Covenant
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C9A876]" />
                Zero Commercial Ad / Telemetry Guarantee
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#F7F5F1]/40">
          <div>
            © {new Date().getFullYear()} Aetherium Academy Sanctuary. All rights strictly reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Sovereign Confidentiality Protocol</span>
            <span>Ethical Governance Covenant</span>
            <span>Non-Discrimination Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
