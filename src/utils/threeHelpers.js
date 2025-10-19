import * as THREE from 'three';

// Utility function to create floating particles
export function createParticleSystem(count, radius = 10) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * radius;
    positions[i * 3 + 2] = (Math.random() - 0.5) * radius;
    
    // Random colors between accent colors
    const color = new THREE.Color();
    color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  
  return { positions, colors };
}

// Utility function to create animated geometry positions
export function createConstellationPositions(items, radius = 3) {
  const positions = [];
  
  items.forEach((item, index) => {
    const angle = (index / items.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 2;
    
    positions.push({
      position: [x, y, z],
      item,
      index
    });
  });
  
  return positions;
}

// Utility function for smooth mouse following
export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

// Utility function to create gradient material
export function createGradientMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color(0x6ea8fe) },
      color2: { value: new THREE.Color(0xb388ff) },
      color3: { value: new THREE.Color(0x0b0d12) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 8.0 + time * 0.5) * 0.1;
        float dist = distance(uv, vec2(0.5, 0.5));
        
        vec3 color = mix(
          mix(color1, color2, dist + noise),
          color3,
          smoothstep(0.3, 1.0, dist)
        );
        
        gl_FragColor = vec4(color, 0.8);
      }
    `
  });
}
