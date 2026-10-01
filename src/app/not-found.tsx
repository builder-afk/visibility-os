"use client"

import React from 'react'
import Link from 'next/link'
import { Home, Search, ArrowRight, Wrench, FileText, Sparkles, AlertCircle } from 'lucide-react'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'

export default function NotFound() {
  const quickLinks = [
    { name: "Homepage & Prompt Engine", href: "/", icon: Sparkles },
    { name: "28+ SEO & AI Search Tools", href: "/tools", icon: Wrench },
    { name: "n8n Workflow Templates", href: "/n8n-templates", icon: FileText },
    { name: "Plans & Pricing", href: "/#pricing", icon: ArrowRight },
  ]

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground">
      <PublicNavbar />

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center max-w-3xl mx-auto">
        {/* Large 404 Badge */}
        <div className="relative mb-6">
          <span className="text-8xl sm:text-9xl font-black tracking-tighter text-slate-200 dark:text-slate-800 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 bg-[#FFE600] text-slate-950 border-2 border-slate-900 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#0f172a]">
              <AlertCircle className="w-4 h-4 text-[#ff5500]" />
              Page Not Found
            </span>
          </div>
        </div>

        {/* Headline & Description */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-3">
          Architecture Lost in the Prompt
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
          The page or blueprint you are looking for has been moved, renamed, or doesn&apos;t exist. Let&apos;s get you back on track:
        </p>

        {/* Quick Return Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#ff5500] hover:bg-[#e64d00] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Need Help? Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Helpful Shortcuts Card */}
        <div className="w-full rounded-3xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_#0f172a] dark:shadow-[6px_6px_0px_rgba(255,85,0,0.3)] text-left">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-orange-50/60 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#ff5500]" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#ff5500] transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ff5500] group-hover:translate-x-0.5 transition-all" />
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
