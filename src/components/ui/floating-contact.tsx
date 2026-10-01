"use client"

import React, { useState } from 'react'
import { MessageSquare, Phone, Mail, X, Sparkles, ChevronUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div id="floating-contact" className="fixed bottom-6 left-6 z-40 font-body print-hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 rounded-2xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[6px_6px_0px_#0f172a] dark:shadow-[6px_6px_0px_rgba(255,85,0,0.4)]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Miracle Support Team
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close contact widget"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 py-2.5 leading-relaxed">
              Have questions about building an AI app, pricing, or custom agents? Speak directly with our engineering team:
            </p>

            <div className="space-y-2 pt-1">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50/70 hover:bg-orange-100 dark:bg-orange-950/30 dark:hover:bg-orange-950/60 border border-orange-200 dark:border-orange-900/60 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#ff5500] text-white">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      Chat with Us
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Typical reply in ~5 mins
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#ff5500] transition-colors" />
              </Link>

              <a
                href="mailto:hello@miracle.dev"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500 text-white">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      Email Us
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      hello@miracle.dev
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </a>

              <Link
                href="/contact#call"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500 text-white">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
                      Book a 15-min Call
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Fast architecture review
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle contact options"
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl transition-all cursor-pointer",
          "border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100",
          "hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2",
          isOpen && "bg-[#ff5500] hover:bg-[#e64d00] text-white border-transparent"
        )}
      >
        <div className={cn(
          "w-2 h-2 rounded-full",
          isOpen ? "bg-white" : "bg-emerald-500 animate-ping"
        )} />
        <span className="text-xs font-bold flex items-center gap-1.5">
          {isOpen ? (
            <>Close <X className="w-3.5 h-3.5 ml-1" /></>
          ) : (
            <>Need help? <MessageSquare className="w-3.5 h-3.5 text-[#ff5500]" /></>
          )}
        </span>
      </button>
    </div>
  )
}
