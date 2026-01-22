"use client";
import { useState, useRef } from 'react';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { ArrowRightOutlined } from '@ant-design/icons'; // Bạn có thể dùng icon của antd hoặc svg tùy ý
import styles from './carousel.module.css';
import { withBasePath } from '@/services/commonService';

// 1. Gộp dữ liệu để dễ quản lý
const CAROUSEL_DATA = [
  {
    image: "images/location-bg-1.png",
    title: "TIỆN ÍCH NỘI KHU",
    description: "Trải nghiệm cuộc sống đẳng cấp ngay thềm nhà tại Ocean Park 2."
  },
  {
    image: "images/location-bg-2.png",
    title: "HỆ SINH THÁI ĐẠI ĐÔ THỊ",
    description: "Kết nối không giới hạn với quần thể tiện ích Ocean City."
  },
  {
    image: "images/location-bg-3.png",
    title: "TÂM ĐIỂM HỘI NHẬP",
    description: "Cửa ngõ giao thương sầm uất phía Đông Hà Nội."
  },
  {
    image: "images/location-bg-4.png",
    title: "KẾT NỐI TRUNG TÂM",
    description: "Di chuyển thuận tiện tới các quận nội thành Cầu Giấy, Hoàn Kiếm."
  },
  {
    image: "images/location-bg-5.png",
    title: "DI SẢN VĂN HÓA",
    description: "Gần kề các địa điểm văn hóa và trung tâm lịch sử."
  },
  {
    image: "images/location-bg-6.png",
    title: "KẾT NỐI QUỐC TẾ",
    description: "Dễ dàng di chuyển tới sân bay quốc tế Nội Bài."
  },
];

interface CarouselCommonProps {
  title?: string;
}

const CarouselCommon: React.FC<CarouselCommonProps> = ({ title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    carouselRef.current?.goTo(index);
  };

  return (
    <div className={styles.carouselWrapper}>
      {/* --- PHẦN BACKGROUND LỚN --- */}
      <div className={styles.bgContainer}>
        {CAROUSEL_DATA.map((item, index) => (
          <div
            key={index}
            className={`${styles.bgLayer} ${activeIndex === index ? styles.bgActive : ''}`}
            style={{ backgroundImage: `url(${withBasePath(item.image)})` }}
          />
        ))}
        <div className={styles.darkOverlay} />
      </div>

      {/* --- PHẦN CAROUSEL CARD --- */}
      <div className={styles.carouselContainer}>
        {title && <h2 className={styles.sectionTitle}>{title}</h2>}
        <Carousel
          ref={carouselRef}
          autoplay
          autoplaySpeed={4000} // Chậm lại chút để người dùng kịp đọc
          speed={800}
          infinite={true}
          slidesToShow={3} // Hiển thị 3 card nhìn sẽ thoáng hơn 4
          slidesToScroll={1}
          dots={false}
          arrows={false}
          beforeChange={(_, next) => setActiveIndex(next)}
          responsive={[
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1, centerMode: true, centerPadding: '20px' } },
          ]}
        >
          {CAROUSEL_DATA.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div key={index} className={styles.slideItem}>
                <div
                  className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                  onClick={() => handleCardClick(index)}
                  style={{ backgroundImage: `url(${withBasePath(item.image)})` }}
                >
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>

                    <div className={styles.cardFooter}>
                      <span className={styles.exploreText}>Khám phá</span>
                      <ArrowRightOutlined className={styles.arrowIcon} />
                    </div>
                  </div>

                  {/* Đường kẻ trang trí khi active */}
                  <div className={styles.activeBar} />
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