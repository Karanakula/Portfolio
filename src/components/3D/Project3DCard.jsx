import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text, Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import { motion } from 'framer-motion';
import BlurImage from '../BlurImage';

export default function Project3DCard({ project, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  const { rotationY, scale } = useSpring({
    rotationY: isFlipped ? Math.PI : 0,
    scale: hovered ? 1.05 : 1,
    config: { tension: 300, friction: 30 }
  });

  useFrame((state) => {
    if (meshRef.current && !isFlipped) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="project-3d-card"
      style={{ height: '400px', width: '100%' }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6ea8fe" />
        
        <animated.group
          ref={meshRef}
          rotation-y={rotationY}
          scale={scale}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front Face - Project Image */}
          <Box args={[3, 2, 0.1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#121621" />
            <Html
              position={[0, 0, 0.06]}
              transform
              occlude
              style={{ width: '100%', height: '100%' }}
            >
              <div style={{ 
                width: '100%', 
                height: '100%', 
                background: 'linear-gradient(135deg, #121621, #1b2232)',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.8)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  padding: '1rem',
                  color: 'white'
                }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{project.title}</h3>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', opacity: 0.8 }}>
                    {project.period}
                  </p>
                </div>
              </div>
            </Html>
          </Box>

          {/* Back Face - Project Details */}
          <Box args={[3, 2, 0.1]} position={[0, 0, -0.1]} rotation-y={Math.PI}>
            <meshStandardMaterial color="#121621" />
            <Html
              position={[0, 0, 0.06]}
              transform
              occlude
              style={{ width: '100%', height: '100%' }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #121621, #1b2232)',
                borderRadius: '8px',
                padding: '1rem',
                color: 'white',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#6ea8fe' }}>
                  {project.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      style={{
                        background: '#171d2b',
                        border: '1px solid #21293a',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul style={{ 
                  margin: '0.5rem 0 0', 
                  paddingLeft: '1rem',
                  fontSize: '0.85rem',
                  opacity: 0.9
                }}>
                  {project.bullets.slice(0, 2).map((bullet, i) => (
                    <li key={i} style={{ marginBottom: '0.3rem' }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Html>
          </Box>
        </animated.group>
      </Canvas>
      
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#9aa3b2',
        fontSize: '0.8rem',
        textAlign: 'center'
      }}>
        Click to flip • Hover to rotate
      </div>
    </motion.div>
  );
}
