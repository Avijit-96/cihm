import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { TopStudent } from '../types.js';
import { Award, GraduationCap, Star, CheckCircle2, Hospital } from 'lucide-react';

interface StudentsPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const StudentsPage: React.FC<StudentsPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/students')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setStudents(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title="Student Achievers & Clinical Honorees | CIHM Kolkata"
        description="Celebrate the academic, laboratory, and clinical hospital achievements of CIHM Kolkata students and paramedical fellowship honorees."
        canonical="https://cihm.in/students"
      />

      <Breadcrumbs items={[{ label: 'Student Achievers' }]} />

      {/* Top Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
          Hall of Fame
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
          Student Achievers & Clinical Honorees
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Recognizing the exemplary dedication, diagnostic precision, and bedside compassion demonstrated by CIHM students during both campus laboratory simulations and hospital clinical postings.
        </p>
      </div>

      {/* Students Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">Loading achiever archives...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4">
                  <img
                    src={st.image}
                    alt={st.studentName}
                    loading="lazy"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00A54F]/20 shadow-xs flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-[#2E328D] leading-tight">
                      {st.studentName}
                    </h3>
                    <p className="text-xs font-bold text-slate-700 mt-1">{st.courseName}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-[#00A54F] bg-green-50 px-2 py-0.5 rounded">
                      {st.badge}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#2E328D]" />
                    <span>Achievement: {st.achievement}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic mt-2">
                    "{st.description}"
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Batch Year: {st.year}</span>
                <span className="text-[#00A54F] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified Honor
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admissions CTA */}
      <div className="bg-[#2E328D] text-white rounded-3xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Write Your Own Success Story at CIHM Kolkata</h2>
        <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
          Join our upcoming batch and train on live clinical equipment under experienced hospital faculty.
        </p>
        <button
          onClick={onOpenEnquiry}
          className="px-6 py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95"
        >
          Enquire for Admission
        </button>
      </div>
    </div>
  );
};
