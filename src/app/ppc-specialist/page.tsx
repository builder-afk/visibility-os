"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import {
  BarChart3, Target, TrendingUp, CheckCircle2, ArrowRight, DollarSign,
  FileText, Zap, Brain, MousePointerClick, Megaphone, PieChart, Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroFeatures = [
  "Benchmark ad performance across Google, Meta & AI",
  "Competitor ad copy analysis & strategy insights",
  "High-intent keyword discovery for maximum ROI",
  "AI-powered bid optimization recommendations",
]

const capabilities = [
  {
    icon: MousePointerClick,
    title: "Ad Performance Benchmarking",
    description: "Compare your ad performance against industry benchmarks and competitors. Identify underperforming campaigns before they waste budget.",
  },
  {
    icon: Eye,
    title: "Competitor Ad Intelligence",
    description: "Analyze competitor ad copy, landing pages, and spending patterns. Uncover their strategies to stay one step ahead.",
  },
  {
    icon: DollarSign,
    title: "ROI & Bid Optimization",
    description: "AI-driven bid recommendations that maximize ROAS. Reduce wasted spend and focus budget on high-converting keywords.",
  },
  {
    icon: Target,
    title: "High-Intent Keyword Discovery",
    description: "Find keywords with the highest purchase intent and lowest competition. Prioritize spend where it drives the most revenue.",
  },
  {
    icon: PieChart,
    title: "Budget Allocation Intelligence",
    description: "Data-driven insights on how to distribute your ad budget across channels, campaigns, and audiences for maximum impact.",
  },
  {
    icon: Megaphone,
    title: "Cross-Platform Analytics",
    description: "Unified reporting across Google Ads, Meta Ads, LinkedIn, and AI-recommended placements. One dashboard, every insight.",
  },
]

const metrics = [
  { value: "+42%", label: "Avg. ROAS improvement" },
  { value: "₹2.1M+", label: "Ad spend optimized monthly" },
  { value: "3.2×", label: "Better conversion rates" },
  { value: "15K+", label: "Keywords monitored for PPC" },
]

const workflow = [
  { step: "01", title: "Connect Ad Accounts", description: "Link your Google Ads, Meta, and other ad platforms. Data syncs automatically within minutes." },
  { step: "02", title: "Analyze Competitors", description: "See exactly what your competitors are bidding on, their ad copy, and estimated spend." },
  { step: "03", title: "Optimize Campaigns", description: "Get AI-powered recommendations for bids, budgets, and keyword targeting to maximize ROI." },
  { step: "04", title: "Scale Profitably", description: "Track ROAS in real-time, automate bid adjustments, and scale winning campaigns with confidence." },
]

export default function PPCSpecialistPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-body selection:bg-emerald-100 selection:text-emerald-900">
      <PublicNavbar className="border-b border-emerald-200/40 bg-white/80 backdrop-blur-md sticky top-0 z-50" />

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/80 shadow-xs mb-6">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-semibold tracking-widest uppercase text-emerald-600">PPC SPECIALIST</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12] mb-6">
            Maximize Every
            <span className="block mt-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent italic font-normal font-serif">
              Ad Dollar Spent
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            The PPC intelligence platform that benchmarks ad performance, analyzes competitor strategies, and discovers high-intent keyword opportunities for better ROI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/contact">
              <Button className="rounded-2xl h-12 px-8 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-sm shadow-lg">
                Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/#pricing">
              <Button variant="outline" className="rounded-2xl h-12 px-8 border-slate-300 text-slate-800 font-bold text-sm">
                View Pricing
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {heroFeatures.map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 text-left">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Metrics Bar ── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-5 text-center shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)]"
            >
              <div className="text-2xl font-extrabold text-[#0f172a] tracking-tight">{m.value}</div>
              <p className="text-[11px] text-slate-600 font-semibold mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Capabilities Grid ── */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
            Tools Built for <span className="text-emerald-600">PPC Excellence</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto font-medium">Turn ad spend into measurable revenue with intelligence that outpaces every competitor.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-xl hover:border-emerald-300 transition-all"
            >
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 w-fit mb-4">
                <cap.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-2">{cap.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflow.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)]"
            >
              <div className="text-2xl font-black text-emerald-600 mb-3">{w.step}</div>
              <h3 className="text-sm font-bold text-[#0f172a] mb-2">{w.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{w.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl bg-[#0f172a] p-10 sm:p-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Stop Wasting Ad Budget
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mb-8 font-medium">
            Join performance marketers who use Miracle to squeeze maximum ROI from every ad dollar across Google, Meta, and AI platforms.
          </p>
          <Link href="/contact">
            <Button className="rounded-2xl h-12 px-10 bg-[#ff5500] hover:bg-[#e64d00] text-white font-bold text-sm shadow-lg shadow-orange-500/20">
              Get Started Today <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
