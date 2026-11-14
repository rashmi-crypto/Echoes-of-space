'use client';

import React from 'react';
import { useExplorerStore } from '@/store/explorer-store';
import { MOON_ARTIFACTS } from '@/data/moon-artifacts';
import {
  formatCoordinates,
  latLongToWorldVector3,
  PRIME_MERIDIAN_BASE_ROTATION_Y,
} from '@/lib/coordinates';
import {
  X,
  Crosshair,
  ExternalLink,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Database,
} from 'lucide-react';

interface ArtifactPanelProps {
  onOpenProvenance?: () => void;
}

export function ArtifactPanel({ onOpenProvenance }: ArtifactPanelProps) {
  const selectedId = useExplorerStore((state) => state.selectedArtifactId);
  const panelOpen = useExplorerStore((state) => state.panelOpen);
  const setPanelOpen = useExplorerStore((state) => state.setPanelOpen);
  const setCameraTarget = useExplorerStore((state) => state.setCameraTarget);
  const textureLongitudeOffset = useExplorerStore(
    (state) => state.textureLongitudeOffset
  );

  const artifact = MOON_ARTIFACTS.find((a) => a.id === selectedId);

  if (!panelOpen || !artifact) return null;

  const rotationY = PRIME_MERIDIAN_BASE_ROTATION_Y + (textureLongitudeOffset * Math.PI) / 180;

  const handleFocus = () => {
    const worldPos = latLongToWorldVector3(
      artifact.coordinates.latitude,
      artifact.coordinates.longitude,
      1.0,
      0.02,
      rotationY
    );
    setCameraTarget(worldPos, 2.0);
  };

  const formattedCoords = formatCoordinates(
    artifact.coordinates.latitude,
    artifact.coordinates.longitude
  );

  const isApproximate = artifact.accuracy === 'approximate';

  return (
    <aside
      className="fixed inset-y-0 right-0 z-30 w-full sm:w-88 md:w-[380px] bg-[#080a0f]/95 backdrop-blur-xl border-l border-white/[0.08] shadow-2xl flex flex-col text-neutral-200 overflow-hidden transition-all duration-200 select-none font-sans"
      aria-label="Artifact Information Panel"
    >
      {/* Editorial Header */}
      <div className="p-5 border-b border-white/[0.06] flex items-start justify-between gap-4 bg-white/[0.01]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-medium">
              {artifact.mission.program} Program
            </span>
            <span className="text-neutral-600">&bull;</span>
            <span className="text-[10px] font-mono text-neutral-400">
              {artifact.status.replace('_', ' ')}
            </span>
            {isApproximate && (
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-red-950/60 text-red-300 border border-red-800/40">
                approximate location
              </span>
            )}
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug">
            {artifact.name}
          </h2>
          <p className="text-xs text-neutral-400 font-mono">
            {artifact.landingSiteName}
          </p>
        </div>

        <button
          onClick={() => setPanelOpen(false)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Editorial Content with Generous Breathing Room */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm leading-relaxed">
        {/* Action Button: Center on Globe */}
        <button
          onClick={handleFocus}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-medium border border-white/[0.08] transition-colors shadow-xs"
        >
          <Crosshair className="w-3.5 h-3.5 text-amber-400" />
          <span>Center on Lunar Globe</span>
        </button>

        {/* Geodetic Telemetry Block */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-400 flex items-center gap-1.5 font-mono text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              COORDINATES
            </span>
            <span className="font-mono text-neutral-200 font-medium text-xs">
              {formattedCoords}
            </span>
          </div>

          {artifact.coordinates.elevationKm !== undefined && (
            <div className="flex items-center justify-between text-xs font-mono border-t border-white/[0.04] pt-2 text-[11px]">
              <span className="text-neutral-400">LOLA Reference Radius:</span>
              <span className="text-neutral-300">
                1,737.4 km ({artifact.coordinates.elevationKm > 0 ? `+${artifact.coordinates.elevationKm}` : artifact.coordinates.elevationKm} km)
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-mono border-t border-white/[0.04] pt-2 text-[11px]">
            <span className="text-neutral-400 flex items-center gap-1">
              {isApproximate ? (
                <AlertTriangle className="w-3 h-3 text-red-400" />
              ) : (
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
              )}
              Accuracy:
            </span>
            <span className="text-neutral-300 capitalize">
              {artifact.accuracy}
            </span>
          </div>

          {artifact.accuracyNote && (
            <p className="text-[11px] text-neutral-400 italic bg-white/[0.02] rounded p-2 border border-white/[0.04]">
              {artifact.accuracyNote}
            </p>
          )}
        </div>

        {/* Narrative Section: Summary & Purpose */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
              Mission Summary
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm">
              {artifact.summary}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
              Operational Purpose
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm">
              {artifact.purpose}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
              Scientific Contribution
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm">
              {artifact.scientificSignificance}
            </p>
          </div>
        </div>

        {/* In Situ Physical Condition */}
        <div className="space-y-1 border-t border-white/[0.06] pt-4">
          <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
            Current Physical Status on Surface
          </h3>
          <p className="text-neutral-300 text-xs leading-relaxed">
            {artifact.physicalCondition}
          </p>
        </div>

        {/* Mission Chronology & Crew */}
        <div className="border-t border-white/[0.06] pt-4 space-y-2.5">
          <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400/90" />
            Chronology
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-white/[0.02] p-2 rounded border border-white/[0.04]">
              <span className="text-[10px] text-neutral-500 block">Touchdown</span>
              <span className="text-neutral-200 mt-0.5 block">
                {artifact.mission.landingDate || 'N/A'}
              </span>
            </div>
            <div className="bg-white/[0.02] p-2 rounded border border-white/[0.04]">
              <span className="text-[10px] text-neutral-500 block">Mission End</span>
              <span className="text-neutral-200 mt-0.5 block">
                {artifact.mission.missionEndDate || 'N/A'}
              </span>
            </div>
            {artifact.mission.lastCommunicationDate && (
              <div className="col-span-2 bg-white/[0.02] p-2 rounded border border-white/[0.04]">
                <span className="text-[10px] text-neutral-500 block">Last Communication</span>
                <span className="text-amber-300 mt-0.5 block">
                  {artifact.mission.lastCommunicationDate}
                </span>
              </div>
            )}
          </div>

          {artifact.mission.crew && (
            <div className="pt-1 text-xs">
              <span className="text-[10px] text-neutral-500 font-mono block">
                Astronaut Flight Crew:
              </span>
              <span className="text-neutral-200 font-medium">
                {artifact.mission.crew.join(' • ')}
              </span>
            </div>
          )}
        </div>

        {/* Hardware Details */}
        <div className="border-t border-white/[0.06] pt-4 space-y-2">
          <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono">
            Hardware Engineering
          </h3>
          <dl className="grid grid-cols-2 gap-2 text-xs font-mono">
            {artifact.hardware.massKg && (
              <div>
                <dt className="text-[10px] text-neutral-500">Mass</dt>
                <dd className="text-neutral-200">{artifact.hardware.massKg} kg</dd>
              </div>
            )}
            {artifact.hardware.manufacturer && (
              <div>
                <dt className="text-[10px] text-neutral-500">Manufacturer</dt>
                <dd className="text-neutral-200 truncate">{artifact.hardware.manufacturer}</dd>
              </div>
            )}
            {artifact.hardware.dimensions && (
              <div className="col-span-2">
                <dt className="text-[10px] text-neutral-500">Dimensions</dt>
                <dd className="text-neutral-200">{artifact.hardware.dimensions}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Verified NASA Sources */}
        <div className="border-t border-white/[0.06] pt-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-400/90" />
              Verified NASA Citations
            </h3>
            {onOpenProvenance && (
              <button
                onClick={onOpenProvenance}
                className="text-[10px] text-amber-400 hover:underline font-mono"
              >
                Data Standards
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            {artifact.sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/40 hover:bg-white/[0.05] transition-all text-xs group"
              >
                <div className="flex items-center justify-between text-neutral-200 group-hover:text-amber-300 font-medium">
                  <span className="truncate pr-2">{src.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-300 shrink-0" />
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-neutral-500">
                  <span>{src.organization}</span>
                  {src.datasetId && (
                    <>
                      <span>&bull;</span>
                      <span>{src.datasetId}</span>
                    </>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
