import Footer from "./(components)/footer";
import Header from "./(components)/header";
import LanguageSwitcher from "./(components)/language-switcher";
import Preloader from "./(components)/pre-loading";
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { META_KEYS } from '@/constants/localeKeys';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  const title = t(META_KEYS.HOME_META_TITLE);
  const description = t(META_KEYS.HOME_META_DESC);
  const keywords = locale === 'vi'
    ? ["bất động sản Quy Nhơn", "The Hera Resort Quy Nhon", "biệt thự Quy Nhơn", "căn hộ nghỉ dưỡng", "Ghềnh Ráng Quy Nhơn", "dự án The Hera", "đầu tư bất động sản"]
    : ["Quy Nhon real estate", "The Hera Resort Quy Nhon", "Quy Nhon villas", "resort apartments", "Ghenh Rang Quy Nhon", "The Hera project", "property investment"];

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `/${locale}/client`,
      siteName: "The Hera Resort Quy Nhon",
      images: [
        {
          url: '/images/home.png',
          width: 1200,
          height: 630,
          alt: "Hera Resort Quy Nhon",
        },
      ],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/images/home.png'],
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

      <div className="content-fade-in">
        {children}
      </div>

      <Footer />
    </div>
  );
}