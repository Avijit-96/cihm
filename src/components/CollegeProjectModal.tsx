import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Code2,
  Layers,
  Cpu,
  FileText,
  Sparkles,
  ExternalLink,
  X,
  BookOpen,
  Users,
  Check,
  Calendar,
  Download,
  Building2,
  Activity,
  Terminal,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

interface CollegeProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const CollegeProjectModal: React.FC<CollegeProjectModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSection
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'architecture' | 'viva'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-amber-400/40 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-amber-500 via-purple-700 to-blue-700 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shadow-md">
              <GraduationCap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  Academic Project 2026–2027
                </span>
                <span className="text-xs text-amber-200 font-semibold hidden sm:inline">
                  College Capstone & Evaluation Dossier
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                CIHM - Paramedical College Portal & Real-Time Telemetry System
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer relative z-10"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Background decorative elements */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 sm:px-8 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Project Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'features'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Key Modules & Animations</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Tech Stack & Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab('viva')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'viva'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Examiner & Viva Demo Guide</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-slate-300 text-sm">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    Student / Candidate
                  </div>
                  <div className="text-base font-black text-white mt-1">Gorachand Banerjee</div>
                  <div className="text-xs text-slate-400 mt-0.5">Project Developer & Lead</div>
                </div>

                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                  <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                    Academic Scope
                  </div>
                  <div className="text-base font-black text-white mt-1">Final Year College Project</div>
                  <div className="text-xs text-slate-400 mt-0.5">Session 2026–2027 • Kolkata</div>
                </div>

                <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Domain / Sector
                  </div>
                  <div className="text-base font-black text-white mt-1">Healthcare Education & Telemetry</div>
                  <div className="text-xs text-slate-400 mt-0.5">CIHM Paramedical Institute</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 p-5 rounded-2xl border border-amber-400/30 space-y-2">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>College Project Abstract & Mission</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  This college project implements a state-of-the-art digital web application for 
                  <strong className="text-amber-300"> CIHM (Central Institute of Healthcare & Management, Kolkata)</strong>. 
                  Designed to replace static university brochures, it delivers real-time interactive hospital rotation mapping, 
                  live simulated medical telemetry (SVG cardiac monitor, pathology analyzer & DR X-ray simulation), an 
                  interactive college photo collage wall, automated syllabus modals, and an intelligent career salary projection engine.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                  Key Academic Project Objectives:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Modern Student Onboarding</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Interactive 2-step qualification matcher for 10th/12th/graduates with instantaneous course recommendations.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Real-Time Clinical Telemetry</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Simulated medical laboratory test run engine, dynamic ECG heart rate monitor, and live sensor feeds.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">45+ Kolkata Hospital Rotations</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Interactive Kolkata medical corridor filter (EM Bypass, Salt Lake, South, North) with bed counts and rotation tracking.
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">Multi-Theme Live Client Switcher</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Four high-fidelity design themes (Next-Gen Animated, Radiant Royal, Clinical Luxe, Global Hub) with persistent state.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Full-Featured College Website & Interactive Innovations
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm">Interactive Diagnostic Laboratory Simulation</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Students & examiners can switch between 5 hospital departments (Pathology, Digital DR X-Ray, Renal Dialysis, Surgical OT, and UK Fellowship) and click <em>&quot;Trigger Machine Drill&quot;</em> to see an animated calibration progress bar, telemetry wave updates, and verified clinical findings.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm">Dynamic Clinical Rotation & Diagnostics Hub</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Categorizes clinical corridors across EM Bypass, Salt Lake, South Kolkata, and North Kolkata. Shows training unit capacities (4,500+ beds) and clinical specialty divisions.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm">Interactive Course Syllabus Modal & 3D Tilt Cards</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Every paramedical diploma features curriculum details, clinical lab breakdown (65% bedside training), eligibility criteria, and a modal drawer showing module breakdowns.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm">Interactive Campus Life Photo Collage & Notice Board</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Visual animated collage of real college campus moments (dissection lab, microscopy, convocation ceremony, blood camps) plus a real-time animated College Notice Board for academic circulars.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Technical Stack & Software Design Pattern
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 text-center">
                  <div className="text-xs font-black text-cyan-400">React 18+</div>
                  <div className="text-[10px] text-slate-400 mt-1">Component Architecture</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 text-center">
                  <div className="text-xs font-black text-blue-400">TypeScript 5</div>
                  <div className="text-[10px] text-slate-400 mt-1">Strict Type Safety</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 text-center">
                  <div className="text-xs font-black text-amber-400">Tailwind CSS</div>
                  <div className="text-[10px] text-slate-400 mt-1">Utility & Animations</div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 text-center">
                  <div className="text-xs font-black text-emerald-400">Vite Engine</div>
                  <div className="text-[10px] text-slate-400 mt-1">High-Speed Build</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-slate-500">// Directory & Component Structure</div>
                <div className="text-amber-300">src/components/</div>
                <div className="pl-4 text-slate-300">├── NextGenHomeView.tsx  (Style 4: Animated College Edition)</div>
                <div className="pl-4 text-slate-300">├── StyleSwitcherBanner.tsx (Real-Time 4-Style Switcher)</div>
                <div className="pl-4 text-slate-300">├── CollegeProjectModal.tsx (Examiner & Project Dossier)</div>
                <div className="pl-4 text-slate-300">├── Header.tsx & Footer.tsx (College Navigation & Helplines)</div>
                <div className="text-cyan-300">src/pages/</div>
                <div className="pl-4 text-slate-300">├── HomePage.tsx, CoursesPage.tsx, GalleryPage.tsx</div>
                <div className="pl-4 text-slate-300">├── PlacementsPage.tsx, FellowshipsPage.tsx, etc.</div>
              </div>
            </div>
          )}

          {/* TAB 4: VIVA & EXAMINER DEMO GUIDE */}
          {activeTab === 'viva' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>College Project Viva / Demo Evaluation Checklist</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Total 8 Live Test Cases</span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    step: 'Test Case 1',
                    action: 'Verify Animated SVG Heartbeat & Live BPM Pulse in Hero',
                    expected: 'Real-time pulsating ECG line with random physiological BPM changes (72-78 bpm)'
                  },
                  {
                    step: 'Test Case 2',
                    action: 'Test Interactive Clinical Lab Drill Machine in Workbench',
                    expected: 'Clicking "Trigger Machine Drill" animates progress to 100% and displays calibrated lab values'
                  },
                  {
                    step: 'Test Case 3',
                    action: 'Test 4-Style Switcher Bar at the top',
                    expected: 'Switches effortlessly between Next-Gen Animated, Radiant Royal, Clinical Luxe, and Global Hub with local storage persistence'
                  },
                  {
                    step: 'Test Case 4',
                    action: 'Explore Kolkata Hospital Corridor Rotation Filter',
                    expected: 'Filters hospital lists by EM Bypass, Salt Lake, South, and North Kolkata with live bed tallies'
                  },
                  {
                    step: 'Test Case 5',
                    action: 'Open Interactive Course Syllabus Modal',
                    expected: 'Clicking "Syllabus Details" opens an interactive modal with course duration, bedside training ratio, and curriculum modules'
                  },
                  {
                    step: 'Test Case 6',
                    action: 'Interact with the College Life Photo Collage Gallery',
                    expected: 'Interactive category filters with zoom hover states and student quotes'
                  },
                  {
                    step: 'Test Case 7',
                    action: 'Test Paramedical Career & Salary ROI Calculator',
                    expected: 'Calculates entry vs senior salary packages in INR and UK Pounds with instant career growth metrics'
                  },
                  {
                    step: 'Test Case 8',
                    action: 'Test Quick Admission / WhatsApp Counselling Drawer',
                    expected: 'Fast-action floating dock allows instant direct enquiry submission'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white">{item.action}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{item.expected}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 self-start sm:self-center flex-shrink-0">
                      ✓ Ready for Demo
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Presented for Final Year Academic College Project Evaluation</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black hover:from-amber-400 hover:to-amber-300 transition-all cursor-pointer shadow-md shadow-amber-500/20"
          >
            Back to College Portal
          </button>
        </div>
      </div>
    </div>
  );
};
