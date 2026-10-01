"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, User, ArrowRight, Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useAuth } from '@/hooks/use-auth'
import { motion, AnimatePresence } from 'framer-motion'
import { SiteSearchModal } from '@/components/search/site-search-modal'

interface PublicNavbarProps {
  className?: string
}

export function PublicNavbar({ className }: PublicNavbarProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    getSession().then((s) => setSession(s)).catch(() => { })
  }, [])

  // Detect scroll to enhance sticky header styling
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const isLoggedIn = isAuthenticated || Boolean(user) || Boolean(session)

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Templates', href: '/n8n-templates' },
    { name: 'Tools', href: '/tools' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Docs', href: '/documentation' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full font-body transition-all duration-300",
        isScrolled
          ? "py-2.5 bg-[#FAF8F3]/85 dark:bg-[#090d16]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          : "py-4 bg-transparent",
        className
      )}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className={cn(
          "rounded-full px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between",
          "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800",
          isScrolled
            ? "shadow-md"
            : "shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
        )}>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-[#0f172a] dark:bg-[#ff5500] text-white flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform shadow-xs">
              M
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold tracking-tight text-[#0f172a] dark:text-slate-100">miracle</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5500] bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/80 px-1.5 py-0.5 rounded-full">studio</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#ff5500] dark:hover:text-[#ff5500] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] rounded-md px-1 py-0.5"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & Auth Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Real-time Site Search */}
            <SiteSearchModal />

            {/* Auth / CTA for Desktop */}
            <div className="hidden sm:flex items-center gap-2.5">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0f172a] dark:hover:text-white px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] rounded-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#ff5500] hover:bg-[#e64d00] text-white rounded-full px-4 sm:px-5 py-2 text-xs font-bold transition-all shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff5500]"
                  >
                    Start Building <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-full px-4 py-2 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 hover:scale-102"
                >
                  <User className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[68px] z-40 bg-black/50 backdrop-blur-sm lg:hidden mobile-menu-overlay"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-[68px] left-4 right-4 z-50 lg:hidden rounded-3xl border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[8px_8px_0px_#0f172a] dark:shadow-[8px_8px_0px_rgba(255,85,0,0.4)] max-h-[calc(100vh-90px)] overflow-y-auto"
            >
              <nav className="flex flex-col gap-3 font-semibold text-sm divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex flex-col gap-2 pb-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-xl text-slate-800 dark:text-slate-100 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#ff5500] transition-colors flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  ))}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="pt-4 flex flex-col gap-2.5">
                  {!isLoggedIn ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center py-3 rounded-xl text-xs font-bold bg-[#ff5500] hover:bg-[#e64d00] text-white shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        Start Building Free <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </>
                  ) : (
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Go to Dashboard
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
