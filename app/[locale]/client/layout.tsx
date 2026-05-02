import Footer from "./(components)/footer";
import Header from "./(components)/header";
import Preloader from "./(components)/pre-loading";
import FloatingActions from "./(components)/floating-actions";
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { META_KEYS, SEO_KEYS } from '@/constants/localeKeys';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale });

  const title = t(SEO_KEYS.HOME_SEO_TITLE);
  const description = t(SEO_KEYS.HOME_SEO_DESCRIPTION);
  const keywords = locale === 'vi'
    ? ["bất động sản Quy Nhơn", "The Hera Resort Quy Nhơn", "biệt thự Quy Nhơn", "căn hộ nghỉ dưỡng", "Ghềnh Ráng Quy Nhơn", "dự án The Hera", "đầu tư bất động sản", "MST Group", "The Hera Quy Nhơn"]
    : ["Quy Nhon real estate", "The Hera Resort Quy Nhon", "Quy Nhon villas", "resort apartments", "Ghenh Rang Quy Nhon", "The Hera project", "property investment", "MST Group", "The Hera Quy Nhon"];

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `/${locale}/the-hera-resort-quy-nhon`,
      siteName: "The Hera Resort Quy Nhon",
      images: [
        {
          url: '/images/og-image.png',
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
      images: ['/images/og-image.png'],
    },
    alternates: {
      canonical: `/${locale}/the-hera-resort-quy-nhon`,
      languages: {
        'vi-VN': '/vi/the-hera-resort-quy-nhon',
        'en-US': '/en/the-hera-resort-quy-nhon',
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

      <FloatingActions />

      <Header />

      <div className="content-fade-in">
        {children}
      </div>

      <Footer />
    </div>
  );
}