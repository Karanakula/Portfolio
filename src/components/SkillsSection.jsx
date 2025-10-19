import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SkillLogo3D from './3D/SkillLogo3D';

export default function SkillsSection({ techData }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Languages');
  
  // Flatten all skills for 3D grid
  const allSkills = Object.values(techData).flat();
  
  // Create 3D grid positions
  const getGridPositions = (skills, rows = 4, cols = 6) => {
    const positions = [];
    for (let i = 0; i < skills.length; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = (col - (cols - 1) / 2) * 120;
      const y = (row - (rows - 1) / 2) * -120;
      positions.push({ skill: skills[i], x, y, index: i });
    }
    return positions;
  };

  const skillPositions = getGridPositions(allSkills);

  return (
    <section className="skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="skills-header"
        >
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            A comprehensive toolkit spanning languages, frameworks, cloud technologies, and software engineering principles
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="category-filter"
        >
          {Object.keys(techData).map((category, index) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* 3D Skills Grid */}
        <div className="skills-3d-container">
          <div className="skills-3d-grid">
            {skillPositions.map(({ skill, x, y, index }) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0, x: x + 100, y: y + 100 }}
                whileInView={{ opacity: 1, scale: 1, x: x, y: y }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="skill-item"
                style={{ position: 'absolute', left: x, top: y }}
              >
                <SkillLogo3D
                  skill={skill}
                  hovered={hoveredSkill === skill}
                  onHover={setHoveredSkill}
                  onClick={() => {
                    // Add click interaction if needed
                    console.log(`Clicked on ${skill}`);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills by Category (Traditional Grid) */}
        <div className="skills-traditional-grid">
          {Object.entries(techData).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className={`skill-category ${selectedCategory === category ? 'active' : ''}`}
            >
              <h3 className="category-title">{category}</h3>
              <div className="skills-list">
                {skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.2 + skillIndex * 0.05,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className={`skill-chip ${hoveredSkill === skill ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
