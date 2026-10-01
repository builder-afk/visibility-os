"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Clock, Layers, BookOpen, Sparkles, Search, Compass,
  MessageSquare, Bot, RefreshCw, Cpu, Wrench, BarChart2, Tag
} from 'lucide-react'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { blogArticles, BLOG_CATEGORIES, getAllTopics, getArticlesByCategory } from '@/lib/blog-data'

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  MessageSquare,
  Bot,
  RefreshCw,
  Sparkles,
  Cpu,
  Wrench,
}

export default function DocumentationPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const topics = getAllTopics()

  const filtered = blogArticles.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = filtered[0] || blogArticles[0]
  const rest = filtered.filter(a => a.slug !== featured?.slug)

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-body selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      <PublicNavbar className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200" />

      {/* ── Hero ── */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-6 shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Miracle Engineering Knowledge Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-5 text-[#0f172a] uppercase"
          >
            The Miracle <span className="text-[#ea580c]">Docs &amp; Blog</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Deep technical blueprints into Context Engineering, Multi-Agent Swarms, Answer Engine Optimization (AEO), and resilient AI architecture.
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides (e.g. Context Engineering, AEO, Multi-Agent, MCP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#ea580c]/50 text-sm placeholder:text-slate-400 text-slate-900 font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#0f172a] text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Topic Pillar Spotlight Cards ── */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block">
                Structured Curriculums
              </span>
              <h2 className="text-2xl font-black text-[#0f172a] uppercase">
                Explore Topic Hubs
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic) => {
              const Icon = ICON_MAP[topic.iconName] || Layers
              return (
                <Link
                  key={topic.slug}
                  href={`/documentation/topic/${topic.slug}`}
                  className="group relative flex flex-col justify-between p-5 rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-xl hover:border-[#ea580c] transition-all"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-300/80 text-slate-900 group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center mb-4 transition-colors shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#0f172a] group-hover:text-[#ea580c] transition-colors leading-tight mb-1.5">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium mb-4">
                      {topic.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-300/70 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-600 text-[11px]">
                      {topic.stats.articlesCount} Guides · {topic.stats.skillLevel}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Article ── */}
      {featured && activeCategory === "All" && !searchQuery && (
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href={`/documentation/${featured.slug}`} className="block group">
                <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${featured.coverGradient} p-8 md:p-12 min-h-[300px] flex flex-col justify-end shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 text-white`}>
                  <div className="relative z-10 max-w-3xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-sm">
                      FEATURED GUIDE · {featured.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed mb-6">
                      {featured.description}
                    </p>
                    <div className="flex items-center gap-4 text-white/80 text-xs sm:text-sm font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                      </span>
                      <span>{featured.author} · {featured.authorRole}</span>
                      <span className="ml-auto flex items-center gap-1 text-white font-bold group-hover:gap-2 transition-all uppercase text-xs">
                        Read Guide <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── All Articles Grid ── */}
      <section className="px-4 pb-24 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase">
              All Technical Guides ({filtered.length})
            </h2>
            <span className="text-xs font-bold text-slate-500">
              Active: {activeCategory}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "All" && !searchQuery ? rest : filtered).map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
              >
                <Link href={`/documentation/${article.slug}`} className="block group h-full">
                  <div className="h-full rounded-3xl border border-slate-200/90 bg-white hover:border-[#ea580c] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between p-7 shadow-xs">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase tracking-wider">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                          <Clock className="w-3 h-3 text-slate-400" /> {article.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold tracking-tight leading-snug mb-2 text-[#0f172a] group-hover:text-[#ea580c] transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6 line-clamp-3">
                        {article.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-4 border-t border-slate-100">
                      <span>{article.author}</span>
                      <span className="inline-flex items-center gap-1 font-bold text-[#ea580c] group-hover:translate-x-1 transition-transform uppercase text-[11px]">
                        Read Guide <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <Sparkles className="w-8 h-8 mx-auto mb-4 text-[#ea580c]" />
              <h3 className="text-lg font-bold text-[#0f172a]">No guides match your search</h3>
              <p className="text-sm text-slate-500 mt-1">Try another keyword or select &apos;All&apos; categories.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
