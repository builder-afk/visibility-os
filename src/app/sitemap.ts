import type { MetadataRoute } from 'next'

const BASE = 'https://miracle.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Static public pages ──
  const staticPages: { path: string; priority: number; freq: MetadataRoute.Sitemap[0]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, freq: 'daily' },
    { path: '/about', priority: 0.9, freq: 'monthly' },
    { path: '/contact', priority: 0.8, freq: 'monthly' },
    { path: '/documentation', priority: 0.9, freq: 'weekly' },
    { path: '/marketplace', priority: 0.9, freq: 'weekly' },
    { path: '/tools', priority: 0.9, freq: 'weekly' },
    { path: '/architecture-plan', priority: 0.8, freq: 'monthly' },
    { path: '/marketing-directory', priority: 0.8, freq: 'monthly' },
    { path: '/partners-directory', priority: 0.7, freq: 'monthly' },
    { path: '/n8n-templates', priority: 0.8, freq: 'weekly' },
    { path: '/brand-specialist', priority: 0.7, freq: 'monthly' },
    { path: '/build-receptionist', priority: 0.7, freq: 'monthly' },
    { path: '/product-marketer', priority: 0.7, freq: 'monthly' },
    { path: '/reddit-playbook', priority: 0.7, freq: 'monthly' },
    { path: '/seo-specialist', priority: 0.7, freq: 'monthly' },
    { path: '/ppc-specialist', priority: 0.7, freq: 'monthly' },
    { path: '/privacy', priority: 0.4, freq: 'monthly' },
    { path: '/terms', priority: 0.4, freq: 'monthly' },
    { path: '/cookie-policy', priority: 0.3, freq: 'yearly' },
    { path: '/refund-policy', priority: 0.3, freq: 'yearly' },
    { path: '/login', priority: 0.5, freq: 'yearly' },
    { path: '/signup', priority: 0.5, freq: 'yearly' },
  ]

  const entries: MetadataRoute.Sitemap = staticPages.map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }))

  // ── Tool sub-pages ──
  const toolSlugs = [
    'brand-radar', 'custom-prompts', 'dashboard', 'site-explorer',
    'keywords-explorer', 'site-audit', 'rank-tracker', 'gsc-insights',
    'content-explorer', 'web-analytics', 'bot-analytics', 'gbp-monitor',
    'social-media-manager', 'ai-content-helper', 'domain-comparison',
    'batch-analysis', 'link-intersect', 'content-gap', 'email-alerts',
    'seo-checker', 'traffic-checker', 'data-studio-connectors',
    'top-websites', 'patches', 'portfolios', 'indexnow', 'ai-tech-seo',
  ]

  for (const slug of toolSlugs) {
    entries.push({
      url: `${BASE}/tools/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  // ── Documentation topics ──
  const docTopics = [
    'context-engineering',
    'reddit-marketing',
    'ai-agents',
    'prompt-engineering',
  ]

  for (const slug of docTopics) {
    entries.push({
      url: `${BASE}/documentation/topic/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
