'use client';

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useExplorerStore } from '@/store/explorer-store';

interface CameraControllerProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

export function CameraController({ controlsRef }: CameraControllerProps) {
  const { camera } = useThree();
  const cameraTarget = useExplorerStore((state) => state.cameraTarget);
  const cameraDistance = useExplorerStore((state) => state.cameraDistance);

  // Transition state
  const isTransitioningRef = useRef(false);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.4, 3.2));
  const lookAtTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (cameraTarget) {
      // Calculate camera position aligned with target marker vector
      const markerDir = new THREE.Vector3(...cameraTarget).normalize();
      // Position camera along marker normal at specified distance
      targetCamPosRef.current.copy(markerDir).multiplyScalar(cameraDistance);
      lookAtTargetRef.current.set(0, 0, 0);
      isTransitioningRef.current = true;
    } else {
      // Default global perspective
      targetCamPosRef.current.set(0, 0.5, 3.2);
      lookAtTargetRef.current.set(0, 0, 0);
      isTransitioningRef.current = true;
    }
  }, [cameraTarget, cameraDistance]);

  useFrame(() => {
    if (!isTransitioningRef.current) return;

    // Smooth spherical interpolation towards target camera viewpoint
    camera.position.lerp(targetCamPosRef.current, 0.06);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(lookAtTargetRef.current, 0.06);
      controlsRef.current.update();
    }

    // Stop transitioning when close enough
    if (camera.position.distanceTo(targetCamPosRef.current) < 0.01) {
      camera.position.copy(targetCamPosRef.current);
      isTransitioningRef.current = false;
    }
  });

  return null;
}
