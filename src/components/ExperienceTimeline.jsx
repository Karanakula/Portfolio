import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline({ experience }) {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      
      // Animate the timeline line drawing
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate each timeline item
      items.forEach((item, index) => {
        gsap.fromTo(item,
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
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
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="experience-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="experience-header"
        >
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Leading technical teams and delivering impactful solutions across diverse domains
          </p>
        </motion.div>

        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-line" ref={lineRef}></div>
          
          {experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="timeline-item"
              style={{ 
                '--item-index': index,
                marginLeft: index % 2 === 0 ? '0' : 'auto'
              }}
            >
              <div className="timeline-dot">
                <div className="timeline-dot-inner"></div>
              </div>
              
              <motion.div
                className="timeline-content"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 60px rgba(110, 168, 254, 0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="experience-header-content">
                  <h3 className="experience-title">
                    {exp.role}
                  </h3>
                  <div className="experience-meta">
                    <span className="company-name">{exp.company}</span>
                    <span className="experience-period">{exp.period}</span>
                  </div>
                </div>
                
                <div className="experience-description">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <motion.p
                      key={bulletIndex}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: bulletIndex * 0.1 + index * 0.3 
                      }}
                      className="experience-bullet"
                    >
                      {bullet}
                    </motion.p>
                  ))}
                </div>
                
                <div className="experience-highlights">
                  <div className="highlight-item">
                    <span className="highlight-label">Impact:</span>
                    <span className="highlight-value">
                      {index === 0 ? '60% efficiency gain' : '17% performance boost'}
                    </span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-label">Scale:</span>
                    <span className="highlight-value">
                      {index === 0 ? '1,000+ users' : 'Production ML pipeline'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
