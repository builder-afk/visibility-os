"use client"

import React, { useEffect, useState } from 'react'

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100
            setProgress(Math.min(100, Math.max(0, currentProgress)))
          } else {
            setProgress(0)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      id="scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[70] pointer-events-none print-hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-[#ff5500] via-[#ff7733] to-[#ffaa00] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(255,85,0,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
