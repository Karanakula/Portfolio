import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TextReveal({ children, delay = 0 }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current;
      const words = text.textContent.split(' ');
      
      // Clear the text and wrap each word in a span
      text.innerHTML = words.map(word => `<span style="display: inline-block; opacity: 0; transform: translateY(20px);">${word}</span>`).join(' ');
      
      // Animate each word
      const wordSpans = text.querySelectorAll('span');
      
      gsap.to(wordSpans, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        delay: delay,
        ease: 'power2.out'
      });
    }
  }, [delay]);

  return <span ref={textRef}>{children}</span>;
}
