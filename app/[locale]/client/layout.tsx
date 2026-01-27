import Footer from "./(components)/footer";
import Header from "./(components)/header";
import LanguageSwitcher from "./(components)/language-switcher";
import Preloader from "./(components)/pre-loading";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'vi'
    ? "Greenhill Village Quy Nhơn | Dự án biệt thự nghỉ dưỡng cao cấp"
    : "Greenhill Village Quy Nhon | Luxury Resort & Villas Project";

  const description = locale === 'vi'
    ? "Khám phá Greenhill Village Quy Nhơn - Tổ hợp biệt thự và căn hộ nghỉ dưỡng đẳng cấp 5 sao tại Ghềnh Ráng. Vị trí tựa sơn hướng thủy, tiện ích thượng lưu, cơ hội đầu tư bền vững."
    : "Discover Greenhill Village Quy Nhon - A 5-star luxury resort villa and apartment complex in Ghenh Rang. Prime location, world-class amenities, sustainable investment opportunity.";

  const keywords = locale === 'vi'
    ? ["bất động sản Quy Nhơn", "Greenhill Village", "biệt thự Quy Nhơn", "căn hộ nghỉ dưỡng", "Ghềnh Ráng Quy Nhơn", "dự án Greenhill", "đầu tư bất động sản"]
    : ["Quy Nhon real estate", "Greenhill Village", "Quy Nhon villas", "resort apartments", "Ghenh Rang Quy Nhon", "Greenhill project", "property investment"];

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `/${locale}/client`,
      siteName: "Greenhill Village Quy Nhơn",
      images: [
        {
          url: '/images/home.jpg',
          width: 1200,
          height: 630,
          alt: "Greenhill Village Quy Nhơn",
        },
      ],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/images/home.jpg'],
    },
    alternates: {
      canonical: `/${locale}/client`,
      languages: {
        'vi-VN': '/vi/client',
        'en-US': '/en/client',
      },
    },
  };
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ position: 'relative' }}>

      <Preloader />

      <Header />

      <main className="content-fade-in">
        {children}
      </main>

      <LanguageSwitcher />

      <Footer />
    </div>
  );
}