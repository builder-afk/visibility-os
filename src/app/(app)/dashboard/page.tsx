import { Suspense } from "react"
import Link from "next/link"
import { Plus, Sparkles } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { getProjects } from "./actions"
import { ProjectList } from "./project-list"
import { SavedPrompts } from "./saved-prompts"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const projects = await getProjects()

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* ─── Page Title Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Project Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage your search bar queries, approval status, and project workflows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              className: "border-[#ff5500]/30 text-[#ff5500] hover:bg-[#ff5500]/10",
            })}
          >
            <Sparkles className="mr-2 h-4 w-4" /> New Query Search
          </Link>
          <Link
            href="/dashboard/new"
            className={buttonVariants({
              className: "bg-[#ff5500] hover:bg-[#e64d00] text-white",
            })}
          >
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Link>
        </div>
      </div>

      {/* ─── Projects List with Approval & Status Updates ─── */}
      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading projects...</div>}>
        <ProjectList initialProjects={projects} />
      </Suspense>

      {/* ─── Saved Prompts Section ─── */}
      <div className="mt-8 border-t border-border pt-8">
        <SavedPrompts />
      </div>
    </div>
  )
}
