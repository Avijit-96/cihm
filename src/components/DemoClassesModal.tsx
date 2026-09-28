import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Film,
  Sparkles,
  Clock,
  User,
  CheckCircle2,
  Calendar,
  Building,
  ArrowRight,
  Zap,
  Phone
} from 'lucide-react';
import { DemoVideo } from '../types.js';

interface DemoClassesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: (courseName?: string) => void;
  initialVideoId?: string;
}

export const DemoClassesModal: React.FC<DemoClassesModalProps> = ({
  isOpen,
  onClose,
  onOpenEnquiry,
  initialVideoId
}) => {
  const [videos, setVideos] = useState<DemoVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<DemoVideo | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/demo-videos')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data && data.data.length > 0) {
            setVideos(data.data);
            if (initialVideoId) {
              const matched = data.data.find((v: DemoVideo) => v.id === initialVideoId);
              setSelectedVideo(matched || data.data[0]);
            } else {
              setSelectedVideo(data.data[0]);
            }
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isOpen, initialVideoId]);

  if (!isOpen) return null;

  const filteredVideos = videos.filter((v) => {
    if (activeCategory === 'all') return true;
    return (v.department || '').toLowerCase().includes(activeCategory.toLowerCase()) ||
           (v.category || '').toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 text-white flex items-center justify-center shadow-lg">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  CIHM Practical Demo Classes & Diagnostic Facility Tours
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  Live Lab Drills
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Experience real clinical workstations, automated analyzers, and bedside hospital simulation.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close video viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split into Player on Left, Playlist on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Main Video Stage (Left 7 or 8 columns) */}
          <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between bg-slate-950/40 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4">
            {selectedVideo ? (
              <div className="space-y-4">
                {/* Embedded Video Player */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-xl group">
                  {selectedVideo.videoUrl && selectedVideo.videoUrl.includes('youtube') ? (
                    <iframe
                      src={`${selectedVideo.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                      title={selectedVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                      <img
                        src={selectedVideo.thumbnailUrl}
                        alt={selectedVideo.title}
                        className="w-full h-full object-cover opacity-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all cursor-pointer">
                          <Play className="w-8 h-8 fill-white ml-1" />
                        </div>
                        <span className="text-xs font-bold text-white mt-3 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                          Click to Play Clinical Demonstration
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Department & Duration Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-950/80 text-emerald-400 border border-white/10 backdrop-blur-md">
                      {selectedVideo.department}
                    </span>
                    <span className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-950/80 text-slate-200 border border-white/10 backdrop-blur-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {selectedVideo.duration}
                    </span>
                  </div>
                </div>

                {/* Video Info & Clinical Learnings */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                      {selectedVideo.title}
                    </h2>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Category: <strong className="text-slate-200">{selectedVideo.category}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <User className="w-3.5 h-3.5" />
                      <span>{selectedVideo.instructor}</span>
                    </div>
                    {selectedVideo.instructorTitle && (
                      <>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 text-[11px] truncate">
                          {selectedVideo.instructorTitle}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedVideo.description}
                  </p>

                  {/* Key Learnings Pills */}
                  {selectedVideo.keyLearnings && selectedVideo.keyLearnings.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Clinical Competencies & Skills Covered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedVideo.keyLearnings.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[11px] bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700/80"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-slate-500 text-sm">
                Select a demo video from the playlist to begin watching.
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                Want to attend a live practical class at Dum Dum campus?
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="tel:+919073737888"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Admissions</span>
                </a>
                <button
                  onClick={() => {
                    onClose();
                    onOpenEnquiry(selectedVideo?.department || 'Demo Class Visit');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Book Free Campus Demo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Video Playlist & Department Tabs (Right 4 columns) */}
          <div className="lg:col-span-4 p-4 sm:p-5 flex flex-col bg-slate-900/90 space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
                Filter Demonstrations:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Classes' },
                  { id: 'pathology', label: 'Pathology' },
                  { id: 'radiology', label: 'Radiology' },
                  { id: 'dialysis', label: 'Dialysis' },
                  { id: 'operation', label: 'OT Tech' },
                  { id: 'campus', label: 'Facilities' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-[#1E3A8A] text-white shadow-xs font-black'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Video List */}
            <div className="space-y-2.5 overflow-y-auto max-h-[500px] pr-1">
              {filteredVideos.map((vid) => {
                const isCurrent = selectedVideo?.id === vid.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex gap-3 group ${
                      isCurrent
                        ? 'bg-slate-800 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isCurrent ? 'bg-emerald-500 text-slate-950' : 'bg-white/80 text-slate-900'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white font-mono text-[9px] px-1 rounded">
                        {vid.duration}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400 truncate">
                        {vid.department}
                      </div>
                      <h4
                        className={`text-xs font-bold line-clamp-2 mt-0.5 leading-snug transition-colors ${
                          isCurrent ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {vid.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 truncate">
                        Mentor: {vid.instructor}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
