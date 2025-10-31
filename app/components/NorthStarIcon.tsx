export default function NorthStarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#60d5f2', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#4a9eff', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8b7ff8', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#5ce1e6', stopOpacity: 0.4 }} />
        </linearGradient>
        <filter id="iconGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer compass ring */}
      <circle cx="32" cy="32" r="26" fill="none" stroke="url(#compassGradient)" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="32" cy="32" r="22" fill="none" stroke="url(#compassGradient)" strokeWidth="0.8" opacity="0.4"/>
      
      {/* Main North Star (8-pointed) */}
      <path 
        d="M32 6 L34 28 L42 10 L36 28 L54 18 L38 30 L58 32 L38 34 L54 46 L36 36 L42 54 L34 36 L32 58 L30 36 L22 54 L28 36 L10 46 L26 34 L6 32 L26 30 L10 18 L28 28 L22 10 L30 28 Z" 
        fill="url(#compassGradient)" 
        filter="url(#iconGlow)"
      />
      
      {/* Inner star highlight */}
      <circle cx="32" cy="32" r="8" fill="url(#innerGlow)" opacity="0.9"/>
      
      {/* Center dot */}
      <circle cx="32" cy="32" r="3" fill="#ffffff" opacity="0.95"/>
      
      {/* Cardinal direction marker */}
      <text x="32" y="12" textAnchor="middle" fill="#60d5f2" fontSize="8" fontWeight="bold" fontFamily="Arial">N</text>
    </svg>
  );
}
