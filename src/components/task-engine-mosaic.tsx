"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Search,
  Mic,
  Check,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  X,
} from 'lucide-react'

// ─── Shared Grid Mesh Component matching Explore Our Ecosystem ───────────────

function CardMesh() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity z-[1]"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        maskImage: 'radial-gradient(circle at center top, black 0%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center top, black 0%, transparent 80%)',
      }}
    />
  )
}

// ─── Official Brand SVGs ─────────────────────────────────────────────────────

function SlackIcon() {
  return (
    <svg viewBox="0 0 122.8 122.8" className="w-5 h-5 shrink-0">
      <path
        d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
        fill="#E01E5A"
      />
      <path
        d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
        fill="#36C5F0"
      />
      <path
        d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C77.6 5.8 83.4 0 90.5 0s12.9 5.8 12.9 12.9v32.3z"
        fill="#2EB67D"
      />
      <path
        d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
        fill="#ECB22E"
      />
    </svg>
  )
}

function MicrosoftTeamsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
      <path
        d="M15.5 8.5C16.88 8.5 18 7.38 18 6C18 4.62 16.88 3.5 15.5 3.5C14.12 3.5 13 4.62 13 6C13 7.38 14.12 8.5 15.5 8.5Z"
        fill="#5059C9"
      />
      <path
        d="M19.5 9.5H14.5C13.67 9.5 13 10.17 13 11V15.5C13.55 15.82 14.18 16 14.86 16H19.5C20.33 16 21 15.33 21 14.5V11C21 10.17 20.33 9.5 19.5 9.5Z"
        fill="#5059C9"
      />
      <path
        d="M9.5 10C11.43 10 13 8.43 13 6.5C13 4.57 11.43 3 9.5 3C7.57 3 6 4.57 6 6.5C6 8.43 7.57 10 9.5 10Z"
        fill="#7B83EB"
      />
      <path
        d="M14.5 11.5H4.5C3.67 11.5 3 12.17 3 13V18.5C3 19.33 3.67 20 4.5 20H14.5C15.33 20 16 19.33 16 18.5V13C16 12.17 15.33 11.5 14.5 11.5Z"
        fill="#7B83EB"
      />
      <rect x="2" y="9" width="8" height="8" rx="2" fill="#4B53BC" />
      <path d="M6 11V15M4.5 11H7.5" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function NotionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
      <path
        d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.464-.653c.42 0 .047-.42-.14-.606L16.48 1.83c-.466-.42-1.026-.7-2.007-.606L3.433 2.156c-.513.047-.653.373-.42.606l1.446 1.446zm.886 3.682v12.443c0 .84.42 1.12 1.306 1.073l12.724-.746c.886-.047 1.12-.56 1.12-1.306V6.958c0-.746-.373-1.026-1.12-.98l-12.724.746c-.84.047-1.306.42-1.306 1.166zm12.35 1.586c.094.42 0 .84-.42.886l-.7.14v7.74l1.353.42c.42.094.466.42.373.84-.094.42-.466.513-.98.513l-3.31-.093c-.466 0-.606-.233-.606-.56 0-.373.187-.56.606-.606l.84-.094v-7.227l-4.104 8.253c-.326.606-.7.746-1.213.7l-2.846-.14c-.466 0-.606-.28-.606-.606 0-.373.28-.606.653-.653l.793-.094V9.897l-.933-.14c-.42-.047-.56-.373-.56-.653 0-.327.28-.56.746-.56l3.357.186c.466 0 .606.28.606.606 0 .374-.233.56-.606.607l-.746.093v6.388l4.478-8.253c.326-.606.746-.746 1.26-.746l2.332.14c.466 0 .653.28.653.606z"
        fill="#0d0d0d"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#0d0d0d" className="w-5 h-5 shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

function GoogleDriveIcon() {
  return (
    <svg viewBox="0 0 87.3 78" className="w-5 h-5 shrink-0">
      <path d="M6.6 66.85L20.25 43.2H61.05L47.4 66.85H6.6Z" fill="#0066DA" />
      <path d="M29.1 27.85L42.75 4.2H83.55L69.9 27.85H29.1Z" fill="#00AC47" />
      <path d="M69.9 27.85L83.55 4.2L42.75 4.2L29.1 27.85L69.9 27.85Z" fill="#EA4335" />
      <path d="M6.6 66.85L20.25 43.2L61.05 43.2L47.4 66.85L6.6 66.85Z" fill="#00832D" />
      <path d="M47.4 66.85L61.05 43.2L83.55 4.2L69.9 27.85L47.4 66.85Z" fill="#2684FC" />
      <path d="M6.6 66.85L29.1 27.85L42.75 4.2L20.25 43.2L6.6 66.85Z" fill="#FFBA00" />
    </svg>
  )
}

function FigmaIcon() {
  return (
    <svg viewBox="0 0 38 57" fill="none" className="w-3.5 h-5 shrink-0">
      <path
        d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
        fill="#0ACF83"
      />
      <path
        d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
        fill="#FF7262"
      />
      <path
        d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
        fill="#A259FF"
      />
    </svg>
  )
}

// ─── Master Component ─────────────────────────────────────────────────────────

export function TaskEngineMosaic() {
  const [activeChip, setActiveChip] = useState<string | null>(null)
  const [searchVal, setSearchVal] = useState('')
  const [isMicActive, setIsMicActive] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<string | null>('SUN')

  const daysData = [
    { day: 'MON', hours: '2h', height: '18%' },
    { day: 'TUE', hours: '6h', height: '32%' },
    { day: 'WED', hours: '12h', height: '48%' },
    { day: 'THU', hours: '20h', height: '62%' },
    { day: 'FRI', hours: '31h', height: '76%' },
    { day: 'SAT', hours: '40h', height: '88%' },
    { day: 'SUN', hours: '48h', height: '100%', isSun: true },
  ]

  return (
    <div className="relative w-full max-w-[1380px] mx-auto p-4 sm:p-6 lg:p-7 rounded-[26px] sm:rounded-[30px] bg-[#F4F8F9] border border-slate-200/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] overflow-hidden font-display select-none">
      
      {/* Atmospheric Top Radial Gradient matching Explore Our Ecosystem */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(255,179,71,0.18) 0%, rgba(249,237,150,0.12) 25%, rgba(229,161,245,0.08) 50%, transparent 75%)',
        }}
      />

      {/* Top Header Bar matching Explore Ecosystem theme */}
      <div className="relative z-10 mb-4 sm:mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200/90 text-slate-700 hover:text-slate-900 hover:bg-white flex items-center justify-center transition-all hover:scale-105 shadow-2xs hover:shadow-xs cursor-pointer"
          title="Back"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4 text-slate-700" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
          <span className="text-[#ff5500] text-xs">✦</span>
          <span>Interactive Architecture Mosaic</span>
        </div>
      </div>

      {/* ─── Bento Grid Structure ─── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        
        {/* ─── COLUMN LEFT: Toast (Card 1) + Connect Tools (Card 2) ─── */}
        <div className="lg:col-span-3 flex flex-col gap-3.5 sm:gap-4">
          
          {/* Card 1: Notification Toast (Pink/Rose Ecosystem Theme) */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="group relative p-4 sm:p-5 rounded-[22px] overflow-hidden border border-slate-200/80 bg-[#F4F8F9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14)] transition-all duration-300"
          >
            {/* Radial Gradient matching Explore Ecosystem Instagram/Carousel card */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-95"
              style={{
                background:
                  'radial-gradient(circle at 50% 0%, #F472B6 0%, #FDA4AF 32%, #F8FAFC 65%, #FFFFFF 100%)',
              }}
            />
            <CardMesh />

            <div className="relative z-10 flex items-start justify-between gap-3">
              {/* Star Badge Icon */}
              <div className="w-7 h-7 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-white fill-white" />
              </div>

              {/* Toast Text */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                  Automation completed!
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                  Weekly client report sent automatically
                </p>
              </div>

              {/* Timestamp */}
              <span className="text-[10px] font-medium text-slate-400 shrink-0">
                2:34 PM
              </span>
            </div>
          </motion.div>

          {/* Card 2: Connect your Tools Now (Blue Ecosystem Theme) */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="group relative flex-1 p-5 sm:p-6 rounded-[22px] overflow-hidden border border-slate-200/80 bg-[#F4F8F9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 flex flex-col justify-between min-h-[350px]"
          >
            {/* Radial Gradient matching Explore Ecosystem App Templates card */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-95"
              style={{
                background:
                  'radial-gradient(circle at 50% 0%, #60A5FA 0%, #93C5FD 32%, #F8FAFC 65%, #FFFFFF 100%)',
              }}
            />
            <CardMesh />

            {/* Header */}
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Connect your<br />Tools Now.
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1.5">
                120+ integrations available
              </p>
            </div>

            {/* Integration Chips */}
            <div className="relative z-10 pt-6 pb-1 space-y-2.5">
              
              {/* Floating tilted Slack Chip (Top Right of container) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08, rotate: -12 }}
                onClick={() => setActiveChip(activeChip === 'Slack' ? null : 'Slack')}
                className={`absolute right-0 -top-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transform -rotate-[18deg] text-xs font-semibold text-slate-800 transition-all cursor-pointer z-20 ${
                  activeChip === 'Slack' ? 'ring-2 ring-emerald-500 bg-emerald-50/95' : ''
                }`}
              >
                <span>Slack</span>
                <SlackIcon />
              </motion.button>

              {/* Row 1: Microsoft Teams */}
              <div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveChip(activeChip === 'Teams' ? null : 'Teams')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800 hover:shadow-xs transition-all cursor-pointer ${
                    activeChip === 'Teams' ? 'ring-2 ring-indigo-500 bg-indigo-50/95' : ''
                  }`}
                >
                  <span>Microsoft Teams</span>
                  <MicrosoftTeamsIcon />
                </motion.button>
              </div>

              {/* Row 2: Notion + GitHub */}
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setActiveChip(activeChip === 'Notion' ? null : 'Notion')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800 hover:shadow-xs transition-all cursor-pointer ${
                    activeChip === 'Notion' ? 'ring-2 ring-slate-900 bg-slate-100' : ''
                  }`}
                >
                  <span>Notion</span>
                  <NotionIcon />
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setActiveChip(activeChip === 'GitHub' ? null : 'GitHub')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800 hover:shadow-xs transition-all cursor-pointer ${
                    activeChip === 'GitHub' ? 'ring-2 ring-slate-900 bg-slate-100' : ''
                  }`}
                >
                  <span>GitHub</span>
                  <GitHubIcon />
                </motion.button>
              </div>

              {/* Row 3: Google Drive + Figma */}
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setActiveChip(activeChip === 'Drive' ? null : 'Drive')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800 hover:shadow-xs transition-all cursor-pointer ${
                    activeChip === 'Drive' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <span>Google Drive</span>
                  <GoogleDriveIcon />
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setActiveChip(activeChip === 'Figma' ? null : 'Figma')}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800 hover:shadow-xs transition-all cursor-pointer ${
                    activeChip === 'Figma' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                >
                  <span>Figma</span>
                  <FigmaIcon />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── COLUMN CENTER + RIGHT: Top Row (Hero + Insights) & Bottom Row (Search) ─── */}
        <div className="lg:col-span-9 flex flex-col gap-3.5 sm:gap-4">
          
          {/* Top Row: Hero Center (7 cols) + Productivity Insights (5 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 flex-1">
            
            {/* Card 3: Hero Center "Automate your work." (Emerald Ecosystem Theme) */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="group relative md:col-span-7 p-6 sm:p-7 rounded-[22px] overflow-hidden border border-slate-200/80 bg-[#F4F8F9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 flex flex-col justify-between min-h-[390px]"
            >
              {/* Radial Gradient matching Explore Ecosystem Emerald/Automation card */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-95"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, #34D399 0%, #A7F3D0 32%, #F8FAFC 65%, #FFFFFF 100%)',
                }}
              />
              <CardMesh />

              {/* Headline */}
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] leading-[1.28] tracking-tight">
                  <span className="text-[#10b981] font-black">Automate</span> your work.<br />
                  Focus on what matters.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
                  AI-powered workflows that save teams hours every week.
                </p>
              </div>

              {/* 3D Overlapping Floating Windows Illustration */}
              <div className="relative z-10 w-full h-56 mt-4 flex items-center justify-center">
                
                {/* Back Window (Sage green, tilted -7 deg) */}
                <div
                  className="absolute w-56 h-40 rounded-xl bg-[#E0F2F1] border-2 border-white shadow-[0_12px_28px_rgba(16,185,129,0.16)] overflow-hidden transform -rotate-[7deg] -translate-x-6 translate-y-1"
                >
                  {/* Top Bar */}
                  <div className="h-4 bg-[#1e293b] flex items-center gap-1 px-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  {/* Window Body & Sidebar */}
                  <div className="flex h-full">
                    <div className="w-1/4 h-full bg-[#A7F3D0]" />
                    <div className="flex-1 p-2 space-y-1.5">
                      <div className="w-3/4 h-2 rounded bg-white/80" />
                      <div className="w-1/2 h-2 rounded bg-white/50" />
                    </div>
                  </div>
                </div>

                {/* Front Window (Lavender/Lilac, tilted +4 deg) */}
                <div
                  className="absolute w-60 h-44 rounded-xl bg-[#EDE9FE] border-2 border-white shadow-[0_14px_32px_rgba(99,102,241,0.18)] overflow-hidden transform rotate-[4deg] translate-x-4 translate-y-3"
                >
                  {/* Top Bar */}
                  <div className="h-4 bg-[#1e293b] flex items-center gap-1 px-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  {/* Window Body */}
                  <div className="flex h-full">
                    <div className="w-1/5 h-full bg-[#DDD6FE]" />
                    <div className="flex-1 p-2.5 space-y-2">
                      <div className="w-4/5 h-2.5 rounded bg-white" />
                      <div className="w-3/5 h-2.5 rounded bg-white/70" />
                    </div>
                  </div>
                </div>

                {/* Floating "Workflow Automated" Pill Badge */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute right-3 top-16 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xs shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-black/8 text-xs font-bold text-slate-800 transform -rotate-[1deg]"
                >
                  <div className="w-4 h-4 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#16a34a] stroke-[3]" />
                  </div>
                  <span>Workflow Automated</span>
                </motion.div>

                {/* Floating AI Sparkle Card on the left */}
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-2 bottom-4 z-20 flex items-center gap-2.5 p-2 px-3 rounded-xl bg-white/95 backdrop-blur-xs shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-black/8 transform -rotate-[2deg]"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#f0fdf4] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-[#22c55e]" />
                  </div>
                  <div className="space-y-1">
                    <div className="w-12 h-1.5 rounded-full bg-slate-300" />
                    <div className="w-8 h-1.5 rounded-full bg-slate-200" />
                  </div>
                </motion.div>

                {/* Floating Classic White Pointer Cursor */}
                <motion.div
                  animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute right-12 bottom-6 z-30 pointer-events-none"
                >
                  <svg className="w-6 h-7 drop-shadow-md" viewBox="0 0 24 28" fill="none">
                    <path
                      d="M3 2L3 23L8.5 17.5L13.5 27L16.5 25.5L11.5 16.5L19 16.5L3 2Z"
                      fill="#ffffff"
                      stroke="#2b2b2b"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Card 4: Productivity Insights (Amber/Orange Ecosystem Theme) */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="group relative md:col-span-5 p-6 rounded-[22px] overflow-hidden border border-slate-200/80 bg-[#F4F8F9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 flex flex-col justify-between min-h-[390px]"
            >
              {/* Radial Gradient matching Explore Ecosystem Marketplace card */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-95"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, #FFB347 0%, #F9ED96 32%, #F8FAFC 65%, #FFFFFF 100%)',
                }}
              />
              <CardMesh />

              {/* Top Tag & Numbers */}
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-900/15 text-[11px] font-semibold text-slate-800 shadow-xs">
                  <span className="text-amber-500 text-xs">✦</span>
                  <span>Productivity Insights</span>
                </span>

                <div className="mt-4">
                  <h3 className="text-4xl sm:text-5xl font-black text-[#0f172a] tracking-tight leading-none">
                    48 hours
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                    saved this week!
                  </p>
                </div>
              </div>

              {/* Bar Chart matching Explore Ecosystem / Image 1 */}
              <div className="relative z-10 mt-6 pt-4 flex items-end justify-between gap-2 h-44 border-b border-slate-200/60 pb-2">
                {daysData.map((d) => {
                  const isHovered = hoveredDay === d.day
                  return (
                    <div
                      key={d.day}
                      onMouseEnter={() => setHoveredDay(d.day)}
                      className="flex-1 flex flex-col items-center justify-end h-full gap-2 cursor-pointer group/bar"
                    >
                      {/* Bar */}
                      <div className="w-full flex items-end justify-center h-full">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: d.height }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`w-full rounded-t-lg transition-all duration-200 flex flex-col items-center justify-start pt-1 text-[10px] font-bold ${
                            d.isSun
                              ? 'text-white font-extrabold shadow-[0_4px_16px_rgba(245,195,68,0.35)]'
                              : isHovered
                              ? 'bg-slate-300 text-slate-700'
                              : 'bg-[#E2E8F0] text-slate-500'
                          }`}
                          style={
                            d.isSun
                              ? {
                                  background:
                                    'linear-gradient(180deg, #FFB347 0%, #F5C344 30%, #F28482 65%, #B567C2 100%)',
                                }
                              : undefined
                          }
                        >
                          <span>{d.hours}</span>
                        </motion.div>
                      </div>

                      {/* Day Label */}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          d.isSun || isHovered ? 'text-slate-900 font-black' : 'text-slate-400'
                        }`}
                      >
                        {d.day}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: Card 5: Search Bar (Indigo/Purple Ecosystem Theme) */}
          <motion.div
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
            className="group relative p-5 sm:p-6 rounded-[22px] overflow-hidden border border-slate-200/80 bg-[#F4F8F9] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            {/* Radial Gradient matching Explore Ecosystem LinkedIn / Intelligence card */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-95"
              style={{
                background:
                  'radial-gradient(circle at 50% 0%, #818CF8 0%, #C084FC 32%, #F8FAFC 65%, #FFFFFF 100%)',
              }}
            />
            <CardMesh />

            {/* Left Label */}
            <div className="relative z-10 shrink-0">
              <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight leading-tight">
                Find anything<br />instantly
              </h3>
            </div>

            {/* Interactive Search Bar */}
            <div className="relative z-10 flex-1 sm:max-w-xl">
              <div className="relative flex items-center bg-white/95 backdrop-blur-xs rounded-full px-3.5 py-2.5 shadow-[0_4px_16px_rgba(129,140,248,0.12)] border border-slate-200/80 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500 transition-all">
                {/* Search Icon Circle */}
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mr-2.5">
                  <Search className="w-4 h-4" />
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Search tasks, docs, workflows..."
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />

                {/* Clear Button if input has text */}
                {searchVal && (
                  <button
                    type="button"
                    onClick={() => setSearchVal('')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full mr-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Microphone Button */}
                <button
                  type="button"
                  onClick={() => setIsMicActive(!isMicActive)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                    isMicActive
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={isMicActive ? 'Listening...' : 'Voice Search'}
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
