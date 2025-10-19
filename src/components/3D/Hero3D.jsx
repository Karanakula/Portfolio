import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import FloatingParticles from './FloatingParticles';
import EnhancedBackground from './EnhancedBackground';
import * as THREE from 'three';

function FloatingGeometry({ position, geometry, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  const { scale } = useSpring({
    scale: 1,
    from: { scale: 0 },
    config: { tension: 100, friction: 10 }
  });

  return (
    <animated.mesh ref={meshRef} position={position} scale={scale}>
      {geometry === 'sphere' && <Sphere args={[0.3, 32, 32]} />}
      {geometry === 'box' && <Box args={[0.4, 0.4, 0.4]} />}
      {geometry === 'torus' && <Torus args={[0.2, 0.1, 16, 32]} />}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
      />
    </animated.mesh>
  );
}

// Tech-inspired floating elements
function TechElement({ position, type, index }) {
  const meshRef = useRef();
  
  const techElements = {
    code: { geometry: 'box', color: '#00ff88', size: [0.3, 0.3, 0.1] },
    server: { geometry: 'box', color: '#ff6b6b', size: [0.4, 0.2, 0.4] },
    database: { geometry: 'box', color: '#4ecdc4', size: [0.2, 0.4, 0.2] },
    cloud: { geometry: 'sphere', color: '#45b7d1', size: [0.3, 0.3, 0.3] },
    network: { geometry: 'torus', color: '#f9ca24', size: [0.2, 0.1, 16, 32] },
    ai: { geometry: 'sphere', color: '#6c5ce7', size: [0.25, 16, 16] },
    security: { geometry: 'box', color: '#fd79a8', size: [0.3, 0.3, 0.3] },
    mobile: { geometry: 'box', color: '#a29bfe', size: [0.2, 0.3, 0.05] }
  };

  const element = techElements[type] || techElements.code;

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.3;
      
      // Rotation
      meshRef.current.rotation.x = time * 0.2 + index;
      meshRef.current.rotation.y = time * 0.3 + index;
      
      // Scale pulsing
      const scale = 1 + Math.sin(time * 2 + index) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const getGeometry = () => {
    switch (element.geometry) {
      case 'sphere':
        return <Sphere args={element.size} />;
      case 'torus':
        return <Torus args={element.size} />;
      default:
        return <Box args={element.size} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {getGeometry()}
      <meshStandardMaterial
        color={element.color}
        emissive={element.color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Circuit-like connections between tech elements
function CircuitConnection({ start, end, delay = 0 }) {
  const lineRef = useRef();
  
  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.elapsedTime + delay;
      const opacity = 0.2 + Math.sin(time * 2) * 0.3;
      lineRef.current.material.opacity = opacity;
    }
  });

  const points = React.useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color="#6ea8fe" 
        transparent 
        opacity={0.3}
        linewidth={2}
      />
    </line>
  );
}

export default function Hero3D({ mousePosition }) {
  const [hovered, setHovered] = useState(false);

  const geometries = [
    { position: [2, 1, 0], geometry: 'sphere', color: '#6ea8fe' },
    { position: [-2, -1, 0], geometry: 'box', color: '#b388ff' },
    { position: [0, 2, -1], geometry: 'torus', color: '#6ea8fe' },
    { position: [-1, 0, 1], geometry: 'sphere', color: '#b388ff' },
    { position: [1.5, -1.5, 0.5], geometry: 'box', color: '#6ea8fe' },
  ];

  // Generate tech elements positions
  const techElements = [
    { position: [6, 2, -2], type: 'code', index: 0 },
    { position: [-6, 1, -1], type: 'server', index: 1 },
    { position: [4, -2, 1], type: 'database', index: 2 },
    { position: [-4, 3, -3], type: 'cloud', index: 3 },
    { position: [7, -1, 2], type: 'network', index: 4 },
    { position: [-7, -2, -1], type: 'ai', index: 5 },
    { position: [3, 3, 0], type: 'security', index: 6 },
    { position: [-3, -3, 1], type: 'mobile', index: 7 },
    { position: [8, 0, -2], type: 'code', index: 8 },
    { position: [-8, 1, 2], type: 'server', index: 9 },
  ];

  return (
    <div className="hero-3d-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - rect.width / 2) / rect.width;
          const y = -(event.clientY - rect.height / 2) / rect.height;
          mousePosition.current = { x, y };
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6ea8fe" />
        
        <EnhancedBackground mousePosition={mousePosition} />
        <FloatingParticles count={2000} mousePosition={mousePosition} />
        
        {geometries.map((geo, index) => (
          <FloatingGeometry key={index} {...geo} />
        ))}
        
        {techElements.map((tech, index) => (
          <TechElement key={index} {...tech} />
        ))}
        
        {/* Circuit connections */}
        <CircuitConnection start={techElements[0].position} end={techElements[1].position} delay={0} />
        <CircuitConnection start={techElements[2].position} end={techElements[3].position} delay={0.5} />
        <CircuitConnection start={techElements[4].position} end={techElements[5].position} delay={1} />
        <CircuitConnection start={techElements[6].position} end={techElements[7].position} delay={1.5} />
        <CircuitConnection start={techElements[8].position} end={techElements[9].position} delay={2} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={hovered}
          autoRotate={!hovered}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
