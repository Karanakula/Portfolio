import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Hook for managing 3D scene animations
export function use3DScene() {
  const sceneRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  useFrame((state) => {
    if (sceneRef.current) {
      // Update scene animations here
      const elapsedTime = clockRef.current.getElapsedTime();
      
      // Example: Rotate scene slowly
      sceneRef.current.rotation.y = elapsedTime * 0.1;
    }
  });

  return sceneRef;
}

// Hook for mouse interaction with 3D objects
export function useMouseInteraction() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetMouseRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    // Smooth mouse following
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;
  });

  return mouseRef;
}

// Hook for floating animation
export function useFloatingAnimation(speed = 1, amplitude = 0.1) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed;
      meshRef.current.position.y += Math.sin(time) * amplitude;
    }
  });

  return meshRef;
}

// Hook for rotation animation
export function useRotationAnimation(speed = { x: 0.01, y: 0.02, z: 0.005 }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed.x;
      meshRef.current.rotation.y += speed.y;
      meshRef.current.rotation.z += speed.z;
    }
  });

  return meshRef;
}
