import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { SEOHelmet } from '../components/SEOHelmet.js';
import { StudyRoom } from '../types.js';
import {
  Users,
  BookOpen,
  Sparkles,
  MessageSquare,
  Clock,
  Send,
  Video,
  FileText,
  CheckCircle2,
  Lock,
  Plus
} from 'lucide-react';

interface StudyConnectPageProps {
  onNavigate: (path: string) => void;
}

export const StudyConnectPage: React.FC<StudyConnectPageProps> = ({ onNavigate }) => {
  const [rooms, setRooms] = useState<StudyRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ id: string; author: string; text: string; time: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/study-rooms')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setRooms(d.data);
          if (d.data.length > 0) {
            setActiveRoomId(d.data[0].id);
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Listen for real-time room events via SSE
  useEffect(() => {
    const sse = new EventSource('/api/events/stream');
    sse.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.event === 'study_room_message' && payload.data) {
          if (payload.data.roomId === activeRoomId) {
            setMessages((prev) => [...prev, payload.data.message]);
          }
        }
      } catch (err) {
        console.error('SSE Error:', err);
      }
    };

    return () => sse.close();
  }, [activeRoomId]);

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeRoomId) return;

    const newMsg = {
      id: Date.now().toString(),
      author: userName.trim() || 'Student Intern',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Optional POST to mock backend
    fetch(`/api/study-rooms/${activeRoomId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMsg)
    }).catch(() => {});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <SEOHelmet
        title="Study Connect Virtual Rooms | CIHM Kolkata"
        description="Collaborate in real-time study rooms with CIHM Kolkata peers. Discuss diagnostic case reports, exam revisions, and analyzer protocols."
        canonical="https://cihm.in/study-connect"
      />

      <Breadcrumbs items={[{ label: 'Study Connect' }]} />

      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A54F] bg-green-50 px-2.5 py-1 rounded-md">
            Collaborative Learning Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2E328D] tracking-tight mt-2">
            CIHM Study Connect
          </h1>
          <p className="mt-1 text-slate-500 text-xs sm:text-sm">
            Live digital collaboration rooms for paramedical students to review lab cases, practice clinical checklists, and study in teams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Your Screen Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
          />
        </div>
      </div>

      {/* Virtual Rooms Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left: Rooms Directory */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Active Virtual Rooms
            </h3>
            <span className="text-[10px] bg-green-50 text-[#00A54F] font-bold px-2 py-0.5 rounded-full">
              Live Hubs
            </span>
          </div>

          <div className="space-y-2">
            {rooms.map((room) => {
              const isActive = room.id === activeRoomId;
              return (
                <div
                  key={room.id}
                  onClick={() => {
                    setActiveRoomId(room.id);
                    setMessages([]);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isActive
                      ? 'border-[#2E328D] bg-blue-50/50 shadow-xs'
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#2E328D] leading-tight">
                      {room.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#00A54F]" />
                      {room.participantsCount || 4} Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{room.description}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-100 font-semibold text-slate-600">
                      {room.courseCategory}
                    </span>
                    <span className="text-[#00A54F] font-bold">Join Session →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Live Session Room */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between overflow-hidden">
          {/* Room Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A54F] animate-pulse" />
                <h3 className="text-sm sm:text-base font-extrabold text-[#2E328D]">
                  {activeRoom?.name || 'General Study Room'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{activeRoom?.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                <BookOpen className="w-3.5 h-3.5 text-[#2E328D]" />
                <span>{activeRoom?.topic || 'Clinical Lab Protocols'}</span>
              </span>
            </div>
          </div>

          {/* Chat Feed */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3 min-h-[300px] max-h-[440px] bg-slate-50/20">
            {/* Pinned Topic Prompt */}
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-700">
              <span className="font-bold text-[#2E328D] block mb-1">Today's Study Focus:</span>
              <span>
                Reviewing critical hematology abnormal flags, automated analyzer maintenance routines, and cross-match verification procedures before hospital rotation shifts.
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No new messages in this room yet. Send a note, ask a question, or share an observation!
              </div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="flex flex-col items-start bg-white p-3 rounded-xl border border-slate-100 shadow-2xs max-w-xl">
                  <div className="flex items-center justify-between w-full text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-[#2E328D]">{m.author}</span>
                    <span>{m.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{m.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-slate-100 bg-white flex gap-2 items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your study note, question, or diagnostic observation..."
              className="flex-1 px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A54F]/20 focus:border-[#00A54F]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#00A54F] hover:bg-[#009245] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send Note</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
