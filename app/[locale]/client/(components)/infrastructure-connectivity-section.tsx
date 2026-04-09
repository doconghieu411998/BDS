"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { withBasePath } from '@/services/commonService';
import styles from './infrastructure-connectivity-section.module.css';

import { useTranslations } from 'next-intl';
import { INFRASTRUCTURE_KEYS } from '@/constants/localeKeys';

const InfrastructureConnectivitySection = () => {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef(0);

  const MAP_IMG = "images/ha-tang-da-ket-noi.png";

  const connectivityItems = [
    {
      time: "20",
      unit: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_UNIT_PHUT),
      title: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_ITEM_1_TITLE),
      image: "images/tp_quy_nhon_bg.png",
    },
    {
      time: "35",
      unit: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_UNIT_PHUT),
      title: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_ITEM_2_TITLE),
      image: "images/san_bay_phu_cat_bg.png",
    },
    {
      time: "05",
      unit: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_UNIT_PHUT),
      title: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_ITEM_3_TITLE),
      image: "images/quy_hoa_bg.png",
    },
    {
      time: "15",
      unit: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_UNIT_PHUT),
      title: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_ITEM_4_TITLE),
      image: "images/bai_trung_bg.png",
    },
    {
      time: "05",
      unit: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_UNIT_PHUT),
      title: t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_ITEM_5_TITLE),
      image: "images/bai_xep_bg.png",
    },
  ];

  const displayItems = [...connectivityItems, ...connectivityItems, ...connectivityItems];
  const totalOriginal = connectivityItems.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerRow(2);
      } else if (window.innerWidth <= 1200) {
        setItemsPerRow(3);
      } else {
        setItemsPerRow(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(totalOriginal);
  }, [totalOriginal]);

  const startAutoplay = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3000);
  };

  const stopAutoplay = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  useEffect(() => {
    const transitionTime = 1000;
    if (currentIndex >= totalOriginal * 2) {
      const jumpTimeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - totalOriginal);
      }, transitionTime);
      return () => clearTimeout(jumpTimeout);
    }
    if (currentIndex <= totalOriginal - itemsPerRow) {
        const jumpTimeout = setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(currentIndex + totalOriginal);
        }, transitionTime);
        return () => clearTimeout(jumpTimeout);
      }
  }, [currentIndex, totalOriginal, itemsPerRow]);

  const slideWidth = 100 / itemsPerRow;
  const centerShift = (100 - slideWidth) / 2;

  // Drag Handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    stopAutoplay();
    setIsDragging(true);
    setIsTransitioning(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragStartRef.current;
    setDragOffset(delta);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const slidePixelWidth = containerWidth / itemsPerRow;
    const threshold = slidePixelWidth / 4;

    setIsTransitioning(true);
    if (dragOffset < -threshold) {
      setCurrentIndex((prev) => prev + 1);
    } else if (dragOffset > threshold) {
      setCurrentIndex((prev) => prev - 1);
    }

    setDragOffset(0);
    startAutoplay();
  };

  return (
    <section id="infrastructure-section" className={styles.section}>
      <div className={styles.mapBackground}>
        <Image
          src={withBasePath(MAP_IMG)}
          alt="Infrastructure Map"
          fill
          style={{ objectFit: 'cover', objectPosition: 'right center' }}
          priority
        />
      </div>

      <div className={styles.container}>
        <div className={styles.topContent}>
          <div className={styles.textSide}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.label}>{t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_TITLE)}</h2>
              <h2 className={styles.mainTitle}>{t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_SUBTITLE)}</h2>
            </div>
            <p className={styles.description}>
              {t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_DESCRIPTION)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <div 
          className={`${styles.carouselContainer} ${isDragging ? styles.grabbing : ''}`}
          ref={containerRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div 
            className={styles.carouselTrack}
            style={{ 
              transform: `translateX(calc(-${currentIndex * slideWidth}% + ${centerShift}% + ${dragOffset}px))`,
              transition: isTransitioning ? 'transform 1s ease-in-out' : 'none'
            }}
          >
            {displayItems.map((item, index) => (
              <div
                key={index}
                className={styles.carouselSlide}
                style={{ flex: `0 0 ${slideWidth}%` }}
              >
                <div className={styles.carouselCard}>
                  <div className={styles.cardBg}>
                    {item.image && (
                      <Image
                        src={withBasePath(item.image)}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.timeWrapper}>
                      <span className={styles.timeValue}>{item.time}</span>
                      <span className={styles.timeUnit}>{item.unit}</span>
                    </div>

                    <div className={styles.cardFooter}>
                      <p className={styles.itemTitle}>{item.title}</p>
                      <div className={styles.pinIcon}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="20" cy="20" r="19.25" stroke="white" strokeWidth="1.5" />
                          <path d="M20 26C23.3137 26 26 23.3137 26 20C26 16.6863 23.3137 14 20 14C16.6863 14 14 16.6863 14 20C14 23.3137 16.6863 26 20 26Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureConnectivitySection;
