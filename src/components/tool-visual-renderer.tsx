"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Radio, Sparkles, TrendingUp, ShieldAlert, Layers, Activity,
  Bot, MapPin, Share2, GitCompare, Link2, FileCheck, Bell,
  CheckCircle2, BarChart2, Database, Trophy, Wrench, FolderKanban,
  Zap, Cpu, ArrowUpRight, ArrowDownRight, Check, Play, Pause,
  Terminal, Server, Globe2, Search, Sliders, RefreshCw, Eye,
  ExternalLink, Download, ShieldCheck, Target, ChevronRight,
  Filter, Sparkle, AlertTriangle, Info, Copy, Calendar, DollarSign,
  Code2, CheckSquare, ListFilter, Users, FileText, ArrowRight, ArrowLeft,
  Gauge, Laptop, Smartphone, BookOpen, PenTool, Lightbulb, Settings2,
  PhoneCall, Navigation, Star, MoreVertical, ChevronDown, Flame,
  MessageSquare, Heart, Repeat, Send, BarChart, X
} from 'lucide-react'
import { MiracleMetricDeck } from '@/components/miracle-metric-deck'

/* ─────────────────────────────────────────────────────────────────────────────
   1. GBP MONITOR & LOCAL PACK TELEMETRY COCKPIT (FULLY INTERACTIVE LIGHT THEME)
───────────────────────────────────────────────────────────────────────────── */
export function GbpMonitorVisual() {
  const [selectedBar, setSelectedBar] = useState<number>(5) // Default: Tech Park
  const [activeTimeRange, setActiveTimeRange] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly')
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false)
  
  // Bottom Wave Spline time range state & dropdown
  const [waveTimeRange, setWaveTimeRange] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly')
  const [waveDropdownOpen, setWaveDropdownOpen] = useState(false)
  const [hoveredWaveIdx, setHoveredWaveIdx] = useState<number>(7) // August (Peak)

  // Bottom Table time range state & dropdown
  const [tableTimeRange, setTableTimeRange] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly')
  const [tableDropdownOpen, setTableDropdownOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<'coverage' | 'pins' | 'calls'>('calls')
  const [filterMode, setFilterMode] = useState<'all' | 'top3' | 'displaced'>('all')
  const [selectedTableRow, setSelectedTableRow] = useState<string | null>('#GP-102')

  // Multi-range dataset for Stacked Bar Chart
  const timeData = {
    Monthly: [
      { name: 'Downtown', top3: 180, total: 200, rank: '#1', metric: '640 calls/mo', views: '42.5K' },
      { name: 'North Hills', top3: 120, total: 160, rank: '#2', metric: '380 calls/mo', views: '26.8K' },
      { name: 'West End', top3: 140, total: 170, rank: '#1', metric: '490 calls/mo', views: '33.2K' },
      { name: 'Metro Mall', top3: 90, total: 150, rank: '#3', metric: '240 calls/mo', views: '18.4K' },
      { name: 'East River', top3: 110, total: 160, rank: '#2', metric: '310 calls/mo', views: '22.1K' },
      { name: 'Tech Park', top3: 195, total: 200, rank: '#1 🏆', metric: '820 calls/mo', views: '58.4K' },
      { name: 'South Bay', top3: 75, total: 130, rank: '#4', metric: '190 calls/mo', views: '14.2K' },
      { name: 'Airport Hub', top3: 135, total: 165, rank: '#2', metric: '410 calls/mo', views: '29.5K' },
      { name: 'Uptown', top3: 160, total: 180, rank: '#1', metric: '530 calls/mo', views: '38.0K' },
      { name: 'Suburbs', top3: 85, total: 140, rank: '#3', metric: '210 calls/mo', views: '15.9K' },
    ],
    Weekly: [
      { name: 'Downtown', top3: 45, total: 50, rank: '#1', metric: '160 calls/wk', views: '10.6K' },
      { name: 'North Hills', top3: 30, total: 40, rank: '#2', metric: '95 calls/wk', views: '6.7K' },
      { name: 'West End', top3: 35, total: 42, rank: '#1', metric: '122 calls/wk', views: '8.3K' },
      { name: 'Metro Mall', top3: 22, total: 38, rank: '#3', metric: '60 calls/wk', views: '4.6K' },
      { name: 'East River', top3: 28, total: 40, rank: '#2', metric: '78 calls/wk', views: '5.5K' },
      { name: 'Tech Park', top3: 49, total: 50, rank: '#1 🏆', metric: '205 calls/wk', views: '14.6K' },
      { name: 'South Bay', top3: 18, total: 32, rank: '#4', metric: '48 calls/wk', views: '3.5K' },
      { name: 'Airport Hub', top3: 34, total: 41, rank: '#2', metric: '102 calls/wk', views: '7.4K' },
      { name: 'Uptown', top3: 40, total: 45, rank: '#1', metric: '132 calls/wk', views: '9.5K' },
      { name: 'Suburbs', top3: 21, total: 35, rank: '#3', metric: '52 calls/wk', views: '3.9K' },
    ],
    Daily: [
      { name: 'Downtown', top3: 8, total: 9, rank: '#1', metric: '23 calls/day', views: '1.5K' },
      { name: 'North Hills', top3: 5, total: 7, rank: '#2', metric: '14 calls/day', views: '980' },
      { name: 'West End', top3: 6, total: 7, rank: '#1', metric: '18 calls/day', views: '1.2K' },
      { name: 'Metro Mall', top3: 3, total: 6, rank: '#3', metric: '9 calls/day', views: '650' },
      { name: 'East River', top3: 4, total: 6, rank: '#2', metric: '11 calls/day', views: '810' },
      { name: 'Tech Park', top3: 9, total: 9, rank: '#1 🏆', metric: '31 calls/day', views: '2.1K' },
      { name: 'South Bay', top3: 2, total: 5, rank: '#4', metric: '7 calls/day', views: '510' },
      { name: 'Airport Hub', top3: 5, total: 6, rank: '#2', metric: '15 calls/day', views: '1.1K' },
      { name: 'Uptown', top3: 7, total: 8, rank: '#1', metric: '19 calls/day', views: '1.4K' },
      { name: 'Suburbs', top3: 3, total: 5, rank: '#3', metric: '8 calls/day', views: '580' },
    ]
  }

  // Spline multi-range dataset
  const waveDatasets = {
    Monthly: [
      { label: 'Jan', value: '$18,400', sub: '142 calls', x: 0, y: 100 },
      { label: 'Feb', value: '$21,200', sub: '168 calls', x: 36, y: 92 },
      { label: 'Mar', value: '$24,800', sub: '195 calls', x: 72, y: 84 },
      { label: 'Apr', value: '$27,500', sub: '215 calls', x: 109, y: 76 },
      { label: 'May', value: '$31,400', sub: '248 calls', x: 145, y: 55 },
      { label: 'Jun', value: '$36,800', sub: '290 calls', x: 181, y: 35 },
      { label: 'Jul', value: '$33,200', sub: '260 calls', x: 218, y: 60 },
      { label: 'Aug', value: '$41,200', sub: '382 calls (Peak)', x: 254, y: 18 },
      { label: 'Sep', value: '$28,400', sub: '224 calls', x: 290, y: 95 },
      { label: 'Oct', value: '$38,900', sub: '345 calls', x: 327, y: 28 },
      { label: 'Nov', value: '$32,100', sub: '252 calls', x: 363, y: 65 },
      { label: 'Dec', value: '$35,600', sub: '280 calls', x: 400, y: 50 },
    ],
    Weekly: [
      { label: 'W1', value: '$8,200', sub: '64 calls', x: 0, y: 95 },
      { label: 'W2', value: '$9,100', sub: '72 calls', x: 57, y: 80 },
      { label: 'W3', value: '$10,400', sub: '85 calls', x: 114, y: 65 },
      { label: 'W4', value: '$12,800', sub: '102 calls (Peak)', x: 171, y: 20 },
      { label: 'W5', value: '$9,800', sub: '78 calls', x: 228, y: 70 },
      { label: 'W6', value: '$11,200', sub: '92 calls', x: 285, y: 45 },
      { label: 'W7', value: '$10,500', sub: '86 calls', x: 342, y: 60 },
      { label: 'W8', value: '$11,900', sub: '98 calls', x: 400, y: 35 },
    ],
    Daily: [
      { label: 'Mon', value: '$1,420', sub: '12 calls', x: 0, y: 85 },
      { label: 'Tue', value: '$1,680', sub: '15 calls', x: 66, y: 65 },
      { label: 'Wed', value: '$1,950', sub: '19 calls', x: 133, y: 40 },
      { label: 'Thu', value: '$2,400', sub: '26 calls (Peak)', x: 200, y: 15 },
      { label: 'Fri', value: '$2,100', sub: '22 calls', x: 266, y: 35 },
      { label: 'Sat', value: '$1,200', sub: '9 calls', x: 333, y: 95 },
      { label: 'Sun', value: '$1,350', sub: '11 calls', x: 400, y: 90 },
    ]
  }

  // Multi-range dataset for Coordinates Table
  const rawCoordinates = [
    {
      id: '#GP-101',
      name: 'Downtown Flagship (0.2 mi)',
      viewsMonthly: '42,600 views/mo',
      viewsWeekly: '9,940 views/wk',
      viewsDaily: '1,420 views/day',
      status: 'Rank #1 (Local 3-Pack)',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      isTop3: true,
      isDisplaced: false,
    },
    {
      id: '#GP-102',
      name: 'Tech Park Campus (1.2 mi)',
      viewsMonthly: '29,400 views/mo',
      viewsWeekly: '6,860 views/wk',
      viewsDaily: '980 views/day',
      status: 'Rank #1 (Local 3-Pack)',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      isTop3: true,
      isDisplaced: false,
    },
    {
      id: '#GP-103',
      name: 'West End Medical Hub (2.4 mi)',
      viewsMonthly: '19,200 views/mo',
      viewsWeekly: '4,480 views/wk',
      viewsDaily: '640 views/day',
      status: 'Rank #2 (Local 3-Pack)',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      isTop3: true,
      isDisplaced: false,
    },
    {
      id: '#GP-104',
      name: 'North Hills Corridor (3.8 mi)',
      viewsMonthly: '12,600 views/mo',
      viewsWeekly: '2,940 views/wk',
      viewsDaily: '420 views/day',
      status: 'Rank #4 (Displacing Rival)',
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      isTop3: false,
      isDisplaced: true,
    },
  ]

  const filteredCoordinates = rawCoordinates.filter(c => {
    if (filterMode === 'top3') return c.isTop3
    if (filterMode === 'displaced') return c.isDisplaced
    return true
  })

  const currentGeoZones = timeData[activeTimeRange]
  const activeZone = currentGeoZones[selectedBar]
  
  const currentWavePoints = waveDatasets[waveTimeRange]
  const safeWaveIdx = Math.min(hoveredWaveIdx, currentWavePoints.length - 1)
  const activeWavePoint = currentWavePoints[safeWaveIdx]

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-8 border border-[#e8e4da] shadow-sm font-sans">
      
      {/* ── TOP ROW: STACKED BAR CHART (LEFT) + GLOWING DONUT METER (RIGHT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* Top Left: Stacked Bar Chart & Interactive Metric Glow Badges */}
        <div className="lg:col-span-8 p-6 rounded-[28px] bg-white border border-[#e8e4da] flex flex-col justify-between shadow-2xs">
          <div>
            {/* Header with Interactive Legend & Time Range Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <h4 className="text-base font-bold text-neutral-950 tracking-tight">
                  Local 3-Pack Rankings by Radius
                </h4>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-rose-600 font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Rank 1-3 (In Pack)
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500">
                    <span className="w-2 h-2 rounded-full bg-neutral-300" /> Rank 4-10
                  </span>
                </div>
              </div>

              {/* Time Range Dropdown Selector */}
              <div className="relative">
                <button
                  onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800 font-bold cursor-pointer transition-colors"
                >
                  <span>{activeTimeRange}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${timeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {timeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-1.5 z-30 w-32 bg-white border border-[#e8e4da] rounded-2xl shadow-xl p-1.5 space-y-1 font-mono text-xs"
                    >
                      {(['Monthly', 'Weekly', 'Daily'] as const).map(range => (
                        <button
                          key={range}
                          onClick={() => { setActiveTimeRange(range); setTimeDropdownOpen(false) }}
                          className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                            activeTimeRange === range ? 'bg-neutral-900 text-white font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                          }`}
                        >
                          <span>{range}</span>
                          {activeTimeRange === range && <Check className="w-3 h-3 text-rose-400" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 3 Interactive Metric Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setSelectedMetric('coverage')}
                className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-3 ${
                  selectedMetric === 'coverage'
                    ? 'bg-rose-100/70 border-rose-400 shadow-xs ring-2 ring-rose-300'
                    : 'bg-rose-50/60 border-rose-200/80 hover:bg-rose-50'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Grid Coverage</span>
                  <span className="text-base font-black text-neutral-900 font-mono">5.0 Mi Radius</span>
                </div>
              </button>

              <button
                onClick={() => setSelectedMetric('pins')}
                className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-3 ${
                  selectedMetric === 'pins'
                    ? 'bg-amber-100/70 border-amber-400 shadow-xs ring-2 ring-amber-300'
                    : 'bg-amber-50/60 border-amber-200/80 hover:bg-amber-50'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Monitored Pins</span>
                  <span className="text-base font-black text-neutral-900 font-mono">25 Coordinates</span>
                </div>
              </button>

              <button
                onClick={() => setSelectedMetric('calls')}
                className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-3 ${
                  selectedMetric === 'calls'
                    ? 'bg-emerald-100/70 border-emerald-400 shadow-xs ring-2 ring-emerald-300'
                    : 'bg-emerald-50/60 border-emerald-200/80 hover:bg-emerald-50'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Click-to-Calls</span>
                  <span className="text-base font-black text-neutral-900 font-mono">
                    {activeTimeRange === 'Monthly' ? '3,420 / mo' : activeTimeRange === 'Weekly' ? '855 / wk' : '122 / day'}
                  </span>
                </div>
              </button>
            </div>

            {/* Stacked Bar Chart with Interactive Hover/Click Highlight */}
            <div className="h-44 w-full flex items-end justify-between gap-2 sm:gap-3 pt-6 pb-2 relative border-b border-neutral-100">
              {currentGeoZones.map((zone, idx) => {
                const isSelected = selectedBar === idx
                const maxVal = activeTimeRange === 'Monthly' ? 200 : activeTimeRange === 'Weekly' ? 50 : 10
                const heightTop3 = (zone.top3 / maxVal) * 100
                const heightRemainder = ((zone.total - zone.top3) / maxVal) * 100

                return (
                  <div
                    key={zone.name}
                    onClick={() => setSelectedBar(idx)}
                    onMouseEnter={() => setSelectedBar(idx)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeBarBadge"
                        className="absolute -top-8 px-2 py-0.5 rounded-md bg-neutral-900 text-white font-mono font-black text-[10px] whitespace-nowrap shadow-lg flex items-center gap-1 z-20"
                      >
                        <span>{zone.rank} · {zone.metric}</span>
                        <ChevronDown className="w-2.5 h-2.5" />
                      </motion.div>
                    )}

                    <div className="w-full max-w-[28px] flex flex-col items-center rounded-t-sm overflow-hidden transition-transform group-hover:scale-110">
                      {/* Top grey segment */}
                      <div
                        style={{ height: `${heightRemainder}%` }}
                        className="w-full bg-neutral-200"
                      />
                      {/* Bottom active/coral segment */}
                      <div
                        style={{ height: `${heightTop3}%` }}
                        className={`w-full transition-colors ${
                          isSelected ? 'bg-rose-500 shadow-md' : 'bg-neutral-400 group-hover:bg-rose-400'
                        }`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* X-Axis Zone Labels */}
            <div className="flex justify-between gap-1 pt-2 text-[10px] font-mono text-neutral-500">
              {currentGeoZones.map((zone, idx) => (
                <span
                  key={zone.name}
                  className={`flex-1 text-center truncate cursor-pointer transition-colors ${
                    selectedBar === idx ? 'text-rose-600 font-bold' : 'hover:text-neutral-900'
                  }`}
                  onClick={() => setSelectedBar(idx)}
                  onMouseEnter={() => setSelectedBar(idx)}
                >
                  {zone.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Top Right: Glowing Donut Progress Meter with Interactive Slices */}
        <div className="lg:col-span-4 p-6 rounded-[28px] bg-white border border-[#e8e4da] flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
              <h4 className="text-base font-bold text-neutral-950 tracking-tight">
                3-Pack Dominance
              </h4>
              <MoreVertical className="w-4 h-4 text-neutral-400 cursor-pointer" />
            </div>

            <div className="flex items-center justify-center gap-4 text-xs font-mono mb-4 text-neutral-600">
              <button
                onClick={() => setFilterMode(filterMode === 'displaced' ? 'all' : 'displaced')}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  filterMode === 'displaced' ? 'bg-neutral-200 text-neutral-900 font-bold' : 'hover:bg-neutral-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" /> Out of Pack (16%)
              </button>
              <button
                onClick={() => setFilterMode(filterMode === 'top3' ? 'all' : 'top3')}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  filterMode === 'top3' ? 'bg-rose-100 text-rose-800 font-bold' : 'hover:bg-rose-50 text-rose-600 font-bold'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> In 3-Pack (84%)
              </button>
            </div>

            {/* Donut Ring */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-2 cursor-pointer group">
              <svg className="w-full h-full -rotate-90 transition-transform group-hover:scale-105" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f1efe9"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="10"
                  strokeDasharray="210 251"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute text-center flex flex-col items-center">
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                  Total In Pack
                </span>
                <span className="text-4xl font-black text-neutral-950 font-mono tracking-tight my-0.5">
                  84%
                </span>
                <span className="text-[10px] text-emerald-700 font-mono font-bold">
                  21 / 25 Points
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#fbfaf6] border border-[#e8e4da] text-xs font-mono text-center text-neutral-700">
            Selected: <strong className="text-neutral-950">{activeZone.name}</strong> ({activeZone.metric})
          </div>
        </div>

      </div>

      {/* ── BOTTOM ROW: WAVE SPLINE CHART (LEFT) + DATA TABLE (RIGHT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Bottom Left: Interactive Wave Spline Area Chart with Working Time Range Selector */}
        <div className="lg:col-span-5 p-6 rounded-[28px] bg-white border border-[#e8e4da] flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
              <div>
                <h4 className="text-base font-bold text-neutral-950 tracking-tight">
                  Local Direction &amp; Call Value
                </h4>
                <span className="text-[10px] font-mono text-neutral-500">
                  Hover curve to inspect {waveTimeRange.toLowerCase()} data points
                </span>
              </div>
              
              {/* Working Wave Time Range Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setWaveDropdownOpen(!waveDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800 font-bold cursor-pointer transition-colors"
                >
                  <span>{waveTimeRange}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${waveDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {waveDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-1.5 z-30 w-32 bg-white border border-[#e8e4da] rounded-2xl shadow-xl p-1.5 space-y-1 font-mono text-xs"
                    >
                      {(['Monthly', 'Weekly', 'Daily'] as const).map(range => (
                        <button
                          key={range}
                          onClick={() => { setWaveTimeRange(range); setWaveDropdownOpen(false); setHoveredWaveIdx(0) }}
                          className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                            waveTimeRange === range ? 'bg-neutral-900 text-white font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                          }`}
                        >
                          <span>{range}</span>
                          {waveTimeRange === range && <Check className="w-3 h-3 text-rose-400" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Glowing Wave Spline Chart with Hoverable Interactive Nodes */}
            <div className="h-44 w-full relative flex items-end pt-6 mb-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gbpLightWave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="#f1efe9" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="0" y1="70" x2="400" y2="70" stroke="#f1efe9" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="0" y1="110" x2="400" y2="110" stroke="#e8e4da" strokeWidth="1" />

                {/* Gradient Area */}
                <path
                  d="M 0 100 Q 60 95, 120 75 T 200 20 T 260 95 T 320 30 T 400 65 L 400 120 L 0 120 Z"
                  fill="url(#gbpLightWave)"
                />

                {/* Main Stroke Line */}
                <path
                  d="M 0 100 Q 60 95, 120 75 T 200 20 T 260 95 T 320 30 T 400 65"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Interactive Points */}
                {currentWavePoints.map((pt, idx) => (
                  <circle
                    key={pt.label}
                    cx={pt.x}
                    cy={pt.y}
                    r={safeWaveIdx === idx ? 6 : 4}
                    fill={safeWaveIdx === idx ? '#f43f5e' : '#ffffff'}
                    stroke="#f43f5e"
                    strokeWidth={safeWaveIdx === idx ? 3 : 2}
                    className="cursor-pointer transition-transform"
                    onMouseEnter={() => setHoveredWaveIdx(idx)}
                  />
                ))}
              </svg>

              {/* Dynamic Floating Tooltip Bubble based on hovered point */}
              {activeWavePoint && (
                <div
                  style={{ left: `${(activeWavePoint.x / 400) * 100}%` }}
                  className="absolute top-1 -translate-x-1/2 p-2 rounded-xl bg-neutral-900 text-white font-mono text-[11px] font-bold shadow-lg border border-neutral-700 pointer-events-none transition-all whitespace-nowrap z-10"
                >
                  <span>{activeWavePoint.label}: {activeWavePoint.value} ({activeWavePoint.sub})</span>
                </div>
              )}
            </div>

            {/* Months / Weeks / Days Axis with Click/Hover Action */}
            <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
              {currentWavePoints.map((pt, idx) => (
                <button
                  key={pt.label}
                  onClick={() => setHoveredWaveIdx(idx)}
                  onMouseEnter={() => setHoveredWaveIdx(idx)}
                  className={`cursor-pointer transition-colors ${
                    safeWaveIdx === idx ? 'text-rose-600 font-bold' : 'hover:text-neutral-900'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Right: Verified Local Coordinates Table with Working Time Range Selector */}
        <div className="lg:col-span-7 p-6 rounded-[28px] bg-white border border-[#e8e4da] flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
              <h4 className="text-base font-bold text-neutral-950 tracking-tight">
                Verified Local Coordinates ({filteredCoordinates.length})
              </h4>
              
              <div className="flex items-center gap-2">
                {/* Filter Pills */}
                <div className="flex items-center gap-1 font-mono text-xs">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-2 py-1 rounded-xl transition-colors cursor-pointer text-[11px] ${
                      filterMode === 'all' ? 'bg-neutral-900 text-white font-bold' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterMode('top3')}
                    className={`px-2 py-1 rounded-xl transition-colors cursor-pointer text-[11px] ${
                      filterMode === 'top3' ? 'bg-emerald-700 text-white font-bold' : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    In Pack
                  </button>
                  <button
                    onClick={() => setFilterMode('displaced')}
                    className={`px-2 py-1 rounded-xl transition-colors cursor-pointer text-[11px] ${
                      filterMode === 'displaced' ? 'bg-amber-700 text-white font-bold' : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    Displacing
                  </button>
                </div>

                {/* Working Bottom Table Time Range Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setTableDropdownOpen(!tableDropdownOpen)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800 font-bold cursor-pointer transition-colors"
                  >
                    <span>{tableTimeRange}</span>
                    <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform ${tableDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {tableDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-0 top-full mt-1.5 z-30 w-32 bg-white border border-[#e8e4da] rounded-2xl shadow-xl p-1.5 space-y-1 font-mono text-xs"
                      >
                        {(['Monthly', 'Weekly', 'Daily'] as const).map(range => (
                          <button
                            key={range}
                            onClick={() => { setTableTimeRange(range); setTableDropdownOpen(false) }}
                            className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                              tableTimeRange === range ? 'bg-neutral-900 text-white font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                            }`}
                          >
                            <span>{range}</span>
                            {tableTimeRange === range && <Check className="w-3 h-3 text-rose-400" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Clean Telemetry Table with Working Dynamic Time Views */}
            <div className="rounded-2xl border border-neutral-200 overflow-hidden">
              <table className="w-full text-xs font-mono">
                <thead className="bg-[#fbfaf6] border-b border-neutral-200 text-left text-neutral-600 font-bold">
                  <tr>
                    <th className="p-3">Pin ID</th>
                    <th className="p-3">Location Name</th>
                    <th className="p-3">
                      {tableTimeRange === 'Monthly' ? 'Monthly Views' : tableTimeRange === 'Weekly' ? 'Weekly Views' : 'Daily Views'}
                    </th>
                    <th className="p-3 text-right">Map Pack Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 bg-white">
                  {filteredCoordinates.map((c) => {
                    const isSelected = selectedTableRow === c.id
                    const displayViews = tableTimeRange === 'Monthly' ? c.viewsMonthly : tableTimeRange === 'Weekly' ? c.viewsWeekly : c.viewsDaily

                    return (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedTableRow(c.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-rose-50/70 border-l-4 border-l-rose-500' : 'hover:bg-[#fbfaf6]'
                        }`}
                      >
                        <td className="p-3 text-neutral-400 font-bold">{c.id}</td>
                        <td className="p-3 font-bold text-neutral-900">{c.name}</td>
                        <td className="p-3 text-neutral-600 font-bold">{displayViews}</td>
                        <td className="p-3 text-right font-bold">
                          <span className={`px-2 py-0.5 rounded-md border text-[10px] ${c.badge}`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
            <span>Showing {tableTimeRange.toLowerCase()} Google Maps impression velocity</span>
            <span className="text-emerald-700 font-bold font-mono">Verified Live</span>
          </div>
        </div>

      </div>

    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. SOCIAL MEDIA MANAGER (INTERACTIVE LIGHT LUXURY VIRAL COCKPIT)
───────────────────────────────────────────────────────────────────────────── */
export function SocialMediaManagerVisual() {
  const [selectedChannel, setSelectedChannel] = useState<number>(5) // Default: r/NextJS
  const [activeRange, setActiveRange] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly')
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false)
  
  // Bottom Wave Spline time range state & dropdown
  const [waveTimeRange, setWaveTimeRange] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly')
  const [waveDropdownOpen, setWaveDropdownOpen] = useState(false)
  const [hoveredWaveIdx, setHoveredWaveIdx] = useState<number>(9) // Oct (Viral Peak)

  // Bottom Table time range state & dropdown
  const [tableTimeRange, setTableTimeRange] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly')
  const [tableDropdownOpen, setTableDropdownOpen] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<'channels' | 'drops' | 'engagement'>('engagement')
  const [filterMode, setFilterMode] = useState<'all' | 'live' | 'scheduled' | 'warmup'>('all')
  const [selectedTableRow, setSelectedTableRow] = useState<string | null>('#SM-801')

  const timeData = {
    Monthly: [
      { name: 'r/SaaS', viral: 140, total: 180, metric: '940 Upvotes', conv: '320 Signups' },
      { name: 'X / #buildinpublic', viral: 175, total: 190, metric: '420 Reposts', conv: '680 Signups' },
      { name: 'r/webdev', viral: 120, total: 160, metric: '820 Upvotes', conv: '240 Signups' },
      { name: 'LinkedIn / Tech', viral: 155, total: 180, metric: '3.4K Likes', conv: '510 Signups' },
      { name: 'r/startups', viral: 110, total: 150, metric: '670 Upvotes', conv: '190 Signups' },
      { name: 'r/NextJS', viral: 195, total: 200, metric: '1.4K Upvotes 🏆', conv: '840 Signups' },
      { name: 'X / @ai_builders', viral: 160, total: 175, metric: '310 Reposts', conv: '450 Signups' },
      { name: 'r/Artificial', viral: 130, total: 165, metric: '890 Upvotes', conv: '280 Signups' },
      { name: 'Product Hunt', viral: 185, total: 195, metric: '#1 Product of Day', conv: '1,240 Signups' },
      { name: 'LinkedIn / Growth', viral: 95, total: 140, metric: '1.8K Likes', conv: '210 Signups' },
    ],
    Weekly: [
      { name: 'r/SaaS', viral: 35, total: 45, metric: '235 Upvotes/wk', conv: '80 Signups' },
      { name: 'X / #buildinpublic', viral: 44, total: 48, metric: '105 Reposts/wk', conv: '170 Signups' },
      { name: 'r/webdev', viral: 30, total: 40, metric: '205 Upvotes/wk', conv: '60 Signups' },
      { name: 'LinkedIn / Tech', viral: 38, total: 45, metric: '850 Likes/wk', conv: '128 Signups' },
      { name: 'r/startups', viral: 28, total: 38, metric: '168 Upvotes/wk', conv: '48 Signups' },
      { name: 'r/NextJS', viral: 49, total: 50, metric: '350 Upvotes/wk 🏆', conv: '210 Signups' },
      { name: 'X / @ai_builders', viral: 40, total: 44, metric: '78 Reposts/wk', conv: '112 Signups' },
      { name: 'r/Artificial', viral: 32, total: 41, metric: '222 Upvotes/wk', conv: '70 Signups' },
      { name: 'Product Hunt', viral: 46, total: 49, metric: 'Top 3 of Week', conv: '310 Signups' },
      { name: 'LinkedIn / Growth', viral: 24, total: 35, metric: '450 Likes/wk', conv: '52 Signups' },
    ],
    Daily: [
      { name: 'r/SaaS', viral: 5, total: 6, metric: '34 Upvotes/day', conv: '12 Signups' },
      { name: 'X / #buildinpublic', viral: 6, total: 7, metric: '15 Reposts/day', conv: '24 Signups' },
      { name: 'r/webdev', viral: 4, total: 6, metric: '29 Upvotes/day', conv: '9 Signups' },
      { name: 'LinkedIn / Tech', viral: 5, total: 6, metric: '120 Likes/day', conv: '18 Signups' },
      { name: 'r/startups', viral: 4, total: 5, metric: '24 Upvotes/day', conv: '7 Signups' },
      { name: 'r/NextJS', viral: 7, total: 7, metric: '50 Upvotes/day 🏆', conv: '30 Signups' },
      { name: 'X / @ai_builders', viral: 6, total: 6, metric: '11 Reposts/day', conv: '16 Signups' },
      { name: 'r/Artificial', viral: 4, total: 6, metric: '31 Upvotes/day', conv: '10 Signups' },
      { name: 'Product Hunt', viral: 6, total: 7, metric: 'Featured Today', conv: '44 Signups' },
      { name: 'LinkedIn / Growth', viral: 3, total: 5, metric: '65 Likes/day', conv: '8 Signups' },
    ]
  }

  const waveDatasets = {
    Monthly: [
      { label: 'Jan', value: '92K Reach', sub: '2.4K upvotes', x: 0, y: 90 },
      { label: 'Feb', value: '115K Reach', sub: '3.1K upvotes', x: 36, y: 82 },
      { label: 'Mar', value: '140K Reach', sub: '4.2K upvotes', x: 72, y: 70 },
      { label: 'Apr', value: '165K Reach', sub: '5.6K upvotes', x: 109, y: 60 },
      { label: 'May', value: '190K Reach', sub: '6.8K upvotes', x: 145, y: 45 },
      { label: 'Jun', value: '240K Reach', sub: '9.2K upvotes', x: 181, y: 30 },
      { label: 'Jul', value: '210K Reach', sub: '7.8K upvotes', x: 218, y: 50 },
      { label: 'Aug', value: '280K Reach', sub: '11.4K upvotes', x: 254, y: 25 },
      { label: 'Sep', value: '195K Reach', sub: '7.2K upvotes', x: 290, y: 90 },
      { label: 'Oct', value: '480K Reach', sub: '24.8K upvotes (Peak)', x: 327, y: 12 },
      { label: 'Nov', value: '340K Reach', sub: '14.2K upvotes', x: 363, y: 35 },
      { label: 'Dec', value: '390K Reach', sub: '16.5K upvotes', x: 400, y: 28 },
    ],
    Weekly: [
      { label: 'W1', value: '45K Reach', sub: '1.8K upvotes', x: 0, y: 85 },
      { label: 'W2', value: '58K Reach', sub: '2.4K upvotes', x: 57, y: 70 },
      { label: 'W3', value: '72K Reach', sub: '3.5K upvotes', x: 114, y: 50 },
      { label: 'W4', value: '120K Reach', sub: '6.8K upvotes (Peak)', x: 171, y: 15 },
      { label: 'W5', value: '64K Reach', sub: '2.9K upvotes', x: 228, y: 65 },
      { label: 'W6', value: '88K Reach', sub: '4.2K upvotes', x: 285, y: 40 },
      { label: 'W7', value: '76K Reach', sub: '3.6K upvotes', x: 342, y: 55 },
      { label: 'W8', value: '95K Reach', sub: '5.1K upvotes', x: 400, y: 30 },
    ],
    Daily: [
      { label: 'Mon', value: '12K Reach', sub: '420 upvotes', x: 0, y: 75 },
      { label: 'Tue', value: '18K Reach', sub: '680 upvotes', x: 66, y: 50 },
      { label: 'Wed', value: '24K Reach', sub: '950 upvotes', x: 133, y: 30 },
      { label: 'Thu', value: '38K Reach', sub: '1.6K upvotes (Peak)', x: 200, y: 12 },
      { label: 'Fri', value: '28K Reach', sub: '1.1K upvotes', x: 266, y: 25 },
      { label: 'Sat', value: '14K Reach', sub: '510 upvotes', x: 333, y: 70 },
      { label: 'Sun', value: '16K Reach', sub: '620 upvotes', x: 400, y: 60 },
    ]
  }

  const rawCampaigns = [
    {
      id: '#SM-801',
      platform: 'r/NextJS: "How We Optimized Core Web Vitals to 100"',
      impressionsMonthly: '84K reach / mo',
      impressionsWeekly: '19.6K reach / wk',
      impressionsDaily: '2.8K reach / day',
      status: 'Dispatched (Rank #1 Hot)',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      category: 'live'
    },
    {
      id: '#SM-802',
      platform: 'X / @founders: "10 AI Search SEO Mistakes Hurting Rankings"',
      impressionsMonthly: '145K reach / mo',
      impressionsWeekly: '33.8K reach / wk',
      impressionsDaily: '4.8K reach / day',
      status: 'Live (340 Reposts)',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      category: 'live'
    },
    {
      id: '#SM-803',
      platform: 'LinkedIn: "The Death of Traditional Keywords in LLM Search"',
      impressionsMonthly: '62K reach / mo',
      impressionsWeekly: '14.4K reach / wk',
      impressionsDaily: '2.1K reach / day',
      status: 'Scheduled 14:00 UTC',
      badge: 'bg-blue-50 text-blue-800 border-blue-200',
      category: 'scheduled'
    },
    {
      id: '#SM-804',
      platform: 'r/SaaS: "7-Day Cold Karma Warmup Protocol for AI Founders"',
      impressionsMonthly: '38K reach / mo',
      impressionsWeekly: '8.8K reach / wk',
      impressionsDaily: '1.2K reach / day',
      status: 'Warming Up (Karma 92)',
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      category: 'warmup'
    },
  ]

  const filteredCampaigns = rawCampaigns.filter(c => {
    if (filterMode === 'live') return c.category === 'live'
    if (filterMode === 'scheduled') return c.category === 'scheduled'
    if (filterMode === 'warmup') return c.category === 'warmup'
    return true
  })

  const currentChannels = timeData[activeRange]
  const active = currentChannels[selectedChannel]
  
  const currentWavePoints = waveDatasets[waveTimeRange]
  const safeWaveIdx = Math.min(hoveredWaveIdx, currentWavePoints.length - 1)
  const activeWavePoint = currentWavePoints[safeWaveIdx]

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-8 border border-[#e8e4da] shadow-sm font-sans">
      
      {/* ── TOP ROW: STACKED BAR CHART (LEFT) + GLOWING DONUT METER (RIGHT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* Top Left: Stacked Bar Chart & Interactive Metric Badges */}
        <div className="lg:col-span-8 p-6 rounded-[28px] bg-white border border-[#e8e4da] flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <h4 className="text-base font-bold text-neutral-950 tracking-tight">
                  Cross-Platform Viral Distribution &amp; Reach
                </h4>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-cyan-700 font-bold">
                    <span className="w-2 h-2 rounded-full bg-cyan-600" /> Viral Posts (&gt;1K Reach)
                  </span>
                  <span className="flex items-center gap-1 text-neutral-500">
                    <span className="w-2 h-2 rounded-full bg-neutral-300" /> Standard Posts
                  </span>
                </div>
              </div>

              {/* Time Range Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800 font-bold cursor-pointer transition-colors"
                >
                  <span>{activeRange}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${timeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {timeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-1.5 z-30 w-32 bg-white border border-[#e8e4da] rounded-2xl shadow-xl p-1.5 space-y-1 font-mono text-xs"
                    >
                      {(['Monthly', 'Weekly', 'Daily'] as const).map(range => (
                        <button
                          key={range}
                          onClick={() => { setActiveRange(range); setTimeDropdownOpen(false) }}
                          className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                            activeRange === range ? 'bg-neutral-900 text-white font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                          }`}
                        >
                          <span>{range}</span>
                          {activeRange === range && <Check className="w-3 h-3 text-cyan-400" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 3 Interactive Metric Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => setSelectedMetric('channels')}
                className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-3 ${
                  selectedMetric === 'channels'
                    ? 'bg-cyan-100/70 border-cyan-400 shadow-xs ring-2 ring-cyan-300'
                    : 'bg-cyan-50/60 border-cyan-200/80 hover:bg-cyan-50'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Active Channels</span>
                  <span className="text-base font-black text-neutral-900 font-mono">4 Networks</span>
                </div>
              </button>

              <button
                onClick={() => setSelectedMetric('drops')}
                className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-3 ${
                  selectedMetric === 'drops'
                    ? 'bg-indigo-100/70 border-indigo-400 shadow-xs ring-2 ring-indigo-300'
                    : 'bg-indigo-50/60 border-indigo-200/80 hover:bg-indigo-50'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Queued Drops</span>
                  <span className="text-base font-black text-neutral-900 font-mono">48 Campaigns</span>
                </div>
              </button>

              <button
                onClick={() => setSelectedMetric('engagement')}
                className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer flex items-center gap-3 ${
                  selectedMetric === 'engagement'
                    ? 'bg-emerald-100/70 border-emerald-400 shadow-xs ring-2 ring-emerald-300'
                    : 'bg-emerald-50/60 border-emerald-200/80 hover:bg-emerald-50'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Total Engagement</span>
                  <span className="text-base font-black text-neutral-900 font-mono">
                    {activeRange === 'Monthly' ? '182.4K / mo' : activeRange === 'Weekly' ? '45.6K / wk' : '6.5K / day'}
                  </span>
                </div>
              </button>
            </div>

            {/* Stacked Bar Chart with Interactive Hover/Click Highlight */}
            <div className="h-44 w-full flex items-end justify-between gap-2 sm:gap-3 pt-6 pb-2 relative border-b border-neutral-100">
              {currentChannels.map((chan, idx) => {
                const isSelected = selectedChannel === idx
                const maxVal = activeRange === 'Monthly' ? 200 : activeRange === 'Weekly' ? 50 : 10
                const heightViral = (chan.viral / maxVal) * 100
                const heightRemainder = ((chan.total - chan.viral) / maxVal) * 100

                return (
                  <div
                    key={chan.name}
                    onClick={() => setSelectedChannel(idx)}
                    onMouseEnter={() => setSelectedChannel(idx)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeChannelBadge"
                        className="absolute -top-8 px-2 py-0.5 rounded-md bg-neutral-900 text-white font-mono font-black text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 z-20"
                      >
                        <span>{chan.metric}</span>
                        <ChevronDown className="w-2.5 h-2.5" />
                      </motion.div>
                    )}

                    <div className="w-full max-w-[28px] flex flex-col items-center rounded-t-sm overflow-hidden transition-transform group-hover:scale-110">
                      <div
                        style={{ height: `${heightRemainder}%` }}
                        className="w-full bg-neutral-200"
                      />
                      <div
                        style={{ height: `${heightViral}%` }}
                        className={`w-full transition-colors ${
                          isSelected ? 'bg-cyan-600 shadow-md' : 'bg-neutral-400 group-hover:bg-cyan-400'
                        }`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* X-Axis Channel Labels */}
            <div className="flex justify-between gap-1 pt-2 text-[10px] font-mono text-neutral-500">
              {currentChannels.map((chan, idx) => (
                <span
                  key={chan.name}
                  className={`flex-1 text-center truncate cursor-pointer transition-colors ${
                    selectedChannel === idx ? 'text-cyan-700 font-bold' : 'hover:text-neutral-900'
                  }`}
                  onClick={() => setSelectedChannel(idx)}
                  onMouseEnter={() => setSelectedChannel(idx)}
                >
                  {chan.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Top Right: Glowing Donut Progress Meter */}
        <div className="lg:col-span-4 p-6 rounded-[28px] bg-white border border-[#e8e4da] flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
              <h4 className="text-base font-bold text-neutral-950 tracking-tight">
                Engagement Virality
              </h4>
              <MoreVertical className="w-4 h-4 text-neutral-400 cursor-pointer" />
            </div>

            <div className="flex items-center justify-center gap-4 text-xs font-mono mb-4 text-neutral-600">
              <button
                onClick={() => setFilterMode(filterMode === 'warmup' ? 'all' : 'warmup')}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  filterMode === 'warmup' ? 'bg-neutral-200 text-neutral-900 font-bold' : 'hover:bg-neutral-50'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" /> Standard (22%)
              </button>
              <button
                onClick={() => setFilterMode(filterMode === 'live' ? 'all' : 'live')}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  filterMode === 'live' ? 'bg-cyan-100 text-cyan-800 font-bold' : 'hover:bg-cyan-50 text-cyan-700 font-bold'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" /> Viral Breakouts (78%)
              </button>
            </div>

            <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-2 cursor-pointer group">
              <svg className="w-full h-full -rotate-90 transition-transform group-hover:scale-105" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f1efe9"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="10"
                  strokeDasharray="195 251"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute text-center flex flex-col items-center">
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                  Viral Breakouts
                </span>
                <span className="text-4xl font-black text-neutral-950 font-mono tracking-tight my-0.5">
                  78%
                </span>
                <span className="text-[10px] text-emerald-700 font-mono font-bold">
                  37 of 48 Drops
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#fbfaf6] border border-[#e8e4da] text-xs font-mono text-center text-neutral-700">
            Selected: <strong className="text-neutral-950">{active.name}</strong> ({active.conv})
          </div>
        </div>

      </div>

      {/* ── BOTTOM ROW: WAVE SPLINE CHART (LEFT) + DATA TABLE (RIGHT) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Bottom Left: Interactive Wave Spline Area Chart with Working Time Range Selector */}
        <div className="lg:col-span-5 p-6 rounded-[28px] bg-white border border-[#e8e4da] flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
              <div>
                <h4 className="text-base font-bold text-neutral-950 tracking-tight">
                  Organic Impressions &amp; Referral Spikes
                </h4>
                <span className="text-[10px] font-mono text-neutral-500">
                  Hover curve to inspect {waveTimeRange.toLowerCase()} virality
                </span>
              </div>

              {/* Working Wave Time Range Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setWaveDropdownOpen(!waveDropdownOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800 font-bold cursor-pointer transition-colors"
                >
                  <span>{waveTimeRange}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${waveDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {waveDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-1.5 z-30 w-32 bg-white border border-[#e8e4da] rounded-2xl shadow-xl p-1.5 space-y-1 font-mono text-xs"
                    >
                      {(['Monthly', 'Weekly', 'Daily'] as const).map(range => (
                        <button
                          key={range}
                          onClick={() => { setWaveTimeRange(range); setWaveDropdownOpen(false); setHoveredWaveIdx(0) }}
                          className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                            waveTimeRange === range ? 'bg-neutral-900 text-white font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                          }`}
                        >
                          <span>{range}</span>
                          {waveTimeRange === range && <Check className="w-3 h-3 text-cyan-400" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="h-44 w-full relative flex items-end pt-6 mb-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="smLightWave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0891b2" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0891b2" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="30" x2="400" y2="30" stroke="#f1efe9" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="0" y1="70" x2="400" y2="70" stroke="#f1efe9" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="0" y1="110" x2="400" y2="110" stroke="#e8e4da" strokeWidth="1" />

                <path
                  d="M 0 90 Q 60 85, 120 60 T 200 15 T 260 90 T 320 25 T 400 55 L 400 120 L 0 120 Z"
                  fill="url(#smLightWave)"
                />

                <path
                  d="M 0 90 Q 60 85, 120 60 T 200 15 T 260 90 T 320 25 T 400 55"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {currentWavePoints.map((pt, idx) => (
                  <circle
                    key={pt.label}
                    cx={pt.x}
                    cy={pt.y}
                    r={safeWaveIdx === idx ? 6 : 4}
                    fill={safeWaveIdx === idx ? '#0891b2' : '#ffffff'}
                    stroke="#0891b2"
                    strokeWidth={safeWaveIdx === idx ? 3 : 2}
                    className="cursor-pointer transition-transform"
                    onMouseEnter={() => setHoveredWaveIdx(idx)}
                  />
                ))}
              </svg>

              {activeWavePoint && (
                <div
                  style={{ left: `${(activeWavePoint.x / 400) * 100}%` }}
                  className="absolute top-1 -translate-x-1/2 p-2 rounded-xl bg-neutral-900 text-white font-mono text-[11px] font-bold shadow-lg border border-neutral-700 pointer-events-none transition-all whitespace-nowrap z-10"
                >
                  <span>{activeWavePoint.label}: {activeWavePoint.value} ({activeWavePoint.sub})</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
              {currentWavePoints.map((pt, idx) => (
                <button
                  key={pt.label}
                  onClick={() => setHoveredWaveIdx(idx)}
                  onMouseEnter={() => setHoveredWaveIdx(idx)}
                  className={`cursor-pointer transition-colors ${
                    safeWaveIdx === idx ? 'text-cyan-700 font-bold' : 'hover:text-neutral-900'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Right: Scheduled Campaigns Table with Working Time Range Selector */}
        <div className="lg:col-span-7 p-6 rounded-[28px] bg-white border border-[#e8e4da] flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
              <h4 className="text-base font-bold text-neutral-950 tracking-tight">
                Scheduled AI Social Campaigns ({filteredCampaigns.length})
              </h4>
              
              <div className="flex items-center gap-2">
                {/* Filter Pills */}
                <div className="flex items-center gap-1 font-mono text-xs">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-2 py-1 rounded-xl transition-colors cursor-pointer text-[11px] ${
                      filterMode === 'all' ? 'bg-neutral-900 text-white font-bold' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterMode('live')}
                    className={`px-2 py-1 rounded-xl transition-colors cursor-pointer text-[11px] ${
                      filterMode === 'live' ? 'bg-emerald-700 text-white font-bold' : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    Live
                  </button>
                  <button
                    onClick={() => setFilterMode('scheduled')}
                    className={`px-2 py-1 rounded-xl transition-colors cursor-pointer text-[11px] ${
                      filterMode === 'scheduled' ? 'bg-blue-700 text-white font-bold' : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    Queued
                  </button>
                </div>

                {/* Working Bottom Table Time Range Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setTableDropdownOpen(!tableDropdownOpen)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800 font-bold cursor-pointer transition-colors"
                  >
                    <span>{tableTimeRange}</span>
                    <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform ${tableDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {tableDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-0 top-full mt-1.5 z-30 w-32 bg-white border border-[#e8e4da] rounded-2xl shadow-xl p-1.5 space-y-1 font-mono text-xs"
                      >
                        {(['Monthly', 'Weekly', 'Daily'] as const).map(range => (
                          <button
                            key={range}
                            onClick={() => { setTableTimeRange(range); setTableDropdownOpen(false) }}
                            className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                              tableTimeRange === range ? 'bg-neutral-900 text-white font-bold' : 'hover:bg-neutral-50 text-neutral-700'
                            }`}
                          >
                            <span>{range}</span>
                            {tableTimeRange === range && <Check className="w-3 h-3 text-cyan-400" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 overflow-hidden">
              <table className="w-full text-xs font-mono">
                <thead className="bg-[#fbfaf6] border-b border-neutral-200 text-left text-neutral-600 font-bold">
                  <tr>
                    <th className="p-3">Campaign ID</th>
                    <th className="p-3">Platform &amp; Headline Angle</th>
                    <th className="p-3">
                      {tableTimeRange === 'Monthly' ? 'Monthly Reach' : tableTimeRange === 'Weekly' ? 'Weekly Reach' : 'Daily Reach'}
                    </th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 bg-white">
                  {filteredCampaigns.map((c) => {
                    const isSelected = selectedTableRow === c.id
                    const displayReach = tableTimeRange === 'Monthly' ? c.impressionsMonthly : tableTimeRange === 'Weekly' ? c.impressionsWeekly : c.impressionsDaily

                    return (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedTableRow(c.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-cyan-50/70 border-l-4 border-l-cyan-600' : 'hover:bg-[#fbfaf6]'
                        }`}
                      >
                        <td className="p-3 text-neutral-400 font-bold">{c.id}</td>
                        <td className="p-3 font-bold text-neutral-900 max-w-[220px] truncate">{c.platform}</td>
                        <td className="p-3 text-neutral-600 font-bold">{displayReach}</td>
                        <td className="p-3 text-right font-bold">
                          <span className={`px-2 py-0.5 rounded-md border text-[10px] ${c.badge}`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
            <span>Showing {tableTimeRange.toLowerCase()} social campaign impressions</span>
            <span className="text-emerald-700 font-bold font-mono">Reddit &amp; X Webhook Verified</span>
          </div>
        </div>

      </div>

    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. WEB ANALYTICS (Real-World Privacy-First Traffic & Referrer Cockpit)
───────────────────────────────────────────────────────────────────────────── */
export function WebAnalyticsBentoVisual() {
  const barHeights = [30, 45, 65, 80, 55, 90, 75, 60, 85, 95, 100, 70, 85, 90, 65, 80, 95, 100, 85, 90, 75, 85, 95, 100]

  const referrers = [
    { source: 'google.com / organic search', visitors: '840,200', pct: '45.6%', conv: '4.8% ($40.3K)', trend: '+18.2%' },
    { source: 'news.ycombinator.com (Hacker News)', visitors: '210,500', pct: '11.4%', conv: '6.2% ($13.1K)', trend: '+42.1%' },
    { source: 'reddit.com / r/SaaS & r/webdev', visitors: '145,800', pct: '7.9%', conv: '5.1% ($7.4K)', trend: '+29.8%' },
    { source: 'twitter.com / x.com (Tech Founders)', visitors: '120,400', pct: '6.5%', conv: '3.9% ($4.7K)', trend: '+14.5%' },
  ]

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-10 border border-[#e8e4da] shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase block mb-1">
            WEB ANALYTICS &amp; VISITOR STREAM
          </span>
          <span className="text-xs text-neutral-400 font-medium">
            Privacy-First · Cookie-Free · Zero GDPR Banners Required
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-bold font-mono text-emerald-800 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> 47 Visitors Online Now
          </span>
        </div>
      </div>

      <div className="rounded-[28px] bg-[#dbece0] text-neutral-900 p-6 sm:p-8 mb-6 border border-[#c6dfcc] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <span className="px-4 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold uppercase tracking-wider">
                Traffic Acquisition Channels
              </span>
              <span className="text-xs font-bold text-neutral-700 font-mono">100% GDPR Compliant</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1 text-neutral-800">
                  <span>Organic Search (Google &amp; AI Engines)</span>
                  <span className="font-mono">54% (993K visits)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900/15 overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: '54%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1 text-neutral-800">
                  <span>Direct &amp; Bookmark Visits</span>
                  <span className="font-mono">26% (478K visits)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900/15 overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: '26%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1 text-neutral-800">
                  <span>Referrals (Hacker News, Reddit, X)</span>
                  <span className="font-mono">20% (368K visits)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900/15 overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end justify-center">
            <span className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tighter text-neutral-950 font-sans leading-none">
              1.84M
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 mt-2 font-mono">
              Unique Monthly Visitors (+24.2% MoM)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-[28px] bg-[#ebe28a] text-neutral-900 p-6 flex flex-col justify-between border border-[#d8cf75] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3.5 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold">
                Engagement Velocity
              </span>
              <span className="text-xs font-mono font-bold text-neutral-800">Avg: 3m 42s</span>
            </div>
            <p className="text-xs text-neutral-800 font-medium leading-snug mb-4">
              Real-time session duration and page depth tracked anonymously via lightweight &lt;1KB beacon.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-700 mb-1">
              <span>00:00 UTC</span>
              <span className="bg-neutral-900 text-white px-2 py-0.5 rounded-md">Peak: 4,820 / hr</span>
              <span>23:00 UTC</span>
            </div>
            <div className="h-28 flex items-end justify-between gap-1 pt-2">
              {barHeights.map((h, idx) => (
                <div
                  key={idx}
                  style={{ height: `${h}%` }}
                  className="w-1 bg-neutral-900 rounded-t-sm hover:bg-white transition-all cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#d5cde7] text-neutral-900 p-6 flex flex-col justify-between border border-[#c1b7d7] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3.5 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold">
                Conversion Yield
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-950 mb-1">
              4.82%
            </div>
            <span className="text-xs font-bold text-neutral-700 block mb-4">
              Trial Signup Conversion (+0.64% vs last month)
            </span>

            <div className="grid grid-cols-12 h-16 rounded-xl overflow-hidden mb-2 shadow-2xs">
              <div className="col-span-8 bg-neutral-900 flex flex-col justify-end p-2 text-white">
                <span className="text-[10px] font-mono font-bold">88,688 Signups</span>
              </div>
              <div className="col-span-4 bg-neutral-900/30 flex flex-col justify-end p-2 text-neutral-900">
                <span className="text-[9px] font-mono font-bold">4.8% Conv</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-neutral-900/10 p-2 rounded-2xl text-xs font-bold">
            <span className="text-neutral-700">Top Goal:</span>
            <span className="font-mono text-neutral-950">Self-Serve Pro Checkout ($129/mo)</span>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#fbc6b0] text-neutral-900 p-6 flex flex-col justify-between border border-[#eab39b] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold">
                Privacy Telemetry
              </span>
              <Settings2 className="w-4 h-4 text-neutral-800" />
            </div>

            <div className="space-y-2.5 text-xs font-bold text-neutral-900">
              <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" /> Cookie-Free IP Hash
                </span>
                <span className="text-[10px] font-mono bg-neutral-900 text-white px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors">
                <span className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-neutral-900" /> EU Data Isolation
                </span>
                <span className="text-[10px] font-mono text-neutral-700">Frankfurt Edge</span>
              </div>

              <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors">
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-neutral-900" /> Bot Filtering
                </span>
                <span className="text-[10px] font-mono text-emerald-800">99.8% Filtered</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-900/20">
            <button className="w-full py-2.5 rounded-full bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer">
              Export GDPR Compliance Audit
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-[28px] bg-white border border-[#e8e4da] shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
          <span className="px-3.5 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-700 font-mono">
            Top Referral Channels &amp; Conversion Value
          </span>
          <span className="text-xs text-neutral-500 font-mono">
            Live Attribution Model: Last-Touch Direct
          </span>
        </div>

        <div className="divide-y divide-neutral-100">
          {referrers.map((ref) => (
            <div key={ref.source} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 hover:bg-[#fbfaf6] rounded-2xl transition-colors cursor-pointer">
              <div className="flex-1">
                <div className="text-base sm:text-lg font-medium text-neutral-900">
                  {ref.source}
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 font-mono text-xs">
                <span className="text-neutral-500">{ref.visitors} visits</span>
                <span className="text-emerald-700 font-bold">{ref.trend}</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  {ref.conv}
                </span>
                <span className="text-base font-bold text-neutral-900 min-w-[70px] text-right">
                  {ref.pct}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. DATA STUDIO CONNECTORS (Looker Studio, PowerBI & BI Sync Cockpit)
───────────────────────────────────────────────────────────────────────────── */
export function DataStudioConnectorsBentoVisual() {
  const tables = [
    { name: 'Miracle Daily Keyword SERP Data', target: 'Looker Studio (Executive Dashboard)', rows: '2,450,000', sync: 'Auto-Sync 00:00 UTC', status: 'Active (120ms)' },
    { name: 'AI LLM Citation Stream & Sentiment', target: 'PowerBI (Brand Intelligence Hub)', rows: '850,200', sync: 'Hourly Webhook Push', status: 'Active (85ms)' },
    { name: 'Technical Site Audit & 404 Logs', target: 'Google Sheets (DevOps Remediation)', rows: '140,000', sync: 'Real-time WebSocket', status: 'Active (40ms)' },
    { name: 'Backlink Gap & Outreach Targets', target: 'Looker Studio (PR Sequence Pipeline)', rows: '420,000', sync: 'Daily Delta Sync', status: 'Active (110ms)' },
  ]

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-10 border border-[#e8e4da] shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase block mb-1">
            BI PIPELINE &amp; DATA WAREHOUSE SYNC
          </span>
          <span className="text-xs text-neutral-400 font-medium">
            Native Looker Studio, PowerBI, BigQuery &amp; Google Sheets Connectors
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-bold font-mono text-emerald-800 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> 4 Active Pipelines
          </span>
        </div>
      </div>

      <div className="rounded-[28px] bg-[#dbece0] text-neutral-900 p-6 sm:p-8 mb-6 border border-[#c6dfcc] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between mb-4">
              <span className="px-4 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold uppercase tracking-wider">
                BI Destination Health
              </span>
              <span className="text-xs font-bold text-neutral-700 font-mono">100% Uptime SLA</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1 text-neutral-800">
                  <span>Looker Studio Connector (Community Direct)</span>
                  <span className="font-mono">99.98% (8.4M rows/day)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900/15 overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1 text-neutral-800">
                  <span>PowerBI DirectQuery &amp; REST Endpoint</span>
                  <span className="font-mono">99.95% (4.2M rows/day)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900/15 overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1 text-neutral-800">
                  <span>Google Sheets Automated Sync</span>
                  <span className="font-mono">100% (2.2M rows/day)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900/15 overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end justify-center">
            <span className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tighter text-neutral-950 font-sans leading-none">
              14.8M
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 mt-2 font-mono">
              Rows Streamed Daily (+41.2% Volume)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-[28px] bg-[#ebe28a] text-neutral-900 p-6 flex flex-col justify-between border border-[#d8cf75] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3.5 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold">
                Query Speed
              </span>
              <span className="text-xs font-mono font-bold text-neutral-800">120ms Avg Latency</span>
            </div>
            <p className="text-xs text-neutral-800 font-medium leading-snug mb-4">
              Pre-aggregated columnar views indexed in Miracle OLAP engine for instantaneous BI widget rendering.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-900 text-white text-xs font-mono">
            <div className="flex justify-between mb-1">
              <span>Looker Cache Hit:</span>
              <span className="text-emerald-400 font-bold">96.4%</span>
            </div>
            <div className="flex justify-between">
              <span>SSL TLS 1.3:</span>
              <span className="text-emerald-400 font-bold">Encrypted</span>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#d5cde7] text-neutral-900 p-6 flex flex-col justify-between border border-[#c1b7d7] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3.5 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold">
                Connected Dashboards
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-950 mb-1">
              34 Teams
            </div>
            <span className="text-xs font-bold text-neutral-700 block mb-4">
              Enterprise Marketing &amp; SEO Squads
            </span>
          </div>

          <div className="flex items-center justify-between bg-neutral-900/10 p-2 rounded-2xl text-xs font-bold">
            <span className="text-neutral-700">OAuth Credentials:</span>
            <span className="font-mono text-emerald-800 font-bold">Auto-Renewed</span>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#fbc6b0] text-neutral-900 p-6 flex flex-col justify-between border border-[#eab39b] shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3.5 py-1 rounded-full border border-neutral-900/30 bg-white/40 text-xs font-bold">
                Connector Actions
              </span>
              <Settings2 className="w-4 h-4 text-neutral-800" />
            </div>

            <div className="space-y-2 text-xs font-bold text-neutral-900">
              <button className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors text-left cursor-pointer">
                <span>🔄 Trigger Force Refresh</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors text-left cursor-pointer">
                <span>📊 Add Looker Template</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-900/10 transition-colors text-left cursor-pointer">
                <span>🔐 Manage API Service Keys</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-900/20">
            <button className="w-full py-2.5 rounded-full bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer">
              Download Looker Studio Connector (.zip)
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-[28px] bg-white border border-[#e8e4da] shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
          <span className="px-3.5 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-700 font-mono">
            Active Real-Time Data Pipelines
          </span>
          <span className="text-xs text-neutral-500 font-mono">
            4 of 4 Connectors Verified
          </span>
        </div>

        <div className="divide-y divide-neutral-100">
          {tables.map((t) => (
            <div key={t.name} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 hover:bg-[#fbfaf6] rounded-2xl transition-colors cursor-pointer">
              <div className="flex-1">
                <div className="text-base sm:text-lg font-medium text-neutral-900">
                  {t.name}
                </div>
                <div className="text-xs text-neutral-500 font-mono">Destination: {t.target}</div>
              </div>
              <div className="flex items-center gap-6 shrink-0 font-mono text-xs">
                <span className="text-neutral-500">{t.rows} rows</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  {t.status}
                </span>
                <span className="text-xs font-bold text-neutral-800 min-w-[130px] text-right">
                  {t.sync}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   5. AI CONTENT HELPER (Interactive Writing Studio & Entity Optimizer)
───────────────────────────────────────────────────────────────────────────── */
export function AiContentHelperVisual() {
  const [copiedText, setCopiedText] = useState(false)

  const entities = [
    { name: 'Generative Engine Optimization', count: '4/4', status: 'Optimal', score: 100 },
    { name: 'Context Engineering Protocol', count: '3/3', status: 'Optimal', score: 100 },
    { name: 'JSON-LD FAQPage Schema', count: '2/2', status: 'Optimal', score: 100 },
    { name: 'Crawler Latency SLA', count: '1/3', status: 'Add 2 mentions', score: 60 },
    { name: 'AST Patch Remediation', count: '0/2', status: 'Missing Entity', score: 0 },
  ]

  const contentSnippet = `# The 2026 Guide to Generative Engine Optimization (GEO)

In modern search, capturing citations across ChatGPT-4o, Perplexity Sonar, and Claude 3.5 requires rigorous **Context Engineering** and valid **JSON-LD Schema**.

### Key Takeaways for Technical Teams:
- Implement real-time IndexNow dispatch to slash indexing latency from 48 hours to under 2 hours.
- Structure key facts in bulleted answer blocks to maximize inclusion in AI Overviews.`

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-8 border border-[#e8e4da] shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e8e4da]">
        <div>
          <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
            AI Content Optimization Studio
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase">
            Real-Time Entity Density &amp; Citation Scorer
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono font-bold text-xs">
            Content Score: 94 / 100 (Top 1%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="p-4 rounded-2xl bg-white border border-[#e8e4da]">
          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Content Quality</span>
          <span className="text-2xl font-black text-emerald-700 font-mono">94 / 100</span>
          <span className="text-[10px] text-emerald-600 block mt-1">Beats 98% of SERP rivals</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#e8e4da]">
          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Entity Coverage</span>
          <span className="text-2xl font-black text-neutral-900 font-mono">24 / 26</span>
          <span className="text-[10px] text-neutral-600 block mt-1">92% Semantic Completeness</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#e8e4da]">
          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Citation Probability</span>
          <span className="text-2xl font-black text-[#ea580c] font-mono">88.4%</span>
          <span className="text-[10px] text-neutral-600 block mt-1">High ChatGPT Citation</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#e8e4da]">
          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Readability Level</span>
          <span className="text-lg font-black text-neutral-900 block truncate">Grade 9 (Authoritative)</span>
          <span className="text-[10px] text-neutral-500 block mt-1">Clear technical prose</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-5 rounded-[24px] bg-white border border-[#e8e4da] flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100 text-xs font-bold text-neutral-700">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#ea580c]" /> Document: /blog/geo-guide.md
              </span>
              <span className="font-mono text-neutral-400">1,420 Words</span>
            </div>
            <pre className="font-mono text-xs text-neutral-800 whitespace-pre-wrap leading-relaxed">
              {contentSnippet}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3 AI Key Takeaway formatting blocks detected
            </span>
            <button
              onClick={() => { navigator.clipboard.writeText(contentSnippet); setCopiedText(true); setTimeout(() => setCopiedText(false), 2000) }}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              {copiedText ? 'Copied!' : 'Copy Optimized Draft'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 p-5 rounded-[24px] bg-white border border-[#e8e4da] shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-xs font-bold text-neutral-900 uppercase">
              Semantic Entity Density
            </span>
            <span className="text-[10px] font-mono font-bold text-neutral-500">Live SERP Comparison</span>
          </div>

          <div className="space-y-2.5">
            {entities.map((ent, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#fbfaf6] border border-[#e8e4da] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-neutral-900">{ent.name}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Count: {ent.count}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold ${
                  ent.score === 100
                    ? 'bg-emerald-100 text-emerald-800'
                    : ent.score > 0
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {ent.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-950 font-medium">
            💡 <strong>AI Tip:</strong> Adding &quot;AST Patch Remediation&quot; will increase your citation yield in Claude 3.5 by approximately <strong>+14%</strong>.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   6. SITE EXPLORER (Bespoke Domain Teardown & Backlink Matrix)
───────────────────────────────────────────────────────────────────────────── */
export function SiteExplorerVisual() {
  const [activeTab, setActiveTab] = useState<'backlinks' | 'keywords' | 'pages'>('backlinks')
  const [hoveredPoint, setHoveredPoint] = useState<{ month: string; gained: number; lost: number; net: string } | null>(null)

  const velocityPoints = [
    { month: 'Jan', gained: 420, lost: 45, net: '+375' },
    { month: 'Feb', gained: 580, lost: 60, net: '+520' },
    { month: 'Mar', gained: 740, lost: 52, net: '+688' },
    { month: 'Apr', gained: 910, lost: 74, net: '+836' },
    { month: 'May', gained: 1180, lost: 85, net: '+1,095' },
    { month: 'Jun', gained: 1420, lost: 90, net: '+1,330' },
  ]

  const topPages = [
    { path: '/product', traffic: '480,000 (26.7%)', kw: 'issue tracker for engineers', rank: '#1', dr: 88 },
    { path: '/docs/api', traffic: '320,000 (17.8%)', kw: 'linear graphql api reference', rank: '#1', dr: 88 },
    { path: '/blog/sync-engine', traffic: '210,000 (11.6%)', kw: 'realtime websocket synchronization', rank: '#2', dr: 85 },
    { path: '/changelog', traffic: '185,000 (10.2%)', kw: 'linear product updates 2026', rank: '#1', dr: 84 },
  ]

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-8 border border-[#e8e4da] shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e8e4da]">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
            Domain Architecture &amp; Backlink Intelligence
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase">
            Site Explorer: linear.app
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-white border border-[#e8e4da] p-1 rounded-full shadow-2xs">
          {(['backlinks', 'keywords', 'pages'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1 rounded-full text-xs font-bold capitalize transition-colors cursor-pointer ${
                activeTab === tab ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              {tab === 'backlinks' ? 'Backlink Velocity' : tab === 'keywords' ? 'Top Keywords' : 'Top Pages'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="p-4 rounded-2xl bg-white border border-[#e8e4da]">
          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Domain Rating (DR)</span>
          <span className="text-2xl font-black text-indigo-700 font-mono">DR 88</span>
          <span className="text-[10px] text-indigo-600 block mt-1">Top 0.1% of all domains</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#e8e4da]">
          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Referring Domains</span>
          <span className="text-2xl font-black text-neutral-900 font-mono">14,820</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">+340 net gain (30d)</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#e8e4da]">
          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Organic Keywords</span>
          <span className="text-2xl font-black text-neutral-900 font-mono">240,000</span>
          <span className="text-[10px] text-neutral-500 block mt-1">18,400 in Top 3 Positions</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#e8e4da]">
          <span className="text-[10px] font-bold text-neutral-500 uppercase block mb-1">Organic Traffic</span>
          <span className="text-2xl font-black text-emerald-700 font-mono">1.8M / mo</span>
          <span className="text-[10px] text-emerald-600 block mt-1">$240K / mo Ad Value</span>
        </div>
      </div>

      {activeTab === 'backlinks' && (
        <div className="p-5 rounded-[24px] bg-white border border-[#e8e4da] shadow-2xs">
          <div className="flex items-center justify-between mb-4 text-xs">
            <span className="font-bold text-neutral-900">Monthly Referring Domain Velocity (Hover points)</span>
            <span className="text-emerald-600 font-bold font-mono">Cumulative: +5,744 New Links</span>
          </div>

          <div className="h-40 w-full relative flex items-end mb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lightBacklinkArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 85 Q 100 70, 200 50 T 350 30 T 500 10 L 500 100 L 0 100 Z"
                fill="url(#lightBacklinkArea)"
              />
              <path
                d="M 0 85 Q 100 70, 200 50 T 350 30 T 500 10"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {velocityPoints.map((pt, i) => {
                const cx = (i / (velocityPoints.length - 1)) * 500
                const cy = [85, 70, 50, 30, 20, 10][i]
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill="#6366f1"
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-150 transition-transform"
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                )
              })}
            </svg>
          </div>

          <div className="min-h-[32px] p-2.5 rounded-xl bg-[#fbfaf6] border border-[#e8e4da] text-xs font-mono text-neutral-700 flex items-center justify-between">
            {hoveredPoint ? (
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-indigo-700">[{hoveredPoint.month} Velocity]: +{hoveredPoint.gained} Gained / -{hoveredPoint.lost} Lost</span>
                <span className="text-emerald-600 font-bold">Net Growth: {hoveredPoint.net} Referring Domains</span>
              </div>
            ) : (
              <div className="text-neutral-400 text-center w-full">
                Hover over velocity points to inspect monthly gained vs. lost links
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'pages' && (
        <div className="rounded-[24px] bg-white border border-[#e8e4da] overflow-hidden divide-y divide-neutral-100 shadow-2xs">
          {topPages.map((p) => (
            <div key={p.path} className="p-3.5 flex items-center justify-between hover:bg-[#fbfaf6] transition-colors text-xs">
              <div>
                <div className="font-bold text-neutral-900">{p.path}</div>
                <div className="text-neutral-500 font-mono">Top Keyword: &quot;{p.kw}&quot; ({p.rank})</div>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-neutral-900 block">{p.traffic}</span>
                <span className="text-[10px] text-emerald-600 font-bold">Page DR: {p.dr}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'keywords' && (
        <div className="p-4 rounded-[24px] bg-white border border-[#e8e4da] space-y-2 text-xs shadow-2xs">
          <div className="flex justify-between p-2.5 rounded-xl bg-[#fbfaf6] border border-[#e8e4da] font-medium">
            <span>&quot;issue tracker software&quot; · Vol: 28,000 / mo</span>
            <span className="text-indigo-600 font-bold font-mono">Position #1</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#fbfaf6] border border-[#e8e4da] font-medium">
            <span>&quot;modern sprint planning tool&quot; · Vol: 14,500 / mo</span>
            <span className="text-indigo-600 font-bold font-mono">Position #1</span>
          </div>
          <div className="flex justify-between p-2.5 rounded-xl bg-[#fbfaf6] border border-[#e8e4da] font-medium">
            <span>&quot;developer roadmap sync&quot; · Vol: 9,200 / mo</span>
            <span className="text-indigo-600 font-bold font-mono">Position #2</span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   7. TOP WEBSITES & GLOBAL TRAFFIC LEADERBOARD
───────────────────────────────────────────────────────────────────────────── */
export function TopWebsitesVisual() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'SaaS' | 'AI Tools' | 'E-Commerce'>('AI Tools')

  const websites = [
    { rank: 1, domain: 'chatgpt.com', category: 'AI Tools', traffic: '3.7B', change: '+18.4%', trend: 'up', trafficShare: '88%' },
    { rank: 2, domain: 'perplexity.ai', category: 'AI Tools', traffic: '240M', change: '+42.1%', trend: 'up', trafficShare: '64%' },
    { rank: 3, domain: 'claude.ai', category: 'AI Tools', traffic: '180M', change: '+29.8%', trend: 'up', trafficShare: '52%' },
    { rank: 4, domain: 'linear.app', category: 'SaaS', traffic: '14.2M', change: '+12.5%', trend: 'up', trafficShare: '38%' },
    { rank: 5, domain: 'notion.so', category: 'SaaS', traffic: '165M', change: '+8.2%', trend: 'up', trafficShare: '46%' },
  ]

  const filtered = activeCategory === 'All' ? websites : websites.filter(w => w.category === activeCategory)

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-8 border border-[#e8e4da] shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e8e4da]">
        <div>
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
            Global Index &amp; Market Share Leaderboards
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase">
            Top Websites &amp; Category Traffic Benchmarks
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-white border border-[#e8e4da] p-1 rounded-full shadow-2xs">
          {(['All', 'AI Tools', 'SaaS', 'E-Commerce'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                activeCategory === cat ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] bg-white border border-[#e8e4da] overflow-hidden shadow-2xs">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-[#fbfaf6] border-b border-[#e8e4da] text-left font-bold text-neutral-700">
            <tr>
              <th className="p-3.5 w-16">Rank</th>
              <th className="p-3.5">Website Domain</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5 text-right">Monthly Visits</th>
              <th className="p-3.5 text-right">MoM Growth</th>
              <th className="p-3.5 w-40">Traffic Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filtered.map((site) => (
              <tr key={site.domain} className="hover:bg-[#fbfaf6] transition-colors">
                <td className="p-3.5 font-black text-amber-700 font-mono">#{site.rank}</td>
                <td className="p-3.5 font-bold text-neutral-900">{site.domain}</td>
                <td className="p-3.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-bold">
                    {site.category}
                  </span>
                </td>
                <td className="p-3.5 text-right font-mono font-bold text-neutral-900">{site.traffic}</td>
                <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                  <span className="inline-flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" /> {site.change}
                  </span>
                </td>
                <td className="p-3.5">
                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: site.trafficShare }}
                      className="bg-amber-500 h-full rounded-full"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. BRAND RADAR (AI Citation & Sentiment Radar)
───────────────────────────────────────────────────────────────────────────── */
export function BrandRadarVisual() {
  const [selectedNode, setSelectedNode] = useState<string>('chatgpt')

  const nodes = [
    {
      id: 'chatgpt',
      name: 'ChatGPT-4o',
      platform: 'OpenAI Web Search',
      status: 'Cited #1 Authority',
      sentiment: '+0.88 (Highly Positive)',
      citationUrl: 'https://miracle.dev/blog/context-engineering',
      snippet: '"Miracle Studio is ranked as the leading context engineering platform for autonomous agents."',
      color: 'bg-emerald-500',
    },
    {
      id: 'perplexity',
      name: 'Perplexity Sonar',
      platform: 'Perplexity Search API',
      status: 'Rank #2 Citation',
      sentiment: '+0.92 (Authoritative)',
      citationUrl: 'https://miracle.dev/docs/geo-grid',
      snippet: '"Referenced as the primary source for local geo-grid rank tracking algorithms in 2026."',
      color: 'bg-blue-500',
    },
    {
      id: 'claude',
      name: 'Claude 3.5 Sonnet',
      platform: 'Anthropic Search',
      status: 'Top Recommendation',
      sentiment: '+0.76 (Factual)',
      citationUrl: 'https://miracle.dev/features/patches',
      snippet: '"Recommends Miracle Patches for automated AST-grounded Next.js SEO remediation."',
      color: 'bg-purple-500',
    },
    {
      id: 'reddit',
      name: 'r/SaaS Community',
      platform: 'Reddit Forum',
      status: '42 Upvotes',
      sentiment: '+0.64 (Endorsed)',
      citationUrl: 'https://reddit.com/r/SaaS/comments/seo_tools',
      snippet: '"Founders praising the automated 7-day karma warmup protocol for Reddit growth."',
      color: 'bg-orange-500',
    },
  ]

  const active = nodes.find(n => n.id === selectedNode) || nodes[0]

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-8 border border-[#e8e4da] shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e8e4da]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
              Live AI Citation Radar
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-neutral-950">
            Generative Search Share of Voice
          </h3>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-white border border-[#e8e4da] text-xs font-mono text-emerald-700 font-bold shadow-2xs">
          Latency: &lt; 45s Real-Time
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-6 relative h-72 w-full flex items-center justify-center bg-white rounded-[24px] border border-[#e8e4da] overflow-hidden shadow-2xs">
          <div className="absolute w-56 h-56 rounded-full border border-neutral-200 pointer-events-none" />
          <div className="absolute w-40 h-40 rounded-full border border-neutral-200 pointer-events-none" />
          <div className="absolute w-24 h-24 rounded-full border border-neutral-300 pointer-events-none" />

          <div className="z-10 w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ea580c] to-amber-500 text-white flex flex-col items-center justify-center font-black text-xs shadow-md">
            <span>YOU</span>
            <span className="text-[8px] font-mono text-orange-100">CORE</span>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(234, 88, 12, 0.15) 360deg)',
            }}
          />

          {nodes.map((node, i) => {
            const positions = [
              { x: '25%', y: '25%' },
              { x: '75%', y: '28%' },
              { x: '30%', y: '75%' },
              { x: '72%', y: '72%' },
            ]
            const isSelected = selectedNode === node.id
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                style={{ left: positions[i].x, top: positions[i].y }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${node.color} ring-4 ${isSelected ? 'ring-neutral-900' : 'ring-white'}`} />
                <span className="text-[10px] font-bold text-neutral-800 block mt-1">{node.name}</span>
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-6 space-y-3">
          <div className="p-5 rounded-[24px] bg-white border border-[#e8e4da] shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-sm font-bold text-neutral-900">{active.name} ({active.platform})</span>
              <span className="text-xs font-bold text-emerald-700 font-mono">{active.sentiment}</span>
            </div>
            <p className="text-xs text-neutral-700 font-mono bg-[#fbfaf6] p-3 rounded-xl border border-[#e8e4da] mb-3">
              {active.snippet}
            </p>
            <div className="text-xs text-neutral-500 flex items-center justify-between">
              <span className="truncate max-w-[260px]">{active.citationUrl}</span>
              <span className="text-emerald-700 font-bold">{active.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-[#e8e4da] text-center shadow-2xs">
              <span className="text-[10px] font-bold text-neutral-500 uppercase block">Share of Voice</span>
              <span className="text-xl font-black text-neutral-900">41.8%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-[#e8e4da] text-center shadow-2xs">
              <span className="text-[10px] font-bold text-neutral-500 uppercase block">Total LLM Citations</span>
              <span className="text-xl font-black text-emerald-700">1,240 / mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   9. LINK INTERSECT & 3-DOMAIN MATRIX
───────────────────────────────────────────────────────────────────────────── */
export function LinkIntersectVisual() {
  const [selected, setSelected] = useState(0)

  const targets = [
    { domain: 'g2.com/categories/seo-tools', type: 'Review Directory', dr: 92, traffic: '4.2M', gap: 'Links to HubSpot & Salesforce (0 to you)' },
    { domain: 'capterra.com/compare/b2b-seo', type: 'Buyer Guide', dr: 88, traffic: '1.8M', gap: 'Links to HubSpot & Salesforce (0 to you)' },
    { domain: 'techradar.com/best-seo-2026', type: 'Editorial List', dr: 91, traffic: '850K', gap: 'Links to HubSpot & Salesforce (0 to you)' },
  ]

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-8 border border-[#e8e4da] shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#e8e4da]">
        <div>
          <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Backlink Gap Intelligence
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-neutral-950 uppercase">
            3-Domain Link Gap &amp; Intersection Studio
          </h3>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold font-mono">
          145 Shared Prospects Found
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
          <span className="text-xs font-bold text-blue-900 block mb-1">HubSpot.com</span>
          <div className="text-xl font-black text-blue-950">420 Backlinks</div>
          <span className="text-[11px] text-blue-700 font-medium">275 Exclusive</span>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300">
          <span className="text-xs font-bold text-emerald-900 block mb-1">The Golden Intersect</span>
          <div className="text-xl font-black text-emerald-950">145 Shared Targets</div>
          <span className="text-[11px] text-emerald-700 font-bold">24.8% Average Outreach Win Rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
          <span className="text-xs font-bold text-purple-900 block mb-1">Salesforce.com</span>
          <div className="text-xl font-black text-purple-950">380 Backlinks</div>
          <span className="text-[11px] text-purple-700 font-medium">235 Exclusive</span>
        </div>
      </div>

      <div className="rounded-[24px] bg-white border border-[#e8e4da] overflow-hidden divide-y divide-neutral-100 shadow-2xs">
        {targets.map((t, idx) => (
          <div
            key={t.domain}
            onClick={() => setSelected(idx)}
            className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
              selected === idx ? 'bg-teal-50/80 border-l-4 border-l-teal-600' : 'hover:bg-[#fbfaf6]'
            }`}
          >
            <div>
              <div className="font-bold text-xs sm:text-sm text-neutral-900">{t.domain}</div>
              <div className="text-[11px] text-neutral-500 font-medium">{t.gap}</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-neutral-900 block font-mono">DR {t.dr}</span>
              <span className="text-[10px] text-neutral-500 font-mono">{t.traffic} / mo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   10. BOT ANALYTICS (Live Crawler Log Terminal)
───────────────────────────────────────────────────────────────────────────── */
export function BotAnalyticsVisual() {
  const logs = [
    { time: '12:15:18', bot: 'GPTBot/1.2 (OpenAI)', path: '/blog/context-engineering', status: '200 OK', latency: '18ms' },
    { time: '12:15:12', bot: 'ClaudeBot/1.0 (Anthropic)', path: '/docs/api-reference', status: '200 OK', latency: '12ms' },
    { time: '12:14:55', bot: 'Bingbot/2.0 (IndexNow)', path: '/pricing', status: '304 Not Modified', latency: '9ms' },
    { time: '12:14:41', bot: 'Googlebot/2.1', path: '/features/rank-tracker', status: '200 OK', latency: '22ms' },
  ]

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-8 border border-[#e8e4da] shadow-sm font-sans">
      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#e8e4da]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-bold text-neutral-700">
            edge-crawler-access.log · Real-Time Reverse-DNS Verified
          </span>
        </div>
        <span className="text-xs font-mono text-emerald-700 font-bold">25+ Verified AI Crawlers</span>
      </div>

      <div className="space-y-2 font-mono text-xs overflow-x-auto py-2">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-neutral-200/60 hover:bg-white px-2 rounded-xl transition-colors">
            <span className="text-neutral-400 shrink-0">{log.time}</span>
            <span className="text-indigo-700 font-bold shrink-0">{log.bot}</span>
            <span className="text-neutral-800 truncate flex-1">{log.path}</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">{log.status}</span>
            <span className="text-neutral-500 text-[11px] shrink-0">{log.latency}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   11. PATCHES (Interactive AST Code Diff Viewer)
───────────────────────────────────────────────────────────────────────────── */
export function PatchesVisual() {
  const [copied, setCopied] = useState(false)

  const codeDiff = `// Next.js App Router: app/layout.tsx
- export const metadata = { title: "Miracle" }
+ export const metadata: Metadata = {
+   metadataBase: new URL('https://miracle.dev'),
+   title: { default: 'Miracle Studio', template: '%s | Miracle Studio' },
+   description: 'Enterprise AI Search & Technical SEO Suite',
+   openGraph: { type: 'website', locale: 'en_US', url: 'https://miracle.dev' },
+   twitter: { card: 'summary_large_image', creator: '@miracle' }
+ };`

  return (
    <div className="rounded-[36px] bg-[#fbfaf6] text-neutral-900 p-6 sm:p-8 border border-[#e8e4da] shadow-sm font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#e8e4da]">
        <div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">
            AST-Grounded Code Patch Generator
          </span>
          <h4 className="text-lg font-bold text-neutral-950">Next.js App Router Metadata Patch</h4>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(codeDiff); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
          className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
        >
          {copied ? 'Copied Diff!' : '1-Click Create GitHub PR'}
        </button>
      </div>

      <pre className="p-4 rounded-2xl bg-white border border-[#e8e4da] font-mono text-xs text-neutral-800 overflow-x-auto leading-relaxed shadow-2xs">
        <code>{codeDiff}</code>
      </pre>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MASTER ROUTER COMPONENT: 100% Bespoke Real-World Data Visualizer Per Tool
───────────────────────────────────────────────────────────────────────────── */
export function ToolVisualRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case 'gbp-monitor':
      return <GbpMonitorVisual />

    case 'social-media-manager':
      return <SocialMediaManagerVisual />

    case 'web-analytics':
      return <WebAnalyticsBentoVisual />

    case 'data-studio-connectors':
      return <DataStudioConnectorsBentoVisual />

    case 'ai-content-helper':
    case 'content-explorer':
    case 'keywords-explorer':
      return <AiContentHelperVisual />

    case 'site-explorer':
      return <SiteExplorerVisual />

    case 'top-websites':
      return <TopWebsitesVisual />

    case 'brand-radar':
    case 'custom-prompts':
      return <BrandRadarVisual />

    case 'link-intersect':
    case 'domain-comparison':
    case 'batch-analysis':
    case 'content-gap':
      return <LinkIntersectVisual />

    case 'bot-analytics':
    case 'indexnow':
    case 'email-alerts':
      return <BotAnalyticsVisual />

    case 'patches':
      return <PatchesVisual />

    case 'rank-tracker':
    case 'traffic-checker':
    case 'dashboard':
    case 'gsc-insights':
    case 'portfolios':
    case 'site-audit':
    case 'seo-checker':
    case 'ai-tech-seo':
    default:
      return <MiracleMetricDeck title="YOUR VISIBILITY GOAL" subtitle="AI Search Footprint, Real-Time SERP Trajectory, and Valuation" />
  }
}
