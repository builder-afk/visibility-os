"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight, Layers, FileText, Wrench, Sparkles, Command, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SearchItem {
  id: string
  title: string
  description: string
  category: 'Tools' | 'Pages' | 'Documentation' | 'Templates'
  href: string
  keywords: string[]
}

const SEARCH_DATABASE: SearchItem[] = [
  // Core Pages
  {
    id: 'page-home',
    title: 'Prompt to Production Architecture',
    description: 'Describe your business and generate clean code, schemas, and agent pipelines.',
    category: 'Pages',
    href: '/',
    keywords: ['home', 'builder', 'generator', 'prompt', 'architecture']
  },
  {
    id: 'page-services',
    title: 'Specialist AI Agent Solutions',
    description: 'Explore tailored AI agents for SEO, PPC, Brand Strategy, and Product Marketing.',
    category: 'Pages',
    href: '/#services',
    keywords: ['services', 'agents', 'specialists', 'consulting']
  },
  {
    id: 'page-templates',
    title: 'n8n & Workflow Templates',
    description: 'Production-ready n8n automations, CRM syncs, and agent blueprints.',
    category: 'Templates',
    href: '/n8n-templates',
    keywords: ['templates', 'n8n', 'workflow', 'automations']
  },
  {
    id: 'page-pricing',
    title: 'Plans & Transparent Pricing',
    description: 'AI Upstart, AI Visible, AI Growth, and Enterprise automation tiers.',
    category: 'Pages',
    href: '/#pricing',
    keywords: ['pricing', 'cost', 'plans', 'upstart', 'visible', 'growth']
  },
  {
    id: 'page-contact',
    title: 'Contact Engineering & Sales',
    description: 'Book a 15-minute call or chat directly with our engineering team.',
    category: 'Pages',
    href: '/contact',
    keywords: ['contact', 'call', 'support', 'sales', 'email', 'chat']
  },
  {
    id: 'page-docs',
    title: 'Technical Documentation & Guides',
    description: 'Complete architecture manuals, API references, and deployment pipelines.',
    category: 'Documentation',
    href: '/documentation',
    keywords: ['docs', 'api', 'reference', 'documentation', 'manual']
  },
  {
    id: 'page-playbook',
    title: 'Reddit AI Growth Playbook',
    description: '7-day organic karma warmup protocol and high-authority discussion generation.',
    category: 'Documentation',
    href: '/reddit-playbook',
    keywords: ['reddit', 'playbook', 'karma', 'growth', 'citations']
  },
  // Key Tools
  {
    id: 'tool-gbp-monitor',
    title: 'GBP Monitor & Local Rank Telemetry',
    description: 'Local 3-Pack rank tracking across 5.0 mi radius with verified coordinates.',
    category: 'Tools',
    href: '/tools/gbp-monitor',
    keywords: ['gbp', 'maps', 'local', 'seo', '3-pack', 'rank']
  },
  {
    id: 'tool-social-media',
    title: 'Social Media Manager & Viral Distribution',
    description: 'Automated AI campaign queue, virality breakout tracking, and cross-platform reach.',
    category: 'Tools',
    href: '/tools/social-media-manager',
    keywords: ['social', 'twitter', 'linkedin', 'reddit', 'viral', 'marketing']
  },
  {
    id: 'tool-web-analytics',
    title: 'Web Analytics & Privacy-First Stream',
    description: 'Cookie-free, GDPR-compliant real-time visitor stream and conversion yields.',
    category: 'Tools',
    href: '/tools/web-analytics',
    keywords: ['analytics', 'visitors', 'traffic', 'gdpr', 'privacy']
  },
  {
    id: 'tool-site-explorer',
    title: 'Site Explorer & Backlink Matrix',
    description: 'Inspect domain rating, referring domain velocity, and organic keyword positions.',
    category: 'Tools',
    href: '/tools/site-explorer',
    keywords: ['backlinks', 'explorer', 'domain', 'dr', 'keywords']
  },
  {
    id: 'tool-ai-content',
    title: 'AI Content Helper & Entity Scorer',
    description: 'Optimize semantic entity density and ChatGPT / Perplexity citation likelihood.',
    category: 'Tools',
    href: '/tools/ai-content-helper',
    keywords: ['content', 'geo', 'citations', 'entities', 'writing']
  },
  {
    id: 'tool-brand-radar',
    title: 'Brand Radar & LLM Share of Voice',
    description: 'Track real-time citations across ChatGPT-4o, Perplexity, and Claude.',
    category: 'Tools',
    href: '/tools/brand-radar',
    keywords: ['brand', 'radar', 'llm', 'chatgpt', 'perplexity', 'claude']
  },
]

export function SiteSearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Listen for Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Filter items in real time
  const filteredItems = query.trim() === ''
    ? SEARCH_DATABASE.slice(0, 6)
    : SEARCH_DATABASE.filter(item => {
        const q = query.toLowerCase()
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some(k => k.toLowerCase().includes(q))
        )
      })

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false)
    router.push(item.href)
  }

  // Keyboard navigation inside search results
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % filteredItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault()
      handleSelect(filteredItems[selectedIndex])
    }
  }

  return (
    <>
      {/* Global Search Trigger Pill for Header / Desktop */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Search site (Press ⌘K)"
        title="Search site (Press ⌘K)"
        className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-all hover:scale-102 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#ff5500]"
      >
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span>Search...</span>
        <kbd className="inline-flex items-center px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-400 shadow-2xs">
          ⌘K
        </kbd>
      </button>

      {/* Mobile Search Icon Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Search site"
        className="sm:hidden p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Search Modal Backdrop & Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:pt-20 bg-black/60 backdrop-blur-sm search-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Site Search"
          >
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 w-full max-w-2xl rounded-2xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_#0f172a] dark:shadow-[8px_8px_0px_rgba(255,85,0,0.4)] overflow-hidden font-body"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-[#FAF8F3]/50 dark:bg-slate-900/50">
                <Search className="w-5 h-5 text-[#ff5500] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search tools, templates, documentation, or pricing..."
                  className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none font-medium"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear query"
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-400">
                    ESC
                  </kbd>
                )}
              </div>

              {/* Real-time Results List */}
              <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No results found for &quot;{query}&quot;</p>
                    <p className="text-xs text-slate-500 mt-1">Try searching for &quot;pricing&quot;, &quot;gbp monitor&quot;, &quot;n8n&quot;, or &quot;docs&quot;</p>
                  </div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group",
                          isSelected
                            ? "bg-orange-50 dark:bg-orange-950/40 text-slate-900 dark:text-slate-100 border border-orange-200 dark:border-orange-800"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-transparent"
                        )}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0 pr-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg shrink-0 mt-0.5",
                              item.category === 'Tools' && "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
                              item.category === 'Documentation' && "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
                              item.category === 'Templates' && "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
                              item.category === 'Pages' && "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                            )}
                          >
                            {item.category === 'Tools' && <Wrench className="w-3.5 h-3.5" />}
                            {item.category === 'Documentation' && <FileText className="w-3.5 h-3.5" />}
                            {item.category === 'Templates' && <Layers className="w-3.5 h-3.5" />}
                            {item.category === 'Pages' && <Sparkles className="w-3.5 h-3.5" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-bold truncate">
                                {item.title}
                              </span>
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className={cn(
                          "w-4 h-4 shrink-0 transition-transform",
                          isSelected ? "text-[#ff5500] translate-x-1" : "text-slate-300 dark:text-slate-600"
                        )} />
                      </div>
                    )
                  })
                )}
              </div>

              {/* Modal Footer with Keyboard Shortcuts Help */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300">↑↓</kbd> Navigate</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300">↵</kbd> Select</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300">ESC</kbd> Close</span>
                </div>
                <span className="text-[#ff5500] font-bold">Miracle OmniSearch</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
