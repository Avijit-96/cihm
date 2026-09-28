import fs from 'fs';
import path from 'path';
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
  AuditLog,
  EnquiryRecord,
  DemoVideo,
  FacilityItem,
  StudentAchievement,
  StudentFeedItem,
  CourseImageItem,
  CongratulationItem,
  SocialMediaVideoItem
} from '../src/types.js';
import {
  initialSiteSettings,
  initialUsers,
  initialHeroSlides,
  initialCourses,
  initialBlogCategories,
  initialBlogTags,
  initialBlogAuthors,
  initialBlogs,
  initialPartnerHospitals,
  initialPlacements,
  initialTopStudents,
  initialCareerPaths,
  initialFellowships,
  initialEvents,
  initialAnnouncements,
  initialFaculty,
  initialFAQs,
  initialReviews,
  initialReviewSettings,
  initialCommunityTopics,
  initialCommunityReplies,
  initialStudyRooms,
  initialStudyMessages,
  initialStudyNotes,
  initialMedia,
  initialRedirects,
  initialAuditLogs
} from './data/initialData.js';

export interface DatabaseSchema {
  siteSettings: SiteSettings;
  users: User[];
  heroSlides: HeroSlide[];
  courses: Course[];
  blogCategories: BlogCategory[];
  blogTags: BlogTag[];
  blogAuthors: BlogAuthor[];
  blogs: Blog[];
  partnerHospitals: PartnerHospital[];
  placements: PlacementRecord[];
  topStudents: TopStudent[];
  careerPaths: CareerPath[];
  fellowships: Fellowship[];
  events: EventItem[];
  announcements: AnnouncementItem[];
  faculty: FacultyMember[];
  faqs: FAQItem[];
  reviews: ReviewItem[];
  reviewSettings: ReviewSettings;
  communityTopics: CommunityTopic[];
  communityReplies: CommunityReply[];
  studyRooms: StudyRoom[];
  studyMessages: StudyMessage[];
  studyNotes: StudyNote[];
  enquiries: EnquiryRecord[];
  media: MediaAsset[];
  redirects: RedirectRule[];
  auditLogs: AuditLog[];
  demoVideos: DemoVideo[];
  facilities: FacilityItem[];
  studentAchievements: StudentAchievement[];
  studentFeed: StudentFeedItem[];
  courseImages: CourseImageItem[];
  congratulations: CongratulationItem[];
  socialVideos: SocialMediaVideoItem[];
}

const DB_FILE_PATH = path.join(process.cwd(), 'server', 'data', 'cihm-db.json');

class DatabaseService {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadFromDisk();
  }

  private loadFromDisk(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          siteSettings: parsed.siteSettings || initialSiteSettings,
          users: parsed.users || initialUsers,
          heroSlides: parsed.heroSlides || initialHeroSlides,
          courses: parsed.courses || initialCourses,
          blogCategories: parsed.blogCategories || initialBlogCategories,
          blogTags: parsed.blogTags || initialBlogTags,
          blogAuthors: parsed.blogAuthors || initialBlogAuthors,
          blogs: parsed.blogs || initialBlogs,
          partnerHospitals: parsed.partnerHospitals || initialPartnerHospitals,
          placements: parsed.placements || initialPlacements,
          topStudents: parsed.topStudents || initialTopStudents,
          careerPaths: parsed.careerPaths || initialCareerPaths,
          fellowships: parsed.fellowships || initialFellowships,
          events: parsed.events || initialEvents,
          announcements: parsed.announcements || initialAnnouncements,
          faculty: parsed.faculty || initialFaculty,
          faqs: parsed.faqs || initialFAQs,
          reviews: parsed.reviews || initialReviews,
          reviewSettings: parsed.reviewSettings || initialReviewSettings,
          communityTopics: parsed.communityTopics || initialCommunityTopics,
          communityReplies: parsed.communityReplies || initialCommunityReplies,
          studyRooms: parsed.studyRooms || initialStudyRooms,
          studyMessages: parsed.studyMessages || initialStudyMessages,
          studyNotes: parsed.studyNotes || initialStudyNotes,
          enquiries: parsed.enquiries || [],
          media: parsed.media || initialMedia,
          redirects: parsed.redirects || initialRedirects,
          auditLogs: parsed.auditLogs || initialAuditLogs,
          demoVideos: parsed.demoVideos || [],
          facilities: parsed.facilities || [],
          studentAchievements: parsed.studentAchievements || [],
          studentFeed: parsed.studentFeed || [],
          courseImages: parsed.courseImages || [],
          congratulations: parsed.congratulations || [],
          socialVideos: parsed.socialVideos || []
        };
      }
    } catch (err) {
      console.warn('Could not read existing db file, falling back to initial data:', err);
    }

    const initialDb: DatabaseSchema = {
      siteSettings: initialSiteSettings,
      users: initialUsers,
      heroSlides: initialHeroSlides,
      courses: initialCourses,
      blogCategories: initialBlogCategories,
      blogTags: initialBlogTags,
      blogAuthors: initialBlogAuthors,
      blogs: initialBlogs,
      partnerHospitals: initialPartnerHospitals,
      placements: initialPlacements,
      topStudents: initialTopStudents,
      careerPaths: initialCareerPaths,
      fellowships: initialFellowships,
      events: initialEvents,
      announcements: initialAnnouncements,
      faculty: initialFaculty,
      faqs: initialFAQs,
      reviews: initialReviews,
      reviewSettings: initialReviewSettings,
      communityTopics: initialCommunityTopics,
      communityReplies: initialCommunityReplies,
      studyRooms: initialStudyRooms,
      studyMessages: initialStudyMessages,
      studyNotes: initialStudyNotes,
      enquiries: [],
      media: initialMedia,
      redirects: initialRedirects,
      auditLogs: initialAuditLogs,
      demoVideos: [],
      facilities: [],
      studentAchievements: [],
      studentFeed: [],
      courseImages: [],
      congratulations: [],
      socialVideos: []
    };
    this.persist(initialDb);
    return initialDb;
  }

  private persist(dbData?: DatabaseSchema): void {
    try {
      const dataToSave = dbData || this.data;
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error persisting database to disk:', err);
    }
  }

  public get(): DatabaseSchema {
    return this.data;
  }

  public save(): void {
    this.persist();
  }

  public logAudit(user: string, action: string, entity: string, entityId: string, details: string): void {
    const log: AuditLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      user,
      action,
      entity,
      entityId,
      details,
      timestamp: new Date().toISOString()
    };
    this.data.auditLogs.unshift(log);
    // Keep max 500 logs
    if (this.data.auditLogs.length > 500) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 500);
    }
    this.save();
  }
}

export const db = new DatabaseService();
