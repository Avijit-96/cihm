import React from 'react';

interface CIHMLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'compact' | 'white';
}

export const CIHMLogo: React.FC<CIHMLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full'
}) => {
  const isCompact = variant === 'compact';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official CIHM Healthcare Shield & Cross Emblem */}
      <div
        className={`relative flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden shadow-sm transition-transform ${
          size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-13 h-13' : 'w-11 h-11'
        } bg-[#2E328D]`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle concentric rings */}
          <circle cx="50" cy="50" r="42" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.25" />
          <circle cx="50" cy="50" r="34" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.4" />
          
          {/* Paramedical Caduceus Wings / Leaves in CIHM Green */}
          <path
            d="M50 20 C36 28 32 44 50 62 C68 44 64 28 50 20 Z"
            fill="#00A54F"
            fillOpacity="0.3"
          />
          
          {/* Solid Healthcare Cross in CIHM Green with crisp white border */}
          <rect x="42" y="24" width="16" height="52" rx="4" fill="#00A54F" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="24" y="42" width="52" height="16" rx="4" fill="#00A54F" stroke="#FFFFFF" strokeWidth="1.5" />
          
          {/* Central Academic Core Star in White */}
          <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Typography */}
      {!isCompact && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold tracking-tight text-[#2E328D] text-lg sm:text-xl leading-none">
              CIHM
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A54F] bg-[#00A54F]/10 px-1.5 py-0.5 rounded">
              Kolkata
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#2E328D]/80 tracking-normal uppercase leading-tight mt-0.5 hidden sm:block">
            Central Institute of Healthcare & Management
          </span>
          <span className="text-[9.5px] font-medium text-slate-500 leading-none mt-0.5 hidden sm:block">
            Paramedical & Clinical Diagnostics
          </span>
        </div>
      )}
    </div>
  );
};
