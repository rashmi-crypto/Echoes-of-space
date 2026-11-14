'use client';

import React, { useMemo } from 'react';
import { useExplorerStore } from '@/store/explorer-store';
import { MOON_ARTIFACTS } from '@/data/moon-artifacts';
import {
  formatCoordinates,
  latLongToWorldVector3,
  PRIME_MERIDIAN_BASE_ROTATION_Y,
} from '@/lib/coordinates';
import { ArtifactCategory } from '@/types/artifact';
import {
  Search,
  X,
  ChevronLeft,
  Crosshair,
  Radio,
  SlidersHorizontal,
  Database,
} from 'lucide-react';

const CATEGORIES: { label: string; value: ArtifactCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Crewed Landers', value: 'crewed_lander' },
  { label: 'Rovers', value: 'rover' },
  { label: 'Science Packages', value: 'science_package' },
  { label: 'Robotic Landers', value: 'robotic_lander' },
  { label: 'Impactors', value: 'impactor' },
];

interface ExploreSidebarProps {
  onOpenProvenance?: () => void;
}

export function ExploreSidebar({ onOpenProvenance }: ExploreSidebarProps) {
  const sidebarOpen = useExplorerStore((state) => state.sidebarOpen);
  const setSidebarOpen = useExplorerStore((state) => state.setSidebarOpen);
  const searchQuery = useExplorerStore((state) => state.searchQuery);
  const setSearchQuery = useExplorerStore((state) => state.setSearchQuery);
  const selectedCategory = useExplorerStore((state) => state.selectedCategory);
  const setSelectedCategory = useExplorerStore((state) => state.setSelectedCategory);
  const selectedId = useExplorerStore((state) => state.selectedArtifactId);
  const selectArtifact = useExplorerStore((state) => state.selectArtifact);
  const setCameraTarget = useExplorerStore((state) => state.setCameraTarget);
  const resetFilters = useExplorerStore((state) => state.resetFilters);
  const textureLongitudeOffset = useExplorerStore(
    (state) => state.textureLongitudeOffset
  );

  const rotationY = PRIME_MERIDIAN_BASE_ROTATION_Y + (textureLongitudeOffset * Math.PI) / 180;

  const filteredArtifacts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MOON_ARTIFACTS.filter((artifact) => {
      if (selectedCategory !== 'all' && artifact.category !== selectedCategory) {
        return false;
      }
      if (q.length > 0) {
        const matchName = artifact.name.toLowerCase().includes(q);
        const matchMission = artifact.mission.name.toLowerCase().includes(q);
        const matchSite = artifact.landingSiteName.toLowerCase().includes(q);
        const matchDesignation = artifact.designation.toLowerCase().includes(q);
        return matchName || matchMission || matchSite || matchDesignation;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (artifactId: string) => {
    const artifact = MOON_ARTIFACTS.find((a) => a.id === artifactId);
    if (!artifact) return;

    selectArtifact(artifact.id);
    const worldPos = latLongToWorldVector3(
      artifact.coordinates.latitude,
      artifact.coordinates.longitude,
      1.0,
      0.02,
      rotationY
    );
    setCameraTarget(worldPos, 2.0);
  };

  if (!sidebarOpen) {
    return (
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-16 left-4 z-20 p-2 rounded-lg bg-[#080a0f]/80 backdrop-blur-md border border-white/[0.08] text-neutral-300 hover:text-white hover:border-amber-500/40 shadow-xl transition-all"
        title="Open equipment catalog"
        aria-label="Open equipment catalog"
      >
        <SlidersHorizontal className="w-4 h-4 text-amber-400" />
      </button>
    );
  }

  return (
    <aside
      className="fixed inset-y-13 left-0 z-20 w-80 sm:w-88 bg-[#080a0f]/90 backdrop-blur-xl border-r border-white/[0.06] shadow-2xl flex flex-col text-neutral-200 transition-all duration-300 select-none font-sans"
      aria-label="Artifact Catalog Sidebar"
    >
      {/* Sidebar Header & Search */}
      <div className="p-3.5 border-b border-white/[0.06] space-y-2.5 bg-white/[0.01]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-semibold tracking-tight text-white">
              Lunar Equipment Index
            </h2>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.05] text-neutral-400">
              {filteredArtifacts.length}
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            title="Collapse catalog"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mission, equipment, site..."
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md pl-8 pr-7 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Category Tabs (Restrained horizontal chips) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[11px] scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`whitespace-nowrap px-2 py-0.5 rounded text-xs transition-colors ${
                  isActive
                    ? 'bg-white/[0.1] text-white font-medium shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.03]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Artifact Index Rows */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 divide-y divide-white/[0.03]">
        {filteredArtifacts.length === 0 ? (
          <div className="p-8 text-center space-y-2 text-neutral-500">
            <Radio className="w-5 h-5 mx-auto text-neutral-600" />
            <p className="text-xs">No matching equipment found.</p>
            <button
              onClick={resetFilters}
              className="text-xs text-amber-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredArtifacts.map((artifact) => {
            const isSelected = selectedId === artifact.id;
            const coords = formatCoordinates(
              artifact.coordinates.latitude,
              artifact.coordinates.longitude,
              2
            );
            const isApprox = artifact.accuracy === 'approximate';

            return (
              <div
                key={artifact.id}
                onClick={() => handleSelect(artifact.id)}
                className={`py-2 px-2.5 rounded-md cursor-pointer transition-all duration-100 group relative ${
                  isSelected
                    ? 'bg-white/[0.06] border-l-2 border-amber-400 pl-2'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-amber-400/90 font-medium">
                        {artifact.mission.name}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          artifact.status === 'operational'
                            ? 'bg-emerald-400'
                            : isApprox
                            ? 'bg-red-400'
                            : 'bg-neutral-500'
                        }`}
                        title={`Status: ${artifact.status}`}
                      />
                      {isApprox && (
                        <span className="text-[9px] font-mono text-red-400/90">
                          approx
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs text-neutral-200 group-hover:text-white font-medium leading-snug truncate">
                      {artifact.name}
                    </h3>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(artifact.id);
                    }}
                    title="Focus on Globe"
                    className="p-1 rounded text-neutral-500 hover:text-amber-400 hover:bg-white/[0.06] transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                  >
                    <Crosshair className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span className="truncate max-w-[150px]">
                    {artifact.landingSiteName.split('(')[0]}
                  </span>
                  <span>{coords}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Footer with Provenance Quick Link */}
      {onOpenProvenance && (
        <div className="p-2.5 border-t border-white/[0.06] bg-white/[0.01]">
          <button
            onClick={onOpenProvenance}
            className="w-full py-1.5 px-2 rounded-md hover:bg-white/[0.04] text-[11px] text-neutral-400 hover:text-amber-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Database className="w-3.5 h-3.5" />
            <span>NASA Data Provenance & Sources</span>
          </button>
        </div>
      )}
    </aside>
  );
}
