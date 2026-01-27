import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: "%s | Greenhill Village Quy Nhơn",
    default: "Greenhill Village Quy Nhơn - Resort & Luxury Villas",
  },
  description: "Tựa như một ốc đảo xanh giữa lòng thành phố biển, GreenHill Village Quy Nhơn kiến tạo không gian sống giao hòa giữa thiên nhiên và hiện đại. Vị trí đắt giá, thiết kế thông minh và tiện ích toàn diện.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://greenhillvillage.vn'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
};

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

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}