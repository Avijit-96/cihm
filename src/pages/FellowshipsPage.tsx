import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { Fellowship } from '../types.js';
import {
  Award,
  Clock,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Hospital,
  ShieldCheck
} from 'lucide-react';

interface FellowshipsPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (fellowshipTitle?: string) => void;
}

export const FellowshipsPage: React.FC<FellowshipsPageProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  const [fellowships, setFellowships] = useState<Fellowship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/fellowships')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setFellowships(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title="Post-Diploma Clinical Fellowships in Kolkata | CIHM"
        description="Advance your clinical practice with specialized post-diploma fellowships at CIHM Kolkata in Critical Care, Cardiac Lab Technology, Dialysis, and Histopathology."
        canonical="https://cihm.in/fellowships"
      />

      <Breadcrumbs items={[{ label: 'Clinical Fellowships' }]} />

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
          Advanced Clinical Specialization
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
          Post-Diploma Clinical Fellowships
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Designed for practicing paramedics, lab technologists, and nursing professionals seeking advanced diagnostic mastery, ICU bedside interventions, and super-specialty hospital appointments.
        </p>
      </div>

      {/* Fellowships Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          Loading clinical fellowships...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fellowships.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#00A54F] bg-green-50 px-2.5 py-0.5 rounded-full">
                      {f.specialization}
                    </span>
                    <h3 className="text-lg font-extrabold text-[#2E328D] mt-2">{f.title}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-[#2E328D]" />
                    <span>{f.duration}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {f.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 block mb-0.5">Eligibility:</span>
                  <span className="font-semibold text-slate-700">{f.eligibility}</span>
                </div>

                {f.keyHighlights && f.keyHighlights.length > 0 && (
                  <div className="mt-4">
                    <span className="text-xs font-bold text-slate-800 block mb-2">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {f.keyHighlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00A54F] mt-0.5 flex-shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Hospital Rotations Included</span>
                <button
                  onClick={() => onOpenEnquiry(f.title)}
                  className="px-4 py-2 rounded-lg bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  Apply for Fellowship
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
