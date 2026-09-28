import {
  User,
  Course,
  Blog,
  BlogCategory,
  BlogTag,
  BlogAuthor,
  HeroSlide,
  PartnerHospital,
  PlacementRecord,
  TopStudent,
  CareerPath,
  Fellowship,
  EventItem,
  AnnouncementItem,
  FacultyMember,
  FAQItem,
  ReviewItem,
  ReviewSettings,
  CommunityTopic,
  CommunityReply,
  StudyRoom,
  StudyMessage,
  StudyNote,
  MediaAsset,
  SiteSettings,
  RedirectRule,
  AuditLog
} from '../../src/types.js';

export const initialSiteSettings: SiteSettings = {
  instituteName: "Central Institute of Healthcare & Management (CIHM)",
  tagline: "Pioneering Paramedical, Clinical Diagnostics & Healthcare Management Education",
  contactAddress: "Kolkata Campus, Salt Lake Sector V / EM Bypass Corridor, Kolkata - 700091, West Bengal, India",
  cityState: "Kolkata, West Bengal",
  phonePrimary: "+91 33 2456 7890",
  phoneSecondary: "+91 98300 12345",
  emailPrimary: "admissions@cihm.in",
  emailAdmissions: "info@cihm.in",
  officeHours: "Monday to Saturday: 09:30 AM – 06:00 PM IST",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.35231267885!2d88.3103282!3d22.5354064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02772f9b8c0001%3A0x6d11a789!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=CIHM+Kolkata",
  whatsappNumber: "+919830012345",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJd77-k1m9AjoRk5N5qX6X_6I",
  socialLinks: {
    facebook: "https://facebook.com/cihmkolkata",
    linkedin: "https://linkedin.com/company/cihm-kolkata",
    youtube: "https://youtube.com/@cihmkolkata",
    instagram: "https://instagram.com/cihmkolkata",
    twitter: "https://twitter.com/cihmkolkata"
  },
  seo: {
    defaultTitle: "CIHM – Central Institute of Healthcare & Management | Paramedical & Healthcare Education in Kolkata",
    defaultDescription: "CIHM Kolkata provides premier healthcare and paramedical education in DMLT, Radiology, Dialysis, Operation Theatre Technology, and Hospital Management with certified hospital internships.",
    canonicalDomain: "https://cihm.in",
    defaultOgImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    robotsTxtContent: `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/admin\nDisallow: /private\n\nSitemap: https://cihm.in/sitemap.xml`
  }
};

export const initialUsers: User[] = [
  {
    id: "user-super-1",
    name: "Dr. A. K. Banerjee",
    email: "admin@cihm.in",
    role: "super_admin",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    createdAt: "2024-01-15T09:00:00Z"
  },
  {
    id: "user-editor-1",
    name: "Prof. S. Sengupta",
    email: "editor@cihm.in",
    role: "content_manager",
    avatar: "https://images.unsplash.com/photo-1594824813684-60c7f7639f41?auto=format&fit=crop&w=200&q=80",
    createdAt: "2024-02-10T10:30:00Z"
  },
  {
    id: "user-seo-1",
    name: "M. Chakraborty",
    email: "seo@cihm.in",
    role: "seo_manager",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    createdAt: "2024-03-01T11:00:00Z"
  }
];

export const initialHeroSlides: HeroSlide[] = [
  {
    id: "hero-slide-1",
    headline: "Diploma in Medical Laboratory Technology (DMLT)",
    subheadline: "Clinical Pathology & Diagnostic Lab Sciences",
    year: "2026–27",
    badgeColor: "#00A54F",
    description: "Hands-on diagnostic drills with automated biochemistry analyzers, micro-pipetting, hematology counters, and NABL-grade blood sample testing.",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80",
    altText: "Paramedical laboratory technician testing clinical blood samples with diagnostic reagents",
    ctaText: "Explore DMLT Syllabus",
    ctaUrl: "/courses/dmlt",
    secondaryCtaText: "Hospital Postings",
    secondaryCtaUrl: "/placements",
    order: 1,
    enabled: true
  },
  {
    id: "hero-slide-2",
    headline: "Radiology & Medical Imaging Technology (DRMIT)",
    subheadline: "Digital X-Ray, CT Scan & Ultrasonography Workstations",
    year: "2026–27",
    badgeColor: "#2E328D",
    description: "Master patient positioning, digital radiography controls, cross-sectional CT protocols, and AERB radiation protection in active hospital radiology suites.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    altText: "Radiography technologist operating clinical CT scanner console in hospital radiodiagnostic department",
    ctaText: "View Radiology Course",
    ctaUrl: "/courses/radiology-medical-imaging",
    secondaryCtaText: "Career Roadmap",
    secondaryCtaUrl: "/career-roadmap",
    order: 2,
    enabled: true
  },
  {
    id: "hero-slide-3",
    headline: "Diploma in Dialysis Technology & Renal Care",
    subheadline: "Bedside Hemodialysis & Dialyzer Priming Training",
    year: "2026–27",
    badgeColor: "#0284C7",
    description: "Master dialyzer clearance kinetics, AV fistula cannulation, RO water treatment, and emergency dialysis management under senior consultant nephrologists.",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80",
    altText: "Dialysis technologist in clinical unit monitoring hemodialysis patient station and blood lines",
    ctaText: "Dialysis Syllabus",
    ctaUrl: "/courses/dialysis-operator",
    secondaryCtaText: "Hospital Network",
    secondaryCtaUrl: "/placements",
    order: 3,
    enabled: true
  },
  {
    id: "hero-slide-4",
    headline: "Operation Theatre & Anesthesia Technology (DOTT)",
    subheadline: "Surgical Asepsis, Laparoscopy & Anesthesia Workstations",
    year: "2026–27",
    badgeColor: "#059669",
    description: "Sterile theatre preparation, laparoscopic instrument handling, multi-parameter vital monitoring, and code-blue emergency assistance inside surgical suites.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    altText: "Sterile surgical operation theatre with OT technologist preparing surgical instrument tray",
    ctaText: "OT Technology Course",
    ctaUrl: "/courses/operation-theatre-technology",
    secondaryCtaText: "Apply Online",
    secondaryCtaUrl: "/contact",
    order: 4,
    enabled: true
  },
  {
    id: "hero-slide-5",
    headline: "Critical Care & ICU Technology Training",
    subheadline: "Mechanical Ventilator Circuits & Hemodynamic Monitoring",
    year: "2026–27",
    badgeColor: "#DC2626",
    description: "Invasive hemodynamic pressure zeroing, arterial blood gas sampling support, precision infusion pump setup, and ICU code-blue resuscitation protocols.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    altText: "Paramedical critical care specialist in ICU ward monitoring life support and patient vitals",
    ctaText: "Critical Care Course",
    ctaUrl: "/courses/icu-technician",
    secondaryCtaText: "Campus Contact",
    secondaryCtaUrl: "/contact",
    order: 5,
    enabled: true
  },
  {
    id: "hero-slide-6",
    headline: "1-Year Online Fellowship Courses (London) 2026–27",
    subheadline: "Virtued Eduversity (UK) – East India Center: CIHM DumDum",
    year: "2026–27",
    badgeColor: "#F59E0B",
    description: "16 Specialized International Online Fellowships in Cardiology, Critical Care, Diabetology & Emergency Medicine for Doctors & Healthcare Professionals. Limited Offer: ₹59,000 (EMI Available).",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    altText: "Doctor and clinical specialist reviewing medical diagnostic findings for international fellowship",
    ctaText: "View London Fellowships",
    ctaUrl: "/international-fellowships",
    secondaryCtaText: "Call 9073737888",
    secondaryCtaUrl: "/contact",
    order: 6,
    enabled: true
  }
];

export const initialCourses: Course[] = [
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
      {
        id: "dmlt-m1",
        title: "Semester 1: Foundation of Clinical Anatomy, Physiology & Bio-safety",
        duration: "6 Months",
        topics: ["General Human Anatomy and Organ Systems", "Physiological Blood Parameters & Hemostasis", "Laboratory Glassware, Reagents & Bio-Safety Level Guidelines", "Sterilization, Autoclaving & Biomedical Waste Segregation"]
      },
      {
        id: "dmlt-m2",
        title: "Semester 2: Clinical Biochemistry & Analytical Instrumentation",
        duration: "6 Months",
        topics: ["Electrolyte, Renal & Liver Function Profiles", "Automated Clinical Chemistry Analyzers", "Spectrophotometry, Chromatography & Quality Calibration", "Enzymology & Lipid Profile Diagnostic Protocols"]
      },
      {
        id: "dmlt-m3",
        title: "Semester 3: Medical Hematology & Blood Transfusion Services",
        duration: "6 Months",
        topics: ["Complete Blood Count (CBC) & Automated Hematology Analyzers", "Coagulation Profiling, PT/INR & Bleeding Disorders", "Blood Grouping, Cross-Matching & Component Separation", "Peripheral Blood Smear Staining & Morphological Evaluation"]
      },
      {
        id: "dmlt-m4",
        title: "Semester 4: Clinical Microbiology, Serology & Histopathology",
        duration: "6 Months",
        topics: ["Bacteriological Culture, Media Preparation & Antibiotic Sensitivity", "ELISA, Rapid Antigen & Serological Testing", "Tissue Processing, Microtomy & Hematoxylin-Eosin Staining", "Hospital Clinical Internship & Diagnostic Reporting"]
      }
    ],
    practicalTraining: "Daily clinical laboratory drills involving venous blood collection, automated sample centrifugation, biochemical profiling, microbiological culture streak plates, and automated cell counter maintenance.",
    clinicalExposure: "Mandatory clinical hospital postings at partnered tertiary multispecialty hospitals across Kolkata, assisting registered pathologists in live diagnostic departments.",
    internship: "6-month dedicated full-time rotational hospital internship with rotations across Clinical Biochemistry, Pathology, Blood Bank, and Microbiology laboratories.",
    skills: [
      "Automated Hematology Analyzer Operation",
      "Venipuncture & Blood Sample Processing",
      "Biochemical Reagent Calibration",
      "Microbiological Culture & Gram Staining",
      "Histopathological Tissue Embedding & Slicing",
      "Quality Control (L-J Charts) Maintenance"
    ],
    careerOpportunities: [
      "Medical Laboratory Technologist in Multispecialty Hospitals",
      "Senior Diagnostic Technician in NABL Accredited Pathology Labs",
      "Blood Bank Technical Officer",
      "Clinical Research Assistant in Diagnostic Trials",
      "Quality Control Analyst in Diagnostic Manufacturing"
    ],
    jobRoles: [
      "Medical Lab Technologist (MLT)",
      "Biochemistry Technician",
      "Blood Bank Officer",
      "Histopathology Associate",
      "Microbiology Lab Assistant"
    ],
    faqs: [
      {
        question: "Is DMLT eligible for hospital appointments across government and private sectors?",
        answer: "Yes. DMLT qualified candidates who complete certified training and internships are eligible for diagnostic and laboratory technician roles across private multispecialty hospitals, diagnostic chains, and medical centers."
      },
      {
        question: "What is the practical to theory ratio during the program?",
        answer: "The program follows an intensive 60:40 practical-to-theory split, ensuring students spend substantial hours inside laboratories and hospital wards."
      },
      {
        question: "Does the institute assist with hospital internships?",
        answer: "Yes, CIHM coordinates all clinical rotations and hospital internships through established academic affiliations with leading hospitals in Kolkata."
      }
    ],
    relatedCourseSlugs: ["radiology-medical-imaging", "dialysis-operator", "operation-theatre-technology"],
    admissionCtaText: "Apply for DMLT Batch",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    seoTitle: "DMLT Course in Kolkata | Diploma in Medical Laboratory Technology | CIHM",
    metaDescription: "Study DMLT in Kolkata at CIHM. 2-year certified Diploma in Medical Laboratory Technology with 100% practical hospital clinical training and internship.",
    focusKeyword: "DMLT course in Kolkata",
    secondaryKeywords: ["Diploma in Medical Laboratory Technology", "paramedical college Kolkata", "DMLT admission", "pathology lab training"],
    canonicalUrl: "https://cihm.in/courses/dmlt",
    ogTitle: "DMLT Program at CIHM Kolkata – Practical Medical Laboratory Education",
    ogDescription: "Join the certified DMLT course at Central Institute of Healthcare & Management. Advanced lab diagnostics, hospital training, and career readiness.",
    ogImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-08-15T12:00:00Z"
  },
  {
    id: "course-radiology",
    slug: "radiology-medical-imaging",
    name: "Diploma in Radiology & Medical Imaging Technology (DRMIT)",
    category: "Radiological Sciences",
    shortDescription: "Specialized paramedical program training students in diagnostic radiography, digital X-rays, CT scanning, ultrasound imaging protocols, and radiation protection.",
    fullDescription: "The Radiology & Medical Imaging program at CIHM develops confident radiographers trained to produce high-resolution diagnostic images while prioritizing radiation safety for patients and staff. Students train on digital radiography (DR/CR) consoles, computed tomography basics, and patient positioning protocols.",
    overview: "Diagnostic imaging is essential for accurate medical diagnoses. Trainees gain deep theoretical grounding in physics of radiation, radiological anatomy, contrast media administration assistance, and digital PACS archive handling.",
    eligibility: "10+2 with Science (Physics, Chemistry, Biology/Mathematics) from a recognized board.",
    duration: "2 Years including Clinical Hospital Postings",
    curriculum: [
      {
        id: "rad-m1",
        title: "Module 1: Radiographic Physics & Radiation Protection Guidelines",
        duration: "6 Months",
        topics: ["Production & Properties of X-Radiation", "AERB Safety Guidelines & Lead Shielding Protocols", "Darkroom & Digital Computed Radiography (CR) Systems", "Radiation Dosimetry & Personnel Monitoring (TLD Badges)"]
      },
      {
        id: "rad-m2",
        title: "Module 2: Radiographic Positioning & Skeletal Anatomy",
        duration: "6 Months",
        topics: ["Patient Positioning for Skull, Chest, Spine & Extremities", "Trauma Radiography & Mobile Portable X-Ray Operations", "Specialized Contrast Examinations (Barium Studies, IVU)", "Cross-Sectional Radiological Anatomy"]
      },
      {
        id: "rad-m3",
        title: "Module 3: Advanced Computed Tomography (CT) Principles",
        duration: "6 Months",
        topics: ["CT Console Architecture & Gantry Operations", "Scanning Protocols for Neuro, Thoracic & Abdominal CT", "Contrast Reactions Management & Emergency Preparedness", "Digital Artifact Identification & Image Reconstruction"]
      },
      {
        id: "rad-m4",
        title: "Module 4: Diagnostic Ultrasound & MRI Fundamentals",
        duration: "6 Months",
        topics: ["Ultrasound Transducers & Patient Preparation", "Magnetic Resonance Imaging Safety & Ferromagnetic Checks", "Hospital Radiodiagnostic Ward Rotations", "PACS Archive Management & Diagnostic Reporting Assistance"]
      }
    ],
    practicalTraining: "Simulation laboratory drills for skeletal positioning, exposure parameter setting (kVp, mAs), image plate processing, radiation barrier verification, and portable bedside X-ray operation.",
    clinicalExposure: "Hands-on rotations inside hospital radiology departments, rotating through general X-ray suites, emergency trauma imaging bays, and CT scanning suites.",
    internship: "6-month hospital internship under senior consultant radiologists and chief radiographers.",
    skills: [
      "Digital X-Ray (DR/CR) System Operation",
      "Precise Skeletal Positioning Protocols",
      "Radiation Shielding & AERB Compliance",
      "CT Scan Patient Preparation & Protocols",
      "PACS Workstation & DICOM Management"
    ],
    careerOpportunities: [
      "Radiographer / X-Ray Technologist in Multispecialty Hospitals",
      "CT Scan Technologist in Diagnostic Centers",
      "Radiology Assistant in Emergency Trauma Centers",
      "Medical Imaging Application Specialist",
      "Diagnostic Center Imaging Supervisor"
    ],
    jobRoles: [
      "Radiographer",
      "X-Ray Technician",
      "CT Technologist",
      "Imaging Support Specialist"
    ],
    faqs: [
      {
        question: "Does the program cover radiation protection guidelines?",
        answer: "Yes. Radiation safety standards established by the Atomic Energy Regulatory Board (AERB) are taught thoroughly, including TLD badge tracking and lead apron safety."
      },
      {
        question: "Do students get practical experience with CT scanners?",
        answer: "Yes, students receive supervised observational and console exposure on multi-slice CT scanners during their hospital clinical postings."
      }
    ],
    relatedCourseSlugs: ["dmlt", "operation-theatre-technology", "icu-technician"],
    admissionCtaText: "Enquire for Radiology Admissions",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    seoTitle: "Radiology & Medical Imaging Technology Course in Kolkata | CIHM",
    metaDescription: "Advance your healthcare career with CIHM's Diploma in Radiology & Medical Imaging Technology in Kolkata. Comprehensive X-Ray and CT training.",
    focusKeyword: "Radiology course in Kolkata",
    secondaryKeywords: ["Medical Imaging Technology", "Radiographer training Kolkata", "X-ray technician diploma", "paramedical imaging course"],
    canonicalUrl: "https://cihm.in/courses/radiology-medical-imaging",
    ogTitle: "Radiology & Medical Imaging Technology Program | CIHM Kolkata",
    ogDescription: "Certified practical training in digital radiography, CT scanning, and radiological safety at Central Institute of Healthcare & Management.",
    ogImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-08-16T12:00:00Z"
  },
  {
    id: "course-dialysis",
    slug: "dialysis-operator",
    name: "Diploma in Dialysis Technology & Clinical Nephro-Care",
    category: "Renal & Critical Care",
    shortDescription: "Specialized paramedical program training healthcare professionals in hemodialysis procedures, dialyzer reprocessing, vascular access management, and nephrology care.",
    fullDescription: "The Diploma in Dialysis Technology program at CIHM develops competent dialysis operators capable of managing hemodialysis and peritoneal dialysis procedures under the supervision of nephrologists. Students master water treatment plant (RO) monitoring, dialyzer priming, heparinization protocols, and intradialytic complication management.",
    overview: "With increasing prevalence of renal conditions, trained dialysis operators are among the most critical paramedical specialists in modern hospitals. This course provides comprehensive theoretical grounding and live dialysis unit experience.",
    eligibility: "10+2 with Physics, Chemistry, Biology (or related Life Science qualifications).",
    duration: "2 Years including Rotational Nephrology Clinical Internship",
    curriculum: [
      {
        id: "dial-m1",
        title: "Module 1: Renal Anatomy, Physiology & Pathophysiology",
        duration: "6 Months",
        topics: ["Kidney Structure, Glomerular Filtration & Urine Formation", "Acute Kidney Injury (AKI) & Chronic Kidney Disease (CKD) Stages", "Electrolyte & Acid-Base Equilibrium in Renal Failure", "Uremic Syndrome & Clinical Indications for Dialysis"]
      },
      {
        id: "dial-m2",
        title: "Module 2: Hemodialysis Principles & Machine Priming",
        duration: "6 Months",
        topics: ["Extracorporeal Circuit: Blood Lines, Hemodialyzers & Priming", "Dialysate Composition, Bicarbonate & Acetate Mixing", "Anticoagulation Protocols: Heparin Dosage & Low Molecular Weight Heparin", "Automated Dialysis Machine Safety Sensors & Alarm Checks"]
      },
      {
        id: "dial-m3",
        title: "Module 3: Vascular Access & Infection Control Protocols",
        duration: "6 Months",
        topics: ["AV Fistula & AV Graft Cannulation Techniques", "Central Venous Catheter (Internal Jugular, Femoral) Care", "Dialyzer Reprocessing & Disinfection Standards", "Reverse Osmosis (RO) Water Treatment Plant Testing"]
      },
      {
        id: "dial-m4",
        title: "Module 4: Intradialytic Complications & Emergency Response",
        duration: "6 Months",
        topics: ["Hypotension, Muscle Cramps & Dialysis Disequilibrium", "Blood Leak & Air Embolism Emergency Interventions", "Peritoneal Dialysis (CAPD/APD) Overview", "Hospital Dialysis Unit Rotational Internship"]
      }
    ],
    practicalTraining: "Hands-on machine priming, dialyzer circuit assembly, RO water plant hardness and chlorine testing, sterile cannulation simulations, and patient vitals monitoring.",
    clinicalExposure: "Clinical postings in hospital hemodialysis units, assisting nephrologists and dialysis sisters during active dialysis sessions.",
    internship: "6-month clinical dialysis unit internship with required minimum supervised patient treatment sessions.",
    skills: [
      "Hemodialysis Machine Setup & Priming",
      "Arteriovenous (AV) Fistula Cannulation",
      "Water Treatment (RO System) Quality Auditing",
      "Dialyzer Automated Reprocessing",
      "Intradialytic Complication Management"
    ],
    careerOpportunities: [
      "Dialysis Technologist in Tertiary Care Hospitals",
      "Senior Dialysis Operator in Specialized Nephrology Clinics",
      "Home Hemodialysis Support Technologist",
      "Dialysis Equipment Technical Support Specialist",
      "Clinical Instructor in Dialysis Training Centers"
    ],
    jobRoles: [
      "Dialysis Technologist",
      "Renal Care Associate",
      "Dialysis Unit In-charge Assistant",
      "Nephrology Technician"
    ],
    faqs: [
      {
        question: "Is there practical training on automated dialysis machines?",
        answer: "Yes, students receive extensive hands-on instruction on multi-brand modern hemodialysis consoles during campus labs and hospital postings."
      },
      {
        question: "What hospitals do students intern at?",
        answer: "CIHM coordinates clinical postings at recognized nephrology centers and tertiary care hospitals across Kolkata."
      }
    ],
    relatedCourseSlugs: ["dmlt", "icu-technician", "operation-theatre-technology"],
    admissionCtaText: "Apply for Dialysis Batch",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    seoTitle: "Dialysis Technician Course in Kolkata | CIHM",
    metaDescription: "Enroll in Diploma in Dialysis Technology at CIHM Kolkata. Certified hospital clinical training, hemodialysis machine operations, and career support.",
    focusKeyword: "Dialysis technician course in Kolkata",
    secondaryKeywords: ["Dialysis training Kolkata", "hemodialysis diploma", "paramedical nephrology", "dialysis operator course"],
    canonicalUrl: "https://cihm.in/courses/dialysis-operator",
    ogTitle: "Dialysis Technology & Clinical Nephro-Care Diploma | CIHM Kolkata",
    ogDescription: "Master hemodialysis machine operations, vascular access, and nephrology care with certified clinical hospital training.",
    ogImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-08-18T12:00:00Z"
  },
  {
    id: "course-ott",
    slug: "operation-theatre-technology",
    name: "Diploma in Operation Theatre Technology (DOTT)",
    category: "Surgical & Perioperative Sciences",
    shortDescription: "Comprehensive training in surgical theatre preparation, anesthesia workstation assistance, sterile supply handling, and surgical instrument management.",
    fullDescription: "The Operation Theatre Technology program prepares skilled perioperative healthcare workers who maintain surgical sterility, prepare anesthesia and surgical equipment, and assist surgical and anesthesia teams during complex surgical procedures.",
    overview: "Modern surgery demands precision and sterile vigilance. OT Technologists ensure surgical instruments, laparoscopy stacks, electrosurgical units, and anesthesia ventilators are sterilized, calibrated, and operational.",
    eligibility: "10+2 with Science stream (Physics, Chemistry, Biology).",
    duration: "2 Years including 6 Months Supervised Surgical OT Internship",
    curriculum: [
      {
        id: "ott-m1",
        title: "Module 1: Surgical Asepsis, Sterilization & OT Layout",
        duration: "6 Months",
        topics: ["Zoning of Operation Theatre (Sterile, Clean, Protective Zones)", "Principles of Autoclaving, ETO & Plasma Sterilization", "Surgical Scrubbing, Gowning & Gloving Techniques", "Biomedical Waste Management in Surgical Suites"]
      },
      {
        id: "ott-m2",
        title: "Module 2: Surgical Instrumentation & Specialty Trays",
        duration: "6 Months",
        topics: ["General Surgical Instruments: Clamps, Forceps & Retractors", "Specialty Trays: Orthopedic, Laparoscopic, ENT & Cardiovascular", "Electrosurgical Diathermy & Energy Devices", "Surgical Sutures, Needles & Hemostatic Agents"]
      },
      {
        id: "ott-m3",
        title: "Module 3: Anesthesia Workstations & Patient Monitoring",
        duration: "6 Months",
        topics: ["Anesthesia Machine Circuits, Vaporizers & Gas Supply", "Endotracheal Intubation & Airway Management Equipment", "Intraoperative Multi-Parameter Monitoring Systems", "Emergency Drugs, Resuscitation & Crash Cart Management"]
      },
      {
        id: "ott-m4",
        title: "Module 4: Post-Anesthesia Care & Surgical Rotations",
        duration: "6 Months",
        topics: ["Post-Anesthesia Care Unit (PACU) Monitoring", "Infection Control Audits & CSSD Procedures", "Supervised Major & Minor OT Postings", "Hospital Clinical Surgical Internship"]
      }
    ],
    practicalTraining: "Sterile scrubbing techniques, surgical instrument tray arrangement, laparoscopic tower checklist verification, and anesthesia trolley setup drills.",
    clinicalExposure: "Rotational postings inside general surgery, orthopedics, neurosurgery, and obstetrics OT suites in major teaching hospitals.",
    internship: "6-month active surgical theatre posting assisting surgical teams and scrub nurses.",
    skills: [
      "Operating Theatre Sterility Maintenance",
      "Surgical Instrument Tray Preparation",
      "Anesthesia Workstation Preparation",
      "Electrosurgery & Laparoscopy Setup",
      "Central Sterile Supply Department (CSSD) Operations"
    ],
    careerOpportunities: [
      "Operation Theatre Technologist in Tertiary Hospitals",
      "Anesthesia Support Associate",
      "CSSD Technical Supervisor",
      "Endoscopy / Laparoscopy Suite Technologist",
      "Surgical Equipment Specialist"
    ],
    jobRoles: [
      "OT Technologist",
      "Surgical Assistant Associate",
      "Anesthesia Technician",
      "CSSD In-charge Assistant"
    ],
    faqs: [
      {
        question: "Do students get practical exposure inside active hospital operating theatres?",
        answer: "Yes, during clinical rotations students observe and assist under senior perioperative staff in active multispecialty hospital operating rooms."
      },
      {
        question: "What is CSSD training?",
        answer: "Central Sterile Supply Department training covers modern sterilization methods (autoclaving, ethylene oxide, hydrogen peroxide gas plasma) to ensure total pathogen eradication."
      }
    ],
    relatedCourseSlugs: ["icu-technician", "dmlt", "radiology-medical-imaging"],
    admissionCtaText: "Enquire for OT Technology",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ],
    featured: true,
    status: "published",
    seoTitle: "Operation Theatre Technology Course in Kolkata | CIHM",
    metaDescription: "Diploma in Operation Theatre Technology (DOTT) at CIHM Kolkata. Certified hospital practical training in surgical asepsis, anesthesia support, and OT setup.",
    focusKeyword: "Operation Theatre Technology course in Kolkata",
    secondaryKeywords: ["DOTT course Kolkata", "OT technician training", "paramedical surgical course", "anesthesia technician course"],
    canonicalUrl: "https://cihm.in/courses/operation-theatre-technology",
    ogTitle: "Operation Theatre Technology (DOTT) Program | CIHM Kolkata",
    ogDescription: "Train in perioperative surgical care, anesthesia machine operations, and sterile OT workflows at CIHM.",
    ogImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-08-20T12:00:00Z"
  },
  {
    id: "course-ecg",
    slug: "ecg-technician",
    name: "Certificate & Diploma in ECG & Cardiovascular Diagnostics",
    category: "Cardiac Diagnostic Sciences",
    shortDescription: "Specialized non-invasive cardiac diagnostic training focusing on 12-lead electrocardiography recording, Holter monitoring, stress testing protocols, and cardiac rhythm recognition.",
    fullDescription: "The ECG & Cardiovascular Diagnostics program prepares technicians skilled in recording diagnostic 12-lead electrocardiograms, setting up ambulatory Holter monitors, assisting during Treadmill Tests (TMT), and recognizing acute cardiac arrhythmias and ischemic patterns.",
    overview: "Rapid and precise cardiac diagnostic recording saves lives in emergency rooms and cardiac care units. Students receive rigorous training in lead placement, artifact elimination, and cardiac electrophysiology.",
    eligibility: "10+2 with Science stream.",
    duration: "1 Year / 2 Years (options) with Hospital Cardiology Rotation",
    curriculum: [
      {
        id: "ecg-m1",
        title: "Module 1: Cardiac Anatomy, Electrophysiology & Conduction System",
        duration: "3 Months",
        topics: ["Cardiac Chambers, Valves & Coronary Circulation", "Sinoatrial Node, AV Node & Purkinje Fiber Activation", "Dipole Theory & Genesis of P-QRS-T Waves", "Standard 12-Lead Systems & Limb Lead Placements"]
      },
      {
        id: "ecg-m2",
        title: "Module 2: 12-Lead Recording Techniques & Artifact Management",
        duration: "3 Months",
        topics: ["Precise Precordial Electrode Placement (V1-V6)", "Somatic Tremor, Wandering Baseline & 50Hz Interference Removal", "Emergency Dextrocardia & Posterior Lead Placements", "Pediatric ECG Recording Protocols"]
      },
      {
        id: "ecg-m3",
        title: "Module 3: Non-Invasive Cardiac Diagnostic Modalities",
        duration: "3 Months",
        topics: ["Ambulatory 24-Hour Holter Monitor Attachment & Scanning", "Treadmill Stress Testing (TMT) Safety & Bruce Protocols", "Basic Echocardiography Patient Preparation", "Blood Pressure Holter Monitoring (ABPM)"]
      },
      {
        id: "ecg-m4",
        title: "Module 4: Arrhythmia Recognition & Clinical Postings",
        duration: "3 Months",
        topics: ["Atrial Fibrillation, Flutter & Ventricular Tachycardia Patterns", "Myocardial Infarction STEMI / NSTEMI Vector Indications", "Heart Block Classification & Pacemaker Rhythm Recognition", "Hospital Emergency & Cardiology Ward Postings"]
      }
    ],
    practicalTraining: "Extensive hands-on electrode placement drills, recording high-fidelity 12-lead traces, speed and voltage calibration adjustments, and Holter hookup practice.",
    clinicalExposure: "Postings in cardiac OPDs, emergency triage bays, and intensive coronary care units (ICCU) under senior cardiologists.",
    internship: "Mandatory hospital clinical internship in cardiology diagnostic departments.",
    skills: [
      "Accurate 12-Lead ECG Electrode Placement",
      "Artifact Elimination & Filter Configuration",
      "Holter Monitor Hookup & Event Diary Review",
      "Stress Test (TMT) Patient Preparation",
      "Emergency Cardiac Arrhythmia Identification"
    ],
    careerOpportunities: [
      "ECG Technologist in Cardiology Departments",
      "Cardiovascular Diagnostics Associate",
      "Holter Analysis Technical Specialist",
      "Emergency Room Diagnostic Associate",
      "Mobile Health & Cardiac Diagnostics Specialist"
    ],
    jobRoles: [
      "ECG Technician",
      "Cardiology Diagnostic Assistant",
      "Holter Technician",
      "TMT Associate"
    ],
    faqs: [
      {
        question: "Is clinical arrhythmia recognition taught in this course?",
        answer: "Yes, students learn fundamental recognition of critical arrhythmias such as ventricular tachycardia, heart blocks, and acute ischemic changes to notify attending clinicians."
      }
    ],
    relatedCourseSlugs: ["icu-technician", "dmlt", "dialysis-operator"],
    admissionCtaText: "Apply for ECG Course",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    status: "published",
    seoTitle: "ECG Technician Course in Kolkata | CIHM",
    metaDescription: "Pursue certified ECG and cardiac diagnostics technician training at CIHM Kolkata. Practical 12-lead recording, Holter monitoring, and hospital clinical exposure.",
    focusKeyword: "ECG technician course in Kolkata",
    secondaryKeywords: ["Cardiology technician training", "ECG diploma Kolkata", "Holter monitor training", "paramedical cardiac course"],
    canonicalUrl: "https://cihm.in/courses/ecg-technician",
    ogTitle: "ECG & Cardiovascular Diagnostics Program | CIHM Kolkata",
    ogDescription: "Comprehensive hands-on training in 12-lead ECG, stress testing, and arrhythmia recognition at CIHM.",
    ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-08-21T12:00:00Z"
  },
  {
    id: "course-icu",
    slug: "icu-technician",
    name: "Diploma in Critical Care & ICU Technology",
    category: "Critical Care Sciences",
    shortDescription: "Intensive training in critical care monitoring, mechanical ventilator setup, arterial line assistance, infusion pump calibration, and emergency life support.",
    fullDescription: "The Critical Care & ICU Technology program trains allied healthcare professionals to assist intensivists and critical care nurses in managing critically ill patients inside Intensive Care Units (ICUs), High Dependency Units (HDUs), and Trauma Centers.",
    overview: "Critical care environments require deep technical aptitude and rapid response capabilities. Students learn respiratory mechanics, invasive hemodynamic monitoring, sepsis protocols, and ventilator circuit maintenance.",
    eligibility: "10+2 with Physics, Chemistry, Biology.",
    duration: "2 Years including 6 Months ICU Rotational Internship",
    curriculum: [
      {
        id: "icu-m1",
        title: "Module 1: Critical Care Environment & Patient Safety",
        duration: "6 Months",
        topics: ["Organization of Medical, Surgical & Neuro ICUs", "Nosocomial Infection Prevention & Bundles of Care", "Arterial Blood Gas (ABG) Sampling Assistance & Interpretation", "Central Line & Arterial Line Transducer Calibration"]
      },
      {
        id: "icu-m2",
        title: "Module 2: Mechanical Ventilation & Airway Management",
        duration: "6 Months",
        topics: ["Modes of Ventilation (Volume Control, Pressure Control, PSV)", "Ventilator Circuits, Humidifiers & Expiratory Filter Assembly", "Endotracheal Suctioning, Tracheostomy Tube Care", "Non-Invasive Ventilation (NIV / CPAP / BiPAP) Applications"]
      },
      {
        id: "icu-m3",
        title: "Module 3: Advanced Hemodynamics & Infusion Technologies",
        duration: "6 Months",
        topics: ["Syringe Pumps & Volumetric Infusion Pump Calculations", "Defibrillator Operation & Automated External Defibrillator (AED)", "Cardiac Arrest Protocols (BLS / ACLS Principles)", "Continuous Renal Replacement Therapy (CRRT) Machine Assistance"]
      },
      {
        id: "icu-m4",
        title: "Module 4: Intensive Clinical Postings & ICU Internship",
        duration: "6 Months",
        topics: ["Bedside Patient Monitoring Protocols in Medical ICUs", "Emergency Resuscitation Assistance in Trauma Bays", "Disinfection of ICU Equipment & Ventilators", "Full-time Hospital ICU Clinical Internship"]
      }
    ],
    practicalTraining: "Hands-on assembly of mechanical ventilator circuits, zeroing arterial pressure transducers, programmed syringe pump calibration, and mock code-blue drills.",
    clinicalExposure: "Continuous rotational postings in tertiary hospital ICUs, CCUs, and neuro-critical care wards.",
    internship: "6-month clinical internship dedicated to ICU patient monitoring under senior intensivists.",
    skills: [
      "Mechanical Ventilator Circuit Setup",
      "Invasive Hemodynamic Transducer Calibration",
      "Precision Syringe & Infusion Pump Management",
      "Arterial Blood Gas (ABG) Analyzer Operations",
      "Crash Cart Organization & BLS Support"
    ],
    careerOpportunities: [
      "Critical Care Technologist in Multispecialty ICUs",
      "Trauma Care Unit Technologist",
      "Emergency Care Associate",
      "Ventilator & Medical Equipment Application Specialist",
      "HDU Clinical Coordinator"
    ],
    jobRoles: [
      "ICU Technologist",
      "Critical Care Associate",
      "Emergency Medical Technologist",
      "Respiratory Care Support"
    ],
    faqs: [
      {
        question: "Do students learn how to operate ICU mechanical ventilators?",
        answer: "Yes, students learn circuit assembly, leak checks, filter changes, humidifier maintenance, and setting changes under clinician instructions."
      }
    ],
    relatedCourseSlugs: ["operation-theatre-technology", "dialysis-operator", "ecg-technician"],
    admissionCtaText: "Apply for ICU Technology",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    status: "published",
    seoTitle: "Critical Care & ICU Technician Course in Kolkata | CIHM",
    metaDescription: "Diploma in Critical Care & ICU Technology in Kolkata at CIHM. Hands-on hospital training in mechanical ventilation, hemodynamic monitoring, and trauma care.",
    focusKeyword: "ICU technician course in Kolkata",
    secondaryKeywords: ["Critical care technology diploma", "ICU training Kolkata", "ventilator technician course", "paramedical critical care"],
    canonicalUrl: "https://cihm.in/courses/icu-technician",
    ogTitle: "Critical Care & ICU Technology Program | CIHM Kolkata",
    ogDescription: "Gain practical clinical proficiency in intensive care units, ventilator setups, and trauma stabilization at CIHM.",
    ogImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: "2024-01-22T10:00:00Z",
    updatedAt: "2024-08-22T12:00:00Z"
  },
  {
    id: "course-hospital-mgmt",
    slug: "hospital-management",
    name: "Diploma in Hospital Administration & Healthcare Management",
    category: "Healthcare Management Sciences",
    shortDescription: "Professional healthcare leadership program covering hospital operational planning, NABH accreditation standards, patient care coordination, health informatics, and clinical logistics.",
    fullDescription: "The Hospital Administration & Healthcare Management program prepares ethical, competent managers who bridge medical services and administrative operations. The curriculum covers hospital information management systems (HIMS), statutory healthcare compliances, quality assurance, and patient journey optimization.",
    overview: "Modern healthcare facilities require structured, compassionate, and standardized administration. This program equips graduates with analytical leadership skills to manage departments, coordinate patient services, and uphold quality benchmarks.",
    eligibility: "Higher Secondary (10+2) or Bachelor's Degree in any discipline with passion for healthcare management.",
    duration: "1 Year / 2 Years (options) with Hospital Administrative Postings",
    curriculum: [
      {
        id: "hm-m1",
        title: "Module 1: Principles of Healthcare Organization & Hospital Planning",
        duration: "6 Months",
        topics: ["Structure of Healthcare Delivery Systems & Hospital Departments", "Hospital Architecture, Zoning & Patient Flow Logistics", "Public Health Policies & Clinical Establishment Statutory Compliances", "Bio-Medical Waste Management Rules & Environmental Protocols"]
      },
      {
        id: "hm-m2",
        title: "Module 2: Hospital Operations & Patient Care Administration",
        duration: "6 Months",
        topics: ["Outpatient (OPD) & Inpatient (IPD) Admissions Workflow", "Emergency Medical Services & Triage Administrative Protocols", "Pharmacy, Dietary, Housekeeping & Linen Logistics", "Patient Grievance Redressal & Quality Experience Management"]
      },
      {
        id: "hm-m3",
        title: "Module 3: Healthcare Quality, NABH & Clinical Audits",
        duration: "6 Months",
        topics: ["NABH (National Accreditation Board for Hospitals) Standards", "Clinical Safety Indicators, Medication Error Audits & KPI Tracking", "Hospital Infection Control Committee (HICC) Administrative Protocols", "Medical Records Department (MRD) Management & ICD-10 Coding"]
      },
      {
        id: "hm-m4",
        title: "Module 4: Health Informatics, Telemedicine & Hospital Residency",
        duration: "6 Months",
        topics: ["Hospital Information Management Systems (HIMS) & Electronic Health Records (EHR)", "Digital Healthcare Platforms & Telemedicine Administration", "Healthcare Human Resource Planning & Staff Rostering", "Hospital Administrative Residency & Project Defense"]
      }
    ],
    practicalTraining: "Hospital departmental shadowing, HIMS software navigation, quality audit simulation, patient feedback analysis, and crisis coordination exercises.",
    clinicalExposure: "Administrative rotations across front-office, OPD coordinators, IPD admission desks, billing audit sections, and medical records departments.",
    internship: "Comprehensive administrative internship inside recognized multispecialty hospitals.",
    skills: [
      "Hospital Information Management Systems (HIMS)",
      "NABH Quality Documentation & KPI Tracking",
      "Patient Relationship & Discharge Coordination",
      "Medical Records & Health Data Compliance",
      "Hospital Departmental Workflow Optimization"
    ],
    careerOpportunities: [
      "Assistant Hospital Administrator in Multispecialty Hospitals",
      "Patient Care Executive / Floor Manager",
      "Quality Assurance & NABH Coordinator",
      "OPD / IPD Operations Manager",
      "Healthcare Project Coordinator"
    ],
    jobRoles: [
      "Hospital Operations Executive",
      "Patient Care Coordinator",
      "Quality Executive",
      "Front Office Administrator",
      "Health Systems Associate"
    ],
    faqs: [
      {
        question: "Is this course open to students from Arts and Commerce backgrounds?",
        answer: "Yes, candidates who have completed 10+2 or Graduation from any stream (Science, Commerce, or Arts) with interest in healthcare administration are eligible."
      }
    ],
    relatedCourseSlugs: ["dmlt", "radiology-medical-imaging", "operation-theatre-technology"],
    admissionCtaText: "Enquire for Hospital Management",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
    ],
    featured: false,
    status: "published",
    seoTitle: "Hospital Management Course in Kolkata | CIHM",
    metaDescription: "Diploma in Hospital Administration at CIHM Kolkata. Career-oriented training in hospital operations, NABH quality management, and clinical administration.",
    focusKeyword: "Hospital management course in Kolkata",
    secondaryKeywords: ["Hospital administration diploma", "healthcare management Kolkata", "hospital administrator training", "NABH coordinator course"],
    canonicalUrl: "https://cihm.in/courses/hospital-management",
    ogTitle: "Hospital Administration & Healthcare Management | CIHM Kolkata",
    ogDescription: "Gain practical skills in hospital operations, quality compliance, and patient care management.",
    ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Course",
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-08-25T12:00:00Z"
  }
];

export const initialBlogCategories: BlogCategory[] = [
  { id: "cat-1", name: "Paramedical Education", slug: "paramedical-education", description: "Insights, curricula, and academic guidance for paramedical and healthcare students.", postCount: 4 },
  { id: "cat-2", name: "Healthcare Careers", slug: "healthcare-careers", description: "Career pathways, hospital job profiles, and career readiness guides.", postCount: 5 },
  { id: "cat-3", name: "DMLT & Lab Sciences", slug: "dmlt-lab-sciences", description: "Clinical laboratory diagnostic techniques, biochemistry, and pathology innovations.", postCount: 3 },
  { id: "cat-4", name: "Radiology & Imaging", slug: "radiology-imaging", description: "Advances in medical imaging, CT scans, digital X-rays, and radiation safety.", postCount: 2 },
  { id: "cat-5", name: "Dialysis & Nephrology", slug: "dialysis-nephrology", description: "Hemodialysis procedures, renal care, and modern nephrology technologies.", postCount: 2 },
  { id: "cat-6", name: "Clinical Training & Internships", slug: "clinical-training", description: "Hospital postings, clinical practical protocols, and hands-on patient care.", postCount: 3 },
  { id: "cat-7", name: "Hospital Management", slug: "hospital-management", description: "Hospital operations, NABH compliance, and quality healthcare administration.", postCount: 2 },
  { id: "cat-8", name: "CIHM News & Events", slug: "cihm-news", description: "Official announcements, campus seminars, workshops, and student achievements.", postCount: 2 }
];

export const initialBlogTags: BlogTag[] = [
  { id: "tag-1", name: "DMLT", slug: "dmlt", indexable: true },
  { id: "tag-2", name: "Radiology", slug: "radiology", indexable: true },
  { id: "tag-3", name: "Dialysis", slug: "dialysis", indexable: true },
  { id: "tag-4", name: "Hospital Internships", slug: "hospital-internships", indexable: true },
  { id: "tag-5", name: "Paramedical Careers", slug: "paramedical-careers", indexable: true },
  { id: "tag-6", name: "Kolkata Healthcare", slug: "kolkata-healthcare", indexable: true },
  { id: "tag-7", name: "Operation Theatre", slug: "operation-theatre", indexable: true },
  { id: "tag-8", name: "Patient Care", slug: "patient-care", indexable: true }
];

export const initialBlogAuthors: BlogAuthor[] = [
  {
    id: "auth-1",
    name: "Dr. A. K. Banerjee",
    designation: "Academic Director & Senior Pathologist",
    bio: "Consultant pathologist with over 22 years of clinical diagnostics and medical teaching experience in leading healthcare institutes.",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "auth-2",
    name: "Prof. S. Sengupta",
    designation: "Head of Paramedical Sciences",
    bio: "Specialist in clinical biochemistry and laboratory quality assurance. Dedicated to training skilled allied healthcare technologists.",
    avatar: "https://images.unsplash.com/photo-1594824813684-60c7f7639f41?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "auth-3",
    name: "Dr. R. Mukherjee",
    designation: "Consultant Nephrologist & Visiting Faculty",
    bio: "Fellow of Nephrology with extensive clinical experience in hemodialysis units and peritoneal dialysis programs.",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80"
  }
];

export const initialBlogs: Blog[] = [
  {
    id: "blog-1",
    title: "How to Choose the Right Paramedical Course in Kolkata: A Comprehensive Guide",
    slug: "how-to-choose-the-right-paramedical-course",
    excerpt: "Explore career opportunities, hospital demands, and practical requirements to select the ideal paramedical specialization in DMLT, Radiology, Dialysis, or OT Technology.",
    content: `## The Growing Demand for Paramedical Professionals\n\nModern healthcare delivery relies heavily on skilled paramedical technologists. For every physician or surgeon in a hospital, a team of specialized diagnostic and clinical technologists ensures that accurate data, proper equipment, and compassionate patient care are maintained continuously.\n\nWhen evaluating paramedical courses in Kolkata, prospective students should consider three foundational criteria:\n\n1. **Practical and Clinical Exposure**: Medical theory without real patient-side or laboratory practice is insufficient. Verify whether the institute provides hands-on access to automated diagnostic equipment and organized hospital clinical postings.\n2. **Clinical Specialization Alignment**: Consider your personal strengths. If you enjoy biochemical analysis and laboratory investigation, Medical Laboratory Technology (DMLT) is an excellent match. If you are intrigued by diagnostic physics, imaging, and computational consoles, Radiology & Medical Imaging provides fulfilling avenues.\n3. **Institutional Affiliations & Placement Support**: Reputable paramedical colleges maintain structured relationships with multispecialty healthcare facilities, enabling smooth transitions from classroom learning to internship and professional appointments.\n\n### Comparing Key Paramedical Disciplines\n\n| Course | Primary Focus | Clinical Setting | Career Horizons |\n| :--- | :--- | :--- | :--- |\n| **DMLT** | Pathology, Biochemistry & Blood Bank | Hospital Labs, Diagnostic Centers | Lab Technologist, Blood Bank Officer |\n| **Radiology** | Digital X-Ray, CT, Radiation Safety | Radiodiagnostic Suites, Trauma Centers | Radiographer, CT Technologist |\n| **Dialysis** | Hemodialysis, RO Systems, Nephro-Care | Renal Dialysis Units, Nephrology ICUs | Dialysis Operator, Renal Care Specialist |\n| **OT Technology** | Sterile Asepsis, Anesthesia & Instruments | Surgical Suites, Day-care Surgery Centers | OT Technologist, Surgical Assistant |\n\n> **Pro Tip:** Spend time reviewing the detailed curriculum modules and visiting physical laboratories before completing admissions. A well-equipped laboratory with automated analyzers is the hallmark of quality paramedical education.\n\n### Career Pathways and Hospital Integration\n\nGraduates who combine rigorous academic performance with dedicated hospital internship rotations are readily absorbed across multispecialty hospitals, specialized cardiac centers, and NABL-accredited diagnostic networks throughout Eastern India.`,
    featuredImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    imageAltText: "Healthcare technologists in laboratory discussion reviewing clinical diagnostic samples",
    authorId: "auth-1",
    authorName: "Dr. A. K. Banerjee",
    authorRole: "Academic Director & Senior Pathologist",
    authorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    category: "Paramedical Education",
    categorySlug: "paramedical-education",
    tags: ["Paramedical Careers", "DMLT", "Radiology", "Kolkata Healthcare"],
    publishedDate: "2024-03-12T10:00:00Z",
    modifiedDate: "2024-08-10T14:30:00Z",
    readingTime: "5 min read",
    featured: true,
    status: "published",
    relatedCourseSlug: "dmlt",
    relatedBlogSlugs: ["career-opportunities-after-dmlt", "role-of-dialysis-technicians-in-nephrology"],
    seoTitle: "How to Choose the Right Paramedical Course in Kolkata | CIHM Guide",
    metaDescription: "Comprehensive guide to choosing between DMLT, Radiology, Dialysis, and OT Technology courses in Kolkata. Learn eligibility, clinical exposure, and career scope.",
    focusKeyword: "paramedical course in Kolkata",
    secondaryKeywords: ["choose paramedical course", "DMLT vs radiology", "dialysis technician training", "CIHM Kolkata"],
    canonicalUrl: "https://cihm.in/blog/how-to-choose-the-right-paramedical-course",
    ogTitle: "Choosing the Right Paramedical Course in Kolkata: Comprehensive Guide",
    ogDescription: "Discover how to evaluate paramedical specializations, clinical hospital affiliations, and career pathways in modern healthcare.",
    ogImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    twitterTitle: "Paramedical Course Selection Guide | CIHM Kolkata",
    twitterDescription: "Explore DMLT, Radiology, Dialysis, and OT Technology pathways with clinical hospital training insights.",
    twitterImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Article",
    indexable: true,
    follow: true,
    breadcrumbTitle: "Choosing a Paramedical Course",
    views: 1420
  },
  {
    id: "blog-2",
    title: "Career Opportunities and Hospital Roles After DMLT: The Complete Outlook",
    slug: "career-opportunities-after-dmlt",
    excerpt: "Understand the expanding professional horizon for Medical Laboratory Technology graduates in pathology, biochemistry, microbiology, and blood banking.",
    content: `## The Core Value of Clinical Laboratory Diagnostics\n\nOver 70% of clinical decisions made by physicians rely upon diagnostic laboratory findings. From blood counts identifying acute infections to complex biochemical markers guiding oncological therapy, medical lab technologists produce the actionable data that drives clinical medicine.\n\n### Primary Departments in Modern Diagnostic Healthcare\n\nA DMLT graduate typically rotates and builds expertise across distinct clinical laboratories:\n\n* **Clinical Biochemistry**: Running automated multi-channel analyzers to quantify liver enzymes, renal markers, cardiac troponins, and metabolic profiles.\n* **Hematology & Hemostasis**: Conducting complete blood counts, evaluating peripheral blood morphology for leukemias and parasitic infections, and performing automated coagulation profiles.\n* **Medical Microbiology & Serology**: Culturing clinical specimens, performing antibiotic susceptibility testing (AST), and detecting viral markers via ELISA and chemiluminescence.\n* **Blood Banking & Immunohematology**: Determining ABO/Rh blood groups, screening for atypical antibodies, performing cross-matching, and preparing packed red cells and platelets.\n* **Histopathology & Cytopathology**: Assisting in gross tissue examination, operating microtomes for micro-thin tissue sections, and executing special cellular staining protocols.\n\n### Professional Progression for Laboratory Technologists\n\nGraduates begin their careers as Junior Laboratory Technologists or Phlebotomy Specialists, mastering calibration and daily quality control charts (Levy-Jennings charts). With clinical experience, technologists advance into:\n\n1. **Senior Medical Lab Technologist (SMLT)**: Overseeing departmental sections and validating test results against clinical limits.\n2. **Quality Assurance Officer**: Ensuring laboratory compliance with NABL (National Accreditation Board for Testing and Calibration Laboratories) ISO 15189 standards.\n3. **Laboratory Technical Supervisor**: Managing laboratory workflow, reagent inventory, equipment service schedules, and training new technicians.\n\n### Conclusion\n\nA diploma in medical laboratory technology from an institute emphasizing practical hospital exposure provides lasting career stability, professional respect, and continuous learning opportunities in healthcare.`,
    featuredImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    imageAltText: "Medical technologist operating microtome and automated laboratory equipment",
    authorId: "auth-2",
    authorName: "Prof. S. Sengupta",
    authorRole: "Head of Paramedical Sciences",
    authorAvatar: "https://images.unsplash.com/photo-1594824813684-60c7f7639f41?auto=format&fit=crop&w=200&q=80",
    category: "DMLT & Lab Sciences",
    categorySlug: "dmlt-lab-sciences",
    tags: ["DMLT", "Paramedical Careers", "Hospital Internships"],
    publishedDate: "2024-04-05T11:00:00Z",
    modifiedDate: "2024-08-14T09:00:00Z",
    readingTime: "6 min read",
    featured: true,
    status: "published",
    relatedCourseSlug: "dmlt",
    relatedBlogSlugs: ["how-to-choose-the-right-paramedical-course", "technological-advancements-in-radiology-imaging"],
    seoTitle: "Career Opportunities After DMLT | Hospital Roles & Growth | CIHM",
    metaDescription: "Discover career opportunities, hospital departments, and career growth for DMLT graduates. In-depth analysis of laboratory sciences by CIHM Kolkata.",
    focusKeyword: "career opportunities after DMLT",
    secondaryKeywords: ["DMLT job roles", "medical lab technology careers", "pathology technician scope", "CIHM DMLT"],
    canonicalUrl: "https://cihm.in/blog/career-opportunities-after-dmlt",
    ogTitle: "Career Horizons After DMLT: Hospital Roles & Growth Paths",
    ogDescription: "Explore where Medical Laboratory Technology leads in modern hospitals, diagnostic centers, and blood transfusion facilities.",
    ogImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    twitterTitle: "DMLT Career Opportunities | CIHM Kolkata",
    twitterDescription: "Detailed hospital roles and advancement pathways for clinical laboratory professionals.",
    twitterImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Article",
    indexable: true,
    follow: true,
    breadcrumbTitle: "Careers After DMLT",
    views: 1890
  },
  {
    id: "blog-3",
    title: "Clinical Importance of Dialysis Technicians in Modern Nephrology",
    slug: "role-of-dialysis-technicians-in-nephrology",
    excerpt: "Discover the specialized clinical skills, water treatment protocols, and compassionate care required in hospital hemodialysis departments.",
    content: `## The Lifesaving Role of Dialysis Care\n\nFor patients undergoing renal replacement therapy, the hemodialysis unit becomes a recurring sanctuary. Dialysis technicians represent the direct clinical professionals responsible for operating the complex extracorporeal circuit, ensuring vascular access viability, and maintaining strict water purity.\n\n### Core Competencies in Hemodialysis Operations\n\nOperating modern hemodialysis consoles requires deep technical discipline:\n\n* **Vascular Access Cannulation**: Safely assessing, preparing, and puncturing arteriovenous (AV) fistulas or grafts with sterile precision, avoiding aneurysms and hematomas.\n* **Extracorporeal Circuit Priming**: Flushing and degassing dialyzers with saline, ensuring all micro-air bubbles are eliminated before connecting to patient circulation.\n* **Intradialytic Vitals Monitoring**: Monitoring continuous blood pressure, transmembrane pressure (TMP), blood flow rates (Qb), and dialysate flow rates (Qd) to prevent sudden hypotension.\n* **RO Water Treatment Oversight**: Regularly inspecting reverse osmosis membranes, monitoring total dissolved solids (TDS), and performing chlorine residual testing to prevent fatal chemical hemolysis.\n\n### Multidisciplinary Collaboration\n\nDialysis technologists work closely alongside consultant nephrologists, renal dieticians, and clinical nurse specialists. Their alertness during a four-hour dialysis treatment directly influences patient comfort, dialysis clearance index (Kt/V), and long-term quality of life.`,
    featuredImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    imageAltText: "Dialysis operator adjusting clinical dialyzer machine console in hospital unit",
    authorId: "auth-3",
    authorName: "Dr. R. Mukherjee",
    authorRole: "Consultant Nephrologist & Visiting Faculty",
    authorAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80",
    category: "Dialysis & Nephrology",
    categorySlug: "dialysis-nephrology",
    tags: ["Dialysis", "Paramedical Careers", "Clinical Training"],
    publishedDate: "2024-05-18T10:00:00Z",
    modifiedDate: "2024-08-16T11:00:00Z",
    readingTime: "5 min read",
    featured: false,
    status: "published",
    relatedCourseSlug: "dialysis-operator",
    relatedBlogSlugs: ["how-to-choose-the-right-paramedical-course", "career-opportunities-after-dmlt"],
    seoTitle: "Role of Dialysis Technicians in Nephrology | CIHM Kolkata",
    metaDescription: "Learn about the crucial role of dialysis technicians in hospital nephrology units. Discover vascular access, hemodialysis operations, and patient care with CIHM.",
    focusKeyword: "role of dialysis technician",
    secondaryKeywords: ["dialysis technician training", "hemodialysis care", "nephrology paramedical", "CIHM dialysis"],
    canonicalUrl: "https://cihm.in/blog/role-of-dialysis-technicians-in-nephrology",
    ogTitle: "Dialysis Technicians in Modern Nephrology: Clinical Care & Practice",
    ogDescription: "A clinical look into hemodialysis machine operations, sterile protocols, and patient management.",
    ogImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    twitterTitle: "Dialysis Technician Role | CIHM Kolkata",
    twitterDescription: "Explore key skills and hospital responsibilities of certified dialysis technologists.",
    twitterImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Article",
    indexable: true,
    follow: true,
    breadcrumbTitle: "Dialysis in Nephrology",
    views: 1150
  },
  {
    id: "blog-4",
    title: "Technological Advancements in Radiology & Medical Imaging",
    slug: "technological-advancements-in-radiology-imaging",
    excerpt: "How digital computed radiography, multi-detector CT scanners, and PACS networks are transforming modern hospital diagnostic accuracy.",
    content: `## The Digital Transformation of Diagnostic Imaging\n\nFrom historical darkrooms and chemical developer tanks to modern digital detector arrays (Flat Panel Detectors), radiology has undergone a dramatic technological evolution. Today's radiographers are not merely camera operators; they are specialized imaging technologists managing digital signal conversion, radiation dose optimization, and image post-processing.\n\n### Innovations Driving Contemporary Radiography\n\n* **Direct Digital Radiography (DDR)**: Instantaneous image preview on digital monitors with reduced radiation dose compared to conventional film.\n* **Multi-Slice Helical Computed Tomography**: High-speed gantry rotations capturing volumetric anatomical cross-sections in seconds, essential for emergency acute stroke and polytrauma triage.\n* **PACS & DICOM Interoperability**: Picture Archiving and Communication Systems (PACS) allowing instant transmission of diagnostic studies to surgical theaters and intensive care units.\n* **Dose Reduction Algorithms**: Advanced iterative reconstruction algorithms delivering crisp diagnostic contrast with minimal radiation exposure to pediatric and vulnerable patients.\n\n### Educational Implications for Paramedical Trainees\n\nMastering these technologies requires hands-on familiarity with digital workstations, understanding contrast media kinetics, and practicing AERB (Atomic Energy Regulatory Board) radiation protection protocols daily.`,
    featuredImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    imageAltText: "Radiographer adjusting diagnostic imaging scanner in modern radiological suite",
    authorId: "auth-1",
    authorName: "Dr. A. K. Banerjee",
    authorRole: "Academic Director & Senior Pathologist",
    authorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    category: "Radiology & Imaging",
    categorySlug: "radiology-imaging",
    tags: ["Radiology", "Paramedical Careers", "Kolkata Healthcare"],
    publishedDate: "2024-06-20T10:00:00Z",
    modifiedDate: "2024-08-18T10:00:00Z",
    readingTime: "5 min read",
    featured: false,
    status: "published",
    relatedCourseSlug: "radiology-medical-imaging",
    relatedBlogSlugs: ["how-to-choose-the-right-paramedical-course", "career-opportunities-after-dmlt"],
    seoTitle: "Advancements in Radiology & Medical Imaging | CIHM Kolkata",
    metaDescription: "Explore advances in digital radiography, CT scanning, and PACS networks. Insights for healthcare radiology students from CIHM.",
    focusKeyword: "radiology medical imaging advancements",
    secondaryKeywords: ["digital radiography training", "CT scan technology", "paramedical radiology Kolkata", "CIHM imaging"],
    canonicalUrl: "https://cihm.in/blog/technological-advancements-in-radiology-imaging",
    ogTitle: "Technological Advancements in Radiology & Medical Imaging | CIHM",
    ogDescription: "Digital radiography, radiation dose reduction, and multi-slice CT scanning insights.",
    ogImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    twitterTitle: "Radiology Technology Insights | CIHM",
    twitterDescription: "How modern imaging technologies shape clinical healthcare training.",
    twitterImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Article",
    indexable: true,
    follow: true,
    breadcrumbTitle: "Radiology Advancements",
    views: 980
  }
];

export const initialPlacements: PlacementRecord[] = [
  {
    id: "plc-1",
    studentName: "Debabrata Mondal",
    courseName: "Diploma in Medical Laboratory Technology (DMLT)",
    courseSlug: "dmlt",
    passingYear: "2023",
    organization: "Apollo Multispecialty Hospitals, Kolkata",
    role: "Clinical Laboratory Technologist",
    department: "Clinical Biochemistry & Molecular Diagnostics",
    verified: true,
    studentImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    testimonialStory: "The rigorous laboratory drills and automated analyzer training at CIHM gave me complete confidence when stepping into Apollo's diagnostic department."
  },
  {
    id: "plc-2",
    studentName: "Priyanka Roy",
    courseName: "Diploma in Radiology & Medical Imaging Technology (DRMIT)",
    courseSlug: "radiology-medical-imaging",
    passingYear: "2023",
    organization: "Medica Superspecialty Hospital, Kolkata",
    role: "Radiological Technologist",
    department: "Radiology & Diagnostic Imaging",
    verified: true,
    studentImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    testimonialStory: "Working on live diagnostic positioning protocols and lead shielding during my hospital postings at CIHM prepared me directly for Medica's emergency imaging unit."
  },
  {
    id: "plc-3",
    studentName: "Sourav Ganguly",
    courseName: "Diploma in Dialysis Technology",
    courseSlug: "dialysis-operator",
    passingYear: "2023",
    organization: "Fortis Healthcare Kolkata",
    role: "Hemodialysis Operator",
    department: "Nephrology & Renal Replacement Therapy Unit",
    verified: true,
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    testimonialStory: "From machine priming to AV fistula cannulation, the faculty ensured we mastered every sterile protocol before handling active dialysis sessions."
  },
  {
    id: "plc-4",
    studentName: "Ananya Ghosh",
    courseName: "Diploma in Operation Theatre Technology (DOTT)",
    courseSlug: "operation-theatre-technology",
    passingYear: "2023",
    organization: "Woodlands Multispeciality Hospital, Kolkata",
    role: "OT Technologist",
    department: "Surgical Suites & CSSD Operations",
    verified: true,
    studentImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    testimonialStory: "My clinical posting in surgical asepsis gave me first-hand experience managing laparoscopic racks and anesthesia machines alongside senior surgeons."
  },
  {
    id: "plc-5",
    studentName: "Rohan Mukherjee",
    courseName: "Diploma in Critical Care & ICU Technology",
    courseSlug: "icu-technician",
    passingYear: "2023",
    organization: "AMRI Hospitals, Dhakuria, Kolkata",
    role: "Critical Care Technologist",
    department: "Medical Intensive Care Unit (MICU)",
    verified: true,
    studentImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    testimonialStory: "Ventilator circuit assembly, ABG analysis, and emergency resuscitation training helped me excel in AMRI's critical care team."
  },
  {
    id: "plc-6",
    studentName: "Mousumi Halder",
    courseName: "Diploma in Hospital Administration",
    courseSlug: "hospital-management",
    passingYear: "2023",
    organization: "Peerless Hospital & B.K. Roy Research Centre",
    role: "Patient Care Coordinator & Quality Associate",
    department: "Hospital Quality & Patient Relations",
    verified: true,
    studentImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    testimonialStory: "CIHM's in-depth focus on NABH documentation and HIMS workflows prepared me directly for patient operations leadership."
  }
];

export const initialPartnerHospitals: PartnerHospital[] = [
  {
    id: "hosp-1",
    name: "Apollo Multispecialty Hospitals, Kolkata",
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=200&q=80",
    type: "Super-Specialty Hospital (JCI & NABH)",
    location: "Canal Circular Road, Kadapara, Kolkata",
    moUYear: "2026–27",
    bedCapacity: "700+ Beds",
    hiringDepartments: ["DMLT Pathology", "Radiology & Imaging", "Dialysis Unit", "OT & Anesthesia", "Critical Care ICU"],
    active: true,
    order: 1
  },
  {
    id: "hosp-2",
    name: "Medica Superspecialty Hospital",
    logo: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=200&q=80",
    type: "NABH & NABL Tertiary Care Hospital",
    location: "Mukundapur, EM Bypass, Kolkata",
    moUYear: "2026–27",
    bedCapacity: "500+ Beds",
    hiringDepartments: ["Dialysis Care", "Cath Lab Diagnostics", "Medical Laboratory", "Emergency & Trauma"],
    active: true,
    order: 2
  },
  {
    id: "hosp-3",
    name: "Fortis Healthcare Kolkata",
    logo: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=200&q=80",
    type: "Multi-Speciality Healthcare Network",
    location: "Anandapur, EM Bypass, Kolkata",
    moUYear: "2026–27",
    bedCapacity: "400+ Beds",
    hiringDepartments: ["Radiology CT/MRI", "Operation Theatre", "Clinical Pathology"],
    active: true,
    order: 3
  },
  {
    id: "hosp-4",
    name: "AMRI Hospitals (Manipal Health)",
    logo: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&q=80",
    type: "Tertiary Multi-Specialty Centre",
    location: "Dhakuria, Salt Lake & Mukundapur",
    moUYear: "2026–27",
    bedCapacity: "1000+ Group Beds",
    hiringDepartments: ["Critical Care ICU", "Biochemistry Labs", "Radiology Workstations"],
    active: true,
    order: 4
  },
  {
    id: "hosp-5",
    name: "Woodlands Multispeciality Hospital",
    logo: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=200&q=80",
    type: "Historic Premier Tertiary Hospital",
    location: "Alipore, Kolkata",
    moUYear: "2026–27",
    bedCapacity: "250+ Beds",
    hiringDepartments: ["DMLT Hematology", "Invasive Cardiology", "Nephrology & Dialysis"],
    active: true,
    order: 5
  },
  {
    id: "hosp-6",
    name: "Peerless Hospital & Research Centre",
    logo: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=200&q=80",
    type: "Academic & Clinical Medical Centre",
    location: "Panchasayar, Kolkata",
    moUYear: "2026–27",
    bedCapacity: "400+ Beds",
    hiringDepartments: ["Hospital Administration", "Dialysis Operator", "Clinical Pathology"],
    active: true,
    order: 6
  },
  {
    id: "hosp-7",
    name: "Ruby General Hospital",
    logo: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=200&q=80",
    type: "NABH Multispecialty & Trauma Hospital",
    location: "Kasba Golpark, EM Bypass, Kolkata",
    moUYear: "2026–27",
    bedCapacity: "300+ Beds",
    hiringDepartments: ["Emergency OT", "Radiology", "Pathology Technologists"],
    active: true,
    order: 7
  },
  {
    id: "hosp-8",
    name: "Belle Vue Clinic",
    logo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    type: "Premier Multi-Speciality Diagnostic Clinic",
    location: "Loudon Street, Elgin, Kolkata",
    moUYear: "2026–27",
    bedCapacity: "350+ Beds",
    hiringDepartments: ["Advanced Diagnostics", "Dialysis Care", "Endoscopy & OT"],
    active: true,
    order: 8
  }
];

export const initialTopStudents: TopStudent[] = [
  {
    id: "top-1",
    studentName: "Debabrata Mondal",
    courseName: "DMLT",
    achievement: "Gold Medalist - Clinical Biochemistry & Diagnostic Pathology",
    year: "2023",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    description: "Demonstrated 100% accuracy in automated diagnostic profiling and published student research on hematological coagulation parameters.",
    badge: "Institute Academic Topper"
  },
  {
    id: "top-2",
    studentName: "Priyanka Roy",
    courseName: "DRMIT",
    achievement: "Clinical Excellence Award in Computed Tomography Protocols",
    year: "2023",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    description: "Recognized by hospital partner clinicians for outstanding radiographic positioning accuracy and radiation safety management.",
    badge: "Clinical Excellence"
  },
  {
    id: "top-3",
    studentName: "Sourav Ganguly",
    courseName: "Dialysis Technology",
    achievement: "Best Clinical Intern in Hemodialysis Care",
    year: "2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    description: "Completed over 400 supervised bedside dialysis sessions with zero sterile breach incidents across his hospital internship.",
    badge: "Nephro-Care Honor"
  }
];

export const initialCareerPaths: CareerPath[] = [
  {
    id: "cp-dmlt",
    courseSlug: "dmlt",
    courseName: "Medical Laboratory Technology (DMLT)",
    overview: "Structured academic and clinical journey progressing from foundational laboratory sciences to diagnostic leadership and quality direction.",
    stages: [
      {
        id: "stg-1",
        stageName: "Enrolled Paramedical Student",
        stageCode: "student",
        order: 1,
        durationRange: "Year 1 - Semester 1 & 2",
        description: "Building bedrock proficiency in human anatomy, clinical physiology, chemical reagents, sterilization techniques, and basic diagnostic equipment.",
        keyCompetencies: ["Bio-safety Level Protocols", "Laboratory Glassware Sterilization", "Microscopy & Cell Identification", "Basic Reagent Preparation"],
        clinicalMilestones: ["Sterile phlebotomy laboratory check", "First clean Gram stain demonstration"],
        certifications: ["Basic First Aid & Bio-safety Certification"],
        prospectiveRoles: ["Student Diagnostic Intern"]
      },
      {
        id: "stg-2",
        stageName: "Academic Foundation & Analyzer Mastery",
        stageCode: "foundation",
        order: 2,
        durationRange: "Year 2 - Semester 3",
        description: "Mastering automated clinical biochemistry analyzers, complete blood cell counters, spectrophotometers, and blood banking cross-matches.",
        keyCompetencies: ["Automated Analyzer Calibration", "Cross-Matching Protocols", "Histopathology Tissue Embedding", "Microbiology Culture Streak Plating"],
        clinicalMilestones: ["Independent operation of 3-part cell counter", "Biochemical QC validation"],
        certifications: ["Automated Laboratory Instrumentation Certificate"],
        prospectiveRoles: ["Junior Diagnostic Assistant"]
      },
      {
        id: "stg-3",
        stageName: "Practical Hospital Training & Rotations",
        stageCode: "practical",
        order: 3,
        durationRange: "Year 2 - Semester 4",
        description: "Live hospital departmental postings under consultant pathologists across hematology, biochemistry, and microbiology wards.",
        keyCompetencies: ["Live Patient Phlebotomy", "Emergency Stat Sample Processing", "Antibiogram Sensitivity Interpretation", "Critical Limit Notification"],
        clinicalMilestones: ["500+ successful venous blood draws", "Zero-contamination blood culture processing"],
        certifications: ["Hospital Infection Control & Waste Handling"],
        prospectiveRoles: ["Rotational Hospital Intern"]
      },
      {
        id: "stg-4",
        stageName: "Certified Hospital Internship",
        stageCode: "clinical",
        order: 4,
        durationRange: "Months 19 - 24",
        description: "Full-time immersive hospital clinical internship rotating across tertiary hospital diagnostic centers and blood banks.",
        keyCompetencies: ["Full Shift Diagnostic Management", "Inter-Departmental Reporting", "Troubleshooting Instrument Flags", "Blood Component Separation"],
        clinicalMilestones: ["Completion of 6-month clinical logbook signed by chief pathologist"],
        certifications: ["Hospital Internship Completion Certificate"],
        prospectiveRoles: ["Trainee Medical Laboratory Technologist"]
      },
      {
        id: "stg-5",
        stageName: "Entry Healthcare Professional",
        stageCode: "entry",
        order: 5,
        durationRange: "Year 1 - 2 Post-Graduation",
        description: "Appointed as certified Medical Laboratory Technologist in multispecialty hospitals, diagnostic pathology chains, or research centers.",
        keyCompetencies: ["Independent Routine Diagnostic Execution", "Daily L-J Quality Chart Maintenance", "Patient Diagnostic Counseling Support", "Inventory Reagent Tracking"],
        clinicalMilestones: ["Solo night-duty diagnostic readiness certification"],
        certifications: ["State Paramedical Council Registration"],
        prospectiveRoles: ["Medical Lab Technologist (MLT)", "Biochemistry Technician"]
      },
      {
        id: "stg-6",
        stageName: "Experienced Clinical Specialist",
        stageCode: "experienced",
        order: 6,
        durationRange: "Year 3 - 5",
        description: "Specialized focus in advanced diagnostic areas like molecular diagnostics (PCR), flow cytometry, or advanced immunohematology.",
        keyCompetencies: ["Molecular Assay Execution (RT-PCR)", "Flow Cytometry Gating Assistance", "Audit Preparation for NABL / CAP", "Junior Technician Mentorship"],
        clinicalMilestones: ["Departmental NABL audit participation"],
        certifications: ["Advanced Molecular Diagnostics Certification"],
        prospectiveRoles: ["Senior Laboratory Technologist", "Molecular Diagnostics Associate"]
      },
      {
        id: "stg-7",
        stageName: "Diagnostic Specialist & Section Lead",
        stageCode: "specialist",
        order: 7,
        durationRange: "Year 5 - 8",
        description: "Heading specific hospital diagnostic wings (e.g., Blood Transfusion Services, Automated Clinical Chemistry).",
        keyCompetencies: ["Laboratory Information System (LIS) Administration", "Quality System Internal Audit Lead", "Vendor Reagent Validation Trials", "Standard Operating Procedure (SOP) Authoring"],
        clinicalMilestones: ["Lead technical author of departmental SOPs"],
        certifications: ["Internal Auditor Training - ISO 15189"],
        prospectiveRoles: ["Technical Section Supervisor", "Blood Bank Officer"]
      },
      {
        id: "stg-8",
        stageName: "Senior Healthcare & Quality Leadership",
        stageCode: "leadership",
        order: 8,
        durationRange: "Year 8+",
        description: "Directing overall hospital laboratory operations, overseeing multiple regional diagnostic facilities, or leading institutional academic programs.",
        keyCompetencies: ["Strategic Diagnostic Operations", "Accreditation Management (NABL / NABH / JCI)", "Capital Equipment Procurement Analysis", "Clinical Research Coordination"],
        clinicalMilestones: ["Successful institutional hospital accreditation compliance"],
        certifications: ["Healthcare Quality Management Fellowship"],
        prospectiveRoles: ["Laboratory Operations Manager", "Chief Technical Officer", "Academic Program Director"]
      }
    ]
  }
];

export const initialFellowships: Fellowship[] = [
  {
    id: "fel-1",
    slug: "advanced-clinical-pathology",
    title: "Post-Diploma Fellowship in Advanced Clinical Pathology & Quality Assurance",
    duration: "1 Year Full-Time",
    department: "Pathology & Laboratory Medicine",
    description: "Intensive post-diploma fellowship for ambitious laboratory technologists seeking deep clinical mastery in automated biochemistry, flow cytometry, and ISO 15189 accreditation compliance.",
    eligibility: "Completed DMLT or B.Sc in Medical Laboratory Technology from a recognized institution.",
    trainingHospital: "Affiliated Multispecialty Tertiary Teaching Hospitals, Kolkata",
    clinicalHighlights: [
      "Extensive training on advanced chemiluminescence & molecular PCR platforms",
      "Hands-on NABL ISO 15189 internal quality auditing & calibration protocols",
      "Supervised rotational postings in tertiary hospital trauma diagnostics",
      "Dedicated clinical research project and seminar presentation"
    ],
    status: "published",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fel-2",
    slug: "hemodialysis-clinical-management",
    title: "Clinical Fellowship in Advanced Hemodialysis & CRRT Operations",
    duration: "1 Year Full-Time",
    department: "Nephrology & Renal Replacement Therapy",
    description: "Specialized fellowship focusing on Continuous Renal Replacement Therapy (CRRT), nocturnal hemodialysis protocols, complex vascular access monitoring, and intensive nephro-care.",
    eligibility: "Completed Diploma in Dialysis Technology or B.Sc Renal Dialysis with clinical rotation experience.",
    trainingHospital: "Leading Nephrology Institutes & Tertiary Renal Care Centers, Kolkata",
    clinicalHighlights: [
      "Advanced CRRT machine setup, filtration monitoring & priming in ICUs",
      "Bedside ultrasound assessment of AV fistula blood flow velocities",
      "Peritoneal dialysis catheter care and cycler programming",
      "Clinical complication management drills under senior nephrologists"
    ],
    status: "published",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialEvents: EventItem[] = [
  {
    id: "evt-1",
    slug: "healthcare-careers-conclave-2024",
    title: "Kolkata Paramedical & Healthcare Careers Conclave",
    category: "Career & Industry Seminar",
    description: "Annual healthcare career symposium featuring senior medical directors, hospital administrators, and diagnostic leaders exploring modern career prospects in paramedical sciences.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    date: "2024-10-15",
    startTime: "10:00 AM",
    endTime: "04:30 PM",
    venue: "Main Auditorium, CIHM Campus, Kolkata",
    registrationUrl: "/contact",
    speaker: "Dr. A. K. Banerjee & Guest Hospital Superintendents",
    status: "upcoming",
    seoTitle: "Kolkata Paramedical Careers Conclave | CIHM Campus Event",
    metaDescription: "Join the annual Paramedical & Healthcare Careers Conclave at CIHM Kolkata. Network with hospital directors, explore career roadmaps and clinical training."
  },
  {
    id: "evt-2",
    slug: "world-health-day-clinical-workshop",
    title: "Clinical Hands-On Workshop: Infection Control & Hospital Asepsis",
    category: "Clinical Workshop",
    description: "Intensive practical simulation workshop for paramedical students covering hospital infection control bundles, biomedical waste rules, and sterile scrub protocols.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    date: "2024-11-08",
    startTime: "11:00 AM",
    endTime: "03:00 PM",
    venue: "Central Skills Simulation Lab, CIHM Campus",
    registrationUrl: "/contact",
    speaker: "Prof. S. Sengupta & Nursing Superintendents",
    status: "upcoming",
    seoTitle: "Infection Control & Hospital Asepsis Workshop | CIHM Kolkata",
    metaDescription: "Hands-on clinical workshop at CIHM Kolkata focusing on sterile supply protocols, bio-safety, and patient safety in multispecialty hospitals."
  }
];

export const initialAnnouncements: AnnouncementItem[] = [
  {
    id: "ann-1",
    title: "Admissions Open for New Academic Session – Paramedical Programs",
    category: "Admissions",
    content: "Applications are actively invited for the upcoming batch in DMLT, Radiology & Medical Imaging, Dialysis Technology, and Operation Theatre Technology. Candidates can register online or visit the campus admission desk.",
    publishDate: "2024-08-01T09:00:00Z",
    priority: "high",
    status: "published"
  },
  {
    id: "ann-2",
    title: "Hospital Clinical Internship Rotations Schedule Announced",
    category: "Clinical",
    content: "Final semester students in DMLT and Dialysis Technology are advised to verify their hospital clinical posting schedules displayed on the departmental notice board.",
    publishDate: "2024-08-10T10:00:00Z",
    priority: "normal",
    status: "published"
  },
  {
    id: "ann-3",
    title: "Academic Seminar on Recent Updates in Hematological Quality Control",
    category: "Academic",
    content: "Department of Medical Laboratory Technology will host a special lecture on automated quality control calibration on Saturday at 11:00 AM.",
    publishDate: "2024-08-18T11:00:00Z",
    priority: "normal",
    status: "published"
  }
];

export const initialFaculty: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Dr. A. K. Banerjee",
    designation: "Academic Director & Senior Pathologist",
    department: "Pathology & Diagnostic Sciences",
    qualification: "MBBS, MD (Pathology)",
    bio: "Over 22 years of clinical pathology and diagnostic leadership. Former consultant pathologist at prestigious teaching hospitals in Kolkata.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    experience: "22+ Years in Medical Education & Diagnostics"
  },
  {
    id: "fac-2",
    name: "Prof. S. Sengupta",
    designation: "Head of Paramedical Sciences",
    department: "Clinical Biochemistry & Lab Sciences",
    qualification: "M.Sc (Medical Biochemistry), Ph.D",
    bio: "Specialist in automated clinical chemistry, quality assurance, and laboratory management with numerous published research contributions.",
    image: "https://images.unsplash.com/photo-1594824813684-60c7f7639f41?auto=format&fit=crop&w=400&q=80",
    experience: "18+ Years in Allied Health Sciences"
  },
  {
    id: "fac-3",
    name: "Dr. R. Mukherjee",
    designation: "Consultant Nephrologist & Visiting Faculty",
    department: "Renal Sciences & Dialysis Technology",
    qualification: "MBBS, MD, DM (Nephrology)",
    bio: "Senior consultant nephrologist guiding dialysis clinical curriculum, vascular access training, and intensive dialysis operations.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    experience: "16+ Years in Nephrology & Hemodialysis"
  },
  {
    id: "fac-4",
    name: "M. Chakraborty",
    designation: "Chief Radiographer & Technical Instructor",
    department: "Radiology & Medical Imaging",
    qualification: "B.Sc Medical Imaging, AERB Certified RSO",
    bio: "Certified Radiological Safety Officer with deep clinical expertise across multi-slice CT, digital fluoroscopy, and trauma imaging.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    experience: "14+ Years in Hospital Radiodiagnostics"
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "What makes CIHM's paramedical courses career-oriented?",
    answer: "CIHM combines in-depth theoretical curriculum with extensive campus laboratory simulations and structured clinical hospital internships in Kolkata's leading multispecialty hospitals. Students work on automated diagnostic instruments, developing verified practical competence.",
    category: "Global",
    order: 1
  },
  {
    id: "faq-2",
    question: "What are the eligibility requirements for admission to DMLT and Radiology?",
    answer: "Candidates must have successfully completed Higher Secondary (10+2) or equivalent examination with Science subjects (Physics, Chemistry, and Biology/Mathematics) from any recognized academic board.",
    category: "Admissions",
    order: 2
  },
  {
    id: "faq-3",
    question: "Are clinical hospital postings included within the course duration?",
    answer: "Yes. All diploma programs incorporate mandatory rotational hospital postings and dedicated internships supervised by hospital consultants and clinical staff.",
    category: "Clinical",
    order: 3
  },
  {
    id: "faq-4",
    question: "How does the placement support system operate at CIHM?",
    answer: "CIHM's dedicated placement coordination team liaises with multispecialty healthcare facilities, diagnostic laboratory chains, and medical institutions to organize on-campus interviews, resume preparation, and verified appointment facilitation.",
    category: "Career",
    order: 4
  }
];

export const initialReviews: ReviewItem[] = [
  // Former Students & Alumni Success Stories
  {
    id: "rev-alumni-1",
    source: "verified_testimonial",
    type: "student",
    reviewerName: "Debabrata Mondal",
    reviewerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    courseOrDepartment: "Diploma in Medical Laboratory Technology (DMLT)",
    roleOrDesignation: "Clinical Laboratory Technologist",
    organization: "Apollo Multispecialty Hospitals, Kolkata",
    date: "2024-03-12",
    reviewText: "The rigorous laboratory drills on automated biochemistry analyzers at CIHM gave me unmatched confidence. During campus recruitment, my practical knowledge of NABL quality control and sample preparation directly led to my appointment at Apollo Multispecialty Hospitals.",
    response: "Proud of your clinical dedication Debabrata! You represent the diagnostic excellence of CIHM.",
    status: "approved",
    featured: true
  },
  {
    id: "rev-alumni-2",
    source: "verified_testimonial",
    type: "student",
    reviewerName: "Priyanka Roy",
    reviewerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    courseOrDepartment: "Diploma in Radiology & Medical Imaging (DRMIT)",
    roleOrDesignation: "Senior Radiographer",
    organization: "Medica Superspecialty Hospital, Kolkata",
    date: "2024-04-18",
    reviewText: "Working on digital CT protocols and AERB radiation protection guidelines during our hospital postings at CIHM made my transition to hospital emergency trauma imaging seamless. The faculty treated every diagnostic case study with academic rigor.",
    response: "Congratulations Priyanka on your continued growth in diagnostic radiology at Medica.",
    status: "approved",
    featured: true
  },
  {
    id: "rev-alumni-3",
    source: "verified_testimonial",
    type: "student",
    reviewerName: "Sourav Ganguly",
    reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    courseOrDepartment: "Diploma in Dialysis Technology",
    roleOrDesignation: "Hemodialysis Technologist",
    organization: "Fortis Healthcare Kolkata",
    date: "2024-05-02",
    reviewText: "From dialyzer machine priming to managing difficult AV fistula vascular access, CIHM ensured we mastered every sterile protocol before handling active clinical shifts. I now manage critical ICU hemodialysis patients with absolute confidence.",
    response: "Exemplary patient dedication, Sourav! Fortis is fortunate to have your clinical vigilance.",
    status: "approved",
    featured: true
  },
  {
    id: "rev-alumni-4",
    source: "verified_testimonial",
    type: "student",
    reviewerName: "Ananya Ghosh",
    reviewerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    courseOrDepartment: "Diploma in Operation Theatre Technology (DOTT)",
    roleOrDesignation: "Lead OT Technologist",
    organization: "Woodlands Multispeciality Hospital, Kolkata",
    date: "2024-06-10",
    reviewText: "CIHM's simulated OT laboratory and clinical postings taught me surgical asepsis, laparoscopic instrument setup, and anesthesia workstation calibration. Operating alongside senior surgeons at Woodlands felt natural from my very first week.",
    response: "Remarkable leadership in surgical technology, Ananya!",
    status: "approved",
    featured: true
  },
  {
    id: "rev-alumni-5",
    source: "verified_testimonial",
    type: "student",
    reviewerName: "Rohan Mukherjee",
    reviewerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    courseOrDepartment: "Diploma in Critical Care & ICU Technology",
    roleOrDesignation: "Critical Care Specialist",
    organization: "AMRI Hospitals, Kolkata",
    date: "2024-07-04",
    reviewText: "Ventilator circuit assembly, zeroing arterial pressure transducers, and crash cart code-blue drills were part of our daily routine at CIHM. That rigorous training made me an asset in AMRI's Medical Intensive Care Unit.",
    status: "approved",
    featured: true
  },
  {
    id: "rev-alumni-6",
    source: "verified_testimonial",
    type: "student",
    reviewerName: "Mousumi Halder",
    reviewerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    courseOrDepartment: "Diploma in Hospital Administration",
    roleOrDesignation: "Patient Care Coordinator & Quality Lead",
    organization: "Peerless Hospital & B.K. Roy Research Centre",
    date: "2024-07-28",
    reviewText: "The curriculum's deep focus on NABH accreditation benchmarks, Hospital Information Management Systems (HIMS), and patient grievance resolution provided the exact managerial toolkit needed for hospital floor coordination.",
    status: "approved",
    featured: true
  },
  // Healthcare Industry Partners & Hospital Directors
  {
    id: "rev-partner-1",
    source: "industry_partner",
    type: "partner",
    reviewerName: "Dr. Arindam Mukherjee",
    reviewerAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    roleOrDesignation: "Head of Laboratory Medicine & Senior Pathologist",
    organization: "Apollo Multispecialty Hospitals, Kolkata",
    date: "2024-05-14",
    reviewText: "CIHM paramedical graduates who join our pathology diagnostic departments consistently exhibit outstanding sterile technique, proficiency with automated chemistry analyzers, and strong clinical ethics. CIHM is one of our most trusted academic recruitment partners.",
    partnerLogo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=120&q=80",
    status: "approved",
    featured: true
  },
  {
    id: "rev-partner-2",
    source: "industry_partner",
    type: "partner",
    reviewerName: "Somnath Roy",
    reviewerAvatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    roleOrDesignation: "General Manager - Human Resources",
    organization: "Medica Superspecialty Hospital, Kolkata",
    date: "2024-06-22",
    reviewText: "We prioritize CIHM paramedical candidates during annual hospital recruitment drives. Because of their mandatory rotational hospital postings, CIHM students require almost zero onboarding lag and integrate seamlessly into our radiology and OT departments.",
    partnerLogo: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=120&q=80",
    status: "approved",
    featured: true
  },
  {
    id: "rev-partner-3",
    source: "industry_partner",
    type: "partner",
    reviewerName: "Dr. Nandita Sen",
    reviewerAvatar: "https://images.unsplash.com/photo-1594824813684-60c7f7639f41?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    roleOrDesignation: "Chief Consultant Nephrologist & Renal Transplant Lead",
    organization: "Fortis Healthcare Kolkata",
    date: "2024-07-15",
    reviewText: "The dialysis technologists from CIHM demonstrate thorough knowledge of dialyzer clearance kinetics, heparin titration, and patient-first emergency reflexes. Their training reflects real-world clinical nephrology standards.",
    partnerLogo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=120&q=80",
    status: "approved",
    featured: true
  },
  {
    id: "rev-partner-4",
    source: "industry_partner",
    type: "partner",
    reviewerName: "Rajesh Banerjee",
    reviewerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    roleOrDesignation: "Vice President - Hospital Operations",
    organization: "Woodlands Multispeciality Hospital, Kolkata",
    date: "2024-08-05",
    reviewText: "CIHM's curriculum produces allied healthcare professionals who are disciplined, clinically confident, and ready for high-pressure tertiary hospital environments. Their graduates have been exemplary in our surgical suites and ICU wards.",
    partnerLogo: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=120&q=80",
    status: "approved",
    featured: true
  },
  // Google Business Verified Reviews
  {
    id: "rev-google-1",
    source: "google_business",
    type: "student",
    reviewerName: "Subhashis Roy",
    reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    rating: 5,
    reviewText: "CIHM provides excellent practical lab facilities. The faculty members are very supportive and the hospital internship postings gave me real diagnostic exposure in pathology and biochemistry.",
    date: "2024-02-20",
    courseOrDepartment: "DMLT Batch Graduate",
    response: "Thank you Subhashis! We wish you continued success in your clinical diagnostic career.",
    status: "approved",
    featured: true
  },
  {
    id: "rev-google-2",
    source: "google_business",
    type: "student",
    reviewerName: "Tanima Dasgupta",
    reviewerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    rating: 5,
    reviewText: "The Dialysis Technology course is very well structured. Practical machine priming and clinical nephro-care sessions helped me understand patient handling thoroughly.",
    date: "2024-03-15",
    courseOrDepartment: "Dialysis Technology Graduate",
    response: "Thank you Tanima. Your dedication to patient care is commendable.",
    status: "approved",
    featured: true
  }
];

export const initialReviewSettings: ReviewSettings = {
  displayMode: "both",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJd77-k1m9AjoRk5N5qX6X_6I",
  googlePlaceId: "ChIJd77-k1m9AjoRk5N5qX6X_6I",
  googleRating: 4.9,
  googleReviewCount: 148,
  sectionTitle: "Student & Alumni Reviews",
  sectionSubtitle: "Verified feedback from healthcare professionals trained at Central Institute of Healthcare & Management",
  enabled: true
};

export const initialCommunityTopics: CommunityTopic[] = [
  {
    id: "topic-1",
    title: "Best practices for avoiding hemolysis in automated clinical biochemistry samples",
    category: "DMLT & Lab Sciences",
    content: "When drawing samples for potassium and LDH testing, what needle gauges and transport protocols have proven most reliable in reducing in-vitro hemolysis during emergency ward postings?",
    authorName: "Arghya Sen",
    authorRole: "DMLT Final Year Student",
    createdAt: "2024-08-01T14:20:00Z",
    repliesCount: 3,
    likesCount: 12,
    viewsCount: 145,
    reported: false,
    status: "active"
  },
  {
    id: "topic-2",
    title: "Understanding AERB lead shielding thicknesses in mobile trauma X-ray units",
    category: "Radiology",
    content: "Let's review the required lead equivalent thickness for mobile protective barriers when shooting bedside radiographs in intensive care units without dedicated lead walls.",
    authorName: "Debjit Karmakar",
    authorRole: "DRMIT Student",
    createdAt: "2024-08-05T11:00:00Z",
    repliesCount: 2,
    likesCount: 8,
    viewsCount: 98,
    reported: false,
    status: "active"
  }
];

export const initialCommunityReplies: CommunityReply[] = [
  {
    id: "rep-1",
    topicId: "topic-1",
    authorName: "Prof. S. Sengupta",
    authorRole: "Faculty - Paramedical Sciences",
    content: "Always avoid drawing through existing IV lines if possible, release the tourniquet prior to tube vacuum filling, and invert gel separator tubes gently 5-8 times without vigorous shaking.",
    createdAt: "2024-08-01T16:00:00Z",
    likesCount: 7
  },
  {
    id: "rep-2",
    topicId: "topic-1",
    authorName: "Debabrata Mondal",
    authorRole: "Alumnus - Apollo Hospitals",
    content: "Also ensure samples don't sit in direct sunlight or warm courier bags during transit between outpatient collection centers and the central lab.",
    createdAt: "2024-08-02T09:30:00Z",
    likesCount: 4
  }
];

export const initialStudyRooms: StudyRoom[] = [
  {
    id: "room-dmlt",
    name: "DMLT Clinical Discussion & Case Studies",
    courseSlug: "dmlt",
    description: "Collaborative study room for biochemistry profiles, hematology smears, and microbiology culture reviews.",
    activeUsersCount: 14
  },
  {
    id: "room-radiology",
    name: "Radiology & Imaging Protocols Room",
    courseSlug: "radiology-medical-imaging",
    description: "Discussing radiographic projections, CT cross-sections, and radiation dosimetry questions.",
    activeUsersCount: 9
  },
  {
    id: "room-dialysis",
    name: "Nephro-Care & Dialysis Study Lounge",
    courseSlug: "dialysis-operator",
    description: "Reviewing hemodialysis machine safety alarms, RO water maintenance, and vascular access care.",
    activeUsersCount: 7
  }
];

export const initialStudyMessages: StudyMessage[] = [
  {
    id: "msg-1",
    roomId: "room-dmlt",
    senderName: "Debabrata Mondal",
    senderRole: "Alumnus / Moderator",
    content: "Welcome everyone! Today we are reviewing peripheral blood smear differential counts for atypical lymphocytes.",
    timestamp: "10:30 AM"
  },
  {
    id: "msg-2",
    roomId: "room-dmlt",
    senderName: "Priyanka Roy",
    senderRole: "Student",
    content: "Could someone recap the Leishman stain timing for optimal nuclear chromatin clarity?",
    timestamp: "10:35 AM"
  },
  {
    id: "msg-3",
    roomId: "room-dmlt",
    senderName: "Prof. S. Sengupta",
    senderRole: "Faculty",
    content: "Apply undiluted stain for 2 minutes to fix, followed by double volume of buffered water (pH 6.8) for 8-10 minutes. Wash gently until a pinkish-purple film forms.",
    timestamp: "10:38 AM"
  }
];

export const initialStudyNotes: StudyNote[] = [
  {
    id: "note-1",
    roomId: "room-dmlt",
    title: "Key Biochemical Reference Ranges & Critical Values Summary",
    content: "Serum Sodium: 135-145 mEq/L (Critical <120 or >160). Potassium: 3.5-5.0 mEq/L (Critical <2.8 or >6.2). Fasting Glucose: 70-100 mg/dL.",
    authorName: "Prof. S. Sengupta",
    date: "2024-08-10"
  },
  {
    id: "note-2",
    roomId: "room-radiology",
    title: "10 Golden Rules of Radiation Safety (ALARA Principles)",
    content: "1. Always maintain maximum safe distance (Inverse Square Law). 2. Minimize exposure time. 3. Utilize lead aprons (0.5mm Pb equivalent). 4. Ensure collimation matches Region of Interest.",
    authorName: "M. Chakraborty",
    date: "2024-08-12"
  }
];

export const initialMedia: MediaAsset[] = [
  {
    id: "med-1",
    name: "cihm-clinical-laboratory-station.jpg",
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    altText: "Clinical diagnostic laboratory with automated analyzers at CIHM",
    category: "Laboratory",
    sizeKb: 245,
    dimensions: "1200x800",
    createdAt: "2024-01-10T10:00:00Z"
  },
  {
    id: "med-2",
    name: "cihm-radiology-imaging-console.jpg",
    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    altText: "Medical imaging console and diagnostic radiographer workstation",
    category: "Courses",
    sizeKb: 310,
    dimensions: "1200x800",
    createdAt: "2024-01-12T10:00:00Z"
  },
  {
    id: "med-3",
    name: "cihm-dialysis-clinical-care.jpg",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    altText: "Hemodialysis unit station and clinical dialyzer setup",
    category: "Laboratory",
    sizeKb: 280,
    dimensions: "1200x800",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "med-4",
    name: "cihm-campus-seminar-hall.jpg",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    altText: "CIHM Kolkata modern classroom and seminar academic hall",
    category: "Campus",
    sizeKb: 340,
    dimensions: "1200x800",
    createdAt: "2024-01-20T10:00:00Z"
  }
];

export const initialRedirects: RedirectRule[] = [
  {
    id: "red-1",
    fromPath: "/courses/medical-lab-technology",
    toPath: "/courses/dmlt",
    statusCode: 301,
    enabled: true
  },
  {
    id: "red-2",
    fromPath: "/courses/x-ray-technician",
    toPath: "/courses/radiology-medical-imaging",
    statusCode: 301,
    enabled: true
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    user: "admin@cihm.in",
    action: "SYSTEM_INITIALIZE",
    entity: "System",
    entityId: "system",
    details: "CIHM digital institutional platform initialized with verified academic programs, SEO architecture, and blog CMS.",
    timestamp: "2024-08-01T09:00:00Z"
  },
  {
    id: "log-2",
    user: "editor@cihm.in",
    action: "BLOG_PUBLISHED",
    entity: "Blog",
    entityId: "blog-1",
    details: "Published blog article: 'How to Choose the Right Paramedical Course in Kolkata'.",
    timestamp: "2024-08-10T14:30:00Z"
  }
];
