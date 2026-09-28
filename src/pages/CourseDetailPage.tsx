import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { Course } from '../types.js';
import {
  Clock,
  Award,
  CheckCircle2,
  Hospital,
  Microscope,
  Briefcase,
  HelpCircle,
  ArrowRight,
  GraduationCap,
  Layers,
  ChevronDown,
  ChevronUp,
  Share2
} from 'lucide-react';
import { ShareButtons } from '../components/ShareButtons.js';

interface CourseDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (courseName?: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenEnquiry
}) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/courses/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setCourse(d.data);
          // Fetch related courses
          fetch('/api/courses')
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setRelatedCourses(
                  data.data.filter((c: Course) => c.slug !== slug).slice(0, 3)
                );
              }
            });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">
        Loading program curriculum and clinical details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#2E328D]">Course Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested program could not be located in our academic directory.</p>
        <button
          onClick={() => onNavigate('/courses')}
          className="mt-4 px-5 py-2 bg-[#2E328D] text-white font-bold text-xs rounded-lg"
        >
          Return to Courses Directory
        </button>
      </div>
    );
  }

  const courseName = course.name || course.title || 'Course Details';

  // Course Schema.org JSON-LD (strictly without fees)
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: course.shortDescription || course.overview,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Central Institute of Healthcare & Management (CIHM)',
      sameAs: 'https://cihm.in'
    },
    educationalCredentialAwarded: 'Professional Diploma in Paramedical Sciences',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended (Classroom + Hospital Rotations)',
      courseWorkload: course.duration
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title={`${courseName} in Kolkata | CIHM Paramedical College`}
        description={`${courseName} at CIHM Kolkata. ${course.shortDescription || course.overview} Includes hospital rotations, advanced lab drills, and direct placement assistance.`}
        canonical={`https://cihm.in/courses/${course.slug}`}
        ogImage={course.image}
        schemaData={courseSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'Courses', url: '/courses' },
          { label: courseName }
        ]}
      />

      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Summary */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-0.5 rounded-md">
                {course.category}
              </span>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md">
                Hospital Rotations Included
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight leading-tight">
              {courseName}
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              {course.overview || course.shortDescription}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-[#00A54F]" />
                  <span>Duration</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                  {course.duration}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Award className="w-3.5 h-3.5 text-[#2E328D]" />
                  <span>Eligibility</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                  {course.eligibility}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Hospital className="w-3.5 h-3.5 text-[#00A54F]" />
                  <span>Clinical Rotations</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                  Tertiary Hospitals
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnquiry(courseName)}
                className="px-6 py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-sm transition-transform active:scale-95 flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Enquire for Next Batch</span>
              </button>
              <button
                onClick={() => onNavigate('/career-roadmap')}
                className="px-5 py-2.5 bg-[#2E328D] hover:bg-[#252973] text-white font-bold text-xs rounded-xl transition-colors shadow-2xs"
              >
                View Career Roadmap
              </button>
              <div className="ml-auto">
                <ShareButtons title={courseName} description={course.shortDescription || course.overview} />
              </div>
            </div>
          </div>

          {/* Natural Image (No Overlay Wash) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md h-72 sm:h-96">
              <img
                src={course.image}
                alt={courseName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Deep Curriculum, Practical Drills, Hospital Postings */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Program Highlights */}
          {course.highlights && course.highlights.length > 0 && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
              <h3 className="text-lg font-extrabold text-[#2E328D] flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#00A54F]" />
                <span>Program Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.highlights.map((hl: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A54F] mt-1.5 flex-shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Modular Curriculum Breakdown */}
          {course.curriculum && course.curriculum.length > 0 && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
              <h3 className="text-lg font-extrabold text-[#2E328D] flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-[#2E328D]" />
                <span>Detailed Modular Curriculum Breakdown</span>
              </h3>
              <div className="space-y-4">
                {course.curriculum.map((mod, modIdx) => (
                  <div key={mod.id || modIdx} className="border border-slate-200/80 rounded-xl p-4 bg-slate-50/40">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#00A54F] bg-green-50 px-2 py-0.5 rounded">
                        Module {mod.moduleNumber ?? modIdx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{mod.duration}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-[#2E328D] mt-2">{mod.title}</h4>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                      {mod.topics.map((t, tidx) => (
                        <li key={tidx} className="flex items-start gap-2">
                          <span className="text-slate-400">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Practical Lab & Hospital Rotations Details */}
          {(course.practicalTraining || course.practicalDetails || course.internship || course.internshipDetails) && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
              {(course.practicalDetails || course.practicalTraining) && (
                <div>
                  <h3 className="text-lg font-extrabold text-[#2E328D] flex items-center gap-2 mb-3">
                    <Microscope className="w-5 h-5 text-[#00A54F]" />
                    <span>Hands-on Laboratory Drills</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {course.practicalDetails || course.practicalTraining}
                  </p>
                </div>
              )}
              {(course.internshipDetails || course.internship) && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-lg font-extrabold text-[#2E328D] flex items-center gap-2 mb-3">
                    <Hospital className="w-5 h-5 text-[#2E328D]" />
                    <span>Hospital Internship & Clinical Rotations</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {course.internshipDetails || course.internship}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Clinical Competencies & Career Roles */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-extrabold text-[#2E328D] flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-[#00A54F]" />
                <span>Competencies Acquired</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {(course.competencies || course.skills || []).map((comp: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00A54F] mt-0.5 flex-shrink-0" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-[#2E328D] flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-[#2E328D]" />
                <span>Career Roles & Opportunities</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {(course.careerRoles || course.jobRoles || course.careerOpportunities || []).map((role: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2E328D] mt-1.5 flex-shrink-0" />
                    <span className="font-semibold">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Course FAQs */}
          {course.faqs && course.faqs.length > 0 && (
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
              <h3 className="text-lg font-extrabold text-[#2E328D] flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-[#00A54F]" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-3">
                {course.faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full text-left p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 text-xs font-bold text-slate-800"
                    >
                      <span>{faq.question}</span>
                      {openFaqIndex === idx ? (
                        <ChevronUp className="w-4 h-4 text-[#2E328D] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar: Quick Enquiry & Related Courses */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Sticky Admission Enquiry Card */}
          <div className="bg-blue-50/40 rounded-2xl p-6 border border-blue-100 shadow-xs sticky top-28">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00A54F] bg-white px-2 py-0.5 rounded shadow-2xs">
              Admissions Open
            </span>
            <h3 className="text-base font-extrabold text-[#2E328D] mt-2">
              Apply for {courseName}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Book a counselling session and visit our campus laboratories in Kolkata before the batch reaches capacity.
            </p>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => onOpenEnquiry(courseName)}
                className="w-full py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Submit Course Enquiry</span>
              </button>
              <button
                onClick={() => onNavigate('/contact')}
                className="w-full py-2.5 bg-white hover:bg-slate-50 text-[#2E328D] font-bold text-xs rounded-xl border border-slate-200 transition-colors"
              >
                Campus Location & Hotline
              </button>
            </div>

            {/* Internal Links for SEO */}
            <div className="mt-6 pt-4 border-t border-blue-100 text-xs space-y-2">
              <span className="font-bold text-slate-700 block">Related Resources</span>
              <button
                onClick={() => onNavigate('/career-roadmap')}
                className="text-left text-[#2E328D] hover:underline flex items-center gap-1"
              >
                <span>Career Progression Matrix →</span>
              </button>
              <button
                onClick={() => onNavigate('/placements')}
                className="text-left text-[#2E328D] hover:underline flex items-center gap-1"
              >
                <span>Recent Hospital Placements →</span>
              </button>
              <button
                onClick={() => onNavigate('/fellowships')}
                className="text-left text-[#2E328D] hover:underline flex items-center gap-1"
              >
                <span>Advanced Clinical Fellowships →</span>
              </button>
            </div>
          </div>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                Other Paramedical Programs
              </h4>
              <div className="space-y-3">
                {relatedCourses.map((rc) => (
                  <div
                    key={rc.id}
                    onClick={() => onNavigate(`/courses/${rc.slug}`)}
                    className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer group"
                  >
                    <h5 className="text-xs font-bold text-[#2E328D] group-hover:text-[#00A54F] transition-colors leading-snug">
                      {rc.name || rc.title}
                    </h5>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <span>{rc.duration}</span>
                      <span className="text-[#2E328D] group-hover:translate-x-0.5 transition-transform">
                        Explore →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
