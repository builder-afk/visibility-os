"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import {
  Search, Target, TrendingUp, CheckCircle2, ArrowRight, BarChart3, Globe2,
  FileText, Zap, Brain, Sparkles, ShieldCheck, Cpu, LineChart, Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroFeatures = [
  "Track brand visibility across 6+ AI platforms",
  "500+ keywords tracked daily with real-time alerts",
  "Competitor citation gap analysis & benchmarking",
  "Content optimization for AI answer engines",
]

const capabilities = [
  {
    icon: Search,
    title: "AI Search Monitoring",
    description: "Monitor how ChatGPT, Gemini, Perplexity, and other AI engines cite your brand across thousands of queries daily.",
  },
  {
    icon: Target,
    title: "Keyword Intelligence",
    description: "Track rankings and AI citations for your target keywords. Discover high-value opportunities your competitors are missing.",
  },
  {
    icon: LineChart,
    title: "Rank Tracking & SERP Analysis",
    description: "Daily position monitoring across Google, Bing, and AI Overviews with historical trend data and volatility alerts.",
  },
  {
    icon: Globe2,
    title: "Technical SEO Auditing",
    description: "Automated crawling and indexing analysis. Detect broken links, duplicate content, and schema issues before they impact visibility.",
  },
  {
    icon: Layers,
    title: "Content Gap & Cannibalization",
    description: "Identify content gaps where competitors outrank you and detect keyword cannibalization eating into your organic performance.",
  },
  {
    icon: Brain,
    title: "AI Citation Optimization",
    description: "Structured recommendations to make your content the preferred source for AI-generated answers and citations.",
  },
]

const metrics = [
  { value: "12,400+", label: "AI citations tracked monthly" },
  { value: "500+", label: "Keywords monitored daily" },
  { value: "+34%", label: "Avg. citation growth in 90 days" },
  { value: "6", label: "AI platforms monitored" },
]

const workflow = [
  { step: "01", title: "Connect Your Brand", description: "Add your domains, target keywords, and competitors. Our crawlers begin indexing within minutes." },
  { step: "02", title: "Monitor AI Citations", description: "Track how AI platforms mention and recommend your brand vs. competitors across thousands of queries." },
  { step: "03", title: "Optimize Content", description: "Get actionable recommendations to improve your content's citation-worthiness for AI search engines." },
  { step: "04", title: "Measure & Scale", description: "Watch your AI visibility grow with daily tracking, automated reports, and ROI attribution." },
]

export default function SEOSpecialistPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-body selection:bg-blue-100 selection:text-blue-900">
      <PublicNavbar className="border-b border-blue-200/40 bg-white/80 backdrop-blur-md sticky top-0 z-50" />

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-xs mb-6">
            <Search className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-600">SEO SPECIALIST</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12] mb-6">
            Own Your Organic
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent italic font-normal font-serif">
              & AI Visibility
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            The complete SEO intelligence platform for teams that want to dominate traditional search <em>and</em> AI answer engines. Track, optimize, and scale your visibility across every platform that matters.
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
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
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
            Everything You Need to <span className="text-blue-600">Dominate Search</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto font-medium">Purpose-built tools for modern SEO specialists who need to win in both traditional and AI-powered search.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-xl hover:border-blue-300 transition-all"
            >
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 w-fit mb-4">
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
            How It Works
          </h2>
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
              <div className="text-2xl font-black text-blue-600 mb-3">{w.step}</div>
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
            Ready to Dominate AI Search?
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mb-8 font-medium">
            Join 120+ brands using Miracle to track, optimize, and scale their visibility across traditional and AI-powered search engines.
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
