import Image from 'next/image';
import NewsSection from '../../(components)/news-section';

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <main style={{ paddingTop: '100px', minHeight: '80vh', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Cần paddingTop vì Header đang để position fixed đè lên nội dung */}

        <h1>Chi tiết bài viết: {params?.id}</h1>
        <p style={{ color: '#888' }}>Ngày đăng: 12/10/2024</p>

        <div style={{ position: 'relative', width: '100%', height: '400px', margin: '20px 0' }}>
          <Image src="https://placehold.co/1000x400" alt="News cover" fill style={{ objectFit: 'cover' }} />
        </div>

        <div className="content">
          <p>Nội dung bài viết sẽ hiển thị ở đây. Header và Footer tự động có sẵn bao quanh.</p>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
      </main>
      <NewsSection />
    </>
  );
}