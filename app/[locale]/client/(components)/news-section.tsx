"use client";
import React from 'react';
import styles from './news-section.module.css';
import NewsList from '../(common)/news-list';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { NEWS_KEYS } from '@/constants/localeKeys';

const NewsSection = () => {
  const t = useTranslations();
  return (
    <section id="news-section" className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} global-title`}>{t(NEWS_KEYS.HOME_NEWS_TITLE_MAIN)}</h2>
        <div className={styles.newsContainer}>
          <NewsList
            limit={3}
            showPagination={true}
            sortByDate={true}
          />
        </div>
      </div>
    </section>
  );
};

export default NewsSection;