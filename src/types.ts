export type RoleType = 'super_admin' | 'content_manager' | 'seo_manager' | 'moderator' | 'editor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  avatar?: string;
  createdAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  topics: string[];
  moduleNumber?: number;
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  title?: string;
  shortCode?: string;
  active?: boolean;
  category: string;
  shortDescription: string;
  fullDescription: string;
  overview: string;
  eligibility: string;
  duration: string;
  curriculum: CourseModule[];
  practicalTraining: string;
  practicalDetails?: string;
  clinicalExposure: string;
  internship: string;
  internshipDetails?: string;
  skills: string[];
  competencies?: string[];
  careerOpportunities: string[];
  careerRoles?: string[];
  jobRoles: string[];
  highlights?: string[];
  hospitalPartners?: string[];
  faqs: CourseFAQ[];
  relatedCourseSlugs: string[];
  admissionCtaText: string;
  image: string;
  gallery: string[];
  featured: boolean;
  highlighted?: boolean;
  isNewLaunch?: boolean;
  showOnHome?: boolean;
  status: 'published' | 'draft' | 'scheduled';
  publishDate?: string;
  batchYear?: string;
  academicYear?: string;
  accentColor?: string;
  badgeText?: string;
  badgeColor?: string;
  fees?: string;
  totalFee?: string;
  suffix?: string;
  institutionPartner?: string;
  cpdPoints?: number;
  actualPrice?: string;
  discountedPrice?: string;
  isOnline?: boolean;
  isFellowship?: boolean;
  brochureUrl?: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: 'Course';
  createdAt: string;
  updatedAt: string;
  version?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount?: number;
  count?: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  indexable: boolean;
}

export interface BlogAuthor {
  id: string;
  name: string;
  designation: string;
  bio: string;
  avatar: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  imageAltText?: string;
  authorId?: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  authorBio?: string;
  tableOfContents?: Array<{ id: string; title: string }>;
  category: string;
  categorySlug?: string;
  tags?: string[];
  publishedDate?: string;
  publishDate?: string;
  modifiedDate?: string;
  readingTime: string;
  featured?: boolean;
  status?: 'published' | 'draft' | 'scheduled' | 'archived';
  relatedCourseSlug?: string;
  relatedBlogSlugs?: string[];
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schemaType?: 'Article' | 'BlogPosting';
  indexable?: boolean;
  follow?: boolean;
  breadcrumbTitle?: string;
  views?: number;
  version?: number;
  history?: Array<{
    date: string;
    editor: string;
    title: string;
    content: string;
  }>;
}

export interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  description: string;
  image: string;
  altText: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  order: number;
  enabled: boolean;
  year?: string;
  badgeColor?: string;
  blockColor?: string;
  cardTheme?: 'mirror' | 'emerald' | 'navy' | 'amber' | 'crimson' | 'ocean' | string;
  publishDate?: string;
  expiryDate?: string;
}

export interface DemoVideo {
  id: string;
  title: string;
  category: string;
  department: string;
  duration: string;
  instructor: string;
  instructorTitle?: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  featured: boolean;
  viewsCount?: number;
  uploadedDate?: string;
  keyLearnings?: string[];
}

export interface PartnerHospital {
  id: string;
  name: string;
  logo: string;
  type: string;
  location: string;
  moUYear?: string;
  bedCapacity?: string;
  hiringDepartments?: string[];
  active: boolean;
  order?: number;
}

export interface PlacementRecord {
  id: string;
  studentName: string;
  courseName: string;
  courseSlug?: string;
  passingYear?: string;
  batchYear?: string;
  batch?: string;
  organization?: string;
  hospitalName?: string;
  hospitalLogo?: string;
  companyName?: string;
  role: string;
  designation?: string;
  department?: string;
  salaryPackage?: string;
  city?: string;
  year?: string;
  verified: boolean;
  studentImage?: string;
  image?: string;
  testimonialStory?: string;
  testimonial?: string;
}

export type Placement = PlacementRecord;

export interface TopStudent {
  id: string;
  studentName: string;
  courseName: string;
  achievement: string;
  year: string;
  image: string;
  description: string;
  badge: string;
}

export interface CareerRoadmapStage {
  id: string;
  stageName: string;
  stageCode: 'student' | 'foundation' | 'practical' | 'clinical' | 'entry' | 'experienced' | 'specialist' | 'leadership';
  order: number;
  durationRange: string;
  description: string;
  keyCompetencies: string[];
  clinicalMilestones: string[];
  certifications: string[];
  prospectiveRoles: string[];
}

export interface CareerPath {
  id: string;
  courseSlug: string;
  courseName: string;
  overview: string;
  stages: CareerRoadmapStage[];
}

export interface Fellowship {
  id: string;
  slug?: string;
  title: string;
  duration: string;
  department?: string;
  specialization?: string;
  description: string;
  eligibility: string;
  trainingHospital?: string;
  clinicalHighlights?: string[];
  keyHighlights?: string[];
  status?: 'published' | 'draft';
  image?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  time?: string;
  location?: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  registrationUrl?: string;
  speaker: string;
  status?: 'upcoming' | 'ongoing' | 'completed';
  seoTitle?: string;
  metaDescription?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'Admissions' | 'Academic' | 'Examination' | 'Clinical' | 'Events' | 'General' | string;
  content: string;
  date?: string;
  publishDate?: string;
  expiryDate?: string;
  priority?: 'normal' | 'high' | 'urgent';
  isUrgent?: boolean;
  attachmentUrl?: string;
  link?: string;
  pinned?: boolean;
  status?: 'published' | 'scheduled' | 'archived';
}

export type Announcement = AnnouncementItem;

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  bio: string;
  image: string;
  experience: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Global' | 'Admissions' | 'Course' | 'Career' | 'Clinical' | 'Community';
  courseSlug?: string;
  order: number;
}

export interface ReviewItem {
  id: string;
  source: 'google_business' | 'verified_testimonial' | 'industry_partner';
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  reviewText: string;
  date?: string;
  courseOrDepartment?: string;
  roleOrDesignation?: string;
  organization?: string;
  partnerLogo?: string;
  type?: 'student' | 'partner';
  response?: string;
  status?: 'approved' | 'pending' | 'rejected';
  featured?: boolean;
}

export interface ReviewSettings {
  displayMode: 'google_api' | 'manual_verified' | 'both';
  googleReviewUrl: string;
  googlePlaceId?: string;
  googleRating: number;
  googleReviewCount: number;
  sectionTitle: string;
  sectionSubtitle: string;
  enabled: boolean;
}

export interface CommunityReply {
  id: string;
  topicId?: string;
  authorName: string;
  authorRole?: string;
  content: string;
  timestamp?: string;
  createdAt?: string;
  likesCount?: number;
  isStaff?: boolean;
}

export interface CommunityTopic {
  id: string;
  title: string;
  category?: string;
  tags?: string[];
  content: string;
  authorName: string;
  authorRole?: string;
  timestamp?: string;
  createdAt?: string;
  repliesCount?: number;
  replies?: CommunityReply[];
  likesCount?: number;
  upvotes?: number;
  viewsCount?: number;
  reported?: boolean;
  status?: 'active' | 'locked' | 'hidden';
  isStaff?: boolean;
}

export type ForumPost = CommunityTopic;

export interface StudyNote {
  id: string;
  roomId?: string;
  title: string;
  content: string;
  authorName: string;
  timestamp?: string;
  date?: string;
}

export interface StudyMessage {
  id: string;
  roomId?: string;
  senderName: string;
  senderRole?: string;
  text?: string;
  content?: string;
  timestamp: string;
}

export interface StudyRoom {
  id: string;
  name: string;
  courseSlug?: string;
  courseCategory?: string;
  topic?: string;
  description?: string;
  activeUsers?: number;
  activeUsersCount?: number;
  participantsCount?: number;
  messages?: StudyMessage[];
  sharedNotes?: StudyNote[];
}

export interface EnquiryRecord {
  id: string;
  type: 'course' | 'general' | 'callback' | 'event' | string;
  name: string;
  phone: string;
  email: string;
  courseName?: string;
  message?: string;
  status: 'new' | 'in_progress' | 'contacted' | 'enrolled' | 'closed' | string;
  assignedTo?: string;
  notes?: string;
  date?: string;
  createdAt?: string;
}

export type Enquiry = EnquiryRecord;

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  altText: string;
  caption?: string;
  category: 'Logo' | 'Hero' | 'Courses' | 'Students' | 'Placements' | 'Blogs' | 'Events' | 'Campus' | 'Faculty' | 'Laboratory';
  sizeKb: number;
  dimensions: string;
  createdAt: string;
}

export interface SiteSettings {
  instituteName?: string;
  siteName?: string;
  tagline?: string;
  contactAddress?: string;
  address?: string;
  cityState?: string;
  phonePrimary?: string;
  phoneSecondary?: string;
  phone?: string;
  emailPrimary?: string;
  emailAdmissions?: string;
  email?: string;
  officeHours?: string;
  googleMapsEmbedUrl?: string;
  googleMapsDirectionsUrl?: string;
  whatsappNumber?: string;
  googleReviewUrl?: string;
  metaDescription?: string;
  socialLinks?: {
    facebook: string;
    linkedin: string;
    youtube: string;
    instagram: string;
    twitter: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    canonicalDomain: string;
    defaultOgImage: string;
    robotsTxtContent: string;
  };
}

export interface RedirectRule {
  id: string;
  fromPath: string;
  toPath: string;
  statusCode: 301 | 302;
  enabled: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
}

export interface SEOHealthReport {
  overallStatus: 'PASS' | 'WARNING' | 'ERROR';
  passedCount: number;
  warningCount: number;
  errorCount: number;
  checks: Array<{
    id: string;
    category: string;
    item: string;
    status: 'PASS' | 'WARNING' | 'ERROR';
    message: string;
    targetUrl: string;
  }>;
}

export interface FacilityItem {
  id: string;
  title: string;
  department: string;
  category: string;
  description: string;
  equipment: string[];
  capacity: string;
  practicalHours: string;
  imageUrl: string;
  demoVideoId?: string;
  demoVideoUrl?: string;
  featured: boolean;
  order: number;
}

export interface StudentAchievement {
  id: string;
  studentName: string;
  course: string;
  badge: string;
  year: string;
  achievement: string;
  organizationOrHospital: string;
  avatar: string;
  verified: boolean;
  featured: boolean;
}

export interface StudentFeedItem {
  id: string;
  authorName: string;
  authorRole: string;
  avatar: string;
  content: string;
  imageUrl?: string;
  category: 'achievement' | 'clinical_posting' | 'lab_session' | 'campus_life' | 'placement';
  badge?: string;
  likes: number;
  timestamp: string;
  verified: boolean;
  hasLiked?: boolean;
}

export interface CourseImageItem {
  id: string;
  courseId?: string;
  courseName: string;
  courseSlug?: string;
  imageUrl: string;
  title: string;
  caption?: string;
  department: string;
  category: 'Pathology' | 'Radiology' | 'Operation Theatre' | 'Dialysis' | 'ICU & Critical Care' | 'Hospital Management' | 'Campus Life' | string;
  uploadedAt: string;
  featuredOnHome?: boolean;
}

export interface CongratulationItem {
  id: string;
  name: string;
  type: 'student' | 'staff';
  roleOrCourse: string;
  department: string;
  title: string;
  message: string;
  achievementBadge: string;
  awardYear: string;
  photoUrl: string;
  organization?: string;
  featuredOnHome: boolean;
  createdAt: string;
}

export interface SocialMediaVideoItem {
  id: string;
  title: string;
  platform: 'youtube' | 'instagram' | 'reels' | 'shorts' | 'facebook';
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  department?: string;
  authorName?: string;
  viewsCount?: number;
  likesCount?: number;
  featuredOnHome: boolean;
  uploadedDate: string;
}

