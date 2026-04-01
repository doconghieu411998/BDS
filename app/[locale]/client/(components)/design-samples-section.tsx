import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './design-samples-section.module.css';
import { withBasePath } from '@/services/commonService';

const TABS = [
  { id: 'villa', label: 'Villa' },
  { id: 'nha_luu_tru', label: 'Nhà lưu trú' },
  { id: 'villa_bo_dong', label: 'Villa bờ đông' },
];

const MOCK_IMAGES: Record<string, string[]> = {
  villa: [
    'images/over-view.png',
    'images/intro.png',
    'https://images.unsplash.com/photo-1542314831-c6a4d14fff88?w=1400&q=80',
  ],
  nha_luu_tru: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1400&q=80',
  ],
  villa_bo_dong: [
    'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?w=1400&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=80',
  ],
};

const DesignSamplesSection = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id);
  const carouselRef = useRef<any>(null);

  const images = MOCK_IMAGES[activeTab] || [];
  const activeTabLabel = TABS.find(t => t.id === activeTab)?.label || '';

  const next = () => {
    carouselRef.current?.next();
  };

  const prev = () => {
    carouselRef.current?.prev();
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => {
      carouselRef.current?.goTo(0, true);
    }, 10);
  };

  return (
    <section id="design-samples" className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={`${styles.title} global-title`}>CÁC MẪU THIẾT KẾ</h2>
        
        <div className={styles.tabGroup}>
          {TABS.map((tab) => (
             <button
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ''}`}
                onClick={() => handleTabChange(tab.id)}
             >
               {tab.label}
             </button>
          ))}
        </div>

        <div className={styles.carouselWrapper}>
          <button className={styles.prevArrow} onClick={prev} aria-label="Hình trước">
             <LeftOutlined />
          </button>
          
          <Carousel ref={carouselRef} dots={false}>
            {images.map((url, idx) => {
               const isExternal = url.startsWith('http');
               const imgSrc = isExternal ? url : withBasePath(url);

               return (
                 <div key={`${activeTab}-${idx}`} className={styles.carouselSlide}>
                   <Image
                     src={imgSrc}
                     alt={`Mẫu thiết kế ${activeTabLabel} - ${idx + 1}`}
                     fill
                     style={{ objectFit: 'cover' }}
                     className={styles.slideImage}
                     unoptimized={isExternal}
                     sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1440px"
                   />
                 </div>
               )
            })}
          </Carousel>
          
          <button className={styles.nextArrow} onClick={next} aria-label="Hình tiếp theo">
             <RightOutlined />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DesignSamplesSection;
