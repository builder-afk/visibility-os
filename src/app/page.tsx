"use client"

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, ChevronRight, Play, Plus, Search, MoreVertical, Code2, Sparkles, Server, LayoutTemplate, Copy, CheckCircle2, ArrowRight, Mic, Paperclip, Settings, Layers, ImagePlus, FileUp, X, Lightbulb, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { submitSearchQueryAction } from '@/app/actions/project'
import { Button } from '@/components/ui/button'
import { StudioComparisonAboutSection } from '@/components/studio-comparison-about-section'
import { WhatWeMakeSection } from '@/components/what-we-make-section'
import { HowItWorksAndVisibilitySuite } from '@/components/how-it-works-and-visibility-suite'
import { PublicNavbar } from '@/components/public-navbar'
import { FeaturesSection } from '@/components/features-section'
import { MarketplaceSection } from '@/components/marketplace-section'
import { Footer } from '@/components/footer'
import { ServicesSection } from '@/components/services-section'
import { PricingSection } from '@/components/pricing-section'
import { ClientGrowthSection } from '@/components/client-growth-section'
import { SocialProofBar } from '@/components/social-proof-bar'
import { PlatformFeaturesSection } from '@/components/platform-features-section'
import { BrutalistBackground } from '@/components/brutalist-background'
import { FaqAccordion } from '@/components/faq-accordion'
import { NewsletterSignup } from '@/components/newsletter-signup'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'
import { CopyToClipboardButton } from '@/components/ui/copy-to-clipboard'

const PROMPT_TYPES = [
  { id: "Backend Architecture", name: "Backend Architecture", desc: "Design backend architecture" },
  { id: "SaaS Planner", name: "SaaS Planner", desc: "Plan a SaaS application" },
  { id: "AI Agent Planner", name: "AI Agent Planner", desc: "Plan AI agent systems" },
  { id: "Database Designer", name: "Database Designer", desc: "Design database schemas" },
  { id: "API Designer", name: "API Designer", desc: "Design REST/GraphQL APIs" },
  { id: "Microservice Planner", name: "Microservice Planner", desc: "Plan microservices" },
  { id: "Infrastructure Planner", name: "Infrastructure Planner", desc: "Plan cloud infrastructure" },
  { id: "Security Auditor", name: "Security Auditor", desc: "Audit and plan security" },
  { id: "DevOps Planner", name: "DevOps Planner", desc: "Plan CI/CD & DevOps" },
]

const MODELS = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
  { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro" },
  { id: "basic-model", name: "Basic Model" },
]

const HERO_FEATURE_SUGGESTIONS = [
  [
    { icon: '🔑', label: 'Social Login' },
    { icon: '💳', label: 'Stripe Billing' },
    { icon: '🌙', label: 'Dark Mode' },
    { icon: '📈', label: 'Analytics Dashboard' },
    { icon: '🤖', label: 'AI Chatbot' },
  ],
  [
    { icon: '🔔', label: 'Push Notifications' },
    { icon: '⌨️', label: 'Command Palette' },
    { icon: '📁', label: 'File Uploads' },
    { icon: '🛡️', label: 'Role-Based Access' },
    { icon: '⭐', label: 'Social Proof' },
  ],
  [
    { icon: '📡', label: 'Offline Mode' },
    { icon: '🎯', label: 'Onboarding Tour' },
    { icon: '📧', label: 'Email System' },
    { icon: '🔍', label: 'Smart Search' },
    { icon: '👥', label: 'Real-Time Collab' },
  ],
]

export default function LandingPage() {
  const [promptType, setPromptType] = useState("Backend Architecture")
  const [selectedModel, setSelectedModel] = useState("Claude 3.5 Sonnet")
  const [attachments, setAttachments] = useState<{ name: string, type: string }[]>([])
  const [heroSuggestionIdx, setHeroSuggestionIdx] = useState(0)
  const [promptText, setPromptText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClearModalOpen, setIsClearModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleClearPrompt = () => {
    setPromptText("")
    try {
      localStorage.removeItem('miracle_prompt_query')
    } catch { }
    toast.info("Prompt input cleared.")
  }

  const handleGenerate = async () => {
    const query = promptText.trim()
    if (!query) {
      toast.error("Please enter a business idea or search query.")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await submitSearchQueryAction({
        idea: query,
        promptType,
        model: selectedModel,
        stack: promptType,
      })

      if (res.error) {
        toast.error(res.error)
        setIsSubmitting(false)
        return
      }

      toast.success("Query sent to database & saved to your account!", {
        description: `Project "${res.project?.name}" initialized with Pending approval & Pending status.`,
        duration: 3500,
      })

      // Navigate to user account dashboard where the project is highlighted
      if (res.project?.id) {
        router.push(`/dashboard?created=${res.project.id}`)
      } else {
        router.push("/dashboard")
      }
    } catch (err: any) {
      console.error("Submission failed:", err)
      toast.error("Failed to save project. Please try again.")
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    try {
      const saved = localStorage.getItem('miracle_prompt_query')
      if (saved && !promptText) {
        setPromptText(saved)
      }
    } catch { }
    const timer = setInterval(() => {
      setHeroSuggestionIdx(prev => (prev + 1) % HERO_FEATURE_SUGGESTIONS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setAttachments(prev => [...prev, { name: file.name, type }])
      e.target.value = ''
    }
  }

  const removeAttachment = (indexToRemove: number) => {
    setAttachments(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative font-body text-foreground">

      {/* ─── Full-page Brutalism Architectural Canvas Background ─── */}
      <BrutalistBackground />

      {/* Floating Navbar */}
      <PublicNavbar />

      {/* 4. Interactive Workspace / Prompt Builder */}
      <main id="main-content" className="relative z-10 flex flex-col items-center w-full flex-1 pt-4 md:pt-8 px-4">

        {/* Sticky Tag Note */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 bg-[#FFE600] text-slate-950 border-2 border-slate-900 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#0f172a]">
            <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
            We Help Businesses Grow in the AI-Era
          </span>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0f172a] uppercase max-w-3xl mb-2"
        >
          Prompt to production architecture.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-xs sm:text-sm text-slate-700 font-semibold max-w-[600px] leading-relaxed mb-6"
        >
          Describe your business and what you want your AI system or app to automate. Generate schemas, agent pipelines, and clean code in seconds.
        </motion.p>

        {/* Interactive Prompt Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-3xl relative mb-12"
        >
          <div className="rounded-2xl bg-white border-2 border-slate-900 shadow-[6px_6px_0px_#0f172a] hover:shadow-[8px_8px_0px_#ff5500] transition-all overflow-hidden p-3 relative">
            <textarea
              className="w-full bg-transparent border-0 focus:ring-0 p-4 min-h-[130px] outline-none text-slate-900 text-sm sm:text-base border-none resize-none placeholder:text-slate-400 font-medium transition-colors pb-2"
              placeholder="Describe your business idea... (e.g. 'I run a dental clinic and need a voice assistant to schedule appointments and sync with our CRM.')"
              value={promptText}
              onChange={(e) => {
                setPromptText(e.target.value)
                try {
                  localStorage.setItem('miracle_prompt_query', e.target.value)
                } catch { }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault()
                  handleGenerate()
                }
              }}
            />

            {/* Quick Action Suggestion Pills */}
            <div className="flex flex-wrap items-center gap-1.5 px-4 pb-3">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 mr-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Try:
              </span>
              {HERO_FEATURE_SUGGESTIONS[heroSuggestionIdx].map((feat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const nextVal = promptText ? `${promptText} + ${feat.label}` : feat.label
                    setPromptText(nextVal)
                    try {
                      localStorage.setItem('miracle_prompt_query', nextVal)
                    } catch { }
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAF8F3] text-slate-900 hover:bg-[#FFE600] hover:text-black border border-slate-900/60 shadow-[2px_2px_0px_#0f172a] hover:shadow-[3px_3px_0px_#0f172a] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                >
                  <span>{feat.icon}</span>
                  <span>{feat.label}</span>
                </button>
              ))}
            </div>

            {/* Prompt Actions Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 px-2">
              <div className="flex items-center gap-1.5">
                {/* Prompt Type Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-black bg-[#FAF8F3] hover:bg-slate-100 border border-slate-900/40 shadow-[2px_2px_0px_#0f172a] px-3 py-1.5 rounded-xl transition-all cursor-pointer outline-none">
                    <Layers className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>{promptType}</span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-xl p-1">
                    {PROMPT_TYPES.map(t => (
                      <DropdownMenuItem
                        key={t.id}
                        onClick={() => setPromptType(t.name)}
                        className="flex flex-col items-start gap-0.5 rounded-lg py-2 px-3 cursor-pointer hover:bg-amber-50"
                      >
                        <span className="text-xs font-bold text-slate-900">{t.name}</span>
                        <span className="text-[10px] text-slate-500">{t.desc}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Attach File */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e, 'file')}
                  className="hidden"
                  accept="image/*,.pdf,.txt,.json,.csv"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-xl text-xs font-medium bg-[#FAF8F3] text-slate-700 hover:bg-slate-100 border border-slate-900/40 shadow-[2px_2px_0px_#0f172a] transition-all cursor-pointer"
                  title="Attach screenshot or document"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>

                {promptText.trim().length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <CopyToClipboardButton
                      text={promptText}
                      label="Copy Prompt"
                      showText={true}
                      size="sm"
                      className="border-slate-900/40 shadow-[2px_2px_0px_#0f172a] bg-[#FAF8F3] text-slate-900 hover:bg-slate-100 font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setIsClearModalOpen(true)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-300 rounded-xl px-2.5 py-1.5 shadow-[2px_2px_0px_rgba(220,38,38,0.2)] transition-all cursor-pointer"
                      title="Clear prompt input"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {attachments.map((file, idx) => (
                  <span key={idx} className="text-[11px] font-bold text-[#ff5500] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 flex items-center gap-1">
                    {file.name.slice(0, 12)}...
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeAttachment(idx)} />
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {/* Model Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-[11px] font-bold text-slate-900 hover:text-black bg-[#FAF8F3] hover:bg-slate-100 border border-slate-900/40 shadow-[2px_2px_0px_#0f172a] px-2.5 py-1.5 rounded-xl transition-all cursor-pointer outline-none">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{selectedModel}</span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_#0f172a] rounded-xl p-1">
                    {MODELS.map(m => (
                      <DropdownMenuItem
                        key={m.id}
                        onClick={() => setSelectedModel(m.name)}
                        className="flex items-center gap-2 rounded-lg py-2 px-3 cursor-pointer hover:bg-amber-50"
                      >
                        <span className="text-sm font-medium text-slate-800">{m.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <button
                  onClick={handleGenerate}
                  disabled={isSubmitting}
                  className="bg-[#ff5500] hover:bg-[#e64d00] disabled:opacity-75 text-white border-2 border-slate-900 rounded-xl px-5 py-2 text-xs font-black uppercase tracking-wider transition-all shadow-[3px_3px_0px_#0f172a] hover:shadow-[4px_4px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5. Social Proof Bar */}
        <SocialProofBar />

        {/* 6. What We Make (Screenshot 4) */}
        <WhatWeMakeSection />

        {/* 7. How It Works Thread & Why Visibility Matters Suite (Side by Side Unified) */}
        <HowItWorksAndVisibilitySuite />

        {/* 8. Services */}
        <ServicesSection />

        {/* 9. Studio Comparison & What's Up (Below Services) */}
        <StudioComparisonAboutSection />

        {/* 10. Marketplace & Pricing */}
        <MarketplaceSection />
        <PricingSection />

        {/* 10b. Client Growth Results */}
        <ClientGrowthSection />

        {/* 10c. Progressive Enhancements: Expandable FAQ Accordion */}
        <FaqAccordion />

        {/* 10d. Progressive Enhancements: Newsletter Signup */}
        <div className="w-full max-w-4xl mx-auto px-4 my-8">
          <NewsletterSignup />
        </div>
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Confirmation Modal for Clearing Prompt */}
      <ConfirmationModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearPrompt}
        title="Clear prompt input?"
        description="Are you sure you want to discard your current prompt text? This action cannot be undone."
        confirmText="Yes, Clear"
        cancelText="Keep Text"
        variant="danger"
      />
    </div>
  )
}
// force rebuild turbopack cache
