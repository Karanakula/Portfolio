import React from "react";
import { motion } from "framer-motion";

export default function Reveal({ 
  children, 
  delay = 0, 
  direction = "up",
  distance = 20,
  duration = 0.6,
  type = "default"
}) {
  const variants = {
    default: {
      hidden: { opacity: 0, y: direction === "up" ? distance : direction === "down" ? -distance : 0 },
      visible: { opacity: 1, y: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    slide: {
      hidden: { opacity: 0, x: direction === "left" ? -distance : direction === "right" ? distance : 0 },
      visible: { opacity: 1, x: 0 }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10, scale: 0.8 },
      visible: { opacity: 1, rotate: 0, scale: 1 }
    }
  };

  return (
    <motion.div
      variants={variants[type]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration, 
        ease: [0.25, 0.46, 0.45, 0.94], 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  );
}