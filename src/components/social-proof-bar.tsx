import React from 'react'
import {
  OpenAiLogo,
  ClaudeLogo,
  PerplexityLogo,
  GeminiLogo,
  MetaAiLogo,
  GrokLogo,
} from '@/components/ui/ai-logos'

export function SocialProofBar() {
  return (
    <div className="w-full bg-transparent py-4 my-2 relative z-20 font-body">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#FFFDF9] via-[#FAF8F5] to-[#F4EFEB] border border-slate-200/90 p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm overflow-hidden">
          
          {/* Top Brand Subtle Orange Indicator */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#ff5500] to-transparent pointer-events-none" />

          {/* Left Headline */}
          <span className="font-bold text-slate-800 tracking-tight text-xs sm:text-sm">
            We Ship systems that get recommended &amp; cited on ChatGPT &amp; Gemini
          </span>

          {/* Divider */}
          <div className="h-5 w-[1px] bg-slate-200 hidden sm:block" />

          {/* Label */}
          <span className="text-slate-500 font-medium text-xs">
            As seen in AI engines from
          </span>

          {/* AI Logos Row */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* 1. ChatGPT / OpenAI */}
            <div
              className="flex items-center justify-center hover:scale-110 transition-transform duration-200 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer group"
              title="ChatGPT / OpenAI"
            >
              <OpenAiLogo className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-800 group-hover:text-emerald-600 transition-colors shrink-0" />
            </div>

            {/* 2. Claude / Anthropic */}
            <div
              className="flex items-center justify-center hover:scale-110 transition-transform duration-200 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer group"
              title="Claude / Anthropic"
            >
              <ClaudeLogo className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform shrink-0" />
            </div>

            {/* 3. Perplexity AI */}
            <div
              className="flex items-center justify-center hover:scale-110 transition-transform duration-200 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer group"
              title="Perplexity AI"
            >
              <PerplexityLogo className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform shrink-0" />
            </div>

            {/* 4. Google Gemini */}
            <div
              className="flex items-center justify-center hover:scale-110 transition-transform duration-200 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer group"
              title="Google Gemini"
            >
              <GeminiLogo className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform shrink-0" />
            </div>

            {/* 5. Meta AI */}
            <div
              className="flex items-center justify-center hover:scale-110 transition-transform duration-200 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer group"
              title="Meta AI"
            >
              <MetaAiLogo className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform shrink-0" />
            </div>

            {/* 6. Grok / xAI */}
            <div
              className="flex items-center justify-center hover:scale-110 transition-transform duration-200 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer group"
              title="Grok / xAI"
            >
              <GrokLogo className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-800 group-hover:text-black transition-colors shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
