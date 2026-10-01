"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search, Sparkles, ArrowRight, Layers, Radio, Globe2,
  TrendingUp, BarChart3, Bot, MapPin, Share2, GitCompare,
  Link2, FileCheck, Bell, CheckCircle2, BarChart2, Database,
  Trophy, Wrench, FolderKanban, Zap, Cpu, FileText, Shield
} from 'lucide-react'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { getAllTools, ToolDetail } from '@/lib/tools-data'

const ICON_MAP: Record<string, React.ElementType> = {
  Radar: Radio,
  Sparkles,
  LayoutDashboard: Layers,
  Globe2,
  Search,
  ShieldAlert: Shield,
  TrendingUp,
  BarChart3,
  FileSearch: FileText,
  Activity: TrendingUp,
  Bot,
  MapPin,
  Share2,
  GitCompare,
  Layers,
  Link2,
  FileCheck,
  Bell,
  CheckCircle2,
  BarChart2,
  Database,
  Trophy,
  Wrench,
  FolderKanban,
  Zap,
  Cpu,
}

export default function AllToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const tools = getAllTools()

  const categories = ["All", "Core Tools", "Extra Tools & Features"]

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-body selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      <PublicNavbar className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200" />

      {/* ── Hero Section ── */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-6 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            27 Professional SEO &amp; AI Visibility Tools
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-5 text-[#0f172a] uppercase"
          >
            The Miracle <span className="text-[#ea580c]">Tools Suite</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Explore our complete ecosystem of site explorers, keyword clustering engines, bot analyzers, automated patches, and AI visibility radars.
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools (e.g. Brand Radar, IndexNow, Site Audit, Backlinks)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#ea580c]/50 text-sm placeholder:text-slate-400 text-slate-900 font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
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

      {/* ── Tools Grid ── */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase">
            All Tools ({filteredTools.length})
          </h2>
          <span className="text-xs font-bold text-slate-500">
            Category: {activeCategory}
          </span>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-[#ea580c]" />
            <h3 className="text-lg font-bold text-[#0f172a]">No tools found</h3>
            <p className="text-sm text-slate-500 mt-1">Try another search term or reset your category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => {
              const ToolIcon = ICON_MAP[tool.iconName] || Layers
              return (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.02 }}
                >
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="group relative flex flex-col justify-between h-full p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-[#ea580c] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#ea580c] border border-orange-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                          <ToolIcon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${tool.badgeColor}`}>
                          {tool.badge}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] group-hover:text-[#ea580c] transition-colors leading-snug mb-1.5">
                        {tool.name}
                      </h3>

                      <p className="text-xs font-semibold text-slate-500 mb-3">
                        {tool.tagline}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium mb-6">
                        {tool.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {tool.category}
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-[#ea580c] group-hover:translate-x-1 transition-transform uppercase text-[11px]">
                        Explore Tool <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
