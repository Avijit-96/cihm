import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  Building2,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Pause,
  Play
} from 'lucide-react';
import { ReviewItem, ReviewSettings } from '../types.js';

interface TestimonialSliderProps {
  reviews: ReviewItem[];
  settings?: ReviewSettings;
  onNavigate: (path: string) => void;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  reviews,
  settings,
  onNavigate
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'student' | 'partner'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Filter reviews based on tab
  const filteredReviews = reviews.filter((rev) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'student') return rev.type === 'student' || rev.source === 'google_business';
    if (activeFilter === 'partner') return rev.type === 'partner' || rev.source === 'industry_partner';
    return true;
  });

  const studentCount = reviews.filter((r) => r.type === 'student' || r.source === 'google_business').length;
  const partnerCount = reviews.filter((r) => r.type === 'partner' || r.source === 'industry_partner').length;

  // Autoplay slider every 5.5s
  useEffect(() => {
    if (isPaused || filteredReviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredReviews.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, filteredReviews.length]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredReviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      handlePrev();
    }
  };

  if (!filteredReviews.length) return null;

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-20 border-y border-slate-200/80 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2E328D_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-[#2E328D] px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#00A54F]" />
              <span>Verified Voices of Excellence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2E328D] tracking-tight">
              Success Stories & Hospital Endorsements
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Hear directly from our graduated alumni thriving in premier multispecialty hospitals, and leading healthcare medical directors who hire and endorse CIHM professionals.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-white text-[#2E328D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Stories ({reviews.length})
            </button>
            <button
              onClick={() => setActiveFilter('student')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeFilter === 'student'
                  ? 'bg-[#2E328D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#00A54F]" />
              <span>Alumni Graduates ({studentCount})</span>
            </button>
            <button
              onClick={() => setActiveFilter('partner')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeFilter === 'partner'
                  ? 'bg-[#00A54F] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-white" />
              <span>Hospital Partners ({partnerCount})</span>
            </button>
          </div>
        </div>

        {/* Testimonial Dynamic Slider Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slider Viewport */}
          <div className="overflow-hidden py-2">
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {filteredReviews.map((item, idx) => {
                const isPartner = item.type === 'partner' || item.source === 'industry_partner';
                return (
                  <div
                    key={item.id || idx}
                    className="w-full flex-shrink-0 px-2 sm:px-3"
                  >
                    <div
                      className={`relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border transition-all duration-300 shadow-sm hover:shadow-md ${
                        isPartner
                          ? 'border-emerald-200/80 hover:border-[#00A54F]'
                          : 'border-blue-200/80 hover:border-[#2E328D]'
                      }`}
                    >
                      {/* Top Header Row in Card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={item.reviewerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'}
                              alt={item.reviewerName}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                            />
                            {isPartner ? (
                              <div
                                title="Verified Hospital Industry Partner"
                                className="absolute -bottom-1.5 -right-1.5 bg-[#00A54F] text-white p-1 rounded-full shadow-xs"
                              >
                                <Building2 className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <div
                                title="Verified CIHM Alumnus"
                                className="absolute -bottom-1.5 -right-1.5 bg-[#2E328D] text-white p-1 rounded-full shadow-xs"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base sm:text-lg font-extrabold text-[#2E328D]">
                                {item.reviewerName}
                              </h3>
                              <span
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                  isPartner
                                    ? 'bg-emerald-50 text-[#00A54F] border border-emerald-200'
                                    : 'bg-blue-50 text-[#2E328D] border border-blue-200'
                                }`}
                              >
                                {isPartner ? 'Healthcare Industry Partner' : 'CIHM Alumnus'}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-slate-700 mt-1">
                              {item.roleOrDesignation || item.courseOrDepartment}
                            </p>
                            {item.organization && (
                              <p className="text-xs font-semibold text-[#00A54F] flex items-center gap-1.5 mt-0.5">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                <span>{item.organization}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Rating & Source Badge */}
                        <div className="flex flex-col sm:items-end gap-1.5">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(item.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                            <span className="text-xs font-bold text-slate-800 ml-1.5">5.0</span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {item.source === 'google_business'
                              ? 'Google Business Review'
                              : item.source === 'industry_partner'
                              ? 'Corporate Hospital Endorsement'
                              : 'Verified Institutional Testimonial'}
                          </span>
                        </div>
                      </div>

                      {/* Quotation Body */}
                      <div className="relative pl-6 sm:pl-8">
                        <Quote className="w-8 h-8 text-blue-100 absolute left-0 -top-2 -scale-x-100" />
                        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed italic">
                          "{item.reviewText}"
                        </p>
                      </div>

                      {/* Institutional Footer / Official Response */}
                      {item.response && (
                        <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/80 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 lg:-mx-10 lg:-mb-10 p-4 sm:px-8 rounded-b-3xl flex items-start gap-3">
                          <ShieldCheck className="w-4 h-4 text-[#00A54F] flex-shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <span className="font-bold text-[#2E328D]">CIHM Academic Board:</span>{' '}
                            <span className="text-slate-600">{item.response}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Bottom Navigation & Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-200/80">
            {/* Slide Indicators / Step Counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold text-[#2E328D]">
                {String(currentIndex + 1).padStart(2, '0')} / {String(filteredReviews.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1.5">
                {filteredReviews.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dotIdx === currentIndex
                        ? 'w-6 bg-[#2E328D]'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Jump to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
              {/* Pause / Resume Button */}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-2"
                title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Quick Actions & Prev/Next Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('/placements')}
                className="text-xs font-bold text-[#2E328D] hover:text-[#00A54F] flex items-center gap-1 transition-colors mr-2"
              >
                <span>View Hospital Placements</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-[#2E328D] hover:text-white hover:border-[#2E328D] flex items-center justify-center shadow-xs transition-all active:scale-95"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-xl bg-[#2E328D] text-white hover:bg-[#23276f] flex items-center justify-center shadow-xs transition-all active:scale-95"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Affiliates Quick Trust Ribbon */}
        <div className="mt-12 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-xs font-extrabold text-[#2E328D] uppercase tracking-wider">
                Recruited & Endorsed By Kolkata's Premier Healthcare Networks
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Our paramedical students undergo continuous clinical rotations and secure certified employment.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-slate-700">
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">NABL Accredited Labs</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">NABH Clinical Standards</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">AERB Radiation Protocols</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">Critical Care Units</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">Dialysis Complexes</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">Emergency & Trauma Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
