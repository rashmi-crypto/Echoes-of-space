'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useExplorerStore } from '@/store/explorer-store';
import {
  Layers,
  Menu,
  Sun,
  MapPin,
  Tag,
  Grid,
  Check,
  Globe2,
  Database,
} from 'lucide-react';

interface AppHeaderProps {
  onOpenProvenance?: () => void;
}

export function AppHeader({ onOpenProvenance }: AppHeaderProps) {
  const [layersMenuOpen, setLayersMenuOpen] = useState(false);
  const toggleSidebar = useExplorerStore((state) => state.toggleSidebar);
  const visibleLayers = useExplorerStore((state) => state.visibleLayers);
  const toggleLayer = useExplorerStore((state) => state.toggleLayer);

  return (
    <header className="relative z-20 h-13 bg-[#080a0f]/85 backdrop-blur-md border-b border-white/[0.06] px-4 flex items-center justify-between select-none">
      {/* Left: Brand & Sidebar Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] border border-white/[0.06] transition-colors"
          title="Toggle equipment index"
          aria-label="Toggle equipment index"
        >
          <Menu className="w-4 h-4" />
        </button>

        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)] group-hover:border-amber-400/60 transition-colors">
            <Globe2 className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-amber-200 transition-colors">
              Echoes of Space
            </span>
            <span className="hidden sm:inline text-xs text-neutral-500 font-mono">
              / Lunar Atlas
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Planetary Target Switcher (Restrained segmented tabs) */}
      <div className="hidden md:flex items-center p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs">
        <button
          type="button"
          className="px-3 py-1 rounded-md bg-white/[0.08] text-white font-medium shadow-xs flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>The Moon</span>
        </button>
        <div
          className="px-2.5 py-1 text-neutral-500 flex items-center gap-1 cursor-not-allowed text-[11px]"
          title="Mars exploration will be available in future releases"
        >
          <span>Mars</span>
          <span className="text-[9px] text-neutral-600 px-1 rounded bg-white/[0.02]">
            Future
          </span>
        </div>
      </div>

      {/* Right: Controls & Citations */}
      <div className="flex items-center gap-1.5">
        {/* Data & Sources Provenance Trigger */}
        {onOpenProvenance && (
          <button
            onClick={onOpenProvenance}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-amber-300 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] flex items-center gap-1.5 transition-colors"
            title="Inspect NASA Data Sources & Provenance"
          >
            <Database className="w-3.5 h-3.5 text-amber-400/90" />
            <span className="hidden sm:inline">Data & Sources</span>
          </button>
        )}

        {/* Layer Controls Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLayersMenuOpen((prev) => !prev)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-colors ${
              layersMenuOpen
                ? 'bg-white/[0.08] text-white border-white/[0.12]'
                : 'text-neutral-300 hover:text-white border-transparent hover:bg-white/[0.05] hover:border-white/[0.08]'
            }`}
            title="Configure Map Overlays"
          >
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Layers</span>
          </button>

          {layersMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#0b0e14]/95 backdrop-blur-xl border border-white/[0.1] rounded-xl shadow-2xl p-1.5 z-50 text-xs space-y-0.5">
              <div className="px-2 py-1 text-[10px] text-neutral-500 uppercase tracking-wider font-mono border-b border-white/[0.06] mb-1">
                Map Overlays
              </div>

              <button
                onClick={() => toggleLayer('markers')}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-white/[0.06] text-neutral-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Site Markers
                </span>
                {visibleLayers.markers && <Check className="w-3 h-3 text-amber-400" />}
              </button>

              <button
                onClick={() => toggleLayer('labels')}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-white/[0.06] text-neutral-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  Site Labels
                </span>
                {visibleLayers.labels && <Check className="w-3 h-3 text-amber-400" />}
              </button>

              <button
                onClick={() => toggleLayer('grid')}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-white/[0.06] text-neutral-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Grid className="w-3.5 h-3.5 text-amber-400" />
                  Lat/Long Grid
                </span>
                {visibleLayers.grid && <Check className="w-3 h-3 text-amber-400" />}
              </button>

              <button
                onClick={() => toggleLayer('sunlight')}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-white/[0.06] text-neutral-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  Solar Shadows
                </span>
                {visibleLayers.sunlight && <Check className="w-3 h-3 text-amber-400" />}
              </button>
            </div>
          )}
        </div>

        {/* Site count badge */}
        <div className="hidden lg:flex items-center px-2 py-1 text-[11px] font-mono text-neutral-400 border-l border-white/[0.08] ml-1 pl-2.5">
          <span>12 catalogued</span>
        </div>
      </div>
    </header>
  );
}
