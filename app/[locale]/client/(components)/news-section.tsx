"use client";
import React from 'react';
import styles from './news-section.module.css';
import NewsList from '../(common)/news-list';

const NewsSection = () => {
  return (
    <section id="news-section" className={styles.container}>
      <h2 className={styles.sectionTitle}>TIN TỨC</h2>
      <NewsList
        limit={4}
        showPagination={false}
        sortByDate={true}
      />
    </section>
  );
};

export default NewsSection;