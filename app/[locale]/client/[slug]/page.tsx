import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import styles from './page.module.css';
import { getNewsDetail } from '@/services/newsService';
import { getIdFromSlug } from '@/services/commonService';
import NewsList from '../(common)/news-list';
import ArticleTracker from './article-tracker';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const id = await getIdFromSlug(slug);
  const locale = await getLocale();

  if (!id) return { title: 'Không tìm thấy bài viết' };

  const response = await getNewsDetail(id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const url = `${baseUrl}/${locale}/tin-tuc/${slug}`;

  return {
    title: `${response.title} | Greenhill Village Quy Nhon`,
    description: response.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: response.title,
      description: response.description,
      url: url,
      siteName: 'Greenhill Village Quy Nhon',
      images: [
        {
          url: response.banner,
          width: 1200,
          height: 630,
          alt: response.title,
        },
      ],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: response.title,
      description: response.description,
      images: [response.banner],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const id = await getIdFromSlug(slug);

  if (!id) notFound();

  const newsItem = await getNewsDetail(id);

  return (
    <main className={styles.container}>
      {/* 1. Header & Title Section */}
      <header className={styles.header}>
        {newsItem.tags.length > 0 && (
          <span className={styles.categoryBadge}>{newsItem.tags[0]}</span>
        )}
        <h1 className={styles.title}>{newsItem.title}</h1>
        <div className={styles.meta}>
          Ngày đăng: {new Date(newsItem.createDate).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US')}
          <span style={{ margin: '0 10px' }}>|</span>
          Lượt xem: {newsItem.viewCount}
        </div>
      </header>

      {/* 2. Featured Image (Banner) */}
      <div className={styles.bannerWrapper}>
        <Image
          src={newsItem.banner}
          alt={newsItem.title}
          fill
          priority
          className={styles.bannerImage}
        />
      </div>

      {/* 3. Article Body */}
      <article className={styles.articleBody}>
        {/* Sapo bài viết */}
        <p className={styles.description}>{newsItem.description}</p>

        {/* Render nội dung từ editor */}
        <div
          className={styles.htmlContent}
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />

        {newsItem.tags && newsItem.tags.length > 0 && (
          <div className={styles.tagSection}>
            <span className={styles.tagLabel}>CHỦ ĐỀ:</span>
            <div className={styles.tagList}>
              {newsItem.tags.map((tag, index) => (
                <span key={index} className={styles.tagItem}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      <NewsList
        relatedTags={newsItem.tags}
        excludeId={newsItem.id}
        limit={4}
        showPagination={true}
      />
      <ArticleTracker newsId={String(newsItem.id)} locale={locale} />
    </main>
  );
}