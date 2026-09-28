import React, { useState, useEffect } from 'react';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { NextGenHomeView } from '../components/NextGenHomeView.js';
import { CollegeProjectModal } from '../components/CollegeProjectModal.js';
import {
  Course,
  HeroSlide,
  PartnerHospital,
  PlacementRecord,
  ReviewItem,
  ReviewSettings
} from '../types.js';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (courseName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenEnquiry }) => {
  // College Project Dossier / Viva Modal
  const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [placements, setPlacements] = useState<PlacementRecord[]>([]);
  const [partnerHospitals, setPartnerHospitals] = useState<PartnerHospital[]>([]);
  const [reviewsData, setReviewsData] = useState<{ settings: ReviewSettings; reviews: ReviewItem[] } | null>(null);

  useEffect(() => {
    // Fetch home page data
    fetch('/api/courses').then(r => r.json()).then(d => d.success && setCourses(d.data)).catch(() => {});
    fetch('/api/hero-slides').then(r => r.json()).then(d => d.success && setHeroSlides(d.data)).catch(() => {});
    fetch('/api/placements').then(r => r.json()).then(d => d.success && setPlacements(d.data.slice(0, 6))).catch(() => {});
    fetch('/api/partner-hospitals').then(r => r.json()).then(d => d.success && setPartnerHospitals(d.data)).catch(() => {});
    fetch('/api/reviews').then(r => r.json()).then(d => d.success && setReviewsData(d.data)).catch(() => {});
  }, []);

  // Organization Schema.org JSON-LD
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: 'Central Institute of Healthcare & Management (CIHM)',
    alternateName: ['CIHM Kolkata', 'Top Paramedical College Kolkata', 'Central Institute of Healthcare and Management'],
    url: 'https://cihm.in',
    logo: 'https://cihm.in/favicon.svg',
    description: 'Premier paramedical and healthcare educational institute in Kolkata offering certified practical hospital clinical training.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Salt Lake Sector V / EM Bypass Corridor',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700091',
      addressCountry: 'IN'
    },
    telephone: '+91-91470-70624',
    email: 'admissions@cihm.in',
    sameAs: [
      'https://facebook.com/cihmkolkata',
      'https://linkedin.com/company/cihm-kolkata',
      'https://youtube.com/@cihmkolkata'
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 pb-16 selection:bg-blue-200 selection:text-blue-900">
      <SEOHelmet
        title="Top Paramedical College in Kolkata | CIHM Healthcare Institute"
        description="Central Institute of Healthcare & Management (CIHM) is Kolkata's top-ranked paramedical college for DMLT, Radiology, Dialysis, OT Technology & Hospital Management. 100% practical hospital clinical training & guaranteed placement assistance."
        canonical="https://cihm.in/"
        schemaData={orgSchema}
      />

      {/* Luminous White Dedicated Medical Campus Experience with Vivid Sliding Background Images */}
      <NextGenHomeView
        courses={courses}
        heroSlides={heroSlides}
        partnerHospitals={partnerHospitals}
        placements={placements}
        reviewsData={reviewsData}
        onNavigate={onNavigate}
        onOpenEnquiry={onOpenEnquiry}
        onOpenCollegeProjectModal={() => setIsCollegeModalOpen(true)}
      />

      {/* College Project Dossier & Viva Modal */}
      <CollegeProjectModal
        isOpen={isCollegeModalOpen}
        onClose={() => setIsCollegeModalOpen(false)}
      />
    </div>
  );
};
