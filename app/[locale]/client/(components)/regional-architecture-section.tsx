import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './regional-architecture-section.module.css';
import { withBasePath } from '@/services/commonService';
import { IntroduceImage } from '@/models/introduce-image';
import { useLocale } from 'next-intl';

const RegionalArchitectureSection = ({ images = [] }: { images?: IntroduceImage[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<any>(null);
  const locale = useLocale();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => { carouselRef.current?.next(); };
  const prev = () => { carouselRef.current?.prev(); };

  const dataToRender = images
    .filter(img => img.imageUrl)
    .map(img => ({
      url: img.imageUrl as string,
      title: locale === 'en' ? img.titleEn : img.titleVi,
      description: locale === 'en' ? img.descriptionEn : img.descriptionVi,
    }));

  if (dataToRender.length === 0) return null;

  return (
    <section id="regional-architecture" className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} global-title`}>
          {locale === 'en' ? 'REGIONAL ARCHITECTURE' : 'KIẾN TRÚC KHU VỰC'}
        </h2>

        <div className={styles.carouselWrapper}>
          {!isMobile && (
            <button className={styles.prevArrow} onClick={prev} aria-label="Hình trước">
              <ArrowLeftOutlined />
            </button>
          )}

          <Carousel ref={carouselRef} dots={isMobile} infinite draggable={isMobile} swipe={isMobile}>
            {dataToRender.map((item, idx) => {
              const url = item.url as string;
              const isExternal = url.startsWith('http') || url.startsWith('blob:');
              const imgSrc = isExternal ? url : withBasePath(url);

              return (
                <div key={idx} className={styles.carouselSlide}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={imgSrc}
                      alt={item.title || `Kiến trúc khu vực - ${idx + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      className={styles.slideImage}
                      unoptimized={isExternal}
                      sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1440px"
                    />
                    <div className={styles.overlay}>
                      <h3 className={styles.overlayTitle}>{item.title}</h3>
                      <p className={styles.overlayDesc}>{item.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </Carousel>

          {!isMobile && (
            <button className={styles.nextArrow} onClick={next} aria-label="Hình tiếp theo">
              <ArrowRightOutlined />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegionalArchitectureSection;
