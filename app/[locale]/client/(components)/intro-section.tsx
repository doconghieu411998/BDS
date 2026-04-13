import React, { useState } from 'react';
import Image from 'next/image';
import styles from './intro-section.module.css';
import { withBasePath } from '@/services/commonService';
import { useTranslations } from 'next-intl';
import { INTRO_KEYS } from '@/constants/localeKeys';
import { motion, AnimatePresence } from 'framer-motion';

const IntroSection = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<'INTRO' | 'INVESTOR' | 'DEVELOPER' | 'MANAGER'>('INTRO');

  const CONTENT = {
    INTRO: {
      title: t(INTRO_KEYS.HOME_INTRO_TITLE_INTRO),
      subtitle: t(INTRO_KEYS.HOME_INTRO_TITLE_INTRO_SUB),
      tagline: t(INTRO_KEYS.HOME_INTRO_TAGLINE_INTRO),
      description: [
        t(INTRO_KEYS.HOME_INTRO_DESCRIPTION_1),
        t(INTRO_KEYS.HOME_INTRO_DESCRIPTION_2)
      ],
      image: "images/intro.png"
    },
    INVESTOR: {
      title: t(INTRO_KEYS.HOME_INTRO_TITLE_INVESTOR),
      subtitle: t(INTRO_KEYS.HOME_INTRO_TITLE_INVESTOR_SUB),
      tagline: "",
      description: [
        t(INTRO_KEYS.HOME_INTRO_DESCRIPTION_INVESTOR)
      ],
      image: "images/investor_bg.png"
    },
    DEVELOPER: {
      title: t(INTRO_KEYS.HOME_INTRO_TITLE_DEVELOPER),
      subtitle: "",
      tagline: "",
      description: [
        t(INTRO_KEYS.HOME_INTRO_DESCRIPTION_DEVELOPER)
      ],
      image: "images/intro-developer.png"
    },
    MANAGER: {
      title: t(INTRO_KEYS.HOME_INTRO_TITLE_MANAGER),
      subtitle: "",
      tagline: t(INTRO_KEYS.HOME_INTRO_TAGLINE_MANAGER),
      description: [
        t(INTRO_KEYS.HOME_INTRO_DESCRIPTION_MANAGER)
      ],
      image: "images/intro.png"
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
          className={`${styles.headerItem} ${activeTab === 'DEVELOPER' ? styles.active : ''}`}
          onClick={() => setActiveTab('DEVELOPER')}
        >
          {t(INTRO_KEYS.HOME_INTRO_TAB_DEVELOPER)}
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className={styles.textContent}
            >
              <h2 className={`${styles.titleMain} global-title`}>
                <div className={styles.mainLine}>{current.title}</div>
                {current.subtitle && (
                  <div className={activeTab === 'INTRO' ? styles.subLineIntro : styles.subLineInvestor}>{current.subtitle}</div>
                )}
              </h2>
              <div className={styles.contentBottom}>
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
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.imageCard}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.imageWrapper}
            >
              <Image
                src={withBasePath(current.image)}
                alt={current.title}
                fill
                className={styles.image}
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
