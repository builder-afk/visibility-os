"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { CoreFeatures } from '@/components/core-features'
import { ExploreEcosystemSection } from '@/components/explore-ecosystem-section'
import { TaskEngineMosaic } from '@/components/task-engine-mosaic'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mobileNumber: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", company: "", mobileNumber: "", message: "" });
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-body selection:bg-orange-100">
      {/* Navbar */}
      <PublicNavbar className="border-b border-slate-200 bg-white/90 backdrop-blur-md" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-20 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Column - Copy & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ff5500] mb-6">
              <span className="text-sm font-medium tracking-wide uppercase">Get in touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-slate-900">
              Let&apos;s build your <span className="text-[#ff5500] italic">AI Operating System</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
              Ready to automate your workflows and deploy custom AI agents? Our team of engineers is here to help you scale infinitely.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                <Mail className="w-5 h-5 text-[#ff5500]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 mb-1">Email us</span>
                <a href="mailto:kv853772@gmail.com" className="text-slate-500 hover:text-[#ff5500] transition-colors">kv853772@gmail.com</a>
                <span className="text-xs text-slate-400 mt-1">We typically reply within 2 hours.</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                <Phone className="w-5 h-5 text-[#ff5500]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 mb-1">Call us</span>
                <a href="tel:+917376284881" className="text-slate-500 hover:text-[#ff5500] transition-colors">+91 7376284881</a>
                <span className="text-xs text-slate-400 mt-1">Mon-Fri from 9am to 6pm PST.</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                <MapPin className="w-5 h-5 text-[#ff5500]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 mb-1">Visit our office</span>
                <span className="text-slate-500">100 AI Innovation Drive<br/>Ghaziabad, Uttar Pradesh 201013</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-2xl shadow-slate-100 relative overflow-hidden"
        >
          {/* Subtle gradient background for the form */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[100px] -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-16 h-full"
            >
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Message sent!</h3>
              <p className="text-muted-foreground max-w-[280px]">
                Thank you for reaching out. One of our AI specialists will get back to you shortly.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-sm font-semibold text-[#ff5500] hover:underline underline-offset-4"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold mb-2 text-slate-900">Send us a message</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                  <input 
                    id="name"
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/30 focus:border-[#ff5500] transition-all text-sm text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Work Email</label>
                  <input 
                    id="email"
                    required
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/30 focus:border-[#ff5500] transition-all text-sm text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-sm font-medium text-slate-700">Company Name</label>
                  <input 
                    id="company"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/30 focus:border-[#ff5500] transition-all text-sm text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="mobileNumber" className="text-sm font-medium text-slate-700">Mobile Number</label>
                  <input 
                    id="mobileNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/30 focus:border-[#ff5500] transition-all text-sm text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">How can we help?</label>
                <textarea 
                  id="message"
                  required
                  placeholder="Tell us about the workflows you want to automate..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/30 focus:border-[#ff5500] transition-all text-sm resize-none text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-[#ff5500] hover:bg-[#e64d00] text-white font-semibold rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </main>

      {/* ─── Product Feature Overview Mosaic Section ─── */}
      <section className="w-full bg-slate-50/70 py-20 md:py-28 border-t border-slate-200 overflow-hidden relative font-body">
        {/* Atmospheric ambient lighting blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-orange-200/25 via-purple-200/15 to-blue-200/20 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-gradient-to-tl from-emerald-200/15 via-cyan-200/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header styled after Core Features */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-block text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#F5C344] via-[#F28482] to-[#B567C2] bg-clip-text text-transparent mb-3.5">
              Interactive Product Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-4">
              Automate your work — <span className="bg-gradient-to-r from-[#ff5500] to-[#ff7733] bg-clip-text text-transparent">Focus on what matters</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              Explore our single-view product landing mosaic. Five interconnected intelligence engines designed to orchestrate and streamline high-volume workflows.
            </p>
          </div>

          {/* Native Interactive Product Architecture Mosaic */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <TaskEngineMosaic />
          </motion.div>
        </div>
      </section>

      {/* Core Features Marketing Section */}
      <CoreFeatures />

      {/* Explore Our Ecosystem Section — Redesigned in Core Features Card Style */}
      <ExploreEcosystemSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
