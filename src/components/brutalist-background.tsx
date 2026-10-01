"use client"

import React from 'react'

export function BrutalistBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* ─── 1. Warm Architectural Base Color ─── */}
      <div className="absolute inset-0 bg-[#FAF8F3]" />

      {/* ─── 2. Dual-Scale Brutalist SVG Grid (32px subgrid + 160px primary modules with crosshairs) ─── */}
      <svg
        className="absolute inset-0 w-full h-full text-slate-900 opacity-[0.14]"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* 32px minor grid */}
          <pattern
            id="brutalist-minor-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
            />
          </pattern>

          {/* 160px major module with crosshairs */}
          <pattern
            id="brutalist-major-grid"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            {/* Minor grid fill */}
            <rect width="160" height="160" fill="url(#brutalist-minor-grid)" />
            {/* Major module borders */}
            <path
              d="M 160 0 L 0 0 0 160"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            {/* Center + crosshair */}
            <path
              d="M 80 74 L 80 86 M 74 80 L 86 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            {/* Corner + crosshairs */}
            <path
              d="M 0 6 L 0 0 L 6 0 M 160 6 L 160 0 L 154 0 M 0 154 L 0 160 L 6 160 M 160 154 L 160 160 L 154 160"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </pattern>

          {/* Diagonal Hazard / Hatching Pattern */}
          <pattern
            id="brutalist-hatch"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeOpacity="0.08"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#brutalist-major-grid)" />
      </svg>

      {/* ─── 3. Subtle Warm/Electric Ambient Lighting (Keeps canvas vibrant, zero dreary grey) ─── */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[450px] bg-[#ff5500]/6 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-[#18a0fb]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[400px] bg-[#ffe600]/5 rounded-full blur-[140px]" />

      {/* ─── 4. Architectural Guide Rails & Ruler Tick Marks (Desktop) ─── */}
      <div className="hidden xl:block absolute inset-y-0 left-8 w-[1px] bg-slate-900/15">
        <div className="sticky top-0 flex flex-col items-center py-6 gap-8 text-[9px] font-mono font-bold text-slate-500">
          <span>00</span>
          <span className="w-2.5 h-[1px] bg-slate-900/30" />
          <span>25</span>
          <span className="w-2.5 h-[1px] bg-slate-900/30" />
          <span>50</span>
          <span className="w-2.5 h-[1px] bg-slate-900/30" />
          <span>75</span>
          <span className="w-2.5 h-[1px] bg-slate-900/30" />
          <span>100</span>
        </div>
      </div>

      <div className="hidden xl:block absolute inset-y-0 right-8 w-[1px] bg-slate-900/15">
        <div className="sticky top-0 flex flex-col items-center py-6 gap-8 text-[9px] font-mono font-bold text-slate-500">
          <span className="rotate-90">AXIS-Y</span>
          <span className="w-2.5 h-[1px] bg-slate-900/30" />
          <span>SYS.01</span>
          <span className="w-2.5 h-[1px] bg-slate-900/30" />
          <span>1:1</span>
        </div>
      </div>

      {/* ─── 5. Monospace Technical Watermark Stamps (Edges) ─── */}
      <div className="hidden lg:flex items-center gap-2 absolute top-5 left-12 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white/70 border border-slate-900/15 px-2.5 py-1 rounded shadow-[2px_2px_0px_#0f172a]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
        <span>CANVAS // BRUTALIST_GRID</span>
        <span className="text-slate-400">::</span>
        <span className="text-slate-700">SCALE 1:1</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 absolute top-5 right-12 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white/70 border border-slate-900/15 px-2.5 py-1 rounded shadow-[2px_2px_0px_#0f172a]">
        <span>MODE: PROD_READY</span>
        <span className="text-emerald-600 font-black">● 200 OK</span>
      </div>

      {/* ─── 6. Brutalist Corner Crosshair Markers ─── */}
      <div className="absolute top-3 left-3 text-slate-900 font-mono text-base font-black leading-none">
        ┌
      </div>
      <div className="absolute top-3 right-3 text-slate-900 font-mono text-base font-black leading-none">
        ┐
      </div>
      <div className="absolute bottom-3 left-3 text-slate-900 font-mono text-base font-black leading-none">
        └
      </div>
      <div className="absolute bottom-3 right-3 text-slate-900 font-mono text-base font-black leading-none">
        ┘
      </div>

      {/* ─── 7. Subtle Corner Hatching Accent Blocks ─── */}
      <div className="hidden sm:block absolute top-0 right-0 w-32 h-12">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#brutalist-hatch)" />
        </svg>
      </div>
      <div className="hidden sm:block absolute bottom-0 left-0 w-32 h-12">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#brutalist-hatch)" />
        </svg>
      </div>
    </div>
  )
}
