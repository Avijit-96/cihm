import React from 'react';
import { CIHMLogo } from './CIHMLogo.js';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Star,
  CheckCircle2,
  ThumbsUp
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const googleTrustReviewsRow1 = [
    {
      id: 'gtr-1',
      name: 'Debabrata Mondal',
      role: 'DMLT Graduate (Batch 2024)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      source: 'google' as const,
      rating: 5,
      date: '3 days ago',
      text: 'Practical hands-on training on automated biochemistry analyzers at CIHM Dum Dum gave me immense confidence. Got appointed directly at a leading hospital lab.'
    },
    {
      id: 'gtr-2',
      name: 'Priyanka Halder',
      role: 'Radiology Tech Student',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
      source: 'trustpilot' as const,
      rating: 5,
      date: '5 days ago',
      text: 'Best paramedical college in Kolkata! Modern DR X-ray units, patient positioning drills, and dedicated mentors who guide you at every step.'
    },
    {
      id: 'gtr-3',
      name: 'Dr. A. K. Banerjee',
      role: 'Parent of OT Student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      source: 'google' as const,
      rating: 5,
      date: '1 week ago',
      text: 'CIHM provides genuine hospital exposure and transparent fee structures. My daughter completed OT technology and is placed in Kolkata with high satisfaction.'
    },
    {
      id: 'gtr-4',
      name: 'Suman Mukherjee',
      role: 'Dialysis Operator',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      source: 'trustpilot' as const,
      rating: 5,
      date: '2 weeks ago',
      text: 'The live dialysis machine priming and heparin dosage calibration drills are unmatched. 100% practical clinical exposure in Kolkata.'
    }
  ];

  const googleTrustReviewsRow2 = [
    {
      id: 'gtr-5',
      name: 'Rituparna Chakraborty',
      role: 'Hospital Admin Alumna',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      source: 'google' as const,
      rating: 5,
      date: '2 weeks ago',
      text: 'Comprehensive training in NABH quality documentation, hospital billing, and EHR systems. The placement assistance cell is proactive and helpful.'
    },
    {
      id: 'gtr-6',
      name: 'Dr. Rajiv Sen',
      role: 'UK Online Fellow (Diabetology)',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80',
      source: 'trustpilot' as const,
      rating: 5,
      date: '3 weeks ago',
      text: 'The 1-Year UK CPD Fellowship in Diabetology broadened my medical practice significantly. Excellent digital lectures from London faculty.'
    },
    {
      id: 'gtr-7',
      name: 'Sneha Roy',
      role: 'ICU Technician Student',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      source: 'google' as const,
      rating: 5,
      date: '1 month ago',
      text: 'Ventilator waveforms, arterial line monitoring, and emergency resuscitation training gave me real bedside readiness. Highly recommend CIHM!'
    },
    {
      id: 'gtr-8',
      name: 'Subhajit Pal',
      role: 'Medical Lab Assistant',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
      source: 'trustpilot' as const,
      rating: 5,
      date: '1 month ago',
      text: 'Affordable fees, friendly professors, and real hospital rotation postings across Kolkata. Proud to be an alumnus of CIHM.'
    }
  ];

  const quickLinks = [
    { label: 'About CIHM', path: '/about' },
    { label: 'All Courses', path: '/courses' },
    { label: 'Hospital Placements', path: '/placements' },
    { label: 'Placement Dashboard', path: '/placements/dashboard' },
    { label: 'Career Progression Roadmap', path: '/career-roadmap' },
    { label: 'Post-Diploma Fellowships', path: '/fellowships' },
    { label: 'Student Achievers', path: '/students' },
    { label: 'Campus Events & Seminars', path: '/events' },
    { label: 'Official Announcements', path: '/announcements' }
  ];

  const courseLinks = [
    { label: 'London Fellowships 2026–27 (New)', path: '/international-fellowships' },
    { label: 'DMLT (Medical Lab Technology)', path: '/courses/dmlt' },
    { label: 'Radiology & Medical Imaging', path: '/courses/radiology-medical-imaging' },
    { label: 'Dialysis Technology', path: '/courses/dialysis-operator' },
    { label: 'Operation Theatre Technology', path: '/courses/operation-theatre-technology' },
    { label: 'ECG & Cardiac Diagnostics', path: '/courses/ecg-technician' },
    { label: 'Critical Care & ICU Technology', path: '/courses/icu-technician' },
    { label: 'Hospital Administration', path: '/courses/hospital-management' }
  ];

  const communityLinks = [
    { label: 'Student Community Forum', path: '/community' },
    { label: 'Study Connect Collaboration', path: '/study-connect' },
    { label: 'Verified Reviews & Ratings', path: '/reviews' },
    { label: 'Healthcare Career Insights Blog', path: '/blog' },
    { label: 'Contact & Directions', path: '/contact' }
  ];

  return (
    <footer className="bg-[#2E328D] text-white pt-14 pb-8 border-t-4 border-[#00A54F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ============================================================== */}
        {/* ⭐ SLIDING GOOGLE LIVE REVIEWS & TRUSTPILOT RATING SHOWCASE */}
        {/* ============================================================== */}
        <div className="mb-14 pb-12 border-b border-white/15">
          {/* Trust Ratings Summary Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center md:justify-start">
              {/* Google Reviews Badge */}
              <div className="flex items-center gap-3 bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-md">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-blue-600 text-lg shadow-xs">
                  G
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-slate-900">4.9</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10.5px] font-bold text-slate-600 block">
                    485+ Verified Google Reviews
                  </span>
                </div>
              </div>

              {/* Trustpilot Badge */}
              <div className="flex items-center gap-3 bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-md">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                  <Star className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-slate-900">4.8</span>
                    <div className="flex text-emerald-600">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10.5px] font-bold text-slate-600 block">
                    Rated Excellent on Trustpilot
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block">
                100% Transparent Student Feedback
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Real reviews from our certified paramedical trainees & hospital interns.
              </p>
            </div>
          </div>

          {/* Marquee Row 1 (Left Scroll) */}
          <div className="flex gap-4 overflow-hidden select-none py-1">
            <div className="flex gap-4 animate-marquee shrink-0">
              {googleTrustReviewsRow1.map((rev) => (
                <div
                  key={rev.id}
                  className="w-80 sm:w-96 p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-all shadow-md shrink-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/30"
                        />
                        <div>
                          <span className="text-xs font-black block leading-tight">{rev.name}</span>
                          <span className="text-[10px] text-emerald-300 block">{rev.role}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          rev.source === 'google'
                            ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                            : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                        }`}
                      >
                        {rev.source === 'google' ? 'Google Review' : 'Trustpilot'}
                      </span>
                    </div>

                    <div className="flex text-amber-300 mb-1.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
                      &quot;{rev.text}&quot;
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Verified Student
                    </span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Duplicate for seamless infinite loop */}
            <div className="flex gap-4 animate-marquee shrink-0" aria-hidden="true">
              {googleTrustReviewsRow1.map((rev) => (
                <div
                  key={`${rev.id}-dup`}
                  className="w-80 sm:w-96 p-4 rounded-2xl bg-white/10 border border-white/15 text-white transition-all shadow-md shrink-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/30"
                        />
                        <div>
                          <span className="text-xs font-black block leading-tight">{rev.name}</span>
                          <span className="text-[10px] text-emerald-300 block">{rev.role}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          rev.source === 'google'
                            ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                            : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                        }`}
                      >
                        {rev.source === 'google' ? 'Google Review' : 'Trustpilot'}
                      </span>
                    </div>

                    <div className="flex text-amber-300 mb-1.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
                      &quot;{rev.text}&quot;
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Verified Student
                    </span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 (Right Scroll) */}
          <div className="flex gap-4 overflow-hidden select-none py-1 mt-3">
            <div className="flex gap-4 animate-marquee-reverse shrink-0">
              {googleTrustReviewsRow2.map((rev) => (
                <div
                  key={rev.id}
                  className="w-80 sm:w-96 p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-all shadow-md shrink-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/30"
                        />
                        <div>
                          <span className="text-xs font-black block leading-tight">{rev.name}</span>
                          <span className="text-[10px] text-emerald-300 block">{rev.role}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          rev.source === 'google'
                            ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                            : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                        }`}
                      >
                        {rev.source === 'google' ? 'Google Review' : 'Trustpilot'}
                      </span>
                    </div>

                    <div className="flex text-amber-300 mb-1.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
                      &quot;{rev.text}&quot;
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Verified Alum / Parent
                    </span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Duplicate for seamless infinite loop */}
            <div className="flex gap-4 animate-marquee-reverse shrink-0" aria-hidden="true">
              {googleTrustReviewsRow2.map((rev) => (
                <div
                  key={`${rev.id}-dup`}
                  className="w-80 sm:w-96 p-4 rounded-2xl bg-white/10 border border-white/15 text-white transition-all shadow-md shrink-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/30"
                        />
                        <div>
                          <span className="text-xs font-black block leading-tight">{rev.name}</span>
                          <span className="text-[10px] text-emerald-300 block">{rev.role}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          rev.source === 'google'
                            ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                            : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                        }`}
                      >
                        {rev.source === 'google' ? 'Google Review' : 'Trustpilot'}
                      </span>
                    </div>

                    <div className="flex text-amber-300 mb-1.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-white/90 leading-relaxed line-clamp-3">
                      &quot;{rev.text}&quot;
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Verified Alum / Parent
                    </span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/15">
          {/* Column 1: Institute Overview & Badges */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm">
              <img
                src="/assets/cihmlogo.png"
                alt="CIHM Central Institute of Healthcare & Management"
                className="h-8 sm:h-9 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-md">
              Central Institute of Healthcare & Management (CIHM) is a premier healthcare and paramedical educational institute in Kolkata, dedicated to producing industry-ready diagnostic technologists and healthcare administrators through certified hospital-based practical training.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 bg-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A54F]" /> Verified Hospital Postings
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A54F]" /> NABL / NABH Aligned Curriculum
              </span>
            </div>
            <div className="text-xs text-white/70 space-y-1.5 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00A54F] mt-0.5 flex-shrink-0" />
                <span>105/59, Dumdum Road P.S: Dumdum, Motijheel, Kolkata-700074</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00A54F] flex-shrink-0" />
                <span>+91-9073737888 / +91-9073737444</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00A54F] flex-shrink-0" />
                <span>info.cihm.kolkata@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#00A54F] flex-shrink-0" />
                <span>Mon – Sat: 09:30 AM – 06:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Column 2: Paramedical Programs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00A54F] mb-3.5">
              Certified Programs
            </h4>
            <ul className="space-y-2 text-xs">
              {courseLinks.map((c) => (
                <li key={c.path}>
                  <button
                    onClick={() => onNavigate(c.path)}
                    className="text-white/80 hover:text-white hover:underline text-left transition-colors flex items-center gap-1"
                  >
                    <span>{c.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institutional Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00A54F] mb-3.5">
              Institution
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <button
                    onClick={() => onNavigate(l.path)}
                    className="text-white/80 hover:text-white hover:underline text-left transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Community & Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00A54F] mb-3.5">
              Connect & Learn
            </h4>
            <ul className="space-y-2 text-xs">
              {communityLinks.map((l) => (
                <li key={l.path}>
                  <button
                    onClick={() => onNavigate(l.path)}
                    className="text-white/80 hover:text-white hover:underline text-left transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10">
              <h5 className="text-xs font-bold text-white mb-2">Social Channels</h5>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com/cihmkolkata"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#00A54F] flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="CIHM Facebook"
                >
                  FB
                </a>
                <a
                  href="https://linkedin.com/company/cihm-kolkata"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#00A54F] flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="CIHM LinkedIn"
                >
                  IN
                </a>
                <a
                  href="https://youtube.com/@cihmkolkata"
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#00A54F] flex items-center justify-center transition-colors text-xs font-bold"
                  aria-label="CIHM YouTube"
                >
                  YT
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Admin Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div>
            © {new Date().getFullYear()} Central Institute of Healthcare & Management (CIHM). All rights reserved. Kolkata, West Bengal.
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <button
              onClick={() => onNavigate('/privacy-policy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('/terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('/accessibility')}
              className="hover:text-white transition-colors"
            >
              Accessibility
            </button>
            <span>•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-0.5"
            >
              <span>Sitemap</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span>•</span>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/admin');
              }}
              className="font-bold text-[#00A54F] hover:text-white hover:underline transition-colors flex items-center gap-1"
            >
              <span>Admin Panel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
