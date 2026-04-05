import React, { useState } from 'react';
import Image from 'next/image';
import styles from './intro-section.module.css';
import { withBasePath } from '@/services/commonService';

const IMG_RIGHT = "images/intro.png";

const CONTENT = {
  INTRO: {
    title: "THE HERA RESORT QUY NHON",
    tagline: "Sea Flow(ers) Through Mountains",
    description: [
      "The Hera Resort không chỉ là điểm đến của nghỉ dưỡng, mà là nơi con người tìm lại sự cân bằng nội tại. Ở đây, thiên nhiên không chỉ hiện diện bên ngoài cửa sổ, mà thở cùng từng nhịp sống. Sự hùng vĩ của núi mang lại cảm giác được chở che. Sự bao la của biển mở ra tự do và hồi phục.",
      "Tại nơi giao thoa giữa biển và núi, The Hera Resort hiện diện tựa một tinh thần sống trong từng đường cong kiến trúc, từng nhành hoa, từng mảng xanh len qua khối đá trắng, từng khoảng lặng của ánh sáng cuối ngày. Dòng chảy của thiên nhiên hùng vĩ mà nên thơ được dẫn dắt tinh tế, để mọi khoảnh khắc ở nơi đây được lưu giữ trọn vẹn."
    ]
  },
  INVESTOR: {
    title: "CHỦ ĐẦU TƯ",
    tagline: "",
    description: [
      "Sunshine Group với chiến lược mũi nhọn là đầu tư kinh doanh bất động sản, đã và đang tập trung phát triển hơn 20 dự án hạng sang trên khắp cả nước. Năm 2018, Sunshine Group chính thức chào sân thị trường TP. Hồ Chí Minh với dự án quy mô cực khủng Sunshine City Sài Gòn."
    ]
  },
  MANAGER: {
    title: "ĐƠN VỊ QUẢN LÝ",
    tagline: "Global Professional Standards",
    description: [
      "Hỗ trợ quản lý chuyên nghiệp theo tiêu chuẩn quốc tế, đảm bảo giá trị tài sản và trải nghiệm dịch vụ đẳng cấp cho cư dân và du khách."
    ]
  }
};

const IntroSection = () => {
  const [activeTab, setActiveTab] = useState<'INTRO' | 'INVESTOR' | 'MANAGER'>('INTRO');
  const current = CONTENT[activeTab];

  return (
    <section id="intro-section" className={styles.section}>
      <div className={styles.sectionHeader}>
        <span
          className={`${styles.headerItem} ${activeTab === 'INTRO' ? styles.active : ''}`}
          onClick={() => setActiveTab('INTRO')}
        >
          Giới thiệu
        </span>
        <span className={styles.headerSeparator}>|</span>
        <span
          className={`${styles.headerItem} ${activeTab === 'INVESTOR' ? styles.active : ''}`}
          onClick={() => setActiveTab('INVESTOR')}
        >
          Chủ đầu tư
        </span>
        <span className={styles.headerSeparator}>|</span>
        <span
          className={`${styles.headerItem} ${activeTab === 'MANAGER' ? styles.active : ''}`}
          onClick={() => setActiveTab('MANAGER')}
        >
          Đơn vị quản lý
        </span>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.blueCard}>
          <div className={styles.decorBg}></div>
          <div className={styles.textContent}>
            <h2 className={`${styles.titleMain} global-title`}>
              {current.title}
            </h2>
            {current.tagline && (
              <p className={styles.tagline}>{current.tagline}</p>
            )}
            <div className={styles.descriptionWrapper}>
              {current.description.map((p, idx) => (
                <p key={idx} className={`${styles.description} global-text`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.imageCard}>
          <div className={styles.imageWrapper}>
            <Image
              src={withBasePath(IMG_RIGHT)}
              alt={current.title}
              fill
              className={styles.image}
              sizes="(max-width: 992px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
