import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://theheraresort.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin',
      },
      {
        userAgent: [
          'Amazonbot',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
          'ClaudeBot',
          'CloudflareBrowserRenderingCrawler',
          'Google-Extended',
          'GPTBot',
          'meta-externalagent',
          'urlscan.io',
          'CensysInspect',
          'DotBot',
          'DataForSeoBot',
          'MJ12bot'
        ],
        disallow: '/',
      },
      {
        userAgent: ['facebookexternalhit', 'Twitterbot', 'Discordbot'],
        allow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}