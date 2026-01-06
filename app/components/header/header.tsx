"use client";
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import { useEffect, useState } from 'react';

const LOGO_SRC = "https://placehold.co/600x400.png"; 

const Header = () => {

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`} >
      
      <div className={styles.leftSection}>
        <button 
          className={styles.menuBtn} 
          type="button" 
          aria-label="Mở danh mục điều hướng chính"
        >
          <span className={styles.burgerIcon} aria-hidden="true">
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </span>
          MENU
        </button>
      </div>

      <div className={styles.centerSection}>
        <Link href="/" className={styles.logoLink} aria-label="Về trang chủ Masteri">
          <Image 
            src={LOGO_SRC} 
            alt="Masteri Thảo Điền - Căn hộ cao cấp" 
            width={120}
            height={50}
            className={styles.logo}
            priority 
          />
        </Link>
      </div>

      <div className={styles.rightSection}></div>
    </header>
  );
};

export default Header;