import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/project/',
          '/team-workspace/',
          '/settings/',
          '/billing/',
          '/image-prompts/',
          '/video-prompts/',
          '/product-prompts/',
          '/instagram-generator/',
          '/linkedin-generator/',
          '/multimedia-suite/',
          '/workflows/',
          '/problems/',
          '/templates/',
          '/_next/',
        ],
      },
    ],
    sitemap: 'https://miracle.dev/sitemap.xml',
  }
}
