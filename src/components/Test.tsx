import React, { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const App: React.FC = () => {
  // FlowLines animation setup
  const flowRef = useRef<SVGPathElement | null>(null);
  useEffect(() => {
    if (!flowRef.current) return;
    const paths = Array.from(flowRef.current.querySelectorAll('path')) as SVGPathElement[];
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    animate(paths as any, {
        strokeDashoffset: [(el: any) => el.getTotalLength(), 0],
        easing: 'easeInOutQuart',
        duration: 1400,
        delay: stagger(120),
        direction: 'alternate',
        loop: true
    } as any);
    return () => {
      paths.forEach((p) => {
        p.style.strokeDasharray = '';
        p.style.strokeDashoffset = '';
      });
    };
  }, []);

  // SVG Components defined inline
  const EmojiBlob = ({ emoji = '✨', size = 120 }: { emoji?: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feBlend in="SourceGraphic" in2="b" />
        </filter>
      </defs>
      <g filter="url(#f1)">
        <path
          d="M43.6,-53.1C57.8,-45.9,70.9,-33.6,75.4,-18.9C80,-4.2,75.9,12,68.2,25.6C60.4,39.1,49.1,50.1,35.3,55.3C21.5,60.5,5.3,60,-9.2,57.4C-23.6,54.8,-36.6,50.1,-46.9,41.3C-57.2,32.6,-64.8,19.9,-68.1,6.1C-71.3,-7.7,-70.2,-22.7,-62.7,-34.5C-55.3,-46.3,-41.5,-54.8,-27.4,-61.1C-13.3,-67.3,1.1,-71.4,15.9,-69.5C30.7,-67.6,45.4,-59.2,43.6,-53.1Z"
          transform="translate(100 100) scale(0.9)"
          fill="url(#g1)"
        />
      </g>
      <text x="100" y="112" fontSize="54" textAnchor="middle" dominantBaseline="middle">{emoji}</text>
    </svg>
  );

  const BullseyeBadge = ({ value = 86, size = 64 }: { value?: number; size?: number }) => {
    const pct = Math.max(0, Math.min(100, value));
    return (
      <svg width={size} height={size} viewBox="0 0 64 64">
        <defs>
          <linearGradient id="bg" x1="0" x2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#0f172a" opacity="0.12" />
        <circle cx="32" cy="32" r="22" fill="#0b1220" />
        <circle cx="32" cy="32" r="16" stroke="#111827" strokeWidth="4" fill="none" />
        <circle cx="32" cy="32" r="10" fill="url(#bg)" stroke="#08101a" strokeWidth="1" />
        <text x="32" y="36" textAnchor="middle" fontSize="11" fontWeight={700} fill="#041022">{pct}%</text>
      </svg>
    );
  };

  const CircuitMotif = ({ width = 200, height = 120 }: { width?: number; height?: number; stroke?: string }) => (
    <svg viewBox="0 0 200 120" width={width} height={height}>
      <defs>
        <linearGradient id="cg" x1="0" x2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <line x1="10" y1="60" x2="190" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="8" strokeLinecap="round" />
      {[20,50,80,110,140,170].map((x,i)=>(
        <g key={x}>
          <line x1={x} y1="60" x2={x} y2={20+(i%3)*20} stroke="url(#cg)" strokeWidth={2} strokeLinecap="round" />
          <circle cx={x} cy={20+(i%3)*20} r={3.2} fill="url(#cg)" />
        </g>
      ))}
      <path d="M30 100 L70 60 L110 100 L150 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const DiagonalGrid = ({ color = '#94a3b8', size = 200 }: { color?: string; size?: number }) => (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="none">
      <defs>
        <pattern id="diag" width="20" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="20" x2="20" y2="0" stroke={color} strokeWidth="0.8" opacity="0.33" />
          <line x1="10" y1="20" x2="20" y2="10" stroke={color} strokeWidth="0.6" opacity="0.2" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={size} height={size} fill="url(#diag)" />
    </svg>
  );

  const AbstractBlob = ({ w = 320, h = 160 }: { w?: number; h?: number }) => (
    <svg width={w} height={h} viewBox="0 0 800 400">
      <defs>
        <linearGradient id="ab" x1="0" x2="1">
          <stop offset="0" stopColor="#ff7ce5" />
          <stop offset="45%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <g filter="url(#blur)" opacity="0.95">
        <path d="M200,50 C320,10 480,0 640,50 C720,90 760,170 700,230 C620,300 440,320 320,300 C180,280 80,180 120,120 C160,80 200,70 200,50 Z" fill="url(#ab)" transform="translate(0,10)"/>
      </g>
      <circle cx="240" cy="120" r="4.5" fill="#fff" opacity="0.9" />
      <circle cx="420" cy="200" r="3.5" fill="#fff" opacity="0.8" />
      <line x1="240" y1="120" x2="420" y2="200" stroke="#ffffffaa" strokeWidth="0.8" strokeDasharray="3 4"/>
    </svg>
  );

  const FlowLines = ({ width = 280, height = 80 }: { width?: number; height?: number }) => (
    <svg width={width} height={height} viewBox="0 0 300 80">
      <defs>
        <linearGradient id="flow" x1="0" x2="1">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <g ref={flowRef} fill="none" stroke="url(#flow)" strokeWidth="2" strokeLinecap="round">
        <path d="M4 60 Q60 10 120 60" />
        <path d="M6 40 Q70 5 140 40" />
        <path d="M10 20 Q130 30 280 20" />
      </g>
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">SVG Component Preview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-slate-800 p-4 rounded-xl flex justify-center items-center"><EmojiBlob emoji="🚀" size={120} /></div>
        <div className="bg-slate-800 p-4 rounded-xl flex justify-center items-center"><BullseyeBadge value={86} size={80} /></div>
        <div className="bg-slate-800 p-4 rounded-xl flex justify-center items-center"><CircuitMotif /></div>
        <div className="bg-slate-800 p-4 rounded-xl flex justify-center items-center"><DiagonalGrid /></div>
        <div className="bg-slate-800 p-4 rounded-xl flex justify-center items-center"><AbstractBlob /></div>
        <div className="bg-slate-800 p-4 rounded-xl flex justify-center items-center"><FlowLines /></div>
      </div>
    </div>
  );
};

export default App;
