"use client";
import React from 'react';
import styles from './news-section.module.css';
import NewsList from '../(common)/news-list';

const NewsSection = () => {
  return (
    <section id="news-section" className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} global-title`}>TIN TỨC</h2>
        <div className={styles.newsContainer}>
          <NewsList
            limit={4}
            showPagination={false}
            sortByDate={true}
          />
        </div>
      </div>
    </section>
  );
};

export default NewsSection;