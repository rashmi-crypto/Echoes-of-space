'use client';

import React from 'react';
import dynamic from 'next/dynamic';

/**
 * Scientifically styled loading screen shown while Three.js WebGL context initializes.
 */
export function GlobeLoadingFallback() {
  return (
    <div
      className="w-full h-full min-h-[450px] bg-neutral-950 flex flex-col items-center justify-center p-8 select-none"
      style={{ width: '100%', height: '100%', minHeight: '450px' }}
    >
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer orbital pulse */}
        <div className="w-24 h-24 rounded-full border border-amber-500/20 animate-ping absolute" />
        {/* Rotating wireframe ring */}
        <div className="w-20 h-20 rounded-full border border-dashed border-amber-500/40 animate-spin absolute" />
        {/* Core celestial body silhouette */}
        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
        </div>
      </div>

      <div className="space-y-1.5 text-center">
        <p className="text-xs font-mono font-medium tracking-widest text-amber-400 uppercase">
          Initializing Lunar Telemetry
        </p>
        <p className="text-[11px] font-mono text-neutral-500">
          Loading 3D WebGL Geodetic Engine &bull; Moon Atlas
        </p>
      </div>
    </div>
  );
}

/**
 * Dynamic client-only wrapper for the WebGL Moon Canvas.
 * Strictly prevents window/document/WebGL references during Server-Side Rendering (SSR).
 */
export const GlobeLoader = dynamic(
  () => import('./MoonCanvas').then((mod) => mod.MoonCanvas),
  {
    ssr: false,
    loading: () => <GlobeLoadingFallback />,
  }
);
