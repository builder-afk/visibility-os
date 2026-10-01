"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, TrendingUp, Users, ShoppingBag, ArrowRight, Sparkles, Heart, Download, BadgeDollarSign, Repeat2, Crown, Zap } from 'lucide-react'

const CATEGORIES = [
  { id: 'all', label: 'Trending', icon: '🔥' },
  { id: 'saas', label: 'SaaS', icon: '🚀' },
  { id: 'mobile', label: 'Mobile', icon: '📱' },
  { id: 'ai-ml', label: 'AI / ML', icon: '🤖' },
  { id: 'ecommerce', label: 'E-Commerce', icon: '🛒' },
  { id: 'devtools', label: 'DevTools', icon: '🛠️' },
  { id: 'fintech', label: 'FinTech', icon: '💰' },
  { id: 'design', label: 'Design', icon: '🎨' },
]

const FEATURED_PROMPTS = [
  {
    id: 1,
    title: "Full-Stack SaaS Boilerplate",
    author: "Priya Sharma",
    authorAvatar: "PS",
    avatarColor: "bg-violet-500",
    price: "$12.99",
    rating: 4.9,
    reviews: 342,
    downloads: "2.4k",
    category: "SaaS",
    tags: ["Next.js", "Stripe", "Auth"],
    royalty: "15%",
    remix: true,
    isTrending: true,
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    borderAccent: "border-violet-500/30",
  },
  {
    id: 2,
    title: "AI Chatbot with RAG Pipeline",
    author: "Marcus Chen",
    authorAvatar: "MC",
    avatarColor: "bg-cyan-500",
    price: "$8.99",
    rating: 4.8,
    reviews: 189,
    downloads: "1.8k",
    category: "AI / ML",
    tags: ["LangChain", "Vector DB", "GPT-4"],
    royalty: "12%",
    remix: true,
    isTrending: false,
    gradient: "from-cyan-500/20 via-sky-500/10 to-blue-500/20",
    borderAccent: "border-cyan-500/30",
  },
  {
    id: 3,
    title: "E-Commerce Storefront Kit",
    author: "Sofia Rodriguez",
    authorAvatar: "SR",
    avatarColor: "bg-amber-500",
    price: "$15.99",
    rating: 4.9,
    reviews: 521,
    downloads: "4.1k",
    category: "E-Commerce",
    tags: ["Shopify", "Payments", "Analytics"],
    royalty: "18%",
    remix: false,
    isTrending: true,
    gradient: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
    borderAccent: "border-amber-500/30",
  },
  {
    id: 4,
    title: "Real-Time Trading Dashboard",
    author: "Aditya Kapoor",
    authorAvatar: "AK",
    avatarColor: "bg-emerald-500",
    price: "$19.99",
    rating: 4.7,
    reviews: 156,
    downloads: "980",
    category: "FinTech",
    tags: ["WebSocket", "Charts", "API"],
    royalty: "20%",
    remix: true,
    isTrending: false,
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    borderAccent: "border-emerald-500/30",
  },
]

const STATS = [
  { label: "Active Creators", value: "12,400+", icon: Users },
  { label: "Prompts Listed", value: "48,000+", icon: ShoppingBag },
  { label: "Total Sales", value: "$2.1M+", icon: BadgeDollarSign },
  { label: "Remixes Created", value: "15,800+", icon: Repeat2 },
]

const TOP_CREATORS = [
  { name: "Priya S.", earnings: "$42.8k", avatar: "PS", color: "bg-violet-500", rank: 1 },
  { name: "Marcus C.", earnings: "$38.2k", avatar: "MC", color: "bg-cyan-500", rank: 2 },
  { name: "Sofia R.", earnings: "$35.6k", avatar: "SR", color: "bg-amber-500", rank: 3 },
]

export function MarketplaceSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 font-body text-slate-900">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-gradient-to-b from-white to-[#ece5d8] px-4 py-1.5 text-xs font-bold text-slate-800 mb-6 shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#ff5500]" />
          Community Marketplace
          <span className="bg-[#ff5500] text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Live</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black max-w-3xl mb-4 leading-tight uppercase tracking-tight text-[#0f172a]"
        >
          Trade, Remix & <span className="text-[#ff5500]">Monetize</span> Your Prompts
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-700 text-base md:text-lg max-w-2xl font-medium"
        >
          A creator-first economy where every prompt is a product. Earn royalties on sales, remix community hits, and discover battle-tested prompts across app-building niches.
        </motion.p>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-5 flex flex-col items-center text-center gap-1.5 group hover:border-[#ff5500]/50 transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-xl hover:-translate-y-0.5"
          >
            <div className="p-2 rounded-xl bg-white border border-slate-200/90 mb-1 group-hover:scale-110 transition-transform shadow-xs">
              <stat.icon className="w-4 h-4 text-[#ff5500]" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0f172a]">{stat.value}</span>
            <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              activeCategory === cat.id
                ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-md'
                : 'bg-gradient-to-b from-white to-[#ece5d8] text-slate-800 border-slate-300/80 hover:border-slate-400 shadow-xs'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Featured Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {FEATURED_PROMPTS.map((prompt, i) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-[24px] border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-6 flex flex-col gap-4 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-2xl hover:border-[#ff5500]/60 transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            {/* Top row: Author + Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full ${prompt.avatarColor} text-white text-xs font-bold flex items-center justify-center shadow-xs`}>
                  {prompt.authorAvatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0f172a]">{prompt.author}</span>
                  <span className="text-[10px] text-slate-600 font-semibold flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5 text-amber-500" /> Top Creator
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {prompt.isTrending && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-white/90 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                    <TrendingUp className="w-2.5 h-2.5" /> Trending
                  </span>
                )}
                {prompt.remix && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#ff5500] bg-white/90 border border-orange-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                    <Repeat2 className="w-2.5 h-2.5" /> Remixable
                  </span>
                )}
              </div>
            </div>

            {/* Title + Category */}
            <div>
              <h4 className="text-base sm:text-lg font-bold tracking-tight text-[#0f172a] group-hover:text-[#ff5500] transition-colors">{prompt.title}</h4>
              <span className="text-xs text-slate-600 font-semibold">{prompt.category}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {prompt.tags.map((tag, idx) => (
                <span key={idx} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/90 border border-slate-300/80 text-slate-800 shadow-2xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom row: Rating, Downloads, Royalty, Price */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-300/70">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-[#0f172a]">{prompt.rating}</span>
                  <span className="text-[10px] text-slate-500">({prompt.reviews})</span>
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <Download className="w-3 h-3" /> {prompt.downloads}
                </span>
                <span className="flex items-center gap-1 text-emerald-800 font-bold bg-white/90 px-2 py-0.5 rounded border border-emerald-200 text-[10px] shadow-2xs">
                  <BadgeDollarSign className="w-3 h-3 text-emerald-600" /> {prompt.royalty} royalty
                </span>
              </div>
              <span className="text-lg font-black text-[#0f172a]">{prompt.price}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom: Creators Leaderboard + CTA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Creators Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-1 rounded-[24px] border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-6 flex flex-col shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)]"
        >
          <div className="flex items-center gap-2 mb-5">
            <Crown className="w-5 h-5 text-amber-500" />
            <h4 className="text-base font-black tracking-tight text-[#0f172a] uppercase">Top Creators</h4>
          </div>
          <div className="flex flex-col gap-3">
            {TOP_CREATORS.map((c) => (
              <div key={c.rank} className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-white to-[#f5eee3] border border-slate-300/80 hover:border-[#ff5500]/40 transition-colors shadow-2xs">
                <span className="text-xs font-mono font-black text-slate-500 w-5">#{c.rank}</span>
                <div className={`w-8 h-8 rounded-full ${c.color} text-white text-xs font-bold flex items-center justify-center shadow-xs`}>
                  {c.avatar}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-xs font-bold text-[#0f172a]">{c.name}</span>
                  <span className="text-[10px] text-emerald-800 font-bold">{c.earnings} earned</span>
                </div>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 rounded-[24px] border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)]"
        >
          <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
            <Sparkles className="w-32 h-32 text-[#ff5500]" />
          </div>

          <div className="relative z-10">
            <div className="mb-2">
              <span className="font-['Caveat',cursive] text-2xl font-bold text-[#ff5500] tracking-wide block">
                monetize your creativity
              </span>
            </div>
            <h4 className="text-2xl md:text-3xl font-black tracking-tight mb-3 leading-tight uppercase text-[#0f172a]">
              Become a <span className="text-[#ff5500]">Prompt Creator</span>
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed max-w-lg mb-6 font-medium">
              List your battle-tested prompts, earn royalties on every sale and remix, and build your reputation in the fastest-growing creator economy for developers.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: BadgeDollarSign, text: "Earn up to 20% royalties" },
                { icon: Repeat2, text: "Enable prompt remixing" },
                { icon: Zap, text: "Instant payouts" },
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-900 bg-white/90 border border-slate-300/80 rounded-full px-3.5 py-2 shadow-2xs">
                  <perk.icon className="w-3.5 h-3.5 text-[#ff5500]" />
                  {perk.text}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-10">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center gap-2 bg-[#ff5500] text-white hover:bg-[#e64d00] px-6 py-3 rounded-full text-xs font-bold transition-all shadow-md hover:scale-105"
            >
              Explore Marketplace <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300/90 px-6 py-3 rounded-full text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
            >
              Start Selling <BadgeDollarSign className="w-4 h-4 text-[#ff5500]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
