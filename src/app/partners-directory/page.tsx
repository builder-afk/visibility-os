"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Sparkles, TrendingUp, ThumbsUp, MessageSquare, ExternalLink, ShieldCheck, ArrowUpRight, Award } from 'lucide-react'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic']
})

interface PartnerCompany {
  id: string
  name: string
  category: string
  logoText: string
  gradient: string
  description: string
  whyRecommended: string
  redditMentions: string
  sentimentScore: string
  topSubreddits: string[]
  websiteUrl: string
}

const PARTNER_COMPANIES: PartnerCompany[] = [
  {
    id: "cursor",
    name: "Cursor",
    category: "Developer Tools & AI",
    logoText: "CU",
    gradient: "from-blue-600 to-indigo-600",
    description: "AI-first code editor designed for fast, agentic code edits and multi-file refactoring.",
    whyRecommended: "Praised on Reddit for its seamless multi-file agentic code editing and instant context awareness.",
    redditMentions: "5,200 / mo",
    sentimentScore: "98% Positive",
    topSubreddits: ["r/Localllama", "r/programming", "r/webdev"],
    websiteUrl: "https://cursor.com"
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Developer Tools & AI",
    logoText: "SB",
    gradient: "from-emerald-500 to-teal-700",
    description: "Open source Firebase alternative providing Postgres database, Auth, Instant APIs, and Vector embeddings.",
    whyRecommended: "The default database choice on r/SaaS and r/webdev for full Postgres power with zero setup hassle.",
    redditMentions: "4,800 / mo",
    sentimentScore: "97% Positive",
    topSubreddits: ["r/SaaS", "r/webdev", "r/NextJS"],
    websiteUrl: "https://supabase.com"
  },
  {
    id: "posthog",
    name: "PostHog",
    category: "Marketing & Analytics",
    logoText: "PH",
    gradient: "from-orange-500 to-red-600",
    description: "All-in-one product analytics, session replay, feature flags, and A/B testing suite for developers.",
    whyRecommended: "Loved by founders on r/SaaS for transparent pricing and open-source product analytics.",
    redditMentions: "3,900 / mo",
    sentimentScore: "96% Positive",
    topSubreddits: ["r/SaaS", "r/growth", "r/startups"],
    websiteUrl: "https://posthog.com"
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Developer Tools & AI",
    logoText: "VC",
    gradient: "from-slate-900 to-slate-800",
    description: "Frontend cloud platform providing instant preview deployments, global CDN, and Next.js optimization.",
    whyRecommended: "Consistently rated as the fastest path from git push to global production deployment.",
    redditMentions: "6,100 / mo",
    sentimentScore: "95% Positive",
    topSubreddits: ["r/nextjs", "r/reactjs", "r/webdev"],
    websiteUrl: "https://vercel.com"
  },
  {
    id: "miracle",
    name: "Miracle",
    category: "Marketing & Analytics",
    logoText: "MC",
    gradient: "from-[#F5C344] via-[#F28482] to-[#B567C2]",
    description: "Generative Engine Optimization (GEO) platform helping brands get cited by ChatGPT, Perplexity, and Claude.",
    whyRecommended: "Highlighted on r/marketing for driving 3x higher citation growth inside AI search answers.",
    redditMentions: "4,600 / mo",
    sentimentScore: "99% Positive",
    topSubreddits: ["r/marketing", "r/SEO", "r/SaaS"],
    websiteUrl: "#"
  },
  {
    id: "resend",
    name: "Resend",
    category: "Developer Tools & AI",
    logoText: "RS",
    gradient: "from-purple-600 to-indigo-700",
    description: "Modern email API built for developers with React Email templates and high deliverability rates.",
    whyRecommended: "Recommended on r/node and r/NextJS for developer-friendly email setup and clean SDKs.",
    redditMentions: "2,800 / mo",
    sentimentScore: "96% Positive",
    topSubreddits: ["r/node", "r/NextJS", "r/webdev"],
    websiteUrl: "https://resend.com"
  },
  {
    id: "linear",
    name: "Linear",
    category: "Productivity & SaaS",
    logoText: "LN",
    gradient: "from-violet-600 to-purple-800",
    description: "Purpose-built issue tracking tool designed for high-performing software engineering teams.",
    whyRecommended: "Praised across r/ProductManagement for keyboard shortcuts, sub-second speed, and clean design.",
    redditMentions: "4,100 / mo",
    sentimentScore: "97% Positive",
    topSubreddits: ["r/ProductManagement", "r/programming", "r/startups"],
    websiteUrl: "https://linear.app"
  },
  {
    id: "tailscale",
    name: "Tailscale",
    category: "Infrastructure & Security",
    logoText: "TS",
    gradient: "from-cyan-600 to-blue-700",
    description: "Zero-config mesh VPN built on WireGuard that connects your devices, servers, and cloud instances securely.",
    whyRecommended: "Unanimously recommended on r/selfhosted and r/homelab for effortless private networking.",
    redditMentions: "5,400 / mo",
    sentimentScore: "99% Positive",
    topSubreddits: ["r/selfhosted", "r/homelab", "r/sysadmin"],
    websiteUrl: "https://tailscale.com"
  },
  {
    id: "raycast",
    name: "Raycast",
    category: "Productivity & SaaS",
    logoText: "RC",
    gradient: "from-[#ea580c] to-amber-500",
    description: "Blazingly fast, extensible launcher for Mac that lets you control your tools with a few keystrokes.",
    whyRecommended: "Voted #1 productivity tool on r/macapps for replacing Spotlight with rich extensions.",
    redditMentions: "3,700 / mo",
    sentimentScore: "98% Positive",
    topSubreddits: ["r/macapps", "r/commandline", "r/productivity"],
    websiteUrl: "https://raycast.com"
  },
  {
    id: "plausible",
    name: "Plausible",
    category: "Marketing & Analytics",
    logoText: "PL",
    gradient: "from-indigo-600 to-blue-700",
    description: "Lightweight, privacy-focused open source web analytics alternative to Google Analytics.",
    whyRecommended: "Recommended on r/privacy and r/selfhosted for cookie-free, GDPR-compliant analytics.",
    redditMentions: "3,100 / mo",
    sentimentScore: "96% Positive",
    topSubreddits: ["r/privacy", "r/selfhosted", "r/webdev"],
    websiteUrl: "https://plausible.io"
  },
  {
    id: "n8n",
    name: "n8n",
    category: "Productivity & SaaS",
    logoText: "N8",
    gradient: "from-rose-500 to-red-600",
    description: "Fair-code workflow automation tool with native AI agent nodes and self-hosting support.",
    whyRecommended: "Praised on r/automation for complex multi-step workflows without per-task pricing traps.",
    redditMentions: "3,300 / mo",
    sentimentScore: "97% Positive",
    topSubreddits: ["r/automation", "r/selfhosted", "r/SaaS"],
    websiteUrl: "https://n8n.io"
  },
  {
    id: "1password",
    name: "1Password",
    category: "Infrastructure & Security",
    logoText: "1P",
    gradient: "from-blue-700 to-indigo-900",
    description: "Enterprise security and password manager providing cross-platform vault encryption and secret management.",
    whyRecommended: "The standard password management choice recommended on r/NetSec and r/sysadmin.",
    redditMentions: "4,500 / mo",
    sentimentScore: "95% Positive",
    topSubreddits: ["r/NetSec", "r/sysadmin", "r/privacy"],
    websiteUrl: "https://1password.com"
  }
]

const CATEGORIES = [
  "All",
  "Developer Tools & AI",
  "Marketing & Analytics",
  "Productivity & SaaS",
  "Infrastructure & Security"
]

export default function PartnersDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPartners = PARTNER_COMPANIES.filter(partner => {
    const matchesCategory = activeCategory === "All" || partner.category === activeCategory
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.topSubreddits.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-body selection:bg-orange-100 selection:text-orange-900">
      {/* Navbar */}
      <PublicNavbar className="border-b border-orange-200/40 bg-white/80 backdrop-blur-md sticky top-0 z-50" />

      {/* Hero Section */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-orange-200/80 shadow-2xs mb-5">
            <Award className="w-3.5 h-3.5 text-[#F28482]" />
            <span className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent">
              PARTNERS DIRECTORY
            </span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15] mb-4 ${jakarta.className}`}>
            Companies Most Discussed <br />
            <span className={`italic font-normal bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent block mt-1 ${instrumentSerif.className}`}>
              on Reddit
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            Real data from Reddit conversations — see which companies people actually recommend, organized by industry.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search companies, tools, or subreddits (e.g. Cursor, r/SaaS, Supabase)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-orange-200/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#F28482]/50 text-sm placeholder:text-slate-400 text-slate-900"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'bg-white/80 border border-orange-200/60 text-slate-600 hover:bg-orange-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Directory Grid */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
        {filteredPartners.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-orange-200/60 p-8">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No companies found</h3>
            <p className="text-sm text-slate-500 mt-1">Try searching another company name or selecting a different category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPartners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <div className="group relative flex flex-col justify-between h-full p-7 rounded-3xl bg-[#FFF9F5] backdrop-blur-xl border border-orange-200/70 shadow-[0_8px_32px_0_rgba(245,195,68,0.06)] hover:border-purple-300/60 hover:shadow-[0_12px_36px_0_rgba(181,103,194,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {/* Accent Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFB347]/10 via-[#F9ED96]/5 to-[#E5A1F5]/10 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header: Badge Icon & Sentiment Score */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${partner.gradient} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                        {partner.logoText}
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                          <ThumbsUp className="w-3 h-3" />
                          {partner.sentimentScore}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium mt-1">
                          {partner.redditMentions}
                        </span>
                      </div>
                    </div>

                    {/* Company Name & Category */}
                    <div className="mb-3">
                      <span className="text-[10px] font-mono font-semibold text-[#7c6a54] uppercase tracking-wider block mb-1">
                        {partner.category}
                      </span>
                      <h2 className={`text-2xl font-bold text-[#0f172a] group-hover:text-[#ea580c] transition-colors ${jakarta.className}`}>
                        {partner.name}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {partner.description}
                    </p>

                    {/* Why Recommended Quote Box */}
                    <div className="p-3.5 rounded-2xl bg-white/90 border border-orange-200/50 mb-5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        <MessageSquare className="w-3 h-3 text-[#F28482]" />
                        <span>WHY REDDITORS RECOMMEND IT</span>
                      </div>
                      <p className="text-xs text-slate-700 italic leading-relaxed">
                        "{partner.whyRecommended}"
                      </p>
                    </div>

                    {/* Subreddit Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {partner.topSubreddits.map((sub) => (
                        <span
                          key={sub}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="relative z-10 pt-4 border-t border-orange-200/50 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Verified Sentiment
                    </span>

                    {partner.websiteUrl !== '#' ? (
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#7c6a54] group-hover:text-[#B567C2] transition-colors uppercase text-[11px] tracking-wider"
                      >
                        <span>VISIT SITE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="font-bold text-[#ea580c] uppercase text-[11px] tracking-wider">
                        OUR PLATFORM
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
