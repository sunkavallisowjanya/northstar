'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
  type: 'dot' | 'flake' | 'crystal';
  drift: number;
}

export default function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 8 + Math.random() * 20,
      opacity: 0.2 + Math.random() * 0.6,
      size: 2 + Math.random() * 6,
      type: Math.random() > 0.7 ? 'flake' : Math.random() > 0.5 ? 'crystal' : 'dot',
      drift: -20 + Math.random() * 40,
    }));
    setSnowflakes(flakes);
  }, []);

  const renderSnowflake = (flake: Snowflake) => {
    if (flake.type === 'flake') {
      return (
        <svg width={flake.size * 2} height={flake.size * 2} viewBox="0 0 24 24" fill="white">
          <path d="M12 2L13 10L12 11L11 10L12 2Z M12 22L13 14L12 13L11 14L12 22Z M2 12L10 13L11 12L10 11L2 12Z M22 12L14 13L13 12L14 11L22 12Z M5 5L10 10L11 11L10 12L5 19L4 18L9 12L4 6L5 5Z M19 5L14 10L13 11L14 12L19 19L20 18L15 12L20 6L19 5Z" />
        </svg>
      );
    } else if (flake.type === 'crystal') {
      return (
        <svg width={flake.size * 1.5} height={flake.size * 1.5} viewBox="0 0 16 16" fill="white">
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="3" r="0.8" />
          <circle cx="8" cy="13" r="0.8" />
          <circle cx="3" cy="8" r="0.8" />
          <circle cx="13" cy="8" r="0.8" />
          <circle cx="5" cy="5" r="0.6" />
          <circle cx="11" cy="11" r="0.6" />
          <circle cx="11" cy="5" r="0.6" />
          <circle cx="5" cy="11" r="0.6" />
        </svg>
      );
    } else {
      return <div className="w-full h-full bg-white rounded-full blur-[0.5px]" />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-fall"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${Math.random() * 8}s`,
            opacity: flake.opacity,
            width: flake.type === 'dot' ? `${flake.size}px` : 'auto',
            height: flake.type === 'dot' ? `${flake.size}px` : 'auto',
            ['--drift' as any]: `${flake.drift}px`,
          }}
        >
          {renderSnowflake(flake)}
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(var(--drift)) rotate(180deg);
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
