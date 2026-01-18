import React from 'react';
import Image from 'next/image';
import styles from './intro-section.module.css';

// Bạn thay thế link ảnh thật vào đây
const IMG_LEFT = "https://placehold.co/600x400.png";
const IMG_RIGHT = "https://placehold.co/600x400.png";

const IntroSection = () => {
  return (
    <section className={styles.container}>

      <div className={styles.topSection}>
        <div className={styles.leftCol}>
          <div className={styles.decorBg}></div>
          <div className={styles.textContent}>
            <h2 className={styles.titleMain}>
              KHU DU LỊCH NGHỈ DƯỠNG <br />
              GREENHILL VILLAGE QUY NHƠN <br />
            </h2>
            <p className={styles.subTitle}>MỘT SẢN PHẨM THUỘC MST GROUP</p>
          </div>
        </div>

        <div className={styles.rightCol}>
          <h4 className={styles.introTitle}>SỐNG TRỌN VẸN TRONG TỪNG KHOẢNH KHẮC</h4>
          <p className={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <p className={styles.description}>
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>

      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <Image
            src={IMG_LEFT}
            alt="Toàn cảnh tòa nhà Masteri Trinity Square"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={IMG_RIGHT}
            alt="Tiện ích nội khu Masteri"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className={styles.quoteSection}>
        <div className={styles.quoteBg}></div>
        <p className={styles.quoteText}>
          “Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
        <p className={styles.quoteText}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.”
        </p>
      </div>

    </section>
  );
};

export default IntroSection;