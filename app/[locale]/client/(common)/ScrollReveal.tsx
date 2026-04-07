"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = "",
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If the user prefers reduced motion, we disable the transform animations
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={variants}
      className={className}
      style={{ overflow: "visible" }} // Explicitly allow visible overflow but sections should hide it if needed
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
