"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight,
  ShieldCheck, Terminal, Layers, Activity, Search, Globe2,
  TrendingUp, BarChart3, Bot, MapPin, Share2, GitCompare,
  Link2, FileCheck, Bell, BarChart2, Database, Trophy,
  Wrench, FolderKanban, Zap, Cpu, Check, HelpCircle, ChevronDown,
  ExternalLink, Compass, Shield, Radio, FileText, Copy, Code2,
  ListChecks, Server, Play, Flame
} from 'lucide-react'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { getToolBySlug, getAllTools } from '@/lib/tools-data'
import { ToolVisualRenderer } from '@/components/tool-visual-renderer'

const ICON_MAP: Record<string, React.ElementType> = {
  Radar: Radio,
  Sparkles,
  LayoutDashboard: Layers,
  Globe2,
  Search,
  ShieldAlert: Shield,
  TrendingUp,
  BarChart3,
  FileSearch: FileText,
  Activity,
  Bot,
  MapPin,
  Share2,
  GitCompare,
  Layers,
  Link2,
  FileCheck,
  Bell,
  CheckCircle2,
  BarChart2,
  Database,
  Trophy,
  Wrench,
  FolderKanban,
  Zap,
  Cpu,
}

export default function ToolDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const tool = getToolBySlug(slug)

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [copiedCode, setCopiedCode] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({ 0: true, 1: true })

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  const handleCopyCode = () => {
    if (!tool) return
    navigator.clipboard.writeText(tool.codeSnippet.code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const toggleChecklist = (idx: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-body">
        <PublicNavbar className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200" />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-black text-[#0f172a] uppercase mb-3">Tool Not Found</h1>
            <p className="text-slate-600 mb-6">The tool you are looking for does not exist or has been relocated.</p>
            <Link href="/tools">
              <Button className="rounded-xl bg-[#0f172a] text-white font-bold text-xs">
                <ArrowLeft className="w-4 h-4 mr-2" /> View All Tools
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const allTools = getAllTools()
  const relatedTools = tool.relatedToolSlugs
    .map(s => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  const ToolIcon = ICON_MAP[tool.iconName] || Layers

  const completedCount = Object.values(checkedItems).filter(Boolean).length
  const totalChecklist = tool.checklist.length
  const progressPercent = Math.round((completedCount / (totalChecklist || 1)) * 100)

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-body selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      <PublicNavbar className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200" />

      {/* ── Breadcrumbs ── */}
      <div className="border-b border-slate-200/80 bg-white/60 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f172a] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/tools" className="hover:text-[#0f172a] transition-colors">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{tool.name}</span>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-400/15 via-amber-300/10 to-purple-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-300/80 shadow-2xs">
                <ToolIcon className="w-4 h-4 text-[#ea580c]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  {tool.category}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${tool.badgeColor}`}>
                {tool.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.08] mb-4 uppercase">
              {tool.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed mb-6">
              {tool.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-8">
              {tool.description}
            </p>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-300/70">
              {tool.metrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-300/80 shadow-2xs text-center">
                  <span className="text-lg sm:text-xl font-black text-[#0f172a] block">
                    {m.value}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Main Content Grid ── */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full space-y-16">
        
        {/* ── Custom Interactive Visual Artifact (Graphs, Radars, Donut Charts, Mind Maps, Terminals, GeoGrids) ── */}
        <section className="scroll-mt-24">
          <ToolVisualRenderer slug={tool.slug} />
        </section>

        {/* ── Deep In-Depth Overview ── */}
        <section className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xs">
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
              Architecture &amp; Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight">
              How {tool.name} Works
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {tool.longDescription.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* ── 4-Step Operating Workflow ── */}
        {tool.workflow && tool.workflow.length > 0 && (
          <section>
            <div className="mb-8">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                End-to-End Execution
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight">
                4-Step Operating Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tool.workflow.map((w, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-[#ea580c] block mb-2">
                      STEP {w.step}
                    </span>
                    <h3 className="text-base font-bold text-[#0f172a] mb-2 leading-snug">
                      {w.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {w.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Automated Pipeline
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Key Capabilities ── */}
        <section>
          <div className="mb-8">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Core Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight">
              Key Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tool.keyCapabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 text-[#ea580c] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-1.5 leading-snug">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Code & API Integration Snippet ── */}
        {tool.codeSnippet && (
          <section className="rounded-3xl bg-[#0f172a] text-white p-8 sm:p-10 shadow-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
                  Developer API &amp; SDK Integration
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-[#ea580c]" />
                  Programmatic Automation
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                  {tool.codeSnippet.filename}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 border border-slate-800/80 p-5 overflow-x-auto">
              <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
                <code>{tool.codeSnippet.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* ── Architecture & Engineering Highlights ── */}
        {tool.architecture && (
          <section className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xs">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-1">
                Data Pipeline &amp; Infrastructure
              </span>
              <h2 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight">
                Engineering Architecture
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-6">
              {tool.architecture.pipeline}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tool.architecture.highlights.map((highlight, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 flex items-start gap-2.5">
                  <Server className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Interactive Implementation Checklist ── */}
        {tool.checklist && tool.checklist.length > 0 && (
          <section className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Step-by-Step Setup
                </span>
                <h2 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight flex items-center gap-2">
                  <ListChecks className="w-6 h-6 text-emerald-600" />
                  Implementation Checklist
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-500 block">Progress</span>
                <span className="text-base font-black text-emerald-600">{progressPercent}% Completed</span>
              </div>
            </div>

            <div className="space-y-3">
              {tool.checklist.map((item, idx) => {
                const isChecked = !!checkedItems[idx]
                return (
                  <div
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                      isChecked
                        ? "bg-emerald-50/50 border-emerald-200 text-slate-900"
                        : "bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isChecked ? "bg-emerald-600 text-white" : "border-2 border-slate-300 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold ${isChecked ? "line-through text-slate-500" : ""}`}>
                      {item}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Benchmark Comparison Matrix ── */}
        {tool.benchmarkMatrix && tool.benchmarkMatrix.length > 0 && (
          <section className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
              <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
                Comparative Analysis
              </span>
              <h2 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight">
                Miracle vs. Traditional Legacy Tools
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-left">
                  <tr>
                    <th className="p-4 font-bold text-[#0f172a]">Dimension / Feature</th>
                    <th className="p-4 font-bold text-[#ea580c]">Miracle {tool.name}</th>
                    <th className="p-4 font-bold text-slate-500">Legacy Search Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  {tool.benchmarkMatrix.map((bm, i) => (
                    <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-[#0f172a]">{bm.dimension}</td>
                      <td className="p-4 font-bold text-emerald-700 bg-emerald-50/30">{bm.miracle}</td>
                      <td className="p-4 text-slate-500 font-medium">{bm.legacy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Real-World Use Cases ── */}
        {tool.useCases.length > 0 && (
          <section>
            <div className="mb-8">
              <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-1">
                Real-World Scenarios
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight">
                Proven Use Cases
              </h2>
            </div>

            <div className="space-y-6">
              {tool.useCases.map((uc, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-6 sm:p-8 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-[#0f172a] mb-4 pb-3 border-b border-slate-300/70">
                    {uc.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-300/80 shadow-2xs">
                      <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
                        The Challenge
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {uc.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-300/80 shadow-2xs">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                        The Solution
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {uc.solution}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/90 border border-slate-300/80 shadow-2xs">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                        The Business Outcome
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {uc.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Technical Specifications ── */}
        <section className="rounded-3xl bg-[#0f172a] text-white p-8 sm:p-10 shadow-lg">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
              Infrastructure &amp; Protocol
            </span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">
              Technical Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Refresh Cadence
              </span>
              <p className="text-xs font-bold text-white leading-relaxed">
                {tool.technicalSpecs.refreshRate}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Data Sources
              </span>
              <p className="text-xs font-bold text-white leading-relaxed">
                {tool.technicalSpecs.dataSources}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Export Formats
              </span>
              <p className="text-xs font-bold text-white leading-relaxed">
                {tool.technicalSpecs.exportFormats}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                API Access
              </span>
              <p className="text-xs font-bold text-white leading-relaxed">
                {tool.technicalSpecs.apiAccess}
              </p>
            </div>
          </div>
        </section>

        {/* ── Frequently Asked Questions ── */}
        {tool.faq.length > 0 && (
          <section className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xs">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight">
                {tool.name} FAQ
              </h2>
            </div>

            <div className="space-y-3">
              {tool.faq.map((faqItem, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/70 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-bold text-[#0f172a]">
                        {faqItem.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#ea580c]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="p-4 bg-white text-xs text-slate-700 font-medium leading-relaxed border-t border-slate-100"
                        >
                          {faqItem.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Related Tools ── */}
        {relatedTools.length > 0 && (
          <section className="pt-8 border-t border-slate-200">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Synergistic Capabilities
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] uppercase">
                Related Tools in Miracle Studio
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((rt) => {
                const Icon = ICON_MAP[rt.iconName] || Layers
                return (
                  <Link
                    key={rt.slug}
                    href={`/tools/${rt.slug}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#ea580c] transition-all group flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-[#ea580c] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] group-hover:text-[#ea580c] transition-colors truncate">
                        {rt.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                        {rt.tagline}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ── CTA Banner ── */}
        <section className="rounded-3xl bg-[#0f172a] text-white p-10 sm:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#ea580c] uppercase tracking-wider block mb-2">
              Ready to Accelerate Your SEO &amp; AI Visibility?
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
              Launch {tool.name} in Miracle Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-8">
              Join thousands of data-driven search teams using Miracle to dominate rankings, answer engine citations, and technical health.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button className="rounded-2xl h-12 px-8 bg-[#ff5500] hover:bg-[#e64d00] text-white font-bold text-xs shadow-lg shadow-orange-500/20">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" className="rounded-2xl h-12 px-8 border-slate-700 bg-slate-900 text-white font-bold text-xs hover:bg-slate-800">
                  Explore All 27 Tools
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
