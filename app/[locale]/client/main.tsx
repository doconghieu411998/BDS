import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './main.module.css';
import IntroSection from './(components)/intro-section';
import OverviewSection from './(components)/overview-section';
import LocationSection from './(components)/location-section';
import HighlightSection from './(components)/highlight-section';
import PinSpace from './(components)/pin-space-section';
import NewsSection from './(components)/news-section';
import { withBasePath } from '@/services/commonService';
import FloorDetail from './(components)/floor-detail';
import RegionalArchitectureSection from './(components)/regional-architecture-section';
import ConsultationPopup from './(components)/consultation-popup';
import VideoHeroSection from './(components)/video-hero-section';
import DesignSamplesSection from './(components)/design-samples-section';
import OutstandingArchitectureSection from './(components)/outstanding-architecture-section';
import { useTranslations } from 'next-intl';
import { HOME_KEYS } from '@/constants/localeKeys';
import { getAllIntroduceImages, filterImagesByType } from '@/api/introduceImageApiService';
import { IntroduceImage, IntroduceImageType } from '@/models/introduce-image';

const HERO_BG = "images/home.png";

export default function Main() {
  const t = useTranslations()
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allImages, setAllImages] = useState<IntroduceImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getAllIntroduceImages();
        data.sort((a, b) => a.id - b.id);
        setAllImages(data);
      } catch (err) {
        console.error("Failed to load introduce images:", err);
      }
    };
    fetchImages();
  }, []);

  const utilityImages = filterImagesByType(allImages, IntroduceImageType.CAROUSEL_UTILITY);
  const regionalImages = filterImagesByType(allImages, IntroduceImageType.CAROUSEL_SHOWHOUSE);
  const floorImages = filterImagesByType(allImages, IntroduceImageType.MAP_POINT);
  const designImages = allImages.filter(img => 
    img.type === IntroduceImageType.VILLA || 
    img.type === IntroduceImageType.ACCOMMODATION || 
    img.type === IntroduceImageType.EAST_COAST_VILLA
  );

  return (
    <main className={styles.main}>
      <ConsultationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      <section className={styles.mainSection}>

        <div className={styles.bgWrap}>
          <Image
            src={withBasePath(HERO_BG)}
            alt="Phối cảnh dự án Masteri Trinity Square"
            fill
            style={{ objectFit: 'cover' }}
            quality={90}
            priority
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            {t(HOME_KEYS.HOME_TITLE)}
          </h1>
          <p className={styles.subtitle}>
            {t(HOME_KEYS.HOME_DESCRIPTION)}
          </p>
        </div>

        <button
          className={styles.ctaBtn}
          type="button"
          onClick={() => setIsPopupOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 7H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 17H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ĐĂNG KÝ NHẬN TIN
        </button>
      </section>

      <IntroSection />

      <OverviewSection />

      <LocationSection />

      <VideoHeroSection />

      <FloorDetail images={floorImages} />

      <OutstandingArchitectureSection images={utilityImages} />

      <RegionalArchitectureSection images={regionalImages} />

      <DesignSamplesSection images={designImages} />

      <NewsSection />

    </main>
  );
}