import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingParticles({ count = 3000, mousePosition }) {
  const ref = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a more interesting distribution
      const radius = Math.random() * 15 + 5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 20;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Color variation
      const color = new THREE.Color();
      const hue = 0.6 + Math.random() * 0.2; // Blue to purple range
      color.setHSL(hue, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      
      // Slow rotation
      ref.current.rotation.x = time * 0.02;
      ref.current.rotation.y = time * 0.03;
      
      // Mouse interaction with stronger effect
      if (mousePosition?.current) {
        ref.current.position.x = mousePosition.current.x * 0.3;
        ref.current.position.y = mousePosition.current.y * 0.3;
      }
      
      // Subtle floating animation
      ref.current.position.z = Math.sin(time * 0.1) * 0.5;
    }
  });

  return (
    <Points 
      ref={ref} 
      positions={particlesPosition.positions} 
      colors={particlesPosition.colors}
      stride={3} 
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}
