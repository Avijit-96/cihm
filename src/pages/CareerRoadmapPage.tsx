import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import {
  GraduationCap,
  Microscope,
  Hospital,
  Award,
  ChevronRight,
  TrendingUp,
  Layers,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface CareerRoadmapPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (courseName?: string) => void;
}

export const CareerRoadmapPage: React.FC<CareerRoadmapPageProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<'dmlt' | 'radiology' | 'dialysis' | 'ot' | 'hospital_mgmt'>('dmlt');

  const disciplines = [
    { id: 'dmlt', label: 'Medical Lab Technology (DMLT)' },
    { id: 'radiology', label: 'Radiology & Imaging' },
    { id: 'dialysis', label: 'Dialysis Technology' },
    { id: 'ot', label: 'Operation Theatre (OT)' },
    { id: 'hospital_mgmt', label: 'Hospital Administration' }
  ];

  const roadmapData = {
    dmlt: [
      {
        stage: 'Stage 1: Enrolled Student & Clinical Foundation',
        timeframe: 'Months 1 – 6',
        description: 'Comprehensive study of Anatomy, Physiology, Clinical Pathology, and Basic Hematology. Hands-on phlebotomy drills and microscope maintenance in campus labs.',
        milestones: ['Good Laboratory Practice (GLP)', 'Manual Blood Film Preparation', 'Pipetting Precision & Biosafety']
      },
      {
        stage: 'Stage 2: Advanced Analyzer Drills & Calibration',
        timeframe: 'Months 7 – 12',
        description: 'Automated 5-part hematology counters, automated biochemistry analyzers (dry/wet chemistry), ELISA reader operation, and microbiology culture plating.',
        milestones: ['Daily Analyzer Calibration & QC', 'Microbiology Gram Staining', 'Clinical Chemistry Profiling']
      },
      {
        stage: 'Stage 3: Rotational Hospital Internship',
        timeframe: 'Months 13 – 24',
        description: 'Mandatory clinical posting in accredited hospital blood banks, emergency trauma stat labs, and biochemistry reference units under senior pathologists.',
        milestones: ['Crossmatching & Blood Banking', 'Emergency STAT Reporting', 'LIMS (Laboratory Information Management)']
      },
      {
        stage: 'Stage 4: Certified Junior Medical Lab Technologist',
        timeframe: 'Years 1 – 3 post-grad',
        description: 'Independent diagnostic operation in hospital central labs, private diagnostic chains, or research clinical trials.',
        milestones: ['Pathologist Collaboration', 'Independent Sample Processing', 'Turnaround Time (TAT) Management']
      },
      {
        stage: 'Stage 5: Senior Technologist & Lab Quality Manager',
        timeframe: 'Years 4+ post-grad',
        description: 'Leading a diagnostic unit, managing NABL accreditation audits, overseeing junior technologists, and deploying automated molecular diagnostic equipment.',
        milestones: ['NABL Audit Lead', 'Molecular & RT-PCR Testing', 'Lab Operations Management']
      }
    ],
    radiology: [
      {
        stage: 'Stage 1: Radiographic Physics & Anatomy',
        timeframe: 'Months 1 – 6',
        description: 'Radiation protection, ALARA principles, darkroom techniques, and precise patient positioning for skeletal radiography.',
        milestones: ['Lead Shielding & Safety', 'X-Ray Beam Alignment', 'Patient Anatomy Positioning']
      },
      {
        stage: 'Stage 2: Digital Radiography & Fluoroscopy',
        timeframe: 'Months 7 – 12',
        description: 'Computed Radiography (CR) and Digital Radiography (DR) console operation, contrast media handling, and mobile bedside X-ray execution.',
        milestones: ['PACS & DICOM Workflow', 'Mobile Unit Bedside Imaging', 'Contrast Study Protocols']
      },
      {
        stage: 'Stage 3: Hospital Rotations & CT / MRI Exposure',
        timeframe: 'Months 13 – 24',
        description: 'Hospital emergency trauma imaging, cross-sectional anatomy observation, and rotation through ultrasound and multi-slice CT scanning units.',
        milestones: ['Trauma Center Rapid Imaging', 'CT Scanning Positioning', 'Emergency Contrast Safety']
      },
      {
        stage: 'Stage 4: Radiographer / Imaging Technologist',
        timeframe: 'Years 1 – 3 post-grad',
        description: 'Operating high-end digital imaging consoles across diagnostic centers and multispecialty radiology suites.',
        milestones: ['Diagnostic Precision', 'Zero Repeat-Exposure Index', 'Hospital Ward Coordination']
      },
      {
        stage: 'Stage 5: Chief Radiology Technologist / MRI Specialist',
        timeframe: 'Years 4+ post-grad',
        description: 'Departmental radiographer supervisor, clinical training coordinator for junior technicians, and high-field MRI protocol specialist.',
        milestones: ['MRI 3T Safety Lead', 'Department Radiation Safety Officer (RSO)', 'Diagnostic Center Operations']
      }
    ],
    dialysis: [
      {
        stage: 'Stage 1: Renal Anatomy & Hemodialysis Fundamentals',
        timeframe: 'Months 1 – 6',
        description: 'Nephrology fundamentals, fluid and electrolyte balance, dialyzer membrane physiology, and water treatment plant (RO) operation.',
        milestones: ['RO Water System Checks', 'Dialyzer Priming & Set-up', 'Aseptic Cannulation Technique']
      },
      {
        stage: 'Stage 2: Machine Operation & Anticoagulation Drills',
        timeframe: 'Months 7 – 12',
        description: 'Heparin dosage calculation, ultrafiltration profiling, blood line assembly, and machine troubleshooting during pressure alarms.',
        milestones: ['Alarm Response Protocols', 'Heparinization Drills', 'Dialysis Solution Chemistry']
      },
      {
        stage: 'Stage 3: Rotational Hospital Postings in Dialysis Unit',
        timeframe: 'Months 13 – 24',
        description: 'Handling live hemodialysis sessions under supervising nephrologists, fistula cannulation, and emergency hypotension management.',
        milestones: ['AV Fistula Cannulation', 'Acute Emergency Dialysis', 'Patient Fluid Status Assessment']
      },
      {
        stage: 'Stage 4: Certified Renal Dialysis Technologist',
        timeframe: 'Years 1 – 3 post-grad',
        description: 'Staff technologist in tertiary hospital dialysis suites or standalone renal care centers.',
        milestones: ['ICU SLED/CRRT Assistance', 'Complication Management', 'Patient Counselling & Diet Guidance']
      },
      {
        stage: 'Stage 5: Head Dialysis Technologist / Unit Supervisor',
        timeframe: 'Years 4+ post-grad',
        description: 'Supervising 20+ bed dialysis centers, overseeing infection control, dialyzer reprocessing plants, and nephrology protocols.',
        milestones: ['Renal Unit In-Charge', 'Infection Control Lead', 'CRRT Protocol Specialist']
      }
    ],
    ot: [
      {
        stage: 'Stage 1: Asepsis, Sterilization & Surgical Instruments',
        timeframe: 'Months 1 – 6',
        description: 'Autoclave operation, CSSD workflows, OT zoning, surgical attire, scrubbing, and comprehensive instrument trolley preparation.',
        milestones: ['Surgical Scrubbing & Gowning', 'CSSD Autoclave Testing', 'Surgical Instrument Identification']
      },
      {
        stage: 'Stage 2: Anesthesia Machine Drills & Patient Monitoring',
        timeframe: 'Months 7 – 12',
        description: 'Boyles machine setup, ventilator circuit leak testing, emergency intubation trays, suction apparatus, and surgical diathermy.',
        milestones: ['Anesthesia Workstation Check', 'Endotracheal Tube Assembly', 'Electrosurgical Cautery Safety']
      },
      {
        stage: 'Stage 3: Live Hospital OT Postings',
        timeframe: 'Months 13 – 24',
        description: 'Scrub technologist and circulating nurse assistance in general surgery, orthopedics, laparoscopy, and cardiothoracic procedures.',
        milestones: ['Laparoscopy Tower Connection', 'Intraoperative Swab/Needle Count', 'Emergency Crash Protocol']
      },
      {
        stage: 'Stage 4: Surgical Scrub / Anesthesia Technologist',
        timeframe: 'Years 1 – 3 post-grad',
        description: 'Working alongside chief surgeons in cardiac, neuro, or joint replacement operation theatres.',
        milestones: ['Specialty Surgical Tray Mastery', 'Rapid Emergency Laparotomy', 'Anesthesia Drug Handling']
      },
      {
        stage: 'Stage 5: OT In-Charge & Theatre Operations Manager',
        timeframe: 'Years 4+ post-grad',
        description: 'Directing the surgical theatre complex, coordinating sterilizer validations, OT equipment procurement, and surgical scheduling.',
        milestones: ['NABH OT Sterility Lead', 'Complex Multi-Theatre Supervisor', 'Biomedical Fleet Manager']
      }
    ],
    hospital_mgmt: [
      {
        stage: 'Stage 1: Healthcare Delivery & Hospital Systems',
        timeframe: 'Months 1 – 6',
        description: 'Hospital hierarchy, OPD and IPD workflows, medical terminology, and health record management.',
        milestones: ['Patient Registration Workflows', 'Medical Terminology Mastery', 'Health Insurance Basics']
      },
      {
        stage: 'Stage 2: Hospital Operations & Quality Standards',
        timeframe: 'Months 7 – 12',
        description: 'NABH and JCI indicators, hospital billing, inventory supply chains, pharmacy coordination, and statutory compliance.',
        milestones: ['NABH Quality Indicators', 'Hospital Billing Software (HIS)', 'Inventory Stock Cycles']
      },
      {
        stage: 'Stage 3: Hospital Administrative Internship',
        timeframe: 'Months 13 – 24',
        description: 'Front office management, patient relation services, floor coordination, and hospital facility inspection.',
        milestones: ['Patient Satisfaction Audits', 'Floor Operations Control', 'Insurance TPA Desk Handling']
      },
      {
        stage: 'Stage 4: Healthcare Operations Executive',
        timeframe: 'Years 1 – 3 post-grad',
        description: 'Managing hospital departments, patient feedback resolution, billing desks, and accreditation documentation.',
        milestones: ['Revenue Cycle Management', 'Team Shift Coordination', 'Service Quality Improvement']
      },
      {
        stage: 'Stage 5: Hospital Administrator / Operations Manager',
        timeframe: 'Years 4+ post-grad',
        description: 'Overseeing hospital facility operations, executive reporting, clinical audit coordination, and bed occupancy optimization.',
        milestones: ['Hospital P&L Awareness', 'Accreditation Lead (NABH)', 'Multi-Facility Executive']
      }
    ]
  };

  const currentStages = roadmapData[selectedDiscipline];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title="Paramedical Career Progression Roadmap | CIHM Kolkata"
        description="Explore the comprehensive 5-stage career progression pathway for paramedical and healthcare students from campus student to hospital specialist and department leadership."
        canonical="https://cihm.in/career-roadmap"
      />

      <Breadcrumbs items={[{ label: 'Career Progression Roadmap' }]} />

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
          Structured Professional Trajectory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
          Healthcare Career Progression Roadmap
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          At CIHM Kolkata, your education is built along a deliberate, structured trajectory — progressing from foundational scientific theory and hands-on laboratory instrumentation to hospital clinical immersion, certified technologist roles, and department leadership.
        </p>

        {/* Discipline Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
          {disciplines.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiscipline(d.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDiscipline === d.id
                  ? 'bg-[#2E328D] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Vertical Timeline Stages */}
      <div className="space-y-6">
        {currentStages.map((stg, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:border-[#00A54F]/40 transition-colors relative overflow-hidden"
          >
            {/* Top Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2E328D] font-black text-xs flex items-center justify-center flex-shrink-0">
                  0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#2E328D]">
                  {stg.stage}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00A54F] bg-green-50 px-3 py-1 rounded-full w-fit">
                <Clock className="w-3.5 h-3.5" />
                <span>{stg.timeframe}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {stg.description}
            </p>

            {/* Milestones Chips */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Core Clinical Competencies & Milestones:
              </span>
              <div className="flex flex-wrap gap-2">
                {stg.milestones.map((m, mIdx) => (
                  <span
                    key={mIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00A54F]" />
                    <span>{m}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap Action CTA */}
      <div className="bg-gradient-to-r from-blue-50/70 to-green-50/50 rounded-3xl p-6 sm:p-10 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-[#2E328D]">
            Start Your Journey on the Healthcare Career Pathway
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Schedule a 1-on-1 academic career guidance meeting at our Kolkata campus with experienced healthcare faculty.
          </p>
        </div>
        <button
          onClick={() => onOpenEnquiry('Career Roadmap Guidance')}
          className="px-6 py-2.5 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs shadow-sm transition-transform active:scale-95 flex-shrink-0"
        >
          Book Career Counselling
        </button>
      </div>
    </div>
  );
};
