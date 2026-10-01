"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Sparkles, Star, MousePointer2 } from 'lucide-react'

export function WhatsUpBento() {
  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-body">
      
      {/* Cursive Handwriting Overline */}
      <div className="text-center mb-3">
        <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
          a little about us
        </span>
      </div>

      {/* Main Bold Headline */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight uppercase">
          WHAT'S UP
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Main Statement Card (Spans 8 cols) with Figma Selection Outline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-8 rounded-3xl bg-white border-2 border-[#18a0fb] p-8 sm:p-10 shadow-lg relative flex flex-col justify-between"
        >
          {/* Top Figma Tab Label */}
          <div className="absolute -top-3 left-6 bg-[#18a0fb] text-white px-2.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            studio
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-6">
            <span>STATEMENT.TXT</span>
          </div>

          <div>
            <div className="text-[#ff5500] text-3xl sm:text-4xl font-serif font-bold leading-none mb-3">
              “
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] leading-tight mb-4 tracking-tight">
              We make people stop and ask, <br />
              <span className="text-[#ff5500]">who made that?</span>
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              That reaction is the whole job. Dedicated AI agents, full-stack design, and citation growth for brands that refuse to look ordinary. No templates, ever.
            </p>
          </div>

          <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-100 text-xs">
            <span className="font-mono text-slate-400 text-[11px] font-semibold">
              MIRACLE STUDIO, SINCE 2024
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full text-[11px] border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AVAILABLE NOW
            </div>
          </div>
        </motion.div>

        {/* Metrics Card (Dark sleek card, Spans 4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-4 rounded-3xl bg-[#0f172a] text-white p-8 flex flex-col justify-between shadow-xl"
        >
          <div className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-4">
            METRICS
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                120<span className="text-[#ff5500]">+</span>
              </div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                PROJECTS SHIPPED
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-1">
                5.0<span className="text-amber-400 text-2xl">★</span>
              </div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                AVERAGE RATING
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                48<span className="text-[#ff5500]">h</span>
              </div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                HR AVG TURNAROUND
              </p>
            </div>
          </div>
        </motion.div>

        {/* Capabilities Pills Card (Spans 12 cols or split) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="md:col-span-12 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block mb-1">
              CAPABILITIES
            </span>
            <h4 className="text-lg font-bold text-[#0f172a]">
              Full-stack AI systems & design under one roof
            </h4>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              { label: 'UI/UX Design', icon: '🎨' },
              { label: 'AI Agents & Automation', icon: '🤖' },
              { label: 'AEO Citations & Search', icon: '🚀' },
              { label: 'Voice AI Systems', icon: '🎙️' },
              { label: 'Prototyping', icon: '⚡' },
              { label: 'Design Systems', icon: '📐' },
            ].map((cap, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs hover:border-[#18a0fb] hover:bg-blue-50/50 transition-colors"
              >
                <span>{cap.icon}</span>
                <span>{cap.label}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Live Tech Build Card (Spans 6 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
        >
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block mb-2">
              ▶ CURRENTLY BUILDING IN
            </span>
            <h4 className="text-xl font-bold text-[#0f172a] mb-4">
              Next.js, Webflow & n8n AI
            </h4>

            <div className="flex flex-wrap gap-2">
              {['Figma', 'Next.js', 'Framer', 'n8n', 'OpenAI', 'Claude'].map((tool, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 font-mono text-[11px] font-bold text-slate-600">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-6 mt-6 border-t border-slate-100">
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 h-3 bg-[#ff5500] animate-pulse" />
              <span className="w-1 h-4 bg-[#ff5500] animate-pulse delay-75" />
              <span className="w-1 h-2 bg-[#ff5500] animate-pulse delay-150" />
              <span className="w-1 h-3.5 bg-[#ff5500] animate-pulse" />
            </div>
            <span className="text-[11px] font-mono font-semibold text-slate-500">Live development stream</span>
          </div>
        </motion.div>

        {/* Review Quote Card (Spans 6 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="md:col-span-6 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex text-[#ff5500] text-sm">
                ★★★★★
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                REVIEW_07
              </span>
            </div>

            <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed mb-4">
              “I'd put my site off for years because nothing ever felt like me. They nailed my brand voice instead of a designer's idea of it.”
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700">
              D
            </div>
            <div>
              <span className="text-xs font-bold text-[#0f172a] block">DIPAK VADERA</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">FOUNDER, GROWTH LABS</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
