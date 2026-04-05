import React from 'react';
import Image from 'next/image';
import styles from './footer.module.css';
import { FacebookFilled, YoutubeFilled, LinkedinFilled } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Main Content Section */}
      <div className={styles.contentContainer}>
        <div className={styles.mainGrid}>
          {/* Logo Area */}
          <div className={styles.logoCol}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                {/* SVG Floral Placeholder */}
                <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor">
                   <path d="M50 10C50 10 35 40 50 50C65 40 50 10 50 10Z" opacity="0.8"/>
                   <path d="M50 90C50 90 65 60 50 50C35 60 50 90 50 90Z" opacity="0.8"/>
                   <path d="M10 50C10 50 40 65 50 50C40 35 10 50 10 50Z" opacity="0.8"/>
                   <path d="M90 50C90 50 60 35 50 50C60 65 90 50 90 50Z" opacity="0.8"/>
                </svg>
              </div>
              <div className={styles.logoText}>THE HERA RESORT QUY NHON</div>
            </div>
          </div>

          {/* Location Area */}
          <div className={styles.infoCol}>
            <h4 className={styles.heading}>Vị trí</h4>
            <p className={styles.text}>Ocean Park 2, Ocean City</p>
          </div>

          {/* Contact Area */}
          <div className={styles.infoCol}>
            <h4 className={styles.heading}>Liên hệ</h4>
            <p className={styles.text}>sales@masterisehomes.com</p>
            <p className={styles.text}>(+84) 28 39 159 159</p>
          </div>

          {/* Social Connect Area */}
          <div className={styles.infoCol}>
            <h4 className={styles.heading}>Kết nối</h4>
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
            Các thông tin về dự án Masteri Trinity Square tại trang này là sản phẩm và thuộc quyền sở hữu của Công ty TNHH Đầu tư và Phát triển Bất động sản Trường Minh, GCNĐKDN số 0901125981, chủ đầu tư Dự án và được công khai tại đây theo thỏa thuận giữa Công ty Cổ phần Tập đoàn Masterise và Công ty TNHH Đầu tư và Phát triển Bất động sản Trường Minh. Website thuộc sở hữu bởi: CÔNG TY CỔ PHẦN TẬP ĐOÀN MASTERISE - GCNĐKDN số 0304840018 do Phòng ĐKKD Thành phố Hồ Chí Minh cấp đăng ký lần đầu ngày 09/02/2007 và các lần đăng ký thay đổi tùy từng thời điểm.
          </div>
          <div className={styles.legalText}>
            Lưu ý: Chúng tôi đã nỗ lực và cẩn trọng để hoàn thiện tài liệu này, tuy nhiên tài liệu chỉ dùng với mục đích tham khảo. Hình ảnh, sơ đồ kỹ thuật, bố trí nội ngoại thất hay thông tin mô tả chỉ nhằm mục đích minh họa, không phải là thông tin hiển thị thực hay cam kết pháp lý. Thông tin chính thức về dự án, sản phẩm (bao gồm nhưng không giới hạn: tên tòa, phân khu, thông tin căn hộ, ký hiệu căn hộ, diện tích, tiện ích,...) sẽ được căn cứ trên hợp đồng mua bán và các tài liệu được thỏa thuận, ký kết chính thức với khách hàng.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;