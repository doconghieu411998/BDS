"use client";
import React from 'react';
import Image from 'next/image';
import styles from './vertical-carousel.module.css';
import { withBasePath } from '@/services/commonService';

const BG_ITEMS = [
  "images/location-bg-1.png",
  "images/location-bg-2.png",
  "images/location-bg-3.png",
  "images/location-bg-4.png",
  "images/location-bg-5.png",
  "images/location-bg-6.png"
];

const VerticalCarousel = () => {
  // Nhân đôi mảng ảnh để tạo vòng lặp không vết nối
  const LOOP_ITEMS = [...BG_ITEMS, ...BG_ITEMS];

  return (
    <div className={styles.container}>
      {/* Khối này sẽ trôi lên bằng CSS */}
      <div className={styles.marqueeTrack}>
        {LOOP_ITEMS.map((src, index) => (
          <div key={index} className={styles.slideItem}>
            <Image
              src={withBasePath(src)}
              alt="Architecture"
              fill
              className={styles.bgImage}
              priority={index < 2} // Preload vài ảnh đầu
              sizes="50vw"
            />
            {/* Lớp phủ màu */}
            <div className={styles.gradientOverlay}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;