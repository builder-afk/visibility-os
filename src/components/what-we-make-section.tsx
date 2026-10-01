"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const SERVICES = [
  {
    id: "01",
    tag: "01. UI/UX & Product Design",
    title: "UI/UX Design",
    highlight: "Figma.",
    description: "Websites and apps, from first wireframe to pixel-final Figma and live responsive code.",
    preview: {
      title: "Interactive SaaS & Mobile Interfaces",
      type: "figma-board",
    },
    theWork: "We turn complex ideas into interfaces people actually enjoy using. Every screen is built to convert and scale with you.",
    deliverables: [
      "Website design",
      "App UI/UX",
      "E-commerce",
      "MVP & prototypes",
      "Design systems",
      "Wireframes",
      "User flows",
      "Design handoff",
    ]
  },
  {
    id: "02",
    tag: "02. AI Agents & CRM Automation",
    title: "AI Agents",
    highlight: "Systems.",
    description: "Custom multi-agent workflows, voice assistants, and CRM automation tailored to your business.",
    preview: {
      title: "Autonomous Workflow Orchestration",
      type: "agent-board",
    },
    theWork: "Eliminate repetitive tasks and missed leads. We build intelligent agent workflows that connect directly into your CRM and customer channels.",
    deliverables: [
      "CRM Automation",
      "Voice AI Assistants",
      "n8n Workflows",
      "Claude & OpenAI Agents",
      "Lead Qualifiers",
      "Live Chatbots",
      "API Integrations",
      "Autonomous Pipelines",
    ]
  },
  {
    id: "03",
    tag: "03. AEO Citation & AI Search",
    title: "AI Citation",
    highlight: "AEO Engine.",
    description: "Make your brand the #1 recommendation across ChatGPT, Perplexity, Gemini, and Claude.",
    preview: {
      title: "Multi-Platform AI Visibility Tracking",
      type: "aeo-board",
    },
    theWork: "Search is evolving into AI answers. We analyze LLM crawl patterns, mention gaps, and citation metrics to make you impossible to ignore.",
    deliverables: [
      "AI Visibility Audit",
      "Citation Gap Analysis",
      "LLM Crawler Tracking",
      "Brand Share of Voice",
      "Perplexity Rankings",
      "ChatGPT Citations",
      "Technical Schema Fixes",
      "Competitor AI Positioning",
    ]
  }
]

export function WhatWeMakeSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeService = SERVICES[activeIdx]

  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-body">
      
      {/* Cursive Handwriting Overline */}
      <div className="text-center mb-3">
        <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
          the good stuff
        </span>
      </div>

      {/* Main Bold Headline */}
      <div className="text-center mb-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight uppercase">
          WHAT WE MAKE
        </h2>
      </div>

      {/* Sticky Tag Note */}
      <div className="text-center mb-10">
        <span className="inline-block bg-[#fef3c7] text-[#b45309] border border-[#fde68a] px-3.5 py-1 rounded text-xs font-bold shadow-xs">
          Three core specialties, one unified canvas. Select to explore.
        </span>
      </div>

      {/* Service Selector Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {SERVICES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveIdx(idx)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeIdx === idx
                ? 'bg-[#0f172a] text-white shadow-md'
                : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
            }`}
          >
            {s.tag}
          </button>
        ))}
      </div>

      {/* Main Interactive Figma Canvas Card */}
      <motion.div
        key={activeService.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)] p-6 sm:p-10 relative overflow-hidden"
      >
        {/* Top Figma Tab */}
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff5500] mb-6 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
          {activeService.tag}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          
          {/* Left Title & Description (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="w-9 h-9 rounded-xl bg-slate-100 font-mono font-black text-sm text-slate-700 flex items-center justify-center">
              {activeService.id}
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
              {activeService.title} <br />
              <span className="text-[#ff5500]">{activeService.highlight}</span>
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {activeService.description}
            </p>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex px-4 py-2 rounded-xl bg-orange-50 border border-orange-200 text-[#ff5500] text-xs font-bold hover:bg-orange-100 transition-colors items-center gap-1.5"
              >
                SEE PROCESS + DELIVERABLES <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Interface Mockup (Spans 7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0f172a] text-white p-6 shadow-xl border border-slate-800 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <span>miracle-{activeService.id}.app</span>
            </div>

            <div className="py-6 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400">
                ● LIVE ARCHITECTURE READY
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {activeService.preview.title}
              </h4>
              <p className="text-slate-400 text-xs max-w-md">
                Engineered for speed, conversion, and effortless maintainability with zero bloated dependencies.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              <span>Status: Active</span>
              <span className="text-[#ff5500] font-bold">100% Tailored</span>
            </div>
          </div>

        </div>

        {/* Bottom Details & Deliverables Grid */}
        <div className="pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
              THE WORK
            </span>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              {activeService.theWork}
            </p>
          </div>

          <div className="md:col-span-7 space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase block">
              DELIVERABLES
            </span>
            <div className="flex flex-wrap gap-2">
              {activeService.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  )
}
