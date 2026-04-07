import React, { useState } from 'react';
import Image from 'next/image';
import styles from './intro-section.module.css';
import { withBasePath } from '@/services/commonService';
import { useTranslations } from 'next-intl';
import { INTRO_KEYS } from '@/constants/localeKeys';

const IMG_RIGHT = "images/intro.png";

const IntroSection = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<'INTRO' | 'INVESTOR' | 'MANAGER'>('INTRO');

  const CONTENT = {
    INTRO: {
      title: t(INTRO_KEYS.HOME_INTRO_TITLE_INTRO),
      tagline: t(INTRO_KEYS.HOME_INTRO_TAGLINE_INTRO),
      description: [
        t(INTRO_KEYS.HOME_INTRO_DESCRIPTION_1),
        t(INTRO_KEYS.HOME_INTRO_DESCRIPTION_2)
      ]
    },
    INVESTOR: {
      title: t(INTRO_KEYS.HOME_INTRO_TITLE_INVESTOR),
      tagline: "",
      description: [
        t(INTRO_KEYS.HOME_INTRO_DESCRIPTION_INVESTOR)
      ]
    },
    MANAGER: {
      title: t(INTRO_KEYS.HOME_INTRO_TITLE_MANAGER),
      tagline: t(INTRO_KEYS.HOME_INTRO_TAGLINE_MANAGER),
      description: [
        t(INTRO_KEYS.HOME_INTRO_DESCRIPTION_MANAGER)
      ]
    }
  };

  const current = CONTENT[activeTab];

  return (
    <section id="intro-section" className={styles.section}>
      <div className={styles.sectionHeader}>
        <span
          className={`${styles.headerItem} ${activeTab === 'INTRO' ? styles.active : ''}`}
          onClick={() => setActiveTab('INTRO')}
        >
          {t(INTRO_KEYS.HOME_INTRO_TAB_INTRO)}
        </span>
        <span className={styles.headerSeparator}>|</span>
        <span
          className={`${styles.headerItem} ${activeTab === 'INVESTOR' ? styles.active : ''}`}
          onClick={() => setActiveTab('INVESTOR')}
        >
          {t(INTRO_KEYS.HOME_INTRO_TAB_INVESTOR)}
        </span>
        <span className={styles.headerSeparator}>|</span>
        <span
          className={`${styles.headerItem} ${activeTab === 'MANAGER' ? styles.active : ''}`}
          onClick={() => setActiveTab('MANAGER')}
        >
          {t(INTRO_KEYS.HOME_INTRO_TAB_MANAGER)}
        </span>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.blueCard}>
          <div className={styles.decorBg}></div>
          <div className={styles.textContent}>
            <h2 className={`${styles.titleMain} global-title`}>
              {current.title}
            </h2>
            {current.tagline && (
              <p className={styles.tagline}>{current.tagline}</p>
            )}
            <div className={styles.descriptionWrapper}>
              {current.description.map((p, idx) => (
                <p key={idx} className={`${styles.description} global-text`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.imageCard}>
          <div className={styles.imageWrapper}>
            <Image
              src={withBasePath(IMG_RIGHT)}
              alt={current.title}
              fill
              className={styles.image}
              sizes="(max-width: 992px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
