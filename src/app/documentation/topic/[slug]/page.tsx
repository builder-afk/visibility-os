"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Layers, MessageSquare, Bot, RefreshCw, Sparkles, Cpu, Wrench,
  ArrowRight, ArrowLeft, Clock, BookOpen, CheckCircle2, ShieldCheck,
  Code2, Terminal, ChevronRight, CheckSquare, BarChart2, Compass
} from 'lucide-react'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { getTopicBySlug, getAllTopics, getArticlesByCategory } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  MessageSquare,
  Bot,
  RefreshCw,
  Sparkles,
  Cpu,
  Wrench,
}

export default function TopicDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const topic = getTopicBySlug(slug)

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-body">
        <PublicNavbar className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200" />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-black text-[#0f172a] uppercase mb-3">Topic Not Found</h1>
            <p className="text-slate-600 mb-6">The topic you are looking for does not exist or has been moved.</p>
            <Link href="/documentation">
              <Button className="rounded-xl bg-[#0f172a] text-white">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Documentation
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const allTopics = getAllTopics()
  const otherTopics = allTopics.filter(t => t.slug !== topic.slug)
  const articles = getArticlesByCategory(topic.name)

  const TopicIcon = ICON_MAP[topic.iconName] || Layers

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-body selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      <PublicNavbar className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200" />

      {/* Top Breadcrumb & Hero */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/documentation" className="hover:text-[#0f172a] transition-colors">Docs</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/documentation" className="hover:text-[#0f172a] transition-colors">Topics</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{topic.name}</span>
        </div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-400/10 via-amber-300/10 to-purple-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-300/80 shadow-2xs mb-6">
              <TopicIcon className="w-4 h-4 text-[#ea580c]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                {topic.name} Playbook
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.08] mb-4 uppercase">
              {topic.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed mb-6">
              {topic.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
              {topic.description}
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-300/70 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300/80 font-bold text-slate-800 shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-[#ea580c]" />
                {topic.stats.articlesCount} Guides
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300/80 font-bold text-slate-800 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {topic.stats.avgReadTime} Avg Read
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300/80 font-bold text-slate-800 shadow-2xs">
                <BarChart2 className="w-3.5 h-3.5 text-purple-600" />
                {topic.stats.skillLevel} Level
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300/80 font-bold text-slate-800 shadow-2xs">
                <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                {topic.stats.frameworksCount} Core Frameworks
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Topic Body */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full space-y-16">
        
        {/* ── Section 1: Key Architectural Concepts ── */}
        <section>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
              Foundational Knowledge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight uppercase">
              Core Pillars of {topic.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topic.keyConcepts.map((concept, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#ea580c]/50 transition-all flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-xl bg-orange-50 border border-orange-200 text-[#ea580c] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0f172a] leading-snug">
                    {concept}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Core Code Frameworks & Blueprints ── */}
        {topic.coreFrameworks.length > 0 && (
          <section>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Technical Specifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight uppercase">
                Architecture Blueprints &amp; Frameworks
              </h2>
            </div>

            <div className="space-y-6">
              {topic.coreFrameworks.map((fw, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-md overflow-hidden"
                >
                  <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Terminal className="w-4 h-4 text-[#ea580c]" />
                        <h3 className="text-base sm:text-lg font-bold text-[#0f172a]">
                          {fw.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        {fw.description}
                      </p>
                    </div>
                  </div>

                  {fw.codeSnippet && (
                    <div className="bg-[#0f172a] p-5 sm:p-6 overflow-x-auto">
                      <pre className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                        <code>{fw.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Section 3: Recommended Reading Order (Curriculum) ── */}
        <section>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-1">
              Curated Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight uppercase">
              Recommended Reading Order
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Follow this sequence from beginner foundations to advanced production implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {articles.map((article, idx) => (
              <Link
                key={article.slug}
                href={`/documentation/${article.slug}`}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-[#ea580c] hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-mono font-bold">
                      STEP {idx + 1}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0f172a] group-hover:text-[#ea580c] transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {article.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <span className="font-semibold text-slate-500">{article.author}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-[#ea580c] group-hover:translate-x-1 transition-transform uppercase text-[11px]">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Section 4: Production Implementation Checklist ── */}
        <section className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0f172a]">
                Production Implementation Checklist
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Check off items as you integrate {topic.name} into your AI systems.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {topic.implementationChecklist.map((item, idx) => {
              const isChecked = !!checkedItems[idx]
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-100/70 text-slate-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium leading-relaxed ${isChecked ? 'line-through opacity-70' : ''}`}>
                    {item}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Section 5: Explore Other Topics ── */}
        <section className="pt-8 border-t border-slate-200">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Explore More Topics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] uppercase">
              Other Engineering Playbooks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherTopics.map((ot) => {
              const Icon = ICON_MAP[ot.iconName] || Layers
              return (
                <Link
                  key={ot.slug}
                  href={`/documentation/topic/${ot.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#ea580c] transition-all group flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] group-hover:text-[#ea580c] transition-colors truncate">
                      {ot.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {ot.stats.articlesCount} Guides · {ot.stats.skillLevel}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </Link>
              )
            })}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
