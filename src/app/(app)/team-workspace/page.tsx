"use client"

import React, { useState } from 'react'
import {
  Users,
  History,
  MessageSquare,
  Share2,
  Play,
  Save,
  CheckCircle2,
  Clock,
  Plus,
  GitBranch,
  Wand2,
  Lock,
  Unlock,
  AlertCircle,
  Copy,
  Terminal,
  ChevronDown,
  Send,
  Check,
  Sparkles,
  RefreshCw,
  FileCode,
  ExternalLink,
  ShieldCheck,
  X,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'Owner' | 'Admin' | 'Editor' | 'Viewer'
  avatar: string
  color: string
  status: 'online' | 'offline' | 'idle'
  activity?: string
}

interface VersionEntry {
  id: string
  versionTag: string
  author: string
  authorAvatar: string
  time: string
  message: string
  content: string
  current: boolean
}

interface CommentReply {
  id: string
  author: string
  authorAvatar: string
  time: string
  text: string
}

interface CommentItem {
  id: string
  author: string
  authorAvatar: string
  time: string
  text: string
  resolved: boolean
  replies: CommentReply[]
}

interface WorkspacePrompt {
  id: string
  title: string
  category: string
  model: string
  prompt: string
  variables: string[]
  sampleOutput: string
}

const INITIAL_PROMPTS: WorkspacePrompt[] = [
  {
    id: 'p-1',
    title: 'Technical Writer Prompt',
    category: 'Engineering Documentation',
    model: 'GPT-4o (Turbo)',
    variables: ['TOPIC', 'AUDIENCE', 'OUTPUT_FORMAT'],
    prompt: `You are an expert technical writer and developer educator. 
Explain the concept of [TOPIC] to a [AUDIENCE].

Constraints:
- Use simple, everyday analogies that anyone can understand.
- Avoid overly dense, unexplained jargon.
- Provide a short, modern code example in JavaScript/TypeScript.
- Output strictly in valid [OUTPUT_FORMAT] with keys: 'title', 'explanation', 'analogy', 'code_snippet', 'takeaways'.`,
    sampleOutput: JSON.stringify(
      {
        title: "Understanding the Event Loop in JavaScript",
        explanation:
          "The event loop is JavaScript's secret engine that handles asynchronous operations single-handedly without blocking the browser thread.",
        analogy:
          "Think of JavaScript like a busy restaurant with one head chef (the main call stack). When an order needs 20 minutes in the oven (an async API call), the chef puts a timer on it and continues cooking other meals. Once the timer dings, the kitchen helper delivers it right to the table.",
        code_snippet:
          "console.log('1: Start');\nsetTimeout(() => console.log('2: In the oven (Async)'), 0);\nconsole.log('3: End');\n// Output: 1, 3, 2",
        takeaways: [
          "Single-threaded execution",
          "Non-blocking I/O using microtasks and macrotasks",
          "Never freeze the user interface",
        ],
      },
      null,
      2
    ),
  },
  {
    id: 'p-2',
    title: 'Customer Triage Classifier',
    category: 'Support Automation',
    model: 'Claude 3.5 Sonnet',
    variables: ['CUSTOMER_MESSAGE', 'SLA_TIER'],
    prompt: `You are an AI Support Triage Agent for an enterprise SaaS.
Analyze the following customer inquiry:
"""
[CUSTOMER_MESSAGE]
"""

SLA Tier: [SLA_TIER]

Classify:
1. Priority: [P0_CRITICAL | P1_HIGH | P2_MEDIUM | P3_LOW]
2. Category: [Billing | Authentication | Infrastructure | Feature_Request]
3. Recommended Action & Pre-composed Response.`,
    sampleOutput: JSON.stringify(
      {
        priority: "P1_HIGH",
        category: "Authentication",
        sentiment: "Frustrated / Urgent",
        confidence_score: 0.96,
        recommended_action: "Escalate to Identity On-Call team and issue temporary JWT refresh",
        suggested_reply:
          "Hello! We understand you are unable to authenticate into your production workspace. Our security team is actively reviewing your tenant session.",
      },
      null,
      2
    ),
  },
  {
    id: 'p-3',
    title: 'SQL Query Optimizer & Explainer',
    category: 'Database Performance',
    model: 'Gemini 1.5 Pro',
    variables: ['QUERY', 'DATABASE_ENGINE'],
    prompt: `Analyze the provided SQL query for performance bottlenecks on [DATABASE_ENGINE].
Input Query:
"""
[QUERY]
"""

Return:
1. Complexity analysis
2. Missing index suggestions
3. Rewritten, optimized query using CTEs and proper partition filters.`,
    sampleOutput: JSON.stringify(
      {
        engine: "PostgreSQL 16",
        issues_identified: [
          "Full table scan on 'orders' due to unindexed timestamp filter",
          "N+1 redundant correlated subquery in SELECT clause",
        ],
        estimated_speedup: "14x faster",
        recommended_index: "CREATE INDEX CONCURRENTLY idx_orders_created_at ON orders(created_at, customer_id);",
      },
      null,
      2
    ),
  },
]

const INITIAL_MEMBERS: TeamMember[] = [
  { id: 'm-1', name: 'Kunal Verma', email: 'kunal@miracle.dev', role: 'Owner', avatar: 'KV', color: 'bg-orange-500', status: 'online', activity: 'Editing Technical Writer Prompt' },
  { id: 'm-2', name: 'Alice Chen', email: 'alice.chen@enterprise.io', role: 'Editor', avatar: 'AC', color: 'bg-indigo-600', status: 'online', activity: 'Viewing Test Output' },
  { id: 'm-3', name: 'Bob Smith', email: 'bob.smith@cloudops.org', role: 'Viewer', avatar: 'BS', color: 'bg-emerald-600', status: 'idle', activity: 'Idle (12m ago)' },
  { id: 'm-4', name: 'Sarah Lin', email: 'sarah.l@fintech.co', role: 'Admin', avatar: 'SL', color: 'bg-rose-500', status: 'offline', activity: 'Offline' },
]

export default function TeamWorkspacePage() {
  // Active Prompt and State
  const [prompts, setPrompts] = useState<WorkspacePrompt[]>(INITIAL_PROMPTS)
  const [selectedPromptId, setSelectedPromptId] = useState<string>('p-1')
  const activePrompt = prompts.find((p) => p.id === selectedPromptId) || prompts[0]

  const [promptText, setPromptText] = useState(activePrompt.prompt)
  const [activeTab, setActiveTab] = useState<'versions' | 'comments'>('versions')
  const [isLocked, setIsLocked] = useState(false)
  const [selectedModel, setSelectedModel] = useState(activePrompt.model)
  
  // Test Runner State
  const [isTesting, setIsTesting] = useState(false)
  const [testOutput, setTestOutput] = useState<string | null>(activePrompt.sampleOutput)
  const [testTopic, setTestTopic] = useState('Event Loop in JavaScript')
  const [testLatency, setTestLatency] = useState<number | null>(312)
  const [testTokens, setTestTokens] = useState<number | null>(418)

  // Team & Modals
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false)
  const [isApiModalOpen, setIsApiModalOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Editor' | 'Viewer'>('Editor')
  const [commitMessage, setCommitMessage] = useState('')

  // Version Control History
  const [versionHistory, setVersionHistory] = useState<VersionEntry[]>([
    {
      id: 'v-3',
      versionTag: 'v1.4.2',
      author: 'Alice Chen',
      authorAvatar: 'AC',
      time: '12 mins ago',
      message: 'Refined output format constraints for strict JSON compliance',
      content: activePrompt.prompt,
      current: true,
    },
    {
      id: 'v-2',
      versionTag: 'v1.4.1',
      author: 'Kunal Verma',
      authorAvatar: 'KV',
      time: '2 hours ago',
      message: 'Added beginner-friendly everyday analogy instruction',
      content: activePrompt.prompt.replace("- Output strictly in valid [OUTPUT_FORMAT]", "- Output as formatted text"),
      current: false,
    },
    {
      id: 'v-1',
      versionTag: 'v1.4.0',
      author: 'Kunal Verma',
      authorAvatar: 'KV',
      time: 'Yesterday',
      message: 'Initial technical writer prompt scaffolding',
      content: "You are a technical writer. Explain technical concepts clearly with code.",
      current: false,
    },
  ])

  // Comments Thread
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c-1',
      author: 'Bob Smith',
      authorAvatar: 'BS',
      time: '25 mins ago',
      text: 'Should we add a hard word-count constraint (e.g. max 400 words) so downstream apps render faster?',
      resolved: false,
      replies: [
        {
          id: 'r-1',
          author: 'Alice Chen',
          authorAvatar: 'AC',
          time: '18 mins ago',
          text: 'Good point! I tested with 350 words and the responses were crisp. Let me test it.',
        },
      ],
    },
    {
      id: 'c-2',
      author: 'Sarah Lin',
      authorAvatar: 'SL',
      time: '1 hour ago',
      text: 'Verified that the model no longer hallucinates internal credentials. Security audit passed.',
      resolved: true,
      replies: [],
    },
  ])

  const [newCommentText, setNewCommentText] = useState('')
  const [replyTextMap, setReplyTextMap] = useState<{ [key: string]: string }>({})

  // Handle Switching Prompt
  const handleSelectPrompt = (id: string) => {
    const target = prompts.find((p) => p.id === id)
    if (!target) return
    setSelectedPromptId(id)
    setPromptText(target.prompt)
    setSelectedModel(target.model)
    setTestOutput(target.sampleOutput)
    toast.info(`Switched to "${target.title}"`)
  }

  // Handle Test Execution
  const handleRunTest = async () => {
    setIsTesting(true)
    setTestOutput(null)

    // Simulate realistic AI generation with latency
    const start = performance.now()
    await new Promise((res) => setTimeout(res, 900))
    const elapsed = Math.round(performance.now() - start + 250)

    let generatedOutput = ''
    if (selectedPromptId === 'p-1') {
      generatedOutput = JSON.stringify(
        {
          title: `Demystifying ${testTopic}`,
          explanation: `${testTopic} allows asynchronous tasks to complete efficiently without locking the runtime.`,
          analogy: `Imagine an automated barista at your favorite coffee shop that queues coffee bean grinding while milk steam froths independently.`,
          code_snippet: `// Modern TypeScript Demo for ${testTopic}\nconst executeTask = async () => {\n  console.log("Triggered async job for: ${testTopic}");\n  const res = await Promise.resolve({ status: "success" });\n  return res;\n};`,
          takeaways: [
            "Non-blocking architecture",
            "Predictable thread safety",
            "Optimal performance in distributed systems",
          ],
        },
        null,
        2
      )
    } else {
      generatedOutput = activePrompt.sampleOutput
    }

    setTestOutput(generatedOutput)
    setTestLatency(elapsed)
    setTestTokens(Math.floor(Math.random() * 80) + 380)
    setIsTesting(false)
    toast.success('Prompt execution completed successfully!')
  }

  // Handle Save / Commit Version
  const handleSaveVersion = () => {
    if (!commitMessage.trim()) {
      toast.error('Please enter a commit message describing this version')
      return
    }

    const nextMinor = versionHistory.length + 1
    const newVersionTag = `v1.4.${nextMinor}`

    const newEntry: VersionEntry = {
      id: `v-${Date.now()}`,
      versionTag: newVersionTag,
      author: 'Kunal Verma',
      authorAvatar: 'KV',
      time: 'Just now',
      message: commitMessage.trim(),
      content: promptText,
      current: true,
    }

    setVersionHistory([
      newEntry,
      ...versionHistory.map((v) => ({ ...v, current: false })),
    ])

    setIsCommitModalOpen(false)
    setCommitMessage('')
    toast.success(`Saved new version ${newVersionTag} to workspace history!`)
  }

  // Restore Version
  const handleRestoreVersion = (version: VersionEntry) => {
    setPromptText(version.content)
    setVersionHistory(
      versionHistory.map((v) => ({
        ...v,
        current: v.id === version.id,
      }))
    )
    toast.success(`Prompt successfully restored to ${version.versionTag}!`)
  }

  // Add Comment
  const handleAddComment = () => {
    if (!newCommentText.trim()) return

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: 'Kunal Verma',
      authorAvatar: 'KV',
      time: 'Just now',
      text: newCommentText.trim(),
      resolved: false,
      replies: [],
    }

    setComments([newComment, ...comments])
    setNewCommentText('')
    toast.success('Comment posted to team thread')
  }

  // Add Reply
  const handleAddReply = (commentId: string) => {
    const text = replyTextMap[commentId]?.trim()
    if (!text) return

    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [
              ...c.replies,
              {
                id: `r-${Date.now()}`,
                author: 'Kunal Verma',
                authorAvatar: 'KV',
                time: 'Just now',
                text,
              },
            ],
          }
        }
        return c
      })
    )

    setReplyTextMap({ ...replyTextMap, [commentId]: '' })
  }

  // Toggle Comment Resolve
  const handleToggleResolve = (commentId: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          const updated = !c.resolved
          toast.info(updated ? 'Comment marked as resolved' : 'Comment reopened')
          return { ...c, resolved: updated }
        }
        return c
      })
    )
  }

  // Invite Member
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail || !inviteEmail.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      avatar: inviteEmail.slice(0, 2).toUpperCase(),
      color: 'bg-orange-500',
      status: 'idle',
      activity: 'Invited recently',
    }

    setMembers([...members, newMember])
    setInviteEmail('')
    setIsShareModalOpen(false)
    toast.success(`Invitation sent to ${inviteEmail} as ${inviteRole}!`)
  }

  return (
    <div className="flex-1 space-y-6 max-w-7xl mx-auto flex flex-col pb-12 selection:bg-orange-500/20">
      {/* ══════════════════════════════════════════════════════════════════════
          1. HEADER BAR: Workspace & Asset Context + Real-time Collaboration
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Active Asset Title */}
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {activePrompt.title}
            </h1>

            {/* Live Sync Indicator */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync
            </div>

            {/* Lock Mode Indicator */}
            {isLocked ? (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                <Lock className="w-3 h-3 text-amber-600" />
                Locked (Protected)
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium">
                <Unlock className="w-3 h-3 text-slate-500" />
                Collaborative Edit
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Workspace:</span>
            <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
              Content Engineering Alpha
            </span>
            <span className="text-slate-300">•</span>
            <span>Category:</span>
            <span className="font-medium text-slate-700">{activePrompt.category}</span>
            <span className="text-slate-300">•</span>
            <span>Last synced:</span>
            <span className="text-slate-600 font-medium">Just now</span>
          </div>
        </div>

        {/* Header Right Actions & Presence */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active Members Pile */}
          <div className="flex items-center -space-x-2 mr-1">
            {members.map((member) => (
              <div
                key={member.id}
                className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white relative shadow-xs cursor-pointer hover:z-20 hover:scale-110 transition-transform ${member.color}`}
                title={`${member.name} (${member.role}) — ${member.status}`}
              >
                {member.avatar}
                {member.status === 'online' && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                )}
              </div>
            ))}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold transition-colors cursor-pointer"
              title="Invite teammate"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* API / Integration Export */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsApiModalOpen(true)}
            className="h-9 rounded-xl border-slate-200 text-slate-700 hover:text-slate-900 gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>API & SDK</span>
          </Button>

          {/* Share Modal Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
            className="h-9 rounded-xl border-slate-200 text-slate-700 hover:text-slate-900 gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </Button>

          {/* Primary Test Action */}
          <Button
            size="sm"
            onClick={handleRunTest}
            disabled={isTesting}
            className="h-9 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#e64d00] hover:to-[#ff5500] text-white shadow-md shadow-orange-500/20 font-semibold gap-1.5 transition-all cursor-pointer"
          >
            {isTesting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isTesting ? 'Running...' : 'Run & Test'}</span>
          </Button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. WORKSPACE ASSET SELECTOR BAR
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1">
          Prompts:
        </span>
        {prompts.map((p) => {
          const isSelected = p.id === selectedPromptId
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPrompt(p.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {p.title}
            </button>
          )
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          3. MAIN WORKSPACE GRID: Editor + Test Preview (2 cols) & Sidebar (1 col)
         ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ── LEFT & CENTER: Collaborative Editor & Test Engine ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card: Collaborative Prompt Editor */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
            {/* Editor Toolbar */}
            <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-slate-200/80 bg-slate-50/80 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Wand2 className="w-3.5 h-3.5 text-[#ff5500]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Prompt Blueprint
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  ({promptText.length} chars)
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Lock/Unlock Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLocked(!isLocked)}
                  className={`h-7 px-2.5 text-xs rounded-lg transition-colors ${
                    isLocked
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isLocked ? (
                    <>
                      <Unlock className="w-3 h-3 mr-1" />
                      Unlock
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 mr-1" />
                      Lock
                    </>
                  )}
                </Button>

                {/* Copy Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(promptText)
                    toast.success('Prompt copied to clipboard')
                  }}
                  className="h-7 px-2 text-xs rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>

                {/* Save Version Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCommitModalOpen(true)}
                  className="h-7 px-2.5 text-xs rounded-lg border-slate-300 font-medium text-slate-800 hover:bg-slate-100 gap-1"
                >
                  <Save className="w-3 h-3 text-[#ff5500]" />
                  <span>Commit Version</span>
                </Button>
              </div>
            </div>

            {/* Variable Pills Extraction Bar */}
            <div className="px-4 py-2 bg-slate-50/40 border-b border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Variables:
              </span>
              {activePrompt.variables.map((variable) => (
                <span
                  key={variable}
                  className="px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200/80 text-[11px] font-mono font-medium text-orange-700"
                >
                  [{variable}]
                </span>
              ))}
              <span className="text-[11px] text-slate-400 italic ml-auto hidden sm:inline">
                Values will be dynamically injected during testing
              </span>
            </div>

            {/* Textarea Editor */}
            <div className="relative p-4 group min-h-[260px]">
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                disabled={isLocked}
                className="w-full h-64 resize-y outline-none bg-transparent font-mono text-sm leading-relaxed text-slate-800 disabled:opacity-60 placeholder:text-slate-400 focus:ring-0 border-0"
                placeholder="Compose your structured prompt here..."
              />

              {/* Collaborative Cursor Indicator */}
              <div className="absolute top-16 right-8 flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-medium shadow-xs pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                Alice Chen is active on this line
              </div>
            </div>
          </div>

          {/* Card: Live Inference Engine / Test Output Preview */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
            {/* Header / Test Config */}
            <div className="px-4 py-3 border-b border-slate-200/80 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Execution Output
                </span>
                {testLatency && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-medium text-emerald-700">
                    {testLatency}ms latency
                  </span>
                )}
                {testTokens && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-medium text-slate-600">
                    {testTokens} tokens
                  </span>
                )}
              </div>

              {/* Model & Variable Input Controls */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:border-slate-300"
                >
                  <option value="GPT-4o (Turbo)">GPT-4o (Turbo)</option>
                  <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                  <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                  <option value="Llama 3.3 70B">Llama 3.3 70B</option>
                </select>

                <Button
                  size="sm"
                  onClick={handleRunTest}
                  disabled={isTesting}
                  className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold gap-1.5 cursor-pointer"
                >
                  {isTesting ? (
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  ) : (
                    <Play className="w-3 h-3 fill-current" />
                  )}
                  <span>Re-test</span>
                </Button>
              </div>
            </div>

            {/* Test Input Parameters Bar */}
            <div className="px-4 py-2.5 bg-slate-50/40 border-b border-slate-100 flex items-center gap-3">
              <label className="text-[11px] font-semibold text-slate-500 shrink-0">
                [TOPIC] Test Value:
              </label>
              <input
                type="text"
                value={testTopic}
                onChange={(e) => setTestTopic(e.target.value)}
                className="flex-1 h-7 px-2.5 rounded-md border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="e.g. Event Loop in Node.js, WebSockets, Docker Containers"
              />
            </div>

            {/* Output Display Area */}
            <div className="p-4 min-h-[220px] bg-[#0c1017] text-slate-200 rounded-b-2xl font-mono text-xs overflow-x-auto">
              {isTesting ? (
                <div className="h-44 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin text-orange-400" />
                  <p className="text-xs">
                    Calling {selectedModel} inference endpoint...
                  </p>
                </div>
              ) : testOutput ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Validated Response
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(testOutput)
                        toast.success('Response copied to clipboard')
                      }}
                      className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      Copy JSON
                    </button>
                  </div>
                  <pre className="text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                    {testOutput}
                  </pre>
                </div>
              ) : (
                <div className="h-44 flex flex-col items-center justify-center text-slate-500 gap-1.5">
                  <Play className="w-6 h-6 opacity-40" />
                  <p>Click &ldquo;Run & Test&rdquo; above to execute this prompt live.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Version Control & Live Collaborative Discussion ── */}
        <div className="flex flex-col bg-white border border-slate-200/90 shadow-xs rounded-2xl overflow-hidden sticky top-6">
          {/* Tabs Switcher */}
          <div className="flex border-b border-slate-200/80 bg-slate-50/50">
            <button
              onClick={() => setActiveTab('versions')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'versions'
                  ? 'border-b-2 border-[#ff5500] text-[#ff5500] bg-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Versions</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] text-slate-600 font-semibold">
                {versionHistory.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('comments')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'comments'
                  ? 'border-b-2 border-[#ff5500] text-[#ff5500] bg-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discussion</span>
              <span className="px-1.5 py-0.2 rounded-full bg-orange-100 text-[10px] text-orange-700 font-semibold">
                {comments.filter((c) => !c.resolved).length}
              </span>
            </button>
          </div>

          {/* Tab Content Container */}
          <div className="p-4 max-h-[620px] overflow-y-auto space-y-4">
            {/* ═══ TAB 1: Version Control Timeline ═══ */}
            {activeTab === 'versions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Release History
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCommitModalOpen(true)}
                    className="h-6 text-[10px] font-semibold px-2 rounded-md border-slate-200"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    New Tag
                  </Button>
                </div>

                <div className="relative pl-3 border-l-2 border-slate-200 space-y-5">
                  {versionHistory.map((version) => (
                    <div key={version.id} className="relative group/ver">
                      {/* Timeline dot */}
                      <span
                        className={`absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          version.current
                            ? 'bg-[#ff5500] ring-2 ring-orange-500/20'
                            : 'bg-slate-300'
                        }`}
                      />

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold font-mono ${
                              version.current ? 'text-[#ff5500]' : 'text-slate-800'
                            }`}
                          >
                            {version.versionTag}
                            {version.current && (
                              <span className="ml-1.5 text-[9px] font-sans bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-md">
                                Current
                              </span>
                            )}
                          </span>

                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {version.time}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-snug">
                          {version.message}
                        </p>

                        <div className="flex items-center gap-1.5 mt-1 pt-1 border-t border-slate-100">
                          <span className="w-4 h-4 rounded-full bg-slate-800 text-[8px] font-bold text-white flex items-center justify-center">
                            {version.authorAvatar}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {version.author}
                          </span>

                          {!version.current && (
                            <button
                              onClick={() => handleRestoreVersion(version)}
                              className="ml-auto text-[11px] font-semibold text-[#ff5500] hover:text-[#e64d00] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-2.5 h-2.5" />
                              Restore
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ TAB 2: Live Team Discussion & Review ═══ */}
            {activeTab === 'comments' && (
              <div className="space-y-4">
                {/* New Comment Input Box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2">
                  <textarea
                    rows={2}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Leave a note or feedback for the team..."
                    className="w-full text-xs bg-white rounded-lg border border-slate-200 p-2 text-slate-800 outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400">
                      Markdown supported
                    </span>
                    <Button
                      size="sm"
                      onClick={handleAddComment}
                      className="h-7 text-xs px-2.5 rounded-lg bg-[#ff5500] hover:bg-[#e64d00] text-white font-medium"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Post
                    </Button>
                  </div>
                </div>

                {/* Comment Cards */}
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-3 rounded-xl border transition-all ${
                        comment.resolved
                          ? 'bg-slate-50/60 border-slate-200/60 opacity-70'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-[9px] flex items-center justify-center">
                            {comment.authorAvatar}
                          </span>
                          <span className="text-xs font-semibold text-slate-800">
                            {comment.author}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {comment.time}
                          </span>
                        </div>

                        <button
                          onClick={() => handleToggleResolve(comment.id)}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                            comment.resolved
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {comment.resolved ? '✓ Resolved' : 'Resolve'}
                        </button>
                      </div>

                      <p
                        className={`text-xs leading-relaxed ${
                          comment.resolved
                            ? 'text-slate-400 line-through'
                            : 'text-slate-700'
                        }`}
                      >
                        {comment.text}
                      </p>

                      {/* Thread Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5 pl-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="text-xs space-y-0.5">
                              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                                <span>{reply.author}</span>
                                <span className="text-[9px] text-slate-400 font-normal">
                                  {reply.time}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600">
                                {reply.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quick Reply Box */}
                      {!comment.resolved && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyTextMap[comment.id] || ''}
                            onChange={(e) =>
                              setReplyTextMap({
                                ...replyTextMap,
                                [comment.id]: e.target.value,
                              })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleAddReply(comment.id)
                            }}
                            className="flex-1 text-[11px] bg-slate-50 rounded-md border border-slate-200 px-2 py-1 outline-none text-slate-800"
                          />
                          <button
                            onClick={() => handleAddReply(comment.id)}
                            className="text-xs font-semibold text-[#ff5500] hover:text-[#e64d00] px-1 cursor-pointer"
                          >
                            Reply
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          4. MODAL: Share & Invite Team Members
         ══════════════════════════════════════════════════════════════════════ */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Invite to Workspace
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Collaborate in real time with teammates on this prompt asset.
                </p>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invite Email Form */}
            <form onSubmit={handleInvite} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#ff5500]"
              />
              <select
                value={inviteRole}
                onChange={(e) =>
                  setInviteRole(e.target.value as 'Admin' | 'Editor' | 'Viewer')
                }
                className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
                <option value="Viewer">Viewer</option>
              </select>
              <Button
                type="submit"
                className="h-10 rounded-xl bg-[#ff5500] hover:bg-[#e64d00] text-white font-semibold text-xs"
              >
                Invite
              </Button>
            </form>

            {/* Existing Members List */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Workspace Members ({members.length})
              </span>
              <div className="max-h-48 overflow-y-auto space-y-2 divide-y divide-slate-100">
                {members.map((m) => (
                  <div key={m.id} className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-full text-white font-bold text-[10px] flex items-center justify-center ${m.color}`}>
                        {m.avatar}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">{m.name}</p>
                        <p className="text-[11px] text-slate-400">{m.email}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600">
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Link Footnote */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Anyone with link can request access
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success('Workspace link copied to clipboard!')
                }}
                className="h-8 rounded-lg text-xs gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          5. MODAL: Commit New Version
         ══════════════════════════════════════════════════════════════════════ */}
      {isCommitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#ff5500]" />
                <h3 className="text-base font-bold text-slate-900">
                  Commit Workspace Version
                </h3>
              </div>
              <button
                onClick={() => setIsCommitModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Tag a snapshot of this prompt so teammates can track changes or roll back at any time.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">
                Commit Message
              </label>
              <textarea
                rows={3}
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="e.g. Added strict JSON schema validation and analogies"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#ff5500]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCommitModalOpen(false)}
                className="h-9 rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveVersion}
                className="h-9 rounded-xl bg-[#ff5500] hover:bg-[#e64d00] text-white font-semibold text-xs gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Save & Tag
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          6. MODAL: API & SDK Integration Code
         ══════════════════════════════════════════════════════════════════════ */}
      {isApiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#ff5500]" />
                <h3 className="text-base font-bold text-slate-900">
                  Deploy Prompt to Production
                </h3>
              </div>
              <button
                onClick={() => setIsApiModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Call this version-controlled prompt directly from your Next.js, Node, or Python backend via the Miracle AI Gateway.
            </p>

            <div className="bg-[#0b0f19] rounded-xl p-4 font-mono text-xs text-slate-200 space-y-2 overflow-x-auto">
              <div className="flex justify-between items-center text-slate-400 text-[11px] pb-1 border-b border-slate-800">
                <span>TypeScript / cURL snippet</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`curl -X POST https://api.miracle.dev/v1/prompts/${activePrompt.id}/run \\
  -H "Authorization: Bearer $MIRACLE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"variables": {"TOPIC": "Event Loop", "AUDIENCE": "Beginner"}}'`)
                    toast.success('cURL code copied to clipboard!')
                  }}
                  className="hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <pre className="text-orange-300 whitespace-pre">
{`curl -X POST https://api.miracle.dev/v1/prompts/${activePrompt.id}/run \\
  -H "Authorization: Bearer $MIRACLE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "version": "latest",
    "variables": {
      "TOPIC": "Microservices vs Monolith",
      "AUDIENCE": "Staff Engineer"
    }
  }'`}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setIsApiModalOpen(false)}
                className="h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
