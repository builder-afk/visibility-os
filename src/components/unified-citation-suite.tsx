"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Search, ShieldCheck, Target, BarChart3, CheckCircle2, ArrowRight, Sparkles, Terminal, Globe2 } from 'lucide-react'
import Link from 'next/link'
import { GoogleLogo, OpenAiLogo, PerplexityLogo, GeminiLogo, MicrosoftLogo } from '@/components/ui/ai-logos'

/* ─── Animated Counter ────────────────────────────────── */
function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.max(1, Math.floor(target / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        start = target
        clearInterval(timer)
      }
      setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─── Animated Donut Ring Chart ───────────────────────── */
function ScoreRing({ score, label }: { score: number; label: string }) {
  const ref = useRef<SVGCircleElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-40px' })
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex items-center gap-3">
      <svg width="68" height="68" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          ref={ref}
          cx="50" cy="50" r="40" fill="none"
          stroke="url(#scoreGradUnified)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? offset : circumference}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
        <defs>
          <linearGradient id="scoreGradUnified" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900 leading-none">{score}</span>
        <span className="text-xs text-gray-500 font-medium mt-0.5">{label}</span>
      </div>
    </div>
  )
}

/* ─── Citation Reach Bar Chart ────────────────────────── */
function PlatformReachBars() {
  const data = [
    { name: 'ChatGPT', pct: 87, color: 'bg-emerald-500' },
    { name: 'Perplexity', pct: 72, color: 'bg-indigo-500' },
    { name: 'Gemini', pct: 65, color: 'bg-amber-500' },
    { name: 'Claude', pct: 58, color: 'bg-pink-500' },
  ]

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {data.map((bar, i) => (
        <div key={bar.name} className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-500 w-20 shrink-0">{bar.name}</span>
          <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${bar.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[11px] font-semibold text-gray-700 w-8">{bar.pct}%</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Continuous Radar Motion Graphic ─────────────────── */
function RadarMotionGraphic() {
  const targets = [
    { name: 'Your Brand', angle: 45, distance: 36, color: '#6366f1', size: 10, isMain: true },
    { name: 'Competitor A', angle: 140, distance: 38, color: '#10b981', size: 8, isMain: false },
    { name: 'Competitor B', angle: 220, distance: 42, color: '#f59e0b', size: 7, isMain: false },
    { name: 'Competitor C', angle: 310, distance: 36, color: '#ef4444', size: 7, isMain: false },
  ]

  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center overflow-hidden py-2">
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-indigo-500/20 flex items-center justify-center bg-gradient-to-b from-indigo-50/40 to-slate-50/20 shadow-inner">
        <div className="absolute w-44 h-44 rounded-full border border-dashed border-indigo-500/20" />
        <div className="absolute w-32 h-32 rounded-full border border-indigo-500/30" />
        <div className="absolute w-18 h-18 rounded-full border border-dashed border-indigo-500/35" />
        <div className="absolute w-full h-[1px] bg-indigo-500/15" />
        <div className="absolute h-full w-[1px] bg-indigo-500/15" />

        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(99, 102, 241, 0.3) 0deg, rgba(99, 102, 241, 0.08) 50deg, transparent 90deg, transparent 360deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-gradient-to-t from-indigo-600 via-indigo-400 to-indigo-200 shadow-[0_0_8px_#6366f1]" />
        </motion.div>

        <div className="relative z-10 w-14 h-14 rounded-full bg-white border border-indigo-200 shadow-md flex flex-col items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-indigo-500/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[10px] font-bold text-indigo-950">AI Tool</span>
          <span className="text-[8px] font-semibold text-indigo-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            Model
          </span>
        </div>

        {targets.map((target, i) => {
          const rad = (target.angle * Math.PI) / 180
          const x = Number((Math.cos(rad) * target.distance).toFixed(3))
          const y = Number((Math.sin(rad) * target.distance).toFixed(3))
          return (
            <div
              key={target.name}
              className="absolute z-20 flex items-center gap-1.5"
              style={{
                left: `calc(50% + ${x}%)`,
                top: `calc(50% + ${y}%)`,
                transform: 'translate(-50%, -50%)',
              }}
              suppressHydrationWarning
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: target.size * 2.4,
                    height: target.size * 2.4,
                    backgroundColor: target.color,
                  }}
                  animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
                <div
                  className="rounded-full shadow-sm relative z-10"
                  style={{
                    width: target.size,
                    height: target.size,
                    backgroundColor: target.color,
                  }}
                />
              </div>
              <span className={`text-[9px] font-semibold whitespace-nowrap px-1.5 py-0.5 rounded-md backdrop-blur-sm ${
                target.isMain 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'bg-white/90 text-gray-700 border border-gray-200/60'
              }`}>
                {target.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Platform Pills ──────────────────────────────────── */
function PlatformPills() {
  const pills = [
    { Icon: GoogleLogo, label: 'AI Overviews' },
    { Icon: GoogleLogo, label: 'AI Mode' },
    { Icon: OpenAiLogo, label: 'ChatGPT' },
    { Icon: PerplexityLogo, label: 'Perplexity' },
    { Icon: GeminiLogo, label: 'Gemini' },
    { Icon: MicrosoftLogo, label: 'Copilot' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((pill, i) => {
        const Icon = pill.Icon
        return (
          <motion.div
            key={pill.label}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 bg-white/90 shadow-2xs text-xs font-medium text-gray-700"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ scale: 1.05, borderColor: '#6366f1' }}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            {pill.label}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─── SPECIALIST DATA ─────────────────────────────────── */
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

export function UnifiedCitationSuite() {
  const [activeTab, setActiveTab] = useState("aeo")
  const activeSpecialist = SPECIALISTS.find(s => s.id === activeTab) || SPECIALISTS[0]

  return (
    <section className="w-full relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-body bg-white/95 rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden my-12">
      
      {/* Cursive Handwriting Overline */}
      <div className="text-center mb-3">
        <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
          why visibility matters
        </span>
      </div>

      {/* ─── Unified Main Section Header ─── */}
      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#0f172a] uppercase mb-3 max-w-4xl mx-auto leading-[1.05]">
            BECOME <span className="text-[#ff5500]">IMPOSSIBLE TO IGNORE</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            Track, optimize, and dominate your share of voice across ChatGPT, Perplexity, Gemini, and Claude with custom metrics for every role.
          </p>
        </motion.div>
      </div>

      {/* ─── PART 1: Complete Bento Grid (All 5 AI Citation Engine Cards Preserved) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14 relative z-10">
        
        {/* Card 1: Visibility & Radar (spans 2 rows on desktop) */}
        <motion.div
          className="lg:row-span-2 relative group rounded-2xl border border-slate-200 bg-slate-50/70 p-7 flex flex-col justify-between overflow-hidden shadow-xs hover:border-[#18a0fb] transition-all duration-300"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-lg md:text-xl font-extrabold text-[#0f172a] leading-snug">
              Track brand visibility across AI search & custom prompts.
            </h3>
            <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-bold text-[#ff5500] hover:underline w-fit">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <PlatformPills />

          <div className="flex-1 min-h-[220px] relative mt-4">
            <RadarMotionGraphic />
          </div>
        </motion.div>

        {/* Card 2: Content Score */}
        <motion.div
          className="relative group rounded-2xl border border-slate-200 bg-slate-50/70 p-7 flex flex-col gap-5 overflow-hidden shadow-xs hover:border-[#18a0fb] transition-all duration-300"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-base md:text-lg font-extrabold text-[#0f172a] leading-snug">
              Write content that gets seen in search and AI answers.
            </h3>
            <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-bold text-[#ff5500] hover:underline w-fit">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-auto pt-2">
            <div className="flex-1 space-y-2">
              <div className="h-2 w-3/4 rounded-full bg-slate-200" />
              <div className="h-2 w-full rounded-full bg-slate-200" />
              <div className="h-2 w-1/2 rounded-full bg-slate-200" />
            </div>
            <ScoreRing score={74} label="Content score" />
          </div>
        </motion.div>

        {/* Card 3: Platform Reach Bars */}
        <motion.div
          className="relative group rounded-2xl border border-slate-200 bg-slate-50/70 p-7 flex flex-col justify-between gap-5 overflow-hidden shadow-xs hover:border-[#18a0fb] transition-all duration-300"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-base md:text-lg font-extrabold text-[#0f172a] leading-snug">
            AI citation reach across major LLMs.
          </h3>

          <PlatformReachBars />

          <div className="flex items-baseline justify-between pt-3 border-t border-slate-200 mt-auto">
            <div>
              <span className="text-2xl font-black text-[#0f172a]">
                <AnimatedCounter target={12400} suffix="+" />
              </span>
              <p className="text-[11px] text-slate-500 font-medium">Citations this month</p>
            </div>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              +34% <span className="text-[10px] text-slate-500 font-normal ml-1">vs last month</span>
            </span>
          </div>
        </motion.div>

        {/* Card 4: Global Localization */}
        <motion.div
          className="relative group rounded-2xl border border-slate-200 bg-slate-50/70 p-7 flex flex-col justify-between gap-5 overflow-hidden shadow-xs hover:border-[#18a0fb] transition-all duration-300"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h3 className="text-base md:text-lg font-extrabold text-[#0f172a] leading-snug">
            Optimize for global markets with AI-localization.
          </h3>

          <div className="flex items-center gap-2 py-2">
            {['🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇯🇵', '🇮🇳', '🇧🇷'].map((flag, idx) => (
              <span key={idx} className="text-lg hover:scale-125 transition-transform cursor-default">{flag}</span>
            ))}
          </div>

          <div className="flex items-baseline gap-2 mt-auto pt-3 border-t border-slate-200">
            <span className="text-2xl font-black text-[#0f172a]">
              <AnimatedCounter target={42} />
            </span>
            <span className="text-xs text-slate-500 font-medium">languages supported</span>
          </div>
        </motion.div>

        {/* Card 5: Technical SEO Deploy */}
        <motion.div
          className="relative group rounded-2xl border border-slate-200 bg-slate-50/70 p-7 flex flex-col justify-between gap-4 overflow-hidden shadow-xs hover:border-[#18a0fb] transition-all duration-300"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-base md:text-lg font-extrabold text-[#0f172a] leading-snug">
              Deploy technical SEO fixes to your site — no devs needed.
            </h3>
            <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-bold text-[#ff5500] hover:underline w-fit">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-xl bg-[#0f172a] border border-slate-800 p-3.5 font-mono text-[11px] text-slate-300 leading-relaxed shadow-sm">
            <div className="flex items-center gap-1.5 text-slate-500 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-emerald-400 font-bold">$ miracle deploy --seo</p>
            <p className="text-slate-400">✓ Schema markup applied</p>
            <p className="text-[#ff5500] font-bold mt-1">✓ 47 fixes deployed successfully</p>
          </div>
        </motion.div>

      </div>

      {/* ─── PART 2: Specialized Workflows & Role Cards ─── */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-6 sm:p-8 shadow-xs mb-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500] block mb-1">
              Tailored Workflows
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0f172a]">
              Built for your specific growth role
            </h3>
          </div>

          {/* Role Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {SPECIALISTS.map((spec) => {
              const isActive = activeTab === spec.id
              const Icon = spec.icon
              return (
                <button
                  key={spec.id}
                  onClick={() => setActiveTab(spec.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0f172a] text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff5500]' : 'text-slate-500'}`} />
                  {spec.role}
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Specialist Interactive View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-[#0f172a] text-white shadow-sm">
                <activeSpecialist.icon className="w-5 h-5 text-[#ff5500]" />
              </div>
              <div>
                <h4 className="text-lg font-black text-[#0f172a]">{activeSpecialist.role}</h4>
                <span className="text-xs font-semibold text-slate-500">{activeSpecialist.tagline}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {activeSpecialist.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{pt}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Link
                href={activeSpecialist.href}
                className="px-5 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md hover:scale-105"
              >
                Explore {activeSpecialist.role} Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4-Column Specialist Role Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {SPECIALISTS.map((spec, i) => {
          const Icon = spec.icon
          const isActive = activeTab === spec.id
          return (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => setActiveTab(spec.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'border-2 border-[#18a0fb] bg-white shadow-md'
                  : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
                    <Icon className="w-4 h-4 text-[#ff5500]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">0{i + 1}</span>
                </div>
                <h4 className="text-sm font-extrabold text-[#0f172a] mb-1">{spec.role}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-3">{spec.tagline}</p>
              </div>

              <ul className="flex flex-col gap-1.5 pt-3 border-t border-slate-200">
                {spec.points.slice(0, 2).map((p, idx) => (
                  <li key={idx} className="text-[11px] font-semibold text-slate-700 flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] shrink-0 mt-1" />
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

