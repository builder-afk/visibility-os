"use client"

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface CopyToClipboardProps {
  text: string
  label?: string
  successMessage?: string
  className?: string
  showText?: boolean
  size?: 'sm' | 'md'
}

export function CopyToClipboardButton({
  text,
  label = "Copy to clipboard",
  successMessage = "Copied to clipboard!",
  className,
  showText = false,
  size = 'sm'
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success(successMessage)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers or restricted permissions
      try {
        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        textArea.remove()
        setCopied(true)
        toast.success(successMessage)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        toast.error("Failed to copy. Please select and copy manually.")
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
        size === 'sm' ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
        copied
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
          : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
          {showText && <span className="font-semibold text-emerald-600 dark:text-emerald-400">Copied!</span>}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          {showText && <span>{label}</span>}
        </>
      )}
    </button>
  )
}
