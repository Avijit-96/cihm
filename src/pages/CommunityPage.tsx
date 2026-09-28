import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { ForumPost } from '../types.js';
import {
  MessageSquare,
  ThumbsUp,
  Tag,
  Clock,
  User,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  Send
} from 'lucide-react';

interface CommunityPageProps {
  onNavigate: (path: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newTag, setNewTag] = useState('General Paramedical');
  const [loading, setLoading] = useState(true);

  // Active reply target
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');

  const fetchPosts = () => {
    fetch('/api/community/posts')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setPosts(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const res = await fetch(`/api/community/posts/${postId}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) => (p.id === postId ? { ...p, likesCount: data.likesCount } : p))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) return;

    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
          authorName: newAuthor.trim(),
          tags: [newTag]
        })
      });
      const data = await res.json();
      if (data.success) {
        setPosts([data.data, ...posts]);
        setNewTitle('');
        setNewContent('');
        setNewAuthor('');
        setShowNewModal(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddReply = async (postId: string) => {
    if (!replyText.trim() || !replyAuthor.trim()) return;

    try {
      const res = await fetch(`/api/community/posts/${postId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: replyText.trim(),
          authorName: replyAuthor.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) => {
            if (p.id === postId) {
              return {
                ...p,
                repliesCount: (p.repliesCount || 0) + 1,
                replies: [...(p.replies || []), data.data]
              };
            }
            return p;
          })
        );
        setReplyText('');
        setActiveReplyId(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const tagsList = ['All', 'General Paramedical', 'DMLT', 'Radiology', 'Dialysis', 'OT Tech', 'Hospital Internship'];

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    const matchesTag =
      selectedTag === 'All' || (p.tags && p.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <SEOHelmet
        title="Student Community & Paramedical Forum | CIHM Kolkata"
        description="Connect with CIHM students, alumni, and clinical faculty in our moderated community forum. Discuss clinical cases, analyzer protocols, and hospital internships."
        canonical="https://cihm.in/community"
      />

      <Breadcrumbs items={[{ label: 'Student Community' }]} />

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            Peer & Clinical Exchange
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E328D] tracking-tight mt-2">
            CIHM Student & Paramedical Forum
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-xl">
            A collaborative space for CIHM trainees and alumni to discuss diagnostic case studies, analyzer calibrations, hospital rotation tips, and clinical exams.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-5 py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-2 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Start a Discussion</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search discussions or questions..."
            className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs pb-1">
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-[#2E328D] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions Feed */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">Loading forum threads...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-100 p-8">
          <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-[#2E328D]">No forum threads found</h3>
          <p className="text-xs text-slate-500 mt-1">Be the first to post a question or topic!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:border-blue-200 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-[#2E328D] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {post.authorName ? post.authorName.charAt(0) : 'U'}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#2E328D]">{post.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-semibold text-slate-600">{post.authorName}</span>
                      {post.isStaff && (
                        <span className="text-[9.5px] bg-blue-50 text-[#2E328D] font-bold px-1.5 py-0.2 rounded">
                          Staff
                        </span>
                      )}
                      <span>•</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>

                {post.tags && post.tags[0] && (
                  <span className="text-[10px] font-bold text-[#00A54F] bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">
                    {post.tags[0]}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed">
                {post.content}
              </p>

              {/* Action Buttons: Likes & Replies */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-[#00A54F] transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.likesCount || 0} Helpful</span>
                  </button>

                  <button
                    onClick={() => setActiveReplyId(activeReplyId === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-[#2E328D] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.repliesCount || 0} Replies</span>
                  </button>
                </div>
              </div>

              {/* Thread Replies List */}
              {post.replies && post.replies.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5 pl-4 sm:pl-6 border-l-2 border-slate-100">
                  {post.replies.map((r, rIdx) => (
                    <div key={r.id || rIdx} className="text-xs bg-slate-50/70 p-3 rounded-xl">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                        <span className="font-bold text-[#2E328D]">{r.authorName}</span>
                        {r.isStaff && (
                          <span className="text-[9px] bg-green-100 text-green-800 font-bold px-1.5 rounded">
                            Faculty Answer
                          </span>
                        )}
                        <span>•</span>
                        <span>{r.createdAt}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{r.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Reply Form */}
              {activeReplyId === post.id && (
                <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/50 p-3 rounded-xl space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Suman, DMLT batch)"
                      value={replyAuthor}
                      onChange={(e) => setReplyAuthor(e.target.value)}
                      className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00A54F]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write your clinical answer or observation..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00A54F]"
                    />
                    <button
                      onClick={() => handleAddReply(post.id)}
                      className="px-3 py-1.5 bg-[#2E328D] hover:bg-[#252973] text-white text-xs font-bold rounded-lg flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New Topic Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-extrabold text-[#2E328D] mb-4">Start a Discussion</h3>
            <form onSubmit={handleCreatePost} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Mukherjee (2nd Yr DMLT)"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A54F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Category</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A54F] bg-white"
                >
                  <option value="General Paramedical">General Paramedical</option>
                  <option value="DMLT">DMLT Laboratory</option>
                  <option value="Radiology">Radiology & Imaging</option>
                  <option value="Dialysis">Dialysis & Renal Care</option>
                  <option value="OT Tech">Operation Theatre</option>
                  <option value="Hospital Internship">Hospital Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Discussion Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Questions regarding high WBC counts in automated analyzers"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A54F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Details & Context</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your case observation, analyzer error code, or study question..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A54F]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#00A54F] hover:bg-[#009245] text-white rounded-lg shadow-xs"
                >
                  Publish Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
