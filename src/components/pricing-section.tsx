"use client"

import React, { useState } from 'react'
import { Check, Zap, Bot, Globe2, BrainCircuit, Sparkles, ArrowRight, MessageSquare, Mic, Video, Workflow, Languages, Tag, Rocket, Building2, ShieldCheck, Sparkle, DollarSign } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.951 1.18-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.076-.151-.677-1.632-.927-2.235-.243-.587-.49-.508-.676-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.275.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.109.15.2 2.12 3.238 5.136 4.542.717.311 1.277.496 1.713.635.72.229 1.375.197 1.893.12.578-.087 1.78-.727 2.03-1.429.252-.702.252-1.304.176-1.429-.075-.125-.276-.2-.577-.35z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.662 1.438 5.176L2 22l4.981-1.405C8.423 21.494 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.16 8.16 0 0 1-4.22-1.17l-.303-.18-2.957.834.84-2.882-.198-.316A8.17 8.17 0 0 1 3.8 12c0-4.522 3.678-8.2 8.2-8.2s8.2 3.678 8.2 8.2-3.678 8.2-8.2 8.2z" />
    </svg>
  )
}

type Currency = 'INR' | 'USD'

const coreTiers = [
  {
    id: "upstart",
    name: "AI Upstart",
    badge: "Starter Plan",
    color: "emerald",
    icon: Rocket,
    tagline: "Get your brand started appearing in AI answers.",
    monthlyPriceINR: 6459,
    originalPriceINR: 8499,
    setupINR: "₹2,999 setup",
    monthlyPriceUSD: 79,
    originalPriceUSD: 99,
    setupUSD: "$39 setup",
    buttonText: "Get Started",
    isPopular: false,
    packageTitle: "Included Features",
    features: [
      "1 Reddit growth playbook",
      "1 campaign & 10 subreddits",
      "1 Brand Monitor domain",
      "50 AI visibility prompts",
      "~2× AI citation lift*",
      "Unlimited seats",
      "Community support",
    ],
  },
  {
    id: "visible",
    name: "AI Visible",
    badge: "Own a Niche",
    color: "blue",
    icon: Sparkles,
    tagline: "Substantially more aggressive visibility strategy.",
    monthlyPriceINR: 14999,
    originalPriceINR: 18749,
    setupINR: "₹4,999 setup",
    monthlyPriceUSD: 179,
    originalPriceUSD: 229,
    setupUSD: "$59 setup",
    buttonText: "Get Started",
    isPopular: false,
    packageTitle: "Everything in Upstart, plus",
    features: [
      "3 Reddit growth playbooks",
      "3 campaigns & 30 subreddits",
      "3 Brand Monitor domains",
      "200 AI visibility prompts",
      "~5× AI citation lift*",
      "5 websites to monitor",
      "500 keywords to track daily",
      "Keyword research & optimization tools",
      "Competitors insights tools",
      "MCP access",
      "Unlimited seats",
      "Slack integration & Email support",
    ],
  },
  {
    id: "growth",
    name: "AI Growth",
    badge: "Most Popular",
    color: "purple",
    icon: Bot,
    tagline: "Dominate AI search — highest-volume campaign plan.",
    monthlyPriceINR: 39999,
    originalPriceINR: 49999,
    setupINR: "₹14,999 setup",
    monthlyPriceUSD: 479,
    originalPriceUSD: 599,
    setupUSD: "$179 setup",
    buttonText: "Start Free Trial",
    isPopular: true,
    packageTitle: "Everything in Visible, plus",
    features: [
      "Advanced Reddit growth suite",
      "3 campaigns & 100 subreddits",
      "5 Brand Monitor domains",
      "300 AI visibility prompts",
      "~10× AI citation lift*",
      "15 websites to monitor",
      "1,500 keywords to track daily",
      "Historical SEO data",
      "Content optimization",
      "Keyword cannibalization analysis",
      "Multi-location/device tracking",
      "Unlimited seats",
      "Slack integration & Priority support",
    ],
  },
]

const enterpriseTiers = [
  {
    id: "scale",
    name: "AI Scale",
    badge: "High Growth & Scale",
    color: "blue",
    icon: Globe2,
    tagline: "Enterprise tracking & continuous AI content publishing.",
    monthlyPriceINR: 89999,
    originalPriceINR: 112499,
    setupINR: "Custom setup",
    monthlyPriceUSD: 1099,
    originalPriceUSD: 1349,
    setupUSD: "Custom setup",
    buttonText: "Talk to Sales",
    features: [
      "All Pro+ features included",
      "40 websites to monitor",
      "5,000 keywords to track daily",
      "SEO share of voice",
      "API data integration",
      "600 prompts, run daily — 108,000 AI answers tracked / month",
      "6 platforms: ChatGPT, Google AIO, AI Mode, Gemini, Perplexity, Copilot",
      "18 publish-ready articles per month",
      "10 seats & full CSV / PDF / API exports",
      "Email + Chat dedicated support",
    ],
  },
  {
    id: "enterprise",
    name: "AI Enterprise",
    badge: "Custom Suite",
    color: "amber",
    icon: Building2,
    tagline: "Full enterprise automation for BFSI, healthcare & large platforms.",
    monthlyPriceINR: 200000,
    originalPriceINR: 250000,
    setupINR: "Custom deployment",
    monthlyPriceUSD: 2499,
    originalPriceUSD: 2999,
    setupUSD: "Custom deployment",
    isCustom: true,
    buttonText: "Book a Call",
    features: [
      "Unlimited-scope visibility program across brands & global regions",
      "Custom voice agents with CRM / ERP integration & 10+ languages",
      "Dedicated automation engineering pod & account manager",
      "SLA-backed support & DPDP Act compliance handling",
      "On-premise deployment options available",
    ],
  },
]

const addOns = [
  { name: "Voice agent minutes (beyond included)", priceINR: "₹6–9 / min depending on volume", priceUSD: "$0.08–0.12 / min", icon: Mic },
  { name: "Extra chatbot conversations", priceINR: "₹2,499 per 1,000", priceUSD: "$29 per 1,000", icon: MessageSquare },
  { name: "Additional automation workflow", priceINR: "₹14,999 setup + ₹2,999 / mo", priceUSD: "$179 setup + $35 / mo", icon: Workflow },
  { name: "Extra regional language for voice agent", priceINR: "₹9,999 / mo per language", priceUSD: "$119 / mo per language", icon: Languages },
  { name: "Video creative (per unit)", priceINR: "₹4,999 – ₹14,999", priceUSD: "$59 – $179", icon: Video },
]

const levers = [
  { label: "14-day paid pilot", detailINR: "₹4,999 — adjusted against setup fee if you convert", detailUSD: "$59 — adjusted against setup fee if you convert", highlight: true },
  { label: "Annual prepay", detailINR: "2 months free (~16% off total retainer)", detailUSD: "2 months free (~16% off total retainer)", highlight: false },
  { label: "Quarterly billing", detailINR: "5% off monthly rate", detailUSD: "5% off monthly rate", highlight: false },
  { label: "Founding customer", detailINR: "Lock current rates for life — limited to first 20 clients", detailUSD: "Lock current rates for life — limited to first 20 clients", highlight: true },
]

export function PricingSection() {
  const [currency, setCurrency] = useState<Currency>('INR')
  const [isAnnual, setIsAnnual] = useState(false)
  const [couponApplied, setCouponApplied] = useState(false)
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const calcPrice = (monthlyINR: number, monthlyUSD: number, tierId?: string) => {
    if (currency === 'USD') {
      let val = isAnnual ? monthlyUSD * 0.84 : monthlyUSD
      if (couponApplied && tierId !== 'upstart') {
        val = Math.max(10, val - 25)
      }
      return `$${Math.round(val).toLocaleString('en-US')}`
    } else {
      let val = isAnnual ? monthlyINR * 0.84 : monthlyINR
      if (couponApplied && tierId !== 'upstart') {
        val = Math.max(1000, val - 2000)
      }
      return `₹${Math.round(val).toLocaleString('en-IN')}`
    }
  }

  const getOriginalPrice = (originalINR: number, originalUSD: number) => {
    return currency === 'USD'
      ? `$${originalUSD.toLocaleString('en-US')}`
      : `₹${originalINR.toLocaleString('en-IN')}`
  }

  const getSetupFee = (setupINR: string, setupUSD: string) => {
    return currency === 'USD' ? setupUSD : setupINR
  }

  const getWhatsAppLink = (
    tier: {
      name: string
      buttonText: string
      monthlyPriceINR: number
      monthlyPriceUSD: number
      setupINR: string
      setupUSD: string
      id?: string
      isCustom?: boolean
    },
    includeCustomQuery = false
  ) => {
    const price = tier.isCustom
      ? "Custom Enterprise Quote"
      : `${calcPrice(tier.monthlyPriceINR, tier.monthlyPriceUSD, tier.id)}/month`

    const setup = getSetupFee(tier.setupINR, tier.setupUSD)
    const billingCycle = isAnnual ? "Annual Prepays (Save 16%)" : "Monthly Billing"
    const couponNotice = couponApplied && tier.id !== "upstart"
      ? (currency === "USD" ? "SAVE25 ($25 OFF Applied)" : "SAVE2000 (₹2,000 OFF Applied)")
      : "None"

    let userQuery = ""
    if (includeCustomQuery) {
      try {
        if (typeof window !== "undefined") {
          userQuery = localStorage.getItem("miracle_prompt_query") || ""
        }
      } catch {}
    }

    let text = `👋 *Hi Miracle Studio Team!*\n\n`
    text += `I would like to *${tier.buttonText}* for the *${tier.name}* plan.\n\n`
    text += `📋 *Plan Details:*\n`
    text += `• *Plan:* ${tier.name}\n`
    text += `• *Action:* ${tier.buttonText}\n`
    text += `• *Estimated Price:* ${price}\n`
    text += `• *Setup:* ${setup}\n`
    text += `• *Billing Cycle:* ${billingCycle} (${currency})\n`
    if (couponApplied && tier.id !== "upstart") {
      text += `• *Coupon Applied:* ${couponNotice}\n`
    }

    if (userQuery && userQuery.trim()) {
      text += `\n💡 *My Project / Business Idea:*\n"${userQuery.trim()}"\n`
    }

    text += `\nPlease let me know the next steps to proceed!`

    const phone = "917376284881"
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }

  const handleCtaClick = (
    tier: {
      name: string
      buttonText: string
      monthlyPriceINR: number
      monthlyPriceUSD: number
      setupINR: string
      setupUSD: string
      id?: string
      isCustom?: boolean
    },
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault()
    const dynamicLink = getWhatsAppLink(tier, true)
    toast.success(`Opening WhatsApp for ${tier.name}!`, {
      description: `Sending your "${tier.buttonText}" query directly to WhatsApp...`,
      duration: 3500,
    })
    window.open(dynamicLink, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="pricing" suppressHydrationWarning className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 font-body relative">

      {/* Cursive Handwriting Overline */}
      <div className="text-center mb-3">
        <span className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-[#ff5500] tracking-wide block">
          simple, transparent pricing
        </span>
      </div>

      {/* ─── Header Block ─── */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0f172a] uppercase mb-4 leading-tight">
            NO HIDDEN FEES. <span className="text-[#ff5500]">JUST SHIPPING.</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed mb-8">
            From quick MVP sprints to dedicated enterprise AI agent pipelines and citation dominance. Cancel or pause anytime.
          </p>

          {/* Toggle Controls Bar (Currency, Billing, Coupon) */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            
            {/* Currency Selector (INR / USD) */}
            <div className="flex items-center p-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>₹ INR</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>$ USD</span>
              </button>
            </div>

            {/* Billing Toggle (Monthly / Annual) */}
            <div className="flex items-center gap-2 p-1 rounded-full bg-white border border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  !isAnnual
                    ? 'bg-[#0f172a] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isAnnual
                    ? 'bg-[#ff5500] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Annual Prepays
                <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase">
                  Save 16%
                </span>
              </button>
            </div>

            {/* Coupon Code Button */}
            <div className="flex flex-col items-center">
              <Button
                variant={couponApplied ? "default" : "outline"}
                size="sm"
                onClick={() => setCouponApplied(!couponApplied)}
                className={`rounded-full px-4 py-2 h-auto text-xs font-bold transition-all cursor-pointer ${
                  couponApplied
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md border-transparent'
                    : 'border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 bg-white'
                }`}
              >
                <Tag className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                {couponApplied
                  ? (currency === 'USD' ? "Code Applied: $25 Off" : "Code Applied: ₹2,000 Off")
                  : (currency === 'USD' ? "Apply Code: SAVE25" : "Apply Code: SAVE2000")
                }
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── Core Plans (3 Columns Hero Grid) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 items-stretch">
        {coreTiers.map((tier, i) => {
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`
                relative flex flex-col rounded-3xl p-7 transition-all duration-300 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)]
                ${tier.isPopular
                  ? 'border-2 border-[#18a0fb] shadow-2xl scale-[1.03] z-10'
                  : 'border border-white/90 hover:shadow-2xl hover:border-[#ff5500]/50'
                }
              `}
            >
              {/* Corner Blue Nodes for Popular Card */}
              {tier.isPopular && (
                <>
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb]" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb]" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb]" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#18a0fb]" />
                  
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ff5500] text-white px-3.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkle className="w-3 h-3 fill-current text-white" />
                    Most Popular Choice
                  </div>
                </>
              )}

              {/* Card Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl ${
                    tier.isPopular ? 'bg-[#0f172a] text-white' : 'bg-white border border-slate-300/80 text-slate-800'
                  }`}>
                    <tier.icon className="w-5 h-5 text-[#ff5500]" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-slate-300/80 text-slate-800 shadow-2xs">
                    {tier.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{tier.name}</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">{tier.tagline}</p>
              </div>

              {/* Pricing Display */}
              <div className="mb-6 pb-6 border-b border-slate-300/70">
                <div className="flex items-baseline justify-between gap-1.5" suppressHydrationWarning>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                      {calcPrice(tier.monthlyPriceINR, tier.monthlyPriceUSD, tier.id)}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">/month</span>
                  </div>
                  {couponApplied && tier.id !== 'upstart' && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold">
                      {currency === 'USD' ? '$25 OFF' : '₹2,000 OFF'}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 mt-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="line-through">{getOriginalPrice(tier.originalPriceINR, tier.originalPriceUSD)}</span>
                    <span className="text-emerald-700 font-bold">{getSetupFee(tier.setupINR, tier.setupUSD)}</span>
                  </div>
                  {couponApplied && tier.id === 'upstart' && (
                    <span className="text-[10px] text-slate-500 font-medium italic">
                      Coupon not applicable
                    </span>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                    {tier.packageTitle}
                  </p>
                  <ul className="flex flex-col gap-3 mb-8" suppressHydrationWarning>
                    {tier.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 leading-normal font-medium" suppressHydrationWarning>
                        <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${
                          tier.isPopular ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA Button */}
                <a
                  href={getWhatsAppLink(tier, false)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleCtaClick(tier, e)}
                  className={cn(
                    buttonVariants(),
                    `w-full rounded-2xl h-11 text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                      tier.isPopular
                        ? 'bg-[#ff5500] hover:bg-[#e64d00] text-white shadow-orange-500/20 hover:scale-102'
                        : 'bg-[#0f172a] hover:bg-[#1e293b] text-white'
                    }`
                  )}
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-400" />
                  <span>{tier.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ─── Enterprise & Scale Plans Matrix (2 Wide Cards) ─── */}
      <div className="mb-20">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center mb-6">
          High-Volume &amp; Enterprise Solutions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enterpriseTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative flex flex-col justify-between rounded-3xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-7 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-2xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-300/80 text-indigo-600 shadow-2xs">
                      <tier.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{tier.name}</h4>
                      <span className="text-xs text-indigo-600 font-semibold">{tier.badge}</span>
                    </div>
                  </div>
                  <div className="text-right" suppressHydrationWarning>
                    <div className="text-2xl font-extrabold text-gray-900">
                      {tier.isCustom ? "Custom" : calcPrice(tier.monthlyPriceINR, tier.monthlyPriceUSD, tier.id)}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{getSetupFee(tier.setupINR, tier.setupUSD)}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 mb-5 font-medium">{tier.tagline}</p>
                <div className="border-t border-slate-300/70 pt-4 mb-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" suppressHydrationWarning>
                    {tier.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-medium" suppressHydrationWarning>
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={getWhatsAppLink(tier, false)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleCtaClick(tier, e)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full rounded-xl h-10 border-slate-300 bg-white text-gray-800 font-bold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-xs shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-colors"
                )}
              >
                <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-600" />
                <span>{tier.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Usage Add-Ons Section ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Modular Usage Add-Ons</h3>
          <p className="text-xs text-slate-600">Customize any plan with dedicated voice minutes, custom workflows, or regional language capabilities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {addOns.map((addon, i) => {
            const AddonIcon = addon.icon
            return (
              <div
                key={i}
                className="flex items-start gap-3.5 p-4 rounded-2xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="p-2 rounded-xl bg-white border border-slate-300/80 text-indigo-600 shrink-0 shadow-2xs">
                  <AddonIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-snug">{addon.name}</p>
                  <p className="text-[11px] font-medium text-indigo-600 mt-1">
                    {currency === 'USD' ? addon.priceUSD : addon.priceINR}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* ─── Smart Savings Cards ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="rounded-3xl border border-white/90 bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] p-7 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,1)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900">Smart Savings Program</h4>
              <p className="text-xs text-slate-600">Flexible commitment options to maximize ROI</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {levers.map((lever, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border transition-all ${
                  lever.highlight
                    ? 'border-indigo-300 bg-indigo-50/60 shadow-xs'
                    : 'border-slate-300/80 bg-white/90 shadow-2xs'
                }`}
              >
                <span className="text-xs font-bold text-gray-900 block mb-0.5">{lever.label}</span>
                <span className="text-[11px] font-medium text-slate-700 leading-relaxed">
                  {currency === 'USD' ? lever.detailUSD : lever.detailINR}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Direct WhatsApp Support / Inquiry */}
          <div className="mt-6 pt-5 border-t border-slate-300/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-gray-900">Custom Architecture or Questions?</p>
              <p className="text-[11px] text-slate-600">Chat directly with our founding engineers on WhatsApp.</p>
            </div>
            <a
              href={`https://wa.me/917376284881?text=${encodeURIComponent("👋 Hi Miracle Studio team! I have a question about custom architecture / pricing.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => toast.success("Opening WhatsApp chat with our engineers...")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:scale-102 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Legal Disclaimers — FTC / ROSCA compliance */}
          <div className="mt-8 pt-5 border-t border-slate-200/80 space-y-2">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Subscriptions renew automatically each month at the stated rate unless cancelled prior to the renewal date. You may cancel anytime from your Billing Settings. See our{' '}
              <a href="/refund-policy" className="underline hover:text-slate-600 transition-colors">Refund &amp; Cancellation Policy</a> for details.
            </p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              * Citation lift estimates are based on internal benchmarks across monitored campaigns; individual results may vary based on niche, content quality, and market conditions.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
