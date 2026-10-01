"use client"

import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  label?: string
}

export function LoadingSpinner({
  size = 'md',
  className,
  label = 'Loading...'
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center gap-2 text-slate-500 dark:text-slate-400", className)}
    >
      <Loader2 className={cn("animate-spin text-[#ff5500]", sizeMap[size])} />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-slate-200 dark:bg-slate-800/80",
        className
      )}
    />
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <SkeletonBox className="w-10 h-10 rounded-xl" />
        <div className="space-y-2 flex-1">
          <SkeletonBox className="h-4 w-1/3" />
          <SkeletonBox className="h-3 w-1/2" />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-5/6" />
        <SkeletonBox className="h-3 w-2/3" />
      </div>
    </div>
  )
}

export function PageLoader({ text = "Loading content..." }: { text?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[50vh] flex flex-col items-center justify-center gap-3"
    >
      <LoadingSpinner size="xl" />
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 animate-pulse">
        {text}
      </p>
    </div>
  )
}
