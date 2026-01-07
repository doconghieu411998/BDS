import Image from 'next/image';
import styles from './main.module.css';
import Header from './header';
import IntroSection from './intro-section';
import OverviewSection from './overview-section';
import LocationSection from './location-section';
import HighlightSection from './highlight-section';
import NewsSection from './news-section';
import Footer from './footer';

const HERO_BG = "images/home.png"; 

export default function Main() {
  return (
    <main className={styles.main}>
      
      <section className={styles.heroSection}>
        
        <Header />

        <div className={styles.bgWrap}>
          <Image
            src={HERO_BG}
            alt="Phối cảnh dự án Masteri Trinity Square"
            fill
            style={{ objectFit: 'cover' }}
            quality={90}
            priority
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>
            MASTERI TRINITY SQUARE
          </h1>
          <p className={styles.subtitle}>
            BỘ BA PHONG CÁCH, KIẾN TẠO CỘNG ĐỒNG MASTERI
          </p>
        </div>

        <button className={styles.ctaBtn} type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 7H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 17H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ĐĂNG KÝ NHẬN TIN
        </button>
      </section>

      <IntroSection />

      <OverviewSection />

      <LocationSection />

      <HighlightSection />

      <NewsSection />

      <Footer />
    </main>
  );
}