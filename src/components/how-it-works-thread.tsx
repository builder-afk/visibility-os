"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FileCode, Sparkles, MessageSquare, Flame, Check, Paperclip, Send } from 'lucide-react'

export function HowItWorksThread() {
  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-body">
      
      {/* Cursive Handwriting Overline */}
      <div className="text-center mb-3">
        <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
          how it works
        </span>
      </div>

      {/* Main Bold Headline */}
      <div className="text-center mb-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight uppercase">
          NO FORMS. NO HOOPS. JUST THIS.
        </h2>
      </div>

      {/* Sticky Tag Note */}
      <div className="text-center mb-10">
        <span className="inline-block bg-[#fef3c7] text-[#b45309] border border-[#fde68a] px-3.5 py-1 rounded text-xs font-bold shadow-xs">
          One thread, zero chaos. Here's how it goes.
        </span>
      </div>

      {/* Thread Window Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        {/* Thread Header */}
        <div className="bg-[#f8fafc] border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#18a0fb]" />
            <span className="font-mono text-xs font-bold text-slate-700">
              miracle × your-brand
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5 overflow-hidden">
              <div className="w-5 h-5 rounded-full bg-[#ff5500] text-white flex items-center justify-center text-[9px] font-black ring-2 ring-white">
                M
              </div>
              <div className="w-5 h-5 rounded-full bg-[#18a0fb] text-white flex items-center justify-center text-[9px] font-black ring-2 ring-white">
                Y
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              2 online
            </span>
          </div>
        </div>

        {/* Thread Message Stream */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* STEP 1 */}
          <div>
            <div className="flex items-center justify-center mb-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff5500] uppercase bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                01 · SUBSCRIBE
              </span>
            </div>

            <div className="space-y-3">
              {/* User message */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#18a0fb] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  Y
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">You</span>
                    <span className="text-[10px] font-mono text-slate-400">10:02</span>
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-xs px-4 py-2 text-xs font-medium text-slate-800">
                    subscribed. let's build 🚀
                  </div>
                </div>
              </div>

              {/* Miracle response */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  M
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                    <span className="text-[10px] font-mono text-slate-400">10:03</span>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl rounded-tl-xs px-4 py-2 text-xs font-medium text-slate-800">
                    you're in ✨ what's the vision?
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-center mb-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff5500] uppercase bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                02 · SEND IT OVER
              </span>
            </div>

            <div className="space-y-3">
              {/* User message */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#18a0fb] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  Y
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">You</span>
                    <span className="text-[10px] font-mono text-slate-400">10:31</span>
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-xs px-4 py-2 text-xs font-medium text-slate-800 space-y-2">
                    <p>brief's in. probably overkill on detail</p>
                    <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-600 font-semibold shadow-xs">
                      <FileCode className="w-3.5 h-3.5 text-[#18a0fb]" />
                      homepage-brief.fig
                    </div>
                  </div>
                </div>
              </div>

              {/* Miracle response */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  M
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                    <span className="text-[10px] font-mono text-slate-400">10:32</span>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl rounded-tl-xs px-4 py-2 text-xs font-medium text-slate-800">
                    never too much. first draft in 48h.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-center mb-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff5500] uppercase bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                03 · REFINE
              </span>
            </div>

            <div className="space-y-3">
              {/* Miracle response */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  M
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                    <span className="text-[10px] font-mono text-slate-400">Day 2</span>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl rounded-tl-xs px-4 py-2 text-xs font-medium text-slate-800 space-y-2">
                    <p>here's take one 👀</p>
                    <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-600 font-semibold shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
                      interactive-preview-v1.fig
                    </div>
                  </div>
                </div>
              </div>

              {/* User message */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#18a0fb] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  Y
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">You</span>
                    <span className="text-[10px] font-mono text-slate-400">Day 2</span>
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-xs px-4 py-2 text-xs font-medium text-slate-800 space-y-1.5">
                    <p>did you read my mind? bolder hero though</p>
                    <div className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-700">
                      <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                      <span>2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Miracle response */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  M
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                    <span className="text-[10px] font-mono text-slate-400">Day 2</span>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl rounded-tl-xs px-4 py-2 text-xs font-medium text-slate-800">
                    on it. change anything, as often as you want.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-center mb-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff5500] uppercase bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                04 · SHIP IT
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#ff5500] text-white flex items-center justify-center text-xs font-bold shrink-0">
                M
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900">Miracle Studio</span>
                  <span className="text-[10px] font-mono text-slate-400">Day 3</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl rounded-tl-xs px-4 py-2 text-xs font-bold text-emerald-900">
                  shipped ✨ go turn heads!
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
