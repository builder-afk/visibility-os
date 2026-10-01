"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'
import {
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Search,
  ShieldCheck,
  Cpu,
  ArrowRight,
  TrendingUp,
  Brain,
  CheckCircle2,
  FileText,
  Globe2,
  Clock
} from 'lucide-react'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic']
})

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-body selection:bg-orange-100 selection:text-orange-900">
      {/* Navbar */}
      <PublicNavbar className="border-b border-orange-200/40 bg-white/80 backdrop-blur-md sticky top-0 z-50" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-orange-200/80 shadow-xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#F28482]" />
            <span className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent">
              ABOUT MIRACLE
            </span>
          </div>

          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12] mb-6 ${jakarta.className}`}>
            Engineered to Make Your Content <br />
            <span className={`italic font-normal bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent block mt-2 ${instrumentSerif.className}`}>
              Get Cited in AI Search
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            We are building the Generative Engine Optimization (GEO) platform for the post-search era. 
            Miracle helps modern businesses ensure their products and expertise are recommended 
            whenever customers ask AI assistants for answers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f172a] text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg"
            >
              <span>Get Cited Effortlessly</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#problem"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white border border-orange-200/80 text-slate-700 font-semibold text-sm hover:bg-orange-50/50 transition-colors shadow-xs"
            >
              Explore Our Mission
            </a>
          </div>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">

        {/* Section 1: The Problem We Solved */}
        <section id="problem" className="scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#FFF9F5] border border-orange-200/70 shadow-[0_8px_32px_0_rgba(245,195,68,0.08)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FFB347]/10 via-[#F28482]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#ea580c] bg-orange-100/80 px-3 py-1 rounded-md">
                  <Target className="w-3.5 h-3.5" />
                  <span>THE PROBLEM WE SOLVED</span>
                </div>

                <h2 className={`text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight ${jakarta.className}`}>
                  Traditional SEO Is Breaking in an <br />
                  <span className={`italic font-normal bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent ${instrumentSerif.className}`}>
                    AI-First World
                  </span>
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  For over two decades, digital marketing relied on ranking ten blue links on Google. 
                  However, today over <strong>60% of product research and high-intent queries</strong> happen directly inside 
                  ChatGPT, Claude, Perplexity, Gemini, and AI Search engines.
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Traditional SEO tools only tell you where you rank on Google. They offer zero insights into whether 
                  generative AI engines mention your brand or cite your articles when users ask for recommendations. 
                  Miracle solves this structural blind spot by giving businesses total visibility and optimization tools 
                  for LLM recommendations.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                <div className="p-5 rounded-2xl bg-white/90 border border-orange-200/60 shadow-xs flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-orange-50 text-[#ea580c] shrink-0">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Shift to AI Answers</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Users skip search engine results to ask conversational AI for direct answers and software picks.</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/90 border border-orange-200/60 shadow-xs flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-50 text-[#B567C2] shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">The Invisible Brand Crisis</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Great products get left out of LLM answers if they lack generative engine citation signals.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 2: How Miracle Was Started */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-slate-400">
                  <Zap className="w-24 h-24" />
                </div>
                
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    M
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Miracle Genesis</h4>
                    <p className="text-xs text-slate-400">Founded 2024 • AI Search Infrastructure</p>
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Analyzed 10,000+ AI search queries across ChatGPT & Perplexity</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Isolated key quantitative & citation signals that trigger LLM citations</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Built automated workflow engine to optimize content for AI engines</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#B567C2] bg-purple-100/80 px-3 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5" />
                <span>HOW MIRACLE WAS STARTED</span>
              </div>

              <h2 className={`text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight ${jakarta.className}`}>
                Born Out of a Need for <br />
                <span className={`italic font-normal bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent ${instrumentSerif.className}`}>
                  Transparent AI Visibility
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Miracle was started by AI search engineers who realized that the rules of content discovery 
                were being rewritten in real-time. As millions of users began relying on ChatGPT, Claude, and Gemini 
                for recommendations, high-quality products were losing traffic simply because LLMs could not verify 
                their authority signals.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We built Miracle to bridge this gap: giving modern teams the exact tools, prompts, and analytical 
                frameworks needed to get cited effortlessly in AI search responses.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 3: Product Philosophy */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#F28482] bg-pink-100/80 px-3 py-1 rounded-md mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PRODUCT PHILOSOPHY</span>
              </div>

              <h2 className={`text-3xl sm:text-4xl font-extrabold text-[#0f172a] ${jakarta.className}`}>
                Our Core Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-orange-300/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#ea580c] flex items-center justify-center mb-6">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className={`text-xl font-bold text-slate-900 mb-2 ${jakarta.className}`}>Empirical Over Hype</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  We don't rely on guesswork. Every feature in Miracle is grounded in empirical GEO benchmark data, 
                  ensuring real citation uplift.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-orange-300/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#B567C2] flex items-center justify-center mb-6">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className={`text-xl font-bold text-slate-900 mb-2 ${jakarta.className}`}>Human Quality First</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  AI shouldn't replace thoughtful writing. Miracle helps craft rich, authoritative content that answers 
                  real customer questions naturally.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-orange-300/60 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className={`text-xl font-bold text-slate-900 mb-2 ${jakarta.className}`}>Global AI Intelligence</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  LLM results vary by location. Miracle monitors AI search visibility across 220+ countries daily 
                  for complete global coverage.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 4: Data Methodology */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#FFF9F5] border border-orange-200/70 shadow-[0_8px_32px_0_rgba(245,195,68,0.08)]"
          >
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#ea580c] bg-orange-100/80 px-3 py-1 rounded-md mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>DATA METHODOLOGY</span>
              </div>

              <h2 className={`text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight mb-4 ${jakarta.className}`}>
                How Miracle Drives AI Citation Growth
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our methodology combines real-time LLM response sampling, quantitative data structuring, 
                and citation graph analysis to maximize generative engine visibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-orange-200/60 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#ea580c] flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">Quantitative Signal Injection</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Adding verified statistics, comparative metrics, and authoritative sources increases mean LLM citation probability by up to 37.1%.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-orange-200/60 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#B567C2] flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">Multi-LLM Citation Tracking</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Continuous monitoring across ChatGPT (GPT-4o), Perplexity, Claude 3.5, Gemini 1.5, and Meta AI to benchmark brand mention share.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-orange-200/60 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-pink-100 text-[#F28482] flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">Structured Schema & Knowledge Graph</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Injecting machine-readable microdata and technical documentation schemas so LLM web crawlers parse key facts effortlessly.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-orange-200/60 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">Community & Reddit Mention Monitoring</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    AI search relies heavily on organic community discussions. We track and assist in building authentic brand presence across Reddit.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 5: Why This Matters Now */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#0f172a] text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F5C344]/20 via-[#F28482]/20 to-[#B567C2]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#F5C344] bg-white/10 px-3 py-1 rounded-md">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>WHY THIS MATTERS NOW</span>
              </div>

              <h2 className={`text-3xl sm:text-5xl font-extrabold text-white leading-tight ${jakarta.className}`}>
                The First Mover Advantage in <br />
                <span className={`italic font-normal bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent ${instrumentSerif.className}`}>
                  AI Recommendations Is Huge
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Generative AI models learn through consensus and repeated authoritative citations. 
                Once an AI engine establishes a brand as the leading answer in a product category, 
                overturning that AI recommendation becomes significantly harder over time.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                By optimizing your content for AI search today, you lock in early authority and ensure 
                your brand remains the default recommendation as millions of users migrate to AI-first search.
              </p>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] text-slate-950 font-bold text-sm hover:opacity-95 transition-opacity shadow-lg"
                >
                  <span>Start Getting Cited Today</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
