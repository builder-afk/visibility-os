"use client"

import React, { useState, useMemo } from 'react'
import { Search, ArrowRight, LayoutTemplate, User, ChevronLeft, ChevronRight, Heart, Bookmark } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

import { CATEGORIES, TEMPLATES_BY_CATEGORY, type EnhancedTemplateItem, type TemplateSection } from '@/lib/data/templates';
import { PromptPreviewModal } from '@/components/prompt-preview-modal';

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("General")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<EnhancedTemplateItem | null>(null)

  const [likedTemplates, setLikedTemplates] = useState<string[]>([])
  const [savedTemplates, setSavedTemplates] = useState<string[]>([])

  const toggleLike = (e: React.MouseEvent, title: string) => {
    e.stopPropagation()
    setLikedTemplates(prev => prev.includes(title) ? prev.filter(x => x !== title) : [...prev, title])
  }

  const toggleSave = (e: React.MouseEvent, title: string) => {
    e.stopPropagation()
    setSavedTemplates(prev => {
      const isSaved = prev.includes(title)
      toast.success(isSaved ? "Removed from saved" : "Saved to your library")
      return isSaved ? prev.filter(x => x !== title) : [...prev, title]
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  // Filter templates based on active category and search query
  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) {
      if (activeCategory === "All Templates") {
        return Object.values(TEMPLATES_BY_CATEGORY).flat();
      }
      return TEMPLATES_BY_CATEGORY[activeCategory] || [];
    }

    const query = searchQuery.toLowerCase();
    const results: TemplateSection[] = [];

    // Search across ALL categories globally
    Object.values(TEMPLATES_BY_CATEGORY).flat().forEach(section => {
      const matchedItems = section.items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
      );

      if (matchedItems.length > 0) {
        results.push({
          ...section,
          items: matchedItems
        });
      }
    });

    return results;
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full max-w-[1200px] mx-auto py-4 px-4 sm:px-6 font-body text-slate-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="mb-2">
            <span className="font-['Caveat',cursive] text-2xl font-bold text-[#ff5500] tracking-wide block">
              curated prompt library
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight uppercase mb-2 flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-[#ff5500]" />
            Discover Templates
          </h1>
          <p className="text-slate-600 text-sm font-medium">Ready-to-use prompts across every role. Pick one and make it yours.</p>
        </div>
        <div className="relative w-full md:w-[320px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500]/30 focus:border-[#ff5500] transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Pill Navigation */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar scroll-smooth">
        <button
          onClick={() => { setActiveCategory("All Templates"); setSearchQuery(""); }}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${activeCategory === "All Templates" && !searchQuery
              ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-md'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-xs'
            }`}
        >
          All Templates
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => { setActiveCategory(category); setSearchQuery(""); }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${activeCategory === category && !searchQuery
                ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-xs'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-12 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={searchQuery ? 'search' : activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-12"
          >
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((section, sectionIdx) => (
                <motion.div
                  key={section.category + sectionIdx}
                  initial="hidden"
                  animate="show"
                  variants={containerVariants}
                >
                  <div className="flex items-center gap-3 mb-6 ml-1 sm:ml-12">
                    <div className="p-2.5 bg-orange-50 text-[#ff5500] rounded-xl border border-orange-200">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-black text-[#0f172a] tracking-tight uppercase">{section.category}</h2>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <button className="hidden sm:flex items-center justify-center p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors shrink-0 group">
                      <ChevronLeft className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full flex-1">
                      {section.items.map((item, itemIdx) => (
                        <motion.div
                          key={itemIdx}
                          variants={itemVariants}
                          onClick={() => setSelectedTemplate(item)}
                          className="group/card flex flex-col h-full bg-white border border-slate-200 hover:border-[#ff5500]/50 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 cursor-pointer text-left relative overflow-hidden shadow-xs"
                        >
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff5500]/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

                          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                            <button
                              onClick={(e) => toggleLike(e, item.title)}
                              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-400 hover:text-red-500 transition-colors shadow-xs border border-slate-200"
                            >
                              <Heart className={`w-3.5 h-3.5 ${likedTemplates.includes(item.title) ? 'text-red-500 fill-red-500' : ''}`} />
                            </button>
                            <button
                              onClick={(e) => toggleSave(e, item.title)}
                              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-400 hover:text-blue-500 transition-colors shadow-xs border border-slate-200"
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${savedTemplates.includes(item.title) ? 'text-blue-500 fill-blue-500' : ''}`} />
                            </button>
                          </div>

                          <h3 className="font-bold text-[15px] leading-snug text-[#0f172a] mb-2 pr-8 group-hover/card:text-[#ff5500] transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 font-medium mb-4 leading-relaxed flex-grow">
                            {item.desc}
                          </p>
                          <div className="flex w-full items-center justify-between mt-auto pt-3 border-t border-slate-100">
                            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 opacity-80 group-hover/card:opacity-100 transition-opacity">
                              <User className="w-3.5 h-3.5 text-[#ff5500]" />
                              {item.author}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover/card:bg-[#ff5500] text-slate-500 group-hover/card:text-white flex items-center justify-center transition-colors shadow-xs">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <button className="hidden sm:flex items-center justify-center p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors shrink-0 group">
                      <ChevronRight className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-slate-200 rounded-2xl bg-white">
                <LayoutTemplate className="w-8 h-8 mb-4 text-[#ff5500]" />
                <p className="font-bold text-[#0f172a]">No templates found.</p>
                <p className="text-sm text-slate-500 mt-1">Try a different search term or category.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <PromptPreviewModal
        item={selectedTemplate}
        isOpen={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />
    </div>
  )
}
