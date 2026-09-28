-- ============================================================================
-- CIHM Kolkata - Central Institute of Healthcare & Management
-- CodeIgniter 4 (CI4) Database Schema & Initial Seed Data
-- Compatible with MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+, and PostgreSQL
-- ============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. Table: hero_slides (Mirror Glass & Cover Photography)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `hero_slides`;
CREATE TABLE `hero_slides` (
  `id` varchar(64) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `subheadline` varchar(255) DEFAULT NULL,
  `year` varchar(32) DEFAULT '2026–27',
  `badgeColor` varchar(32) DEFAULT '#00A54F',
  `blockColor` varchar(32) DEFAULT '#00A54F',
  `cardTheme` varchar(32) DEFAULT 'mirror',
  `description` text,
  `image` text NOT NULL,
  `altText` varchar(255) DEFAULT NULL,
  `ctaText` varchar(64) DEFAULT 'Explore Course',
  `ctaUrl` varchar(255) DEFAULT '/courses',
  `secondaryCtaText` varchar(64) DEFAULT 'Apply Online',
  `secondaryCtaUrl` varchar(255) DEFAULT '/contact',
  `order` int(11) DEFAULT 1,
  `enabled` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Hero Slides
INSERT INTO `hero_slides` (`id`, `headline`, `subheadline`, `year`, `badgeColor`, `blockColor`, `cardTheme`, `description`, `image`, `order`, `enabled`) VALUES
('hero-slide-1', 'Diploma in Medical Laboratory Technology (DMLT)', 'Clinical Pathology & Diagnostic Lab Sciences', '2026–27', '#00A54F', '#00A54F', 'mirror', 'Hands-on diagnostic drills with automated biochemistry analyzers, micro-pipetting, hematology counters, and NABL-grade blood sample testing.', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80', 1, 1),
('hero-slide-2', 'Radiology & Medical Imaging Technology (DRMIT)', 'Digital X-Ray, CT Scan & Ultrasonography Workstations', '2026–27', '#2E328D', '#2E328D', 'navy', 'Master patient positioning, digital radiography controls, cross-sectional CT protocols, and AERB radiation protection in active hospital radiology suites.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80', 2, 1),
('hero-slide-3', 'Diploma in Dialysis Technology & Renal Care', 'Bedside Hemodialysis & Dialyzer Priming Training', '2026–27', '#0284C7', '#0284C7', 'ocean', 'Master dialyzer clearance kinetics, AV fistula cannulation, RO water treatment, and emergency dialysis management under senior consultant nephrologists.', 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80', 3, 1),
('hero-slide-4', 'Operation Theatre & Anesthesia Technology (DOTT)', 'Surgical Asepsis, Laparoscopy & Anesthesia Workstations', '2026–27', '#059669', '#059669', 'emerald', 'Sterile theatre preparation, laparoscopic instrument handling, multi-parameter vital monitoring, and code-blue emergency assistance inside surgical suites.', 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80', 4, 1),
('hero-slide-5', 'Critical Care & ICU Technology Training', 'Mechanical Ventilator Circuits & Hemodynamic Monitoring', '2026–27', '#DC2626', '#DC2626', 'crimson', 'Invasive hemodynamic pressure zeroing, arterial blood gas sampling support, precision infusion pump setup, and ICU code-blue resuscitation protocols.', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80', 5, 1),
('hero-slide-6', '1-Year Online Fellowship Courses (London) 2026–27', 'Virtued Eduversity (UK) – East India Center: CIHM DumDum', '2026–27', '#F59E0B', '#F59E0B', 'amber', '16 Specialized International Online Fellowships in Cardiology, Critical Care, Diabetology & Emergency Medicine for Doctors & Healthcare Professionals. Limited Offer: ₹59,000.', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80', 6, 1);

-- -------------------------------------------------------------
-- 2. Table: partner_hospitals (Clinical Rotations & Logos)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `partner_hospitals`;
CREATE TABLE `partner_hospitals` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` text NOT NULL,
  `type` varchar(128) DEFAULT 'Multispecialty Hospital',
  `location` varchar(255) DEFAULT 'Kolkata, WB',
  `moUYear` varchar(32) DEFAULT '2026–27',
  `bedCapacity` varchar(32) DEFAULT '500',
  `active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `partner_hospitals` (`id`, `name`, `logo`, `type`, `location`, `moUYear`, `bedCapacity`, `active`) VALUES
('hosp-apollo', 'Apollo Multispecialty Hospitals', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=160&q=80', 'Multispecialty Tertiary Care', 'EM Bypass / Salt Lake, Kolkata', '2026–27', '700', 1),
('hosp-fortis', 'Fortis Hospital Kolkata', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=160&q=80', 'Super Specialty Hospital', 'Anandapur / EM Bypass, Kolkata', '2026–27', '400', 1),
('hosp-medica', 'Medica Superspecialty Hospital', 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=160&q=80', 'Superspecialty Hospital & Cardiac Hub', 'Mukundapur, Kolkata', '2026–27', '500', 1),
('hosp-amri', 'AMRI Hospitals (Manipal Group)', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=160&q=80', 'Multispecialty Tertiary Care', 'Dhakuria & Salt Lake, Kolkata', '2026–27', '650', 1),
('hosp-woodlands', 'Woodlands Multispeciality Hospital', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=160&q=80', 'Heritage Multispecialty Hospital', 'Alipore, Kolkata', '2026–27', '350', 1),
('hosp-peerless', 'Peerless Hospital & B.K. Roy Research Center', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=160&q=80', 'Super Specialty & Diagnostic Research', 'Panchasayar, Kolkata', '2026–27', '450', 1),
('hosp-ruby', 'Ruby General Hospital', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=160&q=80', 'Pioneering Multispecialty Hospital', 'Kasba Golpark, Kolkata', '2026–27', '300', 1);

-- -------------------------------------------------------------
-- 3. Table: placements (Pass Out Students & Placement Records)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `placements`;
CREATE TABLE `placements` (
  `id` varchar(64) NOT NULL,
  `studentName` varchar(255) NOT NULL,
  `studentImage` text,
  `courseName` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `hospitalName` varchar(255) NOT NULL,
  `hospitalLogo` text,
  `role` varchar(128) NOT NULL,
  `batchYear` varchar(32) DEFAULT '2026',
  `salaryPackage` varchar(64) DEFAULT '₹3.6 LPA',
  `testimonial` text,
  `verified` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `placements` (`id`, `studentName`, `studentImage`, `courseName`, `organization`, `hospitalName`, `hospitalLogo`, `role`, `batchYear`, `salaryPackage`, `testimonial`, `verified`) VALUES
('plc-1', 'Sreya Mukherjee', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', 'Diploma in Medical Laboratory Technology (DMLT)', 'Apollo Multispecialty Hospitals', 'Apollo Multispecialty Hospitals', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=160&q=80', 'Senior Lab Technologist', '2026', '₹3.8 LPA', 'The practical hematology drills at CIHM prepared me for Apollo\'s high volume central laboratory from day one.', 1),
('plc-2', 'Anirban Das', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 'Diploma in Radiography & Medical Imaging', 'Fortis Hospital Kolkata', 'Fortis Hospital Kolkata', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=160&q=80', 'CT Scan Technologist', '2026', '₹4.2 LPA', 'Trained on 128-slice CT scan consoles during CIHM rotations. Fortis recruited me before final semester results.', 1),
('plc-3', 'Priyanka Ghosh', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', 'Diploma in Dialysis Technology', 'Medica Superspecialty Hospital', 'Medica Superspecialty Hospital', 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=160&q=80', 'Dialysis Station In-Charge', '2025', '₹3.6 LPA', 'Dialysis priming and emergency cannulation protocols practiced at CIHM were identical to Medica\'s standards.', 1);

-- -------------------------------------------------------------
-- 4. Table: enquiries (Admissions CRM)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `enquiries`;
CREATE TABLE `enquiries` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(64) NOT NULL,
  `courseOfInterest` varchar(255) DEFAULT NULL,
  `message` text,
  `qualification` varchar(128) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `status` varchar(32) DEFAULT 'new',
  `notes` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
