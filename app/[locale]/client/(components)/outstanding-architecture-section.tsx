"use client";
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './outstanding-architecture-section.module.css';
import { withBasePath } from '@/services/commonService';
import { IntroduceImage } from '@/models/introduce-image';
import { useLocale } from 'next-intl';
import { ARCHITECTURE_KEYS } from '@/constants/localeKeys';
import { useTranslations } from 'next-intl';

const OutstandingArchitectureSection = ({ images }: { images: IntroduceImage[] }) => {
  const t = useTranslations();
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

  const handleCardClick = (idx: number) => {
    setActiveIndex(idx);
    carouselRef.current?.goTo(idx, false);
  };

  if (!images || images.length === 0) return null;

  const activeItem = images[activeIndex] || images[0];
  const activeTitle = locale === 'en' ? activeItem.titleEn : activeItem.titleVi;
  const activeDescription = locale === 'en' ? activeItem.descriptionEn : activeItem.descriptionVi;
  const activeImageUrl = activeItem.imageUrl || '';

  return (
    <section id="curated-anemities" className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} global-title`}>
          {t(ARCHITECTURE_KEYS.HOME_ARCHITECTURE_TITLE_MAIN)}
        </h2>

        {isMobile ? (
          /* Mobile View: Single Slider - Manual Touch/Swipe */
          <div className={styles.mobileCarouselWrapper}>
            <Carousel
              ref={carouselRef}
              infinite
              arrows={false}
              draggable
              swipe
              autoplay
              autoplaySpeed={4000}
              beforeChange={(current, next) => {
                setActiveIndex(next);
              }}
              className={styles.mobileCarousel}
            >
              {images.map((item, idx) => {
                const imgStr = item.imageUrl || '';
                const isExternal = imgStr.startsWith('http') || imgStr.startsWith('blob:');
                const imgSrc = isExternal ? imgStr : withBasePath(imgStr);
                const title = locale === 'en' ? item.titleEn : item.titleVi;
                const desc = locale === 'en' ? item.descriptionEn : item.descriptionVi;

                return (
                  <div key={item.id} className={styles.mobileSlide}>
                    <div className={styles.mobileCard}>
                      <Image
                        src={imgSrc}
                        alt={title || 'Tiện ích'}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized={isExternal}
                        className={styles.mobileImg}
                      />
                      <div className={styles.mobileOverlay}>
                        <h3 className={styles.mobileTitle}>{title}</h3>
                        <p className={styles.mobileDesc}>{desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        ) : (
          /* Desktop View: Existing List + Main Preview */
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
                slidesToShow={Math.min(3, images.length)}
                slidesToScroll={1}
                infinite
                beforeChange={(current, next) => setActiveIndex(next)}
                className={styles.carousel}
              >
                {images.map((item, idx) => {
                  const imgStr = item.imageUrl || '';
                  const isExternal = imgStr.startsWith('http') || imgStr.startsWith('blob:');
                  const imgSrc = isExternal ? imgStr : withBasePath(imgStr);
                  const isActive = activeIndex === idx;
                  const title = locale === 'en' ? item.titleEn : item.titleVi;

                  return (
                    <div key={item.id} className={styles.thumbnailWrapper} onClick={() => handleCardClick(idx)}>
                      <div className={`${styles.thumbnailCard} ${isActive ? styles.thumbnailActive : ''}`}>
                        <Image
                          src={imgSrc}
                          alt={title || 'Tiện ích'}
                          fill
                          style={{ objectFit: 'cover' }}
                          unoptimized={isExternal}
                        />
                        <div className={`${styles.thumbnailTitleOverlay} ${isActive ? styles.thumbTitleActive : ''}`}>
                          <span className={styles.thumbTitleText}>{title}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>

            <div className={styles.rightCol}>
              <div className={styles.mainImageCard}>
                <Image
                  src={activeImageUrl.startsWith('http') || activeImageUrl.startsWith('blob:') ? activeImageUrl : withBasePath(activeImageUrl)}
                  alt={activeTitle || 'Tiện ích'}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized={activeImageUrl.startsWith('http') || activeImageUrl.startsWith('blob:')}
                  className={styles.mainImage}
                />
                <div className={styles.overlay}>
                  <p className={styles.overlayDesc}>{activeDescription}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OutstandingArchitectureSection;
