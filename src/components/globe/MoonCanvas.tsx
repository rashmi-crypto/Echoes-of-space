'use client';

import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Moon, MoonFallbackSphere } from './Moon';
import { ArtifactMarkers } from './ArtifactMarkers';
import { CameraController } from './CameraController';
import { PRIME_MERIDIAN_BASE_ROTATION_Y } from '@/lib/coordinates';
import { useExplorerStore } from '@/store/explorer-store';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Layers,
  Sliders,
  Mountain,
  Compass,
  X,
  Database,
} from 'lucide-react';

interface MoonCanvasProps {
  onOpenProvenance?: () => void;
}

export function MoonCanvas({ onOpenProvenance }: MoonCanvasProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [calibrationOpen, setCalibrationOpen] = useState(false);

  const sunlight = useExplorerStore((state) => state.visibleLayers.sunlight);
  const resetCamera = useExplorerStore((state) => state.resetCamera);
  const toggleLayer = useExplorerStore((state) => state.toggleLayer);
  const showGrid = useExplorerStore((state) => state.visibleLayers.grid);
  const selectArtifact = useExplorerStore((state) => state.selectArtifact);

  const elevationExaggeration = useExplorerStore(
    (state) => state.elevationExaggeration
  );
  const setElevationExaggeration = useExplorerStore(
    (state) => state.setElevationExaggeration
  );
  const textureLongitudeOffset = useExplorerStore(
    (state) => state.textureLongitudeOffset
  );
  const setTextureLongitudeOffset = useExplorerStore(
    (state) => state.setTextureLongitudeOffset
  );

  // Synchronized global orientation rotation for the lunar globe and all surface markers
  const rotationY = useMemo(() => {
    return PRIME_MERIDIAN_BASE_ROTATION_Y + (textureLongitudeOffset * Math.PI) / 180;
  }, [textureLongitudeOffset]);

  const handleZoom = (delta: number) => {
    if (!controlsRef.current) return;
    const cam = controlsRef.current.object;
    const dir = cam.position.clone().normalize();
    const newDist = Math.max(1.35, Math.min(5.5, cam.position.length() + delta));
    cam.position.copy(dir.multiplyScalar(newDist));
    controlsRef.current.update();
  };

  return (
    <div
      className="relative w-full h-full min-h-[450px] bg-[#06080d] overflow-hidden select-none"
      style={{ width: '100%', height: '100%', minHeight: '450px' }}
    >
      {/* 3D WebGL Canvas with Performance Budget (dpr clamp, shadow map pass disabled) */}
      <Canvas
        camera={{ position: [0, 0.4, 3.0], fov: 45 }}
        dpr={[1, 1.75]}
        onPointerMissed={() => selectArtifact(null)}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        className="w-full h-full"
      >
        {/* Deep Space Background Stars */}
        <Stars
          radius={80}
          depth={40}
          count={2000}
          factor={3.0}
          saturation={0}
          fade
          speed={0.3}
        />

        {/* Realistic Lighting Simulation: Zero shadow-pass overhead */}
        {sunlight ? (
          <>
            {/* Primary Directional Sunlight with sharp terminator contrast */}
            <directionalLight
              position={[5, 1.2, 3.5]}
              intensity={2.7}
              color="#fff8ed"
            />
            {/* Earthshine & Deep Cosmic Ambient Light */}
            <ambientLight intensity={0.12} color="#1b2333" />
            <hemisphereLight args={['#94a3b8', '#06080d', 0.1]} />
          </>
        ) : (
          /* High-visibility inspection lighting mode */
          <>
            <directionalLight position={[3, 3, 3]} intensity={1.6} color="#ffffff" />
            <directionalLight position={[-3, -2, -3]} intensity={0.9} color="#94a3b8" />
            <ambientLight intensity={0.6} color="#ffffff" />
          </>
        )}

        {/* Dynamic Camera Flight Controller */}
        <CameraController controlsRef={controlsRef} />

        {/* Orbit Controls with Damping & Clamped Zoom */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={1.35}
          maxDistance={5.5}
          rotateSpeed={0.5}
          zoomSpeed={0.7}
          enableDamping
          dampingFactor={0.05}
        />

        {/* React Suspense Boundary for 3D Assets */}
        <Suspense fallback={<MoonFallbackSphere radius={1.0} />}>
          {/* Synchronized Parent Group: Rotates Moon globe and markers identically */}
          <group rotation={[0, rotationY, 0]}>
            {/* Scientific Moon Sphere */}
            <Moon radius={1.0} segments={256} />

            {/* High-Performance 3D Markers & Collision-Free Labels */}
            <ArtifactMarkers radius={1.0} rotationY={rotationY} />
          </group>
        </Suspense>
      </Canvas>

      {/* Floating Canvas Quick Controls (Restrained Desktop Dock) */}
      <div className="absolute bottom-5 right-5 z-10 flex flex-col items-center gap-1.5">
        <div className="bg-[#0b0e14]/80 backdrop-blur-md border border-white/[0.08] rounded-xl p-1 flex flex-col gap-0.5 shadow-xl">
          <button
            onClick={() => handleZoom(-0.5)}
            title="Zoom In"
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(0.5)}
            title="Zoom Out"
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-full h-px bg-white/[0.06] my-0.5" />
          <button
            onClick={resetCamera}
            title="Reset Global View"
            className="p-2 text-neutral-400 hover:text-amber-400 hover:bg-white/[0.06] rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleLayer('grid')}
            title="Toggle Coordinate Grid"
            className={`p-2 rounded-lg transition-colors ${
              showGrid
                ? 'text-amber-400 bg-amber-500/15'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCalibrationOpen((prev) => !prev)}
            title="Geodetic Calibration"
            className={`p-2 rounded-lg transition-colors ${
              calibrationOpen
                ? 'text-amber-400 bg-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Geodetic Terrain Calibration Popover (Editorial Styling) */}
      {calibrationOpen && (
        <div className="absolute bottom-20 right-5 z-20 w-76 bg-[#0b0e14]/95 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-4 shadow-2xl text-xs space-y-4 font-sans">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
            <div className="flex items-center gap-2 text-neutral-200 font-medium text-xs">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              <span>LOLA Altimetry Calibration</span>
            </div>
            <button
              onClick={() => setCalibrationOpen(false)}
              className="text-neutral-500 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Elevation Displacement Exaggeration */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400 text-xs">
              <span>Topographic Relief:</span>
              <span className="text-amber-300 font-mono font-medium">
                {elevationExaggeration.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={elevationExaggeration}
              onChange={(e) =>
                setElevationExaggeration(parseFloat(e.target.value))
              }
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>0x (Flat)</span>
              <span>1.0x (Physical)</span>
              <span>3.0x</span>
            </div>
          </div>

          {/* Prime Meridian Longitude Offset */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-400 text-xs">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-amber-400" />
                Longitude Alignment:
              </span>
              <span className="text-amber-300 font-mono font-medium">
                {textureLongitudeOffset > 0 ? `+${textureLongitudeOffset}` : textureLongitudeOffset}°
              </span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={textureLongitudeOffset}
              onChange={(e) =>
                setTextureLongitudeOffset(parseInt(e.target.value, 10))
              }
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>-180°</span>
              <button
                onClick={() => setTextureLongitudeOffset(0)}
                className="text-amber-400 hover:underline"
              >
                Reset 0°
              </button>
              <span>+180°</span>
            </div>
          </div>

          {/* Provenance Quick Link */}
          {onOpenProvenance && (
            <button
              onClick={onOpenProvenance}
              className="w-full py-1.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[11px] text-neutral-300 hover:text-amber-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>NASA Datasets & Citations</span>
            </button>
          )}
        </div>
      )}

      {/* On-screen Navigation Hint (Minimalist) */}
      <div className="absolute bottom-5 left-5 z-10 pointer-events-none hidden sm:block">
        <div className="bg-[#0b0e14]/70 backdrop-blur-sm border border-white/[0.06] rounded-full px-3 py-1 text-[11px] text-neutral-400 flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          <span>Drag to orbit &bull; Scroll to zoom &bull; Click marker for details</span>
        </div>
      </div>
    </div>
  );
}
