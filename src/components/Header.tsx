import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Search,
  Phone,
  GraduationCap,
  Sparkles,
  Wifi,
  WifiOff,
  ChevronDown,
  Plus,
  Minus,
  ExternalLink,
  ShieldCheck,
  Award,
  Stethoscope,
  Film,
  Play
} from 'lucide-react';
import { DemoClassesModal } from './DemoClassesModal.js';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenEnquiry: (courseName?: string) => void;
  isOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenEnquiry,
  isOnline
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileCoursesExpanded, setMobileCoursesExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    onNavigate(path);
  };

  // Paramedical courses matching https://cihm.in/
  const paramedicalCoursesList = [
    { name: 'Blood Collection (Phlebotomy)', path: '/courses/blood-collection-course' },
    { name: 'Medical Lab Assistant', path: '/courses/medical-lab-assistant' },
    { name: 'XRay Technician', path: '/courses/xray-technician-course' },
    { name: 'ECG Technician', path: '/courses/ecg-technician-course' },
    { name: 'OT Technician', path: '/courses/ot-technician' },
    { name: 'Dialysis Operator', path: '/courses/dialysis-operator' },
    { name: 'ICU Technician', path: '/courses/icu-technician' },
    { name: 'Physiotherapy', path: '/courses/physiotherapy' },
    { name: 'MPHW (Multi-Purpose Worker)', path: '/courses/mphw' },
    { name: 'Anesthesia Technician', path: '/courses/anesthesia' },
    { name: 'Radiology & Medical Imaging', path: '/courses/radiology-medical-imaging' },
    { name: 'DMLT (Lab Technology)', path: '/courses/dmlt' },
    { name: 'Hospital Management', path: '/courses/hospital-management' }
  ];

  // UK Online Fellowship quick selections
  const ukFellowshipsList = [
    { name: 'Endocrinology (F.Endo.)', path: '/courses/fellowship-endocrinology' },
    { name: 'Clinical Cardiology (F.C.C.)', path: '/courses/fellowship-clinical-cardiology' },
    { name: 'Emergency Medicine (F.E.M.)', path: '/courses/fellowship-emergency-medicine' },
    { name: 'Critical Care Medicine (F.C.C.M.)', path: '/courses/fellowship-critical-care-medicine' },
    { name: 'Diabetology (F.Diab.)', path: '/courses/fellowship-diabetology' },
    { name: 'Dermatology (F.Derm.)', path: '/courses/fellowship-dermatology' },
    { name: 'Pediatrics (F.Ped.)', path: '/courses/fellowship-pediatrics' },
    { name: 'Neurology (F.Neuro.)', path: '/courses/fellowship-neurology' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all duration-300">
      {/* Top Academic & Emergency Ribbon */}
      <div className="bg-[#1f226b] text-white text-[11px] py-1 px-3 sm:px-6 border-b border-white/10 leading-normal">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <button
              onClick={() => onNavigate('/international-fellowships')}
              className="flex items-center gap-1.5 font-bold text-white hover:text-[#00A54F] transition-colors text-left group"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-[#00A54F] animate-pulse flex-shrink-0"></span>
              <span className="truncate">
                Admissions 2026–27: 1-Yr UK Online Fellowships (Virtued Eduversity London)
              </span>
              <span className="hidden sm:inline-block bg-[#FF822F] text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider ml-1">
                Offer ₹59,000
              </span>
            </button>
            <span className="hidden lg:inline text-white/30">|</span>
            <span className="hidden lg:flex items-center gap-1 text-slate-200 text-[10.5px]">
              <ShieldCheck className="w-3 h-3 text-[#00A54F]" />
              East India Center: DumDum Kolkata
            </span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Phone quick call in ribbon */}
            <a
              href="tel:+919073737888"
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 hover:text-white transition-colors"
            >
              <Phone className="w-2.5 h-2.5 text-[#00A54F]" />
              <span>+91-9073737888</span>
            </a>

            {!isOnline ? (
              <span className="inline-flex items-center gap-1 text-[9.5px] font-bold bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded">
                <WifiOff className="w-2.5 h-2.5" /> Offline
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 text-[9.5px] text-white/60">
                <Wifi className="w-2 h-2 text-[#00A54F]" /> Online
              </span>
            )}
            <button
              onClick={() => handleLinkClick('/study-connect')}
              className="text-[10px] font-semibold text-white hover:text-[#00A54F] transition-colors flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#FF822F]" />
              Study Connect
            </button>

            {/* Demo Classes Video Modal Launcher */}
            <button
              onClick={() => setDemoModalOpen(true)}
              className="text-[10.5px] font-black text-white bg-gradient-to-r from-rose-600 via-red-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
              title="Watch live practical lab demo classes and campus facility tour"
            >
              <Film className="w-3 h-3 fill-white text-white" />
              <span>🎬 Demo Classes Video</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Classic CIHM Navigation Bar (Adjusted to Sleek Compact Height) */}
      <div
        className={`w-full bg-white transition-all duration-200 ${
          isScrolled ? 'shadow-sm py-1.5 border-b border-slate-200' : 'py-2 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
          {/* CIHM Logo matching https://cihm.in/ */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              className="flex items-center gap-2 sm:gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#252991] rounded-lg transition-transform hover:opacity-95"
              aria-label="CIHM Central Institute of Healthcare & Management"
            >
              <img
                src="/assets/cihmlogo.png"
                alt="CIHM Central Institute of Healthcare & Management"
                className="h-8 sm:h-9 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {/* <div className="hidden md:flex flex-col justify-center">
                <span className="font-extrabold text-[#252991] text-base leading-tight tracking-tight">
                  CIHM
                </span>
                <span className="text-[9.5px] font-semibold text-slate-600 uppercase tracking-tight leading-none mt-0.5">
                  Central Institute of Healthcare & Management
                </span>
                <span className="text-[8.5px] text-[#00A54F] font-bold leading-none mt-0.5">
                  East India Authorised Center • DumDum Kolkata
                </span>
              </div> */}
            </a>
          </div>

          {/* Desktop Navigation Menu (Sleek Compact Size) */}
          <nav className="hidden xl:flex items-center gap-5 lg:gap-6" aria-label="Main Navigation">
            {/* Home */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              className={`text-[15px] font-semibold transition-colors hover:text-[#252991] py-1 relative ${
                currentPath === '/' ? 'text-[#252991] font-bold' : 'text-[#333333]'
              }`}
            >
              Home
              {currentPath === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#252991] rounded-full"></span>
              )}
            </a>

            {/* Courses Dropdown */}
            <div
              ref={dropdownRef}
              className="relative group"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button
                onClick={() => handleLinkClick('/courses')}
                className={`text-[15px] font-semibold transition-colors hover:text-[#252991] py-1 flex items-center gap-1 relative cursor-pointer ${
                  currentPath.startsWith('/courses') || currentPath.startsWith('/Course')
                    ? 'text-[#252991] font-bold'
                    : 'text-[#333333]'
                }`}
              >
                <span>Courses</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#252991] transition-transform duration-200 ${
                    coursesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
                {(currentPath.startsWith('/courses') || currentPath.startsWith('/Course')) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#252991] rounded-full"></span>
                )}
              </button>

              {/* Sub-menu matching cihm.in sub-menu */}
              {coursesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Paramedical & Diagnostic Courses from cihm.in */}
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                        <span className="text-xs font-black uppercase tracking-wider text-[#252991]">
                          Paramedical & Allied Health
                        </span>
                        <span className="text-[10px] bg-blue-50 text-[#252991] font-bold px-2 py-0.5 rounded">
                          13 Diplomas
                        </span>
                      </div>
                      <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
                        {paramedicalCoursesList.map((c) => (
                          <button
                            key={c.path}
                            onClick={() => handleLinkClick(c.path)}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-sm text-[#333333] hover:text-[#252991] hover:bg-slate-50 transition-colors flex items-center justify-between group"
                          >
                            <span className="group-hover:font-semibold transition-all">{c.name}</span>
                            <span className="text-[11px] text-slate-400 group-hover:text-[#252991]">→</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Newly Announced UK Online Fellowships (London) */}
                    <div className="bg-slate-50/70 rounded-xl p-4 border border-blue-100/60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-200/60">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#00A54F]"></span>
                            <span className="text-xs font-black uppercase tracking-wider text-[#252991]">
                              1-Year UK Fellowships
                            </span>
                          </div>
                          <span className="text-[9px] bg-[#00A54F] text-white font-black px-1.5 py-0.5 rounded uppercase">
                            New 2026-27
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                          Conducted by Virtued Eduversity (London, UK) & Virtued Academy International. Suffix credential: <strong>(F.X.) London, UK</strong>.
                        </p>
                        <div className="space-y-1">
                          {ukFellowshipsList.map((f) => (
                            <button
                              key={f.path}
                              onClick={() => handleLinkClick(f.path)}
                              className="w-full text-left px-2.5 py-1 rounded-md text-xs text-[#252991] hover:bg-white hover:font-bold transition-all flex items-center justify-between"
                            >
                              <span>{f.name}</span>
                              <span className="text-[10px] text-[#00A54F] font-bold">120 CPD</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80">
                        <button
                          onClick={() => handleLinkClick('/international-fellowships')}
                          className="w-full py-2 px-3 rounded-lg bg-[#252991] text-white text-xs font-bold text-center hover:bg-[#1a1d68] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>Explore All 20 Fellowships</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Looking for specific hospital clinical rotations?
                    </span>
                    <button
                      onClick={() => handleLinkClick('/courses')}
                      className="font-bold text-[#00A54F] hover:underline"
                    >
                      View Complete Course Catalog (33 Programs) →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Online Fellowships (New direct menu item) */}
            <a
              href="/international-fellowships"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/international-fellowships');
              }}
              className={`text-[15px] font-semibold transition-colors hover:text-[#252991] py-1 flex items-center gap-1.5 relative ${
                currentPath.startsWith('/international-fellowships')
                  ? 'text-[#252991] font-bold'
                  : 'text-[#333333]'
              }`}
            >
              <span>Online Fellowships</span>
              <span className="bg-[#00A54F] text-white text-[8.5px] font-black uppercase px-1.5 py-0.2 rounded-full shadow-xs animate-pulse">
                UK
              </span>
              {currentPath.startsWith('/international-fellowships') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#252991] rounded-full"></span>
              )}
            </a>

            {/* Demo Classes Video Modal Link */}
            {/* <button
              onClick={() => setDemoModalOpen(true)}
              className="text-[15px] font-semibold text-[#333333] hover:text-[#252991] py-1 flex items-center gap-1.5 transition-colors cursor-pointer group"
              title="Watch live practical lab classes and diagnostics facility video tour"
            >
              <Film className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
              <span>Demo Classes</span>
              <span className="bg-rose-100 text-rose-700 text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full border border-rose-200">
                Videos
              </span>
            </button> */}

            {/* About Us */}
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/about');
              }}
              className={`text-[15px] font-semibold transition-colors hover:text-[#252991] py-1 relative ${
                currentPath === '/about' ? 'text-[#252991] font-bold' : 'text-[#333333]'
              }`}
            >
              About Us
              {currentPath === '/about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#252991] rounded-full"></span>
              )}
            </a>

            {/* Gallery */}
            <a
              href="/gallery"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/gallery');
              }}
              className={`text-[15px] font-semibold transition-colors hover:text-[#252991] py-1 relative ${
                currentPath === '/gallery' ? 'text-[#252991] font-bold' : 'text-[#333333]'
              }`}
            >
              Gallery
              {currentPath === '/gallery' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#252991] rounded-full"></span>
              )}
            </a>

            {/* Blogs */}
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/blog');
              }}
              className={`text-[15px] font-semibold transition-colors hover:text-[#252991] py-1 relative ${
                currentPath.startsWith('/blog') ? 'text-[#252991] font-bold' : 'text-[#333333]'
              }`}
            >
              Blogs
              {currentPath.startsWith('/blog') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#252991] rounded-full"></span>
              )}
            </a>

            {/* Contact */}
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/contact');
              }}
              className={`text-[15px] font-semibold transition-colors hover:text-[#252991] py-1 relative ${
                currentPath === '/contact' ? 'text-[#252991] font-bold' : 'text-[#333333]'
              }`}
            >
              Contact
              {currentPath === '/contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#252991] rounded-full"></span>
              )}
            </a>
          </nav>

          {/* Right Header Menu (header-right-menu from cihm.in) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Phone Link (.phone-icon matching cihm.in style) */}
            <a
              href="tel:+919073737888"
              className="hidden lg:flex items-center text-[#333333] hover:text-[#252991] transition-colors group"
              title="Call CIHM Helpline DumDum"
            >
              <span className="w-8 h-8 border border-[#252991] rounded-full flex items-center justify-center mr-2 group-hover:scale-105 transition-transform bg-[#252991]/5">
                <img
                  src="/assets/phone-icon.svg"
                  alt="Phone"
                  className="w-3.5 h-3.5 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <Phone className="w-3.5 h-3.5 text-[#252991] inline sm:hidden" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 leading-none">
                  Helpline
                </span>
                <b className="text-[13px] text-[#333333] group-hover:text-[#252991] font-bold tracking-tight leading-none mt-0.5">
                  +91-9073737888
                </b>
              </div>
            </a>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search courses, blogs and announcements"
              className="p-1.5 text-slate-600 hover:text-[#252991] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Apply Now CTA */}
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#252991] hover:bg-[#FF822F] text-white font-bold text-xs tracking-wider uppercase shadow-xs hover:shadow-md transition-all active:scale-95 duration-200 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 mr-1 hidden sm:inline-block" />
              <span>APPLY NOW</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 text-slate-700 hover:text-[#252991] hover:bg-slate-100 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#252991]" /> : <Menu className="w-6 h-6 text-[#333333]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[60px] sm:top-[66px] z-50 bg-white/98 backdrop-blur-md overflow-y-auto px-4 py-5 border-t border-slate-200 shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-1 max-w-lg mx-auto">
            {/* Home */}
            <button
              onClick={() => handleLinkClick('/')}
              className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                currentPath === '/' ? 'text-[#252991] bg-blue-50/80 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>Home</span>
            </button>

            {/* Courses Accordion */}
            <div className="rounded-xl border border-slate-100 overflow-hidden bg-slate-50/50">
              <button
                onClick={() => setMobileCoursesExpanded(!mobileCoursesExpanded)}
                className="w-full text-left px-4 py-3 text-base font-semibold text-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>Courses</span>
                  <span className="text-[10px] bg-[#252991] text-white px-2 py-0.5 rounded-full font-bold">
                    33
                  </span>
                </div>
                {mobileCoursesExpanded ? (
                  <Minus className="w-5 h-5 text-[#252991]" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-500" />
                )}
              </button>

              {mobileCoursesExpanded && (
                <div className="px-3 pb-3 space-y-3 bg-white pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-1">
                      Paramedical Diplomas (cihm.in)
                    </span>
                    <div className="space-y-1">
                      {paramedicalCoursesList.map((c) => (
                        <button
                          key={c.path}
                          onClick={() => handleLinkClick(c.path)}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#252991] transition-colors"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-[#00A54F] uppercase tracking-wider block px-2 mb-1">
                      ⭐ 1-Year UK Online Fellowships
                    </span>
                    <div className="space-y-1">
                      {ukFellowshipsList.map((f) => (
                        <button
                          key={f.path}
                          onClick={() => handleLinkClick(f.path)}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-[#252991] hover:bg-blue-50 transition-colors flex items-center justify-between"
                        >
                          <span>{f.name}</span>
                          <span className="text-[10px] text-[#00A54F]">London, UK</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleLinkClick('/courses')}
                    className="w-full py-2 bg-slate-100 text-[#252991] font-bold text-xs rounded-lg text-center mt-2"
                  >
                    View All 33 Course Pages →
                  </button>
                </div>
              )}
            </div>

            {/* Online Fellowships */}
            <button
              onClick={() => handleLinkClick('/international-fellowships')}
              className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                currentPath.startsWith('/international-fellowships')
                  ? 'text-[#252991] bg-blue-50 font-bold'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Online Fellowships</span>
                <span className="bg-[#00A54F] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                  NEW UK
                </span>
              </div>
            </button>

            {/* Demo Classes Video Modal Launcher (Mobile) */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setDemoModalOpen(true);
              }}
              className="text-left px-4 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-rose-50 to-amber-50 text-rose-800 border border-rose-200/80 flex items-center justify-between transition-colors shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-600" />
                <span>Demo Classes & Facility Videos</span>
              </div>
              <span className="bg-rose-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                WATCH
              </span>
            </button>

            {/* About Us */}
            <button
              onClick={() => handleLinkClick('/about')}
              className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                currentPath === '/about' ? 'text-[#252991] bg-blue-50 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            {/* Gallery */}
            <button
              onClick={() => handleLinkClick('/gallery')}
              className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                currentPath === '/gallery' ? 'text-[#252991] bg-blue-50 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Gallery
            </button>

            {/* Blogs */}
            <button
              onClick={() => handleLinkClick('/blog')}
              className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                currentPath.startsWith('/blog') ? 'text-[#252991] bg-blue-50 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Blogs
            </button>

            {/* Contact */}
            <button
              onClick={() => handleLinkClick('/contact')}
              className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                currentPath === '/contact' ? 'text-[#252991] bg-blue-50 font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>

            {/* Mobile Actions */}
            <div className="border-t border-slate-200 mt-4 pt-4 flex flex-col gap-3">
              {/* Tap to Call */}
              <a
                href="tel:+919073737888"
                className="w-full py-3 px-4 rounded-xl border-2 border-[#252991] text-[#252991] font-bold text-center flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#00A54F]" />
                <span>Call DumDum Helpline: +91-9073737888</span>
              </a>

              <a
                href="tel:+919073737444"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs text-center flex items-center justify-center gap-2"
              >
                <span>Alternate Helpline: +91-9073737444</span>
              </a>

              {/* Apply Now */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#252991] hover:bg-[#FF822F] text-white font-extrabold text-sm tracking-wider uppercase text-center shadow-lg transition-colors"
              >
                APPLY / ADMISSION ENQUIRY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Demo Classes & Diagnostics Facility Video Player Modal */}
      <DemoClassesModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onOpenEnquiry={onOpenEnquiry}
      />
    </header>
  );
};
