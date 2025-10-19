import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const EnhancedBackgroundMaterial = shaderMaterial(
  {
    time: 0,
    mouse: new THREE.Vector2(0, 0),
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    color1: new THREE.Color(0x6ea8fe),
    color2: new THREE.Color(0xb388ff),
    color3: new THREE.Color(0x0b0d12),
    color4: new THREE.Color(0x1a1f2e),
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
    uniform vec2 mouse;
    uniform vec2 resolution;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform vec3 color4;
    varying vec2 vUv;
    
    // Noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    // Smooth noise
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Fractal noise
    float fractalNoise(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for (int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      
      return value;
    }
    
    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5, 0.5);
      
      // Mouse influence
      vec2 mouseInfluence = (mouse + 1.0) * 0.5;
      
      // Create flowing patterns
      float flow1 = fractalNoise(uv * 2.0 + time * 0.1 + mouseInfluence * 0.3);
      float flow2 = fractalNoise(uv * 3.0 - time * 0.15 + mouseInfluence * 0.2);
      float flow3 = fractalNoise(uv * 1.5 + time * 0.08);
      
      // Radial gradient from center
      float dist = distance(uv, center);
      float radialMask = 1.0 - smoothstep(0.3, 1.0, dist);
      
      // Create organic shapes
      float organic1 = sin(uv.x * 10.0 + time * 0.5) * cos(uv.y * 8.0 + time * 0.3) * 0.1;
      float organic2 = sin(uv.y * 12.0 + time * 0.7) * cos(uv.x * 6.0 + time * 0.4) * 0.08;
      
      // Combine flows
      float combinedFlow = (flow1 + flow2 * 0.7 + flow3 * 0.5) * 0.4;
      combinedFlow += organic1 + organic2;
      
      // Create color mixing
      vec3 baseColor = mix(color3, color4, combinedFlow * 0.3);
      vec3 accentColor = mix(color1, color2, combinedFlow * 0.5 + radialMask);
      
      // Mouse interaction
      float mouseDist = distance(uv, mouseInfluence);
      float mouseInfluence = exp(-mouseDist * 3.0) * 0.3;
      
      // Final color mixing
      vec3 finalColor = mix(baseColor, accentColor, radialMask + mouseInfluence);
      
      // Add subtle animation
      finalColor += sin(time * 2.0 + combinedFlow * 10.0) * 0.02;
      
      gl_FragColor = vec4(finalColor, 0.8);
    }
  `
);

extend({ EnhancedBackgroundMaterial });

export default function EnhancedBackground({ mousePosition }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.time = state.clock.elapsedTime;
      
      if (mousePosition?.current) {
        meshRef.current.material.mouse.set(
          mousePosition.current.x,
          mousePosition.current.y
        );
      }
      
      meshRef.current.material.resolution.set(
        window.innerWidth,
        window.innerHeight
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <enhancedBackgroundMaterial />
    </mesh>
  );
}
