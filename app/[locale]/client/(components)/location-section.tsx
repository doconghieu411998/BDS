"use client";

import React from 'react';
import Image from 'next/image';
import styles from './location-section.module.css';

const MAP_IMG = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=800";

const LocationSection = () => {
  return (
    <section id="location-section" className={styles.container}>
      {/* Phần Top: Text + Map */}
      <div className={styles.topContent}>
        <div className={styles.textSide}>
          <h3 className={styles.label}>HẠ TẦNG</h3>
          <h2 className={styles.mainTitle}>ĐA KẾT NỐI</h2>
          <p className={styles.desc}>
            Nằm trong quần thể Ocean Park 2, tọa độ đáng mơ ước tại Masteri Trinity Square
            mang đến đặc quyền kết nối không giới hạn...
          </p>
        </div>
        <div className={styles.mapSide}>
          <Image
            src={MAP_IMG}
            alt="Map"
            width={800} height={500}
            className={styles.mapImg}
          />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;