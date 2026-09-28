import React from 'react';
import { Sparkles, Palette, Check, Sun, Shield, Globe, Zap, GraduationCap } from 'lucide-react';

export type HomePageStyle = 'nextgen' | 'radiant' | 'clinical' | 'global';

interface StyleSwitcherBannerProps {
  currentStyle: HomePageStyle;
  onSelectStyle: (style: HomePageStyle) => void;
  onOpenCollegeProjectModal?: () => void;
}

export const StyleSwitcherBanner: React.FC<StyleSwitcherBannerProps> = ({
  currentStyle,
  onSelectStyle,
  onOpenCollegeProjectModal
}) => {
  const styles: {
    id: HomePageStyle;
    name: string;
    tag: string;
    description: string;
    icon: React.ReactNode;
    colorClass: string;
    badgeBg: string;
    isHot?: boolean;
  }[] = [
    {
      id: 'nextgen',
      name: 'Style 4: Next-Gen Animated (College Edition 🎓)',
      tag: 'Animated & Interactive',
      description: 'College Edition: animated ECG, 3D lab simulation, campus photo collage, notice board, and hospital hub',
      icon: <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />,
      colorClass: 'from-amber-500 via-purple-600 to-blue-600',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      isHot: true
    },
    {
      id: 'radiant',
      name: 'Style 1: Radiant Royal & Amber',
      tag: 'Kolkata Premier',
      description: 'Warm gold & royal blue, rich campus energy, vibrant course cards',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      colorClass: 'from-blue-600 via-indigo-600 to-amber-500',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: 'clinical',
      name: 'Style 2: Clinical Modern Luxe',
      tag: 'Ultra-Bright Healthcare',
      description: 'Luminous pure white, fresh emerald & sky, interactive department tabs',
      icon: <Shield className="w-4 h-4 text-emerald-600" />,
      colorClass: 'from-emerald-600 via-teal-600 to-cyan-500',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300'
    },
    {
      id: 'global',
      name: 'Style 3: Global Academy Hub',
      tag: 'Fellowship & Campus',
      description: 'High-energy dual track: Paramedical + London Fellowship spotlight',
      icon: <Globe className="w-4 h-4 text-blue-600" />,
      colorClass: 'from-purple-600 via-blue-700 to-emerald-500',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-300'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-[#0F2862] via-[#1E3A8A] to-[#064E3B] border-b border-emerald-400/40 shadow-lg sticky top-[68px] sm:top-[74px] z-30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Label & Description */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-md flex-shrink-0 animate-bounce">
              <Palette className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Client Live Style Studio</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </span>
                <span className="text-[11px] font-bold text-slate-300 hidden sm:inline">
                  Click any button to switch the entire homepage look & animations!
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                4 distinct high-converting layouts with real-time interactive widgets:
              </p>
            </div>
          </div>

          {/* Interactive Style Switcher Buttons & College Project Dossier */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {onOpenCollegeProjectModal && (
              <button
                onClick={onOpenCollegeProjectModal}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer active:scale-95 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border border-purple-400/40 shadow-md shadow-purple-600/30"
                title="View Academic College Project Dossier & Viva Guide"
              >
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">College Project Dossier</span>
                <span className="sm:hidden">Project Info</span>
                <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 text-[9px] font-black uppercase rounded-full">
                  VIVA
                </span>
              </button>
            )}

            {styles.map((style) => {
              const isActive = currentStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => onSelectStyle(style.id)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer active:scale-95 relative ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15 shadow-xs'
                  }`}
                  title={style.description}
                >
                  <span className="flex-shrink-0">{style.icon}</span>
                  <span className="truncate">{style.name.replace(/Style \d: /, '')}</span>
                  {style.isHot && (
                    <span className="px-1.5 py-0.2 bg-red-500 text-white text-[9px] font-black uppercase rounded-full animate-pulse">
                      NEW
                    </span>
                  )}
                  {isActive && (
                    <span className="w-4 h-4 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
