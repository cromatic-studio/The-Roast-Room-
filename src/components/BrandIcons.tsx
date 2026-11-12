import React from 'react';

// Official Brand Wordmark & Emblem Logo
export const BrandLogo: React.FC<{
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
  style?: React.CSSProperties;
}> = ({ variant = 'dark', className = '', style }) => {
  const isLight = variant === 'light';
  const logoSrc = isLight ? '/logo-cream.svg' : '/logo-forest.svg';

  return (
    <div className={`brand-logo-lockup ${className}`} style={{ display: 'inline-flex', alignItems: 'center', ...style }}>
      <img
        src={logoSrc}
        alt="The Roast Room - Coffee Roasters • Every Bean Tells A Story"
        className="brand-logo-img"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

// Two roasted coffee beans as depicted on the packet
export const RoastedBeansIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 320 280"
    className={className}
    style={{ width: '100%', height: 'auto', overflow: 'visible' }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Flat natural shading without generic neon gradient */}
      <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0C1B1A" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Left roasted bean (angled) */}
    <g transform="translate(100, 140) rotate(-22)" filter="url(#softShadow)">
      <path
        d="M 0,-70 C 45,-70 58,-25 58,15 C 58,55 35,80 0,80 C -35,80 -58,55 -58,15 C -58,-25 -45,-70 0,-70 Z"
        fill="#552C16"
      />
      {/* Dark rim/shadow contour */}
      <path
        d="M -15,-65 C 35,-65 48,-20 48,15 C 48,48 28,70 0,72"
        stroke="#361B0D"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Crack/crease with golden roast edge */}
      <path
        d="M 0,-56 C -14,-25 18,20 0,64"
        stroke="#1A0D06"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M -1,-54 C -12,-23 16,18 -1,60"
        stroke="#C98845"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </g>

    {/* Right roasted bean (slightly overlapping) */}
    <g transform="translate(195, 145) rotate(18)" filter="url(#softShadow)">
      <path
        d="M 0,-75 C 48,-75 62,-28 62,18 C 62,60 38,85 0,85 C -38,85 -62,60 -62,18 C -62,-28 -48,-75 0,-75 Z"
        fill="#66341B"
      />
      {/* Dark rim contour */}
      <path
        d="M -20,-70 C 38,-70 52,-24 52,18 C 52,52 30,76 0,78"
        stroke="#3F2010"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Crack/crease with golden roast edge */}
      <path
        d="M 0,-60 C -16,-28 19,22 0,68"
        stroke="#1A0D06"
        strokeWidth="7.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M -1,-58 C -14,-26 17,20 -1,64"
        stroke="#D49452"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  </svg>
);

// Sage line-art coffee cherry and leaf branch (per brand guide)
export const SageBranchSVG: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#8FA894',
}) => (
  <svg
    viewBox="0 0 240 320"
    className={className}
    style={{ overflow: 'visible' }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Stem */}
    <path
      d="M 120 310 C 120 230, 110 150, 130 10"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path
      d="M 118 260 C 80 250, 50 220, 45 190 C 75 195, 105 220, 116 250"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 118 210 C 160 200, 190 170, 195 140 C 165 145, 135 170, 120 200"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 115 150 C 70 140, 40 105, 35 70 C 70 78, 100 105, 114 140"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 122 100 C 170 90, 200 55, 205 20 C 170 28, 140 55, 125 90"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 128 40 C 105 20, 95 -10, 110 -30 C 125 -10, 132 15, 128 35"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />

    {/* Coffee Cherries in nodes */}
    <circle cx="112" cy="180" r="7" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="126" cy="176" r="6" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="118" cy="120" r="6.5" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="132" cy="116" r="5.5" stroke={color} strokeWidth="2" fill="none" />
  </svg>
);

// Indian Vegetarian Mark
export const VegMark: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <div
    style={{
      width: `${size}px`,
      height: `${size}px`,
      border: '1.8px solid #238823',
      borderRadius: '3px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      padding: '2px',
    }}
    title="Vegetarian Product"
  >
    <div
      style={{
        width: `${size * 0.46}px`,
        height: `${size * 0.46}px`,
        borderRadius: '50%',
        backgroundColor: '#238823',
      }}
    />
  </div>
);

// Brewing Method Icons as on packet
export const PourOverIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16l-3 9H7L4 6z" />
    <path d="M12 15v5" />
    <path d="M9 20h6" />
    <path d="M10 2h4" />
  </svg>
);

export const FrenchPressIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="5" width="12" height="15" rx="1.5" />
    <path d="M12 2v3" />
    <path d="M9 2h6" />
    <path d="M6 10h12" />
    <path d="M18 8h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
  </svg>
);

export const AeropressIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="7" width="10" height="13" rx="1" />
    <path d="M9 2h6" />
    <path d="M12 2v5" />
    <path d="M5 20h14" />
  </svg>
);

export const EspressoIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v7a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <path d="M6 3v2" />
    <path d="M10 3v2" />
    <path d="M14 3v2" />
  </svg>
);

export const ColdBrewIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12v3H6z" />
    <path d="M7 6v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6" />
    <line x1="10" y1="11" x2="14" y2="11" strokeDasharray="2 2" />
    <line x1="9" y1="14" x2="15" y2="14" strokeDasharray="2 2" />
    <path d="M12 2v2" />
  </svg>
);

export const WhiteLabelIcon: React.FC<{ size?: number; color?: string }> = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

// Official FSSAI Logo emblem from official brand asset
export const FSSAILogo: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 64, height = 34, className = '' }) => (
  <img
    src="/fssai.png"
    alt="FSSAI Logo"
    width={width}
    height={height}
    className={`fssai-svg-logo ${className}`}
    style={{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      objectFit: 'contain',
      display: 'block',
      borderRadius: '6px',
    }}
  />
);

// Standardized FSSAI Compliance Badge displaying Lic No.: 22726743000645
export const FSSAIComplianceBadge: React.FC<{
  className?: string;
  variant?: 'card' | 'inline' | 'compact';
}> = ({ className = '', variant = 'card' }) => (
  <div className={`fssai-badge-lockup fssai-${variant} ${className}`}>
    <div className="fssai-logo-wrapper">
      <FSSAILogo width={variant === 'compact' ? 56 : 68} height={variant === 'compact' ? 30 : 36} />
    </div>
    <div className="fssai-badge-meta">
      <div className="fssai-lic-row">
        <span className="fssai-lic-tag">Lic No.:</span>
        <strong className="fssai-lic-number">22726743000645</strong>
      </div>
      {variant !== 'compact' && (
        <span className="fssai-authority-sub">Food Safety and Standards Authority of India</span>
      )}
    </div>
  </div>
);

