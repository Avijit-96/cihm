import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { Blog } from '../types.js';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

interface BlogCategoryPageProps {
  categorySlug: string;
  onNavigate: (path: string) => void;
}

export const BlogCategoryPage: React.FC<BlogCategoryPageProps> = ({
  categorySlug,
  onNavigate
}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Formatted title from slug
  const formattedCategory = categorySlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const list = (d.data || []).filter((b: Blog) => {
            const catSlug = b.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return catSlug === categorySlug || b.category.toLowerCase().includes(categorySlug.replace(/-/g, ' '));
          });
          setBlogs(list);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categorySlug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title={`${formattedCategory} Articles & Guides | CIHM Kolkata`}
        description={`Explore articles, clinical guides, and procedure overviews in ${formattedCategory} from CIHM Kolkata.`}
        canonical={`https://cihm.in/blog/category/${categorySlug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', url: '/blog' },
          { label: formattedCategory }
        ]}
      />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
          Category Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
          {formattedCategory}
        </h1>
        <p className="mt-2 text-slate-500 text-xs sm:text-sm">
          Browsing all clinical publications and career guidance related to {formattedCategory}.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">Loading articles...</div>
      ) : blogs.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-100 p-8">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-[#2E328D]">No articles found in this category</h3>
          <button
            onClick={() => onNavigate('/blog')}
            className="mt-4 px-4 py-2 bg-[#2E328D] text-white font-bold text-xs rounded-lg"
          >
            Back to All Articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <article
              key={b.id}
              onClick={() => onNavigate(`/blog/${b.slug}`)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={b.featuredImage}
                    alt={b.imageAltText || b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#2E328D] shadow-2xs">
                    {b.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {b.readingTime}
                    </span>
                    <span>{b.publishDate}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#2E328D] group-hover:text-[#00A54F] transition-colors leading-snug line-clamp-2">
                    {b.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-slate-600 border-t border-slate-50 mt-2">
                <span className="text-[11px] text-slate-400">By {b.authorName}</span>
                <span className="text-[#2E328D] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold text-[11px]">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
