"use client"

import React, { useEffect, useRef } from 'react'
import { AlertTriangle, Info, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = 'danger',
  isLoading = false,
}: ConfirmationModalProps) {
  const confirmBtnRef = useRef<HTMLButtonElement>(null)

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      // Auto focus primary button on open
      setTimeout(() => confirmBtnRef.current?.focus(), 50)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
          aria-describedby="confirm-modal-desc"
        >
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-md rounded-2xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[8px_8px_0px_#0f172a] dark:shadow-[8px_8px_0px_rgba(255,85,0,0.5)]"
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "p-3 rounded-xl shrink-0",
                  variant === 'danger' && "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-900",
                  variant === 'warning' && "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-900",
                  variant === 'info' && "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-900"
                )}
              >
                {variant === 'info' ? (
                  <Info className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1">
                <h3
                  id="confirm-modal-title"
                  className="text-base font-bold text-slate-900 dark:text-slate-100"
                >
                  {title}
                </h3>
                <p
                  id="confirm-modal-desc"
                  className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed"
                >
                  {description}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                {cancelText}
              </button>

              <button
                ref={confirmBtnRef}
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-sm hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-50",
                  variant === 'danger' && "bg-red-600 hover:bg-red-700 shadow-red-500/20",
                  variant === 'warning' && "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20",
                  variant === 'info' && "bg-[#ff5500] hover:bg-[#e64d00] shadow-orange-500/20"
                )}
              >
                {isLoading ? "Processing..." : confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
