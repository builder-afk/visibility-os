"use client"

import React, { useState } from 'react'
import { Mail, CheckCircle2, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function NewsletterSignup({ className }: { className?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = email.trim()
    if (!trimmed) {
      setStatus('error')
      setFeedback('Please enter an email address.')
      return
    }

    if (!validateEmail(trimmed)) {
      setStatus('error')
      setFeedback('Please enter a valid email address (e.g. founder@domain.com).')
      return
    }

    setStatus('loading')
    setFeedback('')

    try {
      // Simulate newsletter registration / webhook
      await new Promise(resolve => setTimeout(resolve, 800))
      
      try {
        const existing = JSON.parse(localStorage.getItem('miracle_newsletter_subs') || '[]')
        existing.push({ email: trimmed, date: new Date().toISOString() })
        localStorage.setItem('miracle_newsletter_subs', JSON.stringify(existing))
      } catch { }

      setStatus('success')
      setFeedback('Thanks for subscribing! Check your inbox for the weekly architecture breakdown.')
      setEmail('')
      toast.success("Subscribed to Miracle Dispatch!", {
        description: "You'll receive our weekly breakdown of prompt-to-production blueprints.",
      })
    } catch {
      setStatus('error')
      setFeedback('Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className={cn(
        "rounded-3xl border-2 border-slate-900 dark:border-slate-700 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 shadow-[6px_6px_0px_#0f172a] dark:shadow-[6px_6px_0px_rgba(255,85,0,0.3)]",
        className
      )}
    >
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[11px] font-bold text-[#ff5500] uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Miracle Architecture Dispatch</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">
          Get Weekly Production Blueprints
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Join 8,400+ founders and engineers receiving verified prompt architectures, AI agent workflows, and system designs every Tuesday. No spam ever.
        </p>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-2.5 text-xs font-semibold"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto" noValidate>
            <div className="relative flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                placeholder="founder@company.com"
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                className={cn(
                  "w-full h-11 pl-10 pr-4 rounded-xl border text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 transition-all",
                  "bg-white dark:bg-slate-900/90",
                  status === 'error'
                    ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
                    : "border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/25 focus:border-[#ff5500]"
                )}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-11 px-5 rounded-xl bg-[#ff5500] hover:bg-[#e64d00] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 hover:scale-102 active:scale-98 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p
            id="newsletter-error"
            role="alert"
            className="text-xs text-red-600 dark:text-red-400 mt-2.5 font-semibold flex items-center justify-center gap-1.5"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{feedback}</span>
          </p>
        )}
      </div>
    </div>
  )
}
