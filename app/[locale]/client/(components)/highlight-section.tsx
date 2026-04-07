import React, { useRef, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from './highlight-section.module.css';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import { HIGHLIGHT_KEYS } from '@/constants/localeKeys';

// ID định danh cho 2 thẻ
const CARD_IDS = {
  IMAGE: 'card-image',
  TEXT: 'card-text'
};

const HighlightSection = () => {
  const t = useTranslations();
  // Mặc định thẻ IMAGE nằm trên (active)
  const [activeCard, setActiveCard] = useState(CARD_IDS.IMAGE);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Logic Animation: Duyệt qua cả 2 thẻ để set trạng thái
      [CARD_IDS.IMAGE, CARD_IDS.TEXT].forEach((id) => {
        const isActive = id === activeCard;
        const selector = `.${id}`; // Class name tương ứng

        gsap.to(selector, {
          // Thẻ active thì zIndex cao (10), thẻ chìm thì thấp (1)
          zIndex: isActive ? 10 : 1,

          // Thẻ active giữ nguyên tỉ lệ, thẻ chìm nhỏ đi xíu tạo chiều sâu
          scale: isActive ? 1 : 0.95,

          // Thẻ chìm thì tối đi một chút
          filter: isActive ? 'brightness(100%)' : 'brightness(65%)',

          // Animation mượt mà
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeCard]); // Chạy lại khi activeCard thay đổi

  return (
    <section id="highlight-section" className={styles.container}>
      <div className={styles.header}>
        <span className={styles.bigNumber}>3</span>
        <div className={styles.titleGroup}>
          <p className={styles.subTitle}>{t(HIGHLIGHT_KEYS.TTL_SUB)}</p>
          <h2 className={styles.mainTitle}>{t(HIGHLIGHT_KEYS.TTL_MAIN)}</h2>
        </div>
      </div>

      {/* Wrapper chứa 2 thẻ chéo nhau */}
      <div className={styles.highlightContent} ref={containerRef}>

        {/* 1. THẺ ẢNH (Bên Trái/Trên) */}
        <div
          className={`${styles.cardBase} ${styles.imageCard} ${CARD_IDS.IMAGE}`}
          onClick={() => setActiveCard(CARD_IDS.IMAGE)}
        >
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            alt={t(HIGHLIGHT_KEYS.ALT_ARCH)}
            fill
            className={styles.cardImage}
            sizes="(max-width: 992px) 100vw, 60vw"
          />
          {/* Text trang trí trên ảnh */}
          <div className={styles.imageOverlayText}>
            <h3>{t(HIGHLIGHT_KEYS.TTL_DESIGN)}</h3>
          </div>
        </div>

        {/* 2. THẺ TEXT (Bên Phải/Dưới - Màu Vàng) */}
        <div
          className={`${styles.cardBase} ${styles.textCard} ${CARD_IDS.TEXT}`}
          onClick={() => setActiveCard(CARD_IDS.TEXT)}
        >
          <div className={styles.textContent}>
            <h3 className={styles.textTitle}>{t(HIGHLIGHT_KEYS.TTL_CONCEPT)}</h3>
            <div className={styles.divider}></div>
            <p className={styles.textDesc}>
              {t(HIGHLIGHT_KEYS.DSC_CONCEPT)}
            </p>
          </div>
        </div>

      </div>

      {/* Grid dưới giữ nguyên */}
      <div className={styles.bottomGrid}>
        <h3 className={styles.gridHeading}>{t(HIGHLIGHT_KEYS.TTL_LANDSCAPE)}</h3>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <h4>{t(HIGHLIGHT_KEYS.TTL_SOUTHERN)}</h4>
            <p className={styles.tagline}>{t(HIGHLIGHT_KEYS.TAG_SOUTHERN)}</p>
            <p className={styles.desc}>{t(HIGHLIGHT_KEYS.DSC_SOUTHERN)}</p>
          </div>
          <div className={styles.gridItem}>
            <h4>{t(HIGHLIGHT_KEYS.TTL_CENTRAL)}</h4>
            <p className={styles.tagline}>{t(HIGHLIGHT_KEYS.TAG_CENTRAL)}</p>
            <p className={styles.desc}>{t(HIGHLIGHT_KEYS.DSC_CENTRAL)}</p>
          </div>
          <div className={styles.gridItem}>
            <h4>{t(HIGHLIGHT_KEYS.TTL_NORTHERN)}</h4>
            <p className={styles.tagline}>{t(HIGHLIGHT_KEYS.TAG_NORTHERN)}</p>
            <p className={styles.desc}>{t(HIGHLIGHT_KEYS.DSC_NORTHERN)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;