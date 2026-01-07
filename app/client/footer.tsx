import React from 'react';
import Image from 'next/image';
import styles from './footer.module.css';
import { FacebookFilled, YoutubeFilled, LinkedinFilled } from '@ant-design/icons';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Banner Image Section */}
      <div className={styles.bannerWrapper}>
        <Image 
          src="/path-to-your-banner.jpg" // Thay đường dẫn ảnh phối cảnh của bạn vào đây
          alt="Masteri Trinity Square Overview"
          fill
          className={styles.bannerImg}
        />
      </div>

      {/* Main Content Section */}
      <div className={styles.contentContainer}>
        <div className={styles.mainGrid}>
          {/* Logo Area */}
          <div className={styles.logoCol}>
            <div className={styles.logo}>
              <span className={styles.mLetter}>M</span>ASTERI
              <div className={styles.subLogo}>TRINITY SQUARE</div>
            </div>
          </div>

          {/* Location Area */}
          <div className={styles.infoCol}>
            <h4 className={styles.heading}>VỊ TRÍ</h4>
            <p className={styles.text}>Ocean Park 2, Ocean City</p>
          </div>

          {/* Contact Area */}
          <div className={styles.infoCol}>
            <h4 className={styles.heading}>LIÊN HỆ</h4>
            <p className={styles.text}>sales@masterisehomes.com</p>
            <p className={styles.text}>(+84) 28 39 159 159</p>
          </div>

          {/* Social Connect Area */}
          <div className={styles.infoCol}>
            <h4 className={styles.heading}>KẾT NỐI</h4>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.iconCircle}><FacebookFilled /></a>
              <a href="#" className={styles.iconCircle}><YoutubeFilled /></a>
              <a href="#" className={styles.iconCircle}><LinkedinFilled /></a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Section */}
        <div className={styles.legalGrid}>
          <div className={styles.legalText}>
            Các thông tin về dự án Masteri Trinity Square tại trang này là sản phẩm và thuộc quyền sở hữu của Công ty TNHH Đầu tư và Phát triển Bất động sản Trường Minh, GCNĐKDN số 0101125521, chủ đầu tư dự án và được công khai tại đây theo thỏa thuận giữa Công ty Cổ phần Tập đoàn Masterise và Công ty TNHH Đầu tư và Phát triển Bất động sản Trường Minh.
          </div>
          <div className={styles.legalText}>
            Lưu ý: Chúng tôi đã nỗ lực và cẩn trọng để hoàn thiện tài liệu này, tuy nhiên tài liệu chỉ dùng với mục đích tham khảo. Hình ảnh, sơ đồ kỹ thuật, bố trí nội ngoại thất hay thông tin mô tả chỉ nhằm mục đích minh họa, không phải là thông tin hiển thị thực hay cam kết pháp lý. Thông tin chính thức về dự án, sản phẩm (bao gồm nhưng không giới hạn: tên tòa, phân khu, thông tin căn hộ, ký hiệu căn hộ, diện tích, tiện ích,...) sẽ được căn cứ trên hợp đồng mua bán.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;