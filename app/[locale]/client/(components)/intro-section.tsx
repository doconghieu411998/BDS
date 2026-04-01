import React from 'react';
import Image from 'next/image';
import styles from './intro-section.module.css';
import { withBasePath } from '@/services/commonService';

// URL ảnh từ thiết kế mục tiêu - Hình lâu đài/công trình kiến trúc
const IMG_RIGHT = "images/intro.png";

const IntroSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.headerHighlight}>Giới thiệu</span>
        <span className={styles.headerSeparator}>|</span>
        <span className={styles.headerItem}>Chủ đầu tư</span>
        <span className={styles.headerSeparator}>|</span>
        <span className={styles.headerItem}>Đơn vị quản lý</span>
      </div>

      <div className={styles.wrapper}>
        {/* Khối nội dung xanh - Nền tảng của layout */}
        <div className={styles.blueCard}>
          <div className={styles.decorBg}></div>
          <div className={styles.textContent}>
            <h2 className={`${styles.titleMain} global-title`}>
              CHỦ ĐẦU TƯ
            </h2>
            <p className={`${styles.description} global-text`}>
              Sunshine Group với chiến lược mũi nhọn là đầu tư kinh doanh bất động sản, đã và đang tập trung phát triển hơn 20 dự án hạng sang trên khắp cả nước. Năm 2018, Sunshine Group chính thức chào sân thị trường TP. Hồ Chí Minh với dự án quy mô cực khủng Sunshine City Sài Gòn.
            </p>
          </div>
        </div>

        {/* Khối hình ảnh - Đè sâu vào khối xanh */}
        <div className={styles.imageCard}>
          <div className={styles.imageWrapper}>
            <Image
              src={withBasePath(IMG_RIGHT)}
              alt="Dự án Chủ đầu tư"
              fill
              className={styles.image}
              sizes="(max-width: 992px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
