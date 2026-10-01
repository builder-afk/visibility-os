import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth/auth-provider'
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/seo/json-ld'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { UtmProvider } from '@/components/providers/utm-provider'
import { SkipToContent } from '@/components/ui/skip-to-content'
import { ScrollProgressBar } from '@/components/ui/scroll-progress-bar'
import { ScrollToTopButton } from '@/components/ui/scroll-to-top'
import { FloatingContactWidget } from '@/components/ui/floating-contact'
import { CookieConsentBanner } from '@/components/ui/cookie-banner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://miracle.dev'),

  title: {
    template: '%s | miracle',
    default: 'miracle — AI-Powered App Builder | Prompt to Production',
  },

  description:
    'Describe your business idea and generate production-ready architecture, agent pipelines, and clean code in seconds. miracle is the AI app builder for the modern era.',

  keywords: [
    'AI app builder',
    'prompt to production',
    'AI architecture generator',
    'SaaS builder',
    'agent pipeline',
    'code generation',
    'miracle',
  ],

  applicationName: 'miracle',
  generator: 'Next.js',
  referrer: 'strict-origin-when-cross-origin',

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

  alternates: {
    canonical: './',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://miracle.dev',
    siteName: 'miracle',
    title: 'miracle — AI-Powered App Builder',
    description:
      'Prompt to production architecture. Generate schemas, agent pipelines, and clean code in seconds.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'miracle — AI-Powered App Builder',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'miracle — AI-Powered App Builder',
    description: 'Prompt to production architecture. Build AI apps in seconds.',
    images: ['/og-image.png'],
    creator: '@miracledev',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.remove('dark');localStorage.removeItem('miracle_theme');}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.className} relative min-h-screen text-foreground antialiased`}>
        {/* Accessibility: Skip to Content link */}
        <SkipToContent />

        {/* Reading & Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Site-wide JSON-LD structured data */}
        <OrganizationJsonLd />
        <WebsiteJsonLd />

        <ThemeProvider>
          <UtmProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </UtmProvider>
        </ThemeProvider>

        {/* Floating Progressive Enhancements */}
        <ScrollToTopButton />
        <FloatingContactWidget />
        <CookieConsentBanner />

        <Toaster />
      </body>
    </html>
  )
}
