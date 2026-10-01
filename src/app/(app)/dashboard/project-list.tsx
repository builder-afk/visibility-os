"use client"

import React, { useState, useTransition } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  ChevronDown,
  Check,
  Folder,
  RefreshCw,
  Cpu,
  Calendar,
  AlertCircle,
  FileCode2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Project } from "@/types"
import { updateProjectStatusAction, deleteProjectAction } from "@/app/actions/project"
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function formatProjectDate(dateInput: string | Date | undefined): string {
  if (!dateInput) return "Recently"
  try {
    const d = new Date(dateInput)
    if (isNaN(d.getTime())) return "Recently"
    return `${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCDate()}`
  } catch {
    return "Recently"
  }
}

interface ProjectListProps {
  initialProjects: Project[]
}

export function ProjectList({ initialProjects }: ProjectListProps) {
  const searchParams = useSearchParams()
  const createdId = searchParams.get("created")

  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected" | "in_progress" | "completed">("all")
  const [isPending, startTransition] = useTransition()

  // Calculate counts for metrics
  const totalCount = projects.length
  const approvedCount = projects.filter((p) => p.approval_status === "approved").length
  const rejectedCount = projects.filter((p) => p.approval_status === "rejected").length
  const pendingApprovalCount = projects.filter((p) => !p.approval_status || p.approval_status === "pending").length
  const completedCount = projects.filter((p) => p.status === "completed").length
  const inProgressCount = projects.filter((p) => p.status === "in_progress").length

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    // Search query match
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      project.name.toLowerCase().includes(query) ||
      project.idea.toLowerCase().includes(query) ||
      (project.stack && project.stack.toLowerCase().includes(query))

    if (!matchesSearch) return false

    // Tab filter
    if (activeTab === "all") return true
    if (activeTab === "pending") return !project.approval_status || project.approval_status === "pending"
    if (activeTab === "approved") return project.approval_status === "approved"
    if (activeTab === "rejected") return project.approval_status === "rejected"
    if (activeTab === "in_progress") return project.status === "in_progress"
    if (activeTab === "completed") return project.status === "completed"

    return true
  })

  // Handle updating approval status
  const handleUpdateApproval = (projectId: string, newApproval: "pending" | "approved" | "rejected") => {
    // Optimistic update
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, approval_status: newApproval } : p))
    )

    startTransition(async () => {
      const res = await updateProjectStatusAction(projectId, { approval_status: newApproval })
      if (res.success) {
        toast.success(`Approval status updated to ${newApproval.toUpperCase()}`, {
          description: `Project is now marked as ${newApproval}.`,
        })
      } else {
        toast.error("Failed to update approval status", { description: res.error })
        // Revert
        setProjects(initialProjects)
      }
    })
  }

  // Handle updating project progress status
  const handleUpdateStatus = (projectId: string, newStatus: "pending" | "in_progress" | "completed") => {
    // Optimistic update
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: newStatus } : p))
    )

    startTransition(async () => {
      const res = await updateProjectStatusAction(projectId, { status: newStatus })
      if (res.success) {
        const readable =
          newStatus === "in_progress" ? "In Progress" : newStatus === "completed" ? "Completed" : "Pending"
        toast.success(`Project status updated to ${readable}`, {
          description: `Project workflow is now ${readable.toLowerCase()}.`,
        })
      } else {
        toast.error("Failed to update project status", { description: res.error })
        // Revert
        setProjects(initialProjects)
      }
    })
  }

  // Handle project deletion
  const handleDelete = (projectId: string) => {
    const toDelete = projects.find((p) => p.id === projectId)
    if (!confirm(`Are you sure you want to delete "${toDelete?.name}"?`)) return

    setProjects((prev) => prev.filter((p) => p.id !== projectId))

    startTransition(async () => {
      const res = await deleteProjectAction(projectId)
      if (res.success) {
        toast.success("Project removed from your account")
      } else {
        toast.error("Failed to delete project")
        setProjects(initialProjects)
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* ─── Top Metrics Bar ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Projects</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black">{totalCount}</span>
            <span className="text-xs text-muted-foreground">in account</span>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{approvedCount}</span>
            <span className="text-xs text-emerald-600/80">ready to build</span>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Pending Review
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-amber-600 dark:text-amber-400">{pendingApprovalCount}</span>
            <span className="text-xs text-amber-600/80">awaiting decision</span>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Completed
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{completedCount}</span>
            <span className="text-xs text-blue-600/80">{inProgressCount} in progress</span>
          </div>
        </div>
      </div>

      {/* ─── Search & Tab Filters ─── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "all"
                ? "bg-[#ff5500] text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "pending"
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Pending ({pendingApprovalCount})
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "approved"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Approved ({approvedCount})
          </button>
          <button
            onClick={() => setActiveTab("in_progress")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "in_progress"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "completed"
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "rejected"
                ? "bg-rose-600 text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            Rejected ({rejectedCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search queries & projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/40 border border-border rounded-xl pl-9 pr-4 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#ff5500]/50"
          />
        </div>
      </div>

      {/* ─── Projects Grid ─── */}
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-2xl bg-card/50 text-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Folder className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold mb-2">No projects found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            {searchQuery
              ? `No projects matching "${searchQuery}". Try a different search term.`
              : activeTab !== "all"
              ? `No projects currently in the "${activeTab}" state.`
              : "Describe an idea in the home page search bar to have it automatically saved and tracked here."}
          </p>
          <Link href="/" className={buttonVariants({ className: "bg-[#ff5500] hover:bg-[#e64d00] text-white" })}>
            <Sparkles className="mr-2 h-4 w-4" /> Go to Prompt Search Bar
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const isNewlyCreated = createdId === project.id
              const approval = project.approval_status || "pending"
              const status = project.status || "pending"

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`flex flex-col h-full rounded-2xl transition-all duration-200 hover:shadow-lg ${
                      isNewlyCreated
                        ? "border-2 border-[#ff5500] shadow-orange-500/10 shadow-lg ring-4 ring-[#ff5500]/10"
                        : "border-border hover:border-slate-400/50"
                    }`}
                  >
                    {isNewlyCreated && (
                      <div className="bg-[#ff5500] text-white text-[11px] font-bold py-1 px-3 text-center rounded-t-xl flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Just Saved from Search Bar Query
                      </div>
                    )}

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base font-bold line-clamp-1 text-foreground" title={project.name}>
                          {project.name}
                        </CardTitle>

                        {/* Top Stack Tag */}
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground whitespace-nowrap">
                          {project.stack || "Architecture"}
                        </span>
                      </div>

                      {/* Created date & Model info */}
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                        <span className="flex items-center gap-1" suppressHydrationWarning>
                          <Calendar className="w-3 h-3" />
                          {formatProjectDate(project.created_at)}
                        </span>
                        {project.model && (
                          <span className="flex items-center gap-1 text-slate-500 font-medium">
                            <Cpu className="w-3 h-3 text-amber-500" />
                            {project.model}
                          </span>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4 pb-4">
                      {/* Query / Idea text box */}
                      <div className="p-3 rounded-xl bg-secondary/30 border border-border/60 text-xs text-foreground/90 font-medium line-clamp-3 leading-relaxed relative">
                        <span className="text-muted-foreground font-semibold block text-[10px] uppercase tracking-wider mb-1">
                          Prompt Query:
                        </span>
                        &quot;{project.idea}&quot;
                      </div>

                      {/* ─── Status Controls Section ─── */}
                      <div className="space-y-2.5 pt-1">
                        {/* 1. Approval Status Row */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-muted-foreground">Approval:</span>

                          <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer transition-all hover:opacity-90 border ${
                                  approval === "approved"
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                    : approval === "rejected"
                                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                                }`}
                              >
                                {approval === "approved" ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                    Approved
                                  </>
                                ) : approval === "rejected" ? (
                                  <>
                                    <XCircle className="w-3.5 h-3.5 text-rose-500" />
                                    Rejected
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                                    Pending Review
                                  </>
                                )}
                                <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                              </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 p-1">
                              <DropdownMenuLabel className="text-xs">Update Approval Status</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleUpdateApproval(project.id, "approved")}
                                className="cursor-pointer text-xs font-medium text-emerald-600"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> Mark as Approved
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateApproval(project.id, "rejected")}
                                className="cursor-pointer text-xs font-medium text-rose-600"
                              >
                                <XCircle className="w-3.5 h-3.5 mr-2" /> Mark as Rejected
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateApproval(project.id, "pending")}
                                className="cursor-pointer text-xs font-medium text-amber-600"
                              >
                                <Clock className="w-3.5 h-3.5 mr-2" /> Set as Pending Review
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* 2. Project Progress Status Row */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-muted-foreground">Status:</span>

                          <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer transition-all hover:opacity-90 border ${
                                  status === "completed"
                                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                                    : status === "in_progress"
                                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                                    : "bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-400/30"
                                }`}
                              >
                                {status === "completed" ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    Completed
                                  </>
                                ) : status === "in_progress" ? (
                                  <>
                                    <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin-slow" />
                                    In Progress
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                                    Pending
                                  </>
                                )}
                                <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
                              </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 p-1">
                              <DropdownMenuLabel className="text-xs">Update Project Status</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(project.id, "pending")}
                                className="cursor-pointer text-xs font-medium"
                              >
                                <Clock className="w-3.5 h-3.5 mr-2 text-slate-500" /> Set as Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(project.id, "in_progress")}
                                className="cursor-pointer text-xs font-medium text-blue-600"
                              >
                                <RefreshCw className="w-3.5 h-3.5 mr-2" /> Mark as In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(project.id, "completed")}
                                className="cursor-pointer text-xs font-medium text-emerald-600"
                              >
                                <Check className="w-3.5 h-3.5 mr-2" /> Mark as Completed
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>

                    {/* ─── Card Actions Footer ─── */}
                    <CardFooter className="border-t border-border/70 p-3 bg-muted/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* View Architecture Plan */}
                        <Link
                          href={`/architecture-plan?idea=${encodeURIComponent(project.idea)}&id=${project.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title="Generate or view architecture plan"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Plan</span>
                        </Link>

                        {/* Open Workspace Builder */}
                        <Link
                          href={`/project/${project.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                          title="Open Prompt Builder Workspace"
                        >
                          <FileCode2 className="w-3.5 h-3.5" />
                          <span>Builder</span>
                        </Link>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
