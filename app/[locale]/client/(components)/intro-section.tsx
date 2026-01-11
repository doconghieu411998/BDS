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
              KHU PHỨC HỢP <br />
              CỘNG ĐỒNG CƯ DÂN MASTERI <br />
              QUY MÔ NHẤT TẠI OCEAN CITY
            </h2>
            <p className={styles.subTitle}>MỘT SẢN PHẨM THUỘC MASTERI COLLECTION</p>
          </div>
        </div>

        <div className={styles.rightCol}>
          <h4 className={styles.introTitle}>SỐNG TRỌN VẸN TRONG TỪNG KHOẢNH KHẮC</h4>
          <p className={styles.description}>
            Đó chính là khởi nguồn của Masteri Trinity Square – tầm nhìn kết nối 
            đa dạng phong cách sống, tiên phong kiến tạo bởi Nhà phát triển Bất động sản 
            Quốc tế Masterise Homes.
          </p>
          <p className={styles.description}>
            Tọa lạc tại vị trí trung tâm trong khu thương mại sầm uất của đại đô thị 
            Ocean Park 2 phía Đông Thủ đô & tiếp nối thành công của Masteri Collection 
            tại Việt Nam, khu phức hợp cao tầng Masteri Trinity Square là dự án đầu tiên 
            kết tinh trọn vẹn bộ ba giá trị chuẩn mực "Sống phong cách Masteri".
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
          “Tại đây, ba giá trị sống, dẫu khác biệt nhưng hòa hợp tuyệt đối và 
          cùng tồn tại trong một tổng thể.
        </p>
        <p className={styles.quoteText}>
          Tại đây, dù bạn yêu thích lối sống năng động ngập tràn năng lượng, 
          đề cao chất keo gắn kết cộng đồng, hay trân trọng sự an yên – 
          tất cả đều tìm thấy điểm chạm của riêng mình.”
        </p>
      </div>

    </section>
  );
};

export default IntroSection;