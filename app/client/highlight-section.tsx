"use client";

import React, { useRef, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from './highlight-section.module.css';
import gsap from 'gsap';

// ID định danh cho 2 thẻ
const CARD_IDS = {
  IMAGE: 'card-image',
  TEXT: 'card-text'
};

const HighlightSection = () => {
  // Mặc định thẻ IMAGE nằm trên (active)
  const [activeCard, setActiveCard] = useState(CARD_IDS.IMAGE);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Logic Animation: Duyệt qua cả 2 thẻ để set trạng thái
      [CARD_IDS.IMAGE, CARD_IDS.TEXT].forEach((id) => {
        const isActive = id === activeCard;
        const selector = `.${id}`; // Class name tương ứng

        gsap.to(selector, {
          // Thẻ active thì zIndex cao (10), thẻ chìm thì thấp (1)
          zIndex: isActive ? 10 : 1,
          
          // Thẻ active giữ nguyên tỉ lệ, thẻ chìm nhỏ đi xíu tạo chiều sâu
          scale: isActive ? 1 : 0.95,
          
          // Thẻ chìm thì tối đi một chút
          filter: isActive ? 'brightness(100%)' : 'brightness(65%)',
          
          // Animation mượt mà
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeCard]); // Chạy lại khi activeCard thay đổi

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.bigNumber}>3</span>
        <div className={styles.titleGroup}>
          <p className={styles.subTitle}>PHONG CÁCH HỘI TỤ</p>
          <h2 className={styles.mainTitle}>KIẾN TẠO CỘNG ĐỒNG MASTERI</h2>
        </div>
      </div>

      {/* Wrapper chứa 2 thẻ chéo nhau */}
      <div className={styles.highlightContent} ref={containerRef}>
        
        {/* 1. THẺ ẢNH (Bên Trái/Trên) */}
        <div 
          className={`${styles.cardBase} ${styles.imageCard} ${CARD_IDS.IMAGE}`}
          onClick={() => setActiveCard(CARD_IDS.IMAGE)}
        >
          {/* Text trang trí trên ảnh (nếu cần giống mẫu) */}
          <div className={styles.imageOverlayText}>
            <h3>Kien Truc Masteri</h3>
          </div>
        </div>

        {/* 2. THẺ TEXT (Bên Phải/Dưới - Màu Vàng) */}
        <div 
          className={`${styles.cardBase} ${styles.textCard} ${CARD_IDS.TEXT}`}
          onClick={() => setActiveCard(CARD_IDS.TEXT)}
        >
          <div className={styles.textContent}>
            <h3 className={styles.textTitle}>CẢM HỨNG THIẾT KẾ KIẾN TRÚC</h3>
            <div className={styles.divider}></div>
            <p className={styles.textDesc}>
              Kiến trúc của Masteri Trinity Square hòa quyện giữa vẻ đẹp hiện đại và những đường nét tinh tế. 
              Mặt đứng của các tòa nhà được định hình bởi những đường nét thanh thoát và mạnh mẽ, 
              lấy cảm hứng từ những dấu ấn kiến trúc văn hóa và lịch sử.
            </p>
          </div>
        </div>

      </div>

      {/* Grid dưới giữ nguyên */}
      <div className={styles.bottomGrid}>
        <h3 className={styles.gridHeading}>CẢM HỨNG THIẾT KẾ CẢNH QUAN</h3>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
             <h4>SOUTHERN SQUARE</h4>
             <p className={styles.tagline}>TRỌN NHỊP SỐNG NĂNG ĐỘNG</p>
             <p className={styles.desc}>Phân khu Southern Square mang đến không gian sống lý tưởng...</p>
          </div>
          <div className={styles.gridItem}>
             <h4>CENTRAL SQUARE</h4>
             <p className={styles.tagline}>KẾT NỐI ĐA PHONG CÁCH</p>
             <p className={styles.desc}>Lấy cảm hứng từ những thảm cỏ xanh mát mắt...</p>
          </div>
          <div className={styles.gridItem}>
             <h4>NORTHERN SQUARE</h4>
             <p className={styles.tagline}>CÂN BẰNG VỚI THIÊN NHIÊN</p>
             <p className={styles.desc}>Thiết kế của Northern Square hướng đến sự giao hòa...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;