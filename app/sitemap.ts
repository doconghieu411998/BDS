import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://theheraresort.com'
    const locales = ['vi', 'en']
    const routes = ['', '/the-hera-resort-quy-nhon']

    const sitemapEntries: MetadataRoute.Sitemap = []

    routes.forEach((route) => {
        const urlEntries = locales.map((locale) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
        }))

        sitemapEntries.push(...urlEntries)
    })

    return sitemapEntries
}