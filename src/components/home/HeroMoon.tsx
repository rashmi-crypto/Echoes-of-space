'use client';

import React from 'react';
import Link from 'next/link';
import { Crosshair } from 'lucide-react';

interface SitePin {
  name: string;
  mission: string;
  xPct: number;
  yPct: number;
  isLRRR?: boolean;
}

const NOTABLE_SITES: SitePin[] = [
  { name: 'Apollo 11', mission: 'Tranquility Base', xPct: 58, yPct: 48 },
  { name: 'Apollo 12 / Surveyor 3', mission: 'Ocean of Storms', xPct: 38, yPct: 53 },
  { name: 'Apollo 15', mission: 'Hadley-Apennine', xPct: 46, yPct: 33 },
  { name: 'Apollo 17', mission: 'Taurus-Littrow', xPct: 62, yPct: 37 },
  { name: 'Apollo 11 LRRR', mission: 'Active Retroreflector', xPct: 59.5, yPct: 49.5, isLRRR: true },
];

export function HeroMoon() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Outer Atmospheric / Corona Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/10 via-slate-400/10 to-blue-400/10 blur-3xl transform scale-110 pointer-events-none" />

      {/* Orbit Track Rings */}
      <div className="absolute inset-[-14px] rounded-full border border-dashed border-amber-500/15 animate-[spin_160s_linear_infinite] pointer-events-none" />
      <div className="absolute inset-[-32px] rounded-full border border-neutral-800/60 pointer-events-none" />

      {/* The Moon Sphere Container */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(203,213,225,0.12),inset_-30px_-30px_70px_rgba(0,0,0,0.85),inset_15px_15px_40px_rgba(255,255,255,0.15)] bg-[#888e99] border border-slate-600/40">
        {/* Realistic SVG Lunar Surface Details */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Base lunar surface noise / texture filter */}
            <filter id="moonTexture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves="4"
                result="noise"
              />
              <feColorMatrix
                type="matrix"
                values="0.33 0.33 0.33 0 0
                        0.33 0.33 0.33 0 0
                        0.33 0.33 0.33 0 0
                        0    0    0    1 0"
              />
              <feBlend mode="multiply" in="SourceGraphic" result="blend" />
            </filter>

            {/* Radial 3D sphere gradient simulating sunlight from top-right */}
            <radialGradient id="sphereLight" cx="68%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#94a3b8" stopOpacity="0.05" />
              <stop offset="85%" stopColor="#0f172a" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
            </radialGradient>

            {/* Subtle limb glow */}
            <linearGradient id="limbLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
            </linearGradient>

            {/* Mare basalt gradient */}
            <radialGradient id="mareGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#333842" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#474e5d" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#646b7a" stopOpacity="0" />
            </radialGradient>

            {/* Crater ray gradient */}
            <radialGradient id="rayGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="30%" stopColor="#f1f5f9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Base Highlands Anorthosite Regolith */}
          <rect width="500" height="500" fill="#9da3af" />

          {/* Procedural High-Frequency Regolith Grain */}
          <rect
            width="500"
            height="500"
            fill="#7b818e"
            opacity="0.35"
            filter="url(#moonTexture)"
          />

          {/* Nearside Lunar Maria (Basalt Plains) */}
          <g opacity="0.85">
            {/* Oceanus Procellarum (Ocean of Storms - Large Western Expanse) */}
            <path
              d="M 120 180 Q 90 260 140 330 Q 200 370 230 300 Q 250 220 200 170 Q 150 140 120 180 Z"
              fill="url(#mareGrad)"
            />
            {/* Mare Imbrium (Sea of Rains - Northwest Basin) */}
            <ellipse cx="210" cy="180" rx="65" ry="55" fill="url(#mareGrad)" />
            {/* Mare Serenitatis (Sea of Serenity) */}
            <circle cx="285" cy="195" r="42" fill="url(#mareGrad)" />
            {/* Mare Tranquillitatis (Sea of Tranquility - Apollo 11) */}
            <path
              d="M 280 230 Q 340 220 350 270 Q 320 310 270 280 Q 250 250 280 230 Z"
              fill="url(#mareGrad)"
            />
            {/* Mare Crisium (Sea of Crises - Eastern Isolated Oval) */}
            <ellipse cx="375" cy="210" rx="34" ry="26" fill="url(#mareGrad)" />
            {/* Mare Fecunditatis */}
            <ellipse cx="355" cy="300" rx="42" ry="34" fill="url(#mareGrad)" />
            {/* Mare Nectaris */}
            <circle cx="320" cy="325" r="26" fill="url(#mareGrad)" />
            {/* Mare Nubium (Southern Sea of Clouds) */}
            <ellipse cx="210" cy="335" rx="38" ry="30" fill="url(#mareGrad)" />
            {/* Mare Vaporum (Central Vapor Sea) */}
            <ellipse cx="250" cy="235" rx="20" ry="16" fill="url(#mareGrad)" />
          </g>

          {/* Famous Rayed Craters */}
          <g>
            {/* Tycho (Southern Ray System) */}
            <circle cx="245" cy="410" r="40" fill="url(#rayGrad)" opacity="0.5" />
            <line x1="245" y1="410" x2="160" y2="320" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
            <line x1="245" y1="410" x2="310" y2="310" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
            <line x1="245" y1="410" x2="230" y2="280" stroke="#ffffff" strokeWidth="1.2" opacity="0.45" />
            <line x1="245" y1="410" x2="360" y2="390" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
            <line x1="245" y1="410" x2="140" y2="440" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
            <circle cx="245" cy="410" r="7" fill="#f8fafc" />
            <circle cx="246" cy="411" r="4.5" fill="#475569" />

            {/* Copernicus Crater */}
            <circle cx="205" cy="235" r="28" fill="url(#rayGrad)" opacity="0.45" />
            <line x1="205" y1="235" x2="145" y2="200" stroke="#ffffff" strokeWidth="0.8" opacity="0.3" />
            <line x1="205" y1="235" x2="245" y2="190" stroke="#ffffff" strokeWidth="0.8" opacity="0.3" />
            <line x1="205" y1="235" x2="215" y2="280" stroke="#ffffff" strokeWidth="0.8" opacity="0.3" />
            <circle cx="205" cy="235" r="6" fill="#f8fafc" />
            <circle cx="206" cy="236" r="3.5" fill="#334155" />

            {/* Kepler Crater */}
            <circle cx="160" cy="245" r="16" fill="url(#rayGrad)" opacity="0.35" />
            <circle cx="160" cy="245" r="4" fill="#f8fafc" />
            <circle cx="160.5" cy="245.5" r="2.2" fill="#334155" />
          </g>

          {/* 3D Directional Sphere Shading & Terminator Shadows */}
          <rect width="500" height="500" fill="url(#sphereLight)" />
          <rect width="500" height="500" fill="url(#limbLight)" />
        </svg>

        {/* Pulsing Historical Site Pins */}
        {NOTABLE_SITES.map((site) => (
          <div
            key={site.name}
            style={{
              left: `${site.xPct}%`,
              top: `${site.yPct}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer z-10"
          >
            {/* Beacon Pulse Ring */}
            <span
              className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                site.isLRRR ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            {/* Pin Center Dot */}
            <span
              className={`relative block w-2.5 h-2.5 rounded-full border border-black shadow-md ${
                site.isLRRR ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />

            {/* Hover Tooltip Badge */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-neutral-950/95 border border-amber-500/40 rounded px-2 py-1 text-[10px] font-mono shadow-xl backdrop-blur-sm z-30">
              <span className="font-semibold text-white">{site.name}</span>
              <span className="text-neutral-400 block text-[9px]">
                {site.mission}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Coordinate Pill Badge */}
      <Link
        href="/explore/moon"
        className="absolute -bottom-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-neutral-800 text-xs font-mono backdrop-blur-md shadow-2xl transition-all group"
      >
        <Crosshair className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
        <span>Nearside Geodesy &bull; 0.6741° N, 23.4730° E</span>
      </Link>
    </div>
  );
}
