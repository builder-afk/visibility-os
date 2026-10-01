"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  FileCode, Sparkles, MessageSquare, Flame, Check, Paperclip, Send, 
  Search, ShieldCheck, Target, BarChart3, CheckCircle2, ArrowRight, Terminal, Globe2 
} from 'lucide-react'
import Link from 'next/link'

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
      <svg width="60" height="60" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          ref={ref}
          cx="50" cy="50" r="40" fill="none"
          stroke="url(#scoreGradSide)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? offset : circumference}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
        <defs>
          <linearGradient id="scoreGradSide" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff5500" />
            <stop offset="100%" stopColor="#18a0fb" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-slate-900 leading-none">{score}</span>
        <span className="text-[11px] text-slate-500 font-medium mt-0.5">{label}</span>
      </div>
    </div>
  )
}

/* ─── Citation Reach Bar Chart ────────────────────────── */
function PlatformReachBars() {
  const data = [
    { name: 'ChatGPT', pct: 87, color: 'bg-emerald-500' },
    { name: 'Perplexity', pct: 72, color: 'bg-[#18a0fb]' },
    { name: 'Gemini', pct: 65, color: 'bg-amber-500' },
    { name: 'Claude', pct: 58, color: 'bg-[#ff5500]' },
  ]

  return (
    <div className="flex flex-col gap-2 w-full">
      {data.map((bar, i) => (
        <div key={bar.name} className="flex items-center gap-2.5">
          <span className="text-[11px] font-medium text-slate-500 w-16 shrink-0">{bar.name}</span>
          <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${bar.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[10px] font-semibold text-slate-700 w-7">{bar.pct}%</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Continuous Radar Motion Graphic ─────────────────── */
function RadarMotionGraphic() {
  const targets = [
    { name: 'Your Brand', angle: 45, distance: 36, color: '#ff5500', size: 9, isMain: true },
    { name: 'Competitor A', angle: 140, distance: 38, color: '#10b981', size: 7, isMain: false },
    { name: 'Competitor B', angle: 220, distance: 42, color: '#f59e0b', size: 7, isMain: false },
    { name: 'Competitor C', angle: 310, distance: 36, color: '#18a0fb', size: 7, isMain: false },
  ]

  return (
    <div className="relative w-full h-full min-h-[190px] flex items-center justify-center overflow-hidden py-2">
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-slate-300/80 flex items-center justify-center bg-gradient-to-b from-slate-100/50 to-slate-50/20 shadow-inner">
        <div className="absolute w-36 h-36 rounded-full border border-dashed border-slate-300" />
        <div className="absolute w-24 h-24 rounded-full border border-slate-300" />
        <div className="absolute w-14 h-14 rounded-full border border-dashed border-slate-300" />
        <div className="absolute w-full h-[1px] bg-slate-300/60" />
        <div className="absolute h-full w-[1px] bg-slate-300/60" />

        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(255, 85, 0, 0.25) 0deg, rgba(255, 85, 0, 0.05) 50deg, transparent 90deg, transparent 360deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-gradient-to-t from-[#ff5500] via-orange-400 to-amber-200 shadow-[0_0_8px_#ff5500]" />
        </motion.div>

        <div className="relative z-10 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-md flex flex-col items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-orange-500/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[9px] font-bold text-slate-900">AI Tool</span>
          <span className="text-[7px] font-semibold text-[#ff5500] flex items-center gap-0.5">
            <span className="w-1 h-1 rounded-full bg-[#ff5500] animate-ping" />
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
              className="absolute z-20 flex items-center gap-1"
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
                    width: target.size * 2.2,
                    height: target.size * 2.2,
                    backgroundColor: target.color,
                  }}
                  animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
                <div
                  className="rounded-full shadow-xs relative z-10"
                  style={{
                    width: target.size,
                    height: target.size,
                    backgroundColor: target.color,
                  }}
                />
              </div>
              <span className={`text-[8px] font-bold whitespace-nowrap px-1 py-0.2 rounded ${
                target.isMain 
                  ? 'bg-[#ff5500] text-white shadow-xs' 
                  : 'bg-white/90 text-slate-700 border border-slate-200'
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

/* ─── Platform Selector Pills ─────────────────────────── */
function PlatformPills() {
  const [active, setActive] = useState('All')
  const platforms = ['All', 'ChatGPT', 'Perplexity', 'Gemini', 'Claude']

  return (
    <div className="flex flex-wrap gap-1">
      {platforms.map((p) => (
        <button
          key={p}
          onClick={() => setActive(p)}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
            active === p
              ? 'bg-[#0f172a] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          {p}
        </button>
      ))}
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

/* ─── MAIN UNIFIED COMPONENT (SIDE BY SIDE) ───────────── */
export function HowItWorksAndVisibilitySuite() {
  const [activeTab, setActiveTab] = useState("aeo")
  const activeSpecialist = SPECIALISTS.find(s => s.id === activeTab) || SPECIALISTS[0]

  return (
    <section id="visibility" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto font-body">
      
      {/* ─── SIDE BY SIDE GRID CONTAINER ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* ═══════════════════════════════════════════════════════════════
            LEFT COLUMN: HOW IT WORKS / NO FORMS. NO HOOPS. JUST THIS.
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-5 flex flex-col"
        >
          {/* Cursive Handwriting Overline */}
          <div className="mb-2">
            <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
              how it works
            </span>
          </div>

          {/* Main Bold Headline */}
          <div className="mb-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight uppercase leading-[1.05]">
              NO FORMS. NO HOOPS. <br />
              <span className="text-[#ff5500]">JUST THIS.</span>
            </h2>
          </div>

          {/* Sticky Tag Note */}
          <div className="mb-6">
            <span className="inline-block bg-[#fef3c7] text-[#b45309] border border-[#fde68a] px-3 py-1 rounded text-xs font-bold shadow-xs">
              One thread, zero chaos. Here's how it goes.
            </span>
          </div>

          {/* Thread Window Card */}
          <div className="rounded-3xl bg-white border-2 border-[#18a0fb] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col relative">
            
            {/* Figma Selection Nodes */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb] z-30" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb] z-30" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb] z-30" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb] z-30" />

            {/* Top Selection Badge */}
            <div className="absolute -top-3 left-6 bg-[#18a0fb] text-white px-2.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 shadow-xs z-30">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              thread.active
            </div>

            {/* Thread Header */}
            <div className="bg-[#f8fafc] border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18a0fb]" />
                <span className="font-mono text-xs font-bold text-slate-800">
                  miracle × your-brand
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="w-5 h-5 rounded-full bg-[#ff5500] text-white flex items-center justify-center text-[9px] font-black ring-2 ring-white">
                    M
                  </div>
                  <div className="w-5 h-5 rounded-full bg-[#18a0fb] text-white flex items-center justify-center text-[9px] font-black ring-2 ring-white">
                    Y
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  2 online
                </span>
              </div>
            </div>

            {/* Thread Message Stream (Solid, clean contrast, natural spacing) */}
            <div className="p-5 sm:p-6 space-y-5 bg-gradient-to-b from-white via-slate-50/50 to-white">
              
              {/* STEP 1 */}
              <div>
                <div className="flex items-center justify-center mb-3">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#ff5500] uppercase bg-orange-50 border border-orange-200 px-3 py-0.5 rounded-full">
                    01 · SUBSCRIBE
                  </span>
                </div>

                <div className="space-y-2.5">
                  {/* User message */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#18a0fb] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      Y
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">You</span>
                        <span className="text-[10px] font-mono text-slate-400">10:02 AM</span>
                      </div>
                      <div className="bg-slate-100 border border-slate-200/80 rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs inline-block">
                        subscribed. let's build 🚀
                      </div>
                    </div>
                  </div>

                  {/* Miracle response */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                        <span className="text-[10px] font-mono text-slate-400">10:03 AM</span>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs inline-block">
                        you're in ✨ what's the vision?
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="pt-3 border-t border-slate-200/80">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#ff5500] uppercase bg-orange-50 border border-orange-200 px-3 py-0.5 rounded-full">
                    02 · SEND IT OVER
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#18a0fb] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      Y
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">You</span>
                        <span className="text-[10px] font-mono text-slate-400">10:31 AM</span>
                      </div>
                      <div className="bg-slate-100 border border-slate-200/80 rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs space-y-1.5 inline-block">
                        <p>brief's in. probably overkill on detail</p>
                        <div className="inline-flex items-center gap-1.5 bg-white border border-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-700 font-bold shadow-xs">
                          <FileCode className="w-3.5 h-3.5 text-[#18a0fb]" />
                          homepage-brief.fig (12.4 MB)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                        <span className="text-[10px] font-mono text-slate-400">10:32 AM</span>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs inline-block">
                        never too much. first draft in 48h.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="pt-3 border-t border-slate-200/80">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#ff5500] uppercase bg-orange-50 border border-orange-200 px-3 py-0.5 rounded-full">
                    03 · REFINE
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                        <span className="text-[10px] font-mono text-slate-400">Day 2 · 2:15 PM</span>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs space-y-1.5 inline-block">
                        <p>here's take one 👀</p>
                        <div className="inline-flex items-center gap-1.5 bg-white border border-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-700 font-bold shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
                          interactive-preview-v1.fig
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#18a0fb] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      Y
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">You</span>
                        <span className="text-[10px] font-mono text-slate-400">Day 2 · 2:40 PM</span>
                      </div>
                      <div className="bg-slate-100 border border-slate-200/80 rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs space-y-1.5 inline-block">
                        <p>did you read my mind? bolder hero though</p>
                        <div className="inline-flex items-center gap-1 bg-white border border-slate-300 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-800 shadow-xs">
                          <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                          <span>2 reactions</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                      M
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                        <span className="text-[10px] font-mono text-slate-400">Day 2 · 2:45 PM</span>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-2xl rounded-tl-xs px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs inline-block">
                        on it. change anything, as often as you want.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="pt-3 border-t border-slate-200/80">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#ff5500] uppercase bg-orange-50 border border-orange-200 px-3 py-0.5 rounded-full">
                    04 · SHIP IT
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                      <span className="text-[10px] font-mono text-slate-400">Day 3 · 4:00 PM</span>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-300 rounded-2xl rounded-tl-xs px-4 py-2 text-xs font-extrabold text-emerald-950 shadow-xs inline-block">
                      shipped ✨ live to production. go turn heads!
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Live Chat Composer Bar */}
            <div className="bg-[#f8fafc] border-t border-slate-200 px-4 py-3 flex items-center gap-2">
              <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between text-xs text-slate-400 font-medium shadow-xs">
                <span>Reply to Miracle Studio...</span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Paperclip className="w-3.5 h-3.5" />
                </div>
              </div>
              <button className="p-2 rounded-xl bg-[#ff5500] hover:bg-[#e64d00] text-white shadow-xs transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </motion.div>


        {/* ═══════════════════════════════════════════════════════════════
            RIGHT COLUMN: WHY VISIBILITY MATTERS / BECOME IMPOSSIBLE TO IGNORE
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="xl:col-span-7 flex flex-col h-full bg-white/95 rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 sm:p-8"
        >
          {/* Cursive Handwriting Overline */}
          <div className="mb-2">
            <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
              why visibility matters
            </span>
          </div>

          {/* Headline */}
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0f172a] uppercase leading-[1.05]">
              BECOME <span className="text-[#ff5500]">IMPOSSIBLE TO IGNORE</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-xl leading-relaxed mt-2">
              Track, optimize, and dominate your share of voice across ChatGPT, Perplexity, Gemini, and Claude with custom metrics for every role.
            </p>
          </div>

          {/* ─── AI Citation Engine Cards (Preserved in full) ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            
            {/* Card 1: Radar & Platform Search */}
            <div className="sm:col-span-2 rounded-2xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-5 flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-[#18a0fb] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0f172a]">
                    Track brand visibility across AI search & custom prompts.
                  </h3>
                </div>
                <PlatformPills />
              </div>

              <div className="min-h-[190px]">
                <RadarMotionGraphic />
              </div>
            </div>

            {/* Card 2: Content Score */}
            <div className="rounded-2xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-4 flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-[#18a0fb] transition-all">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0f172a] mb-2">
                Write content that gets cited in search & AI answers.
              </h3>
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="space-y-1.5 flex-1 mr-3">
                  <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
                  <div className="h-1.5 w-full rounded-full bg-slate-200" />
                </div>
                <ScoreRing score={74} label="Content score" />
              </div>
            </div>

            {/* Card 3: Platform Reach Bars */}
            <div className="rounded-2xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-4 flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-[#18a0fb] transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0f172a]">
                  AI citation reach across LLMs.
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-white/90 px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                  +34%
                </span>
              </div>
              <PlatformReachBars />
              <div className="mt-2 pt-2 border-t border-slate-300/70 text-[10px] font-semibold text-slate-600">
                <span className="font-black text-[#0f172a] text-xs">12,400+</span> citations this month
              </div>
            </div>

            {/* Card 4: Global Localization */}
            <div className="rounded-2xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-4 flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-[#18a0fb] transition-all">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0f172a] mb-2">
                Optimize for global markets with AI-localization.
              </h3>
              <div className="flex items-center gap-1.5 py-1">
                {['🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇯🇵', '🇮🇳', '🇧🇷'].map((flag, idx) => (
                  <span key={idx} className="text-base">{flag}</span>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-300/70 text-[10px] text-slate-600 font-semibold">
                <span className="font-black text-[#0f172a] text-xs">42</span> languages supported
              </div>
            </div>

            {/* Card 5: Technical SEO Deploy */}
            <div className="rounded-2xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-4 flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-[#18a0fb] transition-all">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0f172a] mb-1.5">
                Deploy technical SEO fixes to your site.
              </h3>
              <div className="rounded-xl bg-[#0f172a] p-2.5 font-mono text-[10px] text-slate-300">
                <p className="text-emerald-400 font-bold">$ miracle deploy --seo</p>
                <p className="text-slate-400 text-[9px]">✓ Schema applied</p>
                <p className="text-[#ff5500] font-bold text-[9px]">✓ 47 fixes deployed</p>
              </div>
            </div>

          </div>

          {/* ─── Specialized Workflows Role Tabs & Details ─── */}
          <div className="rounded-2xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-4 sm:p-5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500] block">
                  Tailored Workflows
                </span>
                <h4 className="text-sm sm:text-base font-black text-[#0f172a]">
                  Built for your specific growth role
                </h4>
              </div>

              {/* Role Switcher Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {SPECIALISTS.map((spec) => {
                  const isActive = activeTab === spec.id
                  const Icon = spec.icon
                  return (
                    <button
                      key={spec.id}
                      onClick={() => setActiveTab(spec.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        isActive
                          ? 'bg-[#0f172a] text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <Icon className={`w-3 h-3 ${isActive ? 'text-[#ff5500]' : 'text-slate-500'}`} />
                      {spec.role.split(' ')[0]}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Specialist Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-[#0f172a] text-white">
                    <activeSpecialist.icon className="w-4 h-4 text-[#ff5500]" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-[#0f172a]">{activeSpecialist.role}</h5>
                    <span className="text-[10px] font-semibold text-slate-500">{activeSpecialist.tagline}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {activeSpecialist.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                      <span className="text-[11px] font-semibold text-slate-800">{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Link
                    href={activeSpecialist.href}
                    className="px-3.5 py-1.5 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-[11px] flex items-center gap-1.5 transition-all shadow-xs hover:scale-105"
                  >
                    Explore {activeSpecialist.role}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 4-Column Matrix Cards (Compact) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-200">
              {SPECIALISTS.map((spec, i) => {
                const Icon = spec.icon
                const isActive = activeTab === spec.id
                return (
                  <div
                    key={spec.id}
                    onClick={() => setActiveTab(spec.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'border-2 border-[#18a0fb] bg-white shadow-xs'
                        : 'border-slate-200 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Icon className="w-3 h-3 text-[#ff5500]" />
                      <span className="text-[9px] font-mono font-bold text-slate-400">0{i + 1}</span>
                    </div>
                    <h6 className="text-[11px] font-extrabold text-[#0f172a] truncate">{spec.role}</h6>
                  </div>
                )
              })}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
