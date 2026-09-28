import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../server/data/cihm-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Maintain existing 7 courses if present, but enrich them
const existingCourses = db.courses || [];
const existingCourseMap = new Map(existingCourses.map(c => [c.slug, c]));

// 1. All Paramedical & Diagnostic Courses (as on cihm.in)
const paramedicalCourses = [
  {
    id: "course-dmlt",
    slug: "dmlt",
    name: "Diploma in Medical Laboratory Technology (DMLT)",
    category: "Diagnostic & Laboratory Sciences",
    shortDescription: "Two-year comprehensive paramedical program providing intensive laboratory training in clinical biochemistry, hematology, medical microbiology, histopathology, and blood banking.",
    fullDescription: "The Diploma in Medical Laboratory Technology (DMLT) program at CIHM is designed to prepare skilled laboratory professionals proficient in conducting accurate diagnostic tests. Students train on automated clinical analyzers, microtomes, spectrophotometers, and blood cell counters. The curriculum balances academic classroom fundamentals with continuous hospital rotations.",
    overview: "Medical laboratory professionals form the diagnostic backbone of modern patient care. This program equips trainees with end-to-end knowledge of sample collection, diagnostic processing, quality control protocols, bio-safety standards, and automated laboratory management.",
    eligibility: "Higher Secondary (10+2) or equivalent examination in Science stream with Physics, Chemistry, and Biology.",
    duration: "2 Years (4 Semesters) including 6 Months Mandatory Hospital Clinical Internship",
    curriculum: [
      { id: "dmlt-m1", title: "Semester 1: Foundation of Clinical Anatomy, Physiology & Bio-safety", duration: "6 Months", topics: ["General Human Anatomy and Organ Systems", "Physiological Blood Parameters & Hemostasis", "Laboratory Glassware, Reagents & Bio-Safety Level Guidelines", "Sterilization, Autoclaving & Biomedical Waste Segregation"] },
      { id: "dmlt-m2", title: "Semester 2: Clinical Biochemistry & Analytical Instrumentation", duration: "6 Months", topics: ["Electrolyte, Renal & Liver Function Profiles", "Automated Clinical Chemistry Analyzers", "Spectrophotometry, Chromatography & Quality Calibration", "Enzymology & Lipid Profile Diagnostic Protocols"] },
      { id: "dmlt-m3", title: "Semester 3: Medical Hematology & Blood Transfusion Services", duration: "6 Months", topics: ["Complete Blood Count (CBC) & Automated Hematology Analyzers", "Coagulation Profiling, PT/INR & Bleeding Disorders", "Blood Grouping, Cross-Matching & Component Separation", "Peripheral Blood Smear Staining & Morphological Evaluation"] },
      { id: "dmlt-m4", title: "Semester 4: Clinical Microbiology, Serology & Histopathology", duration: "6 Months", topics: ["Bacteriological Culture, Media Preparation & Antibiotic Sensitivity", "ELISA, Rapid Antigen & Serological Testing", "Tissue Processing, Microtomy & Hematoxylin-Eosin Staining", "Hospital Clinical Internship & Diagnostic Reporting"] }
    ],
    practicalTraining: "Daily clinical laboratory drills involving venous blood collection, automated sample centrifugation, biochemical profiling, microbiological culture streak plates, and automated cell counter maintenance.",
    clinicalExposure: "Mandatory clinical hospital postings at partnered tertiary multispecialty hospitals across Kolkata, assisting registered pathologists in live diagnostic departments.",
    internship: "6-month dedicated full-time rotational hospital internship with rotations across Clinical Biochemistry, Pathology, Blood Bank, and Microbiology laboratories.",
    skills: ["Automated Hematology Analyzer Operation", "Venipuncture & Blood Sample Processing", "Biochemical Reagent Calibration", "Microbiological Culture & Gram Staining", "Histopathological Tissue Embedding & Slicing", "Quality Control (L-J Charts) Maintenance"],
    careerOpportunities: ["Medical Laboratory Technologist in Multispecialty Hospitals", "Senior Diagnostic Technician in NABL Accredited Pathology Labs", "Blood Bank Technical Officer", "Clinical Research Assistant in Diagnostic Trials", "Quality Control Analyst in Diagnostic Manufacturing"],
    jobRoles: ["Medical Lab Technologist (MLT)", "Biochemistry Technician", "Blood Bank Officer", "Histopathology Associate", "Microbiology Lab Assistant"],
    faqs: [
      { question: "Is DMLT eligible for hospital appointments across government and private sectors?", answer: "Yes. DMLT qualified candidates who complete certified training and internships are eligible for diagnostic and laboratory technician roles across private multispecialty hospitals, diagnostic chains, and medical centers." },
      { question: "What is the practical to theory ratio during the program?", answer: "The program follows an intensive 60:40 practical-to-theory split, ensuring students spend substantial hours inside laboratories and hospital wards." },
      { question: "Does the institute assist with hospital internships?", answer: "Yes, CIHM coordinates all clinical rotations and hospital internships through established academic affiliations with leading hospitals in Kolkata." }
    ],
    relatedCourseSlugs: ["blood-collection-course", "medical-lab-assistant", "radiology-medical-imaging"],
    admissionCtaText: "Apply for DMLT Batch",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "DMLT Course in Kolkata | Diploma in Medical Laboratory Technology Admissions",
    metaDescription: "Enroll in Diploma in Medical Laboratory Technology (DMLT) at CIHM Kolkata. 2-year clinical program with 100% hospital internship and placement support.",
    focusKeyword: "DMLT course in Kolkata",
    secondaryKeywords: ["medical lab technology diploma", "paramedical laboratory course", "DMLT admission Kolkata"],
    canonicalUrl: "https://cihm.in/courses/dmlt",
    ogTitle: "DMLT Course Kolkata – Central Institute of Healthcare & Management",
    ogDescription: "Join Eastern India's benchmark DMLT program at CIHM Kolkata with advanced pathology labs and hospital clinical training.",
    ogImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-blood-collection",
    slug: "blood-collection-course",
    name: "Blood Collection (Phlebotomy Technician Course)",
    category: "Diagnostic & Laboratory Sciences",
    shortDescription: "Specialized certified clinical phlebotomy program mastering venipuncture, pediatric blood sampling, vacutainer collection systems, pre-analytical error prevention, and bio-safety protocols.",
    fullDescription: "The Blood Collection (Phlebotomy Technician) program at CIHM trains students in precision venous and capillary blood draw techniques, specimen labeling, cold chain maintenance, and emergency syncope management. Phlebotomists are frontline healthcare professionals vital to accurate diagnostic triage.",
    overview: "Phlebotomy is a critical diagnostic skill where patient safety, aseptic technique, and specimen integrity are paramount. Students gain extensive hands-on experience using manikins and guided clinical blood donation drives.",
    eligibility: "Class 10th or 10+2 passed from any recognized secondary board with keen interest in allied health sciences.",
    duration: "6 Months to 1 Year (Hands-on Clinical Rotation Included)",
    curriculum: [
      { id: "bc-m1", title: "Module 1: Venous Anatomy & Phlebotomy Equipment", duration: "2 Months", topics: ["Vein Anatomy of Arm, Hand, and Pediatric Sites", "Vacutainer Tube Color Codes & Additive Mechanics", "Needle Gauges, Safety Butterflies & Tourniquets", "Patient Identification & Consent Protocols"] },
      { id: "bc-m2", title: "Module 2: Venipuncture Drills & Pre-analytical Quality", duration: "2 Months", topics: ["Step-by-Step Order of Draw Guidelines", "Capillary Puncture (Fingerstick & Heelstick)", "Preventing Hemolysis, Clotting & Hematomas", "Specimen Centrifugation, Temperature & Transport"] },
      { id: "bc-m3", title: "Module 3: Bio-safety, Waste Management & Hospital Postings", duration: "2 Months", topics: ["Needlestick Injury Prevention Protocols", "Biomedical Waste Segregation (Biohazard Color Codes)", "Infection Control & PPE Guidelines", "Hospital Pathology Phlebotomy Rotations"] }
    ],
    practicalTraining: "Over 200+ supervised venipuncture collections, butterfly catheter insertions, pediatric fingersticks, and blood glucose glucometer calibrations.",
    clinicalExposure: "Postings in outpatient phlebotomy counters and blood donor camps at partner multispecialty hospitals across Kolkata.",
    internship: "3 Months full-time clinical attachment in diagnostic chain collection centers.",
    skills: ["Precision Venipuncture", "Vacutainer Order of Draw", "Pediatric Blood Sampling", "Needlestick Safety Compliance", "Cold Chain Sample Transport"],
    careerOpportunities: ["Certified Phlebotomist in Hospitals", "Diagnostic Center Blood Sample Specialist", "Home Healthcare Phlebotomist", "Blood Donation Center Officer"],
    jobRoles: ["Phlebotomy Technician", "Blood Collection Officer", "Pathology Sample Associate"],
    faqs: [
      { question: "Is this course recognized for hospital phlebotomy jobs?", answer: "Yes, certified phlebotomists from CIHM are employed across hospital OPDs, diagnostic collection centers, and mobile blood collection units." },
      { question: "What is the minimum qualification required?", answer: "Class 10th or 10+2 pass candidates can apply for this certified course." }
    ],
    relatedCourseSlugs: ["dmlt", "medical-lab-assistant"],
    admissionCtaText: "Enrol in Blood Collection",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "Blood Collection Course in Kolkata | Phlebotomy Technician Admissions",
    metaDescription: "Join certified Blood Collection & Phlebotomy Technician training at CIHM Kolkata. Master venipuncture, order of draw, and hospital clinical sample collection.",
    focusKeyword: "blood collection course Kolkata",
    secondaryKeywords: ["phlebotomy course Kolkata", "phlebotomist training", "blood draw certification"],
    canonicalUrl: "https://cihm.in/courses/blood-collection-course",
    ogTitle: "Blood Collection Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Master certified clinical phlebotomy and venipuncture at CIHM Kolkata with hospital clinical rotations.",
    ogImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-medical-lab-assistant",
    slug: "medical-lab-assistant",
    name: "Medical Lab Assistant",
    category: "Diagnostic & Laboratory Sciences",
    shortDescription: "One-year professional certificate course training candidates in clinical laboratory operations, specimen preparation, reagent handling, and diagnostic testing support.",
    fullDescription: "The Medical Lab Assistant program equips students with foundational diagnostic laboratory competencies. Students master specimen sorting, chemical reagent preparation, staining techniques, centrifuge operation, and autoclaving procedures under pathologist supervision.",
    overview: "Medical lab assistants play an essential role in ensuring accurate laboratory turnaround times and high-quality specimen processing in emergency and routine pathology settings.",
    eligibility: "Class 10+2 or equivalent examination.",
    duration: "1 Year (Including Hospital Laboratory Rotations)",
    curriculum: [
      { id: "mla-m1", title: "Module 1: General Pathology Laboratory Principles", duration: "3 Months", topics: ["Laboratory Safety, Hazard Signs & First Aid", "Glassware Cleaning, Sterilization & Storage", "Centrifugation, Pipetting & Dilution Calculations"] },
      { id: "mla-m2", title: "Module 2: Specimen Staining & Basic Testing", duration: "3 Months", topics: ["Urine Routine & Microscopic Examination", "Stool Examination & Occult Blood Test", "Gram Staining & Leishman Staining Protocols"] },
      { id: "mla-m3", title: "Module 3: Clinical Biochemistry & Hematology Support", duration: "3 Months", topics: ["ESR, Bleeding Time & Clotting Time Tests", "Blood Glucose & Biochemical Test Assays", "Automated Analyzer Sample Loading & Maintenance"] },
      { id: "mla-m4", title: "Module 4: Quality Control & Clinical Hospital Attachment", duration: "3 Months", topics: ["L-J Quality Charts & Laboratory Records", "Biomedical Waste Disposal", "Hospital Lab Internship Postings"] }
    ],
    practicalTraining: "Daily clinical laboratory drills involving sample sorting, centrifuge balancing, manual ESR estimation, and urine strip analysis.",
    clinicalExposure: "Clinical postings in diagnostic laboratories across Kolkata multispecialty hospitals.",
    internship: "3 Months practical internship in NABL accredited partner labs.",
    skills: ["Specimen Sorting & Triage", "Reagent Preparation", "Urine Routine Analysis", "Centrifuge & Pipette Handling", "Laboratory Record Management"],
    careerOpportunities: ["Lab Assistant in Diagnostic Labs", "Pathology Clinical Assistant", "Hospital Sample Processing Aide"],
    jobRoles: ["Medical Lab Assistant", "Clinical Pathology Assistant"],
    faqs: [
      { question: "What is the difference between DMLT and Medical Lab Assistant?", answer: "DMLT is a 2-year diploma covering advanced pathology, while Medical Lab Assistant is a 1-year career-entry program focused on practical sample processing and laboratory support." }
    ],
    relatedCourseSlugs: ["dmlt", "blood-collection-course"],
    admissionCtaText: "Enrol as Medical Lab Assistant",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"],
    featured: false,
    status: "published",
    seoTitle: "Medical Lab Assistant Course in Kolkata | CIHM Admissions",
    metaDescription: "Apply for Medical Lab Assistant certification at CIHM Kolkata. 1-year practical program with hospital laboratory rotations.",
    focusKeyword: "medical lab assistant course Kolkata",
    secondaryKeywords: ["lab assistant diploma", "clinical lab training Kolkata"],
    canonicalUrl: "https://cihm.in/courses/medical-lab-assistant",
    ogTitle: "Medical Lab Assistant Course – CIHM Kolkata",
    ogDescription: "Launch your healthcare diagnostic career with CIHM's 1-Year Medical Lab Assistant training program in Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-xray-technician",
    slug: "xray-technician-course",
    name: "XRay Technician Course",
    category: "Radiological Sciences",
    shortDescription: "Comprehensive training in radiographic physics, patient radiographic positioning, digital radiography (DR/CR) consoles, radiation protection, and darkroom/PACS workflows.",
    fullDescription: "The X-Ray Technician program prepares radiographers to perform skeletal, thoracic, and abdominal radiographic imaging safely. Students gain deep knowledge of radiation physics, ALARA principles, lead apron shielding, and contrast radiography procedures.",
    overview: "Radiography is an indispensable imaging modality in emergency trauma, orthopedics, and respiratory care. CIHM provides clinical exposure on high-frequency digital X-ray machines and mobile bedside units.",
    eligibility: "10+2 with Physics, Chemistry, and Biology/Mathematics.",
    duration: "1 to 2 Years (Hands-on Clinical Radiology Rotations)",
    curriculum: [
      { id: "xr-m1", title: "Module 1: Radiation Physics & Radiation Protection", duration: "3 Months", topics: ["X-Ray Tube Anatomy, Cathode-Anode Physics & kVp/mAs Factors", "Radiation Biology & ALARA Safety Principles", "Lead Shielding, TLD Badges & Regulatory AERB Norms"] },
      { id: "xr-m2", title: "Module 2: Radiographic Positioning & Skeletal Anatomy", duration: "3 Months", topics: ["Chest X-Ray: PA, AP, Lateral & Decubitus Views", "Skeletal Radiography: Extremities, Pelvis, Spine & Skull Views", "Pediatric Radiographic Immobilization Techniques"] },
      { id: "xr-m3", title: "Module 3: Digital Radiography (DR/CR) & Contrast Studies", duration: "3 Months", topics: ["Computed Radiography (CR) Plate Scanning", "Digital Direct Radiography (DR) Flat Panel Detectors", "Contrast Radiography: Barium Meal, IVU & HSG Assays", "PACS Network Archiving & Image Artifact Identification"] },
      { id: "xr-m4", title: "Module 4: Emergency Radiography & Hospital Postings", duration: "3 Months", topics: ["Mobile Portable X-Ray in ICUs and Trauma Bays", "Operation Theatre C-Arm Imaging Assistance", "Hospital Clinical Internship Rotations"] }
    ],
    practicalTraining: "Hands-on calibration of digital X-ray exposure parameters, patient positioning on bucky tables, and C-Arm fluoroscopy maneuvers.",
    clinicalExposure: "Radiology department rotations across top Kolkata multispecialty hospitals.",
    internship: "6 Months hospital internship in diagnostic imaging departments.",
    skills: ["Digital Radiography (DR/CR)", "Radiation Protection Compliance", "Patient Radiographic Positioning", "Contrast Radiography Assisting", "C-Arm Fluoroscopy Handling"],
    careerOpportunities: ["X-Ray Technologist in Multispecialty Hospitals", "Radiographer in Diagnostic Imaging Centers", "Trauma Radiology Specialist"],
    jobRoles: ["X-Ray Technician", "Radiographer", "Diagnostic Imaging Technologist"],
    faqs: [
      { question: "Is radiation safety taught in the course?", answer: "Yes, students receive comprehensive training in radiation biology, ALARA principles, TLD monitoring, and lead shielding compliance." }
    ],
    relatedCourseSlugs: ["radiology-medical-imaging", "ecg-technician-course"],
    admissionCtaText: "Enrol in X-Ray Technician Course",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "XRay Technician Course in Kolkata | Radiography Admissions CIHM",
    metaDescription: "Join certified X-Ray Technician training at CIHM Kolkata. Master digital radiography, patient positioning, and hospital clinical radiology postings.",
    focusKeyword: "X-ray technician course Kolkata",
    secondaryKeywords: ["radiography course Kolkata", "X-ray diploma admission"],
    canonicalUrl: "https://cihm.in/courses/xray-technician-course",
    ogTitle: "X-Ray Technician Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Gain clinical expertise in digital radiography and radiation protection at CIHM Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-ecg-technician",
    slug: "ecg-technician-course",
    name: "ECG Technician Course",
    category: "Cardiovascular Diagnostics",
    shortDescription: "Focused clinical program in 12-lead electrocardiography, Holter monitoring, Treadmill Stress Testing (TMT), and arrhythmia recognition.",
    fullDescription: "The ECG Technician program prepares professionals to record pristine 12-lead electrocardiograms, identify critical cardiac arrhythmias, monitor ambulatory Holter recordings, and assist cardiologists during cardiac stress testing.",
    overview: "Cardiovascular diseases are the leading cause of adult morbidity. Skilled ECG technicians provide fast, artifact-free cardiac tracings crucial for diagnosing myocardial infarctions and rhythm disturbances in emergency and outpatient units.",
    eligibility: "Class 10+2 passed (Science/General).",
    duration: "6 Months to 1 Year (Hospital Cardiology Rotations)",
    curriculum: [
      { id: "ecg-m1", title: "Module 1: Cardiac Anatomy, Electrophysiology & Lead Placement", duration: "2 Months", topics: ["Conduction System: SA Node, AV Node, Bundle of His, Purkinje Fibers", "12-Lead ECG Electrode Placement (Limb Leads & Precordial V1-V6)", "Calibration Standards: Paper Speed (25 mm/s) & Voltage (10 mm/mV)", "Eliminating Somatic Muscle Tremors & AC Baseline Artifacts"] },
      { id: "ecg-m2", title: "Module 2: Normal Tracing & Pathological Arrhythmia Recognition", duration: "2 Months", topics: ["P-Wave, PR Interval, QRS Complex, ST Segment & T-Wave Norms", "Tachycardia, Bradycardia, Atrial Fibrillation & Flutter", "Ventricular Tachycardia & Ventricular Fibrillation Emergencies", "ST-Elevation Myocardial Infarction (STEMI) Patterns"] },
      { id: "ecg-m3", title: "Module 3: Holter Monitoring & Treadmill Stress Testing (TMT)", duration: "2 Months", topics: ["24-Hour Ambulatory Holter Monitor Application & Software Analysis", "Bruce Protocol Treadmill Stress Test (TMT) Patient Prep", "Emergency Defibrillation Basics & CPR Guidelines", "Hospital Cardiology Postings"] }
    ],
    practicalTraining: "Extensive hands-on recording of 12-lead ECGs on computerized machines, skin electrode prep, and Holter tape readout.",
    clinicalExposure: "Hospital cardiology outpatient departments, ICU monitoring beds, and cardiac cath lab observatories.",
    internship: "3 Months cardiology clinical posting in partner hospitals.",
    skills: ["12-Lead ECG Acquisition", "Arrhythmia & STEMI Recognition", "Treadmill Stress Test (TMT) Operation", "Holter Monitor Hook-up", "Basic Cardiac Life Support (BCLS)"],
    careerOpportunities: ["ECG Technician in Cardiac Care Units", "TMT/Stress Lab Technologist", "Diagnostic Center Cardiac Technician"],
    jobRoles: ["ECG Technician", "Cardiology Technologist", "Cardiac Monitoring Associate"],
    faqs: [
      { question: "Can an ECG technician identify heart attacks on the ECG?", answer: "Yes, students are trained to recognize critical patterns including ST-segment elevation (STEMI), dangerous arrhythmias, and alert the cardiologist immediately." }
    ],
    relatedCourseSlugs: ["icu-technician", "fellowship-clinical-cardiology"],
    admissionCtaText: "Enrol in ECG Technician Course",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "ECG Technician Course in Kolkata | Cardiac Care Admissions CIHM",
    metaDescription: "Master 12-lead ECG, Holter monitoring, and TMT stress testing with CIHM Kolkata's certified ECG Technician course. Enroll now.",
    focusKeyword: "ECG technician course Kolkata",
    secondaryKeywords: ["cardiology technician training", "ECG diploma Kolkata"],
    canonicalUrl: "https://cihm.in/courses/ecg-technician-course",
    ogTitle: "ECG Technician Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Gain practical mastery of cardiac diagnostics and emergency arrhythmia recognition at CIHM Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-ot-technician",
    slug: "ot-technician",
    name: "OT Technician (Operation Theatre Technology)",
    category: "Perioperative & Surgical",
    shortDescription: "Specialized two-year program in surgical sterilization, anesthesia workstation prep, surgical instrument handling, laparoscopy setup, and patient perioperative safety.",
    fullDescription: "The Operation Theatre (OT) Technician program trains students in surgical asepsis, sterile draping, autoclaving validation, electrocautery setup, laparoscopic tower operation, and intraoperative surgical assisting across major surgeries.",
    overview: "OT Technicians form the core surgical support team assisting surgeons and anesthesiologists during complex operations. CIHM delivers extensive live theatre rotations covering general surgery, orthopedics, neurosurgery, and laparoscopy.",
    eligibility: "10+2 with Physics, Chemistry, and Biology.",
    duration: "2 Years (Including 6 Months Live Surgical Theatre Internship)",
    curriculum: [
      { id: "ot-m1", title: "Semester 1: Surgical Anatomy & Sterilization Protocols", duration: "6 Months", topics: ["Surgical Asepsis & CSSD Operations", "Autoclave Validation, ETO & Plasma Sterilization", "Surgical Hand Scrubbing, Gowning & Gloving Standards"] },
      { id: "ot-m2", title: "Semester 2: Surgical Instrumentation & Theatre Layout", duration: "6 Months", topics: ["General Surgical Instrument Sets (Clamps, Retractors, Forceps)", "Electrosurgical Units (Monopolar/Bipolar Cautery)", "Operating Table Controls & Patient Positioning Protocols"] },
      { id: "ot-m3", title: "Semester 3: Anesthesia Assistance & Endoscopy Towers", duration: "6 Months", topics: ["Anesthesia Machine Circuit Setup & Gas Cylinders", "Endotracheal Intubation Assisting & Emergency Suction", "Laparoscopic Video Towers, Insufflators & Harmonic Scalpels"] },
      { id: "ot-m4", title: "Semester 4: Specialized Surgical Rotations & Internship", duration: "6 Months", topics: ["Orthopedic Implants & Power Drills", "Emergency Trauma Laparotomy Assistance", "Full-Time Hospital Surgical OT Postings"] }
    ],
    practicalTraining: "Daily clinical laboratory drills involving scrubbing, sterile instrument tray preparation, autoclave operation, and mock surgical scenarios.",
    clinicalExposure: "Live surgical postings across major multispecialty hospital operating suites in Kolkata.",
    internship: "6 Months full-time surgical rotation in general and superspecialty operating rooms.",
    skills: ["Surgical Sterile Technique", "CSSD Sterilization Protocol", "Laparoscopic Equipment Handling", "Anesthesia Machine Prep", "Surgical Instrument Passing"],
    careerOpportunities: ["Senior OT Technician in Multispecialty Hospitals", "CSSD In-Charge", "Transplant & Cardiac OT Specialist"],
    jobRoles: ["Operation Theatre Technician", "Surgical Scrub Assistant", "CSSD Technician"],
    faqs: [
      { question: "Do students get to assist in live surgical theatres?", answer: "Yes, students undertake mandatory clinical rotations in live hospital operating rooms under surgeon and senior nursing supervision." }
    ],
    relatedCourseSlugs: ["anesthesia", "icu-technician"],
    admissionCtaText: "Enrol in OT Technician",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "OT Technician Course in Kolkata | Operation Theatre Technology Admissions",
    metaDescription: "Become a certified Operation Theatre Technician at CIHM Kolkata. 2-year practical diploma with live hospital surgical room training.",
    focusKeyword: "OT technician course Kolkata",
    secondaryKeywords: ["operation theatre technology diploma", "surgical technician training"],
    canonicalUrl: "https://cihm.in/courses/ot-technician",
    ogTitle: "OT Technician Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Master perioperative surgical assistance and sterile technique at CIHM Kolkata with hospital clinical rotations.",
    ogImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-dialysis-operator",
    slug: "dialysis-operator",
    name: "Dialysis Operator (Dialysis Technology)",
    category: "Renal & Critical Care",
    shortDescription: "Two-year clinical training in hemodialysis machines, Reverse Osmosis (RO) water plants, AV fistula cannulation, dialyzer reprocessing, and renal failure management.",
    fullDescription: "The Dialysis Operator / Dialysis Technology program prepares professionals to administer life-saving renal replacement therapies. Students master dialyzer clearance calculations, vascular access cannulation, heparinization, dialysate composition, and management of intra-dialytic emergencies like hypotension and disequilibrium syndrome.",
    overview: "Dialysis operators are in exceptional demand due to increasing chronic kidney disease (CKD) prevalence. CIHM's training emphasizes patient safety, infection barrier protocols, and automated hemodialysis machinery.",
    eligibility: "10+2 with Science (Physics, Chemistry, Biology).",
    duration: "2 Years (Including 6 Months Hemodialysis Unit Internship)",
    curriculum: [
      { id: "dt-m1", title: "Semester 1: Renal Anatomy, Physiology & Pathology", duration: "6 Months", topics: ["Glomerular Filtration, Electrolyte Balance & Acid-Base Regulation", "Acute Kidney Injury (AKI) & Chronic Kidney Disease (CKD) Stages", "Principles of Diffusion, Osmosis, and Ultrafiltration in Dialysis"] },
      { id: "dt-m2", title: "Semester 2: Hemodialysis Machine & RO Water Treatment", duration: "6 Months", topics: ["Hydraulic and Extracorporeal Blood Circuit Systems", "RO Water Treatment: Sand Filters, Carbon Filters, Softeners & Deionizers", "Chemical and Heat Disinfection Protocols of Dialysis Machines"] },
      { id: "dt-m3", title: "Semester 3: Vascular Access, Anticoagulation & Complications", duration: "6 Months", topics: ["AV Fistula & AV Graft Cannulation Techniques", "Internal Jugular & Femoral Double-Lumen Catheter Care", "Heparinization Protocols and Low Molecular Weight Heparin", "Intra-dialytic Hypotension, Muscle Cramps & Disequilibrium Syndrome"] },
      { id: "dt-m4", title: "Semester 4: Automated Dialyzer Reprocessing & Clinical Internship", duration: "6 Months", topics: ["Automated Dialyzer Reprocessing Systems (Peracetic Acid)", "Total Cell Volume (TCV) and Fiber Bundle Integrity Testing", "Peritoneal Dialysis Overview (CAPD / APD)", "Full-Time Dialysis Unit Clinical Internship"] }
    ],
    practicalTraining: "Extensive hands-on priming of dialyzers and blood tubing lines, machine conductivity calibration, and vascular cannulation drills on high-fidelity simulation arm models.",
    clinicalExposure: "Daily postings in active hemodialysis departments across partnered multispecialty hospitals in Kolkata.",
    internship: "6 Months dedicated hospital rotation in high-volume nephrology and dialysis centers.",
    skills: ["Hemodialysis Machine Operation", "RO Water Plant Testing", "AV Fistula Cannulation", "Dialyzer Reprocessing", "Emergency Intra-dialytic Care"],
    careerOpportunities: ["Chief Dialysis Technologist in Multispecialty Hospitals", "Renal Care Dialysis Center Supervisor", "Application Specialist for Dialysis Machine Manufacturers"],
    jobRoles: ["Dialysis Operator", "Hemodialysis Technologist", "Renal Care Technician"],
    faqs: [
      { question: "What are the job prospects for dialysis operators in Kolkata?", answer: "Exceptional. Every tertiary hospital and freestanding dialysis clinic requires certified dialysis technologists with high placement rates." }
    ],
    relatedCourseSlugs: ["icu-technician", "dmlt"],
    admissionCtaText: "Enrol in Dialysis Technology",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "Dialysis Operator Course in Kolkata | Dialysis Technology Admissions",
    metaDescription: "Enroll in Dialysis Operator / Dialysis Technology at CIHM Kolkata. 2-year hospital-backed training with 100% placement support.",
    focusKeyword: "dialysis operator course Kolkata",
    secondaryKeywords: ["dialysis technology diploma", "hemodialysis training Kolkata"],
    canonicalUrl: "https://cihm.in/courses/dialysis-operator",
    ogTitle: "Dialysis Operator Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Gain clinical expertise in hemodialysis machines, RO systems, and renal patient care at CIHM Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-icu-technician",
    slug: "icu-technician",
    name: "ICU Technician (Critical Care Technology)",
    category: "Renal & Critical Care",
    shortDescription: "Advanced program in intensive care unit workflows, mechanical ventilator circuits, invasive hemodynamic monitoring lines, crash cart readiness, and emergency resuscitation.",
    fullDescription: "The ICU Technician program prepares critical care technologists to operate life-support systems in Medical, Surgical, and Cardiac ICUs. Students learn invasive arterial line monitoring, central venous pressure transducer setups, blood gas (ABG) sampling, bedside ultrasound assisting, and cardiopulmonary resuscitation protocols.",
    overview: "Critical Care Technologists are essential partners to intensivists in stabilizing critically ill patients. CIHM delivers intensive ICU floor rotations across Kolkata's top tertiary hospitals.",
    eligibility: "10+2 with Physics, Chemistry, and Biology.",
    duration: "2 Years (Including 6 Months Tertiary Hospital ICU Postings)",
    curriculum: [
      { id: "icu-m1", title: "Semester 1: Intensive Care Physiology & Patient Monitoring", duration: "6 Months", topics: ["Cardiorespiratory Physiology & Multi-organ Failure Dynamics", "Multipara Bedside Monitor Calibration (ECG, SpO2, NIBP, EtCO2)", "Aseptic Barrier Precautions in Intensive Care Units"] },
      { id: "icu-m2", title: "Semester 2: Mechanical Ventilators & Respiratory Care", duration: "6 Months", topics: ["Invasive & Non-invasive Ventilation (CPAP/BiPAP)", "Ventilator Circuit Assembling, Humidifiers & In-line Suction", "Ventilator Graphics: Pressure-Time & Flow-Volume Loops", "Weaning Protocols and Extubation Assistance"] },
      { id: "icu-m3", title: "Semester 3: Invasive Hemodynamics, Infusions & Resuscitation", duration: "6 Months", topics: ["Arterial Line & Central Venous Pressure Transducer Leveling", "Syringe & Volumetric Infusion Pumps (Inotrope Titrations)", "Arterial Blood Gas (ABG) Sampling & Acid-Base Interpretation", "Crash Cart Management & Defibrillation Protocols"] },
      { id: "icu-m4", title: "Semester 4: Specialized Neuro/Cardiac ICU & Internship", duration: "6 Months", topics: ["Intracranial Pressure (ICP) Monitoring Assistance", "Intra-Aortic Balloon Pump (IABP) & ECMO Basics", "Hospital ICU Rotations and Clinical Internship"] }
    ],
    practicalTraining: "Assembling ventilator circuits, troubleshooting machine alarms, transducer pressure bag calibration, and CPR simulations.",
    clinicalExposure: "Rotations across Medical ICUs, Surgical ICUs, and CCUs in partner hospitals.",
    internship: "6 Months full-time clinical attachment in tertiary critical care units.",
    skills: ["Mechanical Ventilator Setup", "Invasive Hemodynamic Line Leveling", "ABG Sampling", "Infusion Pump Titration Support", "Advanced Life Support (ACLS) Assistance"],
    careerOpportunities: ["Critical Care Technologist in Multi-organ ICUs", "Trauma ICU Coordinator", "Emergency Resuscitation Unit Specialist"],
    jobRoles: ["ICU Technician", "Critical Care Technologist", "Intensive Care Unit Associate"],
    faqs: [
      { question: "Where do ICU technicians work after graduating?", answer: "Graduates are employed in Medical ICUs, Surgical ICUs, Cardiac Care Units (CCU), and Emergency Trauma resuscitation bays." }
    ],
    relatedCourseSlugs: ["dialysis-operator", "ecg-technician-course", "fellowship-critical-care-medicine"],
    admissionCtaText: "Enrol in ICU Technician Course",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "ICU Technician Course in Kolkata | Critical Care Technology Admissions",
    metaDescription: "Join ICU Technician / Critical Care Technology at CIHM Kolkata. Master ventilators, invasive monitoring lines, and tertiary hospital ICU protocols.",
    focusKeyword: "ICU technician course Kolkata",
    secondaryKeywords: ["critical care technology diploma", "ICU training Kolkata"],
    canonicalUrl: "https://cihm.in/courses/icu-technician",
    ogTitle: "ICU Technician Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Develop life-saving critical care skills on mechanical ventilators and patient monitors at CIHM Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-physiotherapy",
    slug: "physiotherapy",
    name: "Physiotherapy (Diploma in Physiotherapy Assistant)",
    category: "Physical Rehabilitation & Therapy",
    shortDescription: "Comprehensive training in electrotherapy modalities, therapeutic exercises, musculoskeletal rehabilitation, neuro-rehab, and post-surgical mobility recovery.",
    fullDescription: "The Physiotherapy program prepares rehabilitation technicians to deliver physical therapy protocols under the guidance of qualified physiotherapists and physiatrists. Students learn electrotherapeutic modalities like ultrasound therapy, TENS, IFT, traction, gait training, and post-fracture joint mobilization.",
    overview: "Physical rehabilitation is vital for restoring functional independence in stroke survivors, orthopedics, sports injuries, and elderly patients. CIHM emphasizes hands-on therapeutic drills and hospital OPD rotations.",
    eligibility: "10+2 with Science or equivalent.",
    duration: "1 to 2 Years (Including Rehabilitation Center Rotations)",
    curriculum: [
      { id: "pt-m1", title: "Module 1: Functional Anatomy, Kinesiology & Biomechanics", duration: "3 Months", topics: ["Musculoskeletal Anatomy: Bones, Joints, Muscle Origins & Insertions", "Biomechanical Principles of Movement, Levers & Range of Motion", "Physiological Healing Responses to Injury and Inflammation"] },
      { id: "pt-m2", title: "Module 2: Electrotherapy & Physical Agents", duration: "3 Months", topics: ["Transcutaneous Electrical Nerve Stimulation (TENS) & IFT", "Therapeutic Ultrasound, Shortwave Diathermy (SWD) & Laser", "Thermotherapy, Cryotherapy & Cervical/Lumbar Traction Units"] },
      { id: "pt-m3", title: "Module 3: Exercise Therapy & Rehabilitation Techniques", duration: "3 Months", topics: ["Passive, Active-Assisted & Resisted Exercise Drills", "Post-Fracture Mobilization, Stretching & Strengthening Protocols", "Gait Training with Crutches, Walkers & Parallel Bars", "Neurological Rehabilitation for Hemiplegia & Cerebral Palsy"] },
      { id: "pt-m4", title: "Module 4: Sports Rehabilitation & Clinical Postings", duration: "3 Months", topics: ["Sports Injury Taping, Sprain/Strain Acute Management", "Geriatric Fall Prevention & Ergonomic Counseling", "Clinical Postings in Hospital Physiotherapy Departments"] }
    ],
    practicalTraining: "Hands-on calibration of ultrasound therapy probes, electrical stimulation electrode placement, and patient transfer drills.",
    clinicalExposure: "Clinical postings in hospital physiotherapy OPDs and orthopedic rehabilitation wards.",
    internship: "6 Months hospital internship in physical therapy departments.",
    skills: ["Electrotherapy Modality Operation", "Range of Motion Assessment", "Therapeutic Exercise Instruction", "Gait Training Assistance", "Patient Transfer Safety"],
    careerOpportunities: ["Physiotherapy Assistant in Hospitals", "Rehabilitation Center Technologist", "Sports Injury Clinic Associate"],
    jobRoles: ["Physiotherapy Assistant", "Rehabilitation Technician"],
    faqs: [
      { question: "Can physiotherapy assistants work in private clinics?", answer: "Yes, certified physiotherapy assistants work across hospital rehabilitation departments, private physiotherapy clinics, and home health rehabilitation agencies." }
    ],
    relatedCourseSlugs: ["fellowship-sports-medicine", "fellowship-orthopaedic"],
    admissionCtaText: "Enrol in Physiotherapy",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "Physiotherapy Course in Kolkata | Rehabilitation Admissions CIHM",
    metaDescription: "Apply for certified Physiotherapy training at CIHM Kolkata. Master electrotherapy modalities, exercise rehab, and hospital patient recovery.",
    focusKeyword: "physiotherapy course Kolkata",
    secondaryKeywords: ["physiotherapy diploma Kolkata", "rehabilitation training"],
    canonicalUrl: "https://cihm.in/courses/physiotherapy",
    ogTitle: "Physiotherapy Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Gain clinical expertise in electrotherapy and physical rehabilitation at CIHM Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-mphw",
    slug: "mphw",
    name: "MPHW (Multi-Purpose Health Worker)",
    category: "Community & Public Health",
    shortDescription: "Essential public health and primary healthcare certification covering community immunization, maternal & child health, sanitation, epidemic surveillance, and first aid.",
    fullDescription: "The Multi-Purpose Health Worker (MPHW) program prepares community health champions equipped to deliver grassroots healthcare services. Students learn immunization schedule administration, primary wound dressing, communicable disease tracking, antenatal care counseling, and health survey methodology.",
    overview: "MPHW professionals form the frontline of community and public health outreach across rural, semi-urban, and governmental health programs.",
    eligibility: "Class 10th or 10+2 passed from recognized board.",
    duration: "1 to 2 Years (Field Work & Community Center Postings Included)",
    curriculum: [
      { id: "mp-m1", title: "Module 1: Public Health & Environmental Sanitation", duration: "3 Months", topics: ["Community Health Principles & Determinants of Health", "Water Purification, Waste Management & Vector Control", "Nutrition Fundamentals & Malnutrition Screening"] },
      { id: "mp-m2", title: "Module 2: Maternal & Child Health (MCH) & Immunization", duration: "3 Months", topics: ["Universal Immunization Programme (UIP) Schedules & Cold Chain", "Antenatal & Postnatal Care, Breastfeeding Guidance", "Oral Rehydration Solution (ORS) & Pediatric Diarrhea Management"] },
      { id: "mp-m3", title: "Module 3: Communicable Disease Control & First Aid", duration: "3 Months", topics: ["Malaria, Dengue, TB, Leprosy & Waterborne Disease Surveillance", "Basic First Aid: Wounds, Burns, Fractures & Snakebite Protocol", "Emergency Triage & Vital Signs Measurement"] },
      { id: "mp-m4", title: "Module 4: Field Surveys, Health Education & Internship", duration: "3 Months", topics: ["Community Health Survey Methods & Health Record Keeping", "Health Education Campaigns & Public Awareness Workshops", "Primary Health Center (PHC) Field Rotations"] }
    ],
    practicalTraining: "Administering oral vaccines, sterile wound dressing, measuring blood pressure/vitals, and conducting community health surveys.",
    clinicalExposure: "Primary Health Centers (PHCs), community health camps, and maternal clinics.",
    internship: "3 Months field internship in public health outreach programs.",
    skills: ["Vaccination Administration", "Community Health Surveying", "Basic First Aid & Triage", "Maternal-Child Health Counseling", "Epidemic Tracking"],
    careerOpportunities: ["Community Health Worker in Government Projects", "NGO Healthcare Outreach Officer", "Rural Clinic Primary Care Associate"],
    jobRoles: ["Multi-Purpose Health Worker (MPHW)", "Community Health Assistant", "Public Health Aide"],
    faqs: [
      { question: "What is the role of an MPHW in healthcare?", answer: "MPHWs bridge families with hospitals by delivering vaccinations, maternal health guidance, disease tracking, and primary wound care." }
    ],
    relatedCourseSlugs: ["blood-collection-course", "medical-lab-assistant"],
    admissionCtaText: "Enrol in MPHW Program",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"],
    featured: false,
    status: "published",
    seoTitle: "MPHW Course in Kolkata | Multi-Purpose Health Worker Admissions",
    metaDescription: "Apply for Multi-Purpose Health Worker (MPHW) certification at CIHM Kolkata. Community health, vaccination, and primary care training.",
    focusKeyword: "MPHW course Kolkata",
    secondaryKeywords: ["multi-purpose health worker training", "community health course"],
    canonicalUrl: "https://cihm.in/courses/mphw",
    ogTitle: "MPHW Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Build a community healthcare career with CIHM's accredited MPHW training program in Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-anesthesia",
    slug: "anesthesia",
    name: "Anesthesia (Anesthesia Technology Course)",
    category: "Perioperative & Surgical",
    shortDescription: "Two-year clinical training in anesthesia workstations, vaporizers, intravenous induction agents, difficult airway intubation assists, and post-anesthesia care (PACU).",
    fullDescription: "The Anesthesia Technology program prepares skilled anesthesia technicians to support anesthesiologists during general, regional, and local anesthesia. Students master pipeline medical gas systems, vaporizer calibration, endotracheal and supraglottic airway management, arterial line transducer assists, and recovery room monitoring.",
    overview: "Every major surgery requires precise anesthesia administration and vigilance. CIHM students train in modern hospital surgical suites under senior consultant anesthesiologists.",
    eligibility: "10+2 with Physics, Chemistry, Biology.",
    duration: "2 Years (Including 6 Months Live Anesthesia OT Postings)",
    curriculum: [
      { id: "an-m1", title: "Semester 1: Medical Gases, Anesthesia Machine & Pharmacology", duration: "6 Months", topics: ["Oxygen, Nitrous Oxide & Compressed Air Pipeline Networks", "Anesthesia Machine Safety Checks, Pressure Regulators & Flowmeters", "Inhalation Agents (Sevoflurane, Isoflurane) & Vaporizer Mechanics"] },
      { id: "an-m2", title: "Semester 2: Airway Management & Monitoring Equipment", duration: "6 Months", topics: ["Laryngoscopes (Macintosh, Miller, Video Laryngoscopes)", "Endotracheal Tubes, Laryngeal Mask Airways (LMA) & Bougies", "Capnography (EtCO2), Pulse Oximetry & Invasive Line Transducers"] },
      { id: "an-m3", title: "Semester 3: Regional Anesthesia & Emergency Drugs", duration: "6 Months", topics: ["Spinal and Epidural Anesthesia Tray Preparation", "Ultrasound-Guided Peripheral Nerve Block Assistance", "Emergency Anesthesia Pharmacology (Atropine, Adrenaline, Ephedrine)", "Malignant Hyperthermia and Anaphylaxis Protocols"] },
      { id: "an-m4", title: "Semester 4: Specialized Pediatric/Cardiac Anesthesia & Internship", duration: "6 Months", topics: ["Pediatric Breathing Circuits (Jackson-Rees) & Neonatal Airway", "Cardiac & Neuro-Anesthesia Setup", "PACU Post-Anesthesia Care and Internship"] }
    ],
    practicalTraining: "Conducting pre-operative anesthesia machine checks, soda lime canister replacement, and intubation stylet preparation.",
    clinicalExposure: "Live surgical suites and recovery rooms across top Kolkata multispecialty hospitals.",
    internship: "6 Months full-time hospital anesthesia posting.",
    skills: ["Anesthesia Workstation Operation", "Difficult Airway Setup", "Spinal/Epidural Tray Prep", "Capnography Interpretation", "PACU Recovery Monitoring"],
    careerOpportunities: ["Anesthesia Technologist in Multispecialty Hospitals", "Day-Care Surgery Center Anesthesia Associate", "Trauma & Resuscitation Anesthesia Aide"],
    jobRoles: ["Anesthesia Technician", "Anesthesia Technologist", "Perioperative Anesthesia Assistant"],
    faqs: [
      { question: "What is the role of an anesthesia technician during surgery?", answer: "They ensure anesthesia equipment is leak-free, prepare medications and endotracheal tubes, assist during induction and emergence, and monitor recovery." }
    ],
    relatedCourseSlugs: ["ot-technician", "icu-technician"],
    admissionCtaText: "Enrol in Anesthesia Course",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "Anesthesia Technician Course in Kolkata | Admissions CIHM",
    metaDescription: "Enroll in Anesthesia Technology diploma at CIHM Kolkata. Master anesthesia workstations, intubation assists, and live surgical room care.",
    focusKeyword: "anesthesia technician course Kolkata",
    secondaryKeywords: ["anesthesia technology diploma", "anesthesia training Kolkata"],
    canonicalUrl: "https://cihm.in/courses/anesthesia",
    ogTitle: "Anesthesia Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Gain clinical expertise in surgical anesthesia assistance and airway management at CIHM Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-radiology-medical-imaging",
    slug: "radiology-medical-imaging",
    name: "Radiology & Medical Imaging",
    category: "Radiological Sciences",
    shortDescription: "Advanced two-year diploma covering digital radiography, multi-slice CT scanning, magnetic resonance imaging (MRI) principles, ultrasound positioning, and radiation safety.",
    fullDescription: "The Radiology & Medical Imaging Technology program delivers comprehensive training across all primary radiological diagnostic modalities. Students master the physics of X-ray generation, digital radiography detectors, CT cross-sectional anatomy, MRI magnetic fields and pulse sequences, contrast media safety, and PACS archiving.",
    overview: "Diagnostic imaging is integral to every branch of modern medicine. CIHM students gain hands-on clinical rotations on high-end CT and MRI scanners in premier Kolkata diagnostic centers.",
    eligibility: "Higher Secondary (10+2) in Science stream with Physics, Chemistry, and Biology/Mathematics.",
    duration: "2 Years (Including 6 Months Clinical Radiology Internship)",
    curriculum: [
      { id: "rad-m1", title: "Semester 1: Radiation Physics, Radiobiology & Radiation Protection", duration: "6 Months", topics: ["Electromagnetic Radiation, X-Ray Spectra & Interaction with Matter", "Biological Effects of Ionizing Radiation & AERB Dose Limits", "Lead Shielding, Collimation & Quality Assurance Tests"] },
      { id: "rad-m2", title: "Semester 2: Digital Radiography (DR) & Fluoroscopy", duration: "6 Months", topics: ["Flat-Panel Detectors, Direct vs Indirect Conversion", "Fluoroscopy, C-Arm Geometry & Image Intensifiers", "Contrast Media: Iodinated & Barium Formulations and Anaphylaxis Management"] },
      { id: "rad-m3", title: "Semester 3: Computed Tomography (CT) Scanning Principles", duration: "6 Months", topics: ["CT Gantry Architecture, Multi-detector Arrays & Pitch Calculations", "Cross-Sectional Axial, Coronal & Sagittal Anatomy", "CT Protocols: Head, Thorax, Abdomen, Angiography & 3D Reconstruction"] },
      { id: "rad-m4", title: "Semester 4: Magnetic Resonance Imaging (MRI) & Clinical Internship", duration: "6 Months", topics: ["Nuclear Magnetic Resonance Physics & T1/T2 Relaxation Times", "Radiofrequency Coils, Gradient Coils & Cryogen Safety", "MRI Safety Screening: Pacemakers, Implants & Quench Protocols", "PACS Networks, DICOM Standards & Full-Time Hospital Internship"] }
    ],
    practicalTraining: "Hands-on console operation on multi-slice CT scanners, positioning patients for cranial, thoracic, and extremity scans, and PACS reconstruction.",
    clinicalExposure: "Radiology postings across high-volume tertiary hospitals in Kolkata.",
    internship: "6 Months dedicated hospital internship in advanced imaging departments.",
    skills: ["Multi-Slice CT Console Operation", "Digital Radiography Acquisition", "MRI Safety Screening", "Contrast Media Safety Management", "PACS & DICOM Data Handling"],
    careerOpportunities: ["Senior Radiographer / CT Technologist in Multispecialty Hospitals", "MRI Technologist in Advanced Imaging Centers", "Application Specialist for Medical Imaging OEMs"],
    jobRoles: ["Radiological Technologist", "CT Scan Technologist", "MRI Technologist", "Medical Imaging Specialist"],
    faqs: [
      { question: "Does the course cover both CT and MRI?", answer: "Yes, the program provides comprehensive theoretical and practical training in Digital Radiography, CT Scanning, and MRI principles." }
    ],
    relatedCourseSlugs: ["xray-technician-course", "ecg-technician-course"],
    admissionCtaText: "Enrol in Radiology & Medical Imaging",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "Radiology & Medical Imaging Course in Kolkata | Admissions CIHM",
    metaDescription: "Join Diploma in Radiology & Medical Imaging at CIHM Kolkata. Hands-on training on Digital X-Ray, CT Scan, and MRI with 100% placement support.",
    focusKeyword: "radiology course Kolkata",
    secondaryKeywords: ["medical imaging technology diploma", "CT scan technician course Kolkata", "MRI technician training"],
    canonicalUrl: "https://cihm.in/courses/radiology-medical-imaging",
    ogTitle: "Radiology & Medical Imaging Course – CIHM Kolkata",
    ogDescription: "Develop cutting-edge skills in digital imaging, CT, and MRI at CIHM Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "course-hospital-management",
    slug: "hospital-management",
    name: "Hospital Management & Administration",
    category: "Healthcare Management",
    shortDescription: "Industry-aligned diploma in healthcare administration, NABH/NABL accreditation compliance, hospital operations, patient relations, and health informatics.",
    fullDescription: "The Hospital Management program prepares dynamic healthcare administrators proficient in hospital operations, front-office coordination, medical records management (MRD), healthcare quality assurance, TPA insurance processing, and human resource management.",
    overview: "Modern healthcare facilities require administrative leaders who understand clinical workflows and healthcare economics. CIHM prepares professionals for hospital managerial roles across Eastern India.",
    eligibility: "Higher Secondary (10+2) or Graduation in any discipline.",
    duration: "1 to 2 Years (Including Administrative Hospital Internship)",
    curriculum: [
      { id: "hm-m1", title: "Semester 1: Healthcare Delivery Systems & Hospital Operations", duration: "6 Months", topics: ["Organization Structure of Modern Multispecialty Hospitals", "OPD, IPD, Emergency & ICU Operational Workflows", "Patient Experience, Front Desk & Bed Management"] },
      { id: "hm-m2", title: "Semester 2: Hospital Quality Standards (NABH/NABL/JCI)", duration: "6 Months", topics: ["NABH Quality Frameworks, Key Performance Indicators (KPIs)", "Patient Safety Goals, Infection Control & Biomedical Waste Protocols", "Clinical Audit Methodologies & Root Cause Analysis"] },
      { id: "hm-m3", title: "Semester 3: Health Informatics, Billing & TPA Insurance", duration: "6 Months", topics: ["Hospital Information Systems (HIS) & Electronic Health Records (EHR)", "Medical Billing, Tariffs, Cashless TPA Claims & Ayushman Bharat", "Medical Record Department (MRD) Management & ICD-10 Coding"] },
      { id: "hm-m4", title: "Semester 4: Hospital Supply Chain, HR & Management Internship", duration: "6 Months", topics: ["Pharmacy, Material & Biomedical Equipment Procurement", "Healthcare Human Resource Management & Statutory Labor Compliance", "Full-Time Administrative Internship in Partner Hospitals"] }
    ],
    practicalTraining: "Hands-on software drills on Hospital Information Systems (HIS), simulated NABH quality audits, and patient billing case studies.",
    clinicalExposure: "Executive floor rotations in hospital administration departments across Kolkata.",
    internship: "6 Months full-time administrative internship in leading corporate hospitals.",
    skills: ["Hospital Operations Management", "NABH Accreditation Compliance", "HIS & EHR Software Navigation", "TPA & Health Insurance Processing", "Healthcare Quality Auditing"],
    careerOpportunities: ["Hospital Operations Executive in Multispecialty Hospitals", "Quality Assurance Coordinator", "Patient Care & Front Office Manager", "TPA Insurance Desk Lead"],
    jobRoles: ["Hospital Administrator", "Operations Executive", "Quality Coordinator", "Patient Relations Officer"],
    faqs: [
      { question: "Can non-science graduates enroll in Hospital Management?", answer: "Yes, candidates from Arts, Commerce, or Science backgrounds are eligible to apply." }
    ],
    relatedCourseSlugs: ["fellowship-hospital-management", "dmlt"],
    admissionCtaText: "Enrol in Hospital Management",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"],
    featured: true,
    status: "published",
    seoTitle: "Hospital Management Course in Kolkata | Healthcare Administration Admissions",
    metaDescription: "Apply for Hospital Management & Administration Diploma at CIHM Kolkata. NABH standards, hospital operations, and 100% placement support.",
    focusKeyword: "hospital management course Kolkata",
    secondaryKeywords: ["healthcare administration diploma", "hospital administration admission Kolkata"],
    canonicalUrl: "https://cihm.in/courses/hospital-management",
    ogTitle: "Hospital Management Course – CIHM Central Institute of Healthcare & Management",
    ogDescription: "Lead the future of healthcare operations with CIHM's premier Hospital Management diploma in Kolkata.",
    ogImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// 2. All 20 Newly Announced 1-Year UK Online Fellowship Courses
// In collaboration with Virtued Eduversity (London, UK) & Virtued Academy International
// East India Authorised Center: CIHM DumDum (Helpline: 9073737888 / 9073737444)
const ukFellowshipCoursesData = [
  {
    key: "endocrinology",
    name: "Fellowship in Endocrinology",
    suffix: "(F.Endo.) London, UK",
    focus: "Thyroid disorders, pituitary dysfunctions, adrenal syndromes, metabolic bone diseases, calcium homeostasis, and endocrine hypertension.",
    modules: ["Thyroid Gland Disorders & Nodules", "Pituitary & Hypothalamic Pathology", "Adrenal Insufficiency & Cushing's Syndrome", "Metabolic Bone Disease & Osteoporosis", "Reproductive Endocrinology & PCOS"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "urology",
    name: "Fellowship in Urology",
    suffix: "(F.Uro.) London, UK",
    focus: "Nephrolithiasis, benign prostatic hyperplasia (BPH), urinary tract infections, urological oncology, male infertility, and minimally invasive endourology.",
    modules: ["Urolithiasis Medical & Surgical Protocols", "Benign Prostatic Hyperplasia & LUTS", "Urological Malignancies Overview", "Urinary Incontinence & Neurogenic Bladder", "Male Infertility & Andrology"],
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "sports-medicine",
    name: "Fellowship in Sports Medicine",
    suffix: "(F.S.M.) London, UK",
    focus: "Athletic injury rehabilitation, musculoskeletal biomechanics, ligamentous tears, sports concussion assessment, return-to-play protocols, and performance nutrition.",
    modules: ["Acute Athletic Trauma & On-Field Triage", "Ligament & Meniscal Knee Pathology", "Shoulder Impingement & Rotator Cuff Care", "Concussion Protocols & Sports Neuro-trauma", "Performance Nutrition & Doping Regulations"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "emergency-medicine",
    name: "Fellowship in Emergency Medicine",
    suffix: "(F.E.M.) London, UK",
    focus: "Advanced cardiac life support (ACLS), trauma stabilization (ATLS), rapid sequence intubation, acute toxicology, pediatric emergencies, and disaster triage.",
    modules: ["ACLS & Emergency Resuscitation Algorithms", "ATLS Polytrauma Resuscitation Bundles", "Acute Respiratory Failure & Rapid Sequence Intubation", "Toxicological Emergencies & Overdoses", "Point-of-Care Ultrasound (POCUS) in Emergency"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "hospital-management",
    name: "Fellowship in Hospital Management",
    suffix: "(F.H.M.) London, UK",
    focus: "Strategic healthcare leadership, NABH/JCI accreditation frameworks, clinical governance, medical-legal compliance, health economics, and hospital crisis mitigation.",
    modules: ["Strategic Healthcare Planning & Hospital Operations", "NABH & International Hospital Accreditation", "Clinical Risk Management & Medico-Legal Frameworks", "Healthcare Informatics & Digital Health Adoption", "Hospital Financial Planning & Budgeting"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "aesthetic-medicine",
    name: "Fellowship in Aesthetic Medicine",
    suffix: "(F.A.M.) London, UK",
    focus: "Facial clinical anatomy, botulinum neuromodulators, dermal hyaluronic acid fillers, chemical peels, platelet-rich plasma (PRP), and aesthetic complication safety.",
    modules: ["Facial Anatomy, Danger Zones & Aging Vectors", "Botulinum Toxin Injection Techniques & Dosages", "Hyaluronic Acid Dermal Fillers & Cannula Methods", "Platelet-Rich Plasma (PRP) for Skin & Hair", "Management of Vascular Occlusions & Complications"],
    image: "https://images.unsplash.com/photo-1512290900672-1f4082260f8c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "family-medicine",
    name: "Fellowship in Family Medicine",
    suffix: "(F.F.M.) London, UK",
    focus: "Comprehensive outpatient primary care, chronic disease management, pediatric outpatient triage, preventive screenings, geriatric care, and rational pharmacotherapy.",
    modules: ["Principles of Comprehensive Primary Care", "Hypertension & Cardiovascular Risk Assessment", "Preventive Health Screening & Adult Immunization", "Geriatric Care & Polypharmacy Deprescribing", "Common Dermatological & Musculoskeletal Complaints"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "critical-care-medicine",
    name: "Fellowship in Critical Care Medicine",
    suffix: "(F.C.C.M.) London, UK",
    focus: "Invasive hemodynamics, mechanical ventilation mastery, septic shock resuscitation bundles, ARDS management, multi-organ support, and ICU echocardiography.",
    modules: ["Advanced Mechanical Ventilation in ARDS", "Invasive Hemodynamic Monitoring & Inotropes", "Surviving Sepsis Campaign 1-Hour Bundles", "Acute Kidney Injury & Renal Replacement in ICU", "Neuro-Critical Care & Brain Death Protocols"],
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "orthopaedic",
    name: "Fellowship in Orthopaedic",
    suffix: "(F.Ortho.) London, UK",
    focus: "Conservative fracture care, osteoarthritis management, sports ligament injuries, spine pathology triage, joint arthroplasty overview, and orthopedic emergency splinting.",
    modules: ["Principles of Fracture Healing & Casting Techniques", "Osteoarthritis Conservative & Injectable Therapies", "Common Sports Ligament Tears (ACL/PCL/MCL)", "Degenerative Spine Disorders & Disc Pathology", "Pediatric Orthopedic Red Flags & Triage"],
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "infectious-diseases",
    name: "Fellowship in Infectious Diseases",
    suffix: "(F.I.D.) London, UK",
    focus: "Antimicrobial stewardship, multi-drug resistant (MDR) pathogens, hospital-acquired infection control, tropical fevers, HIV/tuberculosis therapeutics, and sepsis diagnostics.",
    modules: ["Rational Antibiotic Prescribing & Stewardship", "Management of Multi-Drug Resistant Gram-Negative Sepsis", "Tropical Fevers: Dengue, Malaria, Typhoid & Leptospirosis", "Tuberculosis & Atypical Mycobacterial Infections", "Hospital Infection Prevention & Outbreak Control"],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "pain-medicine",
    name: "Fellowship in Pain Medicine",
    suffix: "(F.P.M.) London, UK",
    focus: "Neuropathic chronic pain syndromes, spinal facet interventions, trigger point injections, opioid stewardship, cancer pain palliation, and multimodal analgesia.",
    modules: ["Neurobiology of Acute vs Chronic Pain", "Pharmacotherapy for Neuropathic Pain Syndromes", "Trigger Point Injections & Musculoskeletal Needling", "Interventional Nerve Blocks & Radiofrequency Basics", "Cancer Pain Management & Palliative Analgesia"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "dermatology",
    name: "Fellowship in Dermatology",
    suffix: "(F.Derm.) London, UK",
    focus: "Clinical dermato-pathology, inflammatory autoimmune skin diseases, psoriasis biologics, acne vulgaris, pediatric rashes, dermoscopy fundamentals, and procedural dermatology.",
    modules: ["Clinical Diagnostic Approach to Skin Eruptions", "Acne, Rosacea & Pigmentary Disorders Management", "Eczema, Psoriasis & Biologic Systemic Therapies", "Dermoscopy for Pigmented Lesions & Melanin Triage", "Cutaneous Infections: Fungal, Viral & Bacterial"],
    image: "https://images.unsplash.com/photo-1512290900672-1f4082260f8c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "clinical-nutrition",
    name: "Fellowship in Clinical Nutrition",
    suffix: "(F.C.N.) London, UK",
    focus: "Enteral and total parenteral nutrition (TPN), critical illness metabolic response, medical nutrition therapy for diabetes & renal failure, and malnutrition screening.",
    modules: ["Nutritional Assessment & Malnutrition Screening Tools", "Enteral Tube Feeding Formulations & Administration", "Total Parenteral Nutrition (TPN) Calculations & Monitoring", "Medical Nutrition Therapy for Diabetes & Renal Disease", "Pediatric Failure to Thrive & Geriatric Malnutrition"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "pediatrics",
    name: "Fellowship in Pediatrics",
    suffix: "(F.Ped.) London, UK",
    focus: "Neonatal resuscitation, acute pediatric infectious emergencies, asthma exacerbation pathways, developmental screening, failure to thrive, and vaccination updates.",
    modules: ["Neonatal Resuscitation Program (NRP) Protocols", "Acute Pediatric Respiratory Distress & Asthma Pathways", "Pediatric Sepsis & Fluid Resuscitation Guidelines", "Developmental Milestones & Neuro-developmental Triage", "Universal Pediatric Vaccination & Immunization Schedules"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "neurology",
    name: "Fellowship in Neurology",
    suffix: "(F.Neuro.) London, UK",
    focus: "Acute ischemic stroke pathways, IV thrombolysis, status epilepticus algorithms, movement disorders (Parkinsonism), peripheral neuropathies, and neuromuscular emergencies.",
    modules: ["Acute Ischemic Stroke & Thrombolysis Pathways", "Epilepsy Classification & Status Epilepticus Protocols", "Parkinsonism & Common Movement Disorders", "Headache Syndromes: Migraine, Cluster & Red Flags", "Peripheral Neuropathies & Guillain-Barré Syndrome"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "clinical-cardiology",
    name: "Fellowship in Clinical Cardiology",
    suffix: "(F.C.C.) London, UK",
    focus: "Non-invasive cardiology, complex 12-lead ECG, 2D echocardiography, acute coronary syndromes (STEMI/NSTEMI), heart failure with reduced EF, and valvular disorders.",
    modules: ["Advanced 12-Lead ECG Interpretation & Arrhythmias", "Acute Coronary Syndromes & Early Revascularization Decisions", "Heart Failure: HFrEF vs HFpEF Evidence-Based Therapies", "Valvular Heart Disease Diagnostic Evaluation", "Ambulatory Blood Pressure & Dyslipidemia Management"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "diabetology",
    name: "Fellowship in Diabetology",
    suffix: "(F.Diab.) London, UK",
    focus: "Intensive basal-bolus insulin regimens, continuous glucose monitoring (CGM), diabetic ketoacidosis (DKA), diabetic foot salvage, and renal/cardiovascular protective therapies.",
    modules: ["Pathophysiology & Classification of Diabetes", "Oral Antidiabetic Agents (SGLT2i, GLP-1 RA, DPP-4i)", "Insulin Initiation, Titration & Basal-Bolus Regimens", "Diabetic Emergencies: DKA & Hyperosmolar Hyperglycemic State", "Diabetic Nephropathy, Neuropathy & Foot Ulcer Prevention"],
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "gynecology-obstetrics",
    name: "Fellowship in Gynecology & Obstetrics",
    suffix: "(F.G.O.) London, UK",
    focus: "High-risk pregnancy management, preeclampsia, postpartum hemorrhage (PPH) bundles, intrapartum cardiotocography (CTG), abnormal uterine bleeding, and gynecological endocrinology.",
    modules: ["Antenatal High-Risk Assessment & Screening Protocols", "Management of Preeclampsia, Eclampsia & Gestational Diabetes", "Postpartum Hemorrhage (PPH) Prevention & Resuscitation Bundles", "Cardiotocography (CTG) Fetal Heart Rate Interpretation", "Abnormal Uterine Bleeding (PALM-COEIN) & PCOS Pathways"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "internal-medicine",
    name: "Fellowship in Internal Medicine",
    suffix: "(F.I.M.) London, UK",
    focus: "Multi-system disease workups, pyrexia of unknown origin (PUO), autoimmune rheumatology, severe electrolyte imbalances, resistant hypertension, and rational pharmacotherapy.",
    modules: ["Diagnostic Approach to Pyrexia of Unknown Origin (PUO)", "Hypertensive Crisis & Resistant Hypertension Protocols", "Rheumatological Autoantibodies (ANA, RF, Anti-CCP)", "Severe Electrolyte Disturbances: Sodium & Potassium Disorders", "Rational Polypharmacy & Drug-Drug Interaction Management"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80"
  },
  {
    key: "gastroenterology",
    name: "Fellowship in Gastroenterology",
    suffix: "(F.Gastro.) London, UK",
    focus: "Upper and lower GI bleeding emergencies, liver cirrhosis & portal hypertension, acute pancreatitis, inflammatory bowel disease (IBD), and functional gastrointestinal disorders.",
    modules: ["Upper & Lower Gastrointestinal Bleeding Resuscitation", "Liver Cirrhosis, Ascites & Spontaneous Bacterial Peritonitis", "Acute Pancreatitis Severity Scoring & Fluid Resuscitation", "Inflammatory Bowel Disease (Crohn's & Ulcerative Colitis)", "Functional GI Disorders: GERD, Dyspepsia & Irritable Bowel Syndrome"],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80"
  }
];

const ukFellowshipCourses = ukFellowshipCoursesData.map((f, index) => {
  const slug = `fellowship-${f.key}`;
  return {
    id: `course-${slug}`,
    slug: slug,
    name: f.name,
    category: "UK Online Fellowships (London)",
    shortDescription: `1-Year Online Fellowship in ${f.name.replace('Fellowship in ', '')} accredited by Virtued Eduversity (London, UK) & Virtued Academy International. Suffix designation: ${f.suffix}. 120 CPD Points, AI Lecturer Vera, Monthly Live Doubt Sessions.`,
    fullDescription: `The ${f.name} is an internationally recognized postgraduate-level clinical fellowship delivered online by Virtued Eduversity (128 City Road, London, UK) and Virtued Academy International, in academic collaboration with Central Institute of Healthcare & Management (CIHM DumDum, Kolkata as East India Authorised Center). Tailored for medical officers, physicians, and registered healthcare professionals, the program provides 120 CPD points, AI-assisted self-paced modules with AI Lecturer Vera, monthly live interactive clinical doubt clearing sessions with international UK faculties, and free Virtued Press publications. Optional clinical observer postings are available. Candidates earn the prestigious right to append "${f.suffix}" to their professional title.`,
    overview: `Designed for busy practicing clinicians, this 1-year online fellowship offers state-of-the-art clinical knowledge in ${f.name.replace('Fellowship in ', '')}. ${f.focus}`,
    eligibility: "MBBS, MD, DNB, BAMS, BHMS, BDS, Medical Officers, or eligible allied medical healthcare professionals.",
    duration: "1 Year Online Fellowship + Optional Hospital Clinical Placement",
    suffix: f.suffix,
    institutionPartner: "Virtued Eduversity (London, UK) & Virtued Academy International",
    cpdPoints: 120,
    actualPrice: "₹1,20,000",
    discountedPrice: "₹59,000",
    isOnline: true,
    isFellowship: true,
    fees: "₹59,000 (Limited Offer, Actual: ₹1,20,000). Zero-Cost EMI Available.",
    totalFee: "₹59,000",
    badgeText: "UK Accredited • 120 CPD",
    badgeColor: "#00A54F",
    curriculum: f.modules.map((modTitle, idx) => ({
      id: `${f.key}-m${idx + 1}`,
      title: `Module ${idx + 1}: ${modTitle}`,
      duration: "2 Months",
      topics: [
        `Clinical Evidence & Guidelines in ${modTitle}`,
        `Diagnostic Algorithms & Bedside Decision Making`,
        `Pharmacotherapy, Dosages & Complication Management`,
        `Interactive Clinical Case Studies & AI Vera Drills`
      ]
    })),
    practicalTraining: "Monthly live virtual clinical case conferences with UK & international faculty, real-world case simulations, and optional clinical observer rotations at partner hospitals.",
    clinicalExposure: "Optional clinical rotations coordinated through CIHM Kolkata clinical hospital affiliations for candidates seeking bedside immersion.",
    internship: "Optional 1 to 3 months clinical attachment upon completion of theoretical and case assessment modules.",
    skills: [
      `Evidence-Based ${f.name.replace('Fellowship in ', '')} Diagnostics`,
      "Advanced Clinical Guidelines Application",
      "Specialty-Specific Pharmacotherapy",
      "Risk Stratification & Emergency Triage",
      "International Medical Writing & Case Presentation"
    ],
    careerOpportunities: [
      `Specialty Clinical Associate in Multispecialty Hospitals`,
      `Independent Healthcare Consultant with ${f.suffix} Credential`,
      `Clinical Research Associate in Global Clinical Trials`,
      `Corporate Medical Advisor & Hospital Department Specialist`
    ],
    jobRoles: [
      `Fellow in ${f.name.replace('Fellowship in ', '')}`,
      "Clinical Specialty Associate",
      "Hospital Medical Officer",
      "Consultant Physician"
    ],
    faqs: [
      {
        question: `Can I practice using the suffix "${f.suffix}"?`,
        answer: `Yes, upon successful completion, candidates receive the official fellowship certificate and transcript accredited by Virtued Eduversity (London, UK) and Virtued Academy International, granting the right to use the post-nominal suffix "${f.suffix}".`
      },
      {
        question: "Is this course accessible while working full-time?",
        answer: "Yes, the program is 100% flexible online with self-paced video modules, AI Lecturer Vera assistance 24/7, and scheduled monthly weekend live doubt sessions."
      },
      {
        question: "What is the fee and are EMI options available?",
        answer: "The current limited offer fee is ₹59,000 (actual fee ₹1,20,000). Zero-cost monthly EMI options and flexible installment plans are available through CIHM DumDum helpline: 9073737888 / 9073737444."
      }
    ],
    relatedCourseSlugs: ["dmlt", "icu-technician", "fellowship-emergency-medicine"],
    admissionCtaText: `Apply for ${f.suffix}`,
    image: f.image,
    gallery: [f.image],
    featured: true,
    status: "published",
    seoTitle: `${f.name} (London, UK) | Online Fellowship CIHM DumDum`,
    metaDescription: `Enroll in 1-Year ${f.name} - ${f.suffix} accredited by Virtued Eduversity London UK. 120 CPD points, AI Lecturer Vera, Special Offer ₹59,000. East India Center: CIHM.`,
    focusKeyword: `${f.name.toLowerCase()} online`,
    secondaryKeywords: [`${f.suffix} fellowship`, "online medical fellowship London", "Virtued Eduversity fellowship CIHM"],
    canonicalUrl: `https://cihm.in/courses/${slug}`,
    ogTitle: `${f.name} – Virtued Eduversity (London, UK) & CIHM`,
    ogDescription: `Advance your clinical career with the 1-Year ${f.name} (${f.suffix}). 120 CPD points, limited fee ₹59,000.`,
    ogImage: f.image,
    schemaType: "Course",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
});

// Combine all courses
const allMergedCourses = [...paramedicalCourses, ...ukFellowshipCourses];

db.courses = allMergedCourses;

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully seeded ${allMergedCourses.length} courses into ${dbPath}!`);
