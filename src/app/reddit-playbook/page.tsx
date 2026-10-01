"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, ShieldCheck, Zap, Bot, ArrowRight, CheckCircle2,
  AlertTriangle, RefreshCw, Layers, Globe, Settings, Key,
  Sparkles, Terminal, FileText, Globe2, HelpCircle, ChevronRight,
  TrendingUp, Sliders, Check, Clock, User, Bell, Users, BarChart3,
  Search, Lock, Eye, AlertCircle, Copy, ExternalLink, Activity, Compass, Flame
} from 'lucide-react'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { PostUpdatedDate } from '@/components/ui/post-updated-date'

/* ─── ONBOARDING STEPS DATA ─── */
const ONBOARDING_STEPS = [
  {
    step: "01",
    title: "Choose Workspace Architecture",
    subtitle: "Solo vs. Team Workspace",
    badge: "Immutable Setup",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    description:
      "Select between a Solo workspace for individual founders or a Team workspace with role-based permissions (Owner, Admin, Member). This architecture choice is locked at signup and cannot be changed later.",
    points: [
      "Solo Workspace: Streamlined single-user interface with centralized quota management.",
      "Team Workspace: Multi-seat collaboration where each teammate links their own Chrome extension session individually.",
      "Role-based access controls for billing, campaigns, and API keys."
    ]
  },
  {
    step: "02",
    title: "Create a Product Campaign",
    subtitle: "Define What You Promote",
    badge: "Context Container",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    description:
      "Create dedicated campaigns for each product, website, or topic you want to promote. Each campaign manages its own subreddits, assigned advocates, and dedicated knowledge base.",
    points: [
      "Upload Knowledge Base documents (PDF, MD, TXT) or crawl up to 100 pages of your live website.",
      "Toggle campaigns active or paused anytime without losing setup or historical scan logs.",
      "Isolate brand positioning and target messaging per product line."
    ]
  },
  {
    step: "03",
    title: "Pick & Configure AI Advocate",
    subtitle: "The Voice Writing Your Comments",
    badge: "5-Step Wizard",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    description:
      "Design an AI Advocate persona that matches your desired community presence. Define name, voice, role (Regular User vs. Employee), tone, creativity slider (0.0 to 1.0), and daily draft allocation.",
    points: [
      "5-Step Creation: Choose → Generate → Configure → Drafts → Fine-tune.",
      "Assign one connected Reddit account per advocate.",
      "Use the Refine tool (/advocates/[id]/refine) to teach the advocate your personal writing style by rewriting 5 sample drafts."
    ]
  },
  {
    step: "04",
    title: "Select Target Subreddits",
    subtitle: "Where Your Buyers Hang Out",
    badge: "Scanner Feeder",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description:
      "Choose the niche communities Miracle continuously scans. Use our Discover tool, import from CSV, or filter existing subreddits. Only active subreddits feed the relevance scanning engine.",
    points: [
      "Continuous background scanner monitors new threads and active questions 24/7.",
      "Bulk-toggle subreddits active/paused per campaign.",
      "Track subreddit-specific karma thresholds to avoid posting in communities where you lack minimum karma."
    ]
  },
  {
    step: "05",
    title: "Connect Reddit Account (Zero Password)",
    subtitle: "Secure Username Lookup",
    badge: "100% Secure",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    description:
      "Connect your Reddit account simply by entering its username. We verify karma, account age, verified-email status, and mod permissions. No OAuth passwords or sensitive credentials are ever requested.",
    points: [
      "Zero password risk: The Chrome extension operates inside your existing logged-in browser session.",
      "Account cards display live karma, account age, verified email, and current promotion ratio.",
      "Strict Hierarchy: Campaign → Assigned Advocate → Linked Reddit Account."
    ]
  }
]

/* ─── THRESHOLDS DATA ─── */
const RELEVANCE_THRESHOLDS = [
  {
    level: "Strict",
    percentage: "70%",
    yield: "~1 in 4 posts",
    badge: "Ultra-High Precision",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    desc: "Only drafts replies for threads with exact keyword match and immediate high purchase intent. Best for broad, high-volume subreddits."
  },
  {
    level: "Balanced",
    percentage: "50%",
    yield: "~1 in 2 posts",
    badge: "Default & Recommended",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    desc: "Identifies relevant discussions, workflow pain points, and comparison requests while filtering out low-quality chatter. Recommended for 90% of campaigns."
  },
  {
    level: "Lenient",
    percentage: "45%",
    yield: "Most posts",
    badge: "Maximum Volume",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    desc: "Captures broader discussions and tangential industry topics. Best for hyper-niche subreddits with low daily post volume."
  }
]

/* ─── KARMA RATIO TIERS ─── */
const KARMA_TIERS = [
  { karma: "0 Karma", promoRatio: "0%", warmupRatio: "100%", stage: "Newcomer", desc: "Browse and genuine community comments only. Zero promotional links allowed." },
  { karma: "10 Karma", promoRatio: "20%", warmupRatio: "80%", stage: "Contributor", desc: "Occasional context-rich product mentions begin (~1 per day)." },
  { karma: "50 Karma", promoRatio: "40%", warmupRatio: "60%", stage: "Contributor", desc: "Subreddit shadowban risk decreases significantly. 1-2 product mentions daily." },
  { karma: "100 Karma", promoRatio: "60%", warmupRatio: "40%", stage: "Trusted", desc: "More high-authority subreddits unlock. Natural mix of value and recommendation." },
  { karma: "500+ Karma", promoRatio: "80% (Cap)", warmupRatio: "20%", stage: "Established", desc: "Full commercial capability across all unlocked subreddits while retaining 20% warmup buffer." }
]

/* ─── 15 SIDEBAR FEATURES ─── */
const SIDEBAR_FEATURES = [
  {
    id: "dashboard",
    title: "1. Dashboard Overview",
    icon: Activity,
    category: "Core Navigation",
    summary: "Your central Reddit marketing command center.",
    details: "The first screen after login. Displays today's super-relevant drafts, scanner health with a manual 'Scan Now' button, Reddit account warmup widget, setup warning banners, and real-time posting activity feed."
  },
  {
    id: "analytics",
    title: "2. Performance Analytics",
    icon: BarChart3,
    category: "Reporting",
    summary: "Real-time engagement metrics on already-posted comments.",
    details: "Tracks total views, upvotes, average score, and sentiment breakdowns over 7, 14, and 30-day windows. Includes breakdowns by campaign and subreddit. Features a 'Sync Now' button that commands the Chrome extension to refresh latest metrics."
  },
  {
    id: "journey",
    title: "3. Account Growth Journey",
    icon: TrendingUp,
    category: "Safety & Ramp",
    summary: "Per-account karma and safety milestone tracker.",
    details: "Visual ladder showing progress through 4 stages: Newcomer → Contributor → Trusted → Established. Displays historical karma growth curves, weekly post counts, promotional vs. karma-building ratio, and the Subreddit Unlock Timeline."
  },
  {
    id: "drafts",
    title: "4. Review & Approval Drafts",
    icon: FileText,
    category: "Daily Operations",
    summary: "AI-generated comment replies awaiting human review.",
    details: "The primary hub for your workflow. Organizes drafts into 5 tabs: All, Waiting for Approval, Posting Queue, Published, and Archive. Drafts cycle through Pending → Queued → Published or Archive (skipped). Supports one-click extension approval or manual Copy & Open."
  },
  {
    id: "campaigns",
    title: "5. Campaign Containers",
    icon: Layers,
    category: "Architecture",
    summary: "Dedicated product and website promotion workspaces.",
    details: "Campaigns hold their own target subreddits, assigned advocates, and knowledge base files. Easily toggle a campaign off to pause scanning and draft generation without deleting any historical data or configurations."
  },
  {
    id: "advocates",
    title: "6. AI Advocate Personas",
    icon: Bot,
    category: "Intelligence",
    summary: "Custom voice personas that write your comment drafts.",
    details: "Configure name, role (Regular User or Employee), tone, creativity setting (0–1 slider), and daily draft limits. Use the Refine tool (/advocates/[id]/refine) to calibrate the AI on 5 sample rewrites in your personal writing voice."
  },
  {
    id: "reddit-accounts",
    title: "7. Connected Reddit Accounts",
    icon: User,
    category: "Accounts",
    summary: "Zero-password Reddit account management.",
    details: "Connect accounts by entering their username — no OAuth password required. Account cards display live karma, account age, verified email status, mod status, and current promotional ratio badge (fire icon = in warmup phase)."
  },
  {
    id: "subreddits",
    title: "8. Subreddit Community Manager",
    icon: MessageSquare,
    category: "Targeting",
    summary: "The communities your automated scanner watches.",
    details: "Filter, bulk-toggle active/paused status, assign to specific campaigns, import from CSV, or use the Discover tool to surface high-relevance subreddits. Only active subreddits feed relevance scanning."
  },
  {
    id: "brand-monitor",
    title: "9. Brand Monitor (Reddit)",
    icon: Eye,
    category: "Listening",
    summary: "Tracks every Reddit post mentioning your brand or rivals.",
    details: "Divided into 4 sub-pages: Overview (volume, sentiment health, 7/30-day trend), Mentions (searchable feed of every Reddit post), Subreddits (community sentiment breakdown), and Brands (manage tracked domains). Gated by plan caps (1 / 3 / 5 domains)."
  },
  {
    id: "ai-visibility",
    title: "10. AI Visibility Engine",
    icon: Search,
    category: "AEO & LLMs",
    summary: "Monitors brand citations in ChatGPT, Gemini & Perplexity.",
    details: "Tracks how your brand appears in generated AI search engine answers. Includes 4 sub-pages: Overview (visibility score per LLM engine), Prompts (tracked search queries), Sources (cited domains), and Brands. Gated by monthly prompt limits (10 / 100 / 200)."
  },
  {
    id: "brand-vs-ai",
    title: "11. Brand Monitor vs. AI Visibility",
    icon: Compass,
    category: "Architecture",
    summary: "Understanding the difference between the two scopes.",
    details: "Brand Monitor watches Reddit community posts for organic brand mentions. AI Visibility watches generative engines (ChatGPT, Gemini, Perplexity, Google AI) for brand citations in answers. They operate on separate brand lists and quotas by design."
  },
  {
    id: "settings-tabs",
    title: "12. Settings Suite (9 Tabs)",
    icon: Settings,
    category: "Configuration",
    summary: "Complete administrative and operational configuration.",
    details: "General (Thresholds), Scan History (last 10 scanner runs), Activity (extension event feed), Notifications (email toggles + push alerts), Account (credentials), Billing (plans & spend caps), Organization (roles & seats), API Keys (prefix rg_), Integrations (Slack daily digest at 9:00 AM UTC)."
  },
  {
    id: "warmup-vs-promo",
    title: "13. Warmup vs. Promotional Drafts",
    icon: ShieldCheck,
    category: "Safety",
    summary: "Automatic draft tagging based on account karma.",
    details: "Warmup drafts contain 0% product mentions or links; their sole purpose is earning community karma. Promotional drafts provide helpful answers and naturally introduce your product. Miracle tags each draft automatically based on account age."
  },
  {
    id: "prompt-imports",
    title: "14. AI Visibility Prompt Import",
    icon: Key,
    category: "Automation",
    summary: "3 methods to load tracked AI search prompts.",
    details: "1. Manual entry via AI Visibility → Prompts. 2. CLI bulk import using @reddgrow/cli (`rg prompts import --file prompts.csv`). 3. Claude Model Context Protocol (MCP) server integration to bulk-generate and import prompts from a brand brief."
  },
  {
    id: "voice-refinement",
    title: "15. Advocate Voice Calibration",
    icon: Sparkles,
    category: "Fine-Tuning",
    summary: "Interactive 5-sample rewrite fine-tuning wizard.",
    details: "Access via Advocates → [Advocate] → Refine. Rewrite 5 sample drafts in your actual commenting style. Miracle analyzes your vocabulary, syntax, and disclosure style to bake permanent voice guidelines into all future drafts."
  }
]

/* ─── TROUBLESHOOTING PLAYBOOKS ─── */
const TROUBLESHOOTING_GUIDES = [
  {
    id: "no-drafts",
    title: "Why aren't drafts arriving in my inbox or Drafts page?",
    category: "Setup Checklist",
    summary: "Work through this 5-point verification checklist.",
    steps: [
      "1. Verify Campaign Status: Confirm your campaign is toggled 'Active' on the Campaigns page.",
      "2. Check Active Subreddits: Ensure at least one target subreddit is assigned to the campaign and set to 'Active'.",
      "3. Inspect Scan History: Go to Settings → Scan History. Confirm the scanner ran recently. If stale or errored, click 'Scan Now' on the Dashboard.",
      "4. Check AI Relevance Threshold: Ensure Settings → General is not set to 'Strict (70%)' on a low-volume niche topic. Temporarily test 'Balanced (50%)'.",
      "5. Review Amber Warning Banner: The Drafts page displays an amber banner pointing to the exact missing setup item if campaigns or subreddits are missing."
    ],
    note: "Still nothing after 24 hours? Contact support at contact@help.reddgrow.ai with your organization ID."
  },
  {
    id: "extension-disconnect",
    title: "Chrome Extension dropped session or isn't posting",
    category: "Extension Diagnostics",
    summary: "Fixing dropped browser sessions and team credentials.",
    steps: [
      "1. Check Web App Login: Confirm you are currently logged into the Miracle web app in the same Chrome profile.",
      "2. Re-authenticate Extension: Click the Miracle extension icon in your Chrome toolbar → Click 'Log In'. This opens /extension-auth-callback in a new tab and automatically re-links the session.",
      "3. Verify Activity Feed: Go to Settings → Activity and confirm a new 'Extension connected' event appears.",
      "4. Team Session Rule: On team workspaces, each teammate's extension operates as an independent session. Every team member must log in individually."
    ],
    note: "The extension operates via your local browser cookies, ensuring zero password storage on Miracle servers."
  },
  {
    id: "queued-drafts",
    title: "Why is a draft stuck in 'Queued' status?",
    category: "Posting Pipeline",
    summary: "Understanding automated queue holds and rate limits.",
    steps: [
      "1. Subreddit Karma Locks: The connected Reddit account's karma is below that subreddit's minimum karma requirement. The extension will automatically retry as account karma grows.",
      "2. Subreddit Posting Cooldowns: The subreddit enforces rate limits between posts, or Reddit temporarily throttled the account.",
      "3. Extension Offline: The Chrome extension is not active in a running Chrome browser window.",
      "4. Daily Cap Reached: Your advocate hit their daily posting quota. Quotas reset automatically at midnight UTC."
    ],
    note: "You can manually archive stuck drafts from the Drafts page anytime; archived drafts do not count against your limit."
  },
  {
    id: "quota-reset",
    title: "When do daily draft caps reset and how are they distributed?",
    category: "Billing & Quotas",
    summary: "UTC midnight reset logic and per-advocate capacity.",
    steps: [
      "1. UTC Midnight Reset: Quotas reset at 00:00 UTC, not your local time zone.",
      "2. Per-Advocate Allocation: Daily limits apply per active advocate, not per campaign. If only one advocate is active, the full organizational quota cannot be consumed by a single persona.",
      "3. Adding More Advocates: To distribute your plan's total posting capacity, create and assign additional advocate personas to your campaigns."
    ],
    note: "Published drafts that failed or were archived do not consume your permanent allowance."
  },
  {
    id: "date-filters",
    title: "Date range filter doesn't change numbers or seems stuck",
    category: "Data & UI",
    summary: "Detection date vs. original post date indexing rules.",
    steps: [
      "1. Detection Date vs. Post Date: The date range filter applies to when Miracle first indexed the Reddit post or ran the AI prompt, not when the original Reddit thread was created.",
      "2. Historical Data Availability: Analytics only exist starting from the exact day you added a brand or search prompt to your workspace.",
      "3. AI Prompt Scheduled Runs: AI Visibility prompts run on a scheduled batch cadence rather than continuous real-time queries.",
      "4. Hard Refresh: If the filter appears visually stuck, perform a hard cache reload (Cmd+Shift+R / Ctrl+Shift+R) and re-select the date preset."
    ],
    note: "All historical mention feeds are exportable via CSV or PDF from the Brand Monitor Overview tab."
  }
]

export default function RedditPlaybookPage() {
  const [activeThreshold, setActiveThreshold] = useState("Balanced")
  const [activeTroubleshooting, setActiveTroubleshooting] = useState("no-drafts")
  const [activeFeatureTab, setActiveFeatureTab] = useState("dashboard")

  const selectedFeature = SIDEBAR_FEATURES.find(f => f.id === activeFeatureTab) || SIDEBAR_FEATURES[0]

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-body selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      <PublicNavbar className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200" />

      {/* ── Breadcrumb Bar ── */}
      <div className="border-b border-slate-200/80 bg-white/60 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#0f172a] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/documentation" className="hover:text-[#0f172a] transition-colors">Docs</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Reddit Marketing &amp; AI Advocate Playbook</span>
        </div>
      </div>

      {/* ── Hero Header ── */}
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
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-300/80 shadow-2xs">
                <MessageSquare className="w-4 h-4 text-[#ea580c]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Miracle Reddit Growth Engine · 2026 Edition
                </span>
              </div>
              <PostUpdatedDate date="October 2026" className="bg-white/90 border border-slate-300/80 px-3 py-1 rounded-full shadow-2xs" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.08] mb-5 uppercase">
              The Complete Reddit Marketing &amp; <span className="text-[#ea580c]">AI Advocate Playbook</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed mb-6">
              Step-by-step onboarding, automated Chrome extension posting, account safety karma ladders, 15-module sidebar architecture, and troubleshooting diagnostics.
            </p>

            {/* Quick Navigation Anchor Pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-300/70">
              <a href="#onboarding" className="px-3 py-1.5 rounded-xl bg-white border border-slate-300/80 hover:border-[#ea580c] text-xs font-bold text-slate-800 transition-all shadow-2xs">
                1. Onboarding Steps
              </a>
              <a href="#safety" className="px-3 py-1.5 rounded-xl bg-white border border-slate-300/80 hover:border-[#ea580c] text-xs font-bold text-slate-800 transition-all shadow-2xs">
                2. Karma &amp; Account Safety
              </a>
              <a href="#thresholds" className="px-3 py-1.5 rounded-xl bg-white border border-slate-300/80 hover:border-[#ea580c] text-xs font-bold text-slate-800 transition-all shadow-2xs">
                3. Relevance Thresholds
              </a>
              <a href="#features" className="px-3 py-1.5 rounded-xl bg-white border border-slate-300/80 hover:border-[#ea580c] text-xs font-bold text-slate-800 transition-all shadow-2xs">
                4. Features &amp; Sidebar (15)
              </a>
              <a href="#troubleshooting" className="px-3 py-1.5 rounded-xl bg-[#0f172a] text-white text-xs font-bold transition-all shadow-2xs hover:bg-[#1e293b]">
                5. Troubleshooting (6)
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Main Playbook Container ── */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full space-y-20">

        {/* ══════════════════════════════════════════════════════════
            SECTION 1: ONBOARDING & SETUP
        ══════════════════════════════════════════════════════════ */}
        <section id="onboarding" className="scroll-mt-24">
          <div className="mb-8">
            <span className="text-[11px] font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
              Phase 01 · Zero to Live
            </span>
            <h2 className="text-3xl font-black text-[#0f172a] uppercase tracking-tight">
              5-Step Miracle Onboarding Architecture
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1 max-w-2xl">
              Follow these core steps to initialize your workspace, attach your brand knowledge base, and link your Reddit account with zero password exposure.
            </p>
          </div>

          <div className="space-y-6">
            {ONBOARDING_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 text-[#ea580c] font-black text-sm flex items-center justify-center">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-[#0f172a] leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={`self-start sm:self-auto text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-5">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {step.points.map((pt, pIdx) => (
                    <div key={pIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-medium leading-snug">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Two Posting Modes Box ── */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <h4 className="text-base font-bold text-[#0f172a]">Mode A: Chrome Extension (Automated)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">
                Click <strong>Approve</strong> on a pending draft in your web dashboard. The Miracle Chrome Extension automatically posts the comment to Reddit when natural conditions are met (karma threshold, cooldown timer, daily limits).
              </p>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 inline-block">
                Zero Friction · Natural Timing
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Copy className="w-5 h-5 text-[#ea580c]" />
                <h4 className="text-base font-bold text-[#0f172a]">Mode B: Copy &amp; Open (Manual)</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">
                Click <strong>Copy &amp; Open</strong> on any draft. Miracle copies the optimized comment text to your clipboard and opens the exact Reddit thread in a new tab. Paste, submit, done. The app marks it posted instantly.
              </p>
              <span className="text-[11px] font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200 inline-block">
                100% Control · Instant Posting
              </span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2: RELEVANCE THRESHOLDS & QUALITY LEVERS
        ══════════════════════════════════════════════════════════ */}
        <section id="thresholds" className="scroll-mt-24">
          <div className="mb-8">
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Phase 02 · Scanner Tuning
            </span>
            <h2 className="text-3xl font-black text-[#0f172a] uppercase tracking-tight">
              AI Relevance Thresholds &amp; Quality Levers
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1 max-w-2xl">
              Miracle scans your active subreddits continuously. Configure the exact sensitivity slider in <strong>Settings → General</strong> to control how many qualifying drafts you receive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {RELEVANCE_THRESHOLDS.map((thresh) => (
              <div
                key={thresh.level}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-black text-[#0f172a]">{thresh.level} ({thresh.percentage})</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${thresh.badgeColor}`}>
                      {thresh.badge}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#ea580c] mb-2">{thresh.yield}</div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {thresh.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 3 Levers to Perfect Quality */}
          <div className="rounded-3xl bg-[#0f172a] text-white p-8 sm:p-10">
            <div className="flex items-center gap-2.5 mb-4">
              <Sparkles className="w-5 h-5 text-[#ea580c]" />
              <h3 className="text-xl font-bold">Three Levers to Maximize Comment Quality</h3>
            </div>
            <p className="text-xs text-slate-300 mb-6 max-w-2xl">
              If draft volume is too low, too high, or off-brand, adjust these three operational dials:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-mono font-bold text-[#ea580c] block mb-1">LEVER 01</span>
                <h4 className="text-sm font-bold text-white mb-2">Refine Your Advocate Voice</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Go to Advocates → Refine. Rewrite 5 sample drafts in your authentic voice. The AI extracts your sentence length, vocabulary, and disclosure preferences.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-mono font-bold text-[#ea580c] block mb-1">LEVER 02</span>
                <h4 className="text-sm font-bold text-white mb-2">Attach Knowledge Base</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload PDF, MD, or TXT documentation to your campaign or crawl your website (up to 100 pages). Grounds AI replies in real product features and links.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-xs font-mono font-bold text-[#ea580c] block mb-1">LEVER 03</span>
                <h4 className="text-sm font-bold text-white mb-2">Adjust Relevance Threshold</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Switch from Balanced (50%) to Strict (70%) to filter for only high-purchase-intent questions, or Lenient (45%) to capture broader topic conversations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: KARMA & ACCOUNT SAFETY
        ══════════════════════════════════════════════════════════ */}
        <section id="safety" className="scroll-mt-24">
          <div className="mb-8">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
              Phase 03 · Anti-Shadowban Protection
            </span>
            <h2 className="text-3xl font-black text-[#0f172a] uppercase tracking-tight">
              Karma Ramping &amp; Account Safety Protocol
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1 max-w-2xl">
              Reddit aggressively flags new accounts with sudden posting spikes. Miracle implements automated pacing algorithms to guarantee 100% account longevity.
            </p>
          </div>

          {/* Ramp Schedule Visual */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
            <h3 className="text-base font-bold text-[#0f172a] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Automated Warmup Ramp Schedule
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Track this live on the Dashboard&apos;s Warmup widget. The engine automatically restricts daily volume during the initial 7 days:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">DAYS 1–2</span>
                <span className="text-base font-black text-[#0f172a] block my-1">Browse Only</span>
                <span className="text-[11px] text-slate-500 font-medium">0 posts · Read &amp; warm session</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">DAYS 3–4</span>
                <span className="text-base font-black text-[#0f172a] block my-1">1 Post / Day</span>
                <span className="text-[11px] text-slate-500 font-medium">100% genuine community value</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">DAYS 5–6</span>
                <span className="text-base font-black text-[#0f172a] block my-1">2 Posts / Day</span>
                <span className="text-[11px] text-slate-500 font-medium">Initial contextual product mentions</span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block">DAY 7+</span>
                <span className="text-base font-black text-emerald-900 block my-1">Full Pace</span>
                <span className="text-[11px] text-emerald-700 font-medium">Regular daily campaign quota</span>
              </div>
            </div>
          </div>

          {/* Dynamic Karma-to-Promotion Ratio Table */}
          <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-base font-bold text-[#0f172a]">
                Dynamic Karma-to-Promotion Allocation Ratio
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                As account karma accumulates, the engine automatically increases the ratio of promotional vs. warmup drafts.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-left">
                  <tr>
                    <th className="p-4 font-bold text-[#0f172a]">Account Karma</th>
                    <th className="p-4 font-bold text-[#0f172a]">Promotional %</th>
                    <th className="p-4 font-bold text-[#0f172a]">Warmup %</th>
                    <th className="p-4 font-bold text-[#0f172a]">Stage Badge</th>
                    <th className="p-4 font-bold text-[#0f172a]">Behavioral Protocol</th>
                  </tr>
                </thead>
                <tbody>
                  {KARMA_TIERS.map((tier, i) => (
                    <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-[#0f172a]">{tier.karma}</td>
                      <td className="p-4 font-bold text-[#ea580c]">{tier.promoRatio}</td>
                      <td className="p-4 font-semibold text-emerald-700">{tier.warmupRatio}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold border border-slate-200">
                          {tier.stage}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">{tier.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Four Golden Rules for Safe Automation ── */}
          <div className="mt-8 rounded-3xl bg-[#0f172a] text-white p-8 sm:p-10 shadow-lg">
            <div className="flex items-center gap-2.5 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold">Four Golden Rules for Safe Automation</h3>
            </div>
            <p className="text-xs text-slate-300 mb-6 max-w-2xl">
              Follow these foundational behavioral guidelines to protect your connected accounts from moderation flags, shadowbans, and posting rate limits:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">1. Keep the Chrome Extension Running</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Keep your browser active so the system can pace posting naturally with humanized delays, cooldown intervals, and subreddit rule compliance.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">2. Zero Manual Posting in Target Subreddits</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Do not manually post promotional comments outside Miracle in the same subreddits you are actively targeting. Manual activity bypasses automated safety pacing and can trigger spam filters.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">3. Always Review Draft Tone Before Approving</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Take 5 seconds to review draft context and tone before clicking Approve. Ensure every comment provides authentic value to the OP before mentioning your solution.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">4. Never Rush the 7-Day Warmup Ramp</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Allow the engine to follow the automated pacing ladder (browse → 1 post/day → 2 posts/day → full pace). Rushing new accounts directly into high-volume promotion invites immediate shadowbans.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Deep Dive: The Fire Icon (Warmup Indicator) & Manual Posting Risks ── */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Fire Icon Card */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0f172a]">The Fire Icon (🔥 Warmup Indicator)</h4>
                    <span className="text-[11px] font-semibold text-orange-600">Active Account Pacing Indicator</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium mb-4">
                  The fire icon on an Account card means the connected Reddit account is still in <strong>active warmup</strong> — its karma has not yet reached the milestone threshold where the full promotional ratio unlocks.
                </p>

                <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><strong>Expected Drafts:</strong> While the fire is visible, expect mostly warmup (non-promotional, high-value) drafts for that account.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><strong>Automatic Transition:</strong> The fire icon disappears automatically once the account crosses the initial karma threshold.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span><strong>Track Progress:</strong> View the exact milestone threshold and progress bar under <strong>Journey → [account]</strong>.</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-semibold text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Guarantees karma builds naturally before commercial links are introduced.
              </div>
            </div>

            {/* Manual Posting Risks Card */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0f172a]">Manual Posting vs. Automated Safety</h4>
                    <span className="text-[11px] font-semibold text-rose-600">Spam Filter Collision Prevention</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium mb-4">
                  Manual comments posted directly on Reddit do <strong>not</strong> update your Miracle activity log or daily quota cap. However, they directly impact the account&apos;s real Reddit karma and public post history.
                </p>

                <div className="space-y-2.5 p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80 text-xs font-medium text-slate-800 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>The Critical Risk:</strong> Posting promotional content manually while an account is still in warmup flags the account to Reddit subreddit moderators and the platform spam filter.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>Impact on Automation:</strong> Moderator flags or account throttles directly interfere with the Chrome extension&apos;s ability to post future approved drafts.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span><strong>The Golden Rule:</strong> Keep manual Reddit activity strictly outside the subreddits you are targeting with Miracle — especially during the first 7 days.</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-semibold text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Let the automated pacing engine handle targeted subreddits safely.
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4: 15 SIDEBAR FEATURES DIRECTORY
        ══════════════════════════════════════════════════════════ */}
        <section id="features" className="scroll-mt-24">
          <div className="mb-8">
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-1">
              Phase 04 · Architecture Breakdown
            </span>
            <h2 className="text-3xl font-black text-[#0f172a] uppercase tracking-tight">
              Features &amp; Sidebar Directory (15 Modules)
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1 max-w-2xl">
              Complete functional guide to every screen, widget, tool, and setting inside the Miracle Studio platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Feature Buttons (Spans 5 cols) */}
            <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {SIDEBAR_FEATURES.map((feat) => {
                const Icon = feat.icon
                const isActive = activeFeatureTab === feat.id
                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveFeatureTab(feat.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-md scale-[1.02]'
                        : 'bg-white text-slate-800 border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-xl shrink-0 ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold block truncate">{feat.title}</span>
                        <span className={`text-[10px] truncate block ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                          {feat.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ml-2 ${isActive ? 'text-[#ea580c]' : 'text-slate-400'}`} />
                  </button>
                )
              })}
            </div>

            {/* Right Column: Active Feature Detail View (Spans 7 cols) */}
            <div className="lg:col-span-7 sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)]"
                >
                  <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-300/70">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-white border border-slate-300/80 text-[#ea580c] shadow-2xs">
                        <selectedFeature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0f172a]">
                          {selectedFeature.title}
                        </h3>
                        <span className="text-xs font-semibold text-slate-500">
                          {selectedFeature.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-[#ea580c] mb-2">
                    {selectedFeature.summary}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6">
                    {selectedFeature.details}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/90 border border-slate-300/80 text-xs font-semibold text-slate-600 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Integrated with live Chrome extension sync and UTC midnight quota logic.
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5: TROUBLESHOOTING & DIAGNOSTIC PLAYBOOKS
        ══════════════════════════════════════════════════════════ */}
        <section id="troubleshooting" className="scroll-mt-24">
          <div className="mb-8">
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
              Phase 05 · Operational Diagnostics
            </span>
            <h2 className="text-3xl font-black text-[#0f172a] uppercase tracking-tight">
              Troubleshooting Diagnostic Center
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1 max-w-2xl">
              Solutions for common operational issues: missing drafts, dropped extension sessions, queued states, and quota resets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Nav (4 cols) */}
            <div className="md:col-span-4 space-y-2">
              {TROUBLESHOOTING_GUIDES.map((guide) => {
                const isActive = activeTroubleshooting === guide.id
                return (
                  <button
                    key={guide.id}
                    onClick={() => setActiveTroubleshooting(guide.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-md'
                        : 'bg-white text-slate-800 border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? 'text-[#ea580c]' : 'text-slate-400'}`} />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold leading-snug line-clamp-2">{guide.title}</h4>
                      <span className={`text-[10px] block mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                        {guide.category}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Right Active Resolution Card (8 cols) */}
            <div className="md:col-span-8">
              {(() => {
                const activeGuide = TROUBLESHOOTING_GUIDES.find(g => g.id === activeTroubleshooting) || TROUBLESHOOTING_GUIDES[0]
                return (
                  <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block mb-1">
                      {activeGuide.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#0f172a] mb-2 leading-snug">
                      {activeGuide.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mb-6">
                      {activeGuide.summary}
                    </p>

                    <div className="space-y-3 mb-6">
                      {activeGuide.steps.map((st, sIdx) => (
                        <div key={sIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-800 leading-relaxed">
                          {st}
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-950 flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
                      <span>{activeGuide.note}</span>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 6: LAUNCH CTA BANNER
        ══════════════════════════════════════════════════════════ */}
        <section className="rounded-3xl bg-[#0f172a] text-white p-10 sm:p-14 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#ea580c] uppercase tracking-wider block mb-2">
              Ready to Dominate AI Search &amp; Community Citations?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
              Deploy Your AI Advocate Persona Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-8">
              Join SaaS teams and agency founders using Miracle to monitor subreddits, generate authentic drafts, and scale organic brand citations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button className="rounded-2xl h-12 px-8 bg-[#ff5500] hover:bg-[#e64d00] text-white font-bold text-xs shadow-lg shadow-orange-500/20">
                  Start Miracle Onboarding <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-2xl h-12 px-8 border-slate-700 bg-slate-900 text-white font-bold text-xs hover:bg-slate-800">
                  Book Architecture Call
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
