"use client";

import React, { ReactNode, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Listen for preloader finish to refresh animations
    const handlePreloaderFinished = () => {
      setPreloaderFinished(true);
    };
    window.addEventListener("preloaderFinished", handlePreloaderFinished);

    // Safety fallback: if it's still hidden after 7 seconds, force show it.
    // This handles cases where IntersectionObserver fails or gets stuck.
    const safetyTimer = setTimeout(() => {
      setForceShow(true);
    }, 7000);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("preloaderFinished", handlePreloaderFinished);
      clearTimeout(safetyTimer);
    };
  }, []);

  // SSR and Hydration safety: Show content without animation initially to prevent flickering or being stuck hidden
  if (!hasMounted) {
    return (
      <div className={className} style={{ opacity: 1 }}>
        {children}
      </div>
    );
  }

  // If the user prefers reduced motion or is on mobile, we disable animations
  if (shouldReduceMotion || isMobile) {
    return (
      <div 
        className={className}
        style={{ opacity: 1, transform: 'none' }}
      >
        {children}
      </div>
    );
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
      key={preloaderFinished ? "ready" : "waiting"}
      initial={forceShow ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ 
        once, 
        amount: 0.1, // Trigger slightly earlier (10% instead of 15%)
        margin: "0px 0px -20px 0px" // Trigger slightly before it enters
      }}
      variants={variants}
      animate={forceShow ? "visible" : undefined}
      className={className}
      style={{ overflow: "visible" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
