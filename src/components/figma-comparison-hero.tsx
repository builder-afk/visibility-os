"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight, MousePointer2, Lock, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function FigmaComparisonHero() {
  return (
    <section className="relative z-10 py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-body">
      
      {/* Cursive Handwriting Overline */}
      <div className="text-center mb-3">
        <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
          why teams switch
        </span>
      </div>

      {/* Main Massive Bold Headline */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0f172a] tracking-tight leading-[1.05] uppercase">
          SAME BRIEF.<br />
          <span className="text-[#0f172a]">DIFFERENT STUDIO.</span>
        </h1>
      </div>

      {/* Figma Canvas Window Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden"
      >
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

        {/* Canvas Body (Grid Dots & Comparison Columns) */}
        <div className="p-6 sm:p-10 relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
          
          {/* Floated Cursor Badge on Canvas */}
          <div className="hidden md:flex absolute top-12 left-4 items-center gap-1 bg-[#18a0fb] text-white px-2 py-0.5 rounded-md text-[10px] font-mono shadow-md z-20 pointer-events-none">
            <MousePointer2 className="w-3 h-3 fill-current" />
            <span>You</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
            
            {/* Left Column: Most Studios (Locked State) */}
            <div className="rounded-2xl bg-slate-50/90 border border-slate-200/70 p-6 sm:p-8 flex flex-col justify-between relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center text-slate-500">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm sm:text-base">most studios</span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 bg-slate-200/70 px-2 py-0.5 rounded">
                  LOCKED
                </span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-500 font-medium">
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-2.5 h-2.5" />
                  </div>
                  <span>Pitched by seniors, built by whoever is free.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-2.5 h-2.5" />
                  </div>
                  <span>Booked out for weeks, then slow to deliver.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-2.5 h-2.5" />
                  </div>
                  <span>Fat monthly retainer, plus surprise invoices.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-2.5 h-2.5" />
                  </div>
                  <span>Five calls and a deck before a single pixel.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-2.5 h-2.5" />
                  </div>
                  <span>Safe, on brand-ish, instantly forgettable.</span>
                </li>
              </ul>
            </div>

            {/* Center VS Badge */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#0f172a] text-white text-[11px] font-black items-center justify-center shadow-lg">
              VS
            </div>

            {/* Right Column: Miracle (Figma Selected Blue Bounding Box State) */}
            <div className="relative rounded-2xl bg-white border-2 border-[#18a0fb] p-6 sm:p-8 shadow-xl flex flex-col justify-between">
              
              {/* Figma Blue Corner Nodes */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb]" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb]" />

              {/* Tag: Pick this one */}
              <div className="absolute -top-3.5 right-6 flex items-center gap-1 bg-[#ff5500] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>pick this one</span>
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#ff5500] text-white flex items-center justify-center font-black text-xs shadow-xs">
                    M
                  </div>
                  <span className="font-extrabold text-[#0f172a] text-sm sm:text-base">Miracle AI Studio</span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#18a0fb] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  EDITING
                </span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-800 font-semibold">
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>You talk to the person actually designing & building it.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>First real prototypes & AI agents in days, not quarters.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Fixed scope, transparent price, zero surprises.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Less meetings. More shipping.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-orange-100 text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Custom, opinionated, genuinely hard to forget.</span>
                </li>
              </ul>

              {/* Bottom Selection Marker Pill */}
              <div className="absolute -bottom-3 right-6 bg-[#18a0fb] text-white px-2 py-0.5 rounded text-[9px] font-mono font-bold shadow-xs">
                MiracleAI · selected
              </div>
            </div>

          </div>

          {/* Bottom Bar: Action & Quote */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm font-bold text-slate-800 text-center sm:text-left">
              Same brief, same budget. <span className="text-[#ff5500]">Wildly different outcome.</span>
            </p>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm hover:scale-105"
            >
              See the work <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
