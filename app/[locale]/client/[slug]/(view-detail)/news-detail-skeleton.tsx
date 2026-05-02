"use client";
import React from 'react';
import styles from './view-detail.module.css';

export default function NewsDetailSkeleton() {
  return (
    <main className={styles.container}>
      {/* Banner Placeholder */}
      <section className={styles.bannerWrapper}>
        <div className="skeleton-pulse" style={{ width: '100%', height: '100%', backgroundColor: '#eee' }} />
      </section>

      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          {/* Category Badge */}
          <div className="skeleton-pulse" style={{ width: '100px', height: '24px', marginBottom: '1.5rem', borderRadius: '4px' }} />
          
          {/* Title */}
          <div className="skeleton-pulse" style={{ width: '90%', height: '40px', marginBottom: '1rem', borderRadius: '4px' }} />
          <div className="skeleton-pulse" style={{ width: '60%', height: '40px', marginBottom: '2rem', borderRadius: '4px' }} />

          {/* Meta Info */}
          <div className={styles.meta}>
            <div className="skeleton-pulse" style={{ width: '150px', height: '20px', borderRadius: '4px' }} />
            <span className={styles.separator}>|</span>
            <div className="skeleton-pulse" style={{ width: '100px', height: '20px', borderRadius: '4px' }} />
          </div>
        </header>

        <article className={styles.articleBody}>
          {/* Description */}
          <div className="skeleton-pulse" style={{ width: '100%', height: '20px', marginBottom: '0.8rem', borderRadius: '4px' }} />
          <div className="skeleton-pulse" style={{ width: '95%', height: '20px', marginBottom: '2.5rem', borderRadius: '4px' }} />

          {/* Body Paragraphs */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-pulse" style={{ 
                width: i === 5 ? '70%' : '100%', 
                height: '18px', 
                marginBottom: '1rem', 
                borderRadius: '4px' 
            }} />
          ))}
        </article>
      </div>

      {/* Related Posts Skeleton */}
      <section className={styles.relatedSection}>
        <div className={styles.relatedWrapper}>
          <div className="skeleton-pulse" style={{ width: '250px', height: '32px', marginBottom: '2rem', borderRadius: '4px' }} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="skeleton-pulse" style={{ width: '100%', aspectRatio: '16/9', marginBottom: '1rem', borderRadius: '8px' }} />
                <div className="skeleton-pulse" style={{ width: '100%', height: '20px', marginBottom: '0.5rem', borderRadius: '4px' }} />
                <div className="skeleton-pulse" style={{ width: '60%', height: '20px', borderRadius: '4px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiệu ứng chuyển động */}
      <style jsx>{`
        .skeleton-pulse {
          background: linear-gradient(-90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
          background-size: 400% 400%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { background-position: 100% 0%; }
          100% { background-position: -100% 0%; }
        }
      `}</style>
    </main>
  );
}
