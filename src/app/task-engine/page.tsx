import React from 'react'
import type { Metadata } from 'next'
import { TaskEngineMosaic } from '@/components/task-engine-mosaic'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Task Engine — Automate your work. Focus on what matters | miracle.io',
  description:
    'Explore our single-view product landing mosaic. Five interconnected intelligence engines designed to orchestrate and streamline high-volume workflows.',
}

export default function TaskEnginePage() {
  return (
    <div className="min-h-screen bg-[#111315] text-white flex flex-col font-body selection:bg-orange-500/30 selection:text-orange-200">
      <PublicNavbar className="border-b border-white/10 bg-[#16191d]/90 backdrop-blur-md" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="w-full max-w-[1340px]">
          {/* Headline above canvas */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5500] mb-2 inline-block">
              Interactive Product Showcase
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-display">
              Automate your work — <span className="text-[#ff5500]">Focus on what matters</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2 font-medium">
              Five interconnected intelligence engines designed to orchestrate and streamline high-volume workflows.
            </p>
          </div>

          {/* Mosaic Canvas */}
          <TaskEngineMosaic />
        </div>
      </main>

      <Footer />
    </div>
  )
}
