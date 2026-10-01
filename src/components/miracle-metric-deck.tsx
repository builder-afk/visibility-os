"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, ShieldCheck, Sparkles, Activity, Search,
  ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle,
  Zap, Bot, Layers, BarChart2, Check, RefreshCw, Filter,
  Eye, ExternalLink, Sliders, ChevronRight, Gauge, Info,
  Code2, Copy, Clock, Globe2, Sparkle, ArrowRight, ArrowLeft,
  Settings2, FileText, CheckSquare, Share2
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   LIGHT SWISS-BENTO EDITORIAL METRIC DECK
   High-end editorial aesthetic on a warm porcelain / off-white canvas with
   richly colored pastel bento cards (Sage, Ochre Gold, Soft Lilac, Coral).
───────────────────────────────────────────────────────────────────────────── */
export function MiracleMetricDeck({
  title = "YOUR VISIBILITY GOAL",
  subtitle = "AI Search Footprint, Real-Time SERP Trajectory, and Valuation"
}: {
  title?: string
  subtitle?: string
}) {
  const [roundUp, setRoundUp] = useState(true)
  const [growthMode, setGrowthMode] = useState<'Daily' | 'Weekly'>('Daily')
  const [selectedMonth, setSelectedMonth] = useState('August 2026')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [activeAction, setActiveAction] = useState<string | null>(null)

  const keywords = [
    { name: 'Enterprise AI Search', ticker: 'VOL 50K', change: '+6.2%', rank: 'Pos #1 🏆', value: '$42,600' },
    { name: 'Next.js SEO Audit Tool', ticker: 'VOL 28K', change: '+4.8%', rank: 'Pos #2', value: '$25,200' },
    { name: 'Realtime Crawler Analytics', ticker: 'VOL 18K', change: '+9.1%', rank: 'Pos #1 🏆', value: '$15,750' },
    { name: 'Generative Engine Optimization', ticker: 'VOL 34K', change: '+12.4%', rank: 'Pos #1 🏆', value: '$31,400' },
  ]

  // Vertical bar chart heights for Ochre Gold Card
  const barHeights = [45, 60, 35, 80, 55, 70, 90, 40, 65, 85, 95, 50, 75, 85, 100, 60, 70, 90, 80, 95, 65, 75, 85, 100]

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-10 border border-[#e8e4da] shadow-sm font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase block mb-1">
            {title}
          </span>
          <span className="text-xs text-neutral-400 font-medium cursor-pointer hover:text-neutral-700">
            Edit Parameters
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-full border border-neutral-300/80 bg-white text-xs font-bold text-neutral-800 hover:border-neutral-500 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer">
            Telemetry
          </button>
          <button className="px-4 py-1.5 rounded-full border border-neutral-300/80 bg-white text-xs font-bold text-neutral-800 hover:border-neutral-500 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer">
            Account
          </button>
          <button className="px-3.5 py-1.5 rounded-full border border-neutral-300/80 bg-white text-xs font-bold text-neutral-800 hover:border-neutral-500 hover:bg-neutral-50 transition-colors shadow-2xs cursor-pointer">
            EN
          </button>
        </div>
      </div>

      {/* ── HERO CARD 1: PALE SAGE / MINT GREEN HERO ── */}
      <div className="rounded-[28px] bg-[#dbece0] text-neutral-900 p-6 sm:p-8 mb-6 border border-[#c6dfcc] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Progress Bars & Toggle */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <span className="px-4 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold uppercase tracking-wider">
                Your Visibility Growth
              </span>

              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-[11px] uppercase tracking-wider text-neutral-700">Auto Optimize</span>
                <button
                  onClick={() => setRoundUp(!roundUp)}
                  className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white text-[10px] font-mono flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <span className={!roundUp ? 'text-neutral-400 font-bold' : 'text-neutral-500'}>OFF</span>
                  <span className={roundUp ? 'text-emerald-300 font-black' : 'text-neutral-500'}>ON</span>
                </button>
              </div>
            </div>

            {/* 3 Thin Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1 text-neutral-800">
                  <span>This Week (AI Overviews)</span>
                  <span className="font-mono">92%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900/15 overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1 text-neutral-800">
                  <span>This Month (SERP Top 3)</span>
                  <span className="font-mono">78%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900/15 overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1 text-neutral-800">
                  <span>This Year (Authority Citations)</span>
                  <span className="font-mono">84%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900/15 overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Giant Hero Typography Percentage */}
          <div className="text-right flex flex-col items-end justify-center">
            <span className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tighter text-neutral-950 font-sans leading-none">
              +18.4%
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 mt-2 font-mono">
              Net Organic Velocity vs Last Quarter
            </span>
          </div>
        </div>
      </div>

      {/* ── 3-COLUMN BENTO GRID: GOLD, LAVENDER, CORAL ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* ── CARD 2: OCHRE / CHARTREUSE GOLD (GROWTH) ── */}
        <div className="rounded-[28px] bg-[#ebe28a] text-neutral-900 p-6 flex flex-col justify-between border border-[#d8cf75] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3.5 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold">
                Growth
              </span>
              <div className="flex items-center bg-neutral-900/15 p-0.5 rounded-full text-[10px] font-bold">
                <button
                  onClick={() => setGrowthMode('Weekly')}
                  className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                    growthMode === 'Weekly' ? 'bg-neutral-900 text-white' : 'text-neutral-900'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setGrowthMode('Daily')}
                  className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                    growthMode === 'Daily' ? 'bg-neutral-900 text-white' : 'text-neutral-900'
                  }`}
                >
                  Daily
                </button>
              </div>
            </div>

            <p className="text-xs text-neutral-800 font-medium leading-snug mb-4">
              Calculated on average LLM citation frequency. We use real-time webhooks to score these numbers.
            </p>
          </div>

          {/* Line Bar Histogram */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-700 mb-1">
              <span>2025</span>
              <span className="bg-neutral-900 text-white px-2 py-0.5 rounded-md">$13,450 / wk</span>
              <span>2026</span>
            </div>
            <div className="h-28 flex items-end justify-between gap-1 pt-2">
              {barHeights.map((h, idx) => (
                <div
                  key={idx}
                  style={{ height: `${h}%` }}
                  className="w-1 bg-neutral-900 rounded-t-sm transition-all hover:bg-white cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── CARD 3: SOFT LILAC / MUTED LAVENDER (ENGAGEMENT) ── */}
        <div className="rounded-[28px] bg-[#d5cde7] text-neutral-900 p-6 flex flex-col justify-between border border-[#c1b7d7] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3.5 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold">
                Engagement
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-950 mb-1">
              +17.43%
            </div>
            <span className="text-xs font-bold text-neutral-700 block mb-4">
              Compared to last month
            </span>

            {/* Two-Tone Solid Block Chart */}
            <div className="grid grid-cols-12 h-16 rounded-xl overflow-hidden mb-2 shadow-2xs">
              <div className="col-span-8 bg-neutral-900 flex flex-col justify-end p-2 text-white">
                <span className="text-[10px] font-mono font-bold">+18.56%</span>
              </div>
              <div className="col-span-4 bg-neutral-900/30 flex flex-col justify-end p-2 text-neutral-900">
                <span className="text-[9px] font-mono font-bold">Est. +15.7%</span>
              </div>
            </div>
          </div>

          {/* Month Selector Bar */}
          <div className="flex items-center justify-between bg-neutral-900/10 p-2 rounded-2xl text-xs font-bold">
            <button className="p-1 hover:bg-neutral-900/15 rounded-full cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-neutral-900">{selectedMonth}</span>
            <button className="p-1 hover:bg-neutral-900/15 rounded-full cursor-pointer">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── CARD 4: WARM CORAL / PEACH (QUICK ACTIONS) ── */}
        <div className="rounded-[28px] bg-[#fbc6b0] text-neutral-900 p-6 flex flex-col justify-between border border-[#eab39b] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold">
                Quick Actions
              </span>
              <Settings2 className="w-4 h-4 cursor-pointer text-neutral-800" />
            </div>

            {/* Clean List Items with Icons */}
            <div className="space-y-2.5 text-xs font-bold text-neutral-900">
              <button
                onClick={() => setActiveAction('AST Patches Dispatched')}
                className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-neutral-900" /> Deploy AST Patches
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-700" />
              </button>

              <button
                onClick={() => setActiveAction('IndexNow Submitted')}
                className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-neutral-900" /> Push IndexNow Batch
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-700" />
              </button>

              <button
                onClick={() => setActiveAction('AI Crawler Audit Started')}
                className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-neutral-900" /> Audit AI Bot Logs
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-700" />
              </button>

              <button
                onClick={() => setActiveAction('Link Gap Targets Queued')}
                className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-neutral-900" /> Inspect Link Gaps
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-700" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-900/20">
            <button
              onClick={() => setActiveAction('Full Diagnostic Audit Executed')}
              className="w-full py-2.5 rounded-full bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              Run Diagnostic Audit
            </button>
          </div>
        </div>

      </div>

      {activeAction && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-mono flex items-center justify-between shadow-2xs"
        >
          <span>✓ {activeAction}</span>
          <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-bold">Confirmed</span>
        </motion.div>
      )}

      {/* ── BOTTOM ASSET / KEYWORD TICKER (WARM PORCELAIN WHITE SECTION) ── */}
      <div className="p-6 rounded-[28px] bg-white border border-[#e8e4da] shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
          <span className="px-3.5 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-700 font-mono">
            Tracked Commercial Queries
          </span>
          <span className="text-xs text-neutral-500 font-mono">
            Showing 4 of 240,000 Verified Keywords
          </span>
        </div>

        <div className="divide-y divide-neutral-100">
          {keywords.map((kw, idx) => (
            <div
              key={kw.name}
              onMouseEnter={() => setHoveredRow(idx)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors cursor-pointer px-3 rounded-2xl ${
                hoveredRow === idx ? 'bg-[#f8f6f0]' : ''
              }`}
            >
              <div className="flex-1">
                <div className="text-lg sm:text-xl font-medium text-neutral-900 tracking-tight">
                  {kw.name}
                </div>
              </div>

              <div className="flex items-center gap-5 shrink-0 font-mono text-xs">
                <span className="text-neutral-500">{kw.ticker}</span>
                <span className="text-emerald-700 font-bold">{kw.change}</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  {kw.rank}
                </span>
                <span className="text-lg sm:text-xl font-bold text-neutral-900 min-w-[90px] text-right">
                  {kw.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
