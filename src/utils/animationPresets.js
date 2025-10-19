// Animation presets for consistent timing and easing
export const animationPresets = {
  // Framer Motion presets
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  
  fadeInScale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  
  slideInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  
  slideInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },
  
  // GSAP presets
  gsapReveal: {
    duration: 0.8,
    ease: 'power2.out'
  },
  
  gsapStagger: {
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  },
  
  gsapParallax: {
    duration: 1,
    ease: 'none'
  },
  
  // Transition presets
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15
  },
  
  smooth: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94]
  },
  
  bouncy: {
    type: 'spring',
    stiffness: 200,
    damping: 10
  }
};

// Common animation delays for staggered effects
export const delays = {
  fast: 0.1,
  medium: 0.2,
  slow: 0.3,
  verySlow: 0.5
};

// Common durations
export const durations = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
  verySlow: 1.5
};
