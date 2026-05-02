import React from 'react';
import Image from 'next/image';
import styles from './footer.module.css';
import { FacebookFilled, YoutubeFilled, LinkedinFilled } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { COMMON_KEYS, FOOTER_KEYS } from '@/constants/localeKeys';

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className={styles.footer}>
      {/* Main Content Section */}
      <div className={styles.contentContainer}>
        <div className={styles.mainGrid}>
          {/* Logo Area */}
          <div className={styles.logoCol}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <Image
                  src="/images/logo-preloading.png"
                  alt={t(FOOTER_KEYS.HOME_FOOTER_ALT_LOGO)}
                  width={200}
                  height={80}
                  className={styles.footerLogoImg}
                />
              </div>
            </div>
          </div>

          {/* Location Area */}
          <div className={styles.infoCol}>
            <h4 className={styles.heading}>{t(FOOTER_KEYS.HOME_FOOTER_LOCATION)}</h4>
            <p className={styles.text}>{t(FOOTER_KEYS.HOME_FOOTER_LOCATION_DESCRIPTION)}</p>
          </div>

          {/* Contact Area */}
          <div className={styles.infoCol}>
            <h4 className={styles.heading}>{t(FOOTER_KEYS.HOME_FOOTER_CONTACT)}</h4>
            <p className={styles.text}>{t(FOOTER_KEYS.HOME_FOOTER_CONTACT_EMAIL)}</p>
            <p className={styles.text}>{t(FOOTER_KEYS.HOME_FOOTER_CONTACT_PHONE_NUMBER)}</p>
          </div>

          {/* Social Connect Area */}
          <div className={styles.infoCol}>
            <h4 className={styles.heading}>{t(FOOTER_KEYS.HOME_FOOTER_SOCIAL)}</h4>
            <div className={styles.socialIcons}>
              <a href={t(COMMON_KEYS.HOME_CONTACT_FACEBOOK_LINK)} className={styles.iconCircle}><FacebookFilled /></a>
              <a href={t(COMMON_KEYS.HOME_CONTACT_YOUTUBE_LINK)} className={styles.iconCircle}><YoutubeFilled /></a>
              <a href={t(COMMON_KEYS.HOME_CONTACT_LINKEDIN_LINK)} className={styles.iconCircle}><LinkedinFilled /></a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Section */}
        <div className={styles.legalGrid}>
          <div className={styles.legalText}>
            {t(FOOTER_KEYS.HOME_FOOTER_LEG_1)}
          </div>
          <div className={styles.legalText}>
            {t(FOOTER_KEYS.HOME_FOOTER_LEG_2)}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;