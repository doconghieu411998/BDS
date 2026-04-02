"use client";
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import styles from './outstanding-architecture-section.module.css';
import { withBasePath } from '@/services/commonService';

const MOCK_DATA = [
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80',
    title: 'Nhà hàng',
    description: 'Nằm dọc theo đường bờ biển lộng gió, nhà hàng là nơi hội tụ tinh hoa ẩm thực và tinh thần Địa Trung Hải phóng khoáng. Không gian mở đón trọn ánh hoàng hôn, nơi thực khách thưởng thức hải sản tươi ngon và những thực đơn được tuyển chọn tinh tế, trong âm thanh dịu nhẹ của sóng và gió.'
  },
  {
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d14fff88?w=1400&q=80',
    title: 'Tiện ích sinh thái',
    description: 'Hệ sinh thái đa dạng với nhiều mảng xanh, tạo không gian thư giãn tuyệt vời, kết hợp với các khu vườn dạo bộ tạo nên môi trường sống trong lành và gần gũi với thiên nhiên.'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?w=1400&q=80',
    title: 'Bể bơi',
    description: 'Hồ bơi vô cực ngắm trọn toàn cảnh biển lớn tạo cảm giác thư giãn tuyệt đối cho cư dân và du khách tại đây.'
  },
  {
    image: 'images/location-bg-1.png',
    title: 'Khu công viên',
    description: 'Công viên nghệ thuật với các tiểu cảnh độc đáo và đường đi bộ trải dài bóng mát.'
  }
];

const OutstandingArchitectureSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const handleCardClick = (idx: number) => {
    setActiveIndex(idx);
    carouselRef.current?.goTo(idx, false);
  };

  const activeItem = MOCK_DATA[activeIndex] || MOCK_DATA[0];

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} global-title`}>TIỆN ÍCH NỔI BẬT</h2>
        
        <div className={styles.contentContainer}>
          <div className={styles.leftCol}>
            <Carousel
              ref={carouselRef}
              dotPlacement={"left" as any}
              dots={false}
              autoplay
              autoplaySpeed={4000}
              speed={1000}
              draggable
              vertical
              slidesToShow={3}
              slidesToScroll={1}
              infinite
              beforeChange={(current, next) => setActiveIndex(next)}
              className={styles.carousel}
            >
              {MOCK_DATA.map((item, idx) => {
                const isExternal = item.image.startsWith('http');
                const imgSrc = isExternal ? item.image : withBasePath(item.image);
                const isActive = activeIndex === idx;

                return (
                  <div key={idx} className={styles.thumbnailWrapper} onClick={() => handleCardClick(idx)}>
                     <div className={`${styles.thumbnailCard} ${isActive ? styles.thumbnailActive : ''}`}>
                       <Image
                         src={imgSrc}
                         alt={item.title}
                         fill
                         style={{ objectFit: 'cover' }}
                         unoptimized={isExternal}
                       />
                     </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
          
          <div className={styles.rightCol}>
            {activeItem && (
               <div className={styles.mainImageCard}>
                 <Image
                   src={activeItem.image.startsWith('http') ? activeItem.image : withBasePath(activeItem.image)}
                   alt={activeItem.title}
                   fill
                   style={{ objectFit: 'cover' }}
                   unoptimized={activeItem.image.startsWith('http')}
                   className={styles.mainImage}
                 />
                 <div className={styles.overlay}>
                   <h3 className={styles.overlayTitle}>{activeItem.title}</h3>
                   <p className={styles.overlayDesc}>{activeItem.description}</p>
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutstandingArchitectureSection;
