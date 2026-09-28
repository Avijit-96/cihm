import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { Blog } from '../types.js';
import { Search, Calendar, Clock, User, ArrowRight, Tag, BookOpen } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBlogs(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    'All',
    'Laboratory Technology',
    'Radiology & Imaging',
    'Renal Care',
    'Surgical & OT',
    'Healthcare Careers'
  ];

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || b.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title="Healthcare Career Insights & Clinical Blog | CIHM Kolkata"
        description="Read clinical articles, diagnostic procedure breakdowns, and paramedical career guides published by faculty and medical experts at CIHM Kolkata."
        canonical="https://cihm.in/blog"
      />

      <Breadcrumbs items={[{ label: 'Blog & Articles' }]} />

      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
          Paramedical Knowledge Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
          Healthcare Insights & Clinical Guides
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Deep dives into modern clinical diagnostics, laboratory analyzer procedures, radiology protocols, and healthcare career planning authored by CIHM clinical faculty.
        </p>

        {/* Filter and Search Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clinical topics, e.g. DMLT, CBC, Dialysis..."
              className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-colors ${
                  selectedCategory === c
                    ? 'bg-[#2E328D] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          Loading clinical articles...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-100 p-8">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-[#2E328D]">No articles matching your criteria</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((b) => (
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
                    loading="lazy"
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

                  <h2 className="text-base font-extrabold text-[#2E328D] group-hover:text-[#00A54F] transition-colors leading-snug line-clamp-2">
                    {b.title}
                  </h2>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-slate-600 border-t border-slate-50 mt-2">
                <span className="text-[11px] text-slate-400">By {b.authorName}</span>
                <span className="text-[#2E328D] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold text-[11px]">
                  <span>Read Article</span>
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
