"use client";

import React, { useState } from 'react';
import styles from './language-switcher.module.css';

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState<'vn' | 'en'>('vn');

  const toggleLanguage = () => {
    const newLang = currentLang === 'vn' ? 'en' : 'vn';
    setCurrentLang(newLang);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        {currentLang === 'vn' ? 'English' : 'Tiếng Việt'}
      </div>

      <button 
        className={styles.langBtn} 
        onClick={toggleLanguage}
        title="Switch Language"
      >
        <div className={styles.flagWrapper}>
          {/* Logic: 
              - Nếu đang là VN -> Hiện cờ VN (fi-vn)
              - Nếu đang là EN -> Hiện cờ Anh (fi-gb)
              Lớp 'fis' giúp cờ hiển thị dạng vuông/tròn tốt hơn 'fi' thường
          */}
          <span 
            className={`fi fis ${currentLang === 'vn' ? 'fi-vn' : 'fi-gb'}`} 
            style={{ fontSize: '60px' }} // Phóng to để lấp đầy hình tròn
          />
        </div>
      </button>
    </div>
  );
};

export default LanguageSwitcher;