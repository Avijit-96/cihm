import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, Loader2, Phone, Mail, User } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCourse = ''
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [courseName, setCourseName] = useState(defaultCourse);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Update selected course if defaultCourse changes
  React.useEffect(() => {
    if (defaultCourse) {
      setCourseName(defaultCourse);
    }
  }, [defaultCourse]);

  if (!isOpen) return null;

  const coursesList = [
    '⭐ 1-Year Online Fellowships (London) 2026-27',
    'Diploma in Medical Laboratory Technology (DMLT)',
    'Diploma in Radiology & Medical Imaging (DRMIT)',
    'Diploma in Dialysis Technology & Renal Care',
    'Diploma in Operation Theatre Technology (DOTT)',
    'ECG & Cardiovascular Diagnostics',
    'Critical Care & ICU Technology',
    'Hospital Administration & Healthcare Management',
    'Clinical Fellowships (Post-Diploma)',
    'General Admissions & Counselling'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please provide your name and contact phone number.');
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
          courseName: courseName || defaultCourse || 'General Enquiry',
          message: message.trim(),
          type: 'course'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Submission failed. Please try again.');
      }
    } catch {
      setError('Could not connect to admissions desk. Please call our campus directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#2E328D] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00A54F] flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Admissions & Course Enquiry</h3>
              <p className="text-xs text-white/80 mt-0.5">Central Institute of Healthcare & Management, Kolkata</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-green-50 text-[#00A54F] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#2E328D]">Application Enquiry Received</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Our academic counsellor will reach out to you via <strong>{phone}</strong> to guide you regarding batch schedules and campus visits.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2 bg-[#2E328D] text-white font-bold text-xs rounded-lg hover:bg-[#252973] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-lg">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Candidate Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Suman Sen"
                    className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                  />
                </div>
              </div>

              {/* Phone & Email in Two Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98300 12345"
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full pl-9 pr-3 py-2 text-xs font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                    />
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Interested Paramedical Program
                </label>
                <select
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F] bg-white"
                >
                  <option value="">Select a course...</option>
                  {coursesList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message / Remarks */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Questions or Academic Background
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Completed 10+2 Science, interested in practical hospital training and batch timings..."
                  className="w-full px-3 py-2 text-xs font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Submit Application Enquiry</span>}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                Your contact details are strictly kept confidential for institutional academic counselling only.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
