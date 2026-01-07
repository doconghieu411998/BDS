import React from 'react';
import Image from 'next/image';
import styles from './overview-section.module.css';

// Sử dụng link demo từ placehold.co
const PANORAMA_DEMO = "https://placehold.co/1400x600/f0e6d2/6d4c41?text=Masteri+Trinity+Square+-+Panorama+View";

const OverviewSection = () => {
  const overviewData = [
    { label: "Tên khu phức hợp", value: "Masteri Trinity Square" },
    { label: "Vị trí", value: "Ocean Park 2, Ocean City" },
    { label: "Nhà phát triển", value: "Masterise Homes®\nTrực thuộc Tập đoàn Masterise" },
    { label: "Diện tích khu phức hợp", value: "81.940m2" },
    { label: "Quy mô dự án", value: "3 phân khu/9 tòa/27 tầng" },
    { label: "Mật độ xây dựng", value: "khoảng 17,4%" },
    { label: "Số lượng tiện ích", value: "110" },
    { label: "Tiện ích nổi bật", value: "03 công viên nội khu" },
    { label: "Loại hình căn hộ", value: "Studio, 1PN, 1PN+, 1PN+1, 2PN, 2PN+, 2PN+1, 3PN, 4PN, Duplex, Penthouse" },
  ];

  return (
    <section className={styles.container}>
      {/* Khối nội dung chữ */}
      <div className={styles.contentWrapper}>
        <div className={styles.leftCol}>
          <h2 className={styles.title}>
            THÔNG TIN <br /> TỔNG QUAN
          </h2>
          {/* Hình trang trí chìm */}
          <div className={styles.decorShape}></div>
        </div>

        <div className={styles.rightCol}>
          <ul className={styles.infoList}>
            {overviewData.map((item, index) => (
              <li key={index} className={styles.infoItem}>
                <span className={styles.icon}>›</span>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Khối ảnh demo Panorama bên dưới */}
      <div className={styles.imageContainer}>
        <Image 
          src={PANORAMA_DEMO}
          alt="Demo Panorama Masteri"
          width={1400}
          height={600}
          className={styles.panoramaImage}
          unoptimized // Thêm cái này khi dùng link ảnh ngoài để tránh lỗi cấu hình next.config
        />
      </div>
    </section>
  );
};

export default OverviewSection;