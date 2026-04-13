"use client"

import React, { useState, useEffect } from 'react';
import styles from './floating-actions.module.css';
import LanguageSwitcher from './language-switcher';
import { FileTextOutlined } from '@ant-design/icons';
import ConsultationPopup from './consultation-popup';
import { useTranslations } from 'next-intl';
import { COMMON_KEYS, HOME_KEYS } from '@/constants/localeKeys';

const FloatingActions = () => {
  const t = useTranslations();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleOpenPopup = () => setIsPopupOpen(true);
    window.addEventListener('open-consultation-popup', handleOpenPopup);
    return () => window.removeEventListener('open-consultation-popup', handleOpenPopup);
  }, []);

  return (
    <>
      <div className={styles.container}>
        {/* Social Buttons - Desktop & Mobile */}
        <a
          href={t(COMMON_KEYS.HOME_CONTACT_ZALO_LINK)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.zalo}`}
          aria-label="Contact via Zalo"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path d="M22.188 12.001c0 4.188-4.561 7.583-10.188 7.583-1.099 0-2.152-.13-3.136-.371L3.5 21.5c-.322.215-.742-.016-.742-.4v-4.493C1.65 15.228 1 13.682 1 12.001 1 7.813 5.56 4.418 11.188 4.418S22.188 7.813 22.188 12.001z" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Z</text>
          </svg>
        </a>

        <a
          href={t(COMMON_KEYS.HOME_CONTACT_FACEBOOK_LINK)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.facebook}`}
          aria-label="Contact via Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        {/* Floating Actions - Mobile Only */}
        <div className={styles.mobileActions}>
          <button
            className={styles.subscribeBtn}
            onClick={() => setIsPopupOpen(true)}
            aria-label={t(HOME_KEYS.HOME_BTN_SUBSCRIBE_LABEL)}
          >
            <FileTextOutlined />
          </button>
          <div className={styles.langWrapper}>
            <LanguageSwitcher isSticky={true} />
          </div>
        </div>
      </div>

      <ConsultationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};

export default FloatingActions;
