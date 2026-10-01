"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, MousePointer2, Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function StudioComparisonAboutSection() {
  return (
    <section id="about" className="relative z-10 py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-[1550px] mx-auto font-body">
      
      {/* ─── SIDE BY SIDE GRID CONTAINER ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* ═══════════════════════════════════════════════════════════════
            LEFT COLUMN: WHY TEAMS SWITCH / SAME BRIEF. DIFFERENT STUDIO.
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col h-full"
        >
          {/* Cursive Handwriting Overline */}
          <div className="mb-2">
            <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
              why teams switch
            </span>
          </div>

          {/* Main Massive Bold Headline */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.05] uppercase">
              SAME BRIEF.<br />
              <span className="text-[#0f172a]">DIFFERENT STUDIO.</span>
            </h2>
          </div>

          {/* Figma Canvas Window Frame */}
          <div className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)] overflow-hidden flex-1 flex flex-col justify-between">
            {/* Figma Canvas Window Header */}
            <div className="bg-[#f8fafc] border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-semibold text-slate-700 text-[11px] sm:text-xs">the-difference.fig</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-slate-200/70 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">100%</span>
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="w-5 h-5 rounded-full bg-[#ff5500] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white">
                    M
                  </div>
                  <div className="w-5 h-5 rounded-full bg-[#18a0fb] text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white">
                    U
                  </div>
                </div>
              </div>
            </div>

            {/* Canvas Body (Comparison Columns) */}
            <div className="p-5 sm:p-7 relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] flex-1 flex flex-col justify-between">
              
              {/* Floated Cursor Badge */}
              <div className="hidden sm:flex absolute top-4 right-4 items-center gap-1 bg-[#18a0fb] text-white px-2 py-0.5 rounded-md text-[10px] font-mono shadow-md z-20 pointer-events-none">
                <MousePointer2 className="w-3 h-3 fill-current" />
                <span>You</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch relative my-auto">
                
                {/* Left Column: Most Studios (Locked State) */}
                <div className="rounded-2xl bg-slate-50/90 border border-slate-200/70 p-5 flex flex-col justify-between relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center text-slate-500">
                        <Lock className="w-3 h-3" />
                      </div>
                      <span className="font-bold text-slate-700 text-xs sm:text-sm">most studios</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded">
                      LOCKED
                    </span>
                  </div>

                  <ul className="space-y-3 text-[11px] sm:text-xs text-slate-500 font-medium">
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-2 h-2" />
                      </div>
                      <span>Pitched by seniors, built by whoever is free.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-2 h-2" />
                      </div>
                      <span>Booked out for weeks, slow to deliver.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-2 h-2" />
                      </div>
                      <span>Fat retainers plus surprise invoices.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-2 h-2" />
                      </div>
                      <span>Five calls before a single pixel.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-2 h-2" />
                      </div>
                      <span>Safe, on brand-ish, forgettable.</span>
                    </li>
                  </ul>
                </div>

                {/* Right Column: Miracle (Figma Selected Blue Bounding Box State) */}
                <div className="relative rounded-2xl bg-white border-2 border-[#18a0fb] p-5 shadow-lg flex flex-col justify-between">
                  
                  {/* Figma Corner Nodes */}
                  <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-[#18a0fb]" />
                  <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-[#18a0fb]" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-[#18a0fb]" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-[#18a0fb]" />

                  {/* Tag: Pick this one */}
                  <div className="absolute -top-3 right-3 flex items-center gap-1 bg-[#ff5500] text-white px-2 py-0.5 rounded-full text-[9px] font-bold shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>pick this one</span>
                  </div>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-[#ff5500] text-white flex items-center justify-center font-black text-[10px]">
                        M
                      </div>
                      <span className="font-extrabold text-[#0f172a] text-xs sm:text-sm">Miracle AI Studio</span>
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#18a0fb] bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                      EDITING
                    </span>
                  </div>

                  <ul className="space-y-3 text-[11px] sm:text-xs text-slate-800 font-semibold">
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Direct line to your actual AI engineer & designer.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Working prototypes & agents in days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Fixed scope, zero surprise invoices.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Less meetings. More shipping.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Custom, opinionated, high ROI.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Bar: Action & Quote */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs font-bold text-slate-800 text-center sm:text-left">
                  Same brief, same budget. <span className="text-[#ff5500]">Wildly different outcome.</span>
                </p>

                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-105"
                >
                  See the work <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>
        </motion.div>


        {/* ═══════════════════════════════════════════════════════════════
            RIGHT COLUMN: A LITTLE ABOUT US / WHAT'S UP BENTO
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-6 flex flex-col h-full"
        >
          {/* Cursive Handwriting Overline */}
          <div className="mb-2">
            <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
              a little about us
            </span>
          </div>

          {/* Main Bold Headline */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight uppercase leading-[1.05]">
              WHAT'S UP
            </h2>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-between">
            
            {/* Statement Card with Figma outline */}
            <div className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border-2 border-[#18a0fb] p-6 sm:p-7 shadow-lg relative flex flex-col justify-between">
              <div className="absolute -top-3 left-6 bg-[#18a0fb] text-white px-2.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                studio
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-3">
                <span>STATEMENT.TXT</span>
              </div>

              <div>
                <div className="text-[#ff5500] text-3xl font-serif font-bold leading-none mb-1">
                  “
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] leading-tight mb-2 tracking-tight">
                  We make people stop and ask, <br />
                  <span className="text-[#ff5500]">who made that?</span>
                </h3>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                  That reaction is the whole job. Dedicated AI systems, full-stack design, and citation growth for brands that refuse to look ordinary.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-300/70 text-xs">
                <span className="font-mono text-slate-500 text-[10px] font-semibold">
                  MIRACLE STUDIO, SINCE 2024
                </span>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AVAILABLE NOW
                </div>
              </div>
            </div>

            {/* Split Row: Metrics Card + Capabilities Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              
              {/* Metrics Card (Dark sleek card, 5 cols) */}
              <div className="sm:col-span-5 rounded-3xl bg-[#0f172a] text-white p-5 flex flex-col justify-between shadow-xl">
                <div className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-3">
                  METRICS
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-black text-white tracking-tight">
                      120<span className="text-[#ff5500]">+</span>
                    </div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                      PROJECTS SHIPPED
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-2xl font-black text-white tracking-tight flex items-center gap-1">
                      5.0<span className="text-amber-400 text-lg">★</span>
                    </div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                      AVERAGE RATING
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-2xl font-black text-white tracking-tight">
                      48<span className="text-[#ff5500]">h</span>
                    </div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                      AVG TURNAROUND
                    </p>
                  </div>
                </div>
              </div>

              {/* Capabilities & Review Stack (7 cols) */}
              <div className="sm:col-span-7 flex flex-col gap-4">
                
                {/* Capabilities Card */}
                <div className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] flex-1 flex flex-col justify-between">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-2">
                    CAPABILITIES
                  </span>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: 'UI/UX Design', icon: '🎨' },
                      { label: 'AI Agents', icon: '🤖' },
                      { label: 'AEO Citations', icon: '🚀' },
                      { label: 'Voice AI', icon: '🎙️' },
                      { label: 'Prototypes', icon: '⚡' },
                    ].map((cap, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-300/80 text-[11px] font-semibold text-slate-800 shadow-2xs"
                      >
                        <span>{cap.icon}</span>
                        <span>{cap.label}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 pt-3 mt-3 border-t border-slate-300/70">
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-1 h-2 bg-[#ff5500] animate-pulse" />
                      <span className="w-1 h-3 bg-[#ff5500] animate-pulse delay-75" />
                      <span className="w-1 h-1.5 bg-[#ff5500] animate-pulse delay-150" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-600">Live development stream</span>
                  </div>
                </div>

                {/* Review Card */}
                <div className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex text-[#ff5500] text-xs">★★★★★</div>
                    <span className="text-[9px] font-mono font-bold text-slate-500">REVIEW_07</span>
                  </div>
                  <p className="text-slate-800 text-[11px] font-semibold leading-snug mb-2">
                    “They nailed my brand voice instead of a generic designer's idea of it.”
                  </p>
                  <span className="text-[10px] font-bold text-[#0f172a] block">DIPAK VADERA · FOUNDER</span>
                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
