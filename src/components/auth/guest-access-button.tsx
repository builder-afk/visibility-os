"use client"

import React, { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Sparkles, Loader2, ArrowRight } from 'lucide-react'

interface GuestAccessButtonProps {
  className?: string
  text?: string
  callbackUrl?: string
  variant?: 'solid' | 'subtle'
}

export function GuestAccessButton({
  className = '',
  text = 'Continue as Guest',
  callbackUrl = '/dashboard',
  variant = 'subtle',
}: GuestAccessButtonProps) {
  const { continueAsGuest, isLoading: authLoading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGuest = async () => {
    setIsSubmitting(true)
    try {
      await continueAsGuest(callbackUrl)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = isSubmitting || authLoading

  if (variant === 'subtle') {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <button
          type="button"
          onClick={handleGuest}
          disabled={isLoading}
          className={`w-full relative flex items-center justify-between px-4 h-12 rounded-xl font-medium text-sm bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 text-slate-700 hover:text-slate-900 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group shadow-xs ${className}`}
        >
          <div className="flex items-center gap-2.5">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
            ) : (
              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              </div>
            )}
            <span className="font-semibold text-slate-800 text-[13px]">{text}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 hidden sm:inline-block">
              Instant Preview
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        type="button"
        className={`w-full relative flex items-center justify-center gap-2.5 h-12 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white active:scale-[0.98] transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group ${className}`}
        onClick={handleGuest}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
        ) : (
          <Sparkles className="h-4 w-4 text-emerald-400" />
        )}
        <span>{text}</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  )
}
