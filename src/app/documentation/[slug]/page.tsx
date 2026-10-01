"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowLeft, Clock, Calendar, User, Layers, ArrowRight, Check,
  Copy, BookOpen, ChevronRight, Share2, Sparkles, Tag, ShieldCheck,
  CheckCircle2, AlertCircle, Lightbulb, Compass
} from 'lucide-react'
import { getArticleBySlug, blogArticles, getTopicFromCategory, getAdjacentArticles } from '@/lib/blog-data'
import { PublicNavbar } from '@/components/public-navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { PostUpdatedDate } from '@/components/ui/post-updated-date'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function CodeBlockWithCopy({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code', err)
    }
  }

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-[#0f172a] shadow-xl">
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-800 bg-slate-900/90 text-xs">
        <span className="font-mono font-bold text-slate-400 uppercase tracking-wider text-[11px]">
          {lang || "Code"}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-5 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto text-slate-100 selection:bg-orange-500/30">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params?.slug as string
  const article = getArticleBySlug(slug)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-body">
        <PublicNavbar className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200" />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-black text-[#0f172a] uppercase mb-3">Article Not Found</h1>
            <p className="text-slate-600 mb-6">The article you are looking for does not exist or has been moved.</p>
            <Link href="/documentation">
              <Button className="rounded-xl bg-[#0f172a] text-white">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Documentation
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const topicMeta = getTopicFromCategory(article.category)
  const { prev: prevArticle, next: nextArticle } = getAdjacentArticles(article.slug)

  // Extract headings for Table of Contents
  const headings = article.content
    .filter(block => block.startsWith("## "))
    .map(block => block.replace("## ", ""))

  // Get related articles (same category, excluding current)
  const related = blogArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2)
  
  const additionalRelated = related.length < 2
    ? blogArticles.filter((a) => a.slug !== article.slug && !related.includes(a)).slice(0, 2 - related.length)
    : []
  const allRelated = [...related, ...additionalRelated]

  return (
    <div className="min-h-screen bg-white text-slate-900 font-body selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      {/* Sticky Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#b567c2] z-50 origin-left"
        style={{ scaleX }}
      />

      <PublicNavbar className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200" />

      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/documentation" className="hover:text-[#0f172a] transition-colors">Docs</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {topicMeta ? (
              <Link href={`/documentation/topic/${topicMeta.slug}`} className="text-slate-700 hover:text-[#ea580c] transition-colors">
                {article.category}
              </Link>
            ) : (
              <span>{article.category}</span>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
          </div>

          {topicMeta && (
            <Link
              href={`/documentation/topic/${topicMeta.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#ea580c] hover:bg-orange-100 transition-colors font-bold text-[11px]"
            >
              <Compass className="w-3 h-3" />
              View {topicMeta.name} Topic Hub
            </Link>
          )}
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ── Left / Main Content Column (Spans 8 cols on desktop) ── */}
          <article className="lg:col-span-8 max-w-3xl">
            {/* Header Metadata */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${article.coverGradient} text-white shadow-xs`}>
                  {article.category}
                </span>
                {article.difficulty && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    {article.difficulty}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.08] tracking-tight mb-5 text-[#0f172a] uppercase">
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-6">
                {article.description}
              </p>

              {/* Author & Timestamp Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 font-medium pb-6 border-b border-slate-200">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#ea580c]" />
                  <span className="font-bold text-slate-900">{article.author}</span>
                  <span className="text-slate-300">·</span>
                  <span>{article.authorRole}</span>
                </span>
                <PostUpdatedDate date={article.date} />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" /> {article.readTime}
                </span>
              </div>
            </div>

            {/* ── Executive Summary / Key Takeaways Callout ── */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="my-8 rounded-3xl bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-purple-50/40 border border-orange-200 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-[#ea580c]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#ea580c]">
                    Executive Summary &amp; Key Takeaways
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ── Rendered Markdown Body ── */}
            <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#0f172a] prose-h2:text-2xl prose-h2:uppercase prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:mt-10 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-[#0f172a]">
              {article.content.map((block, i) => {
                // Headings H2
                if (block.startsWith("## ")) {
                  const headingText = block.replace("## ", "")
                  const anchorId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                  return (
                    <h2 key={i} id={anchorId} className="scroll-mt-24 text-2xl font-black tracking-tight mt-12 mb-4 text-[#0f172a] uppercase border-b border-slate-200 pb-3 flex items-center justify-between">
                      <span>{headingText}</span>
                      <a href={`#${anchorId}`} className="text-slate-300 hover:text-[#ea580c] text-sm font-mono ml-2">#</a>
                    </h2>
                  )
                }

                // Headings H3
                if (block.startsWith("### ")) {
                  const headingText = block.replace("### ", "")
                  const anchorId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                  return (
                    <h3 key={i} id={anchorId} className="scroll-mt-24 text-lg font-extrabold tracking-tight mt-8 mb-3 text-[#0f172a]">
                      {headingText}
                    </h3>
                  )
                }

                // Code blocks
                if (block.startsWith("```")) {
                  const lines = block.split("\n")
                  const lang = lines[0].replace("```", "").trim()
                  const code = lines.slice(1, -1).join("\n")
                  return <CodeBlockWithCopy key={i} code={code} lang={lang} />
                }

                // Table blocks
                if (block.includes("|") && block.includes("---")) {
                  const rows = block.split("\n").filter(r => r.trim() && !r.includes("---"))
                  const headers = rows[0]?.split("|").filter(Boolean).map(h => h.trim())
                  const dataRows = rows.slice(1).map(r => r.split("|").filter(Boolean).map(c => c.trim()))

                  return (
                    <div key={i} className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                      <table className="w-full text-xs sm:text-sm">
                        <thead className="bg-slate-100 border-b border-slate-200">
                          <tr>
                            {headers?.map((h, hi) => (
                              <th key={hi} className="px-4 py-3 text-left font-bold text-[#0f172a] uppercase tracking-wider text-[11px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dataRows.map((row, ri) => (
                            <tr key={ri} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                              {row.map((cell, ci) => (
                                <td key={ci} className="px-4 py-3 text-slate-700 font-medium">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                }

                // Bold/emphasized paragraphs with newlines (step lists)
                if (block.includes("\n")) {
                  return (
                    <div key={i} className="my-4 space-y-2">
                      {block.split("\n").map((line, j) => (
                        <div key={j} className="text-base leading-relaxed text-slate-700 font-medium">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              strong: ({ children }) => <strong className="text-[#0f172a] font-bold">{children}</strong>,
                              em: ({ children }) => <em>{children}</em>,
                              code: ({ children }) => (
                                <code className="px-1.5 py-0.5 rounded bg-orange-50 text-sm font-mono text-[#ea580c] border border-orange-200 font-bold">
                                  {children}
                                </code>
                              ),
                              p: ({ children }) => <span>{children}</span>,
                            }}
                          >
                            {line.startsWith("- ") ? `• ${line.slice(2)}` : line}
                          </ReactMarkdown>
                        </div>
                      ))}
                    </div>
                  )
                }

                // Regular paragraphs
                return (
                  <div key={i} className="text-base leading-[1.85] text-slate-700 font-medium mb-5">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        strong: ({ children }) => <strong className="text-[#0f172a] font-bold">{children}</strong>,
                        em: ({ children }) => <em>{children}</em>,
                        code: ({ children }) => (
                          <code className="px-1.5 py-0.5 rounded bg-orange-50 text-sm font-mono text-[#ea580c] border border-orange-200 font-bold">
                            {children}
                          </code>
                        ),
                        p: ({ children }) => <span>{children}</span>,
                      }}
                    >
                      {block.startsWith("- ") ? `• ${block.slice(2)}` : block}
                    </ReactMarkdown>
                  </div>
                )
              })}
            </div>

            {/* ── Author Bio Box ── */}
            <div className="mt-14 pt-8 border-t border-slate-200 rounded-3xl bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center font-bold text-lg shrink-0">
                {article.author.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-[#0f172a]">{article.author}</h4>
                <p className="text-xs font-semibold text-[#ea580c] mb-2">{article.authorRole} · Miracle AI</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Author and core contributor to Miracle&apos;s open-source architecture playbooks, context engineering tools, and generative citation strategies.
                </p>
              </div>
            </div>

            {/* ── Next / Previous Navigation ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-200">
              {prevArticle ? (
                <Link
                  href={`/documentation/${prevArticle.slug}`}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#ea580c] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#ea580c] flex items-center gap-1 mb-2">
                    <ArrowLeft className="w-3 h-3" /> Previous Guide
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] line-clamp-2 leading-snug">
                    {prevArticle.title}
                  </h4>
                </Link>
              ) : <div />}

              {nextArticle ? (
                <Link
                  href={`/documentation/${nextArticle.slug}`}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-[#ea580c] hover:shadow-md transition-all group flex flex-col justify-between text-right"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#ea580c] flex items-center justify-end gap-1 mb-2">
                    Next Guide <ArrowRight className="w-3 h-3" />
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] line-clamp-2 leading-snug">
                    {nextArticle.title}
                  </h4>
                </Link>
              ) : <div />}
            </div>
          </article>

          {/* ── Right Sticky Sidebar (Spans 4 cols on desktop) ── */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Table of Contents Box */}
              {headings.length > 0 && (
                <div className="rounded-3xl bg-slate-50 border border-slate-200/90 p-6 shadow-2xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#ea580c]" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2 text-xs font-medium">
                    {headings.map((heading, idx) => {
                      const anchorId = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                      return (
                        <a
                          key={idx}
                          href={`#${anchorId}`}
                          className="block text-slate-600 hover:text-[#ea580c] transition-colors py-1 leading-snug"
                        >
                          {heading}
                        </a>
                      )
                    })}
                  </nav>
                </div>
              )}

              {/* Topic Hub Banner */}
              {topicMeta && (
                <div className="rounded-3xl bg-gradient-to-b from-[#ffffff] via-[#f7f3eb] to-[#ddd3be] border border-white/90 p-6 shadow-md">
                  <span className="text-[10px] font-bold text-[#ea580c] uppercase tracking-wider block mb-1">
                    Topic Playbook
                  </span>
                  <h4 className="text-base font-black text-[#0f172a] uppercase mb-2">
                    {topicMeta.name}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    Explore all {topicMeta.stats.articlesCount} guides, architecture blueprints, and checklists for {topicMeta.name}.
                  </p>
                  <Link href={`/documentation/topic/${topicMeta.slug}`}>
                    <Button className="w-full rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold">
                      Open Topic Hub <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Need Custom Systems CTA */}
              <div className="rounded-3xl bg-[#0f172a] p-6 text-white text-center">
                <Sparkles className="w-6 h-6 text-[#ea580c] mx-auto mb-2" />
                <h4 className="text-sm font-bold mb-1">Build Custom AI Pipelines</h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Deploy custom agents, context engineering pipelines, and AEO tracking with Miracle Studio.
                </p>
                <Link href="/contact">
                  <Button className="w-full rounded-xl bg-[#ff5500] hover:bg-[#e64d00] text-white text-xs font-bold">
                    Talk to Engineers
                  </Button>
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* ── Related Articles Section ── */}
      {allRelated.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50/70 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-black text-[#0f172a] tracking-tight uppercase mb-8">
              More Guides in {article.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allRelated.map((rel) => (
                <Link key={rel.slug} href={`/documentation/${rel.slug}`} className="block group">
                  <div className="rounded-3xl border border-slate-200 bg-white hover:border-[#ea580c] hover:shadow-xl transition-all duration-300 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[10px] font-bold text-[#ea580c] uppercase tracking-wider">
                        {rel.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold tracking-tight mt-2 mb-2 text-[#0f172a] group-hover:text-[#ea580c] transition-colors leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {rel.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-4 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> {rel.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#ea580c] font-bold text-[11px] uppercase">
                        Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
