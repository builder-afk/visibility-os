"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import {
  Target, TrendingUp, CheckCircle2, ArrowRight, Rocket,
  FileText, Zap, Brain, BarChart3, Users, Lightbulb, Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroFeatures = [
  "Uncover competitor positioning & market gaps",
  "Monitor market shifts in real-time",
  "Data-backed go-to-market strategy insights",
  "AI-powered content & messaging optimization",
]

const capabilities = [
  {
    icon: Target,
    title: "Competitor Positioning Analysis",
    description: "Deep-dive into how competitors position their products across search, AI engines, and social. Find the white space they're ignoring.",
  },
  {
    icon: TrendingUp,
    title: "Market Shift Monitoring",
    description: "Real-time alerts when your market landscape changes. New competitors, trending keywords, or shifting customer intent — know first.",
  },
  {
    icon: Users,
    title: "Audience Intelligence",
    description: "Understand what your target audience is searching for, asking AI about, and engaging with. Build messaging that resonates.",
  },
  {
    icon: Lightbulb,
    title: "Go-to-Market Insights",
    description: "Back every launch decision with real search volume, content engagement, and competitive density data. No more guesswork.",
  },
  {
    icon: FileText,
    title: "Content & Messaging Strategy",
    description: "Identify which content formats, topics, and messaging angles drive the most visibility and engagement in your category.",
  },
  {
    icon: Layers,
    title: "Product Launch Tracking",
    description: "Track how your product launch is performing in search and AI citations vs. benchmarks and competitors in real-time.",
  },
]

const metrics = [
  { value: "48,000+", label: "Market signals tracked" },
  { value: "+62%", label: "Avg. launch visibility boost" },
  { value: "200+", label: "Competitor profiles analyzed" },
  { value: "3×", label: "Faster GTM decisions" },
]

const workflow = [
  { step: "01", title: "Define Your Market", description: "Set up your product category, target audience, and competitor landscape. Our intelligence engine starts mapping instantly." },
  { step: "02", title: "Analyze Positioning", description: "See exactly how your product stacks up against competitors in search visibility, AI citations, and audience perception." },
  { step: "03", title: "Refine Messaging", description: "Get data-driven recommendations on messaging, content strategy, and positioning that resonates with your audience." },
  { step: "04", title: "Launch & Track", description: "Monitor your go-to-market performance in real-time. Adjust positioning based on live market feedback." },
]

export default function ProductMarketerPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-body selection:bg-amber-100 selection:text-amber-900">
      <PublicNavbar className="border-b border-amber-200/40 bg-white/80 backdrop-blur-md sticky top-0 z-50" />

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-200/80 shadow-xs mb-6">
            <Target className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">PRODUCT MARKETER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12] mb-6">
            Win Every Market
            <span className="block mt-2 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent italic font-normal font-serif">
              With Data, Not Guesswork
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            The market intelligence platform for product marketers who need to uncover competitor strategies, monitor market shifts, and back every GTM decision with real data.
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
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
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
            Intelligence for <span className="text-amber-600">Product-Led Growth</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto font-medium">From market analysis to launch tracking — everything a product marketer needs to win.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-xl hover:border-amber-300 transition-all"
            >
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 w-fit mb-4">
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
              <div className="text-2xl font-black text-amber-600 mb-3">{w.step}</div>
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
            Launch Smarter, Not Harder
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mb-8 font-medium">
            Join product marketers who use Miracle to nail positioning, beat competitors to market, and launch with confidence every time.
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
