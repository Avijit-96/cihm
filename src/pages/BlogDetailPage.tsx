import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { Blog, Course } from '../types.js';
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  Share2,
  BookOpen,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { ShareButtons } from '../components/ShareButtons.js';

interface BlogDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (courseName?: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenEnquiry
}) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setBlog(d.data);
          // fetch other blogs for related list
          fetch('/api/blogs')
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setRelatedBlogs(data.data.filter((b: Blog) => b.slug !== slug).slice(0, 3));
              }
            });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500">
        Loading clinical article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#2E328D]">Article Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested blog publication is unavailable.</p>
        <button
          onClick={() => onNavigate('/blog')}
          className="mt-4 px-5 py-2 bg-[#2E328D] text-white font-bold text-xs rounded-lg"
        >
          Return to Blog Hub
        </button>
      </div>
    );
  }

  // Schema.org BlogPosting
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage,
    datePublished: blog.publishDate,
    author: {
      '@type': 'Person',
      name: blog.authorName,
      jobTitle: blog.authorRole
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Central Institute of Healthcare & Management (CIHM)',
      logo: 'https://cihm.in/favicon.svg'
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <SEOHelmet
        title={`${blog.title} | CIHM Healthcare Insights`}
        description={blog.excerpt}
        canonical={`https://cihm.in/blog/${blog.slug}`}
        ogImage={blog.featuredImage}
        ogType="article"
        schemaData={articleSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', url: '/blog' },
          { label: blog.category, url: `/blog/category/${blog.category.toLowerCase().replace(/\s+/g, '-')}` },
          { label: blog.title }
        ]}
      />

      {/* Article Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            {blog.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {blog.readingTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight leading-tight">
          {blog.title}
        </h1>

        {/* Author & Share Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2E328D] font-black flex items-center justify-center text-xs">
              {blog.authorName.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">{blog.authorName}</span>
              <span className="text-[11px] text-slate-400">{blog.authorRole} • Published on {blog.publishDate}</span>
            </div>
          </div>

          <ShareButtons title={blog.title} description={blog.excerpt} />
        </div>
      </div>

      {/* Article Featured Image */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-72 sm:h-96 w-full">
        <img
          src={blog.featuredImage}
          alt={blog.imageAltText || blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <div
          className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            {blog.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md font-semibold"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Academic Programs Callout */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F]">
            Pursue a Career in Healthcare
          </span>
          <h2 className="text-xl font-bold text-[#2E328D] mt-1">
            Interested in Paramedical Training at CIHM Kolkata?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Explore our certified diplomas with 60% practical lab drills and guaranteed hospital postings.
          </p>
        </div>
        <button
          onClick={() => onOpenEnquiry(blog.title)}
          className="px-6 py-2.5 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs shadow-sm flex items-center gap-2 flex-shrink-0"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Apply / Inquire Now</span>
        </button>
      </div>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-[#2E328D]">Recommended Clinical Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedBlogs.map((rb) => (
              <div
                key={rb.id}
                onClick={() => onNavigate(`/blog/${rb.slug}`)}
                className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group shadow-2xs"
              >
                <span className="text-[10px] font-bold text-[#00A54F] bg-green-50 px-2 py-0.5 rounded">
                  {rb.category}
                </span>
                <h4 className="text-xs font-extrabold text-[#2E328D] group-hover:text-[#00A54F] transition-colors mt-2 line-clamp-2">
                  {rb.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">{rb.readingTime}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
