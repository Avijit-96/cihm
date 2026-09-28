import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { ReviewItem, ReviewSettings } from '../types.js';
import {
  Star,
  Quote,
  Building2,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  Filter,
  PlusCircle,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';

interface ReviewsPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [reviewsData, setReviewsData] = useState<{ settings: ReviewSettings; reviews: ReviewItem[] } | null>(null);
  const [filter, setFilter] = useState<'all' | 'student' | 'partner'>('all');
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New review form state
  const [reviewerName, setReviewerName] = useState('');
  const [roleOrCourse, setRoleOrCourse] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewType, setReviewType] = useState<'student' | 'partner'>('student');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setReviewsData(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewText.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewerName: reviewerName.trim(),
          roleOrDesignation: roleOrCourse.trim(),
          rating,
          reviewText: reviewText.trim(),
          type: reviewType,
          source: reviewType === 'partner' ? 'industry_partner' : 'google_business'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Thank you! Your testimonial has been submitted for verification.');
        setTimeout(() => {
          setShowSubmitModal(false);
          setSuccessMsg('');
          setReviewerName('');
          setRoleOrCourse('');
          setReviewText('');
          fetchReviews();
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const reviews = reviewsData?.reviews || [];
  const filtered = reviews.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'student') return r.type === 'student' || r.source === 'google_business';
    if (filter === 'partner') return r.type === 'partner' || r.source === 'industry_partner';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title="Verified Student & Hospital Reviews | CIHM Kolkata"
        description="Read authentic, verified testimonials from CIHM Kolkata alumni working in hospitals and medical directors of recruiting healthcare networks."
        canonical="https://cihm.in/reviews"
      />

      <Breadcrumbs items={[{ label: 'Verified Reviews & Endorsements' }]} />

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            Verified Testimonials
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-2">
            Student Stories & Healthcare Endorsements
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm max-w-xl">
            Hear from graduated technologists excelling in multispecialty hospital wards, and healthcare leaders who trust CIHM for paramedical staffing.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-2 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit a Review</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-2xs w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filter === 'all' ? 'bg-[#2E328D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setFilter('student')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            filter === 'student' ? 'bg-[#2E328D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-[#00A54F]" />
          <span>Alumni Students</span>
        </button>
        <button
          onClick={() => setFilter('partner')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            filter === 'partner' ? 'bg-[#00A54F] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Hospital Partners</span>
        </button>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">Loading reviews...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((rev) => {
            const isPartner = rev.type === 'partner' || rev.source === 'industry_partner';
            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={
                          rev.reviewerAvatar ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                        }
                        alt={rev.reviewerName}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100"
                      />
                      <div>
                        <h3 className="text-base font-extrabold text-[#2E328D]">{rev.reviewerName}</h3>
                        <p className="text-xs font-bold text-slate-700">{rev.roleOrDesignation}</p>
                        {rev.organization && (
                          <p className="text-xs text-[#00A54F] font-bold mt-0.5">{rev.organization}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      "{rev.reviewText}"
                    </p>
                  </div>
                </div>

                {rev.response && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs bg-slate-50 p-3 rounded-xl flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00A54F] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#2E328D]">CIHM Response:</span>{' '}
                      <span className="text-slate-600">{rev.response}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Submit Review Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-extrabold text-[#2E328D] mb-4">Share Your Experience</h3>
            {successMsg ? (
              <div className="py-8 text-center text-xs text-green-700 font-bold bg-green-50 rounded-xl">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleCreateReview} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Das"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A54F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Reviewer Type</label>
                    <select
                      value={reviewType}
                      onChange={(e) => setReviewType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A54F] bg-white"
                    >
                      <option value="student">CIHM Student / Alumnus</option>
                      <option value="partner">Hospital Medical Partner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Star Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A54F] bg-white"
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Very Good)</option>
                      <option value="3">3 Stars (Good)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation or Course / Batch
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DMLT Alumnus, Lab Technologist at Medica"
                    value={roleOrCourse}
                    onChange={(e) => setRoleOrCourse(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A54F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Testimonial</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share how the practical training, hospital postings, and faculty mentorship shaped your medical career..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#00A54F]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 text-xs font-bold bg-[#00A54F] hover:bg-[#009245] text-white rounded-lg shadow-xs"
                  >
                    {submitting ? 'Submitting...' : 'Submit Testimonial'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
