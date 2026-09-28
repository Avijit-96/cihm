import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { PlacementRecord } from '../types.js';
import {
  Hospital,
  ShieldCheck,
  Award,
  Search,
  CheckCircle2,
  Calendar,
  Building2,
  ArrowRight,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface PlacementsPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const PlacementsPage: React.FC<PlacementsPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [placements, setPlacements] = useState<PlacementRecord[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/placements')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setPlacements(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const coursesList = [
    'All',
    'DMLT',
    'Radiology & Medical Imaging',
    'Dialysis Technology',
    'Operation Theatre Technology',
    'Hospital Management',
    'Critical Care'
  ];

  const filteredPlacements = placements.filter((p) => {
    const sName = p.studentName || '';
    const org = p.organization || p.companyName || '';
    const role = p.role || p.designation || '';
    const matchesSearch =
      sName.toLowerCase().includes(search.toLowerCase()) ||
      org.toLowerCase().includes(search.toLowerCase()) ||
      role.toLowerCase().includes(search.toLowerCase());

    const matchesCourse =
      selectedCourse === 'All' ||
      (p.courseName && p.courseName.toLowerCase().includes(selectedCourse.toLowerCase()));

    return matchesSearch && matchesCourse;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title="Clinical Placements & Careers | CIHM Kolkata Paramedical Institute"
        description="Explore verified clinical placements from CIHM Kolkata. Our paramedical graduates are recruited by premier healthcare networks, diagnostic chains, and medical institutions."
        canonical="https://cihm.in/placements"
      />

      <Breadcrumbs items={[{ label: 'Hospital Placements' }]} />

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
              Placement Cell Record
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
              Verified Hospital Placements
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              At CIHM Kolkata, we don't just provide classroom degrees. Our training guarantees clinical exposure, leading directly to appointments across premier multispecialty hospitals, pathology labs, and diagnostic centers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/placements/dashboard')}
              className="px-5 py-2.5 rounded-xl bg-[#2E328D] text-white font-bold text-xs hover:bg-[#252973] transition-colors flex items-center gap-2 shadow-xs"
            >
              <BarChart3 className="w-4 h-4 text-[#00A54F]" />
              <span>Interactive Analytics Dashboard</span>
            </button>
          </div>
        </div>

        {/* High Level Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-2xl font-black text-[#2E328D]">92%+</span>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Placement Assistance Rate</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-2xl font-black text-[#00A54F]">45+</span>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Hospital & Diagnostic Partners</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-2xl font-black text-[#2E328D]">100%</span>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Mandatory Hospital Postings</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-2xl font-black text-[#00A54F]">600+</span>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">Active Alumni Working in Healthcare</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, hospital, or role..."
            className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs pb-1">
          {coursesList.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCourse(c)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-colors ${
                selectedCourse === c
                  ? 'bg-[#2E328D] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Placements Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          Loading hospital placement archives...
        </div>
      ) : filteredPlacements.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-100 p-8">
          <Hospital className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-[#2E328D]">No matching placement records found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your filter or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlacements.map((p) => {
            const org = p.organization || p.companyName;
            const role = p.role || p.designation;
            const studentImg =
              p.studentImage ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5">
                    <img
                      src={studentImg}
                      alt={p.studentName}
                      loading="lazy"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-extrabold text-[#2E328D] truncate">
                          {p.studentName}
                        </h3>
                        <span className="text-[10px] bg-green-50 text-[#00A54F] border border-green-200/60 font-bold px-1.5 py-0.5 rounded">
                          Placed
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">{role}</p>
                      <p className="text-xs text-[#00A54F] font-bold flex items-center gap-1.5 mt-0.5">
                        {p.hospitalLogo ? (
                          <img
                            src={p.hospitalLogo}
                            alt={org}
                            className="w-4 h-4 rounded object-contain border border-slate-200 bg-white p-0.5 flex-shrink-0"
                          />
                        ) : (
                          <Hospital className="w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        <span className="truncate">{org}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs space-y-1 text-slate-500">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Course:</span>
                      <span className="font-semibold text-slate-700">{p.courseName}</span>
                    </div>
                    {p.salaryPackage && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Package:</span>
                        <span className="font-bold text-[#00A54F]">{p.salaryPackage}</span>
                      </div>
                    )}
                    {p.batch && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Batch:</span>
                        <span className="font-semibold text-slate-700">{p.batch}</span>
                      </div>
                    )}
                    {p.year && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Year:</span>
                        <span className="font-semibold text-slate-700">{p.year}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Verified by Placement Cell</span>
                  <span className="text-[#00A54F] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Hospital Confirmed</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recruiter Network Section */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/80">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-xl font-bold text-[#2E328D]">Are You a Hospital Recruiter?</h2>
          <p className="text-xs text-slate-500 mt-1">
            Connect with our placement team to hire certified, clinically trained lab technicians, radiology operators, dialysis technicians, and OT staff.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onOpenEnquiry}
            className="px-6 py-2.5 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs transition-colors shadow-sm"
          >
            Connect with CIHM Placement Cell
          </button>
        </div>
      </section>
    </div>
  );
};
