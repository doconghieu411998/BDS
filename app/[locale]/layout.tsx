import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "GREENHILL VILLAGE QUY NHƠN",
  description: "Tựa như một ốc đảo xanh giữa lòng thành phố biển, GreenHill Village Quy Nhơn kiến tạo không gian sống giao hòa giữa thiên nhiên và hiện đại, nơi con người tìm thấy sự cân bằng và bình yên giữa nhịp sống đô thị. Với vị trí đắt giá trên trục phát triển mới của Quy Nhơn, thiết kế thông minh và hệ tiện ích toàn diện, Green Hill mang đến lựa chọn lý tưởng cho những ai đang tìm kiếm nơi an cư chuẩn mực, đồng thời là cơ hội đầu tư sinh lời bền vững giữa vùng đất đang vươn mình mạnh mẽ.",
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