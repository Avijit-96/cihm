import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import {
  Globe2,
  Award,
  Sparkles,
  Phone,
  CheckCircle2,
  CreditCard,
  Building2,
  BookOpen,
  GraduationCap,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Stethoscope,
  HeartPulse,
  Syringe,
  Activity,
  Baby,
  Brain,
  ShieldCheck,
  Search,
  ArrowRight
} from 'lucide-react';
import { ShareButtons } from '../components/ShareButtons.js';

interface InternationalFellowshipsPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (courseName?: string) => void;
}

export const InternationalFellowshipsPage: React.FC<InternationalFellowshipsPageProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // The 16 Clinical Specialties
  const specialties = [
    {
      id: 'cardiology',
      name: 'Fellowship in Clinical Cardiology',
      icon: 'HeartPulse',
      overview: 'Advanced non-invasive cardiology, ECG diagnostics, echocardiogram interpretation, coronary artery disease management, and heart failure protocols.',
      target: 'MBBS, MD/DNB, Medical Officers, General Physicians & Critical Care Doctors',
      modules: ['Non-invasive Cardiac Diagnostics', 'Acute Coronary Syndromes', 'Arrhythmia & Pacemaker Basics', 'Heart Failure Management']
    },
    {
      id: 'critical-care',
      name: 'Fellowship in Critical Care Medicine',
      icon: 'Activity',
      overview: 'ICU hemodynamics, advanced mechanical ventilation, invasive monitoring, sepsis resuscitation bundles, and multi-organ failure protocols.',
      target: 'Intensivists, Anesthesiologists, ER Physicians & Critical Care Officers',
      modules: ['Mechanical Ventilation Mastery', 'Hemodynamic Monitoring & Inotropes', 'Sepsis & Septic Shock Guidelines', 'ICU Ultrasound (POCUS)']
    },
    {
      id: 'diabetology',
      name: 'Fellowship in Diabetology & Metabolic Disorders',
      icon: 'Syringe',
      overview: 'Comprehensive type 1 and type 2 diabetes management, insulin pump therapy, diabetic foot care, gestational diabetes, and micro/macrovascular complications.',
      target: 'General Practitioners, Family Physicians, Endocrine Trainees',
      modules: ['Insulin Regimens & Technologies', 'Diabetic Emergencies (DKA/HHS)', 'Diabetic Nephropathy & Neuropathy', 'Lifestyle & Nutrition Intervention']
    },
    {
      id: 'emergency-medicine',
      name: 'Fellowship in Emergency Medicine',
      icon: 'HeartPulse',
      overview: 'Resuscitation protocols, polytrauma stabilization, toxicology, pediatric emergencies, rapid sequence intubation, and triage management in high-volume ERs.',
      target: 'Emergency Medical Officers, Casualty Doctors, Trauma Residents',
      modules: ['Advanced Cardiac Life Support (ACLS)', 'Trauma Assessment (ATLS Guidelines)', 'Toxicological Emergencies', 'Bedside Ultrasound in ER']
    },
    {
      id: 'gastroenterology',
      name: 'Fellowship in Clinical Gastroenterology & Hepatology',
      icon: 'Stethoscope',
      overview: 'GI emergencies, acute upper/lower GI bleed protocols, liver cirrhosis management, inflammatory bowel disease (IBD), and viral hepatitis.',
      target: 'Physicians, Internal Medicine Residents, Medical Officers',
      modules: ['Acute Liver Failure & Cirrhosis', 'Upper & Lower GI Bleed Management', 'Functional & Inflammatory Bowel Diseases', 'Diagnostic Endoscopy Overview']
    },
    {
      id: 'pediatrics',
      name: 'Fellowship in Clinical Pediatrics & Neonatology',
      icon: 'Baby',
      overview: 'Neonatal resuscitation, pediatric infectious diseases, growth & developmental milestones, pediatric emergency medicine, and immunization updates.',
      target: 'Pediatric Medical Officers, General Practitioners, Child Health Officers',
      modules: ['Neonatal Resuscitation & NICU Care', 'Pediatric Infections & Vaccination', 'Developmental Screening & Nutrition', 'Pediatric Emergency Resuscitation']
    },
    {
      id: 'neurology',
      name: 'Fellowship in Clinical Neurology',
      icon: 'Brain',
      overview: 'Acute ischemic stroke management, thrombolysis protocols, epilepsy classification and treatment, headache disorders, and neuro-critical care.',
      target: 'Physicians, Neurological Care Staff, ER Doctors',
      modules: ['Acute Stroke & Thrombolysis', 'Epilepsy & Status Epilepticus', 'Movement Disorders & Parkinsonism', 'Neuro-Infections & Neuropathies']
    },
    {
      id: 'pulmonology',
      name: 'Fellowship in Pulmonology & Respiratory Medicine',
      icon: 'Activity',
      overview: 'Management of COPD, severe asthma, interstitial lung diseases, sleep apnea, pulmonary tuberculosis, and non-invasive ventilation (BiPAP/CPAP).',
      target: 'Chest Physicians, Medical Officers, Critical Care Specialists',
      modules: ['COPD & Asthma Guidelines', 'NIV Application & Settings', 'Interstitial Lung Diseases (ILD)', 'Pulmonary Infections & Tuberculosis']
    },
    {
      id: 'nephrology',
      name: 'Fellowship in Clinical Nephrology & Dialysis',
      icon: 'Activity',
      overview: 'Acute kidney injury (AKI), chronic kidney disease (CKD) staging, hemodialysis & peritoneal dialysis prescription, and glomerulonephritis.',
      target: 'Nephrology Residents, Dialysis Medical Officers, Intensivists',
      modules: ['AKI Diagnostics & Staging', 'Hemodialysis Principles & Complications', 'Fluid & Electrolyte Disorders', 'Renal Replacement Therapy']
    },
    {
      id: 'oncology',
      name: 'Fellowship in Clinical Oncology & Palliative Care',
      icon: 'ShieldCheck',
      overview: 'Cancer screening, principles of systemic chemotherapy, immunotherapy overview, oncologic emergencies, and symptom-directed palliative medicine.',
      target: 'Oncology Residents, Medical Officers, Palliative Care Doctors',
      modules: ['Common Cancers Staging & Diagnostics', 'Principles of Systemic Therapies', 'Oncological Emergencies', 'Palliative Pain & Symptom Control']
    },
    {
      id: 'infectious-diseases',
      name: 'Fellowship in Infectious Diseases & Antimicrobial Stewardship',
      icon: 'ShieldCheck',
      overview: 'Tropical fevers, multi-drug resistant bacterial infections, HIV/AIDS therapeutics, hospital infection control, and rational antibiotic stewardship.',
      target: 'Microbiologists, Hospital Infection Control Officers, Internal Medicine Doctors',
      modules: ['Antimicrobial Stewardship & Antibiograms', 'Vector-Borne & Tropical Fevers', 'Hospital Acquired Infections (HAI)', 'Fungal & Viral Opportunistic Infections']
    },
    {
      id: 'dermatology',
      name: 'Fellowship in Clinical & Aesthetic Dermatology',
      icon: 'Sparkles',
      overview: 'Diagnostic approaches to dermatoses, pediatric dermatology, cutaneous manifestations of systemic disease, and introduction to cosmetic procedures.',
      target: 'General Practitioners, Cosmetic & Skin Clinicians',
      modules: ['Common Dermatoses Diagnosis & Treatment', 'Skin Manifestations of Internal Diseases', 'Basics of Aesthetic Procedures', 'Dermatological Therapeutics']
    },
    {
      id: 'orthopedics',
      name: 'Fellowship in Orthopedic Rehabilitation & Sports Medicine',
      icon: 'Activity',
      overview: 'Non-surgical musculoskeletal care, sports injury management, joint pain protocols, regenerative medicine overview, and post-operative rehab.',
      target: 'Orthopedic Trainees, Physiotherapists, Sports Doctors',
      modules: ['Sports Injury Assessment', 'Joint Injection Techniques', 'Spine & Back Pain Pathways', 'Post-Surgical Rehabilitation']
    },
    {
      id: 'obstetrics-gyn',
      name: 'Fellowship in Clinical Obstetrics & Gynecology',
      icon: 'Baby',
      overview: 'High-risk pregnancy management, obstetric emergencies (PPH, eclampsia), gynecological endocrinology, infertility workup, and contraceptive updates.',
      target: 'Maternity Medical Officers, General Physicians, Women\'s Health Officers',
      modules: ['High-Risk Pregnancy Protocols', 'Emergency Obstetric Management (PPH)', 'Infertility Diagnostic Workup', 'Menstrual Disorders & PCOS']
    },
    {
      id: 'psychiatry',
      name: 'Fellowship in Clinical Psychiatry & Mental Health',
      icon: 'Brain',
      overview: 'Diagnosis and psychopharmacology of depression, anxiety, bipolar disorder, psychosis, addiction medicine, and psychiatric emergencies.',
      target: 'Family Physicians, Primary Health Doctors, Psychiatric Residents',
      modules: ['Depression & Anxiety Pharmacotherapy', 'Psychotic Disorders & Mood Stabilizers', 'Substance Abuse & De-addiction', 'Psychiatric Emergencies & De-escalation']
    },
    {
      id: 'hospital-admin',
      name: 'Fellowship in International Healthcare Management & Quality',
      icon: 'Building2',
      overview: 'Global healthcare administration, NABH/JCI accreditation, hospital finance, clinical governance, and patient safety systems.',
      target: 'Hospital Superintendents, Medical Directors, Healthcare Executives',
      modules: ['Hospital Quality & International Accreditations', 'Healthcare Financial Management', 'Clinical Governance & Risk Management', 'Patient Experience & Operations']
    }
  ];

  const filteredSpecialties = specialties.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqs = [
    {
      q: 'What is the awarding body and international standing of these fellowships?',
      a: 'The fellowships are awarded in academic collaboration with Virtued Eduversity (London, UK) & Virtued Academy International. They are internationally benchmarked continuing medical education programs recognized across private hospitals, healthcare groups, and international clinical settings.'
    },
    {
      q: 'Who is eligible to enroll in these 1-Year Fellowship Programs?',
      a: 'Qualified doctors holding MBBS, MD, MS, DNB, foreign medical graduates (FMGE/NExT), post-graduates, registered medical practitioners, and experienced healthcare and clinical specialists are eligible according to the specialty chosen.'
    },
    {
      q: 'How is the course delivered, and what is the mode of study?',
      a: 'The program is delivered 100% online through modular digital lectures, curated clinical case studies, international reference materials, and recorded masterclasses. You can study flexibly without leaving your existing clinical hospital practice.'
    },
    {
      q: 'What is the fee structure and payment options?',
      a: 'Under the 2026–27 academic opening offer, the total course fee is specially reduced from the actual fee of ₹1,20,000 to only ₹59,000 (all inclusive). Zero-Cost EMI monthly installment facilities are available for enrolled candidates.'
    },
    {
      q: 'Where is the East India Authorized Admission Center located?',
      a: 'CIHM DumDum (Kolkata) is the designated East India Authorised Center for Virtued Eduversity & Virtued Academy International. Admissions, candidate documentation, and academic coordination are handled directly by the CIHM DumDum helpline at 9073737888 / 9073737444.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
      <SEOHelmet
        title="1-Year Online Fellowship Courses (London) 2026 | Virtued Eduversity & CIHM DumDum Kolkata"
        description="Enroll in 1-Year Online Fellowship Courses (London) for doctors across 16 clinical specialties: Cardiology, Critical Care, Diabetology, Emergency Medicine & more. Special offer ₹59,000 with Zero Cost EMI. East India Center: CIHM DumDum."
        canonical="https://cihm.in/international-fellowships"
      />

      <Breadcrumbs
        items={[
          { label: 'Courses', url: '/courses' },
          { label: 'London Fellowships 2026–27' }
        ]}
      />

      {/* Hero Banner: Premium London Blue & Gold Theme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#121542] via-[#2E328D] to-[#0a0d2e] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border-2 border-[#00A54F]/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A54F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 bg-[#00A54F] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-xs flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              NEW COURSE OPEN – 2026–27
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold rounded-full border border-amber-300/30 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" />
              Virtued Eduversity (London, UK) & Virtued Academy International
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            1-Year Online Fellowship Courses (London)
          </h1>
          <p className="text-lg sm:text-xl font-bold text-emerald-300">
            For Doctors & Healthcare Professionals – 16 Clinical Specialties
          </p>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
            Elevate your medical credentials with prestigious British clinical fellowships. Study flexibly online alongside your existing hospital duty with curated case studies, modular assessments, and internationally benchmarked clinical learning.
          </p>

          {/* Pricing Highlight Pill Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
              <span className="text-[10px] uppercase text-slate-300 block font-semibold">Standard Fee</span>
              <span className="text-sm line-through text-slate-300 font-bold">₹1,20,000</span>
            </div>
            <div className="bg-[#00A54F] px-5 py-2 rounded-xl shadow-lg border border-emerald-300/50">
              <span className="text-[10px] uppercase text-white/90 block font-black">Special Limited Offer</span>
              <span className="text-xl sm:text-2xl font-black text-amber-300">ONLY ₹59,000</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-300" />
              <div>
                <span className="text-[10px] uppercase text-slate-300 block font-semibold">Installment Option</span>
                <span className="text-xs font-bold text-white">Zero-Cost EMI Available</span>
              </div>
            </div>
          </div>

          {/* Center Authorization & Action Buttons */}
          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Building2 className="w-4 h-4 text-[#00A54F]" />
                <span>East India Authorised Center: CIHM DumDum, Kolkata</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                <Phone className="w-3.5 h-3.5" />
                <span>Admissions Helpline: 9073737888 / 9073737444</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenEnquiry('London Fellowships 2026-27')}
                className="px-6 py-3 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Apply / Enquire Now</span>
              </button>
              <ShareButtons
                title="1-Year Online Fellowship Courses (London) 2026 - Virtued Eduversity & CIHM DumDum"
                description="Explore 16 International Fellowships for doctors. Special offer ₹59,000 with Zero-Cost EMI."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Institutional Features Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E328D] flex items-center justify-center mb-3">
            <Globe2 className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-[#2E328D]">UK Academic Credentials</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Virtued Eduversity (London, UK) & Virtued Academy International certified curricula.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-[#00A54F] flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-[#2E328D]">100% Online & Flexible</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            1-Year self-paced modular study designed specifically for practicing physicians.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-[#2E328D]">Affordable Fee: ₹59,000</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Massive savings from ₹1,20,000 standard fee with flexible Zero-Cost EMI plans.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E328D] flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-[#2E328D]">CIHM DumDum Center</h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Direct institutional support, student verification, and credential issuance in Kolkata.
          </p>
        </div>
      </section>

      {/* Directory of 16 Clinical Specialties */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
              Specialized Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E328D] tracking-tight mt-2">
              Choose From 16 Clinical Specialties
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select your clinical focus area to view modules, target candidate profiles, and curriculum structure.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search specialty, e.g. Cardiology..."
              className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
            />
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecialties.map((spec, idx) => {
            const isSelected = selectedSpecialty === spec.id;

            return (
              <div
                key={spec.id}
                className={`bg-white rounded-2xl p-6 border transition-all duration-200 shadow-xs flex flex-col justify-between ${
                  isSelected ? 'border-[#00A54F] ring-2 ring-[#00A54F]/20' : 'border-slate-200/80 hover:border-[#2E328D]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2E328D] flex items-center justify-center font-black text-sm">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <span className="text-[10px] font-bold text-[#00A54F] bg-green-50 px-2 py-0.5 rounded-full">
                      1-Year Online
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#2E328D] mt-3 leading-snug">
                    {spec.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {spec.overview}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Target Audience:</span>
                    <span className="font-semibold text-slate-700 text-[11px] leading-tight block mt-0.5">
                      {spec.target}
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase mb-1">Core Modules:</span>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {spec.modules.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#00A54F] mt-0.5 flex-shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onOpenEnquiry(spec.name)}
                    className="flex-1 py-2 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs transition-colors shadow-2xs text-center"
                  >
                    Enquire / Register
                  </button>
                  <button
                    onClick={() => setSelectedSpecialty(isSelected ? null : spec.id)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    {isSelected ? 'Collapse' : 'Details'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Program FAQs */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            Candidate Assistance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E328D] tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Key details about registration, certification validity, and center contacts.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#2E328D] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openFaqIndex === idx && (
                <div className="p-4 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Authorized Center Footer Box */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-3xl p-6 sm:p-8 border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#2E328D] bg-white px-3 py-1 rounded-md border border-blue-200 shadow-2xs">
            East India Authorised Center
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#2E328D]">
            CIHM DumDum – Central Institute of Healthcare & Management
          </h3>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            Contact our dedicated fellowship admissions cell for prospectus, syllabus documents, and direct registration assistance.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 pt-1">
            <span className="flex items-center gap-1.5 text-[#00A54F]">
              <Phone className="w-3.5 h-3.5" /> 9073737888
            </span>
            <span className="flex items-center gap-1.5 text-[#00A54F]">
              <Phone className="w-3.5 h-3.5" /> 9073737444
            </span>
          </div>
        </div>

        <button
          onClick={() => onOpenEnquiry('London Fellowships 2026-27')}
          className="px-6 py-3 rounded-xl bg-[#2E328D] hover:bg-[#252973] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 flex-shrink-0"
        >
          <span>Connect with DumDum Desk</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
