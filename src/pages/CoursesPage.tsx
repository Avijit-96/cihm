import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { Course } from '../types.js';
import { Search, BookOpen, Clock, Award, ChevronRight, Filter, Camera } from 'lucide-react';

interface CoursesPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (courseName?: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCourses(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    'All',
    '⭐ Highlighted / New Launches',
    'Diagnostic & Lab Sciences',
    'Radiological Sciences',
    'Renal & Critical Care',
    'Perioperative & Surgical',
    'Cardiovascular Diagnostics',
    'Healthcare Management'
  ];

  const filteredCourses = courses.filter((c) => {
    const name = c.name || c.title || '';
    const desc = c.shortDescription || c.overview || '';
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory === '⭐ Highlighted / New Launches') {
      matchesCategory = c.highlighted === true || c.isNewLaunch === true;
    } else if (selectedCategory !== 'All') {
      matchesCategory = c.category.toLowerCase() === selectedCategory.toLowerCase();
    }
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <SEOHelmet
        title="Paramedical Courses in Kolkata | CIHM Central Institute of Healthcare & Management"
        description="Explore certified healthcare and paramedical diploma courses at CIHM Kolkata including DMLT, Radiology, Dialysis Technology, Operation Theatre, ICU, and Hospital Management."
        canonical="https://cihm.in/courses"
      />

      <Breadcrumbs items={[{ label: 'Courses Directory' }]} />

      {/* Featured 2026-27 London Fellowships Banner */}
      <div className="bg-gradient-to-r from-[#171a53] via-[#2E328D] to-[#12143d] rounded-3xl p-6 sm:p-7 text-white border border-blue-400/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#00A54F] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs animate-pulse">
              NEW PROGRAM OPEN – 2026
            </span>
            <span className="text-xs text-slate-300 font-semibold">
              Virtued Eduversity (London, UK) & Virtued Academy International
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            1-Year Online Fellowship Courses (London)
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            16 Advanced International Fellowships in Cardiology, Critical Care, Diabetology & Emergency Medicine for Doctors & Healthcare Professionals. Special Limited Offer: <strong className="text-amber-400">₹59,000</strong> (Zero-Cost EMI). East India Center: CIHM DumDum.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/international-fellowships')}
          className="px-5 py-3 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2 flex-shrink-0"
        >
          <span>Explore 16 London Fellowships</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            Admissions 2024-2025
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
            Paramedical & Healthcare Diplomas
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Choose from industry-certified paramedical diplomas designed with 60% practical laboratory instruction and mandatory hospital-based clinical rotations across Kolkata's top multispecialty hospitals.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, e.g. DMLT, Dialysis..."
              className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#2E328D] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Quick Course Image Buttons Bar */}
      {courses.length > 0 && (
        <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2E328D] text-white flex items-center justify-center font-bold text-xs">
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
              </span>
              <span className="text-xs font-bold text-slate-800">
                Visual Course Image Directory ({courses.length} Programs)
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Click any course photo button to view full program details
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {courses.slice(0, 16).map((c) => (
              <button
                key={`btn-quick-${c.id}`}
                type="button"
                onClick={() => onNavigate(`/courses/${c.slug}`)}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all text-left cursor-pointer transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#00A54F]"
                title={`Click to open ${c.name || c.title}`}
              >
                <img
                  src={c.image}
                  alt={c.name || c.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-300 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 pointer-events-none">
                  <div className="text-[10px] font-black text-white leading-tight line-clamp-1 group-hover:text-emerald-300">
                    {c.name || c.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          Loading certified programs...
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-100 p-8">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-[#2E328D]">No matching programs found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your filter or searching for another keyword.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-1.5 bg-blue-50 text-[#2E328D] font-bold text-xs rounded-lg hover:bg-blue-100"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const accent = course.accentColor || '#00A54F';
            const year = course.batchYear || course.academicYear;

            const isHighlight = course.highlighted || course.isNewLaunch;

            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl overflow-hidden transition-all flex flex-col justify-between group relative ${
                  isHighlight
                    ? 'border-2 border-emerald-500 shadow-[0_0_20px_rgba(0,165,79,0.2)] hover:shadow-xl'
                    : 'border border-slate-200/80 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Top Banner or Accent Strip */}
                {isHighlight ? (
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black uppercase tracking-wider py-1 px-3 text-center flex items-center justify-center gap-1">
                    <span>⭐ NEW LAUNCH • SESSION 2026–27</span>
                  </div>
                ) : (
                  <div className="h-1.5 w-full" style={{ backgroundColor: accent }} />
                )}

                <div>
                  {/* Interactive Course Image Button */}
                  <button
                    type="button"
                    onClick={() => onNavigate(`/courses/${course.slug}`)}
                    className="relative h-48 w-full bg-slate-100 overflow-hidden block text-left group/imgbtn cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00A54F]"
                    aria-label={`Open course details for ${course.name || course.title}`}
                    title="Click image to open course program"
                  >
                    <img
                      src={course.image}
                      alt={course.name || course.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/imgbtn:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap pointer-events-none">
                      <div
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-xs"
                        style={{ backgroundColor: accent }}
                      >
                        {course.category}
                      </div>
                      {year && (
                        <div className="bg-slate-950/80 text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-xs">
                          {year}
                        </div>
                      )}
                    </div>

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/imgbtn:opacity-100 transition-opacity flex items-center justify-center p-3">
                      <span className="px-3 py-1.5 rounded-lg bg-white text-[#2E328D] font-bold text-xs shadow-md flex items-center gap-1 transform scale-95 group-hover/imgbtn:scale-100 transition-transform">
                        <span>Click Image to View Details →</span>
                      </span>
                    </div>
                  </button>

                  {/* Course Content */}
                  <div className="p-5">
                    <h3 className="text-base font-extrabold text-[#2E328D] group-hover:text-[#00A54F] transition-colors leading-snug line-clamp-2">
                      {course.name || course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {course.shortDescription || course.overview}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00A54F] flex-shrink-0" />
                        <div>
                          <span className="text-slate-400 block text-[9.5px]">Duration</span>
                          <span className="font-bold text-slate-800">{course.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#2E328D] flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-slate-400 block text-[9.5px]">
                            {course.fees ? 'Tuition Fee' : 'Eligibility'}
                          </span>
                          <span className="font-semibold text-slate-700 truncate block">
                            {course.fees || course.eligibility}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onNavigate(`/courses/${course.slug}`)}
                    className="flex-1 py-2 text-center rounded-lg bg-blue-50/70 hover:bg-[#2E328D] text-[#2E328D] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Program Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenEnquiry(course.name || course.title)}
                    className="px-3 py-2 rounded-lg bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs transition-colors shadow-2xs"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
