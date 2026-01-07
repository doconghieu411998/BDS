import React from 'react';
import Image from 'next/image';
import styles from './highlight-section.module.css';

const IMG_ARCH = "https://placehold.co/1000x600/4a3a35/white?text=Kien+Truc+Masteri";

const HighlightSection = () => {
  return (
    <section className={styles.container}>
      {/* Phần tiêu đề số 3 lớn */}
      <div className={styles.header}>
        <span className={styles.bigNumber}>3</span>
        <div className={styles.titleGroup}>
          <p className={styles.subTitle}>PHONG CÁCH HỘI TỤ</p>
          <h2 className={styles.mainTitle}>KIẾN TẠO CỘNG ĐỒNG MASTERI</h2>
        </div>
      </div>

      {/* Phần quan trọng: Ảnh đè lên Background cam */}
      <div className={styles.highlightContent}>
        <div className={styles.orangeBg}>
          <div className={styles.archText}>
            <h3>CẢM HỨNG THIẾT KẾ KIẾN TRÚC</h3>
            <p>Kiến trúc của Masteri Trinity Square hòa quyện giữa vẻ đẹp hiện đại và những đường nét tinh tế...</p>
            {/* Thêm các đoạn text nhỏ hơn nếu cần giống ảnh */}
          </div>
        </div>
        
        <div className={styles.imageWrapper}>
          <Image 
            src={IMG_ARCH} 
            alt="Kiến trúc Masteri Trinity Square" 
            width={900} 
            height={500} 
            className={styles.mainImage}
          />
        </div>
      </div>

      {/* Grid 3 cột ở dưới cùng */}
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