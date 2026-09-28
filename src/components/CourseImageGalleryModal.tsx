import React, { useState } from 'react';
import {
  X,
  Camera,
  Image as ImageIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Tag,
  Building2,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { CourseImageItem } from '../types.js';

interface CourseImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: CourseImageItem[];
  onOpenEnquiry?: (courseName?: string) => void;
}

export const CourseImageGalleryModal: React.FC<CourseImageGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  onOpenEnquiry
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<CourseImageItem | null>(null);

  if (!isOpen) return null;

  const categories = ['all', ...Array.from(new Set(images.map((img) => img.category)))];

  const filteredImages = images.filter((img) => {
    if (activeCategory === 'all') return true;
    return img.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIdx = filteredImages.findIndex((i) => i.id === selectedImage.id);
    const prevIdx = (currentIdx - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIdx]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIdx = filteredImages.findIndex((i) => i.id === selectedImage.id);
    const nextIdx = (currentIdx + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIdx]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Course Images & Practical Labs Lightbox Gallery"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Gallery Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#1f226b] via-[#2E328D] to-[#00A54F] text-white flex-shrink-0 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner flex-shrink-0">
              <Camera className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                  Verified Lab Photography
                </span>
                <span className="text-xs text-white/80 font-bold">
                  {images.length} Course & Lab Photos Online
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white mt-0.5">
                CIHM Practical Labs & Course Images Gallery
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto flex-shrink-0 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#2E328D] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {cat === 'all' ? `All Photos (${images.length})` : cat}
            </button>
          ))}
        </div>

        {/* Gallery Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <Camera className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="font-bold text-sm">No photos found in this department category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950">
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-black text-emerald-400 border border-emerald-500/30">
                      {img.category}
                    </span>
                  </div>

                  <div className="p-3 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-xs text-slate-900 line-clamp-1 group-hover:text-[#2E328D] transition-colors">
                        {img.title}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#00A54F] line-clamp-1 mt-0.5">
                        {img.courseName}
                      </p>
                      {img.caption && (
                        <p className="text-[10.5px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                          {img.caption}
                        </p>
                      )}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span>{img.department}</span>
                      <span className="font-bold text-[#2E328D] group-hover:underline">View ↗</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Image Full Lightbox Viewer Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 text-white animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Toolbar */}
            <div
              className="flex items-center justify-between gap-4 w-full max-w-6xl mx-auto flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  {selectedImage.department} • {selectedImage.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white">{selectedImage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-semibold">{selectedImage.courseName}</p>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Central Image View with Navigation Controls */}
            <div
              className="relative flex items-center justify-center flex-1 max-h-[70vh] my-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handlePrevImage}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[68vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
              />

              <button
                onClick={handleNextImage}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>

            {/* Bottom Caption and CTA */}
            <div
              className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                  {selectedImage.caption || 'Authentic clinical workstation training photograph at CIHM Kolkata.'}
                </p>
              </div>

              {onOpenEnquiry && (
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onOpenEnquiry(selectedImage.courseName);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#00A54F] hover:bg-[#009245] text-white font-black text-xs flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>Apply for this Course</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
