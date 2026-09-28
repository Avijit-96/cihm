import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { EventItem } from '../types.js';
import { Calendar, Clock, MapPin, Users, ArrowRight, Tag, Sparkles } from 'lucide-react';

interface EventsPageProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (eventName?: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setEvents(d.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      <SEOHelmet
        title="Clinical Events, Workshops & Seminars | CIHM Kolkata"
        description="Join diagnostic workshops, clinical hands-on seminars, and healthcare hospital symposia hosted by CIHM Kolkata."
        canonical="https://cihm.in/events"
      />

      <Breadcrumbs items={[{ label: 'Events & Seminars' }]} />

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
          Continuous Medical Education
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E328D] tracking-tight mt-3">
          Campus Workshops & Clinical Seminars
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
          Hands-on analyzer masterclasses, BLS certification workshops, and multidisciplinary medical webinars conducted in partnership with leading healthcare institutions.
        </p>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">Loading events calendar...</div>
      ) : events.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-100 p-8">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-[#2E328D]">No upcoming events at this moment</h3>
          <p className="text-xs text-slate-500 mt-1">Please check back soon for our new clinical workshop schedule.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="h-52 w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#00A54F] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-2xs">
                    {event.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1 font-semibold text-[#2E328D]">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-[#2E328D] leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#00A54F] flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(`/events/${event.slug}`)}
                  className="text-xs font-bold text-[#2E328D] hover:underline"
                >
                  Read Event Agenda →
                </button>
                <button
                  onClick={() => onOpenEnquiry(event.title)}
                  className="px-4 py-2 rounded-lg bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  Register Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
