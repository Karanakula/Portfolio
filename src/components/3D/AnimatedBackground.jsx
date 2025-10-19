import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const GradientMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color(0x6ea8fe),
    color2: new THREE.Color(0xb388ff),
    color3: new THREE.Color(0x0b0d12),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // Create animated gradient
      float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 8.0 + time * 0.5) * 0.1;
      
      // Radial gradient from center
      float dist = distance(uv, vec2(0.5, 0.5));
      
      // Mix colors based on distance and noise
      vec3 color = mix(
        mix(color1, color2, dist + noise),
        color3,
        smoothstep(0.3, 1.0, dist)
      );
      
      gl_FragColor = vec4(color, 0.8);
    }
  `
);

extend({ GradientMaterial });

export default function AnimatedBackground() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <gradientMaterial />
    </mesh>
  );
}
