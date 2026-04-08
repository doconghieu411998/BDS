"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import { withBasePath } from '@/services/commonService';
import styles from './infrastructure-connectivity-section.module.css';

import { useTranslations } from 'next-intl';
import { INFRASTRUCTURE_KEYS } from '@/constants/localeKeys';

const InfrastructureConnectivitySection = () => {
  const t = useTranslations();

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
              <h1 className={styles.mainTitle}>{t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_SUBTITLE)}</h1>
            </div>
            <p className={styles.description}>
              {t(INFRASTRUCTURE_KEYS.HOME_INFRASTRUCTURE_DESCRIPTION)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.carouselWrapper}>
        <Carousel
          slidesToShow={3}
          slidesToScroll={1}
          dots={false}
          infinite={true}
          draggable={true}
          swipe={true}
          autoplay={true}
          autoplaySpeed={4000}
          speed={10000}
          cssEase="linear"
          pauseOnHover={true}
          pauseOnFocus={false}
          variableWidth={true}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]}
          className={styles.carousel}
        >
          {connectivityItems.map((item, index) => (
            <div
              key={index}
              className={styles.carouselItemContainer}
            >
              <div className={styles.carouselCard}>
                {/* Background Image on Hover */}
                <div className={styles.cardBg}>
                  {item.image ? (
                    <Image
                      src={withBasePath(item.image)}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={index <= 2}
                    />
                  ) : (
                    <Image
                      src={withBasePath("images/city-center.png")} /* Default placeholder */
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
        </Carousel>
      </div>
    </section>
  );
};

export default InfrastructureConnectivitySection;
