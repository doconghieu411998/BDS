"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './main.module.css';
import IntroSection from './(components)/intro-section';
import OverviewSection from './(components)/overview-section';
import InfrastructureConnectivitySection from './(components)/infrastructure-connectivity-section';
import NewsSection from './(components)/news-section';
import { withBasePath } from '@/services/commonService';
import FloorDetail from './(components)/floor-detail';
import RegionalArchitectureSection from './(components)/regional-architecture-section';
import ConsultationPopup from './(components)/consultation-popup';
import VideoHeroSection from './(components)/video-hero-section';
import DesignSamplesSection from './(components)/design-samples-section';
import OutstandingArchitectureSection from './(components)/outstanding-architecture-section';
import ScrollReveal from './(common)/ScrollReveal';
import { useLocale, useTranslations } from 'next-intl';
import { HOME_KEYS } from '@/constants/localeKeys';
import LanguageSwitcher from './(components)/language-switcher';
import { FileTextOutlined } from '@ant-design/icons';
import { SESSION_KEYS } from '@/constants/help';
import { getAllIntroduceImages, filterImagesByType } from '@/api/introduceImageApiService';
import { IntroduceImage, IntroduceImageType } from '@/models/introduce-image';
import { AnimatePresence, motion } from 'framer-motion';

const HOME_IMAGES = [
  "images/home_bg_1.png",
  "images/home_bg_2.png",
  "images/home_bg_3.png",
  "images/home_bg_4.png",
  "images/home_bg_5.png",
  "images/home_bg_6.png"
];

const SLIDE_DURATION = 3000; // 3 seconds per slide

const FADE_ANIMATION = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
};

export default function Main() {
  const t = useTranslations();
  const locale = useLocale();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allImages, setAllImages] = useState<IntroduceImage[]>([]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [canStartSlideshow, setCanStartSlideshow] = useState(false);

  // Synchronize slideshow with preloader
  useEffect(() => {
    // Since preloader is now home-page specific, we always wait for it to finish
    const handleFinished = () => {
      setCanStartSlideshow(true);
    };
    window.addEventListener('preloaderFinished', handleFinished);
    return () => window.removeEventListener('preloaderFinished', handleFinished);
  }, []);

  useEffect(() => {
    if (!canStartSlideshow) return;
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HOME_IMAGES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [canStartSlideshow]);

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
          <AnimatePresence>
            <motion.div
              key={currentBgIndex}
              initial={FADE_ANIMATION.initial}
              animate={FADE_ANIMATION.animate}
              exit={FADE_ANIMATION.exit}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className={styles.bgImageMotion}
            >
              <Image
                src={withBasePath(HOME_IMAGES[currentBgIndex])}
                alt={t(HOME_KEYS.HOME_TITLE)}
                fill
                style={{ objectFit: 'cover' }}
                quality={90}
                priority={true}
              />
            </motion.div>
          </AnimatePresence>
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            THE HERA RESORT{' '}
            <span className={styles.nowrap}>
              {locale === 'vi' ? 'QUY NHƠN' : 'QUY NHON'}
            </span>
          </h1>
          <p className={styles.subtitle}>
            {t(HOME_KEYS.HOME_DESCRIPTION)}
          </p>

          <button
            className={styles.ctaBtn}
            type="button"
            onClick={() => setIsPopupOpen(true)}
          >
            {t(HOME_KEYS.HOME_BTN_SUBSCRIBE_LABEL)}
          </button>
        </div>

        {/* Preload background images */}
        <div style={{ display: 'none' }} aria-hidden="true">
          {HOME_IMAGES.map((src) => (
            <Image
              key={src}
              src={withBasePath(src)}
              alt="preload"
              width={10}
              height={10}
              priority={true}
            />
          ))}
        </div>

      </section>

      <ScrollReveal direction="up">
        <IntroSection />
      </ScrollReveal>

      <ScrollReveal direction="left">
        <OverviewSection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <VideoHeroSection />
      </ScrollReveal>

      <ScrollReveal direction="right">
        <InfrastructureConnectivitySection />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <FloorDetail images={floorImages} />
      </ScrollReveal>

      <ScrollReveal direction="left">
        <OutstandingArchitectureSection images={utilityImages} />
      </ScrollReveal>

      <ScrollReveal direction="right">
        <RegionalArchitectureSection images={regionalImages} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <DesignSamplesSection images={designImages} />
      </ScrollReveal>

      <ScrollReveal direction="up">
        <NewsSection />
      </ScrollReveal>

    </main>
  );
}