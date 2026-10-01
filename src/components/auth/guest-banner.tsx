"use client"

import React, { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { AlertCircle, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'

export function GuestBanner() {
  const { isGuest, isAuthenticated } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (!isGuest || dismissed) {
    return null
  }

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 dark:text-amber-200 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>Guest Mode:</strong> You are browsing with limited permissions. Saved work and projects will expire with your session.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/login?mode=upgrade"
            className="inline-flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-100 underline underline-offset-2 transition-colors"
          >
            Sign in with Google to save work
            <ArrowRight className="h-3 w-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-amber-500/20 rounded-md transition-colors text-amber-700 dark:text-amber-300"
            title="Dismiss banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
