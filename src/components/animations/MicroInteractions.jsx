import React, { useEffect } from 'react';
import { gsap } from 'gsap';

export default function MicroInteractions() {
  useEffect(() => {
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn, .iconBtn');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          pointer-events: none;
          z-index: 1000;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        gsap.to(ripple, {
          scale: 2,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        });
      });
    });

    // Icon morphing animation
    const icons = document.querySelectorAll('.iconBtn svg');
    
    icons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 'random(-10, 10)',
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Chip hover animations
    const chips = document.querySelectorAll('.chip');
    
    chips.forEach(chip => {
      chip.addEventListener('mouseenter', () => {
        gsap.to(chip, {
          scale: 1.1,
          y: -2,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
      
      chip.addEventListener('mouseleave', () => {
        gsap.to(chip, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.proj');
    
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          boxShadow: '0 20px 60px rgba(110, 168, 254, 0.2)',
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 10px 40px rgba(0,0,0,.35)',
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });

    // Cursor following effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(110, 168, 254, 0.8), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hide default cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .iconBtn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'radial-gradient(circle, rgba(179, 136, 255, 0.8), transparent)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'radial-gradient(circle, rgba(110, 168, 254, 0.8), transparent)';
      });
    });

    return () => {
      cursor.remove();
    };
  }, []);

  return null;
}
