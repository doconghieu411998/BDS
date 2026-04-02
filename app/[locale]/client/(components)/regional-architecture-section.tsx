import React, { useRef } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './regional-architecture-section.module.css';
import { withBasePath } from '@/services/commonService';

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1542314831-c6a4d14fff88?w=1400&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?w=1400&q=80',
];

const RegionalArchitectureSection = () => {
  const carouselRef = useRef<any>(null);

  const next = () => {
    carouselRef.current?.next();
  };

  const prev = () => {
    carouselRef.current?.prev();
  };

  return (
    <section id="regional-architecture" className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} global-title`}>KIẾN TRÚC KHU VỰC</h2>

        <div className={styles.carouselWrapper}>
          <button className={styles.prevArrow} onClick={prev} aria-label="Hình trước">
            <ArrowLeftOutlined />
          </button>

          <Carousel ref={carouselRef} dots={false}>
            {MOCK_IMAGES.map((url, idx) => {
              const isExternal = url.startsWith('http');
              const imgSrc = isExternal ? url : withBasePath(url);

              return (
                <div key={idx} className={styles.carouselSlide}>
                  <Image
                    src={imgSrc}
                    alt={`Kiến trúc khu vực - ${idx + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className={styles.slideImage}
                    unoptimized={isExternal}
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1440px"
                  />
                </div>
              )
            })}
          </Carousel>

          <button className={styles.nextArrow} onClick={next} aria-label="Hình tiếp theo">
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegionalArchitectureSection;
