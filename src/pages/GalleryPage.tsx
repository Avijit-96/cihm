import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import {
  Image as ImageIcon,
  Sparkles,
  Filter,
  Eye,
  X,
  ExternalLink,
  GraduationCap,
  Building2,
  Microscope,
  Stethoscope
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  tag: string;
}

export const GalleryPage: React.FC<{
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}> = ({ onNavigate, onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Advanced Pathology & Clinical Biochemistry Lab',
      category: 'Diagnostic Labs',
      tag: 'DMLT Practical',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      caption: 'Students performing biochemical blood assays, centrifuge balancing, and automated hematology testing.'
    },
    {
      id: 'g-2',
      title: 'High-Frequency Digital X-Ray & Radiography Suite',
      category: 'Radiology Suite',
      tag: 'X-Ray Tech',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
      caption: 'Radiography trainees practicing patient positioning on bucky tables and radiation shielding compliance.'
    },
    {
      id: 'g-3',
      title: 'Hemodialysis Unit & Reverse Osmosis Plant',
      category: 'Dialysis Units',
      tag: 'Dialysis Technology',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
      caption: 'Dialyzer priming, extracorporeal blood line assembly, and RO water purification testing.'
    },
    {
      id: 'g-4',
      title: 'Operation Theatre & Surgical Sterilization Wing',
      category: 'Surgical & OT',
      tag: 'OT Technician',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
      caption: 'Live operating theatre scrub drills, instrument tray arrangement, and laparoscopic tower setup.'
    },
    {
      id: 'g-5',
      title: 'Critical Care ICU Ventilator & Multipara Monitoring',
      category: 'Critical Care',
      tag: 'ICU Technician',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
      caption: 'Hands-on mechanical ventilator circuit assembly, arterial line transducer calibration, and ABG analysis.'
    },
    {
      id: 'g-6',
      title: 'Phlebotomy & Venous Blood Sample Station',
      category: 'Diagnostic Labs',
      tag: 'Blood Collection',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
      caption: 'Venipuncture order of draw practice using vacutainer tubes and aseptic skin preparation.'
    },
    {
      id: 'g-7',
      title: 'Physiotherapy & Rehabilitation Gymnasium',
      category: 'Rehabilitation',
      tag: 'Physiotherapy',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Therapeutic electrotherapy ultrasound probes, TENS stimulators, and gait mobility rehabilitation training.'
    },
    {
      id: 'g-8',
      title: 'UK Online Fellowship Academic Review & Case Conference',
      category: 'Fellowships',
      tag: 'Virtued London UK',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      caption: 'Interactive virtual clinical case presentations and international faculty mentoring sessions.'
    },
    {
      id: 'g-9',
      title: 'Hospital Clinical Internship Rotations at Multispecialty Partner',
      category: 'Hospital Postings',
      tag: 'Hospital Internship',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      caption: 'CIHM students participating in supervised hospital ward rounds, diagnostic pathology counters, and emergency triage.'
    }
  ];

  const categories = ['All', 'Diagnostic Labs', 'Radiology Suite', 'Dialysis Units', 'Surgical & OT', 'Critical Care', 'Rehabilitation', 'Fellowships', 'Hospital Postings'];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <SEOHelmet
        title="Campus & Clinical Training Gallery | CIHM Central Institute of Healthcare & Management"
        description="Explore photos of CIHM Kolkata's diagnostic laboratories, digital X-ray suites, dialysis units, live surgical operating theatres, and clinical hospital rotations."
        canonical="https://cihm.in/gallery"
      />

      <Breadcrumbs items={[{ label: 'Institutional Gallery' }]} />

      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            Visual Tour
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252991] tracking-tight mt-3">
            Campus Infrastructure & Clinical Laboratories
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Take an inside look at Eastern India's benchmark paramedical and healthcare training facilities. Explore our advanced pathology testing labs, radiology consoles, hemodialysis machinery, and hospital internship environments.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-6 border-t border-slate-100 mt-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#252991] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  <Eye className="w-3.5 h-3.5" /> View Photo
                </span>
              </div>
              <span className="absolute top-3 left-3 bg-[#252991]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                {item.tag}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#252991] text-base group-hover:text-[#00A54F] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 mt-3 block">
                Category: {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative aspect-16/10 bg-slate-900">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-3 py-1 rounded-lg">
                  {lightboxItem.tag} • {lightboxItem.category}
                </span>
                <button
                  onClick={() => {
                    setLightboxItem(null);
                    onOpenEnquiry();
                  }}
                  className="px-4 py-2 bg-[#252991] hover:bg-[#FF822F] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Schedule Campus Visit
                </button>
              </div>
              <h2 className="text-xl font-black text-[#252991]">{lightboxItem.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{lightboxItem.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Campus Visit Banner */}
      <div className="bg-gradient-to-r from-[#171a53] to-[#252991] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-black">Experience CIHM Labs in Person</h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            Visit our DumDum campus to tour our high-tech laboratories, interact with senior clinical faculty, and learn about upcoming batch admissions.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="tel:+919073737888"
            className="px-5 py-3 rounded-xl bg-white text-[#252991] font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors"
          >
            Call: +91-9073737888
          </a>
          <button
            onClick={() => onOpenEnquiry()}
            className="px-5 py-3 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};
