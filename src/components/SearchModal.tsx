import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, FileText, Calendar, HelpCircle, ArrowRight, Loader2 } from 'lucide-react';

interface SearchResultItem {
  type: 'course' | 'blog' | 'event' | 'faq';
  title: string;
  slug?: string;
  category?: string;
  url?: string;
  excerpt?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'course' | 'blog' | 'event' | 'faq'>('all');
  const [results, setResults] = useState<{
    courses: SearchResultItem[];
    blogs: SearchResultItem[];
    events: SearchResultItem[];
    faqs: SearchResultItem[];
    totalCount: number;
  }>({ courses: [], blogs: [], events: [], faqs: [], totalCount: 0 });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ courses: [], blogs: [], events: [], faqs: [], totalCount: 0 });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ courses: [], blogs: [], events: [], faqs: [], totalCount: 0 });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const json = await res.json();
        if (json.success) {
          setResults(json.data);
        }
      } catch (err) {
        console.error('Search query failed:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const allItems: SearchResultItem[] = [
    ...results.courses,
    ...results.blogs,
    ...results.events,
    ...results.faqs
  ];

  const filteredItems = activeTab === 'all' ? allItems : allItems.filter(i => i.type === activeTab);

  const getIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4 text-[#2E328D]" />;
      case 'blog': return <FileText className="w-4 h-4 text-[#00A54F]" />;
      case 'event': return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'faq': return <HelpCircle className="w-4 h-4 text-slate-500" />;
      default: return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-[#2E328D] flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, blogs, clinical events, FAQs..."
            className="w-full bg-transparent border-none text-slate-800 text-sm sm:text-base font-medium placeholder-slate-400 focus:outline-none focus:ring-0"
          />
          {loading && <Loader2 className="w-4 h-4 text-[#00A54F] animate-spin flex-shrink-0" />}
          <button
            onClick={onClose}
            aria-label="Close search modal"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        {results.totalCount > 0 && (
          <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                activeTab === 'all' ? 'bg-[#2E328D] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All ({results.totalCount})
            </button>
            {results.courses.length > 0 && (
              <button
                onClick={() => setActiveTab('course')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  activeTab === 'course' ? 'bg-[#2E328D] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Courses ({results.courses.length})
              </button>
            )}
            {results.blogs.length > 0 && (
              <button
                onClick={() => setActiveTab('blog')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  activeTab === 'blog' ? 'bg-[#2E328D] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Blogs ({results.blogs.length})
              </button>
            )}
            {results.events.length > 0 && (
              <button
                onClick={() => setActiveTab('event')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  activeTab === 'event' ? 'bg-[#2E328D] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Events ({results.events.length})
              </button>
            )}
            {results.faqs.length > 0 && (
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  activeTab === 'faq' ? 'bg-[#2E328D] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                FAQs ({results.faqs.length})
              </button>
            )}
          </div>
        )}

        {/* Results List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2 divide-y divide-slate-50">
          {query.trim() === '' ? (
            <div className="py-10 text-center text-slate-400 text-xs sm:text-sm">
              <p className="font-semibold text-slate-600">Quick Search Shortcuts</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {['DMLT', 'Radiology', 'Dialysis', 'Operation Theatre', 'Hospital Internships', 'Admissions'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#2E328D] rounded-md font-medium text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredItems.length === 0 && !loading ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              <p className="font-bold text-[#2E328D]">No matching records found</p>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your keywords or search for a broad course term like "DMLT" or "Dialysis".</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (item.url) {
                    onClose();
                    onNavigate(item.url);
                  }
                }}
                className={`pt-2.5 pb-2 px-3 rounded-xl flex items-start justify-between gap-3 group transition-colors ${
                  item.url ? 'cursor-pointer hover:bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white transition-colors mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#2E328D] group-hover:text-[#00A54F] transition-colors">
                        {item.title}
                      </h4>
                      {item.category && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                      )}
                    </div>
                    {item.excerpt && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </div>
                {item.url && (
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#00A54F] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-2" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
