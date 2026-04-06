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
                <Image
                  src="/images/logo-preloading.png"
                  alt="The Hera Resort Logo"
                  width={200}
                  height={80}
                  className={styles.footerLogoImg}
                />
              </div>
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