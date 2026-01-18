"use client";
import React from 'react';
import styles from './news-section.module.css';
import NewsList from '../(common)/news-list';

const NewsSection = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>TIN TỨC</h2>
      <NewsList
        limit={3}
        showPagination={true}
      />
    </section>
  );
};

export default NewsSection;