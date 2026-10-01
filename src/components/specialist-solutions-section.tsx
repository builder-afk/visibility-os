"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShieldCheck, Target, BarChart3, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const SPECIALISTS = [
  {
    id: "aeo",
    role: "AEO Specialist",
    tagline: "Answer Engine Optimization & Crawler Intelligence",
    icon: Search,
    color: "from-blue-500 to-indigo-600",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    href: "/seo-specialist",
    points: [
      "Know which AI platforms recommend your brand and for which queries",
      "Spot mention and citation gaps before they compound",
      "Optimize content for rankings and AI citations at the same time",
      "See which AI bots crawl your website and how frequently",
    ],
  },
  {
    id: "brand",
    role: "Brand Specialist",
    tagline: "Share of Voice & Brand Presence Protection",
    icon: ShieldCheck,
    color: "from-purple-500 to-pink-600",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    href: "/brand-specialist",
    points: [
      "Track your brand's share of voice in AI search",
      "Monitor visibility in SERPs and across the web",
      "Spot growth opportunities and protect brand presence",
    ],
  },
  {
    id: "product",
    role: "Product Marketer",
    tagline: "Market Intelligence & Competitor Positioning",
    icon: Target,
    color: "from-amber-500 to-orange-600",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    href: "/product-marketer",
    points: [
      "Uncover competitor positioning",
      "Monitor market shifts",
      "Back every go-to-market decision with real search and content data",
    ],
  },
  {
    id: "ppc",
    role: "PPC Specialist",
    tagline: "Ad Benchmarking & High-Intent Keyword ROI",
    icon: BarChart3,
    color: "from-emerald-500 to-teal-600",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    href: "/ppc-specialist",
    points: [
      "Benchmark ad performance",
      "Analyze competitor ad copy",
      "Discover high-intent keyword opportunities for better ROI",
    ],
  },
]

export function SpecialistSolutionsSection() {
  const [activeTab, setActiveTab] = useState("aeo")

  const activeSpecialist = SPECIALISTS.find(s => s.id === activeTab) || SPECIALISTS[0]

  return (
    <section className="w-full font-body">
      
      {/* Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Tailored Workflows
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            Built for your specific growth role
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you manage AEO, brand presence, product marketing, or paid search — get actionable AI intelligence crafted for your metrics.
          </p>
        </motion.div>
      </div>

      {/* Role Switcher Tabs */}
      <div className="flex flex-wrap justify-center items-center gap-2.5 mb-10">
        {SPECIALISTS.map((spec) => {
          const isActive = activeTab === spec.id
          const Icon = spec.icon
          return (
            <button
              key={spec.id}
              onClick={() => setActiveTab(spec.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-[1.03]'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80 shadow-xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              {spec.role}
            </button>
          )
        })}
      </div>

      {/* Active Specialist Feature Card View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-xl p-8 sm:p-10 shadow-xl max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeSpecialist.color} text-white flex items-center justify-center shadow-md`}>
                <activeSpecialist.icon className="w-6 h-6" />
              </div>
              <div>
                <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-1 ${activeSpecialist.badgeColor}`}>
                  Role Solution
                </span>
                <h3 className="text-2xl font-bold text-slate-900">{activeSpecialist.role}</h3>
              </div>
            </div>
            <p className="text-xs font-semibold text-slate-500 max-w-xs md:text-right">
              {activeSpecialist.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {activeSpecialist.points.map((pt, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                  {pt}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Link
              href={activeSpecialist.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              Explore {activeSpecialist.role} Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Grid of All 4 Roles Cards Below */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {SPECIALISTS.map((spec, i) => {
          const Icon = spec.icon
          return (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => setActiveTab(spec.id)}
              className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-xl flex flex-col justify-between ${
                activeTab === spec.id
                  ? 'border-indigo-500 bg-indigo-50/40 shadow-lg scale-[1.02]'
                  : 'border-slate-200/80 bg-white/80 hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${spec.color} text-white shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    0{i + 1}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{spec.role}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4">
                  {spec.tagline}
                </p>
              </div>

              <ul className="flex flex-col gap-2 pt-3 border-t border-slate-100">
                {spec.points.slice(0, 2).map((p, idx) => (
                  <li key={idx} className="text-[11px] font-medium text-slate-600 flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1" />
                    <span className="line-clamp-2">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
