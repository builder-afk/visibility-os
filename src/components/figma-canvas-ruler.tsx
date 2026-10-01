"use client"

import React, { useState, useEffect } from 'react'
import { Sparkles, Layers, MousePointer2 } from 'lucide-react'

export function FigmaCanvasRuler() {
  const [time, setTime] = useState<string>("10:54:00 AM")
  const [zoomLevel] = useState<number>(94)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full bg-[#ffffff] border-b border-[#e2e8f0] h-9 flex items-center justify-between px-3 text-[11px] font-mono select-none z-50 sticky top-0 shadow-xs">
      {/* Left Logo / Studio Icon */}
      <div className="flex items-center gap-2 font-bold tracking-tight text-[#0f172a] shrink-0">
        <div className="w-4 h-4 rounded bg-[#0f172a] text-white flex items-center justify-center text-[10px] font-black">
          M
        </div>
        <span className="font-extrabold tracking-wider text-xs">MIRACLE.DESIGN</span>
      </div>

      {/* Center Pixel Ruler Marks */}
      <div className="hidden lg:flex items-center justify-center flex-1 mx-8 overflow-hidden h-full relative">
        <div className="flex items-center gap-12 text-[#94a3b8] text-[9px] h-full pt-1">
          {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600].map((tick) => (
            <div key={tick} className="flex flex-col items-center relative h-full">
              <span className="leading-none">{tick}</span>
              <div className="w-[1px] h-2 bg-[#cbd5e1] mt-1" />
            </div>
          ))}
        </div>

        {/* Current Zoom/Selection Marker */}
        <div className="absolute left-[54%] top-1/2 -translate-y-1/2 bg-[#ff5500] text-white font-bold px-1.5 py-0.5 rounded text-[9px] shadow-xs">
          {zoomLevel}%
        </div>
      </div>

      {/* Right Live Indicator & Zoom Badge */}
      <div className="flex items-center gap-3 shrink-0 text-[#64748b]">
        <div className="flex items-center gap-1.5 bg-[#f8fafc] px-2 py-0.5 rounded border border-[#e2e8f0]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium text-[#0f172a]">LIVE — {time}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 bg-[#f1f5f9] px-2 py-0.5 rounded text-[10px] text-[#475569] font-semibold">
          <span>100%</span>
        </div>
      </div>
    </div>
  )
}
