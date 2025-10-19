import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    // Animate project cards on scroll
    gsap.utils.toArray('.project-3d-card').forEach((card, index) => {
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          y: 100,
          rotationY: -15,
          transformOrigin: 'center center'
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Animate tech constellation
    gsap.fromTo('.tech-constellation',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.tech-constellation',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate timeline items
    gsap.utils.toArray('.timeline .card').forEach((item, index) => {
      gsap.fromTo(item,
        { 
          opacity: 0, 
          x: -50,
          rotation: -5
        },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Parallax effect for hero section
    gsap.to('.hero', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Text reveal animations
    gsap.utils.toArray('.h2').forEach((heading) => {
      gsap.fromTo(heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Floating animation for hero elements
    gsap.to('.hero .pill', {
      y: 'random(-10, 10)',
      rotation: 'random(-5, 5)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
}
