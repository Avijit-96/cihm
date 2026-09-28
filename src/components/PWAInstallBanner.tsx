import React, { useState, useEffect } from 'react';
import { Download, X, WifiOff, RefreshCw, Smartphone, Eye, Sparkles } from 'lucide-react';
import { CIHMLogo } from './CIHMLogo.js';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallBannerProps {
  isOnline: boolean;
  onOpenAppPreview?: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ isOnline, onOpenAppPreview }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (onOpenAppPreview) {
      onOpenAppPreview();
    }
  };

  return (
    <>
      {/* Offline Status Bar Alert if disconnected */}
      {!isOnline && (
        <aside aria-label="Offline Mode Notification" className="bg-amber-500 text-slate-950 text-xs px-4 py-1.5 flex items-center justify-center gap-2 font-bold shadow-xs z-50 sticky top-0">
          <WifiOff className="w-3.5 h-3.5" />
          <span>You are currently in Offline Mode. Cached course materials and notes remain accessible.</span>
          <button
            onClick={() => window.location.reload()}
            className="ml-2 underline flex items-center gap-1 hover:text-slate-900"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Connection
          </button>
        </aside>
      )}

      {/* Floating Bottom Install & Preview Launcher Button (Visible unless running standalone) */}
      {!isStandalone && (
        <div className="fixed bottom-4 left-4 z-40 hidden sm:block animate-fade-in">
          <button
            onClick={() => {
              if (onOpenAppPreview) onOpenAppPreview();
              else setShowBanner(true);
            }}
            className="group flex items-center gap-2.5 px-3.5 py-2 bg-gradient-to-r from-[#1f226b] to-[#00A54F] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 active:scale-95 cursor-pointer text-xs font-black"
            aria-label="Preview and Install CIHM App"
          >
            <Smartphone className="w-4 h-4 text-emerald-300 group-hover:animate-bounce" />
            <span>Install App (Preview)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      )}

      {/* PWA Mobile Install Banner */}
      {showBanner && (
        <aside aria-label="Install CIHM App" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-start gap-3">
            <CIHMLogo size="sm" variant="compact" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-extrabold text-[#2E328D]">Install CIHM Kolkata App</h4>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 font-bold">Free</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                Add to your home screen for quick offline access to courses, study rooms, and schedules.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <button
                  onClick={handleInstallClick}
                  className="px-3 py-1 bg-[#00A54F] text-white font-bold text-[11px] rounded-lg hover:bg-[#009245] transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Install App</span>
                </button>
                {onOpenAppPreview && (
                  <button
                    onClick={() => {
                      setShowBanner(false);
                      onOpenAppPreview();
                    }}
                    className="px-2.5 py-1 bg-slate-100 text-[#2E328D] font-bold text-[11px] rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </button>
                )}
                <button
                  onClick={() => setShowBanner(false)}
                  className="px-2 py-1 text-slate-500 hover:text-slate-700 text-[11px] font-semibold cursor-pointer"
                >
                  Later
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss banner"
              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
