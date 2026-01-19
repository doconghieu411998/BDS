import Image from 'next/image';
import styles from './view-detail.module.css';
import ArticleTracker from './article-tracker';
import NewsList from '../../(common)/news-list';
import { NewsItem } from '@/models/news';
import { Link } from '@/i18n/navigation';
import { convertSlugUrl } from '@/services/commonService';

interface Props {
  item: NewsItem;
  slug: string;
  locale: string;
}

export default async function NewsDetailView({ item, locale }: Props) {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        {item.tags.length > 0 && (
          <span className={styles.categoryBadge}>{item.tags[0]}</span>
        )}
        <h1 className={styles.title}>{item.title}</h1>
        <div className={styles.meta}>
          Ngày đăng: {new Date(item.createDate).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US')}
          <span style={{ margin: '0 10px' }}>|</span>
          Lượt xem: {item.viewCount}
        </div>
      </header>

      <div className={styles.bannerWrapper}>
        <Image
          src={item.banner}
          alt={item.title}
          fill
          priority
          className={styles.bannerImage}
        />
      </div>

      <article className={styles.articleBody}>
        <p className={styles.description}>{item.description}</p>

        <div
          className={styles.htmlContent}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />

        {item.tags && item.tags.length > 0 && (
          <div className={styles.tagSection}>
            <span className={styles.tagLabel}>CHỦ ĐỀ:</span>
            <div className={styles.tagList}>
              {item.tags.map((tag, index) => {
                const urlSlug = `${convertSlugUrl(tag, locale)}.html`;
                return (<Link
                  key={index}
                  href={{ pathname: '/client/[slug]', params: { slug: urlSlug } }}
                  className={styles.tagItem}
                >
                  {tag}
                </Link>)
              })}
            </div>
          </div>
        )}
      </article>

      <NewsList
        relatedTags={item.tags}
        excludeId={item.id}
        limit={4}
        showPagination={true}
      />
      <ArticleTracker newsId={String(item.id)} locale={locale} />
    </main>
  );
}