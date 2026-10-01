"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Store,
  AppWindow,
  Share2,
  ImagePlus,
  ImageIcon,
  MonitorPlay,
  Video,
  Workflow,
  Lightbulb,
  Users,
  ArrowUpRight,
  Sparkles,
  Play,
  Layers,
  CheckCircle2,
  Zap,
} from 'lucide-react'

interface EcosystemItem {
  id: string
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badgeText: string
  gradient: string
  renderVisual: () => React.ReactNode
}

const ECOSYSTEM_ITEMS: EcosystemItem[] = [
  {
    id: "marketplace",
    title: "Marketplace",
    description: "Discover pre-built AI agents, prompts, and workflows created by top creators.",
    href: "/marketplace",
    icon: Store,
    badgeText: "48K+ Prompts",
    gradient: "radial-gradient(circle at 50% 0%, #FFB347 0%, #F9ED96 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-3 shadow-xs">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[11px] font-bold text-slate-800 flex items-center gap-1">
              <span className="text-amber-500">✦</span> B2B SaaS Pack
            </span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60">
              $19.99
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
            <span className="text-amber-400">★★★★★</span>
            <span>4.9 (1.2k)</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-purple-600 text-xs">✦</span> Explore Store
        </div>
      </div>
    ),
  },
  {
    id: "app-templates",
    title: "App Templates",
    description: "Deploy full-stack AI apps instantly with our battle-tested boilerplate codebases.",
    href: "/app-templates",
    icon: AppWindow,
    badgeText: "Full-Stack",
    gradient: "radial-gradient(circle at 50% 0%, #60A5FA 0%, #93C5FD 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-3 shadow-xs">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[9px] font-mono text-slate-400 ml-1">app.tsx</span>
          </div>
          <div className="text-[10px] font-mono text-slate-700 bg-slate-50 rounded px-2 py-1 border border-slate-100 truncate">
            <span className="text-blue-600">&lt;PromptStack</span> <span className="text-purple-600">ai</span>=<span className="text-emerald-600">&quot;v4&quot;</span> /&gt;
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-blue-600">✦</span> Next.js 16 + AI
        </div>
      </div>
    ),
  },
  {
    id: "linkedin-generator",
    title: "LinkedIn Generator",
    description: "Generate highly engaging, viral B2B thought leadership optimized for the algorithm.",
    href: "/linkedin-generator",
    icon: Share2,
    badgeText: "Viral Hooks",
    gradient: "radial-gradient(circle at 50% 0%, #818CF8 0%, #C084FC 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-3 shadow-xs">
          <p className="text-[11px] font-medium text-slate-700 line-clamp-2 leading-relaxed">
            &quot;Most startups build features.<br />
            Great startups build <span className="font-semibold text-purple-600">distribution</span>.&quot;
          </p>
          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-500">
            <span>👍 ❤️ 💡 842</span>
            <span className="font-semibold text-indigo-600">98% Hook</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-indigo-600">✦</span> Viral Formatter
        </div>
      </div>
    ),
  },
  {
    id: "instagram-pipeline",
    title: "Instagram Pipeline",
    description: "Automate visual carousel creation, viral hooks, and scheduled publish workflows.",
    href: "/instagram-generator",
    icon: ImagePlus,
    badgeText: "Carousel Studio",
    gradient: "radial-gradient(circle at 50% 0%, #F472B6 0%, #FDA4AF 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-2.5 shadow-xs">
          <div className="h-12 w-full rounded-lg bg-gradient-to-r from-pink-400/20 via-rose-300/30 to-purple-400/20 border border-pink-200/50 flex items-center justify-center relative overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              <span className="text-[10px] font-bold text-pink-700">Slide 1 of 6</span>
            </div>
            <div className="absolute bottom-1 right-2 text-[8px] font-bold text-slate-400">1080×1350</div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-pink-600">✦</span> Auto-Carousels
        </div>
      </div>
    ),
  },
  {
    id: "image-prompts",
    title: "Image Prompts",
    description: "Curated, high-fidelity prompt recipes calibrated for Midjourney v6 and DALL-E 3.",
    href: "/image-prompts",
    icon: ImageIcon,
    badgeText: "Midjourney v6",
    gradient: "radial-gradient(circle at 50% 0%, #34D399 0%, #A7F3D0 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-3 shadow-xs">
          <div className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
            Ultra-realistic 3D render of{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-semibold">
              crystalline character
            </span>{' '}
            with volumetric lighting
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-emerald-600">✦</span> 8K Octane
        </div>
      </div>
    ),
  },
  {
    id: "multimedia-suite",
    title: "Multimedia Suite",
    description: "Transform raw ideas into multi-modal voice, audio, and visual marketing assets.",
    href: "/multimedia-suite",
    icon: MonitorPlay,
    badgeText: "Omni-Modal",
    gradient: "radial-gradient(circle at 50% 0%, #FB923C 0%, #FDE047 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-2.5 shadow-xs">
          <div className="flex items-center justify-around h-12 bg-orange-50/60 rounded-lg px-2 border border-orange-100">
            {[40, 75, 55, 90, 60, 85, 45, 95, 65, 50].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-gradient-to-t from-orange-400 to-amber-300 rounded-full"
                style={{ height: `${h * 0.35}px` }}
              />
            ))}
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-orange-600">✦</span> Voice &amp; Vision
        </div>
      </div>
    ),
  },
  {
    id: "video-prompts",
    title: "Video Prompts",
    description: "Cinematic camera motions, lighting setups, and keyframe prompts for Sora & Runway.",
    href: "/video-prompts",
    icon: Video,
    badgeText: "Runway & Sora",
    gradient: "radial-gradient(circle at 50% 0%, #F87171 0%, #FDA4AF 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-2.5 shadow-xs">
          <div className="h-12 rounded-lg bg-slate-900 text-white flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-red-400" />
              </div>
              <span className="text-[10px] font-mono text-slate-300">00:15 / 4K</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded">60 FPS</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-red-500">✦</span> Camera Moves
        </div>
      </div>
    ),
  },
  {
    id: "workflows",
    title: "Workflows",
    description: "Enterprise integration blueprints connecting n8n, Zapier, Slack, and your CRM.",
    href: "/workflows",
    icon: Workflow,
    badgeText: "n8n Ready",
    gradient: "radial-gradient(circle at 50% 0%, #38BDF8 0%, #818CF8 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-2.5 shadow-xs">
          <div className="flex items-center justify-between text-[10px] font-mono bg-sky-50/70 border border-sky-100/80 rounded-lg p-2 text-slate-700">
            <span className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-bold">Webhook</span>
            <span className="text-sky-500 font-bold">➔</span>
            <span className="px-1.5 py-0.5 bg-sky-500 text-white rounded font-bold">AI Agent</span>
            <span className="text-sky-500 font-bold">➔</span>
            <span className="px-1.5 py-0.5 bg-white rounded border border-slate-200 font-bold">Slack</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-sky-500">✦</span> 47 Templates
        </div>
      </div>
    ),
  },
  {
    id: "startup-directory",
    title: "Startup Directory",
    description: "AI-curated SaaS startup ideas with market analysis, moat evaluation, and tech stacks.",
    href: "/marketplace",
    icon: Lightbulb,
    badgeText: "Validated Moats",
    gradient: "radial-gradient(circle at 50% 0%, #FBBF24 0%, #FDE68A 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-3 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-900">AI Recruiter OS</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              ₹28L MRR
            </span>
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 98% Market Demand Score
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-amber-500">✦</span> Deep Research
        </div>
      </div>
    ),
  },
  {
    id: "team-workspace",
    title: "Team Workspace",
    description: "Centralize team prompt libraries, role access control, and shared AI token budgets.",
    href: "/team-workspace",
    icon: Users,
    badgeText: "Collaboration",
    gradient: "radial-gradient(circle at 50% 0%, #A78BFA 0%, #DDD6FE 32%, #F8FAFC 65%, #FFFFFF 100%)",
    renderVisual: () => (
      <div className="w-full flex flex-col items-center gap-2 pt-5 px-3">
        <div className="w-full bg-white/90 backdrop-blur-xs border border-black/8 rounded-xl p-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">KV</div>
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">SK</div>
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">AM</div>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Sync
            </span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-purple-600">✦</span> Team Hub
        </div>
      </div>
    ),
  },
]

export function ExploreEcosystemSection() {
  return (
    <section className="w-full bg-slate-50/70 py-20 md:py-28 border-t border-slate-200 font-body relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-orange-200/20 via-purple-200/20 to-blue-200/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header styled after Core Features */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-block text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent mb-3.5">
            Explore Our Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-4">
            Built for Speed &amp; Quality
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Beyond enterprise AI Operating Systems, explore our suite of specialized agents, generative pipelines, and developer templates to accelerate your workflows today.
          </p>
        </div>

        {/* 10 Cards Grid (2 rows of 5 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {ECOSYSTEM_ITEMS.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="h-full"
              >
                <Link
                  href={item.href}
                  className="group relative flex flex-col justify-between h-[340px] rounded-[22px] overflow-hidden border border-slate-200/80 bg-[#F4F8F9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.16)] hover:-translate-y-1.5 transition-all duration-300 text-left block"
                >
                  {/* Atmospheric Top Radial Gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"
                    style={{ background: item.gradient }}
                  />

                  {/* Subtle Grid Mesh Overlay matching c1-mesh */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                      maskImage: "radial-gradient(circle at center top, black 0%, transparent 80%)",
                      WebkitMaskImage: "radial-gradient(circle at center top, black 0%, transparent 80%)",
                    }}
                  />

                  {/* Top Preview Area (Core Features Card interactive widget) */}
                  <div className="relative z-10 w-full h-[180px] flex items-center justify-center">
                    {item.renderVisual()}
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10 p-5 bg-gradient-to-t from-white via-white/95 to-transparent pt-3 border-t border-slate-100/60">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-900/5 text-slate-800 flex items-center justify-center group-hover:bg-[#ff5500] group-hover:text-white transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#ff5500] transition-colors leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
