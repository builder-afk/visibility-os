"use client"

import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 350)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top"
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.2 }}
          aria-label="Scroll back to top of page"
          title="Scroll to top"
          className={cn(
            "fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-xl cursor-pointer print-hidden",
            "bg-[#0f172a] hover:bg-[#ff5500] dark:bg-slate-800 dark:hover:bg-[#ff5500] text-white",
            "border border-slate-700/50 hover:shadow-orange-500/25 transition-colors duration-200",
            "focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2",
            "hover:scale-110 active:scale-95 transition-transform"
          )}
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
