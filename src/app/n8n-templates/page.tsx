"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, LayoutTemplate, Layers, ChevronLeft, ChevronRight, Workflow, Zap, Database, Globe, MessageSquare, Mail, Sparkles } from 'lucide-react'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { FalconOperationsMosaic } from '@/components/falcon-operations-mosaic'

const N8N_TEMPLATES = [
  {
    title: "Sync Salesforce leads to Google Sheets",
    desc: "Automatically push new Salesforce leads into a Google Sheet for easy tracking and sharing.",
    icon: <Database className="w-5 h-5 text-blue-500" />
  },
  {
    title: "Send Slack notification on new Stripe payment",
    desc: "Keep your team informed by sending a Slack message whenever a successful payment occurs.",
    icon: <MessageSquare className="w-5 h-5 text-purple-500" />
  },
  {
    title: "Scrape websites and summarize with OpenAI",
    desc: "Extract text from target URLs, process them through OpenAI, and save the summary to Notion.",
    icon: <Globe className="w-5 h-5 text-green-500" />
  },
  {
    title: "Automate daily reporting to email",
    desc: "Fetch metrics from your database and email a daily performance report to stakeholders.",
    icon: <Mail className="w-5 h-5 text-orange-500" />
  },
  {
    title: "Lead scoring with Clearbit and Pipedrive",
    desc: "Enrich new Pipedrive leads with Clearbit data, score them, and alert sales if high-value.",
    icon: <Zap className="w-5 h-5 text-yellow-500" />
  },
  {
    title: "RSS feed to Twitter/X auto-poster",
    desc: "Automatically format and post new blog articles or news from an RSS feed to Twitter/X.",
    icon: <Globe className="w-5 h-5 text-blue-400" />
  },
  {
    title: "Shopify order to Airtable record",
    desc: "Create a new record in Airtable for every new order placed in your Shopify store.",
    icon: <Database className="w-5 h-5 text-indigo-500" />
  },
  {
    title: "Github issue creation from Typeform",
    desc: "Turn bug reports submitted via Typeform directly into organized GitHub issues.",
    icon: <Workflow className="w-5 h-5 text-gray-500" />
  },
  {
    title: "Monitor server downtime and SMS via Twilio",
    desc: "Ping your servers every minute and trigger a Twilio SMS if one goes offline.",
    icon: <Zap className="w-5 h-5 text-red-500" />
  },
  {
    title: "Automatically reply to Zendesk tickets with AI",
    desc: "Draft intelligent responses to common support requests in Zendesk using an LLM.",
    icon: <MessageSquare className="w-5 h-5 text-cyan-500" />
  },
  {
    title: "Trello card to Google Calendar event",
    desc: "When a Trello card is moved to 'Scheduled', instantly create a Google Calendar event.",
    icon: <LayoutTemplate className="w-5 h-5 text-blue-500" />
  },
  {
    title: "Transcribe audio files in Dropbox via Whisper",
    desc: "Watch a Dropbox folder for new audio, transcribe it using OpenAI Whisper, and save the text.",
    icon: <Database className="w-5 h-5 text-purple-400" />
  },
  {
    title: "Sync Notion database to Google Sheets",
    desc: "Keep a two-way or one-way sync between your Notion planning database and Google Sheets.",
    icon: <Database className="w-5 h-5 text-green-400" />
  },
  {
    title: "Auto-assign Jira tickets based on email content",
    desc: "Parse incoming support emails, classify the issue, and create assigned Jira tickets.",
    icon: <Mail className="w-5 h-5 text-orange-400" />
  },
  {
    title: "Send welcome email sequence in Mailchimp",
    desc: "Add new users from your app database to a Mailchimp drip campaign for onboarding.",
    icon: <Mail className="w-5 h-5 text-yellow-400" />
  },
  {
    title: "Extract invoice data with Google Cloud Vision",
    desc: "Process incoming invoice PDFs, extract totals and line items, and store them in Postgres.",
    icon: <Globe className="w-5 h-5 text-blue-600" />
  },
  {
    title: "Telegram bot for IT helpdesk",
    desc: "Allow employees to submit helpdesk tickets via Telegram and route them to your ticketing system.",
    icon: <MessageSquare className="w-5 h-5 text-indigo-400" />
  },
  {
    title: "Generate weekly newsletter from saved Pocket articles",
    desc: "Collate articles saved in Pocket over the week to draft a curated newsletter.",
    icon: <LayoutTemplate className="w-5 h-5 text-pink-500" />
  },
  {
    title: "Discord alerts for crypto price changes",
    desc: "Fetch prices from CoinGecko and send a Discord webhook if an asset changes by 5%.",
    icon: <MessageSquare className="w-5 h-5 text-indigo-600" />
  },
  {
    title: "Welcome new Discord members with a DM",
    desc: "Automatically send a personalized direct message when a new user joins your Discord server.",
    icon: <MessageSquare className="w-5 h-5 text-violet-500" />
  },
  {
    title: "Forward Gmail attachments to Google Drive",
    desc: "Automatically save all email attachments meeting specific criteria directly to a Google Drive folder.",
    icon: <Database className="w-5 h-5 text-blue-500" />
  }
]

export default function N8nTemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  const filteredTemplates = N8N_TEMPLATES.filter(template => 
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    template.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-white font-body text-slate-900">
      {/* Navbar */}
      <PublicNavbar className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200" />

      <main className="flex-1 w-full max-w-[1200px] mx-auto py-12 px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="mb-2">
              <span className="font-['Caveat',cursive] text-2xl font-bold text-[#ff5500] tracking-wide block">
                ready to deploy
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight uppercase mb-3 flex items-center gap-3">
              <Workflow className="w-8 h-8 text-[#ff5500]" />
              n8n Automation Templates
            </h1>
            <p className="text-slate-600 font-medium text-sm sm:text-base max-w-2xl leading-relaxed">
              Supercharge your workflows with our curated collection of n8n automation templates. 
              Connect your favorite apps and put your business on autopilot.
            </p>
          </div>
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/30 focus:border-[#ff5500] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Featured Showcase: Falcon AI Operations Overview */}
        <section className="mb-14">
          <FalconOperationsMosaic />
        </section>

        {/* Templates Section Heading */}
        <div className="flex items-center justify-between gap-4 mb-6 pt-2 border-t border-slate-100">
          <div>
            <h3 className="text-xl font-black text-[#0f172a] tracking-tight">
              Pre-built Workflow Templates
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Select any recipe below to instantly import into your n8n workspace
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {filteredTemplates.length} {filteredTemplates.length === 1 ? 'Template' : 'Templates'}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-12 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key="templates-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filteredTemplates.length > 0 ? (
                <motion.div 
                  initial="hidden"
                  animate="show"
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filteredTemplates.map((template, itemIdx) => (
                    <motion.div 
                      key={itemIdx}
                      variants={itemVariants}
                      className="group/card flex flex-col h-full bg-white border border-slate-200 hover:border-[#ff5500]/50 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 cursor-pointer text-left relative overflow-hidden shadow-xs"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff5500]/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                      <div className="mb-4 inline-flex p-2.5 rounded-xl bg-slate-50 border border-slate-200 w-fit">
                        {template.icon}
                      </div>
                      <h3 className="font-extrabold text-[15px] leading-snug text-[#0f172a] mb-2 pr-2 group-hover/card:text-[#ff5500] transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed flex-grow">
                        {template.desc}
                      </p>
                      <div className="flex w-full justify-between items-center mt-auto pt-3 border-t border-slate-100">
                        <span className="text-xs font-bold text-[#ff5500] opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300">
                          Use Template
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover/card:bg-[#ff5500] text-slate-500 group-hover/card:text-white flex items-center justify-center transition-colors shadow-xs">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <Workflow className="w-8 h-8 mb-4 text-[#ff5500]" />
                  <p className="font-bold text-[#0f172a] text-lg">No templates found</p>
                  <p className="text-sm text-slate-500 mt-1">Try adjusting your search query.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  )
}
