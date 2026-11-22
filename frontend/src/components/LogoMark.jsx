import React from 'react';

export const LogoMark = ({ size = 32, variant = 'color', className = '' }) => {
  const isDark = variant === 'dark';
  const pinColor = isDark ? '#FFFFFF' : '#174A78';
  const arcColor = isDark ? '#36C9BD' : '#159B91';

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      role="img" 
      aria-label="PGI SAATHI logo mark" 
      className={`shrink-0 ${className}`}
    >
      <defs>
        <mask id="cross-cutout-mask">
          <rect width="64" height="64" fill="#ffffff" />
          <rect x="28.5" y="16.5" width="7" height="19" rx="2" fill="#000000" />
          <rect x="22.5" y="22.5" width="19" height="7" rx="2" fill="#000000" />
        </mask>
      </defs>
      <path 
        d="M32 52C32 52 15 38.5 15 26a17 17 0 0134 0C49 38.5 32 52 32 52Z" 
        fill={pinColor} 
        mask="url(#cross-cutout-mask)" 
      />
      <path 
        d="M13 50.5Q32 64 51 50.5" 
        fill="none" 
        stroke={arcColor} 
        strokeWidth="4.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
};
