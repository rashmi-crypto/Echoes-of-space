'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useExplorerStore } from '@/store/explorer-store';
import { RegionalTerrain } from './RegionalTerrain';

interface MoonProps {
  radius?: number;
  segments?: number; // Geometry segments (must be >= 192 for smooth elevation displacement)
}

/**
 * Validates whether an image is a suitable single-channel (grayscale) heightmap.
 * Checks dimensions, aspect ratio, and samples pixels to confirm lack of chromatic variance.
 */
function validateSingleChannelHeightmap(image: HTMLImageElement): boolean {
  try {
    if (!image.width || !image.height) return false;

    // Standard equirectangular projection check (2:1 aspect ratio with tolerance)
    const aspect = image.width / image.height;
    if (Math.abs(aspect - 2.0) > 0.15) {
      console.warn(
        `[MoonRenderer] Elevation map aspect ratio (${aspect.toFixed(2)}) is not equirectangular (2:1).`
      );
    }

    // Inspect pixel variance on a sample canvas
    const sampleCanvas = document.createElement('canvas');
    const sampleWidth = Math.min(64, image.width);
    const sampleHeight = Math.min(32, image.height);
    sampleCanvas.width = sampleWidth;
    sampleCanvas.height = sampleHeight;
    const ctx = sampleCanvas.getContext('2d');
    if (!ctx) return false;

    ctx.drawImage(image, 0, 0, sampleWidth, sampleHeight);
    const imgData = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;

    let chromaticDiffSum = 0;
    const sampleCount = imgData.length / 4;

    for (let i = 0; i < imgData.length; i += 4) {
      const r = imgData[i];
      const g = imgData[i + 1];
      const b = imgData[i + 2];
      chromaticDiffSum += Math.abs(r - g) + Math.abs(g - b);
    }

    const avgChromaticDiff = chromaticDiffSum / sampleCount;
    if (avgChromaticDiff > 6.0) {
      console.warn(
        `[MoonRenderer] Heightmap validation rejected: Image has chromatic variance (${avgChromaticDiff.toFixed(
          1
        )}). Must be a single-channel grayscale elevation map.`
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error('[MoonRenderer] Error validating elevation heightmap:', err);
    return false;
  }
}

/**
 * Procedural fallback texture for a realistic, neutral lunar regolith surface
 * featuring Nearside Maria and prominent impact crater rays.
 */
function createProceduralMoonTextures(): {
  diffuseMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const width = 1024;
  const height = 512;

  const diffuseCanvas = document.createElement('canvas');
  diffuseCanvas.width = width;
  diffuseCanvas.height = height;
  const ctx = diffuseCanvas.getContext('2d')!;

  ctx.fillStyle = '#9ca1ab';
  ctx.fillRect(0, 0, width, height);

  // Micro-crater noise simulation
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 20;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const drawMare = (
    cxPct: number,
    cyPct: number,
    rx: number,
    ry: number,
    opacity: number = 0.45
  ) => {
    const cx = cxPct * width;
    const cy = cyPct * height;
    const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, Math.max(rx, ry));
    grad.addColorStop(0, `rgba(45, 48, 55, ${opacity})`);
    grad.addColorStop(0.65, `rgba(60, 64, 72, ${opacity * 0.7})`);
    grad.addColorStop(1, 'rgba(156, 161, 171, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
    ctx.fill();
  };

  // Nearside Maria
  drawMare(0.42, 0.45, 95, 120, 0.48); // Oceanus Procellarum
  drawMare(0.45, 0.33, 65, 55, 0.52); // Mare Imbrium
  drawMare(0.55, 0.36, 45, 45, 0.48); // Mare Serenitatis
  drawMare(0.565, 0.49, 50, 42, 0.52); // Mare Tranquillitatis
  drawMare(0.66, 0.41, 35, 30, 0.55); // Mare Crisium
  drawMare(0.64, 0.52, 45, 40, 0.46); // Mare Fecunditatis
  drawMare(0.6, 0.6, 30, 30, 0.48); // Mare Nectaris
  drawMare(0.45, 0.6, 40, 35, 0.44); // Mare Nubium

  const diffuseMap = new THREE.CanvasTexture(diffuseCanvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.ClampToEdgeWrapping;
  diffuseMap.generateMipmaps = true;
  diffuseMap.minFilter = THREE.LinearMipmapLinearFilter;
  diffuseMap.needsUpdate = true;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d')!;
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, width, height);
  bCtx.drawImage(diffuseCanvas, 0, 0);

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;
  bumpMap.generateMipmaps = true;
  bumpMap.minFilter = THREE.LinearMipmapLinearFilter;
  bumpMap.needsUpdate = true;

  return { diffuseMap, bumpMap };
}

export function Moon({ radius = 1.0, segments = 256 }: MoonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const showGrid = useExplorerStore((state) => state.visibleLayers.grid);
  const displacementScaleSetting = useExplorerStore(
    (state) => state.displacementScale
  );
  const elevationExaggeration = useExplorerStore(
    (state) => state.elevationExaggeration
  );

  const proceduralTextures = useMemo(() => {
    if (typeof window !== 'undefined') {
      return createProceduralMoonTextures();
    }
    return null;
  }, []);

  const [loadedTextures, setLoadedTextures] = useState<{
    diffuse: THREE.Texture | null;
    bump: THREE.Texture | null;
    displacement: THREE.Texture | null;
    isDisplacementValidated: boolean;
  }>({
    diffuse: null,
    bump: null,
    displacement: null,
    isDisplacementValidated: false,
  });

  const activeDiffuseMap = loadedTextures.diffuse || proceduralTextures?.diffuseMap || null;
  const activeBumpMap = loadedTextures.bump || proceduralTextures?.bumpMap || null;

  // Calculate actual displacement strength based on user configuration
  const activeDisplacementScale = loadedTextures.isDisplacementValidated
    ? displacementScaleSetting * elevationExaggeration
    : 0;

  // Safe disposal of Three.js textures on unmount
  useEffect(() => {
    return () => {
      proceduralTextures?.diffuseMap.dispose();
      proceduralTextures?.bumpMap.dispose();
      loadedTextures.diffuse?.dispose();
      loadedTextures.bump?.dispose();
      loadedTextures.displacement?.dispose();
    };
  }, [proceduralTextures, loadedTextures]);

  useEffect(() => {
    let isMounted = true;
    const loader = new THREE.TextureLoader();

    // 1. Attempt to load genuine NASA LROC global color map
    const colorCandidates = [
      '/textures/moon/lroc_color_2k.jpg',
      '/textures/moon/lunar_color.jpg',
    ];

    const tryLoadColor = (index: number) => {
      if (index >= colorCandidates.length || !isMounted) return;
      loader.load(
        colorCandidates[index],
        (tex) => {
          if (!isMounted) return;
          tex.wrapS = THREE.RepeatWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          setLoadedTextures((prev) => ({ ...prev, diffuse: tex }));
        },
        undefined,
        () => tryLoadColor(index + 1)
      );
    };
    tryLoadColor(0);

    // 2. Attempt to load genuine NASA LOLA elevation heightmap with strict validation
    const elevationCandidates = [
      '/textures/moon/ldem_3_8bit.jpg',
      '/textures/moon/lunar_elevation.jpg',
    ];

    const tryLoadElevation = (index: number) => {
      if (index >= elevationCandidates.length || !isMounted) return;
      loader.load(
        elevationCandidates[index],
        (tex) => {
          if (!isMounted) return;
          const isValid = validateSingleChannelHeightmap(tex.image);
          if (isValid) {
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.colorSpace = THREE.NoColorSpace;
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            setLoadedTextures((prev) => ({
              ...prev,
              displacement: tex,
              isDisplacementValidated: true,
            }));
          } else {
            console.warn(
              '[MoonRenderer] Elevation texture rejected: Not a valid single-channel heightmap.'
            );
            tryLoadElevation(index + 1);
          }
        },
        undefined,
        () => tryLoadElevation(index + 1)
      );
    };
    tryLoadElevation(0);

    return () => {
      isMounted = false;
    };
  }, []);

  // Scientific latitude / longitude grid overlay matching Three.js equirectangular coordinates
  const gridGeometry = useMemo(() => {
    const lines: number[] = [];
    const r = radius * 1.003;

    // Latitude parallels
    for (let lat = -75; lat <= 75; lat += 15) {
      const phi = (90 - lat) * (Math.PI / 180);
      const ringR = r * Math.sin(phi);
      const y = r * Math.cos(phi);
      const segs = 96;
      for (let i = 0; i < segs; i++) {
        const t1 = (i / segs) * Math.PI * 2;
        const t2 = ((i + 1) / segs) * Math.PI * 2;
        lines.push(
          ringR * Math.cos(t1),
          y,
          ringR * Math.sin(t1),
          ringR * Math.cos(t2),
          y,
          ringR * Math.sin(t2)
        );
      }
    }

    // Longitude meridians
    for (let lon = -180; lon < 180; lon += 30) {
      const theta = (lon + 180) * (Math.PI / 180);
      const segs = 64;
      for (let i = 0; i < segs; i++) {
        const phi1 = (i / segs) * Math.PI;
        const phi2 = ((i + 1) / segs) * Math.PI;
        lines.push(
          -r * Math.sin(phi1) * Math.cos(theta),
          r * Math.cos(phi1),
          r * Math.sin(phi1) * Math.sin(theta),
          -r * Math.sin(phi2) * Math.cos(theta),
          r * Math.cos(phi2),
          r * Math.sin(phi2) * Math.sin(theta)
        );
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
    return geom;
  }, [radius]);

  return (
    <group>
      {/* High-Resolution Planetary Sphere (shadow maps pass disabled for 60fps performance) */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshStandardMaterial
          map={activeDiffuseMap || undefined}
          bumpMap={activeBumpMap || undefined}
          bumpScale={0.005}
          displacementMap={
            loadedTextures.isDisplacementValidated
              ? loadedTextures.displacement || undefined
              : undefined
          }
          displacementScale={activeDisplacementScale}
          displacementBias={-0.5 * activeDisplacementScale}
          roughness={0.96}
          metalness={0.02}
          color="#e2e8f0"
        />
      </mesh>

      {/* Lat/Long Coordinate Grid Overlay */}
      {showGrid && (
        <lineSegments geometry={gridGeometry}>
          <lineBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </lineSegments>
      )}

      {/* Modular High-Resolution Regional Terrain Slots */}
      <RegionalTerrain
        siteId="apollo-11"
        centerCoordinates={{ latitude: 0.67408, longitude: 23.47297 }}
        radius={radius}
        visible={false}
      />
      <RegionalTerrain
        siteId="apollo-17"
        centerCoordinates={{ latitude: 20.1908, longitude: 30.77168 }}
        radius={radius}
        visible={false}
      />
    </group>
  );
}

/**
 * Fallback neutral sphere rendered during Suspense texture loading.
 */
export function MoonFallbackSphere({ radius = 1.0 }: { radius?: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial color="#888e99" roughness={0.96} metalness={0.02} />
    </mesh>
  );
}
