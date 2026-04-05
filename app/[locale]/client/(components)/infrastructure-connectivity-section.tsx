"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import { withBasePath } from '@/services/commonService';
import styles from './infrastructure-connectivity-section.module.css';

const InfrastructureConnectivitySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const MAP_IMG = "images/ha-tang-da-ket-noi.png";

  const connectivityItems = [
    {
      time: "20",
      unit: "Phút",
      title: "TO QUY NHON CITY CENTER",
      image: "images/city-center.png",
    },
    {
      time: "35",
      unit: "Phút",
      title: "TO PHU CAT AIRPORT",
      image: "images/airport.png",
    },
    {
      time: "05",
      unit: "Phút",
      title: "TO QUY HOA BEACH",
      image: "images/quy-hoa.png",
    },
    {
      time: "15",
      unit: "Phút",
      title: "TO BAI TRUNG – GHENH RANG",
      image: "images/bai-trung.png",
    },
    {
      time: "05",
      unit: "Phút",
      title: "TO BAI XEP BEACH",
      image: "images/bai-xep.png",
    },
  ];

  return (
    <section id="infrastructure-section" className={styles.section}>
      <div className={styles.mapBackground}>
        <Image
          src={withBasePath(MAP_IMG)}
          alt="Infrastructure Map"
          fill
          style={{ objectFit: 'cover', objectPosition: 'right center' }}
          priority
        />
      </div>

      <div className={styles.container}>
        {/* Top Part: Text */}
        <div className={styles.topContent}>
          <div className={styles.textSide}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.label}>HẠ TẦNG</h2>
              <h1 className={styles.mainTitle}>ĐA KẾT NỐI</h1>
            </div>
            <p className={styles.description}>
              The Hera Resort Quy Nhơn sở hữu vị trí kết nối thuận tiện khi tọa lạc ngay trên trục Quốc lộ 1D, liền kề bờ biển Ghềnh Ráng thơ mộng. Từ dự án, chỉ mất khoảng 10 phút di chuyển (khoảng 10km) để đến trung tâm thành phố Quy Nhơn và 35–40 phút để kết nối tới sân bay Phù Cát, đảm bảo khả năng tiếp cận nhanh chóng cho cả du khách nội địa lẫn quốc tế. Đặc biệt, khu vực xung quanh còn hội tụ nhiều bãi biển đẹp như Quy Hòa, Bãi Xếp, Bãi Rạng, tạo nên hệ sinh thái du lịch đa dạng và gia tăng giá trị nghỉ dưỡng cho toàn khu.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <Carousel
          slidesToShow={3}
          slidesToScroll={1}
          dots={false}
          infinite={true}
          draggable
          autoplay={true}
          autoplaySpeed={4000}
          speed={10000}
          cssEase="linear"
          pauseOnHover={false}
          pauseOnFocus={false}
          swipe={false}
          variableWidth={true}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]}
          className={styles.carousel}
        >
          {connectivityItems.map((item, index) => (
            <div
              key={index}
              className={styles.carouselItemContainer}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`${styles.carouselCard} ${hoveredIndex === index ? styles.cardHovered : ''}`}>
                {/* Background Image on Hover */}
                <div className={`${styles.cardBg} ${hoveredIndex === index ? styles.bgVisible : ''}`}>
                  {item.image ? (
                    <Image
                      src={withBasePath(item.image)}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={index <= 2}
                    />
                  ) : (
                    <Image
                      src={withBasePath("images/city-center.png")} /* Default placeholder */
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>

                <div className={`${styles.cardContent} ${hoveredIndex === index ? styles.contentHovered : ''}`}>
                  <div className={styles.timeWrapper}>
                    <span className={styles.timeValue}>{item.time}</span>
                    <span className={styles.timeUnit}>{item.unit}</span>
                  </div>

                  <div className={styles.cardFooter}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <div className={styles.pinIcon}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="19.25" stroke="white" strokeWidth="1.5" />
                        <path d="M20 26C23.3137 26 26 23.3137 26 20C26 16.6863 23.3137 14 20 14C16.6863 14 14 16.6863 14 20C14 23.3137 16.6863 26 20 26Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default InfrastructureConnectivitySection;
