"use client";
import Image from 'next/image';
import styles from './news-section.module.css';
import { convertSlugUrl } from '@/services/commonService';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

const NEWS_DATA = [
  {
    id: 1,
    image: "https://placehold.co/600x400/4a3a35/white?text=Ocean+City",
    title: "MASTERISE HOMES RA MẮT KHU PHỨC HỢP QUY MÔ LỚN TẠI OCEAN CITY",
    date: "07/03/2025",
  },
  {
    id: 2,
    image: "https://placehold.co/600x400/4a3a35/white?text=Khu+Dong+Ha+Noi",
    title: "KHU ĐÔNG HÀ NỘI CẤT CÁNH: HẠ TẦNG BỨC TỐC, NHỮNG ĐÔ THỊ THÊM SỨC SỐNG",
    date: "07/03/2025",
  }
];

const NewsSection = () => {
  const locale = useLocale();

  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>TIN TỨC</h2>

      <div className={styles.newsGrid}>
        {NEWS_DATA.map((item) => {
          const urlSlug = `${convertSlugUrl('Dự án nghìn tỉ', locale)}-${item.id}.html`;

          return (
            <div key={item.id} className={styles.newsCard}>
              <div className={styles.imageWrapper}>
                <Link
                  href={{
                    pathname: '/client/[slug]',
                    params: {
                      slug: urlSlug
                    }
                  }}
                  className={styles.imageLink} // Thêm class nếu cần CSS cursor: pointer
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className={styles.image}
                  />
                </Link>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {/* Bọc tiêu đề bằng Link (Tốt cho SEO) */}
                  <Link
                    href={{
                      pathname: '/client/[slug]',
                      params: {
                        slug: urlSlug
                      }
                    }}
                  >
                    {item.title}
                  </Link>
                </h3>

                <div className={styles.cardFooter}>
                  <span className={styles.date}>{item.date}</span>

                  <Link
                    href={{
                      pathname: '/client/[slug]',
                      params: {
                        slug: urlSlug
                      }
                    }}
                    className={styles.arrowBtn}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.pageArrow}>&laquo;</button>
        <button className={`${styles.pageNumber} ${styles.active}`}>1</button>
        <button className={styles.pageArrow}>&raquo;</button>
      </div>
    </section>
  );
};

export default NewsSection;