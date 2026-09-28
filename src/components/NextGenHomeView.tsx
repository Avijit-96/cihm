import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Course,
  HeroSlide,
  PartnerHospital,
  PlacementRecord,
  ReviewItem,
  ReviewSettings,
  FacilityItem,
  StudentAchievement,
  StudentFeedItem
} from '../types.js';
import { DemoClassesModal } from './DemoClassesModal.js';
import {
  Sparkles,
  Zap,
  Hospital,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Stethoscope,
  HeartPulse,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar,
  X,
  FileText,
  GraduationCap,
  Download,
  Building2,
  BookOpen,
  Bell,
  Maximize2,
  FileCheck,
  ExternalLink,
  ShieldCheck,
  Camera,
  Image as ImageIcon,
  Play,
  Pause,
  Star,
  Film,
  Award,
  Trophy,
  ThumbsUp,
  Share2,
  Send,
  Users,
  Check,
  Clock
} from 'lucide-react';

interface NextGenHomeViewProps {
  courses: Course[];
  heroSlides?: HeroSlide[];
  partnerHospitals: PartnerHospital[];
  placements: PlacementRecord[];
  reviewsData: { settings: ReviewSettings; reviews: ReviewItem[] } | null;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (courseName?: string) => void;
  onOpenCollegeProjectModal?: () => void;
}

export const NextGenHomeView: React.FC<NextGenHomeViewProps> = ({
  courses,
  heroSlides,
  partnerHospitals,
  placements,
  reviewsData,
  onNavigate,
  onOpenEnquiry,
  onOpenCollegeProjectModal
}) => {
  // 🖼️ Combine highlighted newly launched courses with uploaded images, admin hero slides, and clinical photography
  const allSlides = useMemo(() => {
    const list: Array<{
      id: string;
      image: string;
      title: string;
      department: string;
      badge: string;
      badgeColor?: string;
      caption?: string;
      ctaText?: string;
      ctaUrl?: string;
      isNewLaunch?: boolean;
      batchYear?: string;
    }> = [];

    // 1. Priority #1: Highlighted & newly launched courses with images (High Visibility!)
    const highlightedNewCourses = courses.filter((c) => (c.highlighted === true || c.isNewLaunch === true) && c.image);
    highlightedNewCourses.forEach((c, idx) => {
      list.push({
        id: `course-slide-${c.id || idx}`,
        image: c.image,
        title: c.name,
        department: c.category,
        badge: '⭐ NEW COURSE LAUNCH 2026–27',
        badgeColor: c.accentColor || '#00A54F',
        caption: c.shortDescription || c.overview,
        ctaText: `Explore ${c.shortCode || 'Course'} Syllabus`,
        ctaUrl: `/courses/${c.slug}`,
        isNewLaunch: true,
        batchYear: c.batchYear || '2026–27'
      });
    });

    // 2. Priority #2: Enabled hero slides from database / admin dashboard
    if (heroSlides && heroSlides.length > 0) {
      heroSlides
        .filter((s) => s.enabled !== false)
        .forEach((s) => {
          if (!list.some((item) => item.title === s.headline)) {
            list.push({
              id: s.id,
              image: s.image,
              title: s.headline,
              department: s.subheadline,
              badge: s.year ? `SESSION ${s.year}` : 'CIHM Clinical Workstation',
              badgeColor: s.badgeColor || '#2E328D',
              caption: s.description,
              ctaText: s.ctaText || 'Explore Program',
              ctaUrl: s.ctaUrl || '/courses',
              isNewLaunch: false,
              batchYear: s.year || '2026–27'
            });
          }
        });
    }

    // 3. Fallback hospital workstation photography (always ensures bright, full-bleed clinical visuals)
    const defaultHospitalSlides = [
      {
        id: 'slide-workstation-1',
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1600&q=85',
        title: 'Automated Pathology & Biochemistry Analyzer Suite',
        department: 'Department of Medical Laboratory Technology (DMLT)',
        badge: 'NABL Diagnostic Standard',
        badgeColor: '#00A54F',
        caption: 'Students running 5-part automated cell counters, microtomy & clinical biochemistry assays',
        ctaText: 'Explore DMLT Program',
        ctaUrl: '/courses/dmlt'
      },
      {
        id: 'slide-workstation-2',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=85',
        title: 'Digital Radiography (DR) & CT Scanner Suite',
        department: 'Radiology & Imaging Technology (DRIT)',
        badge: 'AERB Radiation Safety Compliant',
        badgeColor: '#2E328D',
        caption: 'Digital X-Ray consoles, CT scanning & PACS cross-sectional imaging',
        ctaText: 'View Radiology Course',
        ctaUrl: '/courses/radiology-medical-imaging'
      },
      {
        id: 'slide-workstation-3',
        image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1600&q=85',
        title: 'Bedside Hemodialysis & Dialyzer Priming Bay',
        department: 'Dialysis & Renal Care Technology',
        badge: 'Nephrology Clinical Wing',
        badgeColor: '#0284C7',
        caption: 'Extracorporeal blood circuit priming, AV fistula cannulation & dialysate balancing',
        ctaText: 'View Dialysis Syllabus',
        ctaUrl: '/courses/dialysis-operator'
      },
      {
        id: 'slide-workstation-4',
        image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=85',
        title: 'Sterile Surgical Operation Theatre & Laparoscopy Bay',
        department: 'Operation Theatre Technology (DOTT)',
        badge: 'Modular Surgical OT',
        badgeColor: '#059669',
        caption: 'Laparoscopy camera towers, surgical asepsis, electrocautery & patient positioning',
        ctaText: 'Explore OT Technology',
        ctaUrl: '/courses/ot-technician'
      },
      {
        id: 'slide-workstation-5',
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=85',
        title: 'Intensive Critical Care & Life Support Ward',
        department: 'ICU & Emergency Technology',
        badge: 'Tertiary Hospital ICU',
        badgeColor: '#DC2626',
        caption: 'Mechanical ventilators, multi-parameter vital telemetry & emergency resuscitation',
        ctaText: 'View ICU Course',
        ctaUrl: '/courses/icu-technician'
      }
    ];

    defaultHospitalSlides.forEach((dh) => {
      if (!list.some((item) => item.title === dh.title)) {
        list.push(dh);
      }
    });

    return list;
  }, [courses, heroSlides]);

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Preload all slide images into browser cache immediately for zero-delay rendering
  useEffect(() => {
    allSlides.forEach((slide) => {
      if (slide.image) {
        const img = new Image();
        img.src = slide.image;
      }
    });
  }, [allSlides]);

  // Robust smooth autoplay timer (5 seconds) with real-time progress bar
  useEffect(() => {
    if (isSlidePaused || allSlides.length <= 1) return;

    const DURATION = 5000; // 5.0s per slide
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setSlideProgress(pct);

      if (elapsed >= DURATION) {
        setCurrentSlideIdx((prev) => (prev + 1) % allSlides.length);
        setSlideProgress(0);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentSlideIdx, isSlidePaused, allSlides.length]);

  const handlePrevSlide = () => {
    setCurrentSlideIdx((prev) => (prev === 0 ? allSlides.length - 1 : prev - 1));
    setSlideProgress(0);
  };

  const handleNextSlide = () => {
    setCurrentSlideIdx((prev) => (prev + 1) % allSlides.length);
    setSlideProgress(0);
  };

  const handleSelectSlide = (idx: number) => {
    setCurrentSlideIdx(idx);
    setSlideProgress(0);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 40) handleNextSlide();
    if (diff < -40) handlePrevSlide();
    touchStartX.current = null;
  };

  // Simulated Live ECG BPM Counter
  const [liveBpm, setLiveBpm] = useState(74);

  // Highlighted new launch courses for hero spotlight
  const [heroHighlightIdx, setHeroHighlightIdx] = useState(0);
  const highlightedCourses = useMemo(
    () => courses.filter((c) => (c.highlighted === true || c.isNewLaunch === true) && c.image),
    [courses]
  );
  const currentHeroCourse =
    highlightedCourses[heroHighlightIdx % (highlightedCourses.length || 1)] || highlightedCourses[0];

  // Interactive Course Explorer Filter
  const [activeCourseCategory, setActiveCourseCategory] = useState<string>('all');

  // Interactive Kolkata Clinical Hospital Zone selector
  const [activeKolkataZone, setActiveKolkataZone] = useState<'all' | 'em-bypass' | 'salt-lake' | 'south' | 'north'>('all');

  // Syllabus Modal Preview Drawer state
  const [syllabusModalCourse, setSyllabusModalCourse] = useState<Course | null>(null);

  // College Photo Collage Filter & Active Preview
  const [activeCollageFilter, setActiveCollageFilter] = useState<'all' | 'labs' | 'hospital' | 'campus' | 'convocation'>('all');
  const [selectedCollagePhoto, setSelectedCollagePhoto] = useState<{
    id: string;
    title: string;
    category: string;
    image: string;
    dept: string;
    description: string;
  } | null>(null);

  // College Notice Modal State
  const [selectedNotice, setSelectedNotice] = useState<{
    id: string;
    tag: string;
    tagColor: string;
    title: string;
    date: string;
    desc: string;
    actionText: string;
  } | null>(null);

  // Download Prospectus Feedback Toast
  const [downloadToast, setDownloadToast] = useState(false);

  // Dynamic heart rate pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBpm(72 + Math.floor(Math.random() * 6));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadProspectus = () => {
    setDownloadToast(true);
    setTimeout(() => {
      setDownloadToast(false);
    }, 4000);
  };

  // Facilities state & active lab filter
  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [activeFacilityCategory, setActiveFacilityCategory] = useState<string>('all');
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  // Demo Classes Video modal launcher state
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoModalInitialVideoId, setDemoModalInitialVideoId] = useState<string | undefined>(undefined);

  // Student Achievements & Live Campus Feed state
  const [studentAchievements, setStudentAchievements] = useState<StudentAchievement[]>([]);
  const [studentFeed, setStudentFeed] = useState<StudentFeedItem[]>([]);
  const [feedCategory, setFeedCategory] = useState<string>('all');
  const [feedPostModalOpen, setFeedPostModalOpen] = useState(false);
  const [newPostAuthor, setNewPostAuthor] = useState('');
  const [newPostRole, setNewPostRole] = useState('DMLT Batch 2024');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'achievement' | 'clinical_posting' | 'lab_session' | 'campus_life' | 'placement'>('lab_session');
  const [newPostBadge, setNewPostBadge] = useState('Practical Session');
  const [submittingPost, setSubmittingPost] = useState(false);
  const [likedFeedIds, setLikedFeedIds] = useState<Record<string, boolean>>({});

  // Fetch facilities, student achievements, and live student feed
  useEffect(() => {
    fetch('/api/facilities')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setFacilities(data.data);
          setSelectedFacility(data.data[0]);
        }
      })
      .catch(() => {});

    fetch('/api/student-achievements')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setStudentAchievements(data.data);
        }
      })
      .catch(() => {});

    fetch('/api/student-feed')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setStudentFeed(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleOpenDemoVideo = (videoId?: string) => {
    setDemoModalInitialVideoId(videoId);
    setDemoModalOpen(true);
  };

  const handleLikePost = async (postId: string) => {
    if (likedFeedIds[postId]) return;
    setLikedFeedIds((prev) => ({ ...prev, [postId]: true }));
    setStudentFeed((prev) =>
      prev.map((item) => (item.id === postId ? { ...item, likes: (item.likes || 0) + 1 } : item))
    );
    try {
      await fetch(`/api/student-feed/${postId}/like`, { method: 'POST' });
    } catch {
      // optimistic update retained
    }
  };

  const handleSubmitFeedPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostAuthor.trim() || !newPostContent.trim()) return;
    setSubmittingPost(true);
    try {
      const res = await fetch('/api/student-feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: newPostAuthor.trim(),
          authorRole: newPostRole.trim() || 'CIHM Student',
          content: newPostContent.trim(),
          category: newPostCategory,
          badge: newPostBadge.trim() || 'Student Story'
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setStudentFeed((prev) => [data.data, ...prev]);
        setNewPostContent('');
        setFeedPostModalOpen(false);
      }
    } catch {
      // handled
    } finally {
      setSubmittingPost(false);
    }
  };

  // Filter courses for Home Page: ONLY courses marked as highlighted (or new launch) are shown on the Home page
  // Non-highlighted courses are normally shown on the dedicated Courses page (/courses)
  // Fallback: If no courses are marked highlighted yet, fallback to top 8 courses so the page is never blank
  const homeEligibleCourses = highlightedCourses.length > 0 ? highlightedCourses : courses.slice(0, 8);

  const filteredCourses = homeEligibleCourses.filter((c) => {
    if (activeCourseCategory === 'all') return true;
    if (activeCourseCategory === 'pathology') {
      return c.category.toLowerCase().includes('pathology') || c.category.toLowerCase().includes('lab') || c.name.toLowerCase().includes('dmlt') || c.name.toLowerCase().includes('blood');
    }
    if (activeCourseCategory === 'imaging') {
      return c.category.toLowerCase().includes('imaging') || c.name.toLowerCase().includes('xray') || c.name.toLowerCase().includes('radiology') || c.name.toLowerCase().includes('ecg');
    }
    if (activeCourseCategory === 'critical') {
      return c.category.toLowerCase().includes('critical') || c.name.toLowerCase().includes('ot') || c.name.toLowerCase().includes('dialysis') || c.name.toLowerCase().includes('icu') || c.name.toLowerCase().includes('anesthesia');
    }
    if (activeCourseCategory === 'fellowships') {
      return c.name.toLowerCase().includes('fellowship') || c.category.toLowerCase().includes('fellowship');
    }
    return true;
  });

  // Kolkata Clinical Zones
  const kolkataZones = [
    {
      id: 'all',
      name: 'All Clinical Zones',
      beds: '4,500+ Beds',
      desc: 'Citywide Practical Training Network'
    },
    {
      id: 'em-bypass',
      name: 'EM Bypass Corridor',
      beds: '2,200+ Beds',
      desc: 'Specialized Diagnostic Units & ICUs'
    },
    {
      id: 'salt-lake',
      name: 'Salt Lake Healthcare City',
      beds: '1,100+ Beds',
      desc: 'Pathology & Molecular Diagnostic Hub'
    },
    {
      id: 'south',
      name: 'South Kolkata Clinical Centre',
      beds: '850+ Beds',
      desc: 'Cardiology, Dialysis & Critical Care'
    },
    {
      id: 'north',
      name: 'North Kolkata & Dum Dum Hub',
      beds: 'CIHM Main Academic Campus',
      desc: 'Central Diagnostic & Practical Labs'
    }
  ];

  const filteredHospitalsByZone = partnerHospitals.filter((h) => {
    if (activeKolkataZone === 'all') return true;
    const loc = (h.location || '').toLowerCase();
    if (activeKolkataZone === 'em-bypass') return loc.includes('bypass') || loc.includes('mukundapur');
    if (activeKolkataZone === 'salt-lake') return loc.includes('salt lake') || loc.includes('sector');
    if (activeKolkataZone === 'south') return loc.includes('alipore') || loc.includes('south');
    if (activeKolkataZone === 'north') return loc.includes('dum') || loc.includes('vip') || loc.includes('north');
    return true;
  });

  // College Photo Collage Items
  const collagePhotos = [
    {
      id: 'c1',
      title: 'Automated Hematology & Cell Counter Practical',
      category: 'labs',
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
      dept: 'Department of Pathology (DMLT)',
      description: 'Second-year students calibrating a 5-part differential blood analyzer and running complete blood counts (CBC).'
    },
    {
      id: 'c2',
      title: 'Sterile Surgical Scrub & OT Laparoscopy Setup',
      category: 'labs',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
      dept: 'Operation Theatre Technology (DOTT)',
      description: 'Students practicing sterile gowning, autoclave validation, and laparoscopy tower cabling under senior surgeon guidance.'
    },
    {
      id: 'c3',
      title: 'Bedside Clinical Rounds at Woodlands Multispecialty',
      category: 'hospital',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      dept: 'Clinical Hospital Internship',
      description: 'Trainees conducting bedside patient vital assessments and ECG telemetry during morning ICU rounds.'
    },
    {
      id: 'c4',
      title: 'Digital DR X-Ray Console Positioning Practical',
      category: 'labs',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      dept: 'Radiology & Imaging Technology (DRIT)',
      description: 'Learning radiation shielding, beam collimation, and PACS image processing in the college radiography bay.'
    },
    {
      id: 'c5',
      title: 'Hemodialysis Priming & Fistula Cannulation Drill',
      category: 'hospital',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      dept: 'Dialysis Technology Unit',
      description: 'Real-time extracorporeal circuit priming, dialysate balance testing, and patient dialysis monitoring.'
    },
    {
      id: 'c6',
      title: 'Annual College Cultural Fest "MEDFEST 2026"',
      category: 'campus',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
      dept: 'Student Council & Campus Life',
      description: 'Annual inter-college healthcare cultural fest featuring music, theatre, inter-paramedical quiz, and alumni awards.'
    },
    {
      id: 'c7',
      title: 'Annual Convocation & White Coat Induction',
      category: 'convocation',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      dept: 'Academic Council CIHM',
      description: 'Graduating technologist batch taking the Paramedical Professional Oath and receiving their hospital placement certificates.'
    },
    {
      id: 'c8',
      title: 'Community Health Camp & Blood Grouping Drive',
      category: 'campus',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
      dept: 'Social Outreach & Phlebotomy Wing',
      description: 'CIHM students screening over 450 local residents for blood sugar, hemoglobin, and blood grouping in Dum Dum.'
    }
  ];

  const filteredCollage = collagePhotos.filter(p => activeCollageFilter === 'all' || p.category === activeCollageFilter);

  // College Notices
  const collegeNotices = [
    {
      id: 'n1',
      tag: 'ADMISSION ALERT',
      tagColor: 'bg-emerald-600 text-white',
      title: 'Batch 2026–2027 Practical Seat Allocation Open',
      date: 'Sept 2026',
      desc: 'Counseling and seat verification for DMLT, Radiology, Dialysis, and OT courses underway. 65% practical hospital rotation batches are now being allocated.',
      actionText: 'Apply Now'
    },
    {
      id: 'n2',
      tag: 'EXAMINATION CIRCULAR',
      tagColor: 'bg-blue-600 text-white',
      title: 'Final Year Practical Lab Viva & Logbook Submission',
      date: 'Oct 2026',
      desc: 'All 2nd year students must submit their certified clinical hospital rotation logbooks signed by hospital unit heads prior to practical vivas.',
      actionText: 'View Schedule'
    },
    {
      id: 'n3',
      tag: 'HOSPITAL POSTING',
      tagColor: 'bg-teal-600 text-white',
      title: 'Clinical Rotations at Woodlands & AMRI Hospitals',
      date: 'Oct 15, 2026',
      desc: 'Dialysis and OT technician trainees are assigned to 3-month rotating hospital shifts in acute care and dialysis bays.',
      actionText: 'View Roster'
    },
    {
      id: 'n4',
      tag: 'COLLEGE FEST',
      tagColor: 'bg-indigo-600 text-white',
      title: 'Inter-College Healthcare Fest "MEDFEST 2026"',
      date: 'Nov 2026',
      desc: 'Participate in scientific poster presentation, emergency clinical simulation drills, and annual cultural competitions.',
      actionText: 'Register'
    }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 overflow-hidden bg-slate-50/50">
      {/* ========================================================================= */}
      {/* 🚀 1. HERO SECTION: FULL-BLEED VIVID SLIDING HOSPITAL IMAGES (100% VISIBLE) */}
      {/* ========================================================================= */}
      <section 
        className="relative w-full overflow-hidden bg-slate-950 min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex flex-col justify-between select-none group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="CIHM Hospital Workstation & Clinical Diagnostics Carousel"
      >
        {/* ------------------------------------------------------------- */}
        {/* 1. CRYSTAL-CLEAR FULL-BLEED SLIDING BACKGROUND IMAGES */}
        {/* ------------------------------------------------------------- */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {allSlides.map((slide, idx) => {
            const isActive = idx === currentSlideIdx;
            return (
              <div 
                key={slide.id || idx} 
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
                aria-hidden={!isActive}
              >
                {/* 100% Sharp, vivid, bright hospital & lab photography - ZERO BLUR, ZERO OBSCURING VEIL */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1600&q=85';
                  }}
                  className={`w-full h-full object-cover object-center filter brightness-105 contrast-105 transition-transform duration-7000 ease-out ${
                    isActive ? 'scale-104' : 'scale-100'
                  }`}
                />
                
                {/* Transparent cinematic edge lighting - 100% of the hospital image stays fully visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/25 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent hidden lg:block pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. DIRECT SIDE NAVIGATION CHEVRONS (SMOOTH CAROUSEL CONTROLS) */}
        {/* ------------------------------------------------------------- */}
        <button
          onClick={handlePrevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer pointer-events-auto border border-slate-200 hover:scale-105"
        >
          <ChevronLeft className="w-7 h-7 text-[#1E3A8A]" />
        </button>

        <button
          onClick={handleNextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-2xl flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer pointer-events-auto border border-slate-200 hover:scale-105"
        >
          <ChevronRight className="w-7 h-7 text-[#1E3A8A]" />
        </button>

        {/* ------------------------------------------------------------- */}
        {/* 3. TOP LIVE STATUS BAR & ECG TELEMETRY */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-slate-200 text-xs font-bold text-slate-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 font-black">ADMISSION LIVE 2026–27</span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-slate-700">100% Hospital Clinical Postings</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 bg-white/95 text-slate-900 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-lg backdrop-blur-md">
            <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
            <div className="flex items-center gap-1.5">
              <svg className="w-16 h-4 text-emerald-600" viewBox="0 0 100 24" fill="none">
                <path
                  d="M0 12 H25 L30 4 L38 20 L45 8 L50 14 L55 12 H100"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[11px] font-black font-mono">{liveBpm} BPM</span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. MAIN HERO CONTENT: LUMINOUS FLOATING CARD (CLEAN & SHARP) */}
        {/* ------------------------------------------------------------- */}
        {/* ------------------------------------------------------------- */}
        {/* 4. MAIN HERO CONTENT: DUAL CARD HERO WITH NEW LAUNCH SPOTLIGHT */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full py-6 sm:py-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Card: Main Hero Introduction */}
            <div
              className={`pointer-events-auto ${
                highlightedCourses.length > 0 ? 'lg:col-span-7' : 'max-w-2xl'
              } bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-4 sm:space-y-5 animate-fade-in`}
            >
              {/* College Project Badge & Viva Guide */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1E3A8A] border border-blue-200 text-xs font-black shadow-xs">
                  <GraduationCap className="w-4 h-4 text-[#1E3A8A]" />
                  <span>COLLEGE PROJECT SHOWCASE • SESSION 2026–2027</span>
                </div>
                {onOpenCollegeProjectModal && (
                  <button
                    onClick={onOpenCollegeProjectModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Project Dossier & Viva Specs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-black shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Ranked #1 Hands-On Paramedical & Medical Institute in Kolkata</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-slate-950">
                Train Inside High-Tech Clinical Suites.{' '}
                <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-600 bg-clip-text text-transparent underline decoration-emerald-400/50 decoration-wavy">
                  Master Live Healthcare
                </span>
                .
              </h1>

              <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                East India&apos;s premier healthcare & paramedical institute offering{' '}
                <strong className="text-slate-950 font-black">65% mandatory practical bedside clinical rotations</strong> across 
                premier diagnostic complexes, specialized ICUs, and super-specialty clinical training units. Plus, exclusive 
                <strong className="text-[#1E3A8A] font-bold"> 1-Year British Fellowships (London, UK)</strong> for medical professionals.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="px-6 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-xl shadow-blue-600/25 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Apply for Batch 2026–27</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDownloadProspectus}
                  className="px-5 py-3.5 rounded-2xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Download Prospectus</span>
                </button>

                <a
                  href="tel:+919147070624"
                  className="px-4 py-3.5 rounded-2xl font-semibold text-xs bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-xs flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+91 91470 70624</span>
                </a>
              </div>

              {/* Download Toast Notification */}
              {downloadToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    <strong>CIHM Official College Prospectus (2026-27)</strong>: PDF download started!
                  </span>
                </div>
              )}

              {/* 4 Clean Proof Badges */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xl font-black text-[#1E3A8A]">45+</div>
                  <div className="text-[10px] font-bold text-slate-600">Healthcare Centers</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xl font-black text-emerald-600">100%</div>
                  <div className="text-[10px] font-bold text-slate-600">Practical Training</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xl font-black text-blue-600">94.8%</div>
                  <div className="text-[10px] font-bold text-slate-600">Placement Record</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xl font-black text-purple-600">16+</div>
                  <div className="text-[10px] font-bold text-slate-600">London Fellowships</div>
                </div>
              </div>
            </div>

            {/* Right Card: ⭐ NEW LAUNCH COURSE HIGHLIGHT SPOTLIGHT */}
            {highlightedCourses.length > 0 && currentHeroCourse && (
              <div className="pointer-events-auto lg:col-span-5 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border-2 border-emerald-400 shadow-2xl space-y-4 text-white animate-fade-in relative overflow-hidden group">
                {/* Glowing Background Accent */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top Spotlight Bar */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                    <span>🔥 NEW LAUNCH COURSE (2026–27)</span>
                  </div>

                  {highlightedCourses.length > 1 && (
                    <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                      <button
                        type="button"
                        onClick={() =>
                          setHeroHighlightIdx((prev) =>
                            prev === 0 ? highlightedCourses.length - 1 : prev - 1
                          )
                        }
                        className="hover:text-emerald-400 cursor-pointer p-0.5"
                        title="Previous Highlighted Course"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span>
                        {(heroHighlightIdx % highlightedCourses.length) + 1} / {highlightedCourses.length}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setHeroHighlightIdx((prev) => (prev + 1) % highlightedCourses.length)
                        }
                        className="hover:text-emerald-400 cursor-pointer p-0.5"
                        title="Next Highlighted Course"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Course Image Showcase (Interactive Image Button) */}
                <div
                  onClick={() => setSyllabusModalCourse(currentHeroCourse)}
                  className="relative z-10 h-44 sm:h-48 w-full rounded-2xl overflow-hidden border border-white/20 bg-slate-800 cursor-pointer shadow-lg group/heroimg"
                >
                  <img
                    src={currentHeroCourse.image}
                    alt={currentHeroCourse.name}
                    className="w-full h-full object-cover group-hover/heroimg:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-black text-white shadow-md truncate"
                      style={{ backgroundColor: currentHeroCourse.accentColor || '#00A54F' }}
                    >
                      {currentHeroCourse.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-amber-300 border border-white/20">
                      ⭐ Highlighted
                    </span>
                  </div>

                  {/* Hover Prompt */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/heroimg:opacity-100 transition-opacity flex items-center justify-center p-3">
                    <span className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 font-black text-xs shadow-xl flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Click to View Full Syllabus</span>
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      Academic Session {currentHeroCourse.batchYear || '2026–27'}
                    </div>
                  </div>
                </div>

                {/* Course Title & Meta */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-lg sm:text-xl font-black text-white leading-snug line-clamp-2">
                    {currentHeroCourse.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {currentHeroCourse.shortDescription || currentHeroCourse.overview}
                  </p>

                  {/* 3 Key Specs */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div className="bg-white/10 rounded-xl p-2 border border-white/10 text-center">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Duration</span>
                      <strong className="text-white truncate block">{currentHeroCourse.duration}</strong>
                    </div>
                    <div className="bg-white/10 rounded-xl p-2 border border-white/10 text-center">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Eligibility</span>
                      <strong className="text-white truncate block">{currentHeroCourse.eligibility}</strong>
                    </div>
                    <div className="bg-white/10 rounded-xl p-2 border border-white/10 text-center">
                      <span className="block text-[9px] uppercase font-bold text-slate-400">Practical</span>
                      <strong className="text-emerald-400 truncate block">65% Lab Work</strong>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="relative z-10 pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSyllabusModalCourse(currentHeroCourse)}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Syllabus</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenEnquiry(currentHeroCourse.name)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer text-center"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 5. BOTTOM SLIDE INDICATOR & LIVE HOSPITAL FACILITY LABEL */}
        {/* ------------------------------------------------------------- */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full pb-6 flex flex-col gap-3 pointer-events-none">
          {/* Smooth Autoplay Progress Bar */}
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden shadow-xs pointer-events-auto">
            <div
              className="bg-emerald-400 h-full transition-all duration-75 ease-linear rounded-full shadow-[0_0_8px_#34D399]"
              style={{ width: `${slideProgress}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Active Hospital Facility Title from the current slide */}
            <div className="pointer-events-auto bg-slate-950/85 text-white backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl flex items-center gap-2.5 max-w-lg">
              <Hospital className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="truncate">
                <div className="text-xs font-black text-white truncate flex items-center gap-1.5">
                  {allSlides[currentSlideIdx]?.isNewLaunch && (
                    <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs uppercase animate-pulse">
                      New Launch
                    </span>
                  )}
                  <span>📷 {allSlides[currentSlideIdx]?.title}</span>
                </div>
                <div className="text-[10px] text-amber-300 font-bold truncate">
                  {allSlides[currentSlideIdx]?.department} • {allSlides[currentSlideIdx]?.badge}
                </div>
              </div>
              {allSlides[currentSlideIdx]?.ctaUrl && (
                <button
                  type="button"
                  onClick={() => onNavigate(allSlides[currentSlideIdx]?.ctaUrl || '/courses')}
                  className="ml-auto px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] whitespace-nowrap shadow-xs cursor-pointer transition-colors"
                >
                  View Syllabus →
                </button>
              )}
            </div>

            {/* Carousel Slide Indicators & Play/Pause */}
            <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-xl">
              {/* Step counter */}
              <span className="text-[11px] font-black text-slate-800 px-1 font-mono">
                {String(currentSlideIdx + 1).padStart(2, '0')}/{String(allSlides.length).padStart(2, '0')}
              </span>

              {/* Prev */}
              <button
                onClick={handlePrevSlide}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors active:scale-90"
                title="Previous slide"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {allSlides.map((slide, dotIdx) => (
                  <button
                    key={slide.id || dotIdx}
                    onClick={() => handleSelectSlide(dotIdx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      dotIdx === currentSlideIdx
                        ? 'w-7 bg-emerald-600'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={slide.title}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsSlidePaused(!isSlidePaused)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors active:scale-90 ml-1"
                title={isSlidePaused ? 'Resume autoplay' : 'Pause autoplay'}
                aria-label={isSlidePaused ? 'Resume autoplay' : 'Pause autoplay'}
              >
                {isSlidePaused ? (
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                ) : (
                  <Pause className="w-3.5 h-3.5 text-slate-700" />
                )}
              </button>

              {/* Next */}
              <button
                onClick={handleNextSlide}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors active:scale-90"
                title="Next slide"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📢 2. LIVE COLLEGE NOTICE BOARD & CIRCULARS TICKER */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-emerald-500/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Header */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black shadow-md">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#1E3A8A]">
                    College Notice Board & Circulars
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                <span className="text-[11px] text-slate-500">
                  Official Academic Session 2026–2027 Announcements
                </span>
              </div>
            </div>

            {/* Notices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 flex-1">
              {collegeNotices.map((n) => (
                <div
                  key={n.id}
                  onClick={() => setSelectedNotice(n)}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 transition-all cursor-pointer group flex flex-col justify-between shadow-xs"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${n.tagColor}`}>
                      {n.tag}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{n.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors line-clamp-1">
                    {n.title}
                  </h4>
                  <div className="mt-1 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span>Read circular</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setSelectedNotice(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-black px-2.5 py-0.5 rounded ${selectedNotice.tagColor}`}>
                {selectedNotice.tag}
              </span>
              <span className="text-xs text-slate-500">{selectedNotice.date}</span>
            </div>

            <h3 className="text-lg font-black text-slate-900 leading-snug">
              {selectedNotice.title}
            </h3>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              {selectedNotice.desc}
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setSelectedNotice(null);
                  onOpenEnquiry();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider cursor-pointer text-center shadow-md"
              >
                Take Action
              </button>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🏥 3. CLINICAL PARTNERS MARQUEE (OR ACCREDITATIONS & STANDARDS RIBBON) */}
      {/* ========================================================================= */}
      {partnerHospitals && partnerHospitals.length > 0 ? (
        <section className="bg-white border-y border-slate-200 py-8 overflow-hidden shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Hospital className="w-5 h-5 text-[#1E3A8A]" />
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Clinical Training Affiliates ({partnerHospitals.length})
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              100% Guaranteed Practical Postings
            </span>
          </div>

          {/* Row 1 Marquee (Left Scroll) */}
          <div className="flex gap-4 overflow-hidden select-none py-1">
            <div className="flex gap-4 animate-marquee shrink-0">
              {partnerHospitals.slice(0, 8).map((h, i) => (
                <div
                  key={`h1-${i}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shrink-0 hover:border-blue-500 hover:bg-blue-50/50 transition-colors shadow-xs"
                >
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-black text-xs">
                    +
                  </div>
                  <span>{h.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal">({h.location})</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 animate-marquee shrink-0" aria-hidden="true">
              {partnerHospitals.slice(0, 8).map((h, i) => (
                <div
                  key={`h1-dup-${i}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shrink-0"
                >
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-black text-xs">
                    +
                  </div>
                  <span>{h.name}</span>
                  <span className="text-[10px] text-slate-500 font-normal">({h.location})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 Marquee (Right Scroll) */}
          {partnerHospitals.length > 8 && (
            <div className="flex gap-4 overflow-hidden select-none py-1 mt-2">
              <div className="flex gap-4 animate-marquee-reverse shrink-0">
                {partnerHospitals.slice(8, 16).map((h, i) => (
                  <div
                    key={`h2-${i}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shrink-0 hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                      +
                    </div>
                    <span>{h.name}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({h.location})</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 animate-marquee-reverse shrink-0" aria-hidden="true">
                {partnerHospitals.slice(8, 16).map((h, i) => (
                  <div
                    key={`h2-dup-${i}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shrink-0"
                  >
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                      +
                    </div>
                    <span>{h.name}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({h.location})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-y border-white/10 py-6 overflow-hidden shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-base font-black text-emerald-400">NABL</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-0.5">Diagnostic Lab Norms</div>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-base font-black text-sky-400">AERB</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-0.5">Radiation Safety Certified</div>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-base font-black text-amber-400">UGC</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-0.5">Recognized Curriculum</div>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-base font-black text-purple-400">UK London</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-0.5">CPD Clinical Fellowships</div>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-base font-black text-teal-400">100%</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-0.5">Practical Postings</div>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-base font-black text-rose-400">94.8%</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-0.5">Verified Placement Record</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 📸 4. VIBRANT COLLEGE CAMPUS LIFE & LABORATORY PHOTO COLLAGE WALL */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 text-slate-900 shadow-xl relative overflow-hidden">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1E3A8A] text-xs font-black uppercase tracking-wider border border-blue-200 mb-2">
                <GraduationCap className="w-4 h-4 text-[#1E3A8A]" />
                <span>Campus Life & Clinical Training Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                Vibrant College Life & Lab Photo Collage
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real glimpses of our anatomy halls, robotic pathology analyzers, surgical OT scrub-in, and annual fest.
              </p>
            </div>

            {/* Collage Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All Moments' },
                { id: 'labs', label: 'Clinical Labs' },
                { id: 'hospital', label: 'Hospital Postings' },
                { id: 'campus', label: 'Fest & Campus' },
                { id: 'convocation', label: 'Convocation' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCollageFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                    activeCollageFilter === tab.id
                      ? 'bg-[#1E3A8A] text-white font-black shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Collage Dynamic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCollage.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedCollagePhoto(item)}
                className={`group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 hover:border-emerald-500 transition-all duration-300 cursor-pointer shadow-md transform hover:-translate-y-1.5 ${
                  idx === 0 || idx === 3 ? 'sm:col-span-2 sm:row-span-1' : ''
                }`}
              >
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Department Tag */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 text-[10px] font-bold text-amber-300">
                    {item.dept}
                  </div>

                  {/* Zoom indicator */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-black text-white drop-shadow-md leading-tight group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-200 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Over 1,200+ trained paramedical professionals currently working across India and overseas.</span>
            </div>
            <button
              onClick={() => onNavigate('/gallery')}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Explore Full Photo Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Collage Photo Zoom Modal */}
      {selectedCollagePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-slate-900">
            <div className="relative h-80 sm:h-96 w-full">
              <img
                src={selectedCollagePhoto.image}
                alt={selectedCollagePhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedCollagePhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 flex items-center justify-center text-white cursor-pointer border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-amber-300 border border-white/20">
                {selectedCollagePhoto.dept}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-black text-slate-900">
                {selectedCollagePhoto.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {selectedCollagePhoto.description}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">CIHM Academic Campus • Kolkata</span>
                <button
                  onClick={() => setSelectedCollagePhoto(null)}
                  className="px-5 py-2 rounded-xl bg-[#1E3A8A] text-white font-black text-xs cursor-pointer shadow-md"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🎓 5. PRINCIPAL & DEAN'S ACADEMIC DESK / COLLEGE LEADERSHIP */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#0F2862] via-[#1E3A8A] to-[#0D9488] rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white/40 shadow-xl mb-4">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
                  alt="Dean Dr. P. K. Sengupta"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-black text-white">Dr. P. K. Sengupta, MD (Path)</h3>
              <p className="text-xs text-emerald-300 font-bold mt-0.5">Dean of Paramedical Studies</p>
              <p className="text-[11px] text-slate-200 mt-1">Ex-Senior Consultant, Woodlands Multispecialty</p>
              
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold border border-emerald-400/40">
                  32+ Yrs Clinical Experience
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-300 text-xs font-black uppercase tracking-wider border border-white/20">
                <Building2 className="w-4 h-4 text-emerald-300" />
                <span>From the Dean&apos;s Desk</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                &quot;A paramedical technologist is the clinical backbone of modern medicine.&quot;
              </h2>

              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                At CIHM, we believe healthcare education cannot be confined to theoretical textbooks. A student must feel the pulse of a dialysis circuit, calibrate automated hematology analyzers, prepare sterile surgical instruments for laparoscopy, and interpret high-resolution digital radiographs. That is why our curriculum mandates 
                <strong className="text-emerald-300"> 65% practical hospital internship</strong> at Kolkata&apos;s leading tertiary healthcare centres.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                  <div className="text-sm font-black text-emerald-300">Govt. Recognised</div>
                  <div className="text-[10px] text-slate-200 mt-0.5">Approved Syllabus</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                  <div className="text-sm font-black text-amber-300">1:8 Lab Ratio</div>
                  <div className="text-[10px] text-slate-200 mt-0.5">Student to Trainer</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                  <div className="text-sm font-black text-cyan-300">100% Placement</div>
                  <div className="text-[10px] text-slate-200 mt-0.5">Hospitals & Labs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📚 6. INTERACTIVE COURSE EXPLORER & 3D TILT CARDS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1E3A8A] text-xs font-black uppercase tracking-wider mb-2">
              <Stethoscope className="w-4 h-4" />
              <span>Paramedical Diplomas & International Fellowships</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore Industry-Accredited Programs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select a specialized medical stream to view eligibility, practical lab hours, and syllabus modules.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'pathology', label: 'Pathology & Labs' },
              { id: 'imaging', label: 'Radiology & X-Ray' },
              { id: 'critical', label: 'Critical Care & Dialysis' },
              { id: 'fellowships', label: 'London Fellowships' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCourseCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex-shrink-0 cursor-pointer ${
                  activeCourseCategory === tab.id
                    ? 'bg-[#1E3A8A] text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 📷 INTERACTIVE COURSE IMAGE BUTTONS SHOWCASE (HIGHLIGHTED NEW LAUNCHES) */}
        {/* ========================================================================= */}
        <div className="mb-8 p-4 sm:p-6 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/60 rounded-3xl border-2 border-emerald-500/50 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <span>Featured & Highlighted Course Image</span>
                  <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
                    New Launches 2026–27
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Click any course photo button below to instantly view syllabus, fees & clinical postings.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-700 bg-white/90 px-3 py-1.5 rounded-xl border border-emerald-300 shadow-xs flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
              <span className="font-bold text-emerald-800">Showing {filteredCourses.length} Highlighted Programs</span>
            </div>
          </div>

          {/* Responsive Visual Grid of Course Image Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredCourses.map((c) => (
              <button
                key={`btn-img-${c.id}`}
                type="button"
                onClick={() => setSyllabusModalCourse(c)}
                className={`group/imgbtn relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  c.highlighted || c.isNewLaunch
                    ? 'border-2 border-emerald-500 ring-2 ring-emerald-500/40 shadow-[0_0_15px_rgba(0,165,79,0.35)] hover:shadow-2xl'
                    : 'border-2 border-slate-200 hover:border-emerald-500 hover:shadow-xl'
                }`}
                title={`Click to open ${c.name} course details & syllabus`}
                aria-label={`Open syllabus for ${c.name}`}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="absolute inset-0 w-full h-full object-cover group-hover/imgbtn:scale-115 transition-transform duration-500 brightness-95 group-hover/imgbtn:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none gap-1">
                  <span
                    className="text-[9px] font-black text-white px-1.5 py-0.5 rounded-md shadow-xs truncate"
                    style={{ backgroundColor: c.accentColor || '#1E3A8A' }}
                  >
                    {c.shortCode || c.category.split(' ')[0]}
                  </span>
                  {(c.highlighted || c.isNewLaunch) ? (
                    <span className="text-[8px] bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded shadow-xs uppercase tracking-tight flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-slate-950" />
                      <span>New Launch</span>
                    </span>
                  ) : (
                    <span className="text-[8.5px] bg-slate-950/80 text-emerald-300 font-extrabold px-1.5 py-0.5 rounded shadow-xs">
                      {c.batchYear || '2026–27'}
                    </span>
                  )}
                </div>

                {/* Hover Click Prompt */}
                <div className="absolute inset-0 bg-[#1E3A8A]/50 opacity-0 group-hover/imgbtn:opacity-100 transition-opacity flex items-center justify-center p-2 text-center pointer-events-none">
                  <span className="bg-white text-[#1E3A8A] font-black text-[10px] px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1">
                    <FileText className="w-3 h-3 text-emerald-600" />
                    <span>Open Syllabus</span>
                  </span>
                </div>

                {/* Bottom Course Name */}
                <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                  <div className="text-[11px] font-black text-white leading-tight line-clamp-1 drop-shadow-md group-hover/imgbtn:text-emerald-300 transition-colors">
                    {c.name}
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-300 mt-0.5">
                    <span className="truncate">{c.duration}</span>
                    <span className="text-emerald-400 font-bold group-hover/imgbtn:underline">
                      View →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.slice(0, 6).map((course) => {
            const isHighlight = course.highlighted || course.isNewLaunch;
            return (
              <div
                key={course.id}
                className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 relative ${
                  isHighlight
                    ? 'border-2 border-emerald-500 shadow-[0_0_25px_rgba(0,165,79,0.25)] hover:shadow-2xl'
                    : 'border border-slate-200/90 hover:border-emerald-500 shadow-md hover:shadow-2xl'
                }`}
              >
                <div>
                  {/* High-Visibility New Course Launch Banner */}
                  {isHighlight && (
                    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white text-[10.5px] font-black uppercase tracking-wider py-1 px-3 text-center flex items-center justify-center gap-1.5 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                      <span>NEW LAUNCH PROGRAM • SESSION 2026–27</span>
                    </div>
                  )}

                  {/* Interactive Course Image Button */}
                  <button
                    type="button"
                    onClick={() => setSyllabusModalCourse(course)}
                    className="relative h-52 w-full bg-slate-100 overflow-hidden text-left group/imgbtn block cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label={`Click to view syllabus details for ${course.name}`}
                    title="Click image to open course syllabus"
                  >
                    <img
                      src={course.image}
                      alt={course.name}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover/imgbtn:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#1E3A8A] text-white px-3 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{course.category}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                      {course.batchYear || '2026–27'}
                    </div>

                    {/* Hover Overlay Action Prompt */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/imgbtn:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="px-3.5 py-2 rounded-xl bg-white/95 text-[#1E3A8A] font-black text-xs shadow-xl flex items-center gap-1.5 transform scale-95 group-hover/imgbtn:scale-100 transition-transform">
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Click Image to View Syllabus</span>
                      </span>
                    </div>
                  </button>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#1E3A8A] transition-colors leading-snug">
                      {course.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    {/* Clinical Drill Meter */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between text-[11px] font-extrabold mb-1">
                        <span className="text-slate-600">Hospital Clinical Training</span>
                        <span className="text-emerald-700 font-mono">65% Lab & Bedside</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full w-[65%] rounded-full"></div>
                      </div>
                    </div>

                    {/* Duration & Eligibility */}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                        <span className="font-extrabold text-slate-800">{course.duration}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Eligibility</span>
                        <span className="font-extrabold text-slate-800 truncate block">{course.eligibility}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setSyllabusModalCourse(course)}
                    className="flex-1 py-3 text-center rounded-xl bg-slate-100 hover:bg-[#1E3A8A] text-slate-800 hover:text-white font-extrabold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Syllabus Details</span>
                  </button>
                  <button
                    onClick={() => onOpenEnquiry(course.name)}
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-transform active:scale-95 shadow-md cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Directory Prompt */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">
                Showing Highlighted New Course Launches (Session 2026–27)
              </h4>
              <p className="text-[11px] text-slate-500">
                Other paramedical diplomas and clinical programs are listed on the dedicated course directory page.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/courses')}
            className="px-6 py-3 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 whitespace-nowrap cursor-pointer flex-shrink-0"
          >
            <span>View All Courses Directory</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🏥 6.5. CAMPUS PRACTICAL FACILITIES & DIAGNOSTIC LABS SHOWCASE (BACKEND UPLOADED) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-slate-900 shadow-xl relative overflow-hidden">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200 mb-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Modern Practical Infrastructure & Live Simulators</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Facilities & Diagnostic Demo Labs
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Trained directly on hospital-grade automated analyzers, digital radiography units, and ICU ventilators. Managed and updated directly from the CIHM administrative backend.
              </p>
            </div>

            {/* Watch Demo Classes Main Trigger */}
            <button
              onClick={() => handleOpenDemoVideo()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95 self-start md:self-auto"
            >
              <Film className="w-4 h-4 fill-white" />
              <span>Watch Lab Demo Classes</span>
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </button>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {[
              { id: 'all', label: 'All Campus Facilities' },
              { id: 'Pathology & DMLT', label: 'Pathology & Hematology Lab' },
              { id: 'Radiology & Imaging', label: 'Digital Radiography (DR)' },
              { id: 'Operation Theatre', label: 'OT Surgical Simulation' },
              { id: 'Dialysis Technology', label: 'Dialysis Station Bay' },
              { id: 'ICU & Emergency Care', label: 'Critical Care ICU' },
              { id: 'Campus Facilities', label: '3D Anatomy & Lecture Halls' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFacilityCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                  activeFacilityCategory === tab.id
                    ? 'bg-[#1E3A8A] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Facilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(facilities.length > 0 ? facilities : [
              {
                id: 'fac-1',
                title: 'Advanced Pathology & Hematology Diagnostic Lab',
                department: 'Pathology & DMLT',
                category: 'Diagnostic Lab',
                description: 'Fully automated diagnostic pathology workstation equipped with automated biochemistry analyzers, 5-part hematology counters, and binocular microscopes.',
                equipment: ['Automated Biochemistry Analyzer', '5-Part Hematology Counter', 'Binocular Research Microscopes', 'Digital Centrifuge Units'],
                capacity: '45 Students / Shift',
                practicalHours: '750+ Practical Hours',
                imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1000&q=80',
                demoVideoId: 'demo-1',
                featured: true,
                order: 1
              },
              {
                id: 'fac-2',
                title: 'Digital Radiography (DR) & Medical Imaging Suite',
                department: 'Radiology & Imaging',
                category: 'Radiology Suite',
                description: 'High-frequency Digital Radiography (DR) system with lead-shielded console, AERB-compliant radiation apparel, PACS workstation, and positioning simulators.',
                equipment: ['High-Frequency DR X-Ray System', 'Lead Shielded Control Booth', 'PACS Digital DICOM Viewing Station', 'Patient Positioning Phantom'],
                capacity: '30 Students / Shift',
                practicalHours: '600+ Practical Hours',
                imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
                demoVideoId: 'demo-2',
                featured: true,
                order: 2
              },
              {
                id: 'fac-3',
                title: 'Operation Theatre (OT) & Surgical Simulation',
                department: 'Operation Theatre (DOTT)',
                category: 'Surgical Simulation',
                description: 'Ultra-clean laminar airflow simulated operation theatre with hydraulic operating table, anesthesia machine, electrocautery, and laparoscopy tower.',
                equipment: ['Hydraulic OT Table', 'Anesthesia Workstation', 'HD Laparoscopy Tower', 'Bipolar Electrosurgical Unit'],
                capacity: '25 Students / Shift',
                practicalHours: '700+ Practical Hours',
                imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80',
                demoVideoId: 'demo-4',
                featured: true,
                order: 3
              }
            ])
              .filter((f) => {
                if (activeFacilityCategory === 'all') return true;
                return (f.department || '').toLowerCase().includes(activeFacilityCategory.toLowerCase());
              })
              .map((facility) => (
                <div
                  key={facility.id}
                  className="bg-slate-50/80 rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-emerald-500/50 transition-all flex flex-col group"
                >
                  {/* Image & Video Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={facility.imageUrl}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 text-[#1E3A8A] backdrop-blur-xs shadow-xs">
                        {facility.department}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow-xs">
                        {facility.category}
                      </span>
                    </div>

                    {/* Bottom overlay with quick demo launcher button */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-white flex items-center gap-1.5 drop-shadow-md">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{facility.practicalHours}</span>
                      </span>
                      <button
                        onClick={() => handleOpenDemoVideo(facility.demoVideoId || 'demo-1')}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-black flex items-center gap-1 shadow-md transition-transform active:scale-95 cursor-pointer"
                        title="Watch practical video demonstration"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Demo Video</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-[#1E3A8A] transition-colors line-clamp-1">
                        {facility.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {facility.description}
                      </p>

                      {/* Equipment List */}
                      <div className="mt-3.5 pt-3 border-t border-slate-200">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">
                          Equipment & Stations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(facility.equipment || []).slice(0, 3).map((eq, i) => (
                            <span
                              key={i}
                              className="text-[10.5px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold"
                            >
                              ✓ {eq}
                            </span>
                          ))}
                          {(facility.equipment || []).length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold">
                              +{(facility.equipment || []).length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenDemoVideo(facility.demoVideoId || 'demo-1')}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>Watch Demo Class</span>
                      </button>
                      <button
                        onClick={() => onOpenEnquiry(facility.department)}
                        className="py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition-colors cursor-pointer"
                        title="Inquire about clinical lab batches"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🔬 7. STUDENT CAPSTONE INNOVATIONS & CLINICAL RESEARCH PROJECTS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-slate-900 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Student Academic Research & Capstones</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                Paramedical College Capstone Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Innovative clinical protocols and digital solutions developed by CIHM final year students.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start md:self-auto">
              Academic Session 2026–2027
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-colors shadow-xs">
              <div className="text-[10px] font-bold text-[#1E3A8A] uppercase tracking-wider">
                DMLT Capstone
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-1">
                Automated Smear Differential Cell Counter
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Computer vision software assisting in peripheral blood smear classification and abnormal blast cell identification.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-bold">✓ Grade: A+</span>
                <span className="text-slate-500">Pathology Dept</span>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-blue-500 transition-colors shadow-xs">
              <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                Radiology Capstone
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-1">
                Low-Dose DR Radiation Protocol for Pediatrics
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Reduced scatter radiation protocol achieving 32% lower exposure with optimal 4K PACS contrast resolution.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-bold">✓ AERB Verified</span>
                <span className="text-slate-500">Radiology Dept</span>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-teal-500 transition-colors shadow-xs">
              <div className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                Dialysis Capstone
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-1">
                Dynamic TMP & Ultrafiltration Safety Alarm
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Sensor calibration checklist preventing intradialytic hypotension through early venous pressure slope warning.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-bold">✓ Hospital Tested</span>
                <span className="text-slate-500">Dialysis Dept</span>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-purple-500 transition-colors shadow-xs">
              <div className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                OT Technology Capstone
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-1">
                Rapid Laparoscopy Sterile Check Matrix
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Digital barcode audit checklist reducing surgical instrument prep turnaround time by 22 minutes.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-bold">✓ NABH Compliant</span>
                <span className="text-slate-500">OT Dept</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🌟 7.5. STUDENT ACHIEVEMENTS, REVIEWS & LIVE CAMPUS SOCIAL FEED */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-slate-900 shadow-xl relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-black uppercase tracking-wider border border-amber-200 mb-2">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Student Hall of Fame & Social Pulse</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Student Achievements & Live Campus Feed
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Celebrate our gold medalists, university rankers, and hospital placement stars. Connect with live student experiences and practical laboratory drills.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => setFeedPostModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Feed Update</span>
              </button>
            </div>
          </div>

          {/* Top Showcase: Student Achievers Carousel / Grid */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#1E3A8A] flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Top Academic & Clinical Achievers</span>
              </span>
              <span className="text-xs font-bold text-slate-500">
                Recognized by Paramedical Faculty & Hospitals
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(studentAchievements.length > 0 ? studentAchievements.slice(0, 3) : [
                {
                  id: 'ach-1',
                  studentName: 'Debabrata Mondal',
                  course: 'Diploma in Medical Lab Technology (DMLT)',
                  badge: 'State Rank 1 & Gold Medal',
                  year: 'Batch 2024',
                  achievement: 'Awarded State Paramedical Excellence Gold Medal for highest score in Clinical Biochemistry & Pathology.',
                  organizationOrHospital: 'Super-Specialty Diagnostic Center, Kolkata',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                  verified: true,
                  featured: true
                },
                {
                  id: 'ach-2',
                  studentName: 'Priyanka Halder',
                  course: 'Diploma in Radiography & Imaging (DRX)',
                  badge: 'Best Radiographer Award',
                  year: 'Batch 2024',
                  achievement: 'Completed 600+ digital X-Ray and CT scout scans during clinical rotation with zero repeat-exposure penalty.',
                  organizationOrHospital: 'Multispecialty Hospital & Trauma Care',
                  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
                  verified: true,
                  featured: true
                },
                {
                  id: 'ach-3',
                  studentName: 'Subhadip Chatterjee',
                  course: 'Diploma in Dialysis Technology (DDT)',
                  badge: '100% Placement Batch Star',
                  year: 'Batch 2023',
                  achievement: 'Flawless execution of 350+ hemodialysis cycles in emergency nephrology wards and promoted to Unit In-Charge.',
                  organizationOrHospital: 'Premier Nephrology Institute, Kolkata',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                  verified: true,
                  featured: true
                }
              ]).map((ach) => (
                <div
                  key={ach.id}
                  className="bg-gradient-to-br from-amber-50/60 via-white to-slate-50 p-5 rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={ach.avatar}
                      alt={ach.studentName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-300 shadow-xs flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-black text-slate-900 truncate">
                          {ach.studentName}
                        </h4>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-2xs">
                          {ach.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#1E3A8A] font-bold mt-0.5 truncate">
                        {ach.course}
                      </p>
                      <span className="text-[10px] text-slate-400 font-semibold block">
                        {ach.year} • {ach.organizationOrHospital}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-amber-100 leading-relaxed italic">
                    &quot;{ach.achievement}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Feed: Live Campus Feed Pulse */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
                  Live Student Social Pulse & Clinical Updates
                </h3>
              </div>

              {/* Feed Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Feed' },
                  { id: 'lab_session', label: 'Practical Lab Drills' },
                  { id: 'clinical_posting', label: 'Hospital Postings' },
                  { id: 'placement', label: 'Placement Stars' },
                  { id: 'campus_life', label: 'Campus Life' }
                ].map((fTab) => (
                  <button
                    key={fTab.id}
                    onClick={() => setFeedCategory(fTab.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      feedCategory === fTab.id
                        ? 'bg-[#1E3A8A] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {fTab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feed Cards Masonry / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(studentFeed.length > 0 ? studentFeed : [
                {
                  id: 'feed-1',
                  authorName: 'Ananya Mukherjee',
                  authorRole: 'DMLT 2nd Year • Clinical Biochemistry Rotation',
                  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
                  category: 'lab_session' as const,
                  badge: 'Practical Lab Drill',
                  content: 'Just finished our calibration drill on the automated clinical biochemistry analyzer at CIHM lab! Running quality control standards before our morning batch samples gave us incredible practical confidence. 🧪🔬',
                  imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
                  likes: 42,
                  timestamp: '2 hours ago',
                  verified: true
                },
                {
                  id: 'feed-2',
                  authorName: 'Rohit Biswas',
                  authorRole: 'Dialysis Tech Intern • Nephrology Ward',
                  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
                  category: 'clinical_posting' as const,
                  badge: 'Hospital Ward Posting',
                  content: 'Completed morning dialysis shift! Primed two dialyzers, checked heparin dosage calibration, and monitored venous pressure alarms seamlessly. Big gratitude to our CIHM clinical mentors!',
                  imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
                  likes: 67,
                  timestamp: '5 hours ago',
                  verified: true
                }
              ])
                .filter((p) => {
                  if (feedCategory === 'all') return true;
                  return p.category === feedCategory;
                })
                .map((post) => (
                  <div
                    key={post.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Author Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.avatar}
                            alt={post.authorName}
                            className="w-10 h-10 rounded-full object-cover border border-slate-300 shadow-2xs"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black text-slate-900">
                                {post.authorName}
                              </span>
                              {post.verified && (
                                <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px]" title="Verified CIHM Student">
                                  ✓
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium line-clamp-1">
                              {post.authorRole}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {post.badge && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs">
                              {post.badge}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400">
                            {post.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-xs text-slate-700 leading-relaxed mb-3">
                        {post.content}
                      </p>

                      {/* Optional Post Image */}
                      {post.imageUrl && (
                        <div className="mb-3 rounded-xl overflow-hidden max-h-48 border border-slate-200">
                          <img
                            src={post.imageUrl}
                            alt="Post attachment"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2.5 border-t border-slate-200/70 flex items-center justify-between">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`text-xs font-extrabold flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                          likedFeedIds[post.id]
                            ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-xs'
                            : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${likedFeedIds[post.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(`${post.authorName}: "${post.content}" - CIHM Student Pulse`);
                              alert('Copied student post to clipboard!');
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                          title="Share student update"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🗺️ 8. INTERACTIVE KOLKATA CLINICAL HOSPITAL ROTATION HUB (ADMIN MANAGED) */}
      {/* ========================================================================= */}
      {partnerHospitals && partnerHospitals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-slate-900 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1E3A8A] text-xs font-black uppercase tracking-wider border border-blue-200 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Kolkata Clinical Rotation Network</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                  Interactive Hospital Rotation Map
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Explore our affiliated hospital corridors across Kolkata where our trainees complete their bedside rotations.
                </p>
              </div>

              {/* Zone Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {kolkataZones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setActiveKolkataZone(z.id as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                      activeKolkataZone === z.id
                        ? 'bg-[#1E3A8A] text-white font-black shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {z.name.replace(' Healthcare City', '').replace(' Tertiary Centre', '').replace(' Health Corridor', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Hospital List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredHospitalsByZone.slice(0, 8).map((hospital, idx) => (
                <div
                  key={hospital.id || idx}
                  className="bg-slate-50 hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all group shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                      +
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                      Active Posting
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mt-3 group-hover:text-[#1E3A8A] transition-colors">
                    {hospital.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{hospital.location}</span>
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                    <span>Bed Capacity</span>
                    <span className="font-mono text-[#1E3A8A] font-bold">{hospital.bedCapacity || '350+ Beds'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>
                All students receive official hospital rotation completion letters signed by hospital medical directors.
              </span>
              <button
                onClick={() => onNavigate('/placements')}
                className="text-[#1E3A8A] hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>View Verified Placement Letters & Records</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 📥 9. COLLEGE DOWNLOADS & PROSPECTUS HUB */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 text-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#1E3A8A] block">
                Official College Documentation
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                College Downloads & Academic Resources
              </h3>
            </div>
            <button
              onClick={handleDownloadProspectus}
              className="px-6 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-black text-xs uppercase tracking-wider transition-all self-start sm:self-auto flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download All (Zip)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={handleDownloadProspectus}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer shadow-xs group flex items-start gap-3"
            >
              <div className="p-2.5 rounded-xl bg-blue-100 text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 group-hover:text-[#1E3A8A]">
                  College Prospectus 2026–27
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Comprehensive Guide (PDF, 4.2 MB)</div>
              </div>
            </div>

            <div
              onClick={handleDownloadProspectus}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-blue-500 transition-all cursor-pointer shadow-xs group flex items-start gap-3"
            >
              <div className="p-2.5 rounded-xl bg-cyan-100 text-cyan-800 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 group-hover:text-[#1E3A8A]">
                  Academic Calendar 2026–27
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Exams & Holidays (PDF, 1.1 MB)</div>
              </div>
            </div>

            <div
              onClick={handleDownloadProspectus}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer shadow-xs group flex items-start gap-3"
            >
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 group-hover:text-[#1E3A8A]">
                  Paramedical Syllabus Booklet
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Full Curriculum (PDF, 3.8 MB)</div>
              </div>
            </div>

            <div
              onClick={handleDownloadProspectus}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-purple-500 transition-all cursor-pointer shadow-xs group flex items-start gap-3"
            >
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 group-hover:text-[#1E3A8A]">
                  Anti-Ragging & Safety Code
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">UGC Regulations (PDF, 850 KB)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📄 SYLLABUS MODAL PREVIEW DRAWER */}
      {/* ========================================================================= */}
      {syllabusModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSyllabusModalCourse(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1E3A8A] bg-blue-50 px-2.5 py-0.5 rounded-full">
                {syllabusModalCourse.category}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Batch 2026–27
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {syllabusModalCourse.name}
            </h3>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {syllabusModalCourse.fullDescription || syllabusModalCourse.shortDescription}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Course Duration</span>
                <span className="font-extrabold text-slate-800">{syllabusModalCourse.duration}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Eligibility</span>
                <span className="font-extrabold text-slate-800 truncate block">{syllabusModalCourse.eligibility}</span>
              </div>
            </div>

            {/* Syllabus Modules */}
            {syllabusModalCourse.curriculum && syllabusModalCourse.curriculum.length > 0 && (
              <div className="mt-5">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                  Academic & Clinical Modules:
                </h4>
                <div className="space-y-2">
                  {syllabusModalCourse.curriculum.map((m, idx) => (
                    <div key={m.id || idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <span className="font-extrabold text-[#1E3A8A] block">
                        {m.title || `Module ${idx + 1}`} {m.duration ? `(${m.duration})` : ''}
                      </span>
                      {m.topics && m.topics.length > 0 && (
                        <p className="text-slate-600 mt-1">
                          {m.topics.join(' • ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  const cName = syllabusModalCourse.name;
                  setSyllabusModalCourse(null);
                  onOpenEnquiry(cName);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer text-center"
              >
                Apply For This Course
              </button>
              <button
                onClick={() => {
                  const slug = syllabusModalCourse.slug;
                  setSyllabusModalCourse(null);
                  onNavigate(`/courses/${slug}`);
                }}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer text-center"
              >
                Full Syllabus Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📞 10. FLOATING QUICK ADMISSION DOCK */}
      {/* ========================================================================= */}
      <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-40 bg-[#0F2862]/95 text-white rounded-2xl p-3 border border-emerald-400/50 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-2 sm:gap-4 animate-float-slow">
        <div className="flex items-center gap-2 truncate">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
            <Zap className="w-4 h-4 fill-slate-950" />
          </div>
          <div className="truncate">
            <span className="text-xs font-black text-white block leading-tight truncate">
              Admissions Open 2026–27
            </span>
            <span className="text-[10px] text-emerald-300 hidden sm:inline">
              100% Hospital Clinical Postings in Kolkata
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="https://wa.me/919147070624?text=Hello%20CIHM%2C%20I%20want%20to%20know%20about%20Paramedical%20and%20Fellowship%20Admissions"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            onClick={() => onOpenEnquiry()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-400/20 active:scale-95 cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🎬 DEMO CLASSES & PRACTICAL DIAGNOSTIC LAB VIDEO MODAL */}
      {/* ========================================================================= */}
      <DemoClassesModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onOpenEnquiry={onOpenEnquiry}
        initialVideoId={demoModalInitialVideoId}
      />

      {/* ========================================================================= */}
      {/* ✍️ STUDENT CAMPUS FEED POST MODAL */}
      {/* ========================================================================= */}
      {feedPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative">
            <button
              onClick={() => setFeedPostModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                <Send className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Share Student Story or Clinical Update
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Post about your practical lab session, hospital rotation experience, or milestone.
            </p>

            <form onSubmit={handleSubmitFeedPost} className="space-y-3.5 text-xs">
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Sen"
                  value={newPostAuthor}
                  onChange={(e) => setNewPostAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">
                    Batch / Role
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DMLT Batch 2024"
                    value={newPostRole}
                    onChange={(e) => setNewPostRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">
                    Category Tag
                  </label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                  >
                    <option value="lab_session">Practical Lab Drill</option>
                    <option value="clinical_posting">Hospital Posting</option>
                    <option value="placement">Placement Success</option>
                    <option value="campus_life">Campus Life</option>
                    <option value="achievement">Academic Milestone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  Highlight Badge Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Biochemistry Lab Drill"
                  value={newPostBadge}
                  onChange={(e) => setNewPostBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  Your Update or Review
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your reflection, clinical case note, or lab practical experience..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFeedPostModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingPost}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submittingPost ? 'Publishing...' : 'Publish Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
