import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  GraduationCap,
  Building2,
  ShieldCheck,
  Loader2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Admission Enquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Please provide your name, phone number, and query.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          courseName: subject,
          message: message.trim(),
          type: 'general'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Submission failed. Please call our campus directly.');
      }
    } catch {
      setError('Network communication failed. Please contact us via phone.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title="Contact & Campus Location | CIHM Kolkata Paramedical Institute"
        description="Contact Central Institute of Healthcare & Management (CIHM) Kolkata for admissions, campus visits, laboratory tour bookings, and hospital affiliations."
        canonical="https://cihm.in/contact"
      />

      <Breadcrumbs items={[{ label: 'Contact & Directions' }]} />

      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
          Campus Help Desk
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
          Contact Admissions & Campus Directions
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          We welcome prospective candidates, parents, and healthcare recruiters to visit our Kolkata campus, tour our diagnostic training labs, and consult with our academic deans.
        </p>
      </div>

      {/* 2 Column Contact Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <h2 className="text-lg font-extrabold text-[#2E328D] mb-4">
            Send an Enquiry or Schedule a Campus Visit
          </h2>

          {submitted ? (
            <div className="py-12 text-center space-y-3 bg-green-50/50 rounded-2xl p-6 border border-green-100">
              <CheckCircle2 className="w-10 h-10 text-[#00A54F] mx-auto" />
              <h3 className="text-base font-bold text-[#2E328D]">Enquiry Successfully Submitted</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. Our admissions officer will contact you shortly on {phone}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Roy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98300 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic of Query
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F] bg-white"
                >
                  <option value="Admission Enquiry">Admission Enquiry (DMLT, Radiology, Dialysis, OT)</option>
                  <option value="London Fellowships 2026-27">1-Year Online Fellowships (London) 2026-27</option>
                  <option value="Campus Laboratory Tour">Campus Laboratory Tour Booking</option>
                  <option value="Hospital Placement Partnership">Hospital Placement Partnership</option>
                  <option value="Student Verification">Student Credential Verification</option>
                  <option value="Other">General Institutional Enquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message / Academic Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Specify batch preferences, education qualifications, or specific questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send Enquiry Message</span>}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Campus Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#2E328D] text-white rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-extrabold text-white">CIHM Kolkata Campus</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Conveniently situated in Kolkata's educational hub with easy connectivity via metro and Eastern Metropolitan Bypass.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00A54F] flex-shrink-0 mt-0.5" />
                <span>
                  Central Institute of Healthcare & Management (CIHM)<br />
                  Salt Lake Sector V / EM Bypass Corridor,<br />
                  Kolkata - 700091, West Bengal, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00A54F] flex-shrink-0" />
                <span>Admissions: +91 33 2456 7890 / +91 98300 12345</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00A54F] flex-shrink-0" />
                <span>admissions@cihm.in / info@cihm.in</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#00A54F] flex-shrink-0" />
                <span>Admissions Desk: Mon – Sat, 9:30 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Campus Visit Guidance
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prior appointment is recommended for laboratory walkthroughs so our clinical instructors can demonstrate automated analyzer setups and address syllabus queries without interrupting ongoing student drills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
