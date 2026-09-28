import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { SearchModal } from './components/SearchModal.js';
import { EnquiryModal } from './components/EnquiryModal.js';
import { PWAInstallBanner } from './components/PWAInstallBanner.js';
import { AppInstallModal } from './components/AppInstallModal.js';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { CoursesPage } from './pages/CoursesPage.js';
import { CourseDetailPage } from './pages/CourseDetailPage.js';
import { InternationalFellowshipsPage } from './pages/InternationalFellowshipsPage.js';
import { PlacementsPage } from './pages/PlacementsPage.js';
import { PlacementDashboardPage } from './pages/PlacementDashboardPage.js';
import { StudentsPage } from './pages/StudentsPage.js';
import { CareerRoadmapPage } from './pages/CareerRoadmapPage.js';
import { FellowshipsPage } from './pages/FellowshipsPage.js';
import { BlogPage } from './pages/BlogPage.js';
import { BlogDetailPage } from './pages/BlogDetailPage.js';
import { BlogCategoryPage } from './pages/BlogCategoryPage.js';
import { CommunityPage } from './pages/CommunityPage.js';
import { StudyConnectPage } from './pages/StudyConnectPage.js';
import { ReviewsPage } from './pages/ReviewsPage.js';
import { EventsPage } from './pages/EventsPage.js';
import { EventDetailPage } from './pages/EventDetailPage.js';
import { AnnouncementsPage } from './pages/AnnouncementsPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { AdminDashboardPage } from './pages/AdminDashboardPage.js';
import { GalleryPage } from './pages/GalleryPage.js';

export function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryDefaultCourse, setEnquiryDefaultCourse] = useState('');
  const [appInstallModalOpen, setAppInstallModalOpen] = useState(false);

  // Perceived performance: Smooth horizontal progress bar triggered on route transitions
  const [isNavigating, setIsNavigating] = useState(false);
  const [navProgress, setNavProgress] = useState(0);

  useEffect(() => {
    setIsNavigating(true);
    setNavProgress(25);

    const timer1 = setTimeout(() => {
      setNavProgress(70);
    }, 60);

    const timer2 = setTimeout(() => {
      setNavProgress(100);
    }, 200);

    const timer3 = setTimeout(() => {
      setIsNavigating(false);
      setNavProgress(0);
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [currentPath]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Online / Offline network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (courseName?: string) => {
    setEnquiryDefaultCourse(courseName || '');
    setEnquiryOpen(true);
  };

  // Route matching logic
  const renderPage = () => {
    // Normalize path by trimming trailing slash (except root)
    let p = currentPath.length > 1 && currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;

    if (p === '/' || p === '') {
      return <HomePage onNavigate={navigate} onOpenEnquiry={handleOpenEnquiry} />;
    }

    if (p === '/about') {
      return <AboutPage onNavigate={navigate} onOpenEnquiry={() => handleOpenEnquiry()} />;
    }

    if (p === '/courses' || p.toLowerCase() === '/course') {
      return <CoursesPage onNavigate={navigate} onOpenEnquiry={handleOpenEnquiry} />;
    }

    if (p.startsWith('/courses/') || p.toLowerCase().startsWith('/course/')) {
      const slug = p.replace(/^\/(courses|course|Course)\//i, '');
      return (
        <CourseDetailPage
          slug={slug}
          onNavigate={navigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }

    if (p === '/gallery') {
      return <GalleryPage onNavigate={navigate} onOpenEnquiry={() => handleOpenEnquiry()} />;
    }

    if (p === '/international-fellowships' || p === '/london-fellowships') {
      return (
        <InternationalFellowshipsPage
          onNavigate={navigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }

    if (p === '/placements') {
      return <PlacementsPage onNavigate={navigate} onOpenEnquiry={() => handleOpenEnquiry()} />;
    }

    if (p === '/placements/dashboard') {
      return (
        <PlacementDashboardPage
          onNavigate={navigate}
          onOpenEnquiry={() => handleOpenEnquiry()}
        />
      );
    }

    if (p === '/students') {
      return <StudentsPage onNavigate={navigate} onOpenEnquiry={() => handleOpenEnquiry()} />;
    }

    if (p === '/career-roadmap') {
      return (
        <CareerRoadmapPage onNavigate={navigate} onOpenEnquiry={handleOpenEnquiry} />
      );
    }

    if (p === '/fellowships') {
      return <FellowshipsPage onNavigate={navigate} onOpenEnquiry={handleOpenEnquiry} />;
    }

    if (p === '/blog' || p === '/blogs' || p === '/blog-2') {
      return <BlogPage onNavigate={navigate} />;
    }

    if (p.startsWith('/blog/category/') || p.startsWith('/blogs/category/')) {
      const catSlug = p.replace(/^\/(blog|blogs)\/category\//, '');
      return <BlogCategoryPage categorySlug={catSlug} onNavigate={navigate} />;
    }

    if (p.startsWith('/blog/') || p.startsWith('/blogs/')) {
      const slug = p.replace(/^\/(blog|blogs)\//, '');
      return (
        <BlogDetailPage
          slug={slug}
          onNavigate={navigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }

    if (p === '/community') {
      return <CommunityPage onNavigate={navigate} />;
    }

    if (p === '/study-connect') {
      return <StudyConnectPage onNavigate={navigate} />;
    }

    if (p === '/reviews') {
      return <ReviewsPage onNavigate={navigate} onOpenEnquiry={() => handleOpenEnquiry()} />;
    }

    if (p === '/events') {
      return <EventsPage onNavigate={navigate} onOpenEnquiry={handleOpenEnquiry} />;
    }

    if (p.startsWith('/events/')) {
      const slug = p.replace('/events/', '');
      return (
        <EventDetailPage
          slug={slug}
          onNavigate={navigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }

    if (p === '/announcements') {
      return <AnnouncementsPage />;
    }

    if (p === '/contact' || p === '/contact-us') {
      return <ContactPage />;
    }

    if (p === '/admin') {
      return <AdminDashboardPage />;
    }

    // Static policy fallbacks
    if (p === '/privacy-policy' || p === '/terms' || p === '/accessibility') {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-6 bg-white rounded-3xl p-8 border border-slate-100 my-8 shadow-xs">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E328D] capitalize">
            {p.replace('/', '').replace('-', ' ')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Central Institute of Healthcare & Management (CIHM) is committed to safeguarding student data, maintaining institutional academic transparency, and complying with statutory educational policies in West Bengal, India.
          </p>
          <p className="text-xs text-slate-500">
            For specific policy queries, contact our legal and administrative board at{' '}
            <a href="mailto:admin@cihm.in" className="text-[#00A54F] underline">
              admin@cihm.in
            </a>
            .
          </p>
        </div>
      );
    }

    // 404 Fallback
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-[#2E328D]">404 – Page Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested clinical section or academic record is not available.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-[#2E328D] text-white font-bold text-xs rounded-xl shadow-xs"
        >
          Return to CIHM Home
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#00A54F]/20 selection:text-[#2E328D]">
      {/* PWA Banner & Offline Alert */}
      <PWAInstallBanner
        isOnline={isOnline}
        onOpenAppPreview={() => setAppInstallModalOpen(true)}
      />

      {/* Main Global Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenAppInstall={() => setAppInstallModalOpen(true)}
        isOnline={isOnline}
      />

      {/* Main Page Body */}
      <main className="flex-1 w-full relative" id="main-content">
        {/* Smooth Horizontal Route Transition Progress Bar */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={navProgress}
          aria-label="Route Transition Progress"
          className={`sticky top-0 left-0 right-0 w-full h-[3.5px] z-50 overflow-hidden pointer-events-none transition-opacity duration-300 ${
            isNavigating ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-[#2E328D] via-[#00A54F] to-[#2E328D] transition-all duration-200 ease-out shadow-[0_0_10px_rgba(0,165,79,0.9)]"
            style={{ width: `${navProgress}%` }}
          />
        </div>

        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />

      {/* Course & Admissions Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultCourse={enquiryDefaultCourse}
      />

      {/* PWA App Install & Live Preview Modal */}
      <AppInstallModal
        isOpen={appInstallModalOpen}
        onClose={() => setAppInstallModalOpen(false)}
        onOpenEnquiry={handleOpenEnquiry}
      />
    </div>
  );
}
export default App;
