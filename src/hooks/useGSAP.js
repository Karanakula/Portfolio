import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useGSAP() {
  const ref = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return ref;
}

// Hook for scroll-triggered animations
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref.current) {
      const {
        animation = 'fadeInUp',
        delay = 0,
        duration = 0.8,
        trigger = ref.current,
        start = 'top 80%',
        end = 'bottom 20%',
        toggleActions = 'play none none reverse'
      } = options;

      let animationConfig;
      
      switch (animation) {
        case 'fadeInUp':
          animationConfig = { opacity: 0, y: 50 };
          break;
        case 'fadeInScale':
          animationConfig = { opacity: 0, scale: 0.8 };
          break;
        case 'slideInLeft':
          animationConfig = { opacity: 0, x: -50 };
          break;
        case 'slideInRight':
          animationConfig = { opacity: 0, x: 50 };
          break;
        case 'rotateIn':
          animationConfig = { opacity: 0, rotate: -10, scale: 0.8 };
          break;
        default:
          animationConfig = { opacity: 0, y: 20 };
      }

      gsap.fromTo(ref.current, 
        animationConfig,
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger,
            start,
            end,
            toggleActions
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === ref.current) {
          trigger.kill();
        }
      });
    };
  }, [options]);

  return ref;
}

// Hook for timeline animations
export function useTimeline() {
  const timeline = useRef(gsap.timeline());

  useEffect(() => {
    return () => {
      timeline.current.kill();
    };
  }, []);

  return timeline.current;
}
