import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { Announcement } from '../types.js';
import { Bell, Calendar, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/announcements')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setAnnouncements(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <SEOHelmet
        title="Official Academic Announcements & Notices | CIHM Kolkata"
        description="Official student and academic notifications, examination schedules, laboratory postings, and hospital rotation batches from CIHM Kolkata."
        canonical="https://cihm.in/announcements"
      />

      <Breadcrumbs items={[{ label: 'Announcements' }]} />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
          Notice Board
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E328D] tracking-tight mt-2">
          Academic Announcements & Notices
        </h1>
        <p className="mt-2 text-slate-500 text-xs sm:text-sm">
          Stay informed regarding upcoming semester examinations, clinical hospital posting dates, and campus advisories.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">Loading announcements...</div>
      ) : (
        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all ${
                ann.isUrgent
                  ? 'border-amber-300 bg-amber-50/20 shadow-xs'
                  : 'border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                      ann.isUrgent ? 'bg-amber-100 text-amber-800' : 'bg-blue-50 text-[#2E328D]'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#2E328D]">{ann.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {ann.date}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-slate-600">{ann.category}</span>
                    </div>
                  </div>
                </div>

                {ann.isUrgent && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                    <AlertCircle className="w-3 h-3" />
                    Important Notice
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed">
                {ann.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
