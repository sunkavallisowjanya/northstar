'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

export default function AuroraBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const starArray: Star[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }));
    setStars(starArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Aurora wave layers */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 animate-aurora-wave-1" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-teal-500/20 animate-aurora-wave-2" />
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/20 via-transparent to-cyan-500/20 animate-aurora-wave-3" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slower" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float-slowest" />

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes aurora-wave-1 {
          0%, 100% {
            transform: translateX(-10%) translateY(-10%) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateX(10%) translateY(10%) rotate(5deg);
            opacity: 0.5;
          }
        }

        @keyframes aurora-wave-2 {
          0%, 100% {
            transform: translateX(10%) translateY(10%) rotate(0deg);
            opacity: 0.25;
          }
          50% {
            transform: translateX(-10%) translateY(-10%) rotate(-5deg);
            opacity: 0.45;
          }
        }

        @keyframes aurora-wave-3 {
          0%, 100% {
            transform: translateX(5%) translateY(-5%) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateX(-5%) translateY(5%) rotate(3deg);
            opacity: 0.4;
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        @keyframes float-slower {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-40px, 40px);
          }
        }

        @keyframes float-slowest {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 30px);
          }
        }

        .animate-twinkle {
          animation: twinkle linear infinite;
        }

        .animate-aurora-wave-1 {
          animation: aurora-wave-1 20s ease-in-out infinite;
        }

        .animate-aurora-wave-2 {
          animation: aurora-wave-2 25s ease-in-out infinite;
        }

        .animate-aurora-wave-3 {
          animation: aurora-wave-3 30s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 20s ease-in-out infinite;
        }

        .animate-float-slowest {
          animation: float-slowest 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
