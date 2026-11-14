'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { latLongToVector3 } from '@/lib/coordinates';
import { LatLngCoordinates } from '@/types/artifact';

interface RegionalTerrainProps {
  siteId: string;
  centerCoordinates: LatLngCoordinates;
  radius?: number; // Base planetary sphere radius
  extentKm?: number; // Regional bounding radius in km
  visible?: boolean;
}

/**
 * Modular regional high-resolution terrain component.
 *
 * Scientific Integrity & Architecture:
 * - Designed to host localized high-density Digital Elevation Models (DEM)
 *   from NASA LRO NAC stereo pairs (e.g. Apollo 17 Taurus-Littrow DTM at 0.5m/px).
 * - Adheres strictly to scientific integrity rules:
 *   Does NOT synthesize fake random fractal noise or fictional craters.
 * - When high-resolution regional DTMs (>500MB) are pending web tile packaging,
 *   the system seamlessly yields to the LOLA global elevation model and displays
 *   an explicit scientific notice in the UI telemetry.
 */
export function RegionalTerrain({
  centerCoordinates,
  radius = 1.0,
  visible = false,
}: RegionalTerrainProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Position and orient tangent to the sphere at landing site coordinates
  const { position, normal } = useMemo(() => {
    const pos = latLongToVector3(
      centerCoordinates.latitude,
      centerCoordinates.longitude,
      radius,
      0.002
    );
    const norm = new THREE.Vector3(...pos).normalize();
    return { position: pos, normal: norm };
  }, [centerCoordinates, radius]);

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  useEffect(() => {
    const currentMesh = meshRef.current;
    return () => {
      if (currentMesh) {
        currentMesh.geometry.dispose();
        if (Array.isArray(currentMesh.material)) {
          currentMesh.material.forEach((m) => m.dispose());
        } else {
          currentMesh.material.dispose();
        }
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <group position={position} quaternion={quaternion}>
      {/* High-Resolution Regional DEM Tile Slot */}
      <mesh ref={meshRef} receiveShadow>
        <planeGeometry args={[0.08, 0.08, 64, 64]} />
        <meshStandardMaterial
          color="#949aa4"
          roughness={0.96}
          metalness={0.02}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
