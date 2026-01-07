"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import styles from './location-section.module.css';

// Ảnh demo
const MAP_IMG = "https://placehold.co/1200x800/f9f5ec/6d4c41?text=Bản+Đồ+Vị+Trí";
const BG_ITEMS = [
  "https://placehold.co/1920x1080/6d4c41/white?text=Hệ+Tiện+Ích+Nội+Khu",
  "https://placehold.co/1920x1080/d19f58/white?text=Đại+Đô+Thị+Ocean+City",
  "https://placehold.co/1920x1080/4a3a35/white?text=Đông+Hà+Nội",
  "https://placehold.co/1920x1080/8b7355/white?text=Tây+Hà+Nội"
];

const CONNECT_DATA = [
  { time: "02", unit: "PHÚT", title: "HỆ TIỆN ÍCH NỘI KHU", subtitle: "OCEAN PARK 2" },
  { time: "05", unit: "PHÚT", title: "HỆ TIỆN ÍCH ĐẠI ĐÔ THỊ", subtitle: "OCEAN CITY" },
  { time: "10", unit: "PHÚT", title: "TÂM ĐIỂM HỘI NHẬP PHÍA", subtitle: "ĐÔNG HÀ NỘI" },
  { time: "20", unit: "PHÚT", title: "TÂM ĐIỂM QUẬN CẦU GIẤY", subtitle: "TÂY HÀ NỘI..." },
  { time: "30", unit: "PHÚT", title: "HỒ HOÀN KIẾM", subtitle: "TRUNG TÂM" },
];

const LocationSection = () => {
  const [activeBg, setActiveBg] = useState(0);

  return (
    <section className={styles.container}>
      {/* 1. Phần Tiêu đề & Bản đồ */}
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
            alt="Vị trí đa kết nối Masteri Trinity Square" 
            width={800} 
            height={500} 
            className={styles.mapImg}
          />
        </div>
      </div>

      {/* 2. Phần Carousel - Đã sửa lỗi Background nằm ngoài */}
      <div className={styles.carouselWrapper}>
        {/* Background Overlay phải nằm TRONG carouselWrapper để bao phủ các Slide */}
        <div 
          className={styles.bgOverlay} 
          style={{ backgroundImage: `url(${BG_ITEMS[activeBg % BG_ITEMS.length]})` }}
        />

        <div className={styles.carouselContainer}>
          <Carousel
            autoplay // Bật tự động chạy
            autoplaySpeed={3000} // Tốc độ 3 giây/slide
            infinite={true} // Chạy vô tận
            slidesToShow={4}
            slidesToScroll={1}
            dots={false}
            arrows={false}
            beforeChange={(current, next) => setActiveBg(next)}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 600, settings: { slidesToShow: 1 } },
            ]}
          >
            {CONNECT_DATA.map((item, index) => (
              <div key={index} className={styles.slideItem}>
                {/* Khi click vào thẻ, background sẽ đổi ngay lập tức */}
                <div 
                  className={`${styles.card} ${activeBg === index ? styles.activeCard : ''}`}
                  onClick={() => setActiveBg(index)}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.timeNum}>{item.time}</span>
                    <span className={styles.timeUnit}>{item.unit}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.cardTitle}>{item.title}</p>
                    <p className={styles.cardSubtitle}>{item.subtitle}</p>
                    <div className={styles.pinIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 21C12 21 17 16 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 16 12 21 12 21Z" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="2" />
                        </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;