import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Montserrat } from 'next/font/google';
import "../globals.css";
import { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theheraresort.com';

  return {
    title: {
      template: `%s`,
      default: t('home_meta_title'),
    },
    description: t('home_meta_desc'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}/the-hera-resort-quy-nhon`,
      languages: {
        'vi-VN': '/vi/the-hera-resort-quy-nhon',
        'en-US': '/en/the-hera-resort-quy-nhon',
        'x-default': '/vi/the-hera-resort-quy-nhon',
      },
    },
    keywords: [
      "The Hera Resort", "Hera Resort Quy Nhon", "Biệt thự Quy Nhơn",
      "Nghỉ dưỡng Quy Nhơn", "MST Group", "Bất động sản Quy Nhơn",
      "Luxury Villa Quy Nhon", "Resort Quy Nhon", "Dự án The Hera",
      "The Hera Quy Nhơn", "Villas Quy Nhon", "Villas Ghềnh Ráng"
    ],
    openGraph: {
      title: t('home_meta_title'),
      description: t('home_meta_desc'),
      url: `${baseUrl}/${locale}/the-hera-resort-quy-nhon`,
      siteName: t('home_overview_name_value'),
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: t('home_overview_name_value'),
        },
      ],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home_meta_title'),
      description: t('home_meta_desc'),
      images: ['/images/og-image.png'],
    },
    icons: {
      icon: [
        { url: '/favicon.png', type: 'image/png' },
      ],
      shortcut: '/favicon.png',
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    manifest: '/manifest.json',
  };
}

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theheraresort.com';

  // Structured Data (JSON-LD)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": t('home_overview_name_value'),
      "url": baseUrl,
      "logo": `${baseUrl}/images/logo.png`,
      "sameAs": [
        "https://www.facebook.com/theheraresortquynhon"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": t('home_overview_name_value'),
      "url": baseUrl,
      "publisher": {
        "@type": "Organization",
        "name": t('home_overview_developer_value'),
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/images/logo.png`
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": t('home_overview_name_value'),
      "description": t('home_meta_desc'),
      "address": {
        "@type": "PostalAddress",
        "streetAddress": t('home_overview_location_value'),
        "addressLocality": "Quy Nhơn",
        "addressRegion": "Bình Định",
        "addressCountry": "VN"
      }
    }
  ];

  return (
    <html lang={locale} className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}