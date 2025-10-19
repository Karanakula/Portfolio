import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Torus } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Technology logos and their corresponding geometries
const techConfigs = {
  // Languages
  'Java': { geometry: 'box', color: '#f89820', logo: '☕' },
  'Python': { geometry: 'sphere', color: '#3776ab', logo: '🐍' },
  'JavaScript': { geometry: 'box', color: '#f7df1e', logo: '⚡' },
  'C': { geometry: 'box', color: '#00599c', logo: 'C' },
  'SQL': { geometry: 'box', color: '#336791', logo: '🗄️' },
  
  // Full-Stack
  'React': { geometry: 'sphere', color: '#61dafb', logo: '⚛️' },
  'Node.js': { geometry: 'box', color: '#339933', logo: '🟢' },
  'Express.js': { geometry: 'box', color: '#000000', logo: '🚀' },
  'Flask': { geometry: 'box', color: '#000000', logo: '🌶️' },
  'HTML5': { geometry: 'box', color: '#e34f26', logo: '🌐' },
  'CSS': { geometry: 'box', color: '#1572b6', logo: '🎨' },
  'Bootstrap': { geometry: 'box', color: '#7952b3', logo: 'B' },
  'Tailwind CSS': { geometry: 'box', color: '#06b6d4', logo: '💨' },
  'REST APIs': { geometry: 'box', color: '#ff6b6b', logo: '🔗' },
  'GraphQL': { geometry: 'sphere', color: '#e10098', logo: '🕸️' },
  'MongoDB': { geometry: 'box', color: '#47a248', logo: '🍃' },
  'PostgreSQL': { geometry: 'box', color: '#336791', logo: '🐘' },
  
  // Cloud & Tools
  'AWS': { geometry: 'box', color: '#ff9900', logo: '☁️' },
  'Git': { geometry: 'box', color: '#f05032', logo: '🌿' },
  'GitHub': { geometry: 'sphere', color: '#181717', logo: '🐙' },
  'Docker': { geometry: 'box', color: '#2496ed', logo: '🐳' },
  'CI/CD': { geometry: 'box', color: '#ff6b35', logo: '🔄' },
  'Postman': { geometry: 'box', color: '#ff6c37', logo: '📮' },
  'VS Code': { geometry: 'box', color: '#007acc', logo: '💻' },
  'Figma': { geometry: 'sphere', color: '#f24e1e', logo: '🎨' },
  
  // Software Engineering
  'Data Structures & Algorithms': { geometry: 'box', color: '#8b5cf6', logo: '🧮' },
  'System Design & Scalability': { geometry: 'box', color: '#06b6d4', logo: '🏗️' },
  'Agile Methodologies': { geometry: 'box', color: '#10b981', logo: '🏃' },
  'OOP': { geometry: 'box', color: '#f59e0b', logo: '🔧' },
  'Software Architecture': { geometry: 'box', color: '#ef4444', logo: '🏛️' },
  'Design Patterns': { geometry: 'box', color: '#8b5cf6', logo: '🎭' },
  'Responsive UI/UX Design': { geometry: 'box', color: '#ec4899', logo: '📱' }
};

function SkillGeometry({ skill, hovered, onClick }) {
  const meshRef = useRef();
  const [clicked, setClicked] = useState(false);
  const config = techConfigs[skill] || { geometry: 'box', color: '#6ea8fe', logo: '💻' };

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Floating animation
      meshRef.current.position.y = Math.sin(time + meshRef.current.userData.offset) * 0.1;
      
      // Gentle rotation
      meshRef.current.rotation.y = time * 0.2;
      
      // Hover effects
      if (hovered) {
        meshRef.current.scale.setScalar(1.3);
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
    switch (config.geometry) {
      case 'sphere':
        return <Sphere args={[0.6, 16, 16]} />;
      case 'torus':
        return <Torus args={[0.4, 0.2, 8, 16]} />;
      default:
        return <Box args={[0.8, 0.8, 0.2]} />;
    }
  };

  return (
    <animated.group
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
        color={config.color}
        emissive={config.color}
        emissiveIntensity={hovered ? 0.4 : 0.1}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
      
      {/* Logo/Icon */}
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {config.logo}
      </Text>
    </animated.group>
  );
}

export default function SkillLogo3D({ skill, position, hovered, onHover, onClick }) {
  return (
    <div 
      className="skill-logo-3d-container"
      style={{
        width: '100px',
        height: '100px',
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#6ea8fe" />
        
        <SkillGeometry 
          skill={skill} 
          hovered={hovered}
          onClick={onClick}
        />
      </Canvas>
      
      <div 
        className="skill-label"
        style={{
          position: 'absolute',
          bottom: '-25px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: hovered ? '#e6e9ef' : '#9aa3b2',
          fontSize: '0.7rem',
          fontWeight: '500',
          textAlign: 'center',
          opacity: hovered ? 1 : 0.8,
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        {skill}
      </div>
    </div>
  );
}
