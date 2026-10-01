"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Comfortaa } from "next/font/google"
import { cn } from "@/lib/utils"

const comfortaa = Comfortaa({ subsets: ["latin"] })

const socialLinks = [
  { name: "TWITTER", href: "#" },
  { name: "GITHUB", href: "#" },
  { name: "LINKEDIN", href: "#" },
  { name: "YOUTUBE", href: "#" },
  { name: "INSTAGRAM", href: "#" },
  { name: "DISCORD", href: "#" },
]

const solutionLinks = [
  { name: "B2B solutions", href: "#" },
  { name: "DataMind", href: "#" },
  { name: "Insights", href: "#" },
  { name: "Keyword research", href: "#" },
  { name: "Mobile", href: "#" },
  { name: "Connect content & SEO", href: "#" },
  { name: "Win at SEO", href: "#" },
  { name: "Succeed with BrightEdge", href: "#" },
  { name: "Enterprise SEO", href: "#" },
]

const productLinksCol1 = [
  { name: "Keyword research", href: "#" },
  { name: "Competitive analysis", href: "#" },
  { name: "Live trends", href: "#" },
  { name: "Site audit", href: "#" },
  { name: "On-page SEO", href: "#" },
  { name: "Content creation", href: "#" },
  { name: "Content optimization", href: "#" },
  { name: "SEO Copilot", href: "#" },
  { name: "Custom reporting", href: "#" },
]

const productLinksCol2 = [
  { name: "Traffic reporting", href: "#" },
  { name: "Keyword reporting", href: "#" },
  { name: "AI Driven SEO", href: "#" },
  { name: "Mobile SEO", href: "#" },
  { name: "Local SEO", href: "#" },
  { name: "Integrations", href: "#" },
  { name: "AI Catalyst", href: "#" },
  { name: "Chrome Extension", href: "#" },
]

const sitemapLinks = [
  { name: "AI App Builder", href: "#" },
  { name: "Prompt Marketplace", href: "/marketplace" },
  { name: "Agent Templates", href: "#" },
  { name: "Voice Assistants", href: "#" },
  { name: "Architecture Plan", href: "/architecture-plan" },
  { name: "Marketing Directory", href: "/marketing-directory" },
  { name: "Partners Directory", href: "/partners-directory" },
  { name: "Referral Program", href: "#" },
]

const projectLinks = [
  { name: "Reddit Growth Playbook", href: "/reddit-playbook" },
  { name: "Documentation", href: "/documentation" },
  { name: "Context Engineering", href: "/documentation/topic/context-engineering" },
  { name: "Reddit Marketing & GEO", href: "/documentation/topic/reddit-marketing" },
  { name: "AI Agents Architecture", href: "/documentation/topic/ai-agents" },
  { name: "Prompt Engineering", href: "/documentation/topic/prompt-engineering" },
  { name: "N8N Templates", href: "/n8n-templates" },
]

const coreToolsLinks = [
  { name: "Brand Radar", href: "/tools/brand-radar" },
  { name: "Custom Prompts", href: "/tools/custom-prompts" },
  { name: "Dashboard", href: "/tools/dashboard" },
  { name: "Site Explorer", href: "/tools/site-explorer" },
  { name: "Keywords Explorer", href: "/tools/keywords-explorer" },
  { name: "Site Audit", href: "/tools/site-audit" },
  { name: "Rank Tracker", href: "/tools/rank-tracker" },
  { name: "GSC Insights", href: "/tools/gsc-insights" },
  { name: "Content Explorer", href: "/tools/content-explorer" },
  { name: "Web Analytics", href: "/tools/web-analytics" },
  { name: "Bot Analytics", href: "/tools/bot-analytics" },
  { name: "GBP Monitor", href: "/tools/gbp-monitor" },
  { name: "Social Media Manager", href: "/tools/social-media-manager" },
  { name: "AI Content Helper", href: "/tools/ai-content-helper" },
]

const extraToolsLinks = [
  { name: "Domain Comparison", href: "/tools/domain-comparison" },
  { name: "Batch Analysis", href: "/tools/batch-analysis" },
  { name: "Link Intersect", href: "/tools/link-intersect" },
  { name: "Content Gap", href: "/tools/content-gap" },
  { name: "Email Alerts", href: "/tools/email-alerts" },
  { name: "SEO Checker", href: "/tools/seo-checker" },
  { name: "Traffic Checker", href: "/tools/traffic-checker" },
  { name: "Data Studio Connectors", href: "/tools/data-studio-connectors" },
  { name: "Top Websites", href: "/tools/top-websites" },
  { name: "Patches", href: "/tools/patches" },
  { name: "Portfolios", href: "/tools/portfolios" },
  { name: "IndexNow", href: "/tools/indexnow" },
  { name: "AI Tech SEO", href: "/tools/ai-tech-seo" },
  { name: "All tools", href: "/tools" },
]

const contactInfo = {
  general: { label: "General Inquiries", email: "hello@miracle.dev" },
  support: { label: "Support", email: "support@miracle.dev" },
}

/* ─── MAGNETIC PARTICLE DOT FIELD CANVAS ────────────────────────────── */
interface Dot {
  gx: number
  gy: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  alpha: number
  targetAlpha: number
}

function MagneticDotField({
  mousePos,
  isHovered,
}: {
  mousePos: { x: number; y: number }
  isHovered: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const dotsRef = useRef<Dot[]>([])
  const animFrameRef = useRef<number | null>(null)

  // Initialize dot grid on resize
  const initGrid = useCallback((width: number, height: number) => {
    const spacing = 32
    const dots: Dot[] = []
    for (let x = spacing / 2; x < width; x += spacing) {
      for (let y = spacing / 2; y < height; y += spacing) {
        dots.push({
          gx: x,
          gy: y,
          x: x,
          y: y,
          vx: 0,
          vy: 0,
          radius: 2,
          baseRadius: 2,
          alpha: 0.35,
          targetAlpha: 0.35,
        })
      }
    }
    dotsRef.current = dots
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      initGrid(w, h)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [initGrid])

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const influenceRadius = 200
    const spring = 0.08
    const damping = 0.82

    const render = () => {
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      const mx = mousePos.x
      const my = mousePos.y

      const dots = dotsRef.current
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        // Calculate magnetic force if cursor hovered
        if (isHovered) {
          const dx = mx - dot.gx
          const dy = my - dot.gy
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < influenceRadius) {
            const factor = 1 - dist / influenceRadius
            const force = Math.pow(factor, 2) * 45

            // Magnetic attraction/repulsion displacement
            const angle = Math.atan2(dy, dx)
            const targetX = dot.gx + Math.cos(angle) * force * 0.8
            const targetY = dot.gy + Math.sin(angle) * force * 0.8

            dot.vx += (targetX - dot.x) * 0.15
            dot.vy += (targetY - dot.y) * 0.15
            dot.targetAlpha = 0.4 + factor * 0.5
            dot.radius = dot.baseRadius + factor * 2.5
          } else {
            dot.targetAlpha = 0.35
            dot.radius = dot.baseRadius
          }
        } else {
          dot.targetAlpha = 0.35
          dot.radius = dot.baseRadius
        }

        // Spring physics back to grid origin
        const springDx = dot.gx - dot.x
        const springDy = dot.gy - dot.y
        dot.vx += springDx * spring
        dot.vy += springDy * spring

        dot.vx *= damping
        dot.vy *= damping

        dot.x += dot.vx
        dot.y += dot.vy

        dot.alpha += (dot.targetAlpha - dot.alpha) * 0.1

        // Render dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        if (dot.alpha > 0.5) {
          ctx.fillStyle = `rgba(37, 99, 235, ${Math.min(1, dot.alpha)})`
          ctx.shadowColor = "rgba(37, 99, 235, 0.4)"
          ctx.shadowBlur = 6
        } else {
          ctx.fillStyle = `rgba(71, 85, 105, ${dot.alpha})`
          ctx.shadowBlur = 0
        }
        ctx.fill()
      }

      ctx.restore()
      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [mousePos, isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  )
}

/* ─── FOOTER COMPONENT ────────────────────────────────────────────────── */
export function Footer() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const footerRef = useRef<HTMLElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  // Detect mobile/touch accurately without false positives on desktop Chrome
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse) and (max-width: 768px)").matches)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mouse tracking with zoom compensation and direct GPU transform
  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const getZoomFactor = () => {
      if (typeof window === 'undefined') return 1
      const docZoom = parseFloat(window.getComputedStyle(document.documentElement).zoom || '1') || 1
      const bodyZoom = parseFloat(window.getComputedStyle(document.body).zoom || '1') || 1
      return docZoom * bodyZoom
    }

    const updateCursor = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const zoom = getZoomFactor()
      const x = (e.clientX - rect.left) / zoom
      const y = (e.clientY - rect.top) / zoom

      setMousePos({ x, y })

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x - 3}px, ${y - 2}px, 0)`
        cursorRef.current.style.opacity = '1'
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      setIsHovered(true)
      updateCursor(e)
    }

    const handlePointerEnter = (e: PointerEvent) => {
      setIsHovered(true)
      updateCursor(e)
    }

    const handlePointerLeave = () => {
      setIsHovered(false)
      setMousePos({ x: -1000, y: -1000 })
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
      }
    }

    el.addEventListener("pointermove", handlePointerMove)
    el.addEventListener("pointerenter", handlePointerEnter)
    el.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      el.removeEventListener("pointermove", handlePointerMove)
      el.removeEventListener("pointerenter", handlePointerEnter)
      el.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative z-10 w-full overflow-hidden border-t select-none backdrop-blur-md bg-white/95"
      style={{
        borderColor: "#e2e8f0",
      }}
    >
      <style>{`
        footer, footer * {
          cursor: none !important;
        }
      `}</style>

      {/* Canvas Magnetic Dot Field */}
      {!isMobile && (
        <MagneticDotField mousePos={mousePos} isHovered={isHovered} />
      )}

      {/* Custom Arrow Pointer + Blue "You" Badge */}
      {!isMobile && (
        <div
          ref={cursorRef}
          className="pointer-events-none absolute z-50 transition-opacity duration-150 opacity-0"
          style={{
            top: 0,
            left: 0,
            willChange: "transform",
          }}
        >
          {/* Dark Arrow SVG */}
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
          >
            <path
              d="M3 2L17 12L10.5 14L8 21L3 2Z"
              fill="#0f172a"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Small Blue "You" Badge */}
          <div
            className="mt-1 ml-3 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white shadow-md flex items-center gap-1 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
              boxShadow: "0 2px 10px rgba(37, 99, 235, 0.3)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            You
          </div>
        </div>
      )}

      {/* Social Links Bar */}
      <div
        className="w-full relative z-10"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
      >
        <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 py-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-xs sm:text-sm font-semibold tracking-[0.15em] transition-colors duration-300"
                style={{ color: "rgba(51, 65, 85, 0.65)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#0f172a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(51, 65, 85, 0.65)")
                }
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content: Broader Horizontal Grid Layout */}
      <div className="relative z-10 mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-8 xl:gap-6 2xl:gap-8">

          {/* SOLUTIONS */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-500">
              SOLUTIONS
            </h4>
            <div className="border-l-2 border-indigo-500/40 pl-4">
              <ul className="flex flex-col gap-3">
                {solutionLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* PRODUCT (Part 1) */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-500">
              PRODUCT
            </h4>
            <div className="border-l-2 border-indigo-500/40 pl-4">
              <ul className="flex flex-col gap-3">
                {productLinksCol1.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* PRODUCT (Part 2) */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-500">
              FEATURES
            </h4>
            <div className="border-l-2 border-indigo-500/40 pl-4">
              <ul className="flex flex-col gap-3">
                {productLinksCol2.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SITEMAP */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-500">
              SITEMAP
            </h4>
            <div className="border-l-2 border-indigo-500/40 pl-4">
              <ul className="flex flex-col gap-3">
                {sitemapLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-500">
              RESOURCES
            </h4>
            <div className="border-l-2 border-indigo-500/40 pl-4">
              <ul className="flex flex-col gap-3">
                {projectLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COMPANY & CONTACT */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-500">
              COMPANY
            </h4>
            <div className="border-l-2 border-indigo-500/40 pl-4">
              <ul className="flex flex-col gap-3 mb-6">
                {[
                  { name: "About miracle", href: "/about" },
                  { name: "Become a Creator", href: "/marketplace" },
                  { name: "Contact Support", href: "/contact" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Cookie Policy", href: "/cookie-policy" },
                  { name: "Refund Policy", href: "/refund-policy" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  General Inquiries
                </p>
                <a
                  href={`mailto:${contactInfo.general.email}`}
                  className="text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {contactInfo.general.email}
                </a>
              </div>
            </div>
          </div>

          {/* CORE TOOLS */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-500">
              CORE TOOLS
            </h4>
            <div className="border-l-2 border-indigo-500/40 pl-4">
              <ul className="flex flex-col gap-3">
                {coreToolsLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* EXTRA TOOLS & FEATURES */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6 text-slate-500">
              EXTRA TOOLS & FEATURES
            </h4>
            <div className="border-l-2 border-indigo-500/40 pl-4">
              <ul className="flex flex-col gap-3">
                {extraToolsLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Large Brand Name */}
      <div
        className="relative z-10 w-full overflow-hidden"
        style={{ height: "220px" }}
      >
        <div className="relative flex items-center justify-center h-full">
          <div
            role="presentation"
            aria-hidden="true"
            className={cn(
              "font-bold select-none leading-none",
              comfortaa.className
            )}
            style={{
              fontSize: "clamp(6rem, 18vw, 16rem)",
              letterSpacing: "-0.03em",
              backgroundImage:
                "linear-gradient(180deg, rgba(15, 23, 42, 0.12) 0%, rgba(15, 23, 42, 0.03) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            miracle
          </div>
          {/* Sparkle accent */}
          <Sparkles
            className="absolute"
            style={{
              width: "clamp(1.5rem, 4vw, 3.5rem)",
              height: "clamp(1.5rem, 4vw, 3.5rem)",
              color: "rgba(37, 99, 235, 0.35)",
              top: "20%",
              right: "calc(50% - clamp(3rem, 9vw, 8rem))",
            }}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="w-full relative z-10"
        style={{ borderTop: "1px solid rgba(0, 0, 0, 0.06)" }}
      >
        <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-16 py-6 flex flex-col gap-4">
          {/* Trademark Disclaimer */}
          <p className="text-[10px] text-slate-400/60 text-center leading-relaxed max-w-4xl mx-auto">
            All product names, logos, brands, and trademarks displayed on this website are the property of their respective owners. Use of these names and logos does not imply endorsement, affiliation, or sponsorship.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "rgba(51, 65, 85, 0.5)" }}>
              © {new Date().getFullYear()} miracle. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[11px]" style={{ color: "rgba(51, 65, 85, 0.45)" }}>
              <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms</Link>
              <Link href="/cookie-policy" className="hover:text-slate-600 transition-colors">Cookies</Link>
              <Link href="/refund-policy" className="hover:text-slate-600 transition-colors">Refunds</Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className="text-xs"
                style={{ color: "rgba(51, 65, 85, 0.5)" }}
              >
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
