import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { EventItem } from '../types.js';
import { Calendar, Clock, MapPin, CheckCircle2, User, Share2, ArrowRight } from 'lucide-react';
import { ShareButtons } from '../components/ShareButtons.js';

interface EventDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (eventName?: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenEnquiry
}) => {
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const found = (d.data || []).find((e: EventItem) => e.slug === slug);
          setEvent(found || null);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500">Loading event details...</div>;
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#2E328D]">Event Not Found</h2>
        <button
          onClick={() => onNavigate('/events')}
          className="mt-4 px-4 py-2 bg-[#2E328D] text-white font-bold text-xs rounded-lg"
        >
          Return to Events Calendar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <SEOHelmet
        title={`${event.title} | CIHM Events`}
        description={event.description}
        canonical={`https://cihm.in/events/${event.slug}`}
        ogImage={event.image}
      />

      <Breadcrumbs
        items={[
          { label: 'Events', url: '/events' },
          { label: event.title }
        ]}
      />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            {event.category}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight leading-tight">
          {event.title}
        </h1>

        <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-bold text-[#2E328D]">
            <Calendar className="w-4 h-4 text-[#00A54F]" />
            <span>Date: {event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Time: {event.time}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>Venue: {event.location}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onOpenEnquiry(event.title)}
            className="px-6 py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95"
          >
            Register Attendance
          </button>
          <ShareButtons title={event.title} description={event.description} />
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs h-72 sm:h-96 w-full">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-[#2E328D]">Event Overview & Agenda</h3>
        <p className="text-xs sm:text-base text-slate-700 leading-relaxed">
          {event.description}
        </p>

        {event.speaker && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2E328D] font-bold flex items-center justify-center text-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-semibold">Keynote Speaker / Faculty</span>
              <span className="text-sm font-bold text-[#2E328D]">{event.speaker}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
