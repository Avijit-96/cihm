import React, { useState } from 'react';
import { Share2, Check, MessageCircle, Linkedin, Facebook, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  title,
  url,
  description = ''
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center flex-wrap gap-2 text-xs">
      <span className="text-slate-400 font-semibold mr-1">Share:</span>
      {/* Web Share API Trigger */}
      <button
        onClick={handleNativeShare}
        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 font-semibold"
        title="Share"
      >
        <Share2 className="w-3.5 h-3.5 text-[#2E328D]" />
        <span className="hidden sm:inline">Share</span>
      </button>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="p-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="p-1.5 rounded-lg bg-blue-50 text-[#2E328D] hover:bg-blue-100 transition-colors"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-3.5 h-3.5" />
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        title="Share on X"
        aria-label="Share on X"
      >
        <Twitter className="w-3.5 h-3.5" />
      </a>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition-colors"
      >
        {copied ? (
          <span className="text-[#00A54F] font-bold flex items-center gap-1">
            <Check className="w-3 h-3" /> Copied
          </span>
        ) : (
          'Copy Link'
        )}
      </button>
    </div>
  );
};
