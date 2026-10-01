"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, BookOpen, Clock, ArrowRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { blogArticles, BLOG_CATEGORIES } from '@/lib/blog-data'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic']
})

export default function MarketingDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-body selection:bg-orange-100 selection:text-orange-900">
      {/* Navbar */}
      <PublicNavbar className="border-b border-orange-200/40 bg-white/80 backdrop-blur-md sticky top-0 z-50" />

      {/* Hero Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-orange-200/80 shadow-2xs mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#F28482]" />
            <span className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent">
              MARKETING DIRECTORY &amp; KNOWLEDGE HUB
            </span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15] mb-4 ${jakarta.className}`}>
            Reddit Marketing &amp; GEO <br />
            <span className={`italic font-normal bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent block mt-1 ${instrumentSerif.className}`}>
              Mastery Resource Directory
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            Explore our complete collection of guides, case studies, and frameworks on Reddit marketing, Answer Engine Optimization (AEO), and LLM citation growth.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides (e.g. Reddit SEO, Customer Research, AEO)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-orange-200/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#F28482]/50 text-sm placeholder:text-slate-400 text-slate-900"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'bg-white/80 border border-orange-200/60 text-slate-600 hover:bg-orange-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Directory Cards Grid */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-orange-200/60 p-8">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No guides found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search term or selecting another category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  href={`/documentation/${article.slug}`}
                  className="group relative flex flex-col justify-between h-full p-7 rounded-3xl bg-[#FFF9F5] backdrop-blur-xl border border-orange-200/70 shadow-[0_8px_32px_0_rgba(245,195,68,0.06)] hover:border-purple-300/60 hover:shadow-[0_12px_36px_0_rgba(181,103,194,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle Accent Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFB347]/10 via-[#F9ED96]/5 to-[#E5A1F5]/10 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="relative z-10">
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFB347]/10 border border-[#FFB347]/20 text-[10px] font-mono font-semibold text-[#7c6a54] uppercase">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className={`text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-[#ea580c] transition-colors leading-snug mb-3 ${jakarta.className}`}>
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                      {article.description}
                    </p>
                  </div>

                  {/* Footer metadata & link */}
                  <div className="relative z-10 pt-4 border-t border-orange-200/50 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">{article.author}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#7c6a54] group-hover:text-[#B567C2] transition-colors uppercase text-[10px] tracking-wider">
                      <span>READ GUIDE</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
