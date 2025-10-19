import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

function TechNode({ position, tech, index, hovered, onHover }) {
  const meshRef = useRef();
  const [selected, setSelected] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const { scale, color } = useSpring({
    scale: hovered || selected ? 1.5 : 1,
    color: selected ? '#b388ff' : hovered ? '#6ea8fe' : '#9aa3b2',
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.group
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={() => {
        onHover(tech);
        setSelected(true);
      }}
      onPointerOut={() => {
        onHover(null);
        setSelected(false);
      }}
      onClick={() => setSelected(!selected)}
    >
      <Sphere args={[0.1, 16, 16]}>
        <animated.meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {hovered && (
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.15}
          color="#e6e9ef"
          anchorX="center"
          anchorY="middle"
        >
          {tech}
        </Text>
      )}
    </animated.group>
  );
}

function ConnectionLine({ start, end, opacity = 0.3 }) {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6ea8fe" transparent opacity={opacity} />
    </line>
  );
}

export default function TechConstellation({ techData }) {
  const [hoveredTech, setHoveredTech] = useState(null);
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Generate positions for tech nodes in a 3D constellation
  const techPositions = useMemo(() => {
    const positions = [];
    let index = 0;
    
    Object.entries(techData).forEach(([category, techs], categoryIndex) => {
      const radius = 2 + categoryIndex * 0.5;
      const angleStep = (Math.PI * 2) / techs.length;
      
      techs.forEach((tech, techIndex) => {
        const angle = techIndex * angleStep;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;
        
        positions.push({
          position: [x, y, z],
          tech,
          category,
          index: index++
        });
      });
    });
    
    return positions;
  }, [techData]);

  // Generate connections between related technologies
  const connections = useMemo(() => {
    const lines = [];
    const maxConnections = 20;
    
    for (let i = 0; i < Math.min(techPositions.length, maxConnections); i++) {
      for (let j = i + 1; j < Math.min(techPositions.length, maxConnections); j++) {
        if (Math.random() > 0.7) { // 30% chance of connection
          lines.push({
            start: techPositions[i].position,
            end: techPositions[j].position,
            opacity: Math.random() * 0.3 + 0.1
          });
        }
      }
    }
    
    return lines;
  }, [techPositions]);

  return (
    <div className="tech-constellation" style={{ height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6ea8fe" />
        
        <group ref={groupRef}>
          {techPositions.map(({ position, tech, index }) => (
            <TechNode
              key={tech}
              position={position}
              tech={tech}
              index={index}
              hovered={hoveredTech === tech}
              onHover={setHoveredTech}
            />
          ))}
          
          {connections.map((connection, index) => (
            <ConnectionLine
              key={index}
              start={connection.start}
              end={connection.end}
              opacity={connection.opacity}
            />
          ))}
        </group>
      </Canvas>
      
      {hoveredTech && (
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(18, 22, 33, 0.9)',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          color: '#e6e9ef',
          fontSize: '0.9rem',
          border: '1px solid #21293a'
        }}>
          {hoveredTech}
        </div>
      )}
    </div>
  );
}
