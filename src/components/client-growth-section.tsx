"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const CASE_STUDIES = [
  {
    headline: "312% revenue growth in 5 months",
    body: "Miracle Studio deployed a full AI Operating System for a D2C brand — automating customer support, lead qualification, and order processing. Manual ops costs dropped while conversion rates tripled.",
    stats: [
      { value: "87%", label: "Support automation", sub: "(2 agents → 24/7 AI coverage)" },
      { value: "312%", label: "Revenue increase", sub: "(₹18L → ₹74L/month)" },
    ],
  },
  {
    headline: "18× faster pipeline with n8n workflows",
    body: "A logistics company was drowning in manual data entry across 12 tools. Miracle Studio built 47 automated n8n workflows — syncing CRMs, ERPs, and shipping APIs in real-time, saving 640+ hours monthly.",
    stats: [
      { value: "1,840%", label: "Processing speed", sub: "(4hrs → 13min per batch)" },
      { value: "47", label: "Automated workflows", sub: "(zero manual intervention)" },
    ],
  },
  {
    headline: "94% call resolution with Voice AI agents",
    body: "A healthcare chain deployed Miracle\u2019s multilingual Voice AI to handle appointment booking, rescheduling, and FAQ calls across Hindi, English, and Tamil — reducing wait times from 8 min to under 12 seconds.",
    stats: [
      { value: "640", label: "Daily calls handled", sub: "(3 languages, 24/7)" },
      { value: "₹28 Lakh", label: "Annual savings", sub: "(vs. traditional call center)" },
    ],
  },
]

const AGGREGATE = [
  { value: "50+", label: "Projects", sub: "Delivered" },
  { value: "₹12Cr+", label: "Revenue", sub: "Generated" },
  { value: "8,400+", label: "Hours Saved", sub: "Monthly" },
  { value: "99.7%", label: "Uptime", sub: "Guaranteed" },
]

export function ClientGrowthSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ff5500] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Proven Results
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mb-2">
          Growth Our Clients Experienced
        </h2>
        <p className="text-sm text-slate-500 max-w-xl mx-auto font-medium">
          Real numbers from real clients who deployed Miracle Studio&apos;s AI automation, workflow orchestration, and intelligent agent systems.
        </p>
      </div>

      {/* Case Study Cards — Light gradient theme matching pricing cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {CASE_STUDIES.map((study, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="relative flex flex-col justify-between rounded-3xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-7 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-2xl transition-all group"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-[#ff5500]/50 to-transparent" />

            <div>
              <h3 className="font-extrabold text-lg sm:text-xl leading-tight mb-3 text-[#0f172a]">
                {study.headline}
              </h3>
              <p className="text-slate-600 text-[13px] leading-relaxed mb-6">
                {study.body}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-300/50">
              {study.stats.map((stat, sIdx) => (
                <div key={sIdx}>
                  <span className="text-[#ff5500] font-black text-3xl sm:text-4xl block leading-none mb-1">{stat.value}</span>
                  <span className="text-[#0f172a] font-semibold text-xs block mb-0.5">{stat.label}</span>
                  <span className="text-slate-500 text-[11px] font-medium">{stat.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Aggregate Impact Bar — Light theme */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="mt-5 rounded-3xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] px-6 py-5 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-wrap items-center justify-between gap-y-4 gap-x-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
          <span className="text-[#0f172a] text-xs sm:text-sm font-bold">Aggregate Client Impact</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {AGGREGATE.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <div className="w-px h-6 bg-slate-300/60 hidden sm:block" />}
              <div className="flex items-center gap-2">
                <span className="text-[#ff5500] font-black text-lg sm:text-xl">{item.value}</span>
                <span className="text-slate-600 text-[11px] sm:text-xs font-medium">
                  {item.label}<br />{item.sub}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
