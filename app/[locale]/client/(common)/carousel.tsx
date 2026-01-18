"use client";
import { useState, useRef } from 'react';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import styles from './carousel.module.css';

const BG_ITEMS = [
  "images/location-bg-1.png",
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

const CarouselCommon = () => {
  const [activeBg, setActiveBg] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);

  const handleCardClick = (index: number) => {
    setActiveBg(index);
    carouselRef.current?.goTo(index); // Thêm dòng này nếu muốn click card thì slide cũng chạy tới đó
  };

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.bgContainer}>
        {BG_ITEMS.map((bg, index) => (
          <div 
            key={index}
            className={`${styles.bgLayer} ${activeBg === index ? styles.bgActive : ''}`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        <div className={styles.darkOverlay} />
      </div>

      <div className={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
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
  );
};

export default CarouselCommon;