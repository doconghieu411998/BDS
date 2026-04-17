'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
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

const SlideContent = ({ images, activeTab, onSwap }: { images: any[], activeTab: string, onSwap: (clickedId: string) => void }) => {

  const [isAnimating, setIsAnimating] = useState(false);

  const handleLocalSwap = (id: string) => {
    setIsAnimating(true);
    onSwap(id);
  };

  return (
    <div className={styles.gridContainer}>
      {images.map((img: any, i: number) => {
        const isMain = i === 0;

        return (
          <motion.div
            layout
            key={img.id}
            className={`${isMain ? styles.mainImageCol : styles.thumbItem} ${!isAnimating && isMain ? styles.active : ''}`}
            onClick={() => !isMain && handleLocalSwap(img.id)}
            style={{ cursor: isMain ? 'default' : 'pointer' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onLayoutAnimationComplete={() => setIsAnimating(false)}
          >
            <Image
              src={img.url}
              alt={img.title || (isMain ? 'Main Image' : 'Thumbnail')}
              fill
              style={{ objectFit: 'cover' }}
              className={styles.slideImage}
              loading="eager"
            />
            {isMain ? (
              <div className={styles.overlay}>
                <h3 className={styles.overlayTitle}>{img.title}</h3>
                <p className={styles.overlayDesc}>{img.description}</p>
              </div>
            ) : (
              <div className={styles.thumbOverlay}>
                <span className={styles.thumbOverlayIcon}>+</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

const DesignSamplesSection = ({ images = [] }: { images?: IntroduceImage[] }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<any>(null);
  const prevTabRef = useRef(activeTab);

  // Grouped state will hold the images for the carousel slides of the active tab
  const [groupedState, setGroupedState] = useState<{ modelName: string; images: any[] }[]>([]);

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

  // Synchronize groupedState when images or activeTab changes
  useEffect(() => {
    const tabData = TABS.find(t => t.id === activeTab);
    if (!tabData) return;

    const filteredImages = images.filter(img => img.type === tabData.typeId && img.imageUrl);

    const mapImage = (img: IntroduceImage) => ({
      id: String(img.id),
      url: img.imageUrl as string,
      title: locale === 'en' ? img.titleEn : img.titleVi,
      description: locale === 'en' ? img.descriptionEn : img.descriptionVi,
      status: img.status,
    });

    let groups: { modelName: string; images: any[] }[] = [];

    if (tabData.typeId === IntroduceImageType.EAST_COAST_VILLA) {
      // For East Coast Villa, we just take all images as one group
      if (filteredImages.length > 0) {
        groups.push({
          modelName: locale === 'en' ? 'East Coast Villas' : 'Villa Bờ Đông',
          images: filteredImages.map(mapImage),
        });
      }
    } else {
      // For Villa and Accommodation, split by status (3 = Song Lập, 4 = Đơn Lập)
      const songLap = filteredImages.filter(img => img.status === 3);
      const donLap = filteredImages.filter(img => img.status === 4);

      if (songLap.length > 0) {
        groups.push({
          modelName: locale === 'en' ? 'Semi-detached' : 'Song Lập',
          images: songLap.map(mapImage),
        });
      }
      if (donLap.length > 0) {
        groups.push({
          modelName: locale === 'en' ? 'Detached' : 'Đơn Lập',
          images: donLap.map(mapImage),
        });
      }
    }

    const isTabChanging = prevTabRef.current !== activeTab;
    prevTabRef.current = activeTab;

    if (isTabChanging || groupedState.length === 0) {
      setGroupedState(groups);
      return;
    }

    // Function to normalize groups for comparison (ignore image order inside groups)
    const normalize = (gs: any[]) =>
      JSON.stringify(gs.map(g => ({
        modelName: g.modelName,
        images: [...g.images].sort((a, b) => a.id.localeCompare(b.id))
      })));

    if (normalize(groupedState) !== normalize(groups)) {
      setGroupedState(groups);
    }
  }, [activeTab, images, locale]);

  const handleGroupSwap = (groupIndex: number, clickedId: string) => {
    setGroupedState(prev => {
      const newGroups = [...prev];
      const groupImages = [...newGroups[groupIndex].images];

      const activeIdx = 0;
      const clickedIdx = groupImages.findIndex(img => img.id === clickedId);
      if (clickedIdx === activeIdx) return prev;

      const temp = groupImages[activeIdx];
      groupImages[activeIdx] = groupImages[clickedIdx];
      groupImages[clickedIdx] = temp;

      newGroups[groupIndex].images = groupImages;
      return newGroups;
    });
  };

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
          {!isMobile && groupedState.length > 1 && (
            <button className={styles.prevArrow} onClick={prev}>
              <LeftOutlined />
            </button>
          )}

          <Carousel ref={carouselRef} dots={isMobile} infinite={groupedState.length > 1} draggable={isMobile} swipe={isMobile}>
            {groupedState.map((group, idx) => (
              <div key={`${activeTab}-${idx}`} className={styles.carouselSlide}>
                <SlideContent
                  images={group.images}
                  activeTab={activeTab}
                  onSwap={(id) => handleGroupSwap(idx, id)}
                />
              </div>
            ))}
          </Carousel>

          {!isMobile && groupedState.length > 1 && (
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
