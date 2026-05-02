import { MetadataRoute } from 'next'
import { ClientPostApiService } from '@/api/clientPostApiService'
import { convertSlugUrl } from '@/services/commonService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://theheraresort.com'
    const locales = ['vi', 'en']
    const staticRoutes = ['', '/the-hera-resort-quy-nhon']

    const sitemapEntries: MetadataRoute.Sitemap = []

    // 1. Add static routes
    staticRoutes.forEach((route) => {
        const urlEntries = locales.map((locale) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: route === '' ? 1.0 : 0.8,
        }))

        sitemapEntries.push(...urlEntries)
    })

    // 2. Add dynamic news routes
    try {
        // Fetch posts - limit 100 for sitemap should be sufficient for now
        const response = await ClientPostApiService.getPosts(1, 100)
        const posts = response.data

        posts.forEach((post) => {
            locales.forEach((locale) => {
                // Generate slug matching the pattern in news-list.tsx
                const urlSlug = `${convertSlugUrl(post.title, locale)}-${post.id}.html`
                
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}/the-hera-resort-quy-nhon/${urlSlug}`,
                    lastModified: new Date(post.createDate),
                    changeFrequency: 'weekly' as const,
                    priority: 0.6,
                })
            })
        })
    } catch (error) {
        console.error('Error generating dynamic sitemap entries:', error)
    }

    return sitemapEntries
}