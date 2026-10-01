"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Bell, Wrench, Users, Globe, TrendingUp } from 'lucide-react'
import { Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic']
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

const PLATFORM_FEATURES = [
  {
    badge: "AI VISIBILITY",
    icon: <Eye className="w-3.5 h-3.5 text-[#7c6a54]" />,
    title: "See what AI",
    highlight: "actually recommends",
    description: "Track how LLMs mention your brand across 220 countries daily.",
  },
  {
    badge: "BRAND MONITOR",
    icon: <Bell className="w-3.5 h-3.5 text-[#7c6a54]" />,
    title: "Never miss",
    highlight: "a mention",
    description: "Get alerts when your brand or competitors are mentioned on Reddit.",
  },
  {
    badge: "AI DRAFTS",
    icon: <Wrench className="w-3.5 h-3.5 text-[#7c6a54]" />,
    title: "Comments that",
    highlight: "sound human",
    description: "Generate helpful, on-brand comments with AI that sound human.",
  },
  {
    badge: "COMMUNITY MGMT",
    icon: <Users className="w-3.5 h-3.5 text-[#7c6a54]" />,
    title: "Moderate at scale",
    highlight: "with AI",
    description: "Moderate subreddits with AI-powered knowledge base at scale.",
  },
  {
    badge: "CHROME EXTENSION",
    icon: <Globe className="w-3.5 h-3.5 text-[#7c6a54]" />,
    title: "Comment anywhere",
    highlight: "on Reddit",
    description: "Comment directly on Reddit with AI assistance from any thread.",
  },
  {
    badge: "ANALYTICS",
    icon: <TrendingUp className="w-3.5 h-3.5 text-[#7c6a54]" />,
    title: "Track what's",
    highlight: "working",
    description: "Track engagement, reach, and citation growth over time.",
  },
]

export function PlatformFeaturesSection() {
  return (
    <section className="relative z-10 py-20 my-10 w-full bg-gradient-to-b from-[#070A14]/95 via-[#0E1526]/95 via-[#121B32]/95 to-[#070A14]/95 rounded-3xl border border-indigo-900/40 shadow-[0_30px_90px_-15px_rgba(7,10,20,0.95)] backdrop-blur-3xl overflow-hidden max-w-[1700px] mx-auto">
      {/* Background Neon ambient glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#F5C344]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#B567C2]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#141a29] to-[#1a2338] border border-amber-500/30 shadow-md mb-5 backdrop-blur-md">
            <span className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent">
              ✦ PLATFORM ✦
            </span>
          </div>

          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-3 ${jakarta.className}`}>
            Everything you need <br />
            <span className={`italic font-normal bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent block mt-1 ${instrumentSerif.className}`}>
              to own AI recommendations
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-medium mt-3">
            Click any feature to dig in.
          </p>
        </div>

        {/* Individual Feature Cards Grid with Gaps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {PLATFORM_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="group relative p-7 sm:p-8 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#162038]/90 via-[#101729]/90 to-[#0A0E1A]/90 backdrop-blur-2xl border border-indigo-900/40 shadow-[0_10px_30px_0_rgba(0,0,0,0.4)] hover:border-amber-400/50 hover:shadow-[0_10px_30px_0_rgba(245,195,68,0.12)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {/* Card Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFB347]/10 via-[#F9ED96]/5 to-[#E5A1F5]/10 opacity-30 group-hover:opacity-70 transition-opacity pointer-events-none" />

              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#090d17] to-[#141a29] border border-indigo-900/50 text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-amber-300 uppercase mb-5">
                  <span className="text-amber-400">{feature.icon}</span>
                  <span>{feature.badge}</span>
                </div>

                {/* Title with Highlight */}
                <h3 className={`text-xl sm:text-2xl font-bold text-white leading-tight mb-3 ${jakarta.className}`}>
                  {feature.title}{' '}
                  <span className={`italic font-normal bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent ${instrumentSerif.className}`}>
                    {feature.highlight}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-0 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

