'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { MOON_ARTIFACTS } from '@/data/moon-artifacts';
import {
  latLongToVector3,
  latLongToWorldVector3,
  formatCoordinates,
} from '@/lib/coordinates';
import { useExplorerStore } from '@/store/explorer-store';
import { Artifact, ArtifactCategory } from '@/types/artifact';
import { X, ExternalLink, Crosshair, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ArtifactMarkersProps {
  radius?: number;
  rotationY?: number;
}

// Restrained category color palette (subtle, editorial, not neon)
const CATEGORY_COLORS: Record<ArtifactCategory, string> = {
  crewed_lander: '#f59e0b', // Restrained Lunar Amber
  rover: '#fbbf24', // Muted Gold
  science_package: '#38bdf8', // Soft Sky Blue
  robotic_lander: '#c084fc', // Soft Lavender
  impactor: '#f87171', // Muted Coral
  satellite_orbiter: '#94a3b8', // Slate Grey
};

// Reusable static geometries shared across all markers to eliminate per-frame allocations
const SHARED_HITBOX_GEO = new THREE.SphereGeometry(0.024, 8, 8);
const SHARED_PIN_GEO = new THREE.SphereGeometry(0.0065, 12, 12);
const SHARED_SELECTED_PIN_GEO = new THREE.SphereGeometry(0.0085, 12, 12);
const SHARED_RING_GEO = new THREE.RingGeometry(0.011, 0.015, 24);
const SHARED_RETICLE_GEO = new THREE.RingGeometry(0.02, 0.024, 32);

// Reusable static hit material
const HITBOX_MATERIAL = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0,
  depthWrite: false,
});

// Cache for shared basic materials by color to minimize draw-call state changes
const MATERIAL_CACHE = new Map<string, THREE.MeshBasicMaterial>();
function getSharedMaterial(color: string, opacity: number = 1, depthWrite: boolean = true) {
  const key = `${color}_${opacity}_${depthWrite}`;
  if (!MATERIAL_CACHE.has(key)) {
    MATERIAL_CACHE.set(
      key,
      new THREE.MeshBasicMaterial({
        color,
        transparent: opacity < 1,
        opacity,
        depthWrite,
        side: THREE.DoubleSide,
      })
    );
  }
  return MATERIAL_CACHE.get(key)!;
}

// Major landing sites to display when global 'Site Labels' layer is manually turned on
// Sub-hardware at the same coordinates (e.g. LRRR, LRV) is suppressed to prevent collisions
const PRIMARY_SITE_LABEL_IDS = new Set([
  'apollo-11-lm',
  'apollo-12-lm',
  'apollo-14-lm',
  'apollo-15-lm',
  'apollo-16-lm',
  'apollo-17-lm',
  'surveyor-1',
  'ranger-7',
]);

function MarkerItem({
  artifact,
  radius,
  rotationY = 0,
}: {
  artifact: Artifact;
  radius: number;
  rotationY?: number;
}) {
  const { camera, size } = useThree();
  const selectedId = useExplorerStore((state) => state.selectedArtifactId);
  const hoveredId = useExplorerStore((state) => state.hoveredArtifactId);
  const showLabelsLayer = useExplorerStore((state) => state.visibleLayers.labels);
  const selectArtifact = useExplorerStore((state) => state.selectArtifact);
  const setHoveredArtifact = useExplorerStore((state) => state.setHoveredArtifact);
  const setCameraTarget = useExplorerStore((state) => state.setCameraTarget);
  const setPanelOpen = useExplorerStore((state) => state.setPanelOpen);

  const isSelected = selectedId === artifact.id;
  const isHovered = hoveredId === artifact.id;
  const isApproximate = artifact.accuracy === 'approximate';

  // Compute local 3D surface position on the Moon sphere
  const position = useMemo(() => {
    return latLongToVector3(
      artifact.coordinates.latitude,
      artifact.coordinates.longitude,
      radius,
      0.007
    );
  }, [artifact.coordinates, radius]);

  // World coordinate vector taking into account the planet's rotation
  const worldPos = useMemo(() => {
    return latLongToWorldVector3(
      artifact.coordinates.latitude,
      artifact.coordinates.longitude,
      radius,
      0.015,
      rotationY
    );
  }, [artifact.coordinates, radius, rotationY]);

  // Vector pointing radially outward from center of sphere
  const normal = useMemo(() => {
    return new THREE.Vector3(...position).normalize();
  }, [position]);

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  // Determine whether the marker is facing the camera (not occluded on the lunar farside)
  const isFacingCamera = useMemo(() => {
    const worldVec = new THREE.Vector3(...worldPos).normalize();
    const camVec = camera.position.clone().normalize();
    return worldVec.dot(camVec) > 0.05;
  }, [worldPos, camera.position]);

  // Calculate 2D screen coordinates and screen boundaries for smart auto-repositioning
  const screenBounds = useMemo(() => {
    const worldVec = new THREE.Vector3(...worldPos);
    const projected = worldVec.project(camera);
    const px = ((projected.x + 1) / 2) * size.width;
    const py = ((-projected.y + 1) / 2) * size.height;

    // Viewport boundary collision thresholds
    const isNearRight = px > size.width - 260;
    const isNearLeft = px < 240;
    const isNearTop = py < 170;
    const isNearBottom = py > size.height - 180;

    return { px, py, isNearRight, isNearLeft, isNearTop, isNearBottom };
  }, [worldPos, camera, size]);

  // Color selection
  const baseColor =
    artifact.status === 'operational'
      ? '#10b981' // Green for operational Laser Ranging Retroreflector
      : isApproximate
      ? '#f87171' // Muted coral for approximate kinetic impactor
      : CATEGORY_COLORS[artifact.category] || '#f59e0b';

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectArtifact(artifact.id);
    setCameraTarget(worldPos, 2.0);
  };

  const handleFocus = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCameraTarget(worldPos, 1.8);
  };

  const handleOpenDossier = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPanelOpen(true);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectArtifact(null);
  };

  // Label visibility logic:
  // 1. Selected artifact: Always show compact, boundary-aware floating card (if facing camera)
  // 2. Hovered artifact: Show compact tooltip if not already selected (if facing camera)
  // 3. Optional 'Site Labels' layer: Show ONLY primary landmark sites (no sub-hardware overlap)
  const isPrimarySite = PRIMARY_SITE_LABEL_IDS.has(artifact.id);
  const shouldRenderHtml = isFacingCamera && (isSelected || isHovered || (showLabelsLayer && isPrimarySite));

  // Dynamic CSS translation classes to guarantee the popup never overflows screen boundaries
  const popupAlignmentClasses = useMemo(() => {
    let horizontalClass = '-translate-x-1/2';
    if (screenBounds.isNearRight) {
      horizontalClass = '-translate-x-[calc(100%-12px)]';
    } else if (screenBounds.isNearLeft) {
      horizontalClass = 'translate-x-2';
    }

    let verticalClass = '-translate-y-[calc(100%+10px)]';
    if (screenBounds.isNearTop) {
      verticalClass = 'translate-y-3';
    }

    return `${horizontalClass} ${verticalClass}`;
  }, [screenBounds]);

  const formattedCoords = formatCoordinates(
    artifact.coordinates.latitude,
    artifact.coordinates.longitude,
    2
  );

  return (
    <group position={position}>
      {/* Invisible Raycast Hitbox for seamless mouse/touch picking */}
      <mesh
        geometry={SHARED_HITBOX_GEO}
        material={HITBOX_MATERIAL}
        onClick={handleClick}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHoveredArtifact(artifact.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredArtifact(null);
          document.body.style.cursor = 'auto';
        }}
      />

      {/* Surface Pin Center Dot (Small, restrained, pure WebGL) */}
      <mesh
        geometry={isSelected ? SHARED_SELECTED_PIN_GEO : SHARED_PIN_GEO}
        material={getSharedMaterial(
          isSelected ? '#ffffff' : baseColor,
          1.0,
          true
        )}
      />

      {/* Subtle Outer Beacon Ring */}
      <mesh
        geometry={SHARED_RING_GEO}
        quaternion={quaternion}
        material={getSharedMaterial(
          baseColor,
          isSelected ? 0.9 : isHovered ? 0.8 : 0.4,
          false
        )}
      />

      {/* Selected Target Reticle Ring */}
      {isSelected && (
        <mesh
          geometry={SHARED_RETICLE_GEO}
          quaternion={quaternion}
          material={getSharedMaterial('#f59e0b', 0.85, false)}
        />
      )}

      {/* High-Performance, Compact, Boundary-Aware HTML Label Overlay */}
      {shouldRenderHtml && (
        <Html
          position={[0, 0.02, 0]}
          center={false}
          zIndexRange={[60, 0]}
          style={{
            pointerEvents: isSelected ? 'auto' : 'none',
            userSelect: 'none',
          }}
        >
          {isSelected ? (
            /* Selected State: Compact, Responsive, Boundary-Aware Floating Card */
            <div
              className={`w-64 sm:w-72 max-w-[calc(100vw-32px)] bg-[#090c14]/95 backdrop-blur-xl text-neutral-200 border border-white/[0.12] rounded-xl p-3 shadow-2xl space-y-2 font-sans transition-transform duration-100 ${popupAlignmentClasses}`}
              style={{
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.7), 0 0 1px 1px rgba(255,255,255,0.08)',
              }}
            >
              {/* Header with Program Badge & Dismiss Button */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: baseColor }}
                  />
                  <span className="text-[11px] font-semibold text-white tracking-tight">
                    {artifact.mission.name}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    ({artifact.mission.program})
                  </span>
                </div>

                <button
                  onClick={handleDismiss}
                  className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  title="Close popup"
                  aria-label="Close popup"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Site Designation */}
              <div className="space-y-0.5">
                <h3 className="text-xs font-medium text-white leading-snug">
                  {artifact.name}
                </h3>
                <p className="text-[11px] text-neutral-400 font-mono">
                  {artifact.landingSiteName}
                </p>
              </div>

              {/* Telemetry Strip: Coordinates & Status */}
              <div className="flex items-center justify-between text-[10px] font-mono bg-white/[0.03] rounded-md px-2 py-1 border border-white/[0.04]">
                <span className="text-amber-300 font-medium">{formattedCoords}</span>
                <span className="flex items-center gap-1 text-neutral-400">
                  {isApproximate ? (
                    <>
                      <AlertTriangle className="w-2.5 h-2.5 text-red-400" />
                      <span className="text-red-300">approx</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                      <span>verified</span>
                    </>
                  )}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  onClick={handleOpenDossier}
                  className="flex-1 py-1.5 px-2 rounded-md bg-white/[0.08] hover:bg-white/[0.14] text-white text-[11px] font-medium border border-white/[0.08] flex items-center justify-center gap-1 transition-colors shadow-xs"
                >
                  <span>Full Dossier</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </button>

                <button
                  onClick={handleFocus}
                  className="p-1.5 rounded-md text-neutral-400 hover:text-amber-300 hover:bg-white/[0.06] border border-white/[0.06] transition-colors"
                  title="Center camera on equipment"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : isHovered ? (
            /* Hover State: Ultra-compact, non-intrusive tooltip */
            <div
              className={`bg-[#0a0d14]/90 backdrop-blur-sm text-neutral-200 border border-white/[0.1] rounded-md px-2 py-0.5 shadow-xl flex items-center gap-1.5 text-[10px] whitespace-nowrap pointer-events-none transition-transform duration-75 ${popupAlignmentClasses}`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: baseColor }}
              />
              <span className="font-semibold text-white">{artifact.mission.name}</span>
              <span className="text-neutral-400">
                {artifact.designation.replace('Descent Stage', 'LM')}
              </span>
            </div>
          ) : (
            /* Passive Layer Label (When user explicitly turns on 'Site Labels'): Minimal tag */
            <div
              className={`text-[9px] font-mono text-neutral-400/90 bg-[#06080d]/60 backdrop-blur-xs px-1.5 py-0.2 rounded border border-white/5 opacity-80 whitespace-nowrap pointer-events-none ${popupAlignmentClasses}`}
            >
              {artifact.mission.name}
            </div>
          )}
        </Html>
      )}
    </group>
  );
}

export function ArtifactMarkers({
  radius = 1.0,
  rotationY = 0,
}: ArtifactMarkersProps) {
  const visible = useExplorerStore((state) => state.visibleLayers.markers);
  const searchQuery = useExplorerStore((state) => state.searchQuery.toLowerCase());
  const selectedCategory = useExplorerStore((state) => state.selectedCategory);
  const selectedMission = useExplorerStore((state) => state.selectedMission);
  const selectedStatus = useExplorerStore((state) => state.selectedStatus);

  const filteredArtifacts = useMemo(() => {
    return MOON_ARTIFACTS.filter((artifact) => {
      // Category filter
      if (selectedCategory !== 'all' && artifact.category !== selectedCategory) {
        return false;
      }
      // Mission filter
      if (selectedMission !== 'all' && artifact.mission.id !== selectedMission) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && artifact.status !== selectedStatus) {
        return false;
      }
      // Text search
      if (searchQuery.trim().length > 0) {
        const matchName = artifact.name.toLowerCase().includes(searchQuery);
        const matchMission = artifact.mission.name.toLowerCase().includes(searchQuery);
        const matchSite = artifact.landingSiteName.toLowerCase().includes(searchQuery);
        const matchDesignation = artifact.designation.toLowerCase().includes(searchQuery);
        return matchName || matchMission || matchSite || matchDesignation;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedMission, selectedStatus]);

  if (!visible) return null;

  return (
    <group>
      {filteredArtifacts.map((artifact) => (
        <MarkerItem
          key={artifact.id}
          artifact={artifact}
          radius={radius}
          rotationY={rotationY}
        />
      ))}
    </group>
  );
}
