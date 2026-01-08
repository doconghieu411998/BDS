"use client";

import React, { useState, useRef } from 'react'; // Import thêm useRef
import Image from 'next/image';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel'; // Import type để gợi ý code
import styles from './location-section.module.css';

const MAP_IMG = "https://placehold.co/1200x800/f9f5ec/6d4c41?text=Bản+Đồ+Vị+Trí";
const BG_ITEMS = [
  "images/location-bg-1.png", // Lưu ý: Đảm bảo ảnh đã ở trong public/images
  "images/location-bg-2.png",
  "images/location-bg-3.png",
  "images/location-bg-4.png",
  "images/location-bg-5.png",
  "images/location-bg-6.png"
];

const CONNECT_DATA = [
  { time: "02", unit: "PHÚT", title: "HỆ TIỆN ÍCH NỘI KHU", subtitle: "OCEAN PARK 2" },
  { time: "05", unit: "PHÚT", title: "HỆ TIỆN ÍCH ĐẠI ĐÔ THỊ", subtitle: "OCEAN CITY" },
  { time: "10", unit: "PHÚT", title: "TÂM ĐIỂM HỘI NHẬP PHÍA", subtitle: "ĐÔNG HÀ NỘI" },
  { time: "20", unit: "PHÚT", title: "TÂM ĐIỂM QUẬN CẦU GIẤY", subtitle: "TÂY HÀ NỘI..." },
  { time: "30", unit: "PHÚT", title: "HỒ HOÀN KIẾM", subtitle: "TRUNG TÂM" },
  { time: "60", unit: "PHÚT", title: "NỘI BÀI", subtitle: "SÂN BAY TRUNG TÂM" },
];

const LocationSection = () => {
  const [activeBg, setActiveBg] = useState(0);
  const carouselRef = useRef<CarouselRef>(null); // Tạo Ref để điều khiển Carousel

  // Hàm xử lý click: Chỉ bảo Carousel chạy, không set State trực tiếp
  const handleCardClick = (index: number) => {
    setActiveBg(index);
  };

  return (
    <section className={styles.container}>
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

      <div className={styles.carouselWrapper}>
        <div className={styles.bgContainer}>
          {BG_ITEMS.map((bg, index) => (
            <div 
              key={index}
              className={`${styles.bgLayer} ${activeBg === index ? styles.bgActive : ''}`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
          {/* Lớp phủ đen mờ chung */}
          <div className={styles.darkOverlay} />
        </div>

        <div className={styles.carouselContainer}>
          <Carousel
            ref={carouselRef} // Gắn ref vào đây
            autoplay
            autoplaySpeed={3000}
            speed={1000}
            infinite={true}
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
            {CONNECT_DATA.map((item, index) => {
              const bgIndex = index % BG_ITEMS.length;
              const isActive = activeBg === index;

              return (
                <div key={index} className={styles.slideItem}>
                  <div 
                    style={{ backgroundImage: isActive ? `url(${BG_ITEMS[bgIndex]})` : 'none' }}
                    className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                    onClick={() => handleCardClick(index)}
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
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;