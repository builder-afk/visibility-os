"use client"

import React from 'react'
import { Calendar, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostUpdatedDateProps {
  date?: string
  isoDate?: string
  label?: string
  className?: string
  showIcon?: boolean
}

export function PostUpdatedDate({
  date = "October 2026",
  isoDate = "2026-10-01",
  label = "Last updated",
  className,
  showIcon = true,
}: PostUpdatedDateProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono",
        className
      )}
    >
      {showIcon && <RefreshCw className="w-3 h-3 text-[#ff5500] shrink-0" />}
      <span>{label}:</span>
      <time dateTime={isoDate} className="font-semibold text-slate-700 dark:text-slate-300">
        {date}
      </time>
    </div>
  )
}
