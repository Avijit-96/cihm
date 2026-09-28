import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeroSlide } from '../types.js';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  Award
} from 'lucide-react';

interface HeroSliderProps {
  slides: HeroSlide[];
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

// Optimized, fast-loading, high-resolution hospital & clinical photography (1200px, 80% quality for sub-100ms load)
const defaultSlides: HeroSlide[] = [
  {
    id: 'hero-slide-1',
    headline: 'Diploma in Medical Laboratory Technology (DMLT)',
    subheadline: 'Clinical Pathology & Diagnostic Lab Sciences',
    year: '2026–27',
    badgeColor: '#00A54F',
    description: 'Hands-on diagnostic drills with automated biochemistry analyzers, micro-pipetting, hematology counters, and NABL-grade blood sample testing.',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80',
    altText: 'Paramedical laboratory technician testing clinical blood samples with diagnostic reagents',
    ctaText: 'Explore DMLT Syllabus',
    ctaUrl: '/courses/dmlt',
    secondaryCtaText: 'Hospital Postings',
    secondaryCtaUrl: '/placements',
    order: 1,
    enabled: true
  },
  {
    id: 'hero-slide-2',
    headline: 'Radiology & Medical Imaging Technology (DRMIT)',
    subheadline: 'Digital X-Ray, CT Scan & Ultrasonography Workstations',
    year: '2026–27',
    badgeColor: '#2E328D',
    description: 'Master patient positioning, digital radiography controls, cross-sectional CT protocols, and AERB radiation protection in active hospital radiology suites.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    altText: 'Radiography technologist operating clinical CT scanner console in hospital radiodiagnostic department',
    ctaText: 'View Radiology Course',
    ctaUrl: '/courses/radiology-medical-imaging',
    secondaryCtaText: 'Career Roadmap',
    secondaryCtaUrl: '/career-roadmap',
    order: 2,
    enabled: true
  },
  {
    id: 'hero-slide-3',
    headline: 'Diploma in Dialysis Technology & Renal Care',
    subheadline: 'Bedside Hemodialysis & Dialyzer Priming Training',
    year: '2026–27',
    badgeColor: '#0284C7',
    description: 'Master dialyzer clearance kinetics, AV fistula cannulation, RO water treatment, and emergency dialysis management under senior consultant nephrologists.',
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80',
    altText: 'Dialysis technologist in clinical unit monitoring hemodialysis patient station and blood lines',
    ctaText: 'Dialysis Syllabus',
    ctaUrl: '/courses/dialysis-operator',
    secondaryCtaText: 'Hospital Network',
    secondaryCtaUrl: '/placements',
    order: 3,
    enabled: true
  },
  {
    id: 'hero-slide-4',
    headline: 'Operation Theatre & Anesthesia Technology (DOTT)',
    subheadline: 'Surgical Asepsis, Laparoscopy & Anesthesia Workstations',
    year: '2026–27',
    badgeColor: '#059669',
    description: 'Sterile theatre preparation, laparoscopic instrument handling, multi-parameter vital monitoring, and code-blue emergency assistance inside surgical suites.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    altText: 'Sterile surgical operation theatre with OT technologist preparing surgical instrument tray',
    ctaText: 'OT Technology Course',
    ctaUrl: '/courses/operation-theatre-technology',
    secondaryCtaText: 'Apply Online',
    secondaryCtaUrl: '/contact',
    order: 4,
    enabled: true
  },
  {
    id: 'hero-slide-5',
    headline: 'Critical Care & ICU Technology Training',
    subheadline: 'Mechanical Ventilator Circuits & Hemodynamic Monitoring',
    year: '2026–27',
    badgeColor: '#DC2626',
    description: 'Invasive hemodynamic pressure zeroing, arterial blood gas sampling support, precision infusion pump setup, and ICU code-blue resuscitation protocols.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    altText: 'Paramedical critical care specialist in ICU ward monitoring life support and patient vitals',
    ctaText: 'Critical Care Course',
    ctaUrl: '/courses/icu-technician',
    secondaryCtaText: 'Campus Contact',
    secondaryCtaUrl: '/contact',
    order: 5,
    enabled: true
  },
  {
    id: 'hero-slide-6',
    headline: '1-Year Online Fellowship Courses (London) 2026–27',
    subheadline: 'Virtued Eduversity (UK) – East India Center: CIHM DumDum',
    year: '2026–27',
    badgeColor: '#F59E0B',
    description: '16 Specialized International Online Fellowships in Cardiology, Critical Care, Diabetology & Emergency Medicine for Doctors & Healthcare Professionals. Limited Offer: ₹59,000.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
    altText: 'Doctor and clinical specialist reviewing medical diagnostic findings for international fellowship',
    ctaText: 'View London Fellowships',
    ctaUrl: '/international-fellowships',
    secondaryCtaText: 'Call 9073737888',
    secondaryCtaUrl: '/contact',
    order: 6,
    enabled: true
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  onNavigate,
  onOpenEnquiry
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const rawSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const activeSlides = rawSlides.filter((s) => s.enabled);
  const count = activeSlides.length;

  // Preload all slide images into browser cache immediately for instant, zero-delay rendering
  useEffect(() => {
    activeSlides.forEach((slide) => {
      if (slide.image) {
        const img = new Image();
        img.src = slide.image;
      }
    });
  }, [activeSlides]);

  const handleNext = useCallback(() => {
    if (count <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % count);
    setProgress(0);
  }, [count]);

  const handlePrev = useCallback(() => {
    if (count <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + count) % count);
    setProgress(0);
  }, [count]);

  // Robust autoplay timer that tracks real elapsed time and cleanly triggers next slide
  useEffect(() => {
    if (count <= 1 || isPaused) return;

    const DURATION = 5500; // 5.5s per slide
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= DURATION) {
        setCurrentIndex((prev) => (prev + 1) % count);
        setProgress(0);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentIndex, count, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  if (count === 0) return null;

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 45) {
        handleNext();
      } else if (distance < -45) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-slate-950 min-h-[560px] sm:min-h-[620px] lg:min-h-[660px] flex flex-col justify-between border-b border-slate-800 select-none group"
      aria-label="Realistic Paramedical Workstation & Clinical Diagnostics Hero Carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. CRYSTAL-CLEAR FULL BACKGROUND COVER PHOTOGRAPHY (VISIBLE, BRIGHT, ZERO BLUR) */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {activeSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
              aria-hidden={!isActive}
            >
              {/* Sharp, vibrant hospital and lab photography - FULL COVERAGE, NO BLUR */}
              <img
                src={slide.image}
                alt={slide.altText || slide.headline}
                loading={idx === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80';
                }}
                className={`w-full h-full object-cover object-center filter-none transition-transform duration-7000 ease-out ${
                  isActive ? 'scale-104' : 'scale-100'
                }`}
              />
              {/* Subtle transparent lighting - ensures 100% of background image is crystal clear & visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/15 pointer-events-none" />
            </div>
          );
        })}

        {/* Subtle Animated Vector Telemetry & HUD Ring Graphic Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
          {/* Cyber Grid */}
          <div className="absolute inset-0 bg-grid-cyber opacity-15" />
          
          {/* Rotating Vector HUD Telemetry Ring */}
          <div className="absolute -top-20 -right-20 w-80 h-80 opacity-25 pointer-events-none">
            <svg className="w-full h-full animate-rotate-slow text-amber-400" viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12 18" />
              <circle cx="200" cy="200" r="140" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 8" />
              <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 6" />
              <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="0.8" strokeDasharray="6 6" />
            </svg>
          </div>

          {/* Animated Flowing Wave at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-28 opacity-30 overflow-hidden">
            <svg className="w-[200%] h-full animate-wave-flow text-cyan-400" viewBox="0 0 2000 120" preserveAspectRatio="none" fill="none">
              <path
                d="M0 60 Q 250 10, 500 60 T 1000 60 T 1500 60 T 2000 60"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DIRECT SIDE NAVIGATION CHEVRONS (SMOOTH SLIDING CONTROLS) */}
      {/* ------------------------------------------------------------- */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-950/70 hover:bg-[#00A54F] text-white border border-white/30 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer pointer-events-auto"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-950/70 hover:bg-[#00A54F] text-white border border-white/30 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer pointer-events-auto"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* ------------------------------------------------------------- */}
      {/* 3. TOP STATUS BADGE (CLEAN & UNBLURRED) */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-white/25 text-xs font-bold text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00A54F] animate-pulse" />
          <span className="hidden sm:inline">CIHM Clinical Facilities • </span>
          <span>Slide {currentIndex + 1} of {count}</span>
          {currentSlide.year && (
            <span className="ml-1 bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">
              {currentSlide.year}
            </span>
          )}
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label="Toggle Full Background Photo View"
            className="bg-slate-950/60 hover:bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/30 shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isMinimized ? 'Show Card' : 'Clear BG View'}</span>
          </button>
          <span className="bg-[#2E328D]/80 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-blue-400/30 shadow-md hidden sm:flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Certified Hospital Rotations</span>
            <span className="sm:hidden">Hospital Rotations</span>
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. TRANSLUCENT MIRROR GLASS CONTENT CARD (SEE-THROUGH BG) */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full my-auto py-6 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Main Card: Translucent Frosted Mirror Glass - Allows Background Photo to Shine Through */}
          <div className={`lg:col-span-7 xl:col-span-6 pointer-events-auto transition-all duration-500 ${isMinimized ? 'opacity-20 hover:opacity-100 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div
              className="relative overflow-hidden rounded-3xl p-6 sm:p-7 backdrop-blur-xl border text-white transition-all duration-300 group/card"
              style={{
                background: `linear-gradient(135deg, rgba(15, 23, 42, 0.45) 0%, ${(currentSlide.blockColor || currentSlide.badgeColor || '#00A54F')}25 100%)`,
                borderColor: `${currentSlide.blockColor || currentSlide.badgeColor || '#00A54F'}75`,
                boxShadow: `0 16px 40px -10px ${(currentSlide.blockColor || currentSlide.badgeColor || '#00A54F')}30, inset 0 1px 1px rgba(255,255,255,0.45), inset 0 -1px 1px rgba(0,0,0,0.3)`
              }}
            >
              {/* Mirror Glass Reflective Sheen */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none rounded-3xl" />

              {/* Top Accent Line with Color Glow */}
              <div
                className="absolute inset-x-0 top-0 h-1"
                style={{
                  backgroundColor: currentSlide.badgeColor || currentSlide.blockColor || '#00A54F',
                  boxShadow: `0 0 12px ${currentSlide.badgeColor || currentSlide.blockColor || '#00A54F'}`
                }}
              />

              {/* Subheadline / Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold mb-3 shadow-xs">
                <ShieldCheck
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: currentSlide.badgeColor || currentSlide.blockColor || '#00A54F' }}
                />
                <span>{currentSlide.subheadline}</span>
                {currentSlide.year && (
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white font-extrabold">
                    {currentSlide.year}
                  </span>
                )}
              </div>

              {/* Primary Headline */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {currentSlide.headline}
              </h1>

              {/* Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-slate-100/95 leading-relaxed font-normal drop-shadow-xs max-w-xl">
                {currentSlide.description}
              </p>

              {/* Verified Paramedical Work Highlights Box */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold text-white bg-slate-950/40 backdrop-blur-md p-2.5 rounded-xl border border-white/15 shadow-xs">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00A54F] flex-shrink-0" />
                  <span>Hospital Attached</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00A54F] flex-shrink-0" />
                  <span>Automated Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00A54F] flex-shrink-0" />
                  <span>100% Placement Aid</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00A54F] flex-shrink-0" />
                  <span>Govt. Recognized</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate(currentSlide.ctaUrl)}
                  className="px-5 py-2.5 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white font-black text-xs tracking-wide shadow-lg transition-all active:scale-95 flex items-center gap-2 border border-emerald-400/40"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {currentSlide.secondaryCtaText && (
                  <button
                    onClick={() => {
                      if (currentSlide.secondaryCtaUrl === '/contact') {
                        onOpenEnquiry();
                      } else {
                        onNavigate(currentSlide.secondaryCtaUrl || '/courses');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-all shadow-md active:scale-95 border border-white/25 backdrop-blur-sm"
                  >
                    {currentSlide.secondaryCtaText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. BOTTOM CONTROLS & DEPARTMENT SELECTOR (CRISP CONTROLS) */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full pb-6 pointer-events-none">
        {/* Smooth Autoplay Progress Bar */}
        <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-3.5 shadow-xs">
          <div
            className="bg-[#00A54F] h-full transition-all duration-75 ease-linear rounded-full shadow-[0_0_8px_#00A54F]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-auto">
          {/* Quick Department / Specialization Jump Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {activeSlides.map((slide, idx) => {
              const label =
                slide.subheadline?.split('•')[0]?.slice(0, 18) ||
                (idx === 0
                  ? 'DMLT Pathology'
                  : idx === 1
                  ? 'Radiology Imaging'
                  : idx === 2
                  ? 'Dialysis Renal Care'
                  : idx === 3
                  ? 'Operation Theatre'
                  : idx === 4
                  ? 'Critical Care ICU'
                  : 'London Fellowship');

              const isActive = idx === currentIndex;

              return (
                <button
                  key={slide.id || idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress(0);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-[#00A54F] text-white border-emerald-300 shadow-[0_0_12px_rgba(0,165,79,0.5)] scale-105'
                      : 'bg-slate-950/80 text-white/90 border-white/20 hover:bg-white/15 hover:text-white'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}: ${label}`}
                >
                  {isActive && <Sparkles className="w-3 h-3 text-white" />}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls: Prev, Pause/Play, Next & Indicators */}
          <div className="flex items-center gap-2 bg-slate-950/85 p-1.5 rounded-2xl shadow-xl border border-white/20 text-white">
            {/* Step Counter */}
            <span className="text-xs font-black text-white px-2">
              {String(currentIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>

            {/* Dots */}
            <div className="flex items-center gap-1 px-1">
              {activeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress(0);
                  }}
                  className={`transition-all rounded-full ${
                    idx === currentIndex
                      ? 'w-6 h-1.5 bg-[#00A54F]'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="h-4 w-px bg-white/20 mx-0.5" />

            {/* Previous */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              {isPaused ? (
                <Play className="w-4 h-4 text-[#00A54F]" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSlider;
