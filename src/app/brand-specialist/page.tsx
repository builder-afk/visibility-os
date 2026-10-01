"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import {
  ShieldCheck, TrendingUp, CheckCircle2, ArrowRight, Eye,
  FileText, Zap, Brain, Globe2, Megaphone, Heart, Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroFeatures = [
  "Track brand share of voice in AI search",
  "Monitor visibility in SERPs and across the web",
  "Spot growth opportunities & protect brand presence",
  "Sentiment analysis across AI and social platforms",
]

const capabilities = [
  {
    icon: Eye,
    title: "Brand Share of Voice",
    description: "Track how often your brand is mentioned vs. competitors across AI search, traditional SERPs, and social conversations. Know your true visibility.",
  },
  {
    icon: ShieldCheck,
    title: "Brand Protection & Monitoring",
    description: "Real-time alerts when your brand is mentioned, misrepresented, or under-cited. Protect your reputation across every digital channel.",
  },
  {
    icon: Heart,
    title: "Sentiment Intelligence",
    description: "Understand how AI platforms, reviewers, and audiences perceive your brand. Track sentiment trends and respond proactively.",
  },
  {
    icon: Globe2,
    title: "Cross-Platform Visibility",
    description: "Monitor your brand presence across Google, AI Overviews, ChatGPT, Gemini, Perplexity, Reddit, and social media — all in one dashboard.",
  },
  {
    icon: Megaphone,
    title: "Campaign Impact Tracking",
    description: "Measure how your branding campaigns affect search visibility, AI citations, and overall brand awareness in real-time.",
  },
  {
    icon: Layers,
    title: "Competitive Brand Intel",
    description: "Deep competitive analysis showing how rival brands are positioned, where they're gaining visibility, and opportunities they're missing.",
  },
]

const metrics = [
  { value: "15,800+", label: "Brand mentions tracked" },
  { value: "6+", label: "AI platforms monitored" },
  { value: "+28%", label: "Avg. SOV improvement" },
  { value: "Real-time", label: "Sentiment tracking" },
]

const workflow = [
  { step: "01", title: "Set Up Brand Monitors", description: "Add your brand, product names, and competitors. Our monitors begin tracking mentions across the entire digital landscape." },
  { step: "02", title: "Track Share of Voice", description: "See your brand's share of voice vs. competitors across AI search engines, SERPs, and social platforms." },
  { step: "03", title: "Analyze Sentiment", description: "Understand how your brand is perceived across platforms. Identify positive and negative sentiment trends." },
  { step: "04", title: "Protect & Grow", description: "Get alerts on brand threats, capitalize on growth opportunities, and measure the impact of your branding efforts." },
]

export default function BrandSpecialistPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-body selection:bg-purple-100 selection:text-purple-900">
      <PublicNavbar className="border-b border-purple-200/40 bg-white/80 backdrop-blur-md sticky top-0 z-50" />

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-purple-200/80 shadow-xs mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-xs font-semibold tracking-widest uppercase text-purple-600">BRAND SPECIALIST</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12] mb-6">
            Protect & Amplify
            <span className="block mt-2 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 bg-clip-text text-transparent italic font-normal font-serif">
              Your Brand Everywhere
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
            The brand intelligence platform for specialists who need to track share of voice, monitor brand presence, and protect reputation across AI search and the web.
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
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
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
            Complete <span className="text-purple-600">Brand Intelligence</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto font-medium">Everything you need to track, protect, and grow your brand across the AI-powered search landscape.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-6 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-xl hover:border-purple-300 transition-all"
            >
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 w-fit mb-4">
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
              <div className="text-2xl font-black text-purple-600 mb-3">{w.step}</div>
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
            Your Brand Deserves to Be Everywhere
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mb-8 font-medium">
            Join brand specialists who use Miracle to track share of voice, protect reputation, and amplify brand presence across AI and traditional search.
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
