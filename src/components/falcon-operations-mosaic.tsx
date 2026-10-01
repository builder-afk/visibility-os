"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Eye,
  Workflow,
  Zap,
  Sparkles,
  Check,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Activity,
  ChevronRight,
  Bot,
} from 'lucide-react'

/* ─── Shared Grid Mesh Component matching Explore Our Ecosystem ─── */

function CardMesh() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity z-[1]"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        maskImage: 'radial-gradient(circle at center top, black 0%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center top, black 0%, transparent 80%)',
      }}
    />
  )
}

/* ─── Card 1: Instant Visibility ─── */

function InstantVisibilityCard() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const barHeights = [20, 33, 48, 56, 51, 47, 39, 31, 53, 55, 60, 56, 100, 92, 76, 67, 62, 65, 59, 70, 74, 87, 83, 77]
  const activeBar = 12

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col h-full rounded-[22px] overflow-hidden border border-slate-200/80 bg-[#F4F8F9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Radial Gradient – Amber/Gold theme */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #FFB347 0%, #F9ED96 32%, #F8FAFC 65%, #FFFFFF 100%)',
        }}
      />
      <CardMesh />

      {/* Top Visual Area – Bar Chart */}
      <div className="relative z-10 flex-1 p-5 pt-6 flex flex-col">
        {/* Timeline Labels */}
        <div className="flex items-center justify-between mb-4 text-[10px] font-semibold text-amber-600/80 tracking-wider">
          <span>06 AM</span>
          <div className="flex-1 mx-3 h-px bg-amber-300/30" />
          <span>12 PM</span>
          <div className="flex-1 mx-3 h-px bg-amber-300/30" />
          <span>06 PM</span>
        </div>

        {/* Bars */}
        <div className="flex items-end gap-[2px] flex-1 min-h-[120px]">
          {barHeights.map((h, i) => {
            const isActive = i === activeBar
            const isHovered = hoveredBar === i
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.025, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                className={`flex-1 rounded-t-sm cursor-pointer transition-colors duration-150 ${
                  isActive
                    ? 'shadow-[0_4px_14px_rgba(255,105,0,0.3)]'
                    : isHovered
                    ? 'bg-amber-400/60'
                    : 'bg-slate-300/50'
                }`}
                style={
                  isActive
                    ? {
                        background:
                          'linear-gradient(180deg, #FFB347 0%, #F5C344 30%, #ff6900 65%, #e85d04 100%)',
                      }
                    : undefined
                }
              />
            )
          })}
        </div>

        {/* Axis Labels */}
        <div className="flex items-center justify-between mt-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400">
          <span>START</span>
          <span>ACTIVE</span>
          <span>PEAK</span>
          <span>COMPLETE</span>
        </div>

        {/* Floating Value Chip */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-black/8 text-xs font-black text-slate-900"
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          $4.7M
        </motion.div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-5 bg-gradient-to-t from-white via-white/95 to-transparent pt-3 border-t border-slate-100/60">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900/5 text-slate-800 flex items-center justify-center group-hover:bg-[#ff5500] group-hover:text-white transition-colors">
              <Eye className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#ff5500] transition-colors leading-tight">
              Instant Visibility
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Real-time data across your operations.
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Card 2: Autonomous Workflows ─── */

function AutonomousWorkflowsCard() {
  const [isTyping, setIsTyping] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col h-full rounded-[22px] overflow-hidden border border-slate-200/80 bg-[#F4F8F9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Radial Gradient – Indigo/Purple theme */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #818CF8 0%, #C084FC 32%, #F8FAFC 65%, #FFFFFF 100%)',
        }}
      />
      <CardMesh />

      {/* Top Visual Area – AI Assistant */}
      <div className="relative z-10 flex-1 p-5 pt-6 flex flex-col items-center">
        {/* Falcon AI Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200/80 shadow-xs mb-5">
          <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-indigo-600 fill-indigo-600" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">Falcon AI</span>
        </div>

        {/* Question */}
        <p className="text-sm font-semibold text-slate-700 text-center mb-4">
          How can I help you automate?
        </p>

        {/* Prompt Box */}
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-3.5 shadow-xs">
          <p className="text-[11px] text-slate-600 leading-relaxed">
            When a new lead is captured in WebFlow, create a deal in HubSpot and notify the sales team on Slack.
          </p>
        </div>

        {/* Automate Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsTyping(!isTyping)}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-[0_4px_16px_rgba(99,102,241,0.35)] hover:shadow-[0_6px_24px_rgba(99,102,241,0.45)] transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Automate
        </motion.button>

        {/* Floating Cursor */}
        <motion.div
          animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-6 bottom-4 z-20 pointer-events-none"
        >
          <svg className="w-5 h-6 drop-shadow-md" viewBox="0 0 24 28" fill="none">
            <path
              d="M3 2L3 23L8.5 17.5L13.5 27L16.5 25.5L11.5 16.5L19 16.5L3 2Z"
              fill="#ffffff"
              stroke="#2b2b2b"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-5 bg-gradient-to-t from-white via-white/95 to-transparent pt-3 border-t border-slate-100/60">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900/5 text-slate-800 flex items-center justify-center group-hover:bg-[#ff5500] group-hover:text-white transition-colors">
              <Workflow className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#ff5500] transition-colors leading-tight">
              Autonomous Workflows
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Automate processes with Falcon AI.
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Card 3: Faster Decisions ─── */

function FasterDecisionsCard() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col h-full rounded-[22px] overflow-hidden border border-slate-200/80 bg-[#F4F8F9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Radial Gradient – Emerald/Green theme */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #34D399 0%, #A7F3D0 32%, #F8FAFC 65%, #FFFFFF 100%)',
        }}
      />
      <CardMesh />

      {/* Top Visual Area – Metrics & Decision Flow */}
      <div className="relative z-10 flex-1 p-5 pt-6 flex flex-col">
        {/* Metric Header */}
        <div className="mb-4">
          <span className="text-[10px] font-semibold text-emerald-600/80 uppercase tracking-wider">
            Time saved
          </span>
          <div className="flex items-baseline gap-2.5 mt-1">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
              128 Hrs
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <TrendingUp className="w-3 h-3" />
              ↑ 18%
            </span>
          </div>
        </div>

        {/* Decision Flow Visualization */}
        <div className="flex-1 flex flex-col justify-center gap-2.5">
          {/* Decision Nodes */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-400 to-emerald-200" />
            </div>
            <div className="flex-1 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-400" />
              <div className="flex-1 h-[2px] bg-gradient-to-r from-indigo-400 to-indigo-200" />
            </div>
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_2px_8px_rgba(52,211,153,0.4)]" />
          </div>

          {/* Convergence Lines */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="flex-1 h-[2px] bg-gradient-to-r from-amber-400 to-amber-200" />
            </div>
            <div className="flex-1 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <div className="flex-1 h-[2px] bg-gradient-to-r from-rose-400 to-rose-200" />
            </div>
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_2px_8px_rgba(52,211,153,0.4)]" />
          </div>
        </div>

        {/* Floating Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-emerald-200/60 text-[10px] font-bold text-emerald-700 shadow-xs"
          >
            <Check className="w-3 h-3" />
            Action: Approve
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-indigo-200/60 text-[10px] font-bold text-indigo-700 shadow-xs"
          >
            <Activity className="w-3 h-3" />
            Confidence: 98%
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-amber-200/60 text-[10px] font-bold text-amber-700 shadow-xs"
          >
            <Zap className="w-3 h-3" />
            Path +14.2%
          </motion.span>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-5 bg-gradient-to-t from-white via-white/95 to-transparent pt-3 border-t border-slate-100/60">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900/5 text-slate-800 flex items-center justify-center group-hover:bg-[#ff5500] group-hover:text-white transition-colors">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-[#ff5500] transition-colors leading-tight">
              Faster Decisions
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Turn insights into action instantly.
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Main Export ─── */

export function FalconOperationsMosaic() {
  return (
    <section className="w-full py-8">
      {/* Section Header – matching Explore Our Ecosystem style */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent mb-3.5">
          Featured Automation Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f172a] mb-4">
          Falcon AI Operations Overview
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
          Real-time operations matrix: Instant Visibility, Autonomous Workflows, and Faster Decisions unified in one intelligent control plane.
        </p>
      </div>

      {/* 3 Cards Grid – matching Explore Ecosystem */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0 }}
          className="h-[380px]"
        >
          <InstantVisibilityCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="h-[380px]"
        >
          <AutonomousWorkflowsCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="h-[380px] sm:col-span-2 lg:col-span-1"
        >
          <FasterDecisionsCard />
        </motion.div>
      </div>
    </section>
  )
}
