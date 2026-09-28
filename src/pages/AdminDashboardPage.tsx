import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import {
  LayoutDashboard,
  Sliders,
  BookOpen,
  FileText,
  Hospital,
  Star,
  Users,
  Bell,
  Inbox,
  History,
  Lock,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Download,
  AlertCircle,
  X,
  Palette,
  Calendar,
  Sparkles,
  ExternalLink,
  DollarSign,
  Tag,
  Building2,
  Globe2,
  Search,
  Server,
  Code2,
  Terminal,
  Database,
  FileCode2,
  Upload,
  Image as ImageIcon,
  Camera,
  Film,
  Trophy,
  Award,
  Eye
} from 'lucide-react';
import {
  HeroSlide,
  Course,
  Blog,
  PartnerHospital,
  PlacementRecord,
  ReviewItem,
  StudyRoom,
  Announcement,
  Enquiry,
  FacilityItem,
  DemoVideo,
  StudentAchievement,
  StudentFeedItem
} from '../types.js';

// Quick Hospital Logo presets
const HOSPITAL_LOGO_PRESETS = [
  { name: 'Apollo Hospitals', logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=200&q=80' },
  { name: 'Fortis Healthcare', logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=200&q=80' },
  { name: 'Medica Superspecialty', logo: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=200&q=80' },
  { name: 'AMRI Hospitals', logo: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=200&q=80' },
  { name: 'Woodlands Multispeciality', logo: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=200&q=80' },
  { name: 'Peerless Hospital', logo: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=200&q=80' },
  { name: 'Ruby General Hospital', logo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80' }
];

// Crisp, verified paramedical image presets for 1-click selection
const IMAGE_PRESETS = [
  {
    label: 'DMLT Pathology Lab',
    url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Radiology & CT Scan',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Dialysis & Renal Care',
    url: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Operation Theatre (OT)',
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Critical Care & ICU',
    url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'London Fellowships',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Hospital Ward & Care',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80'
  }
];

const COLOR_SWATCHES = [
  { label: 'Emerald Green', hex: '#00A54F' },
  { label: 'Royal Navy', hex: '#2E328D' },
  { label: 'Amber Gold', hex: '#F59E0B' },
  { label: 'Crimson Red', hex: '#DC2626' },
  { label: 'Ocean Blue', hex: '#0284C7' },
  { label: 'Teal Forest', hex: '#059669' },
  { label: 'Imperial Purple', hex: '#7C3AED' }
];

export const AdminDashboardPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'slides' | 'courses' | 'facilities' | 'demos' | 'achievements' | 'blogs' | 'placements' | 'partners' | 'seo' | 'reviews' | 'rooms' | 'announcements' | 'enquiries' | 'audit' | 'ci4'
  >('courses');

  // Data states
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [facilities, setFacilities] = useState<FacilityItem[]>([]);
  const [demoVideos, setDemoVideos] = useState<DemoVideo[]>([]);
  const [studentAchievements, setStudentAchievements] = useState<StudentAchievement[]>([]);
  const [studentFeed, setStudentFeed] = useState<StudentFeedItem[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [placements, setPlacements] = useState<PlacementRecord[]>([]);
  const [partnerHospitals, setPartnerHospitals] = useState<PartnerHospital[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [rooms, setRooms] = useState<StudyRoom[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({
    siteName: 'CIHM Kolkata',
    seoTitle: 'Top Paramedical College in Kolkata | CIHM - Best Healthcare & Medical Institute',
    metaDescription: 'Central Institute of Healthcare & Management (CIHM) is ranked among Kolkata\'s top paramedical colleges with 100% practical hospital clinical training.',
    keywords: 'kolkata top college, best paramedical college in kolkata, top paramedical college kolkata, DMLT college kolkata, healthcare institute kolkata',
    contactPhone: '+91 9073737888',
    contactEmail: 'admissions@cihm.in',
    campusAddress: 'Dum Dum / Salt Lake Sector V, Kolkata, West Bengal 700091'
  });
  const [editingSEO, setEditingSEO] = useState<any>({ ...siteSettings });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  // Course Modal state
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [courseFilterTab, setCourseFilterTab] = useState<'all' | 'highlighted' | 'standard'>('all');
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState('All');

  // Facilities Modal state
  const [facilityModalOpen, setFacilityModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Partial<FacilityItem> | null>(null);

  // Demo Videos Modal state
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [editingDemo, setEditingDemo] = useState<Partial<DemoVideo> | null>(null);

  // Student Achievement Modal state
  const [achievementModalOpen, setAchievementModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Partial<StudentAchievement> | null>(null);

  // Hero Slide Modal state
  const [slideModalOpen, setSlideModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);

  // Partner Hospital Modal state
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partial<PartnerHospital> | null>(null);

  // Placement / Pass Out Student Modal state
  const [placementModalOpen, setPlacementModalOpen] = useState(false);
  const [editingPlacement, setEditingPlacement] = useState<Partial<PlacementRecord> | null>(null);

  // Check auth session
  useEffect(() => {
    const saved = sessionStorage.getItem('cihm_admin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
      loadAllAdminData();
    }
  }, []);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: 'Bearer cihm-admin-session-active',
    'x-admin-token': 'cihm-admin-session-active'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'cihm2024') {
      setIsAuthenticated(true);
      sessionStorage.setItem('cihm_admin_auth', 'true');
      sessionStorage.setItem('cihm_admin_token', 'cihm-admin-session-active');
      setAuthError('');
      loadAllAdminData();
    } else {
      setAuthError('Incorrect administration passcode. Try "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cihm_admin_auth');
    sessionStorage.removeItem('cihm_admin_token');
  };

  const loadAllAdminData = async () => {
    setLoading(true);
    const safeFetchJson = async (url: string) => {
      try {
        const res = await fetch(url, { headers: getAuthHeaders() });
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          return await res.json();
        }
        return { success: false, data: [] };
      } catch {
        return { success: false, data: [] };
      }
    };

    try {
      const [
        resSlides,
        resCourses,
        resBlogs,
        resPlacements,
        resPartners,
        resReviews,
        resRooms,
        resAnnouncements,
        resEnquiries,
        resAudit,
        resSettings,
        resFacilities,
        resDemoVideos,
        resAchievements,
        resFeed
      ] = await Promise.all([
        safeFetchJson('/api/hero-slides'),
        safeFetchJson('/api/courses'),
        safeFetchJson('/api/blogs'),
        safeFetchJson('/api/placements'),
        safeFetchJson('/api/partner-hospitals'),
        safeFetchJson('/api/reviews'),
        safeFetchJson('/api/study-rooms'),
        safeFetchJson('/api/announcements'),
        safeFetchJson('/api/enquiries'),
        safeFetchJson('/api/audit-logs'),
        safeFetchJson('/api/site-settings'),
        safeFetchJson('/api/facilities'),
        safeFetchJson('/api/demo-videos'),
        safeFetchJson('/api/student-achievements'),
        safeFetchJson('/api/student-feed')
      ]);

      if (resSlides.success) setHeroSlides(resSlides.data);
      if (resCourses.success) setCourses(resCourses.data);
      if (resBlogs.success) setBlogs(resBlogs.data);
      if (resPlacements.success) setPlacements(resPlacements.data);
      if (resPartners.success) setPartnerHospitals(resPartners.data);
      if (resReviews.success) setReviews(resReviews.data?.reviews || []);
      if (resRooms.success) setRooms(resRooms.data);
      if (resAnnouncements.success) setAnnouncements(resAnnouncements.data);
      if (resEnquiries.success) setEnquiries(resEnquiries.data);
      if (resAudit.success) setAuditLogs(resAudit.data);
      if (resFacilities.success) setFacilities(resFacilities.data);
      if (resDemoVideos.success) setDemoVideos(resDemoVideos.data);
      if (resAchievements.success) setStudentAchievements(resAchievements.data);
      if (resFeed.success) setStudentFeed(resFeed.data);
      if (resSettings.success && resSettings.data) {
        setSiteSettings(resSettings.data);
        setEditingSEO(resSettings.data);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // -------------------------------------------------------------
  // Course Management: Create, Edit, Delete
  // -------------------------------------------------------------
  const handleOpenAddCourse = () => {
    setEditingCourse({
      name: '',
      slug: '',
      category: 'Diagnostic & Laboratory Sciences',
      duration: '2 Years (4 Semesters)',
      batchYear: '2026–27',
      accentColor: '#00A54F',
      badgeText: 'Admissions Open 2026–27',
      badgeColor: '#00A54F',
      fees: '₹75,000 / year',
      eligibility: '10+2 with Physics, Chemistry & Biology (PCB)',
      shortDescription: '',
      overview: '',
      image: IMAGE_PRESETS[0].url,
      admissionCtaText: 'Apply for 2026–27',
      featured: true,
      highlighted: true,
      isNewLaunch: true,
      showOnHome: true,
      status: 'published'
    });
    setCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course: Course) => {
    setEditingCourse({ ...course });
    setCourseModalOpen(true);
  };

  const handleToggleCourseHighlight = async (c: Course) => {
    const newHighlight = !c.highlighted;
    try {
      const res = await fetch(`/api/courses/${c.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...c,
          highlighted: newHighlight,
          isNewLaunch: newHighlight,
          showOnHome: newHighlight
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotify(
          newHighlight
            ? `⭐ "${c.name}" is now HIGHLY HIGHLIGHTED on the Home Page & Slider!`
            : `"${c.name}" will now appear normally on the Courses Page only.`
        );
        setCourses((prev) =>
          prev.map((item) =>
            item.id === c.id
              ? { ...item, highlighted: newHighlight, isNewLaunch: newHighlight, showOnHome: newHighlight }
              : item
          )
        );
      } else {
        showNotify(data.message || 'Failed to update highlight status');
      }
    } catch {
      showNotify('Error toggling course highlight status');
    }
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse.name) {
      showNotify('Please provide a course name');
      return;
    }

    const slug =
      editingCourse.slug?.trim() ||
      editingCourse.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const isHighlight = editingCourse.highlighted === true;

    const payload = {
      ...editingCourse,
      name: editingCourse.name,
      slug,
      image: editingCourse.image || IMAGE_PRESETS[0].url,
      shortDescription: editingCourse.shortDescription || editingCourse.name,
      fullDescription: editingCourse.fullDescription || editingCourse.shortDescription || editingCourse.name,
      overview: editingCourse.overview || editingCourse.shortDescription || editingCourse.name,
      curriculum: editingCourse.curriculum || [],
      skills: editingCourse.skills || ['Clinical Procedures', 'Diagnostics', 'Patient Care'],
      jobRoles: editingCourse.jobRoles || ['Healthcare Technologist', 'Clinical Specialist'],
      careerOpportunities: editingCourse.careerOpportunities || ['Multi-Specialty Hospitals', 'Diagnostic Labs'],
      faqs: editingCourse.faqs || [],
      relatedCourseSlugs: editingCourse.relatedCourseSlugs || [],
      gallery: editingCourse.gallery || [],
      practicalTraining: editingCourse.practicalTraining || 'Hospital hands-on rotations',
      clinicalExposure: editingCourse.clinicalExposure || 'Affiliated hospital wards',
      internship: editingCourse.internship || '6-month certified internship',
      seoTitle: `${editingCourse.name} - CIHM Kolkata`,
      metaDescription: editingCourse.shortDescription || `Study ${editingCourse.name} at CIHM Kolkata`,
      focusKeyword: editingCourse.name,
      secondaryKeywords: ['paramedical admission', 'kolkata healthcare'],
      canonicalUrl: `https://cihm.in/courses/${slug}`,
      ogTitle: editingCourse.name,
      ogDescription: editingCourse.shortDescription || '',
      ogImage: editingCourse.image || IMAGE_PRESETS[0].url,
      schemaType: 'Course' as const,
      featured: editingCourse.featured !== false,
      highlighted: isHighlight,
      isNewLaunch: isHighlight || editingCourse.isNewLaunch === true,
      showOnHome: isHighlight,
      status: editingCourse.status || 'published'
    };

    try {
      if (editingCourse.id) {
        // Update existing course
        const res = await fetch(`/api/courses/${editingCourse.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Course "${payload.name}" updated successfully!`);
          setCourseModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to update course');
        }
      } else {
        // Create new course
        const res = await fetch('/api/courses', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`New course "${payload.name}" created successfully!`);
          setCourseModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to create course');
        }
      }
    } catch (err) {
      console.error(err);
      showNotify('Error saving course');
    }
  };

  const handleDeleteCourse = async (courseId: string, courseName: string) => {
    if (!window.confirm(`Are you sure you want to permanently remove "${courseName}"?`)) return;
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showNotify(`Course "${courseName}" removed.`);
        loadAllAdminData();
      } else {
        showNotify(data.message || 'Failed to delete course');
      }
    } catch {
      showNotify('Error deleting course');
    }
  };

  // -------------------------------------------------------------
  // Hero Slide Management: Create, Edit, Toggle, Delete
  // -------------------------------------------------------------
  const handleOpenAddSlide = () => {
    setEditingSlide({
      headline: '',
      subheadline: '',
      year: '2026–27',
      badgeColor: '#00A54F',
      description: '',
      image: IMAGE_PRESETS[0].url,
      altText: '',
      ctaText: 'Explore Syllabus',
      ctaUrl: '/courses',
      secondaryCtaText: 'Hospital Postings',
      secondaryCtaUrl: '/placements',
      order: heroSlides.length + 1,
      enabled: true
    });
    setSlideModalOpen(true);
  };

  const handleOpenEditSlide = (slide: HeroSlide) => {
    setEditingSlide({ ...slide });
    setSlideModalOpen(true);
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide || !editingSlide.headline) {
      showNotify('Please provide a slide headline');
      return;
    }

    const payload = {
      ...editingSlide,
      image: editingSlide.image || IMAGE_PRESETS[0].url,
      altText: editingSlide.altText || editingSlide.headline,
      ctaUrl: editingSlide.ctaUrl || '/courses',
      ctaText: editingSlide.ctaText || 'Explore Syllabus',
      enabled: editingSlide.enabled !== false
    };

    try {
      if (editingSlide.id) {
        // Update
        const res = await fetch(`/api/hero-slides/${editingSlide.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showNotify('Hero slide updated successfully!');
          setSlideModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to update slide');
        }
      } else {
        // Create
        const res = await fetch('/api/hero-slides', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showNotify('New hero slide added successfully!');
          setSlideModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to create slide');
        }
      }
    } catch {
      showNotify('Error saving hero slide');
    }
  };

  const handleToggleSlide = async (slide: HeroSlide) => {
    try {
      const res = await fetch(`/api/hero-slides/${slide.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...slide, enabled: !slide.enabled })
      });
      const data = await res.json();
      if (data.success) {
        setHeroSlides((prev) =>
          prev.map((s) => (s.id === slide.id ? { ...s, enabled: !s.enabled } : s))
        );
        showNotify(`Slide is now ${!slide.enabled ? 'Active' : 'Hidden'}`);
      }
    } catch {
      showNotify('Failed to update slide');
    }
  };

  const handleDeleteSlide = async (slideId: string, headline: string) => {
    if (!window.confirm(`Are you sure you want to delete slide: "${headline}"?`)) return;
    try {
      const res = await fetch(`/api/hero-slides/${slideId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showNotify('Hero slide deleted successfully');
        loadAllAdminData();
      } else {
        showNotify(data.message || 'Failed to delete slide');
      }
    } catch {
      showNotify('Error deleting hero slide');
    }
  };

  // -------------------------------------------------------------
  // Partner Hospitals & Logos: CRUD
  // -------------------------------------------------------------
  const handleOpenAddPartner = () => {
    setEditingPartner({
      name: '',
      logo: HOSPITAL_LOGO_PRESETS[0].logo,
      type: 'Hospital Partner',
      location: 'Kolkata, WB',
      moUYear: '2026–27',
      bedCapacity: '500',
      active: true,
      hiringDepartments: ['Clinical Pathology', 'Radiology', 'Dialysis', 'Operation Theatre']
    });
    setPartnerModalOpen(true);
  };

  const handleOpenEditPartner = (p: PartnerHospital) => {
    setEditingPartner({ ...p });
    setPartnerModalOpen(true);
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner || !editingPartner.name) {
      showNotify('Please enter the hospital partner name');
      return;
    }
    const payload = {
      ...editingPartner,
      logo: editingPartner.logo || HOSPITAL_LOGO_PRESETS[0].logo,
      type: editingPartner.type || 'Multispecialty Hospital',
      location: editingPartner.location || 'Kolkata, WB',
      active: editingPartner.active !== false
    };

    try {
      if (editingPartner.id) {
        const res = await fetch(`/api/admin/partner-hospitals/${editingPartner.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Partner hospital "${payload.name}" updated!`);
          setPartnerModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to update partner hospital');
        }
      } else {
        const res = await fetch('/api/admin/partner-hospitals', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Partner hospital "${payload.name}" added!`);
          setPartnerModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to add partner hospital');
        }
      }
    } catch {
      showNotify('Error saving partner hospital');
    }
  };

  const handleDeletePartner = async (hospId: string, hospName: string) => {
    if (!window.confirm(`Permanently remove hospital partner "${hospName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/partner-hospitals/${hospId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showNotify(`Hospital partner "${hospName}" removed.`);
        loadAllAdminData();
      } else {
        showNotify(data.message || 'Failed to delete partner');
      }
    } catch {
      showNotify('Error deleting partner hospital');
    }
  };

  // -------------------------------------------------------------
  // Pass Out Students & Placements: CRUD
  // -------------------------------------------------------------
  const handleOpenAddPlacement = () => {
    setEditingPlacement({
      studentName: '',
      studentImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      courseName: 'Diploma in Medical Laboratory Technology (DMLT)',
      organization: 'Apollo Multispecialty Hospitals',
      hospitalName: 'Apollo Multispecialty Hospitals',
      hospitalLogo: HOSPITAL_LOGO_PRESETS[0].logo,
      role: 'Clinical Laboratory Technologist',
      batchYear: '2026',
      salaryPackage: '₹3.6 LPA',
      testimonial: 'CIHM practical training prepared me for immediate clinical duties.',
      verified: true
    });
    setPlacementModalOpen(true);
  };

  const handleOpenEditPlacement = (p: PlacementRecord) => {
    setEditingPlacement({ ...p });
    setPlacementModalOpen(true);
  };

  const handleSavePlacement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlacement || !editingPlacement.studentName) {
      showNotify('Please enter the student name');
      return;
    }
    const payload = {
      ...editingPlacement,
      organization: editingPlacement.organization || editingPlacement.hospitalName || 'Partner Hospital',
      hospitalName: editingPlacement.hospitalName || editingPlacement.organization || 'Partner Hospital',
      verified: editingPlacement.verified !== false
    };

    try {
      if (editingPlacement.id) {
        const res = await fetch(`/api/admin/placements/${editingPlacement.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Placement for "${payload.studentName}" updated!`);
          setPlacementModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to update placement');
        }
      } else {
        const res = await fetch('/api/admin/placements', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Placement for "${payload.studentName}" added!`);
          setPlacementModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to add placement');
        }
      }
    } catch {
      showNotify('Error saving placement record');
    }
  };

  const handleDeletePlacement = async (plcId: string, studentName: string) => {
    if (!window.confirm(`Delete placement record for "${studentName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/placements/${plcId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showNotify(`Placement for "${studentName}" removed.`);
        loadAllAdminData();
      } else {
        showNotify(data.message || 'Failed to remove placement');
      }
    } catch {
      showNotify('Error removing placement record');
    }
  };

  // -------------------------------------------------------------
  // Facilities & Labs Handlers
  // -------------------------------------------------------------
  const handleOpenAddFacility = () => {
    setEditingFacility({
      title: '',
      department: 'Pathology & DMLT',
      category: 'Diagnostic Lab',
      description: '',
      equipment: ['Automated Biochemistry Analyzer', '5-Part Hematology Counter'],
      capacity: '35 Students / Shift',
      practicalHours: '650+ Practical Hours',
      imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1000&q=80',
      demoVideoId: 'demo-1',
      featured: true,
      order: (facilities.length || 0) + 1
    });
    setFacilityModalOpen(true);
  };

  const handleOpenEditFacility = (f: FacilityItem) => {
    setEditingFacility({ ...f });
    setFacilityModalOpen(true);
  };

  const handleSaveFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFacility || !editingFacility.title) {
      showNotify('Please enter facility title');
      return;
    }
    try {
      if (editingFacility.id) {
        const res = await fetch(`/api/admin/facilities/${editingFacility.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(editingFacility)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Facility "${editingFacility.title}" updated!`);
          setFacilityModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to update facility');
        }
      } else {
        const res = await fetch('/api/admin/facilities', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(editingFacility)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Facility "${editingFacility.title}" created!`);
          setFacilityModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to create facility');
        }
      }
    } catch {
      showNotify('Error saving facility');
    }
  };

  const handleDeleteFacility = async (facId: string, title: string) => {
    if (!window.confirm(`Delete facility "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/facilities/${facId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showNotify(`Facility "${title}" removed.`);
        loadAllAdminData();
      } else {
        showNotify(data.message || 'Failed to remove facility');
      }
    } catch {
      showNotify('Error removing facility');
    }
  };

  // -------------------------------------------------------------
  // Demo Videos Handlers
  // -------------------------------------------------------------
  const handleOpenAddDemo = () => {
    setEditingDemo({
      title: '',
      category: 'Clinical Lab Practical',
      department: 'Pathology & DMLT',
      duration: '15 mins',
      instructor: 'Dr. Debasish Roy',
      instructorTitle: 'Senior Pathologist & Clinical Lab Director',
      videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
      description: 'Hands-on practical walkthrough of laboratory diagnostics.',
      featured: true,
      viewsCount: 1200,
      keyLearnings: ['Analyzer Calibration', 'Patient Safety Protocol', 'NABL Quality Standards']
    });
    setDemoModalOpen(true);
  };

  const handleOpenEditDemo = (v: DemoVideo) => {
    setEditingDemo({ ...v });
    setDemoModalOpen(true);
  };

  const handleSaveDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDemo || !editingDemo.title) {
      showNotify('Please enter demo video title');
      return;
    }
    try {
      if (editingDemo.id) {
        const res = await fetch(`/api/admin/demo-videos/${editingDemo.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(editingDemo)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Demo video "${editingDemo.title}" updated!`);
          setDemoModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to update demo video');
        }
      } else {
        const res = await fetch('/api/admin/demo-videos', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(editingDemo)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Demo video "${editingDemo.title}" added!`);
          setDemoModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to add demo video');
        }
      }
    } catch {
      showNotify('Error saving demo video');
    }
  };

  const handleDeleteDemo = async (demoId: string, title: string) => {
    if (!window.confirm(`Delete demo video "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/demo-videos/${demoId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showNotify(`Demo video "${title}" removed.`);
        loadAllAdminData();
      } else {
        showNotify(data.message || 'Failed to remove demo video');
      }
    } catch {
      showNotify('Error deleting demo video');
    }
  };

  // -------------------------------------------------------------
  // Student Achievements & Feed Handlers
  // -------------------------------------------------------------
  const handleOpenAddAchievement = () => {
    setEditingAchievement({
      studentName: '',
      course: 'Diploma in Medical Laboratory Technology (DMLT)',
      badge: 'State Rank 1 & Gold Medal',
      year: 'Batch 2024',
      achievement: 'Awarded State Paramedical Excellence Gold Medal for highest score in Clinical Pathology.',
      organizationOrHospital: 'Super-Specialty Diagnostic Center, Kolkata',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
      featured: true
    });
    setAchievementModalOpen(true);
  };

  const handleOpenEditAchievement = (a: StudentAchievement) => {
    setEditingAchievement({ ...a });
    setAchievementModalOpen(true);
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement || !editingAchievement.studentName) {
      showNotify('Please enter student name');
      return;
    }
    try {
      if (editingAchievement.id) {
        const res = await fetch(`/api/admin/student-achievements/${editingAchievement.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(editingAchievement)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Achievement for "${editingAchievement.studentName}" updated!`);
          setAchievementModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to update achievement');
        }
      } else {
        const res = await fetch('/api/admin/student-achievements', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(editingAchievement)
        });
        const data = await res.json();
        if (data.success) {
          showNotify(`Achievement for "${editingAchievement.studentName}" created!`);
          setAchievementModalOpen(false);
          loadAllAdminData();
        } else {
          showNotify(data.message || 'Failed to create achievement');
        }
      }
    } catch {
      showNotify('Error saving achievement');
    }
  };

  const handleDeleteAchievement = async (achId: string, name: string) => {
    if (!window.confirm(`Delete achievement for "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/student-achievements/${achId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showNotify(`Achievement for "${name}" removed.`);
        loadAllAdminData();
      } else {
        showNotify(data.message || 'Failed to delete achievement');
      }
    } catch {
      showNotify('Error deleting achievement');
    }
  };

  const handleDeleteFeedPost = async (feedId: string) => {
    if (!window.confirm('Delete this student feed post?')) return;
    try {
      const res = await fetch(`/api/admin/student-feed/${feedId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (data.success) {
        showNotify('Student feed post deleted.');
        loadAllAdminData();
      } else {
        showNotify(data.message || 'Failed to delete feed post');
      }
    } catch {
      showNotify('Error deleting feed post');
    }
  };

  // -------------------------------------------------------------
  // SEO & Ranking Settings Save
  // -------------------------------------------------------------
  const handleSaveSEO = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(editingSEO)
      });
      const data = await res.json();
      if (data.success) {
        setSiteSettings(editingSEO);
        showNotify('SEO metadata and keywords updated successfully!');
      } else {
        showNotify(data.message || 'Failed to update SEO settings');
      }
    } catch {
      showNotify('Error updating SEO settings');
    }
  };

  // Export DB Backup JSON
  const handleExportBackup = () => {
    const fullBackup = {
      heroSlides,
      courses,
      blogs,
      placements,
      reviews,
      rooms,
      announcements,
      enquiries,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cihm-backup-${Date.now()}.json`;
    a.click();
    showNotify('Database backup JSON exported');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <SEOHelmet
          title="CIHM Administration Panel Login"
          description="Institutional admin panel for CIHM Kolkata"
          noindex={true}
        />
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-xl space-y-5">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2E328D] flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-[#2E328D]">CIHM Institutional Admin</h2>
            <p className="text-xs text-slate-500">
              Manage courses, annual batch years, colors, hero slides & hospital placements.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-xl">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Security Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. admin123)"
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#2E328D] hover:bg-[#252973] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Sign In to Admin Console
            </button>
          </form>

          <p className="text-[11px] text-slate-400 text-center">
            Default pass: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <SEOHelmet
        title="CIHM Institutional Administration Console"
        description="Admin panel for managing CIHM Kolkata courses, batch years, colors, and media"
        noindex={true}
      />

      <Breadcrumbs items={[{ label: 'Admin Console' }]} />

      {/* Top Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A54F] animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-[#2E328D]">
              CIHM Academic & Content Management Console
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Add/Remove courses, configure batch years, accent colors & live hero slides.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportBackup}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>
          <button
            onClick={loadAllAdminData}
            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2E328D] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 bg-green-50 text-[#00A54F] text-xs font-bold rounded-xl border border-green-200 shadow-xs animate-in fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-b border-slate-200">
        {[
          { id: 'courses', label: 'Course Management & Highlights', icon: BookOpen, count: courses.length },
          { id: 'facilities', label: 'Facilities & Demo Labs', icon: Building2, count: facilities.length },
          { id: 'demos', label: 'Demo Classes Videos', icon: Film, count: demoVideos.length },
          { id: 'achievements', label: 'Student Achievers & Feed', icon: Trophy, count: studentAchievements.length },
          { id: 'slides', label: 'Hero Slides & Colors', icon: Sliders, count: heroSlides.length },
          { id: 'partners', label: 'Hospital Partners & Logos', icon: Building2, count: partnerHospitals.length },
          { id: 'placements', label: 'Pass Out Students & Placements', icon: Hospital, count: placements.length },
          { id: 'seo', label: 'SEO & Kolkata Top Ranking', icon: Globe2, count: 1 },
          { id: 'blogs', label: 'Clinical Blogs', icon: FileText, count: blogs.length },
          { id: 'reviews', label: 'Testimonials', icon: Star, count: reviews.length },
          { id: 'enquiries', label: 'Lead Inquiries', icon: Inbox, count: enquiries.length },
          { id: 'rooms', label: 'Study Rooms', icon: Users, count: rooms.length },
          { id: 'announcements', label: 'Notice Board', icon: Bell, count: announcements.length },
          { id: 'ci4', label: 'React • Node • CI4 Stack', icon: Server, count: 'PHP' },
          { id: 'audit', label: 'Audit Trail', icon: History, count: auditLogs.length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-t-xl font-bold text-xs flex items-center gap-1.5 whitespace-nowrap transition-colors border-t border-x cursor-pointer ${
                isActive
                  ? 'bg-white text-[#2E328D] border-slate-200 -mb-px shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00A54F]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-blue-100 text-[#2E328D]' : 'bg-slate-200 text-slate-600'}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        {/* ========================================================= */}
        {/* 1. COURSES MANAGEMENT & HOME HIGHLIGHTS (ADD, EDIT, DELETE, HIGHLIGHT) */}
        {/* ========================================================= */}
        {activeTab === 'courses' && (() => {
          const highlightedCount = courses.filter((c) => c.highlighted).length;
          const standardCount = courses.length - highlightedCount;
          const uniqueCategories = Array.from(new Set(courses.map((c) => c.category).filter(Boolean)));

          const filteredCourses = courses.filter((c) => {
            // Tab filter
            if (courseFilterTab === 'highlighted' && !c.highlighted) return false;
            if (courseFilterTab === 'standard' && c.highlighted) return false;

            // Category filter
            if (courseCategoryFilter !== 'All' && c.category !== courseCategoryFilter) return false;

            // Search query
            if (courseSearchQuery.trim()) {
              const q = courseSearchQuery.toLowerCase();
              const name = (c.name || c.title || '').toLowerCase();
              const cat = (c.category || '').toLowerCase();
              const desc = (c.shortDescription || c.overview || '').toLowerCase();
              const slug = (c.slug || '').toLowerCase();
              if (!name.includes(q) && !cat.includes(q) && !desc.includes(q) && !slug.includes(q)) {
                return false;
              }
            }

            return true;
          });

          return (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-xl font-black text-[#2E328D] flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#00A54F]" />
                      <span>Course Management & Home Highlights</span>
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2E328D] border border-blue-200">
                      {courses.length} Total Programs
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>{highlightedCount} Highlighted on Home</span>
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {standardCount} Standard
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Add new courses, edit academic curriculum, update admission batch years, remove programs, and toggle which courses are <strong>highlighted on the Home Page & Hero Slider</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleOpenAddCourse}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Course</span>
                  </button>
                </div>
              </div>

              {/* ⭐ Home Page & Hero Slider Highlight Status Widget */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-blue-50/70 border border-emerald-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <Star className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900">
                        Home Page & Hero Slider Highlight Status ({highlightedCount} Active)
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Courses marked as <strong>⭐ Highlighted</strong> are featured in the Home Page Hero Section, Hero Slider, and Image Buttons. Courses left as <strong>☆ Course Page Only</strong> appear in the full catalog at <code>/courses</code>.
                      </p>
                    </div>
                  </div>
                  {highlightedCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setCourseFilterTab('highlighted')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline self-start sm:self-auto cursor-pointer"
                    >
                      Filter highlighted ({highlightedCount})
                    </button>
                  )}
                </div>

                {/* Live Preview Strip of Currently Highlighted Courses */}
                {highlightedCount > 0 ? (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1">
                    {courses
                      .filter((c) => c.highlighted)
                      .map((c) => (
                        <div
                          key={`highlight-strip-${c.id}`}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white border border-emerald-300 shadow-xs flex-shrink-0 group hover:border-emerald-500 transition-colors"
                        >
                          <img
                            src={c.image}
                            alt={c.name}
                            className="w-9 h-9 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                          />
                          <div className="max-w-[170px] truncate">
                            <span className="text-[11px] font-black text-slate-900 block truncate group-hover:text-emerald-700">
                              {c.name}
                            </span>
                            <span className="text-[9.5px] text-slate-500 block truncate">
                              {c.category} • {c.batchYear || '2026–27'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleCourseHighlight(c)}
                            className="ml-1 p-1 rounded-md text-amber-500 hover:text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Click to remove from Home Page"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="p-3 bg-white/80 rounded-xl border border-dashed border-emerald-300 text-xs text-slate-600 flex items-center justify-between">
                    <span>
                      💡 No courses are currently highlighted on the Home Page. Click the <strong>☆ Course Page Only</strong> button on any course card below to highlight it!
                    </span>
                  </div>
                )}
              </div>

              {/* Filter & Search Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                {/* Status Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start overflow-x-auto max-w-full">
                  <button
                    type="button"
                    onClick={() => setCourseFilterTab('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      courseFilterTab === 'all'
                        ? 'bg-white text-[#2E328D] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Programs ({courses.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCourseFilterTab('highlighted')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                      courseFilterTab === 'highlighted'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-emerald-700'
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>⭐ Highlighted ({highlightedCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCourseFilterTab('standard')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      courseFilterTab === 'standard'
                        ? 'bg-white text-[#2E328D] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ☆ Standard ({standardCount})
                  </button>
                </div>

                {/* Search & Category Filter */}
                <div className="flex items-center gap-2 flex-1 sm:max-w-md justify-end">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={courseSearchQuery}
                      onChange={(e) => setCourseSearchQuery(e.target.value)}
                      placeholder="Search courses..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                    />
                    {courseSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setCourseSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <select
                    value={courseCategoryFilter}
                    onChange={(e) => setCourseCategoryFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#00A54F]"
                  >
                    <option value="All">All Categories</option>
                    {uniqueCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Course Cards Grid */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCourses.map((c) => {
                    const accent = c.accentColor || '#00A54F';
                    const year = c.batchYear || c.academicYear || '2026–27';

                    return (
                      <div
                        key={c.id}
                        className={`p-4 rounded-2xl border transition-all shadow-xs flex flex-col justify-between group relative overflow-hidden bg-white ${
                          c.highlighted
                            ? 'border-emerald-300 ring-2 ring-emerald-400/20 hover:border-emerald-400'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Top Color Accent Strip */}
                        <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: accent }} />

                        <div>
                          {/* Image + Meta */}
                          <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-slate-100">
                            <img
                              src={c.image}
                              alt={c.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2 flex items-center gap-1 flex-wrap">
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-black text-white shadow-xs"
                                style={{ backgroundColor: accent }}
                              >
                                {c.category}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-white backdrop-blur-none">
                                {year}
                              </span>
                            </div>

                            {c.highlighted && (
                              <div className="absolute bottom-2 right-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[9.5px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-white" />
                                <span>Home Launch</span>
                              </div>
                            )}
                          </div>

                          <h4 className="font-bold text-sm text-[#2E328D] leading-snug line-clamp-2">
                            {c.name || c.title}
                          </h4>

                          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                            {c.shortDescription || c.overview}
                          </p>

                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                            <span className="font-semibold">{c.duration}</span>
                            {c.fees && <span className="font-bold text-[#00A54F]">{c.fees}</span>}
                          </div>

                          {/* Highlight on Home Page Toggle */}
                          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1">
                            <span className="text-[10px] text-slate-500 font-bold">Home Page & Hero:</span>
                            <button
                              type="button"
                              onClick={() => handleToggleCourseHighlight(c)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                                c.highlighted
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-300/50'
                                  : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200'
                              }`}
                              title={
                                c.highlighted
                                  ? 'Currently shown on Home Page & Hero Slider. Click to unhighlight.'
                                  : 'Currently shown on Course Page only. Click to highlight on Home Page & Hero Slider.'
                              }
                            >
                              <Star className={`w-3 h-3 ${c.highlighted ? 'fill-white' : ''}`} />
                              <span>{c.highlighted ? '⭐ Highlighted' : '☆ Course Page Only'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleOpenEditCourse(c)}
                            className="flex-1 py-1.5 rounded-lg bg-blue-50 hover:bg-[#2E328D] text-[#2E328D] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit Course</span>
                          </button>

                          <button
                            onClick={() => handleDeleteCourse(c.id, c.name || c.title || 'Course')}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                            title="Remove Course"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
                  <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-700">No courses match your filter criteria</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try clearing your search query or selecting a different category/status tab.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCourseFilterTab('all');
                      setCourseSearchQuery('');
                      setCourseCategoryFilter('All');
                    }}
                    className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* ========================================================= */}
        {/* 🏥 FACILITIES & LAB WORKSTATIONS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#2E328D] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#00A54F]" />
                  <span>Practical Facilities & Diagnostic Labs</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#2E328D]">
                    {facilities.length} Facilities
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Manage hospital-grade training workstations, diagnostic labs, equipment lists, and linked demo video classes.
                </p>
              </div>
              <button
                onClick={handleOpenAddFacility}
                className="px-4 py-2 bg-[#00A54F] hover:bg-[#009245] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Facility</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((fac) => (
                <div
                  key={fac.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-slate-900">
                      <img src={fac.imageUrl} alt={fac.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/95 text-[#1E3A8A]">
                          {fac.department}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white">
                          {fac.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2.5">
                      <h4 className="text-sm font-black text-slate-900 leading-snug">{fac.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{fac.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100">
                        <span className="text-slate-500">
                          Capacity: <strong className="text-slate-800">{fac.capacity}</strong>
                        </span>
                        <span className="text-slate-500">
                          Hours: <strong className="text-emerald-700">{fac.practicalHours}</strong>
                        </span>
                      </div>

                      {fac.equipment && fac.equipment.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {fac.equipment.slice(0, 3).map((eq, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                              ✓ {eq}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenEditFacility(fac)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Facility</span>
                    </button>
                    <button
                      onClick={() => handleDeleteFacility(fac.id, fac.title)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                      title="Delete facility"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 🎬 DEMO CLASSES & PRACTICAL VIDEOS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'demos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#2E328D] flex items-center gap-2">
                  <Film className="w-5 h-5 text-rose-600" />
                  <span>Practical Demo Classes Video Library</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700">
                    {demoVideos.length} Videos
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload practical laboratory demonstrations, clinical procedure walkthroughs, and facility tours.
                </p>
              </div>
              <button
                onClick={handleOpenAddDemo}
                className="px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Demo Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-slate-950">
                      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white">
                          {video.department}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-black/70 text-white backdrop-blur-xs">
                          {video.duration}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <span className="text-[11px] text-slate-200 font-bold block truncate">
                          Instructor: {video.instructor}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="text-sm font-black text-slate-900 leading-snug">{video.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{video.description}</p>
                      <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
                        <span>Category: <strong className="text-slate-700">{video.category}</strong></span>
                        <span>Views: <strong className="text-emerald-600">{video.viewsCount || 0}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenEditDemo(video)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Video</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDemo(video.id, video.title)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                      title="Delete video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 🌟 STUDENT ACHIEVEMENTS & LIVE SOCIAL FEED PULSE MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'achievements' && (
          <div className="space-y-8">
            {/* Achievers Section */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-black text-[#2E328D] flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>Student Hall of Fame & Academic Achievers</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">
                      {studentAchievements.length} Achievers
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage gold medalists, rankers, and hospital placement stars displayed on the homepage.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddAchievement}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Achiever</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {studentAchievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img src={ach.avatar} alt={ach.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-amber-300" />
                        <div>
                          <h4 className="text-sm font-black text-slate-900">{ach.studentName}</h4>
                          <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {ach.badge}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-[#1E3A8A]">{ach.course}</p>
                      <p className="text-xs text-slate-600 mt-2 italic">&quot;{ach.achievement}&quot;</p>
                      <span className="text-[11px] text-slate-400 block mt-2">{ach.year} • {ach.organizationOrHospital}</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenEditAchievement(ach)}
                        className="py-1 px-3 rounded-lg bg-white border border-amber-200 text-amber-800 text-xs font-bold cursor-pointer hover:bg-amber-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAchievement(ach.id, ach.studentName)}
                        className="p-1 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                        title="Delete achievement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Social Feed Moderation */}
            <div className="pt-6 border-t border-slate-200">
              <div className="mb-4">
                <h4 className="text-base font-black text-[#2E328D] flex items-center gap-2">
                  <span>Student Live Social Pulse & Post Moderation</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {studentFeed.length} Posts
                  </span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review student stories, practical lab photos, and comments. You can remove any inappropriate posts.
                </p>
              </div>

              <div className="space-y-3">
                {studentFeed.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <img src={post.avatar} alt={post.authorName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-slate-900">{post.authorName}</span>
                          <span className="text-[10px] text-slate-500">({post.authorRole})</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-bold">
                            {post.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 mt-1 max-w-2xl">{post.content}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          ❤️ {post.likes} Likes • {post.timestamp}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteFeedPost(post.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 flex items-center gap-1 cursor-pointer flex-shrink-0 self-end sm:self-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Post</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. HERO SLIDES MANAGER (ADD, EDIT, DELETE, YEAR & COLOR) */}
        {/* ========================================================= */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#2E328D] flex items-center gap-2">
                  <span>Hero Slides & Cover Photography</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#2E328D]">
                    {heroSlides.length} Slides
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Configure the primary hospital & lab cover photos that slide on the homepage. Change headlines, colors, batch year, and visibility.
                </p>
              </div>

              <button
                onClick={handleOpenAddSlide}
                className="px-4 py-2 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Hero Slide</span>
              </button>
            </div>

            <div className="space-y-4">
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50/60 hover:bg-white transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-900">
                      <img
                        src={slide.image}
                        alt={slide.headline}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] font-black bg-black/80 text-white px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[10px] font-black text-white px-2 py-0.5 rounded-full uppercase"
                          style={{ backgroundColor: slide.badgeColor || '#00A54F' }}
                        >
                          {slide.subheadline}
                        </span>
                        {slide.year && (
                          <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                            {slide.year}
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            slide.enabled ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {slide.enabled ? 'Active / Visible' : 'Hidden'}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#2E328D] mt-1">{slide.headline}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{slide.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center flex-wrap">
                    <button
                      onClick={() => handleToggleSlide(slide)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        slide.enabled
                          ? 'bg-green-100 hover:bg-green-200 text-green-800'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }`}
                    >
                      {slide.enabled ? 'Active' : 'Hidden'}
                    </button>

                    <button
                      onClick={() => handleOpenEditSlide(slide)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2E328D] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteSlide(slide.id, slide.headline)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. BLOGS & CLINICAL ARTICLES */}
        {/* ========================================================= */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-[#2E328D]">Clinical Blog Publications</h3>
                <p className="text-xs text-slate-500">Articles published on healthcare procedures and career tips.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <div key={b.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#2E328D]">{b.title}</h4>
                    <span className="text-slate-400">
                      {b.category} • By {b.authorName} • {b.publishDate}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete blog article?')) {
                        fetch(`/api/admin/blogs/${b.id}`, { method: 'DELETE', headers: getAuthHeaders() }).then(() =>
                          loadAllAdminData()
                        );
                      }
                    }}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. PARTNER HOSPITALS & LOGOS */}
        {/* ========================================================= */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-[#2E328D] flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#00A54F]" />
                  <span>Hospital Partners & Clinical Training Tie-ups ({partnerHospitals.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage affiliated healthcare networks and hospital logos. If in the future you wish to showcase hospital partners and logos, you can add them here.
                </p>
              </div>

              <button
                onClick={handleOpenAddPartner}
                className="px-4 py-2 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Hospital Partner & Logo</span>
              </button>
            </div>

            {/* Privacy & Control Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <Lock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-black text-amber-950">Hospital Names & Logos Display Control</strong>
                <span>
                  By default, specific hospital names and logos are not mentioned or displayed on the public website. If you choose to add partner hospitals here and set their status to <strong>Active</strong>, they will be dynamically displayed in the public clinical partner showcase.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partnerHospitals.map((hosp) => (
                <div
                  key={hosp.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3">
                      <img
                        src={hosp.logo || HOSPITAL_LOGO_PRESETS[0].logo}
                        alt={hosp.name}
                        className="w-14 h-14 rounded-xl object-contain border border-slate-200 p-1 bg-white shadow-2xs flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-extrabold text-[#2E328D] truncate">{hosp.name}</h4>
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase ${
                              hosp.active !== false ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {hosp.active !== false ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-semibold mt-0.5">{hosp.type || 'Hospital Partner'}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{hosp.location || 'Kolkata, WB'}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] space-y-1 text-slate-500">
                      {hosp.bedCapacity && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Bed Capacity:</span>
                          <span className="font-bold text-slate-700">{hosp.bedCapacity}+ Beds</span>
                        </div>
                      )}
                      {hosp.moUYear && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">MoU Session:</span>
                          <span className="font-bold text-[#00A54F]">{hosp.moUYear}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditPartner(hosp)}
                      className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2E328D] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeletePartner(hosp.id, hosp.name)}
                      className="p-1 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                      title="Delete Hospital Partner"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. PASS OUT STUDENTS & PLACEMENTS */}
        {/* ========================================================= */}
        {activeTab === 'placements' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-extrabold text-[#2E328D] flex items-center gap-2">
                  <Hospital className="w-5 h-5 text-[#00A54F]" />
                  <span>Pass Out Students & Placement Records ({placements.length})</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage verified alumni placements, hospital company logos, salary packages, and testimonials.
                </p>
              </div>

              <button
                onClick={handleOpenAddPlacement}
                className="px-4 py-2 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Pass Out Student</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {placements.map((p) => {
                const hospLogo = p.hospitalLogo || HOSPITAL_LOGO_PRESETS[0].logo;
                const org = p.organization || p.hospitalName || 'Partner Hospital';
                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        <img
                          src={p.studentImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                          alt={p.studentName}
                          className="w-13 h-13 rounded-xl object-cover border border-slate-200 shadow-2xs flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-extrabold text-[#2E328D] truncate">{p.studentName}</h4>
                            <span className="text-[9px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded">
                              Placed
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700 mt-0.5">{p.role}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <img
                              src={hospLogo}
                              alt={org}
                              className="w-4 h-4 rounded object-contain border border-slate-200 bg-white"
                            />
                            <span className="text-xs font-bold text-[#00A54F] truncate">{org}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] space-y-1 text-slate-500">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Course:</span>
                          <span className="font-semibold text-slate-700 truncate max-w-[170px]">{p.courseName}</span>
                        </div>
                        {p.batchYear && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Session/Batch:</span>
                            <span className="font-bold text-slate-700">{p.batchYear}</span>
                          </div>
                        )}
                        {p.salaryPackage && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Salary Package:</span>
                            <span className="font-bold text-[#00A54F]">{p.salaryPackage}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditPlacement(p)}
                        className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#2E328D] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeletePlacement(p.id, p.studentName)}
                        className="p-1 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                        title="Delete Placement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. SEO & KOLKATA TOP RANKING */}
        {/* ========================================================= */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#2E328D] flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[#00A54F]" />
                <span>Search Engine Optimization (SEO) & Kolkata Top College Rankings</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Customize meta tags, Google SERP search snippet, keywords, and geographic location to dominate queries like "kolkata top college".
              </p>
            </div>

            {/* Google Search Live Preview Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span>Google Search Live Snippet Preview</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 font-sans space-y-1">
                <div className="text-xs text-emerald-800 flex items-center gap-1">
                  <span>https://cihm.in</span>
                  <span className="text-slate-400">› admissions › paramedical</span>
                </div>
                <div className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer">
                  {editingSEO.seoTitle || 'Top Paramedical College in Kolkata | CIHM - Best Healthcare Institute'}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {editingSEO.metaDescription || 'Central Institute of Healthcare & Management (CIHM) is Kolkata\'s premier paramedical college for DMLT, Radiology, Dialysis, and OT Technology with 100% placement assistance.'}
                </div>
              </div>
            </div>

            {/* SEO Form */}
            <form onSubmit={handleSaveSEO} className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Global Meta Title (Top ranking focus: Kolkata Top College) *
                </label>
                <input
                  type="text"
                  required
                  value={editingSEO.seoTitle || ''}
                  onChange={(e) => setEditingSEO({ ...editingSEO, seoTitle: e.target.value })}
                  placeholder="Top Paramedical College in Kolkata | CIHM Healthcare Institute"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-[#2E328D]"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Character count: {(editingSEO.seoTitle || '').length} / 65 (ideal for Google Search)
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Meta Description (Admissions & Placement highlights) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingSEO.metaDescription || ''}
                  onChange={(e) => setEditingSEO({ ...editingSEO, metaDescription: e.target.value })}
                  placeholder="Central Institute of Healthcare & Management (CIHM) Kolkata offers career-oriented courses in DMLT, Radiology, Dialysis, OT Technology with 100% practical clinical training."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Character count: {(editingSEO.metaDescription || '').length} / 160 (ideal search snippet length)
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Search Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingSEO.keywords || ''}
                  onChange={(e) => setEditingSEO({ ...editingSEO, keywords: e.target.value })}
                  placeholder="kolkata top college, best paramedical college in kolkata, top paramedical institute kolkata, dmlt college kolkata"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Admissions Helpline Phone</label>
                  <input
                    type="text"
                    value={editingSEO.contactPhone || ''}
                    onChange={(e) => setEditingSEO({ ...editingSEO, contactPhone: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Admissions Email</label>
                  <input
                    type="email"
                    value={editingSEO.contactEmail || ''}
                    onChange={(e) => setEditingSEO({ ...editingSEO, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Campus Physical Address (For Local SEO & Maps)</label>
                <input
                  type="text"
                  value={editingSEO.campusAddress || ''}
                  onChange={(e) => setEditingSEO({ ...editingSEO, campusAddress: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save SEO & Search Ranking Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 6. TESTIMONIALS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-[#2E328D]">Student & Parent Reviews</h3>
            <div className="divide-y divide-slate-100">
              {reviews.map((r) => (
                <div key={r.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#2E328D]">
                      {r.reviewerName} {r.roleOrDesignation ? `(${r.roleOrDesignation})` : ''}
                    </h4>
                    <p className="text-slate-500 italic mt-0.5">"{r.reviewText}"</p>
                  </div>
                  <div className="text-amber-500 font-bold">★ {r.rating}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-[#2E328D]">Admissions Inquiries ({enquiries.length})</h3>
            <div className="divide-y divide-slate-100">
              {enquiries.map((e) => (
                <div key={e.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#2E328D]">{e.name} — {e.phone}</h4>
                    <span className="text-slate-400">{e.email} • Program: {e.courseName || 'General'}</span>
                    {e.message && <p className="text-slate-600 mt-1 italic font-normal">"{e.message}"</p>}
                  </div>
                  <span className="px-2 py-1 rounded bg-blue-50 text-[#2E328D] font-bold text-[10px]">
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. STUDY ROOMS */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-[#2E328D]">Virtual Study Rooms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map((rm) => (
                <div key={rm.id} className="p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-sm text-[#2E328D]">{rm.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{rm.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-[#2E328D]">Campus Notice Board</h3>
            <div className="divide-y divide-slate-100">
              {announcements.map((a) => (
                <div key={a.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#2E328D]">{a.title}</h4>
                    <p className="text-slate-500">{a.content}</p>
                  </div>
                  <span className="text-[10px] text-slate-400">{a.date || a.publishDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. AUDIT */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-[#2E328D]">Security Audit Trail</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {auditLogs.slice(0, 30).map((log, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#2E328D]">{log.action || log.event}</span>
                    <span className="text-slate-400 ml-2">{log.description || log.message}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(log.timestamp || log.date).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. REACT • NODE • CI4 FULL STACK INTEGRATION */}
        {activeTab === 'ci4' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A54F] animate-pulse" />
                  <h3 className="text-lg font-black text-[#2E328D]">
                    Unified Stack: React 18 • Node.js • CodeIgniter 4 (CI4) • Tailwind CSS
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Fully integrated multi-tier architecture supporting both Node.js runtime and CodeIgniter 4 PHP RESTful backend.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/api/ci4/export-sql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Database className="w-4 h-4" />
                  <span>Download MySQL Schema (schema.sql)</span>
                </a>
              </div>
            </div>

            {/* Architecture 3-Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Frontend Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2E328D] flex items-center justify-center font-black text-sm">
                    ⚛
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#2E328D]">React 18 + Tailwind</h4>
                    <span className="text-[10px] text-slate-500">Frontend SPA / UI Layer</span>
                  </div>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Hardware-accelerated Mirror Glass Hero Slider</li>
                  <li>Responsive Paramedical Course Directory</li>
                  <li>Hospital Partner Cloud & Placement Registry</li>
                  <li>Real-time Admissions CRM & Study Connect</li>
                </ul>
                <div className="pt-2 border-t border-slate-200/60 text-[11px] font-mono text-slate-500">
                  Folder: <code className="text-[#2E328D] font-bold">/src</code>
                </div>
              </div>

              {/* Node.js Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#00A54F] flex items-center justify-center font-black text-sm">
                    ⬡
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#00A54F]">Node.js + Express</h4>
                    <span className="text-[10px] text-slate-500">Runtime & Vite Server (Port 3000)</span>
                  </div>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Vite dev server middleware & production static server</li>
                  <li>Dynamic XML sitemap & robots.txt SEO generation</li>
                  <li>Server-Sent Events (SSE) live updates</li>
                  <li>JSON database persistence & schema exporter</li>
                </ul>
                <div className="pt-2 border-t border-slate-200/60 text-[11px] font-mono text-slate-500">
                  Entry: <code className="text-[#00A54F] font-bold">server.ts</code>
                </div>
              </div>

              {/* CodeIgniter 4 Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                    🔥
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-amber-800">CodeIgniter 4 (CI4)</h4>
                    <span className="text-[10px] text-slate-500">Enterprise PHP REST API</span>
                  </div>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>RESTful ResourceControllers for all entities</li>
                  <li>Active Record Models (MySQL / MariaDB / Postgres)</li>
                  <li>Automated CORS headers for React frontend</li>
                  <li>Database Migrations & Seeders included</li>
                </ul>
                <div className="pt-2 border-t border-slate-200/60 text-[11px] font-mono text-slate-500">
                  Folder: <code className="text-amber-800 font-bold">/ci4</code>
                </div>
              </div>
            </div>

            {/* CodeIgniter 4 REST API Resource Mapping */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-[#2E328D] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#00A54F]" />
                <span>CodeIgniter 4 REST API Controllers & Endpoints</span>
              </h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="py-2.5 px-4">Entity</th>
                      <th className="py-2.5 px-4">CI4 Controller File</th>
                      <th className="py-2.5 px-4">CI4 Model</th>
                      <th className="py-2.5 px-4">Mapped RESTful Routes</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-[#2E328D]">Hero Slides & Mirror Glass</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">app/Controllers/Api/HeroSlides.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">HeroSlideModel.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-[#00A54F]">GET/POST/PUT/DELETE /api/hero-slides</td>
                      <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-[#2E328D]">Paramedical Courses</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">app/Controllers/Api/Courses.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">CourseModel.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-[#00A54F]">GET /api/courses, GET /api/courses/:slug</td>
                      <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-[#2E328D]">Hospital Partners & Logos</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">app/Controllers/Api/PartnerHospitals.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">PartnerHospitalModel.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-[#00A54F]">GET/POST/PUT/DELETE /api/partner-hospitals</td>
                      <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-[#2E328D]">Pass Out Placements</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">app/Controllers/Api/Placements.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">PlacementModel.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-[#00A54F]">GET/POST/PUT/DELETE /api/placements</td>
                      <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-[#2E328D]">Admission Inquiries CRM</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">app/Controllers/Api/Enquiries.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">EnquiryModel.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-[#00A54F]">GET/POST /api/enquiries</td>
                      <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Active</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-[#2E328D]">SEO & Kolkata Top Ranking</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">app/Controllers/Api/SiteSettings.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600">Config/App.php</td>
                      <td className="py-2.5 px-4 font-mono text-[11px] text-[#00A54F]">GET/PUT /api/site-settings</td>
                      <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quickstart Command Instructions */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-4 h-4 text-[#00A54F]" />
                  <span className="font-bold">How to Launch CodeIgniter 4 Backend on Your Server / XAMPP / Docker</span>
                </div>
              </div>

              <div className="space-y-2 text-slate-300">
                <p className="text-slate-400"># 1. Import MySQL database schema and initial seed data:</p>
                <div className="bg-black/50 p-2.5 rounded-xl border border-slate-800 text-emerald-400 selection:bg-emerald-800">
                  mysql -u root -p cihm_kolkata &lt; ci4/schema.sql
                </div>

                <p className="text-slate-400 pt-2"># 2. Launch CodeIgniter 4 built-in development server:</p>
                <div className="bg-black/50 p-2.5 rounded-xl border border-slate-800 text-amber-400 selection:bg-amber-800">
                  cd ci4 &amp;&amp; php spark serve --port 8080
                </div>

                <p className="text-slate-400 pt-2"># 3. Direct React SPA frontend to CI4 API endpoints (in .env):</p>
                <div className="bg-black/50 p-2.5 rounded-xl border border-slate-800 text-blue-400 selection:bg-blue-800">
                  VITE_API_URL=http://localhost:8080/api
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* COURSE MODAL: ADD / EDIT COURSE, BATCH YEAR, COLOR PICKER */}
      {/* ========================================================= */}
      {courseModalOpen && editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#00A54F]" />
                <h3 className="text-lg font-black text-[#2E328D]">
                  {editingCourse.id ? 'Edit Academic Course' : 'Add New Academic Course'}
                </h3>
              </div>
              <button
                onClick={() => setCourseModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              {/* Highlight / New Launch Setting */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-500/60 shadow-xs">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCourse.highlighted || false}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        highlighted: e.target.checked,
                        isNewLaunch: e.target.checked,
                        showOnHome: e.target.checked
                      })
                    }
                    className="w-5 h-5 rounded text-[#00A54F] focus:ring-emerald-500 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="font-black text-sm text-slate-900 flex items-center gap-1.5 flex-wrap">
                      <span>⭐ Highly Highlight this Course (New Course Launch)</span>
                      <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                        Home Page & Slider Feature
                      </span>
                    </span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      When enabled, this newly launched course and its uploaded image will be prominently highlighted with glowing badges across the Home Page, Header sliding images, and Course Image Buttons. Non-highlighted courses will appear normally on the Course Directory page.
                    </p>
                  </div>
                </label>
              </div>

              {/* Name & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.name || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                    placeholder="e.g. Diploma in Medical Laboratory Technology (DMLT)"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingCourse.slug || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, slug: e.target.value })}
                    placeholder="e.g. dmlt (auto-generated if empty)"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                  />
                </div>
              </div>

              {/* Category & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department / Category</label>
                  <select
                    value={editingCourse.category || 'Diagnostic & Laboratory Sciences'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                  >
                    <option value="Diagnostic & Laboratory Sciences">Diagnostic & Laboratory Sciences</option>
                    <option value="Radiology & Medical Imaging">Radiology & Medical Imaging</option>
                    <option value="Renal Care & Dialysis">Renal Care & Dialysis</option>
                    <option value="Surgical & Operating Technology">Surgical & Operating Technology</option>
                    <option value="Critical Care & ICU Technology">Critical Care & ICU Technology</option>
                    <option value="International Fellowships (London)">International Fellowships (London)</option>
                    <option value="Healthcare Management">Healthcare Management</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration || '2 Years (4 Semesters)'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    placeholder="e.g. 2 Years (4 Semesters)"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                  />
                </div>
              </div>

              {/* Academic Year & Color Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00A54F]" />
                    <span>Admission Batch / Year *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCourse.batchYear || '2026–27'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, batchYear: e.target.value })}
                    placeholder="e.g. 2026–27, 2027–28"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-[#2E328D]"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Updates the admission session banner and badges for this course.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#2E328D]" />
                    <span>Accent & Badge Color</span>
                  </label>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-6 h-6 rounded-full border border-slate-300 shadow-xs flex-shrink-0"
                      style={{ backgroundColor: editingCourse.accentColor || '#00A54F' }}
                    />
                    <input
                      type="text"
                      value={editingCourse.accentColor || '#00A54F'}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          accentColor: e.target.value,
                          badgeColor: e.target.value
                        })
                      }
                      className="w-full px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                  {/* Swatches */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {COLOR_SWATCHES.map((sw) => (
                      <button
                        type="button"
                        key={sw.hex}
                        onClick={() =>
                          setEditingCourse({
                            ...editingCourse,
                            accentColor: sw.hex,
                            badgeColor: sw.hex
                          })
                        }
                        title={sw.label}
                        className="w-5 h-5 rounded-full border border-slate-300 hover:scale-125 transition-transform cursor-pointer"
                        style={{ backgroundColor: sw.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Fees & Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Fee / Annual Tuition</label>
                  <input
                    type="text"
                    value={editingCourse.fees || '₹75,000 / year'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, fees: e.target.value })}
                    placeholder="e.g. ₹75,000 / year or ₹59,000"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                  <input
                    type="text"
                    value={editingCourse.eligibility || '10+2 with PCB'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, eligibility: e.target.value })}
                    placeholder="e.g. 10+2 with PCB"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Cover Image with File Upload, URL, and Live Course Image Button Preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#00A54F]" />
                    <span>Course Image & Interactive Button Visual *</span>
                  </label>
                  <span className="text-[10px] bg-blue-100 text-[#1E3A8A] font-bold px-2 py-0.5 rounded-full">
                    Auto-creates Course Image Button
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                  <div className="space-y-2">
                    {/* File upload option */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Option A: Upload Image File from Device
                      </label>
                      <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-dashed border-slate-300 rounded-xl hover:border-[#00A54F] hover:bg-emerald-50/50 cursor-pointer transition-all text-xs font-semibold text-slate-700">
                        <Upload className="w-4 h-4 text-[#00A54F]" />
                        <span>Choose Image (JPG / PNG / WEBP)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const base64 = event.target?.result as string;
                                setEditingCourse({ ...editingCourse, image: base64 });
                                showNotify(`Loaded image: ${file.name}`);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* URL Option */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Option B: Or Enter Image URL
                      </label>
                      <input
                        type="url"
                        value={editingCourse.image || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
                        placeholder="https://images.unsplash.com/... or /assets/..."
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    {/* Presets */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block mb-1">Quick Presets:</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {IMAGE_PRESETS.map((p) => (
                          <button
                            type="button"
                            key={p.label}
                            onClick={() => setEditingCourse({ ...editingCourse, image: p.url })}
                            className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 text-slate-700 text-[10px] font-bold border border-slate-200 cursor-pointer"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Course Image Button Preview */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center justify-between">
                      <span>Live Course Image Button Preview:</span>
                      <span className="text-[9.5px] text-emerald-600 font-bold">Interactive Preview</span>
                    </label>
                    <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-emerald-400/80 bg-slate-900 group shadow-md aspect-video sm:h-36 w-full flex flex-col justify-end p-3">
                      {editingCourse.image ? (
                        <img
                          src={editingCourse.image}
                          alt={editingCourse.name || 'Course Preview'}
                          className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center text-slate-400">
                          <Camera className="w-8 h-8 opacity-40 mb-1" />
                          <span className="text-[11px]">Upload or select an image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                      {/* Badges on top */}
                      <div className="relative z-10 flex items-center justify-between w-full mb-auto gap-1">
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-black text-white shadow-xs truncate"
                          style={{ backgroundColor: editingCourse.accentColor || '#00A54F' }}
                        >
                          {editingCourse.category || 'Diploma Course'}
                        </span>
                        {editingCourse.highlighted ? (
                          <span className="bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 px-2 py-0.5 rounded-full text-[8.5px] font-black shadow-xs uppercase tracking-tight flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-slate-950" />
                            <span>⭐ New Launch</span>
                          </span>
                        ) : (
                          <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[9px] font-black shadow-xs">
                            {editingCourse.batchYear || '2026–27'}
                          </span>
                        )}
                      </div>

                      {/* Course Title on bottom of button */}
                      <div className="relative z-10">
                        <p className="text-white text-xs font-black drop-shadow-md line-clamp-1">
                          {editingCourse.name || 'Course Name'}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-200 mt-0.5">
                          <span>{editingCourse.duration || '2 Years'}</span>
                          <span className="text-emerald-300 font-bold">📷 Click Image Button</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Overview & Description</label>
                <textarea
                  rows={3}
                  value={editingCourse.shortDescription || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, shortDescription: e.target.value })}
                  placeholder="Provide an overview of the curriculum and hospital exposure..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A54F] hover:bg-[#009245] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Course Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* HERO SLIDE MODAL: ADD / EDIT SLIDE, PHOTO, YEAR & COLOR */}
      {/* ========================================================= */}
      {slideModalOpen && editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#2E328D]" />
                <h3 className="text-lg font-black text-[#2E328D]">
                  {editingSlide.id ? 'Edit Hero Carousel Slide' : 'Add New Hero Slide'}
                </h3>
              </div>
              <button
                onClick={() => setSlideModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-4 text-xs">
              {/* Headline & Subheadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Headline *</label>
                  <input
                    type="text"
                    required
                    value={editingSlide.headline || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, headline: e.target.value })}
                    placeholder="e.g. Diploma in Medical Laboratory Technology (DMLT)"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subheadline / Badge</label>
                  <input
                    type="text"
                    value={editingSlide.subheadline || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subheadline: e.target.value })}
                    placeholder="e.g. Clinical Pathology & Diagnostic Lab Sciences"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Year & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00A54F]" />
                    <span>Academic Year / Session</span>
                  </label>
                  <input
                    type="text"
                    value={editingSlide.year || '2026–27'}
                    onChange={(e) => setEditingSlide({ ...editingSlide, year: e.target.value })}
                    placeholder="e.g. 2026–27"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-[#2E328D]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#2E328D]" />
                    <span>Mirror Glass Color</span>
                  </label>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-6 h-6 rounded-full border border-slate-300 shadow-xs flex-shrink-0"
                      style={{ backgroundColor: editingSlide.blockColor || editingSlide.badgeColor || '#00A54F' }}
                    />
                    <input
                      type="text"
                      value={editingSlide.blockColor || editingSlide.badgeColor || '#00A54F'}
                      onChange={(e) =>
                        setEditingSlide({
                          ...editingSlide,
                          blockColor: e.target.value,
                          badgeColor: e.target.value
                        })
                      }
                      className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                    />
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {COLOR_SWATCHES.map((sw) => (
                      <button
                        type="button"
                        key={sw.hex}
                        onClick={() =>
                          setEditingSlide({
                            ...editingSlide,
                            blockColor: sw.hex,
                            badgeColor: sw.hex
                          })
                        }
                        title={sw.label}
                        className="w-4 h-4 rounded-full border border-slate-300 hover:scale-125 transition-transform cursor-pointer"
                        style={{ backgroundColor: sw.hex }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Card Glass Theme</span>
                  </label>
                  <select
                    value={editingSlide.cardTheme || 'mirror'}
                    onChange={(e) => setEditingSlide({ ...editingSlide, cardTheme: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-medium text-xs"
                  >
                    <option value="mirror">Crystal Clear Mirror Glass</option>
                    <option value="emerald">Emerald Mirror</option>
                    <option value="navy">Royal Navy Mirror</option>
                    <option value="amber">Amber Sunset Mirror</option>
                    <option value="crimson">Crimson Ruby Mirror</option>
                    <option value="ocean">Ocean Cyan Mirror</option>
                  </select>
                </div>
              </div>

              {/* Cover Image URL + Presets */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Slide Cover Image URL (Fast, Sharp 1200px)</label>
                <input
                  type="url"
                  required
                  value={editingSlide.image || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl mb-2"
                />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-semibold mr-1">Hospital Presets:</span>
                  {IMAGE_PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p.label}
                      onClick={() => setEditingSlide({ ...editingSlide, image: p.url })}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Slide Description</label>
                <textarea
                  rows={2}
                  value={editingSlide.description || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                  placeholder="Hands-on clinical drills with automated analyzers and certified hospital rotations..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              {/* CTA Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary CTA Button Text</label>
                  <input
                    type="text"
                    value={editingSlide.ctaText || 'Explore Syllabus'}
                    onChange={(e) => setEditingSlide({ ...editingSlide, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary CTA URL</label>
                  <input
                    type="text"
                    value={editingSlide.ctaUrl || '/courses'}
                    onChange={(e) => setEditingSlide({ ...editingSlide, ctaUrl: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSlideModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A54F] hover:bg-[#009245] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Slide Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PARTNER HOSPITAL MODAL: ADD / EDIT HOSPITAL & LOGO */}
      {/* ========================================================= */}
      {partnerModalOpen && editingPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#00A54F]" />
                <h3 className="text-lg font-black text-[#2E328D]">
                  {editingPartner.id ? 'Edit Partner Hospital' : 'Add New Hospital Partner & Logo'}
                </h3>
              </div>
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hospital Name *</label>
                <input
                  type="text"
                  required
                  value={editingPartner.name || ''}
                  onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })}
                  placeholder="e.g. Apollo Multispecialty Hospitals"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-[#2E328D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Institution Type</label>
                  <select
                    value={editingPartner.type || 'Multispecialty Hospital'}
                    onChange={(e) => setEditingPartner({ ...editingPartner, type: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="Multispecialty Hospital">Multispecialty Hospital</option>
                    <option value="Super Specialty Hospital">Super Specialty Hospital</option>
                    <option value="Clinical Diagnostic Chain">Clinical Diagnostic Chain</option>
                    <option value="Research & Cancer Institute">Research & Cancer Institute</option>
                    <option value="Pediatric & Women Care">Pediatric & Women Care</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Campus / Location</label>
                  <input
                    type="text"
                    value={editingPartner.location || 'Kolkata, WB'}
                    onChange={(e) => setEditingPartner({ ...editingPartner, location: e.target.value })}
                    placeholder="e.g. Salt Lake / EM Bypass, Kolkata"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Hospital Logo + Presets */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hospital Logo URL</label>
                <div className="flex items-center gap-3 mb-2">
                  {editingPartner.logo && (
                    <img
                      src={editingPartner.logo}
                      alt="Preview"
                      className="w-10 h-10 rounded-lg object-contain border border-slate-200 p-1 bg-white flex-shrink-0"
                    />
                  )}
                  <input
                    type="url"
                    required
                    value={editingPartner.logo || ''}
                    onChange={(e) => setEditingPartner({ ...editingPartner, logo: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-semibold mr-1">Quick Kolkata Logos:</span>
                  {HOSPITAL_LOGO_PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p.name}
                      onClick={() => setEditingPartner({ ...editingPartner, logo: p.logo, name: editingPartner.name || p.name })}
                      className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bed Capacity</label>
                  <input
                    type="text"
                    value={editingPartner.bedCapacity || '500'}
                    onChange={(e) => setEditingPartner({ ...editingPartner, bedCapacity: e.target.value })}
                    placeholder="e.g. 500, 750, 1000"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MoU Session / Year</label>
                  <input
                    type="text"
                    value={editingPartner.moUYear || '2026–27'}
                    onChange={(e) => setEditingPartner({ ...editingPartner, moUYear: e.target.value })}
                    placeholder="e.g. 2026–27"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-[#2E328D]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="hospActive"
                  checked={editingPartner.active !== false}
                  onChange={(e) => setEditingPartner({ ...editingPartner, active: e.target.checked })}
                  className="rounded border-slate-300 text-[#00A54F] focus:ring-[#00A54F]"
                />
                <label htmlFor="hospActive" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Active Clinical MoU Partner (Visible on Website & Placements)
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A54F] hover:bg-[#009245] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hospital Partner</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PLACEMENT / PASS OUT STUDENT MODAL: ADD / EDIT ALUMNI */}
      {/* ========================================================= */}
      {placementModalOpen && editingPlacement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Hospital className="w-5 h-5 text-[#00A54F]" />
                <h3 className="text-lg font-black text-[#2E328D]">
                  {editingPlacement.id ? 'Edit Pass Out Student Placement' : 'Add Pass Out Student Placement'}
                </h3>
              </div>
              <button
                onClick={() => setPlacementModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlacement} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingPlacement.studentName || ''}
                    onChange={(e) => setEditingPlacement({ ...editingPlacement, studentName: e.target.value })}
                    placeholder="e.g. Sreya Mukherjee"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-[#2E328D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Name *</label>
                  <select
                    value={editingPlacement.courseName || ''}
                    onChange={(e) => setEditingPlacement({ ...editingPlacement, courseName: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Diploma in Medical Laboratory Technology (DMLT)">Diploma in Medical Laboratory Technology (DMLT)</option>
                    <option value="B.Sc. in Medical Laboratory Technology">B.Sc. in Medical Laboratory Technology</option>
                    <option value="Diploma in Radiography & Medical Imaging">Diploma in Radiography & Medical Imaging</option>
                    <option value="Diploma in Dialysis Technology">Diploma in Dialysis Technology</option>
                    <option value="Diploma in Operation Theatre Technology">Diploma in Operation Theatre Technology</option>
                    <option value="Diploma in Critical Care Technology">Diploma in Critical Care Technology</option>
                    <option value="Master in Hospital Administration (MHA)">Master in Hospital Administration (MHA)</option>
                  </select>
                </div>
              </div>

              {/* Student Photo */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Photograph URL</label>
                <div className="flex items-center gap-3">
                  {editingPlacement.studentImage && (
                    <img
                      src={editingPlacement.studentImage}
                      alt="Student"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                    />
                  )}
                  <input
                    type="url"
                    value={editingPlacement.studentImage || ''}
                    onChange={(e) => setEditingPlacement({ ...editingPlacement, studentImage: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Hospital & Logo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Placed Hospital / Company *</label>
                  <input
                    type="text"
                    required
                    value={editingPlacement.hospitalName || editingPlacement.organization || ''}
                    onChange={(e) =>
                      setEditingPlacement({
                        ...editingPlacement,
                        hospitalName: e.target.value,
                        organization: e.target.value
                      })
                    }
                    placeholder="e.g. Apollo Multispecialty Hospitals"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hospital Logo URL</label>
                  <div className="flex items-center gap-2">
                    {editingPlacement.hospitalLogo && (
                      <img
                        src={editingPlacement.hospitalLogo}
                        alt="Logo"
                        className="w-8 h-8 rounded object-contain border border-slate-200 p-0.5 bg-white flex-shrink-0"
                      />
                    )}
                    <input
                      type="url"
                      value={editingPlacement.hospitalLogo || ''}
                      onChange={(e) => setEditingPlacement({ ...editingPlacement, hospitalLogo: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Logo presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-slate-400 font-semibold mr-1">Quick Kolkata Hospital Logos:</span>
                {HOSPITAL_LOGO_PRESETS.map((p) => (
                  <button
                    type="button"
                    key={p.name}
                    onClick={() =>
                      setEditingPlacement({
                        ...editingPlacement,
                        hospitalLogo: p.logo,
                        hospitalName: editingPlacement.hospitalName || p.name,
                        organization: editingPlacement.organization || p.name
                      })
                    }
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Role, Batch, Package */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Job Role / Designation *</label>
                  <input
                    type="text"
                    required
                    value={editingPlacement.role || ''}
                    onChange={(e) => setEditingPlacement({ ...editingPlacement, role: e.target.value })}
                    placeholder="e.g. Clinical Technologist"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch / Passing Year</label>
                  <input
                    type="text"
                    value={editingPlacement.batchYear || '2026'}
                    onChange={(e) => setEditingPlacement({ ...editingPlacement, batchYear: e.target.value })}
                    placeholder="e.g. 2026, 2025"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salary Package</label>
                  <input
                    type="text"
                    value={editingPlacement.salaryPackage || '₹3.6 LPA'}
                    onChange={(e) => setEditingPlacement({ ...editingPlacement, salaryPackage: e.target.value })}
                    placeholder="e.g. ₹3.6 LPA, ₹4.2 LPA"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-[#00A54F]"
                  />
                </div>
              </div>

              {/* Testimonial */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Review / Placement Experience</label>
                <textarea
                  rows={2}
                  value={editingPlacement.testimonial || ''}
                  onChange={(e) => setEditingPlacement({ ...editingPlacement, testimonial: e.target.value })}
                  placeholder="CIHM hospital drills gave me the practical confidence needed to handle real emergencies..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="plcVerified"
                  checked={editingPlacement.verified !== false}
                  onChange={(e) => setEditingPlacement({ ...editingPlacement, verified: e.target.checked })}
                  className="rounded border-slate-300 text-[#00A54F] focus:ring-[#00A54F]"
                />
                <label htmlFor="plcVerified" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Verified by CIHM Central Placement Cell
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPlacementModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A54F] hover:bg-[#009245] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Placement Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FACILITY MODAL: ADD / EDIT PRACTICAL LAB OR FACILITY */}
      {/* ========================================================= */}
      {facilityModalOpen && editingFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#00A54F]" />
                <h3 className="text-lg font-black text-[#2E328D]">
                  {editingFacility.id ? 'Edit Practical Facility / Lab' : 'Add New Practical Facility / Lab'}
                </h3>
              </div>
              <button
                onClick={() => setFacilityModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFacility} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Facility / Lab Title *</label>
                  <input
                    type="text"
                    required
                    value={editingFacility.title || ''}
                    onChange={(e) => setEditingFacility({ ...editingFacility, title: e.target.value })}
                    placeholder="e.g. Advanced Pathology & Hematology Diagnostic Lab"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-[#2E328D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={editingFacility.department || 'Pathology & DMLT'}
                    onChange={(e) => setEditingFacility({ ...editingFacility, department: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="Pathology & DMLT">Pathology & DMLT</option>
                    <option value="Radiology & Imaging">Radiology & Imaging</option>
                    <option value="Operation Theatre (DOTT)">Operation Theatre (DOTT)</option>
                    <option value="Dialysis Technology">Dialysis Technology</option>
                    <option value="ICU & Emergency Care">ICU & Emergency Care</option>
                    <option value="Campus Facilities">Campus Facilities</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Facility Category</label>
                  <input
                    type="text"
                    value={editingFacility.category || 'Diagnostic Lab'}
                    onChange={(e) => setEditingFacility({ ...editingFacility, category: e.target.value })}
                    placeholder="e.g. Diagnostic Lab, Surgical Sim"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Capacity</label>
                  <input
                    type="text"
                    value={editingFacility.capacity || '40 Students / Shift'}
                    onChange={(e) => setEditingFacility({ ...editingFacility, capacity: e.target.value })}
                    placeholder="e.g. 40 Students / Shift"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Practical Hours</label>
                  <input
                    type="text"
                    value={editingFacility.practicalHours || '750+ Practical Hours'}
                    onChange={(e) => setEditingFacility({ ...editingFacility, practicalHours: e.target.value })}
                    placeholder="e.g. 750+ Practical Hours"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Facility Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingFacility.description || ''}
                  onChange={(e) => setEditingFacility({ ...editingFacility, description: e.target.value })}
                  placeholder="Clinical equipment overview, training scope, and NABL standard adherence..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Equipment List (comma separated)
                </label>
                <input
                  type="text"
                  value={(editingFacility.equipment || []).join(', ')}
                  onChange={(e) =>
                    setEditingFacility({
                      ...editingFacility,
                      equipment: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Automated Biochemistry Analyzer, 5-Part Counter, Digital Centrifuge"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    required
                    value={editingFacility.imageUrl || ''}
                    onChange={(e) => setEditingFacility({ ...editingFacility, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Linked Demo Video Class</label>
                  <select
                    value={editingFacility.demoVideoId || 'demo-1'}
                    onChange={(e) => setEditingFacility({ ...editingFacility, demoVideoId: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-medium"
                  >
                    {demoVideos.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.title} ({v.duration})
                      </option>
                    ))}
                    {demoVideos.length === 0 && <option value="demo-1">Default Lab Demo Class</option>}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFacilityModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00A54F] hover:bg-[#009245] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Facility</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DEMO VIDEO MODAL: ADD / EDIT DEMO VIDEO */}
      {/* ========================================================= */}
      {demoModalOpen && editingDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-black text-[#2E328D]">
                  {editingDemo.id ? 'Edit Practical Demo Video' : 'Add Practical Demo Video'}
                </h3>
              </div>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDemo} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={editingDemo.title || ''}
                  onChange={(e) => setEditingDemo({ ...editingDemo, title: e.target.value })}
                  placeholder="e.g. Automated Biochemistry Analyzer & Blood Centrifugation Drill"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-[#2E328D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={editingDemo.department || 'Pathology & DMLT'}
                    onChange={(e) => setEditingDemo({ ...editingDemo, department: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="Pathology & DMLT">Pathology & DMLT</option>
                    <option value="Radiology & Imaging">Radiology & Imaging</option>
                    <option value="Operation Theatre (DOTT)">Operation Theatre (DOTT)</option>
                    <option value="Dialysis Technology">Dialysis Technology</option>
                    <option value="ICU & Emergency Care">ICU & Emergency Care</option>
                    <option value="Campus Facilities">Campus Facilities</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingDemo.category || 'Clinical Lab Practical'}
                    onChange={(e) => setEditingDemo({ ...editingDemo, category: e.target.value })}
                    placeholder="e.g. Clinical Lab Practical"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingDemo.duration || '15 mins'}
                    onChange={(e) => setEditingDemo({ ...editingDemo, duration: e.target.value })}
                    placeholder="e.g. 15 mins"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Instructor Name</label>
                  <input
                    type="text"
                    value={editingDemo.instructor || ''}
                    onChange={(e) => setEditingDemo({ ...editingDemo, instructor: e.target.value })}
                    placeholder="e.g. Dr. Debasish Roy"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Instructor Designation</label>
                  <input
                    type="text"
                    value={editingDemo.instructorTitle || ''}
                    onChange={(e) => setEditingDemo({ ...editingDemo, instructorTitle: e.target.value })}
                    placeholder="e.g. Senior Pathologist & Lab Director"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Video Embed URL (YouTube/MP4) *</label>
                  <input
                    type="text"
                    required
                    value={editingDemo.videoUrl || ''}
                    onChange={(e) => setEditingDemo({ ...editingDemo, videoUrl: e.target.value })}
                    placeholder="https://www.youtube-nocookie.com/embed/..."
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Thumbnail Image URL *</label>
                  <input
                    type="text"
                    required
                    value={editingDemo.thumbnailUrl || ''}
                    onChange={(e) => setEditingDemo({ ...editingDemo, thumbnailUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Video Summary / Description</label>
                <textarea
                  rows={2}
                  value={editingDemo.description || ''}
                  onChange={(e) => setEditingDemo({ ...editingDemo, description: e.target.value })}
                  placeholder="Overview of the clinical protocols demonstrated..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Demo Video</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STUDENT ACHIEVEMENT MODAL: ADD / EDIT ACHIEVER */}
      {/* ========================================================= */}
      {achievementModalOpen && editingAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-black text-[#2E328D]">
                  {editingAchievement.id ? 'Edit Student Achiever' : 'Add Student Achiever'}
                </h3>
              </div>
              <button
                onClick={() => setAchievementModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAchievement} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingAchievement.studentName || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, studentName: e.target.value })}
                    placeholder="e.g. Debabrata Mondal"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-[#2E328D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Achievement Badge *</label>
                  <input
                    type="text"
                    required
                    value={editingAchievement.badge || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, badge: e.target.value })}
                    placeholder="e.g. State Rank 1 & Gold Medal"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl font-bold text-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Academic Program / Course *</label>
                <input
                  type="text"
                  required
                  value={editingAchievement.course || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, course: e.target.value })}
                  placeholder="e.g. Diploma in Medical Laboratory Technology (DMLT)"
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Year</label>
                  <input
                    type="text"
                    value={editingAchievement.year || 'Batch 2024'}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, year: e.target.value })}
                    placeholder="e.g. Batch 2024"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hospital / Lab Organization</label>
                  <input
                    type="text"
                    value={editingAchievement.organizationOrHospital || ''}
                    onChange={(e) => setEditingAchievement({ ...editingAchievement, organizationOrHospital: e.target.value })}
                    placeholder="e.g. Super-Specialty Hospital, Kolkata"
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Avatar Photo URL</label>
                <input
                  type="text"
                  required
                  value={editingAchievement.avatar || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Achievement Story / Commendation *</label>
                <textarea
                  rows={3}
                  required
                  value={editingAchievement.achievement || ''}
                  onChange={(e) => setEditingAchievement({ ...editingAchievement, achievement: e.target.value })}
                  placeholder="Description of the academic medal, clinical recognition, or exam result..."
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAchievementModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Achiever</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboardPage;
