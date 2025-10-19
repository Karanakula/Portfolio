import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

function IconGeometry({ icon, hovered, onClick }) {
  const meshRef = useRef();
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Floating animation
      meshRef.current.position.y = Math.sin(time + meshRef.current.userData.offset) * 0.1;
      
      // Rotation animation
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      // Hover effects
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
        meshRef.current.position.z = 0.2;
      } else {
        meshRef.current.scale.setScalar(1);
        meshRef.current.position.z = 0;
      }
    }
  });

  const { scale } = useSpring({
    scale: clicked ? 0.8 : 1,
    config: { tension: 300, friction: 20 }
  });

  const getGeometry = () => {
    switch (icon) {
      case 'github':
        return <Box args={[0.8, 0.8, 0.2]} />;
      case 'linkedin':
        return <Torus args={[0.4, 0.2, 8, 16]} />;
      case 'leetcode':
        return <Sphere args={[0.5, 16, 16]} />;
      default:
        return <Box args={[0.6, 0.6, 0.6]} />;
    }
  };

  const getColor = () => {
    switch (icon) {
      case 'github':
        return hovered ? '#ffffff' : '#9aa3b2';
      case 'linkedin':
        return hovered ? '#0077b5' : '#9aa3b2';
      case 'leetcode':
        return hovered ? '#ffa116' : '#9aa3b2';
      default:
        return '#6ea8fe';
    }
  };

  return (
    <animated.mesh
      ref={meshRef}
      scale={scale}
      onClick={(e) => {
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
        onClick?.(e);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto';
      }}
    >
      {getGeometry()}
      <meshStandardMaterial
        color={getColor()}
        emissive={getColor()}
        emissiveIntensity={hovered ? 0.3 : 0.1}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </animated.mesh>
  );
}

export default function SocialIcon3D({ icon, href, label, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleClick = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="social-icon-3d-container"
      style={{
        width: '80px',
        height: '80px',
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          mousePosition.current.x = (event.clientX - rect.width / 2) / rect.width;
          mousePosition.current.y = -(event.clientY - rect.height / 2) / rect.height;
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#6ea8fe" />
        
        <IconGeometry 
          icon={icon} 
          hovered={hovered}
          onClick={handleClick}
        />
      </Canvas>
      
      <div 
        className="social-label"
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: hovered ? '#e6e9ef' : '#9aa3b2',
          fontSize: '0.8rem',
          fontWeight: '500',
          textAlign: 'center',
          opacity: hovered ? 1 : 0.7,
          transition: 'all 0.3s ease',
          pointerEvents: 'none'
        }}
      >
        {label}
      </div>
    </div>
  );
}
