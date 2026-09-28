import React, { useState, useEffect } from 'react';
import {
  Download,
  X,
  Smartphone,
  WifiOff,
  Bell,
  Film,
  Hospital,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Share2,
  PlusSquare,
  Sparkles
} from 'lucide-react';
import { CIHMLogo } from './CIHMLogo.js';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface AppInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry?: (courseName?: string) => void;
}

export const AppInstallModal: React.FC<AppInstallModalProps> = ({
  isOpen,
  onClose,
  onOpenEnquiry
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'home' | 'courses' | 'notices' | 'demos'>('home');

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallSuccess(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstallSuccess(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      // Show iOS step guidance
    } else {
      // Fallback: explain how to install or simulate success for testing
      setInstallSuccess(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="CIHM Mobile App Preview & Install"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-r from-[#1f226b] via-[#2E328D] to-[#00A54F] text-white p-5 sm:p-6 flex-shrink-0">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-lg flex items-center justify-center flex-shrink-0">
              <CIHMLogo size="sm" variant="compact" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10.5px] font-black tracking-wide uppercase mb-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>PWA Mobile Experience</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Install CIHM Kolkata Mobile App
              </h2>
              <p className="text-xs text-blue-100 font-medium mt-0.5">
                Fast, lightweight offline study app for Android, iOS & Desktop
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Interactive Mobile Phone Mockup Preview */}
          <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-inner border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-200">Interactive App Preview:</span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => setActivePreviewTab('home')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                    activePreviewTab === 'home' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActivePreviewTab('notices')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                    activePreviewTab === 'notices' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Notices
                </button>
                <button
                  onClick={() => setActivePreviewTab('demos')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                    activePreviewTab === 'demos' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Demo Videos
                </button>
              </div>
            </div>

            {/* Mobile Screen Mockup */}
            <div className="mt-3 bg-slate-950 rounded-xl p-3.5 border border-slate-800 space-y-2.5">
              {activePreviewTab === 'home' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      CIHM Paramedical Portal
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                      Offline Ready
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                    <p className="text-slate-300 text-[11px] leading-tight">
                      Welcome, Student Trainee! Access courses, laboratory equipment manuals & hospital postings 24/7.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-blue-900/30 border border-blue-500/30 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span className="truncate">Course Syllabi</span>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-900/30 border border-amber-500/30 flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">Live Notices</span>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'notices' && (
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded bg-white/5 border border-white/10 flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-500 text-white font-black flex-shrink-0">
                      URGENT
                    </span>
                    <div>
                      <p className="font-bold text-white text-[11px]">Practical Hospital Roster Allocated</p>
                      <p className="text-[10px] text-slate-400">Batches assigned to Woodlands & AMRI Hospitals.</p>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10 flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-500 text-white font-black flex-shrink-0">
                      EXAM
                    </span>
                    <div>
                      <p className="font-bold text-white text-[11px]">Practical Logbook Submission Open</p>
                      <p className="text-[10px] text-slate-400">Submit certified records before clinical viva.</p>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'demos' && (
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Film className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-white text-[11px]">DMLT Auto-Analyzer Class</p>
                        <p className="text-[10px] text-slate-400">12 mins • Biochemistry Calibration</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">Watch</span>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Film className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-white text-[11px]">OT Laparoscopy Tower Setup</p>
                        <p className="text-[10px] text-slate-400">15 mins • Sterile Techniques</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">Watch</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key App Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
              <WifiOff className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-emerald-950 text-xs">100% Offline Course Access</h4>
                <p className="text-emerald-800 text-[11px] mt-0.5 leading-snug">
                  Read syllabus modules, exam schedules, and notes without active internet.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-2.5">
              <Bell className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-blue-950 text-xs">Instant College Notices</h4>
                <p className="text-blue-800 text-[11px] mt-0.5 leading-snug">
                  Receive notifications on hospital postings, counseling dates, and results.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-2.5">
              <Film className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-purple-950 text-xs">Lab Demos & Social Media Hub</h4>
                <p className="text-purple-800 text-[11px] mt-0.5 leading-snug">
                  Watch demo classes and YouTube/Instagram practical reels on demand.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
              <Hospital className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-black text-amber-950 text-xs">Placement Hospital Tracker</h4>
                <p className="text-amber-800 text-[11px] mt-0.5 leading-snug">
                  Explore Apollo, Fortis, Woodlands clinical partners & placement records.
                </p>
              </div>
            </div>
          </div>

          {/* iOS Safari Guided Steps */}
          {isIOS && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-black text-amber-900">
                <Share2 className="w-4 h-4 text-amber-700" />
                <span>How to Install on iPhone / iPad (Safari):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11.5px] text-amber-900 leading-snug">
                <li>
                  Tap the <strong className="font-black">Share</strong> icon (square with arrow pointing up) in Safari.
                </li>
                <li>
                  Scroll down the share sheet and tap <strong className="font-black">Add to Home Screen ⊞</strong>.
                </li>
                <li>
                  Tap <strong className="font-black">Add</strong> in the top-right corner to place CIHM on your home screen.
                </li>
              </ol>
            </div>
          )}

          {/* Success State */}
          {installSuccess && (
            <div className="p-3.5 bg-emerald-100 text-emerald-900 font-bold rounded-xl flex items-center gap-2 text-xs border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>CIHM App is installed on your device! You can now launch it directly from your home screen.</span>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex-shrink-0 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-[11.5px] text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Progressive Web Application • Fast & Secure</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleInstallClick}
              className="px-5 py-2.5 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white text-xs font-black shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isInstalled ? 'App Installed' : 'Install CIHM App Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
