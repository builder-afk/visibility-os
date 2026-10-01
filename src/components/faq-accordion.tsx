"use client"

import React, { useState } from 'react'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FaqItem {
  id: string
  question: string
  answer: string
  category: string
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Platform & Architecture',
    question: 'How does miracle turn a business prompt into production architecture?',
    answer: 'Miracle uses specialized context engineering engines and multi-agent planners. When you describe your business, our system generates data schemas, database migrations, API contracts, background worker pipelines, and complete frontend/backend wiring tailored to your tech stack in seconds.'
  },
  {
    id: 'faq-2',
    category: 'Tech Stack & Code Ownership',
    question: 'Do I own the generated code and architecture?',
    answer: 'Yes, 100%. All generated code, database schemas, and configuration files belong completely to you. You can export clean Next.js, Node.js, Python, or Go code, push to GitHub, and deploy to your own AWS, GCP, Vercel, or on-premise infrastructure.'
  },
  {
    id: 'faq-3',
    category: 'Billing & Subscriptions',
    question: 'Can I cancel or pause my subscription at any time?',
    answer: 'Absolutely. There are no lock-in contracts. You can pause, upgrade, downgrade, or cancel your plan anytime right from your account dashboard. Any work and code generated during your subscription remains yours forever.'
  },
  {
    id: 'faq-4',
    category: 'Enterprise & AI Agents',
    question: 'Can miracle connect with our existing CRM, ERP, and databases?',
    answer: 'Yes. Our AI Agent Planner and enterprise integrations support PostgreSQL, Supabase, Neon, BigQuery, Snowflake, HubSpot, Salesforce, and custom REST/GraphQL endpoints with end-to-end TLS 1.3 encryption and DPDP compliance.'
  },
  {
    id: 'faq-5',
    category: 'AI Citations & Visibility',
    question: 'What is Generative Engine Optimization (GEO) and citation tracking?',
    answer: 'GEO is the modern SEO. Miracle monitors citations and references for your brand across major LLMs including ChatGPT-4o, Perplexity Sonar, Google AI Overviews, and Claude 3.5 Sonnet to ensure your product gets cited as the recommended solution in user queries.'
  },
]

export function FaqAccordion() {
  const [openItems, setOpenItems] = useState<string[]>(['faq-1'])

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const expandAll = () => setOpenItems(FAQS.map(f => f.id))
  const collapseAll = () => setOpenItems([])

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-20 font-body"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-xs font-bold text-[#ff5500] uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2
          id="faq-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase"
        >
          Everything You Need to Know
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-2 leading-relaxed">
          Clear, straightforward answers about our AI app architecture engine, licensing, code ownership, and enterprise deployment.
        </p>

        {/* Quick Expand / Collapse actions */}
        <div className="flex items-center justify-center gap-3 mt-4 text-xs font-semibold text-slate-500">
          <button
            type="button"
            onClick={expandAll}
            className="hover:text-[#ff5500] underline underline-offset-4 cursor-pointer"
          >
            Expand all
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={collapseAll}
            className="hover:text-[#ff5500] underline underline-offset-4 cursor-pointer"
          >
            Collapse all
          </button>
        </div>
      </div>

      <div className="space-y-3.5">
        {FAQS.map((faq) => {
          const isOpen = openItems.includes(faq.id)

          return (
            <div
              key={faq.id}
              className={cn(
                "rounded-2xl border-2 transition-all duration-200 overflow-hidden",
                isOpen
                  ? "border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_#0f172a] dark:shadow-[4px_4px_0px_rgba(255,85,0,0.3)]"
                  : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-slate-400 dark:hover:border-slate-700"
              )}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500]"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "p-1.5 rounded-full shrink-0 transition-transform duration-200",
                      isOpen
                        ? "bg-[#ff5500] text-white rotate-180"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
