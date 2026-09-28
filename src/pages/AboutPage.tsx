import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import {
  ShieldCheck,
  Award,
  Hospital,
  Microscope,
  CheckCircle2,
  Users,
  Target,
  Eye,
  GraduationCap
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
      <SEOHelmet
        title="About CIHM Kolkata | Central Institute of Healthcare & Management"
        description="Learn about Central Institute of Healthcare & Management (CIHM) Kolkata, our mission, state-of-the-art diagnostic laboratories, hospital clinical rotations, and academic faculty."
        canonical="https://cihm.in/about"
      />

      <Breadcrumbs items={[{ label: 'About CIHM' }]} />

      {/* Hero Intro */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            Pioneering Paramedical Excellence
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
            Central Institute of Healthcare & Management (CIHM)
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Established in Kolkata, CIHM is dedicated to addressing the critical requirement for highly skilled, ethically grounded, and clinically proficient healthcare allied professionals across West Bengal and Eastern India.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E328D] flex items-center justify-center mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#2E328D]">Our Mission</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              To deliver rigorous paramedical education that bridges didactic medical science with intensive hospital clinical rotations, creating dependable healthcare professionals.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-[#00A54F] flex items-center justify-center mb-3">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#2E328D]">Our Vision</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              To be recognized as Eastern India's benchmark paramedical and healthcare management institute, known for quality diagnostic training, integrity, and hospital placement excellence.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E328D] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-[#2E328D]">Hospital Standards</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              All clinical curricula strictly comply with NABL and NABH quality frameworks, ensuring students master safety, precision, and bio-waste protocols.
            </p>
          </div>
        </div>
      </div>

      {/* Clinical Training Methodology */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            Our Academic Pedagogy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E328D] tracking-tight mt-2">
            60% Practical Lab Training & Mandatory Hospital Rotations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            Unlike traditional purely theoretical programs, CIHM integrates extensive practical laboratory drills on fully automated analyzers directly followed by rotational clinical internships in accredited multispecialty hospital settings.
          </p>

          <div className="mt-5 space-y-2.5 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A54F] mt-0.5 flex-shrink-0" />
              <span>Full-Spectrum Hematology, Biochemistry, and Microbiology Labs</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A54F] mt-0.5 flex-shrink-0" />
              <span>Dedicated Dialysis Machine Simulation & Heparinization Training</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A54F] mt-0.5 flex-shrink-0" />
              <span>Radiology Darkroom, Digital X-Ray & Ultrasound Positioning Training</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00A54F] mt-0.5 flex-shrink-0" />
              <span>Emergency Crash Cart, Defibrillation, and ICU Central Line Protocols</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => onNavigate('/courses')}
              className="px-5 py-2.5 bg-[#2E328D] text-white font-bold text-xs rounded-lg hover:bg-[#252973] transition-colors"
            >
              Explore Paramedical Diplomas →
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1000&q=80"
            alt="CIHM Diagnostic Laboratory Training Session"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>
      </section>

      {/* Hospital Network */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            Clinical Training Divisions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E328D] tracking-tight mt-2">
            Practical Clinical Rotations & Laboratories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Our students gain live clinical and laboratory experience across dedicated specialized departments.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            'Clinical Biochemistry & Pathology',
            'Digital Radiography & CT Imaging',
            'Dialysis & Renal Technology',
            'Surgical Operation Theatres',
            'Critical Care & ICU Units',
            'Cardiac Diagnostics & ECG',
            'Physiotherapy & Rehabilitation',
            'Blood Banking & Phlebotomy'
          ].map((dept, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-[#2E328D] flex items-center justify-center">
              {dept}
            </div>
          ))}
        </div>
      </section>

      {/* Faculty Message */}
      <section className="bg-blue-50/50 rounded-3xl p-6 sm:p-10 border border-blue-100 flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
          alt="Academic Director CIHM"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-white shadow-sm flex-shrink-0"
        />
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#00A54F] uppercase">Director's Desk</span>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#2E328D]">
            "A paramedic's diagnostic precision saves lives before the surgeon even enters the room."
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            At CIHM Kolkata, we take immense pride in fostering clinical accuracy, rapid diagnostic reflexes, and empathy. Our graduates are trusted across ICU bedsides, dialysis consoles, and trauma radiology suites across the state.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenEnquiry}
              className="px-4 py-2 bg-[#00A54F] text-white font-bold text-xs rounded-lg hover:bg-[#009245] transition-colors inline-flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Contact Admissions Cell</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
