"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './vertical-carousel.module.css';
import { withBasePath } from '@/services/commonService';

const BG_ITEMS = [
  "images/banner-1.png",
  "images/banner-2.png",
  "images/banner-3.png",
  "images/banner-4.png",
  "images/banner-5.png",
  "images/banner-6.png",
  "images/banner-7.png"
];

const VerticalCarousel = ({ isActive = false }: { isActive?: boolean }) => {
  const [isDelayedActive, setIsDelayedActive] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isActive) {
      // Delay the carousel start to match the menu expansion (0.8s)
      // This prevents the frame-drop/lag during the initial cyan slide.
      timeoutId = setTimeout(() => {
        setIsDelayedActive(true);
      }, 800);
    } else {
      setIsDelayedActive(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isActive]);

  const LOOP_ITEMS = [...BG_ITEMS, ...BG_ITEMS];

  return (
    <div className={`${styles.container} ${isDelayedActive ? styles.ready : ""}`}>
      {/* The animation track only starts moving when the menu is fully opened and ready */}
      <div className={`${styles.marqueeTrack} ${isDelayedActive ? styles.running : ""}`}>
        {LOOP_ITEMS.map((src, index) => (
          <div key={index} className={styles.slideItem}>
            <Image
              src={withBasePath(src)}
              alt="Architecture"
              fill
              className={styles.bgImage}
              priority={index < 2}
              sizes="50vw"
            />
            <div className={styles.gradientOverlay}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;