"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
  GoogleLogo,
  OpenAiLogo,
  PerplexityLogo,
  GeminiLogo,
  MicrosoftLogo,
} from '@/components/ui/ai-logos'

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

/* ─── Animated Ring / Donut Chart ─────────────────────── */
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
          stroke="url(#scoreGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? offset : circumference}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900">{score}</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  )
}

/* ─── Animated Bar Chart ──────────────────────────────── */
function AnimatedBars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const bars = [
    { label: 'ChatGPT', pct: 87, color: '#10b981' },
    { label: 'Perplexity', pct: 72, color: '#6366f1' },
    { label: 'Gemini', pct: 65, color: '#f59e0b' },
    { label: 'Claude', pct: 58, color: '#ec4899' },
  ]

  return (
    <div ref={ref} className="flex flex-col gap-2.5 w-full">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex items-center gap-3">
          <span className="text-[11px] text-gray-500 w-16 text-right shrink-0">{bar.label}</span>
          <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: bar.color }}
              initial={{ width: '0%' }}
              animate={inView ? { width: `${bar.pct}%` } : { width: '0%' }}
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
    <div className="relative w-full h-full min-h-[260px] flex items-center justify-center overflow-hidden py-4">
      {/* Outer Radar Container & Concentric Target Rings */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-indigo-500/20 flex items-center justify-center bg-gradient-to-b from-indigo-50/40 to-slate-50/20 shadow-inner">

        {/* Outer Ring 3 */}
        <div className="absolute w-48 h-48 rounded-full border border-dashed border-indigo-500/20" />

        {/* Mid Ring 2 */}
        <div className="absolute w-34 h-34 sm:w-36 sm:h-36 rounded-full border border-indigo-500/30" />

        {/* Inner Ring 1 */}
        <div className="absolute w-20 h-20 rounded-full border border-dashed border-indigo-500/35" />

        {/* Crosshair grid lines */}
        <div className="absolute w-full h-[1px] bg-indigo-500/15" />
        <div className="absolute h-full w-[1px] bg-indigo-500/15" />

        {/* Continuous 360-degree Rotating Radar Scanner Sweep */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(99, 102, 241, 0.3) 0deg, rgba(99, 102, 241, 0.08) 50deg, transparent 90deg, transparent 360deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          {/* Scanner Leading Edge Line */}
          <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-gradient-to-t from-indigo-600 via-indigo-400 to-indigo-200 shadow-[0_0_8px_#6366f1]" />
        </motion.div>

        {/* Pulsing Central Hub */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-white border border-indigo-200 shadow-md flex flex-col items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-indigo-500/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-[11px] font-bold text-indigo-950">AI Tool</span>
          <span className="text-[9px] font-semibold text-indigo-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            Model
          </span>
        </div>

        {/* Radar Blips / Targets with Continuous Ping Motion */}
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
              {/* Target Dot with Pulse Ping */}
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

              {/* Label */}
              <span className={`text-[10px] font-semibold whitespace-nowrap px-1.5 py-0.5 rounded-md backdrop-blur-sm ${target.isMain
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white/80 text-gray-700 border border-gray-200/60'
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

/* ─── Pulsing Platform Pills ──────────────────────────── */
function PlatformPills() {
  const pills: { Icon: React.ComponentType<{ className?: string }>; label: string }[] = [
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm text-xs font-medium text-gray-700"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
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

/* ─── MAIN SECTION ────────────────────────────────────── */
export function AICitationsSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-indigo-500 mb-3">
            AI Citation Engine
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Get your brand cited by <span className="text-indigo-500">every AI platform</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Track, optimize, and grow your visibility across ChatGPT, Perplexity, Gemini, and every AI search engine.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* ── Card 1: Brand Visibility Tracker (large, spans 1 col + tall) ── */}
          <motion.div
            className="relative group rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50/80 p-7 flex flex-col gap-5 overflow-hidden lg:row-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ borderColor: '#c7d2fe' }}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                Track brand visibility across AI search and custom prompts.
              </h3>
              <Link href="/reddit-playbook" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors w-fit">
                Explore Reddit &amp; AI Playbook <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <PlatformPills />

            {/* Radar motion graphic fills remaining space */}
            <div className="flex-1 min-h-[220px] relative">
              <RadarMotionGraphic />
            </div>
          </motion.div>

          {/* ── Card 2: Content Score (top right) ── */}
          <motion.div
            className="relative group rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50/80 p-7 flex flex-col gap-5 overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ borderColor: '#c7d2fe' }}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                Write content that gets seen in search and AI.
              </h3>
              <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors w-fit">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Content score mock */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col gap-1.5 flex-1">
                {[85, 70, 55].map((w, i) => (
                  <motion.div
                    key={i}
                    className="h-2 rounded-full bg-gray-100"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${w}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  >
                    <div className="h-full rounded-full bg-gray-300" />
                  </motion.div>
                ))}
              </div>
              <ScoreRing score={74} label="Content score" />
            </div>
          </motion.div>

          {/* ── Card 3: Citation Growth Stats ── */}
          <motion.div
            className="relative group rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50/80 p-7 flex flex-col gap-5 overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ borderColor: '#c7d2fe' }}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                AI citation reach across platforms.
              </h3>
            </div>

            <AnimatedBars />

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter target={12400} suffix="+" />
                </span>
                <span className="text-xs text-gray-500">Citations this month</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-emerald-500">+34%</span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            </div>
          </motion.div>

          {/* ── Card 4: Global AI Localization ── */}
          <motion.div
            className="relative group rounded-2xl border border-gray-200 bg-gradient-to-br from-indigo-50/50 to-white p-7 flex flex-col justify-between gap-4 overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ borderColor: '#c7d2fe' }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
              Optimize for global markets with AI&#8209;localization.
            </h3>
            {/* Animated globe dots */}
            <div className="flex items-center gap-3">
              {['🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇯🇵', '🇮🇳', '🇧🇷'].map((flag, i) => (
                <motion.span
                  key={i}
                  className="text-xl"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
                >
                  {flag}
                </motion.span>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-3xl font-bold text-gray-900">
                <AnimatedCounter target={42} />
              </span>
              <span className="text-sm text-gray-500">languages supported</span>
            </div>
          </motion.div>

          {/* ── Card 5: Technical SEO Deploy ── */}
          <motion.div
            className="relative group rounded-2xl border border-gray-200 bg-gradient-to-br from-emerald-50/40 to-white p-7 flex flex-col justify-between gap-4 overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ borderColor: '#a7f3d0' }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
              Deploy technical SEO fixes to your website — no devs needed.
            </h3>
            <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors w-fit">
              Learn more <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {/* Mini terminal mock */}
            <div className="rounded-lg bg-gray-900 p-3 font-mono text-[11px] leading-relaxed">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="text-emerald-400">$</span>
                <span className="text-gray-300"> miracle deploy --seo</span>
                <br />
                <span className="text-gray-500">✓ Schema markup applied</span>
                <br />
                <span className="text-gray-500">✓ Meta tags optimized</span>
                <br />
                <span className="text-emerald-400">✓ 47 fixes deployed successfully</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
