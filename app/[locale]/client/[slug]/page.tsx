import NewsDetailView from "./(view-detail)/view-detail";
import { getIdFromSlug, getTagFromSlug, getTagNameFromSlug } from "@/services/commonService";
import { ClientPostApiService } from "@/api/clientPostApiService";
import { notFound } from "next/navigation";
import TagArticleList from "./(tags-article)/tags-article";
import { getLocale } from "next-intl/server";

interface Props {
    params: Promise<{ slug: string }>;
}

const transformSeoUrl = (url: string | undefined, baseUrl: string) => {
    if (!url) return undefined;
    // Replace backend absolute URL with the main domain base URL
    // This ensures bots like Facebook/Zalo can fetch the image over HTTPS via our proxy
    return url.replace(/https?:\/\/103\.82\.23\.181:5000\/images\//g, `${baseUrl}/images/`);
};

export async function generateMetadata({ params }: Props) {
    const locale = await getLocale();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://theheraresort.com';
    const { slug } = await params;

    // Check for tag first (tags have -tID.html pattern)
    const tagId = getTagFromSlug(slug);

    if (tagId) {
        const currentUrl = `${baseUrl}/${locale}/the-hera-resort-quy-nhon/${slug}`;
        const alternatesLanguages = {
            'vi': `${baseUrl}/vi/the-hera-resort-quy-nhon/${slug}`,
            'en': `${baseUrl}/en/the-hera-resort-quy-nhon/${slug}`,
        };

        // TODO: Fetch actual tag name from API using tagId for better SEO
        const tagTitle = locale === 'vi'
            ? 'Bài viết theo danh mục'
            : 'Articles by Category';
        const tagDescription = locale === 'vi'
            ? 'Khám phá các bài viết liên quan đến danh mục này tại The Hera Resort Quy Nhon'
            : 'Explore related articles in this category at The Hera Resort Quy Nhon';

        return {
            title: `${tagTitle}`,
            description: tagDescription,
            alternates: {
                canonical: currentUrl,
                languages: alternatesLanguages,
            },
            openGraph: {
                title: tagTitle,
                description: tagDescription,
                url: currentUrl,
                siteName: 'The Hera Resort Quy Nhon',
                images: [
                    {
                        url: '/images/og-image.png',
                        width: 1200,
                        height: 630,
                        alt: tagTitle,
                    },
                ],
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: tagTitle,
                description: tagDescription,
                images: ['/images/og-image.png'],
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    }

    // Check for post (posts have -ID.html pattern without 't')
    const id = getIdFromSlug(slug);

    if (id) {
        const newsItem = await ClientPostApiService.getPostDetail(id);

        if (!newsItem) {
            return notFound();
        }

        const currentUrl = `${baseUrl}/${locale}/the-hera-resort-quy-nhon/${slug}`;
        const alternatesLanguages = {
            'vi': `${baseUrl}/vi/the-hera-resort-quy-nhon/${slug}`,
            'en': `${baseUrl}/en/the-hera-resort-quy-nhon/${slug}`,
        };

        return {
            title: `${newsItem?.title} | The Hera Resort Quy Nhon`,
            description: newsItem?.description,
            alternates: {
                canonical: currentUrl,
                languages: alternatesLanguages,
            },
            openGraph: {
                title: newsItem.title,
                description: newsItem?.description,
                url: currentUrl,
                siteName: 'The Hera Resort Quy Nhon',
                images: [
                    {
                        url: transformSeoUrl(newsItem?.banner, baseUrl) || `${baseUrl}/images/og-image.png`,
                        width: 1200,
                        height: 630,
                        alt: newsItem?.title,
                    },
                ],
                locale: locale === 'vi' ? 'vi_VN' : 'en_US',
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: newsItem?.title,
                description: newsItem?.description,
                images: [transformSeoUrl(newsItem?.banner, baseUrl) || `${baseUrl}/images/og-image.png`],
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    }

    // If neither tag nor post, return 404
    return notFound();
}

export default async function SlugPage({ params }: Props) {

    const locale = await getLocale();

    const { slug } = await params;

    // Check for tag first (tags have -tID.html pattern)
    const tagId = getTagFromSlug(slug);

    if (tagId) {
        const articles = await ClientPostApiService.getPostsByTag(tagId);

        // Extract tag name from articles if available, otherwise from slug
        const tagName = articles.length > 0
            ? articles[0].tags.find(t => t.id === parseInt(tagId))?.tagName
            : getTagNameFromSlug(slug);

        return (
            <>
                <TagArticleList
                    tagSlug={tagId}
                    tagName={tagName}
                    articles={articles}
                    locale={locale}
                />
            </>
        );
    }

    // Check for post (posts have -ID.html pattern without 't')
    const id = getIdFromSlug(slug);

    if (id) {
        const newsItem = await ClientPostApiService.getPostDetail(id);

        if (!newsItem) {
            return notFound();
        }

        return (
            <>
                <NewsDetailView item={newsItem} slug={slug} locale={locale} />
            </>
        );
    }

    // If neither tag nor post, return 404
    return notFound();
}