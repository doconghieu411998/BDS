'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './design-samples-section.module.css';
import { withBasePath } from '@/services/commonService';
import { IntroduceImage, IntroduceImageType } from '@/models/introduce-image';
import { useTranslations, useLocale } from 'next-intl';
import { DESIGN_KEYS } from '@/constants/localeKeys';

const TABS = [
  { id: 'villa', typeId: IntroduceImageType.VILLA },
  { id: 'nha_luu_tru', typeId: IntroduceImageType.ACCOMMODATION },
  { id: 'villa_bo_dong', typeId: IntroduceImageType.EAST_COAST_VILLA },
];

const DesignSamplesSection = ({ images = [] }: { images?: IntroduceImage[] }) => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id);
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

  const labels: Record<string, string> = {
    villa: t(DESIGN_KEYS.HOME_DESIGN_TAB_VILLA_TITLE),
    nha_luu_tru: t(DESIGN_KEYS.HOME_DESIGN_TAB_STAY_TITLE),
    villa_bo_dong: t(DESIGN_KEYS.HOME_DESIGN_TAB_EAST_TITLE),
  };

  const getImagesForTab = (tabId: string) => {
    const tab = TABS.find(t => t.id === tabId);
    if (!tab) return [];

    return images
      .filter(img => img.type === tab.typeId && img.imageUrl)
      .map(img => ({
        url: img.imageUrl as string,
        title: locale === 'en' ? img.titleEn : img.titleVi,
        description: locale === 'en' ? img.descriptionEn : img.descriptionVi,
      }));
  };

  const currentImages = getImagesForTab(activeTab);
  const activeTabLabel = labels[activeTab] || '';

  const next = () => { carouselRef.current?.next(); };
  const prev = () => { carouselRef.current?.prev(); };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => { carouselRef.current?.goTo(0, true); }, 10);
  };

  return (
    <section id="design-collections" className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} global-title`}>
          {t(DESIGN_KEYS.HOME_DESIGN_TITLE_MAIN)}
        </h2>

        <div className={styles.tabGroup}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {labels[tab.id]}
            </button>
          ))}
        </div>

        <div className={styles.carouselWrapper}>
          {!isMobile && (
            <button className={styles.prevArrow} onClick={prev}>
              <LeftOutlined />
            </button>
          )}

          <Carousel ref={carouselRef} dots={isMobile} infinite draggable={isMobile} swipe={isMobile}>
            {currentImages.map((item, idx) => {
              const isExternal = item.url.startsWith('http') || item.url.startsWith('blob:');
              const imgSrc = isExternal ? item.url : withBasePath(item.url);

              return (
                <div key={`${activeTab}-${idx}`} className={styles.carouselSlide}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={imgSrc}
                      alt={item.title || `${activeTabLabel} - ${idx + 1}`}
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
              );
            })}
          </Carousel>

          {!isMobile && (
            <button className={styles.nextArrow} onClick={next}>
              <RightOutlined />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DesignSamplesSection;
