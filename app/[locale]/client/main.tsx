import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './main.module.css';
import IntroSection from './(components)/intro-section';
import OverviewSection from './(components)/overview-section';
import InfrastructureConnectivitySection from './(components)/infrastructure-connectivity-section';
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

          <button
            className={styles.ctaBtn}
            type="button"
            onClick={() => setIsPopupOpen(true)}
          >
            {t(HOME_KEYS.HEADER_BTN_SUBSCRIBE_LABEL)}
          </button>
        </div>
      </section>

      <IntroSection />

      <OverviewSection />

      <VideoHeroSection />

      <InfrastructureConnectivitySection />

      <FloorDetail images={floorImages} />

      <OutstandingArchitectureSection images={utilityImages} />

      <RegionalArchitectureSection images={regionalImages} />

      <DesignSamplesSection images={designImages} />

      <NewsSection />

    </main>
  );
}