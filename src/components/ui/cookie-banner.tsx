"use client"

import React, { useEffect, useState } from 'react'
import { Cookie, ShieldCheck, X } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'

const STORAGE_KEY = 'miracle_cookie_consent'

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY)
      if (!consent) {
        // Small delay so user isn't overwhelmed immediately on first paint
        const timer = setTimeout(() => setShowBanner(true), 1200)
        return () => clearTimeout(timer)
      }
    } catch {
      // LocalStorage blocked
    }
  }, [])

  const handleChoice = (decision: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, decision)
    } catch { }
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          id="cookie-banner"
          role="region"
          aria-label="Cookie consent banner"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 print-hidden"
        >
          <div className="rounded-2xl border-2 border-slate-900 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-5 shadow-[6px_6px_0px_#0f172a] dark:shadow-[6px_6px_0px_rgba(255,85,0,0.4)]">
            <div className="flex items-start gap-3.5 mb-3">
              <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-[#ff5500] shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  Privacy &amp; Cookie Preferences
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  We use cookies and telemetry to improve your AI app building workflow and analyze traffic. You can choose your level of consent anytime.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleChoice('declined')}
                aria-label="Close cookie banner"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/cookie-policy"
                className="text-[11px] font-semibold text-slate-500 hover:text-[#ff5500] dark:text-slate-400 dark:hover:text-[#ff5500] underline underline-offset-2 transition-colors self-start sm:self-center"
              >
                Cookie Policy
              </Link>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleChoice('declined')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice('accepted')}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#ff5500] hover:bg-[#e64d00] text-white shadow-sm transition-all hover:scale-102 active:scale-98 cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
