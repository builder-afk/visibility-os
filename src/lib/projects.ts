import { auth } from '@/auth'
import { getAuthUser } from '@/lib/auth/guard'
import { db } from '@/db'
import { projects } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { Project } from '@/types'
import fs from 'fs'
import path from 'path'

const LOCAL_STORE_PATH = path.join(process.cwd(), 'data', 'projects.json')

// Helper to ensure local store exists
function ensureLocalStore(): Project[] {
  try {
    const dir = path.dirname(LOCAL_STORE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    if (!fs.existsSync(LOCAL_STORE_PATH)) {
      fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify([], null, 2), 'utf-8')
      return []
    }
    const content = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8')
    return JSON.parse(content) as Project[]
  } catch (err) {
    console.error('Error reading local projects file:', err)
    return []
  }
}

function saveLocalStore(items: Project[]) {
  try {
    const dir = path.dirname(LOCAL_STORE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(items, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing local projects file:', err)
  }
}

// Generate a clean title from the query
export function generateProjectName(idea: string, promptType?: string): string {
  const clean = idea.trim().replace(/^['"]|['"]$/g, '')
  if (!clean) return promptType || 'New Project'

  // If short, title case it
  const words = clean.split(/\s+/).slice(0, 6).join(' ')
  return words.length < clean.length ? `${words}...` : words
}

export async function createProjectFromQuery(params: {
  idea: string
  promptType?: string
  model?: string
  stack?: string
}): Promise<{ project: Project; error?: string }> {
  const jwtUser = await getAuthUser().catch(() => null)
  const session = await auth().catch(() => null)
  const userId = jwtUser?.id || session?.user?.id || 'demo_user'
  const name = generateProjectName(params.idea, params.promptType)

  const newProject: Project = {
    id: crypto.randomUUID(),
    user_id: userId,
    name,
    idea: params.idea.trim(),
    stack: params.promptType || params.stack || 'Backend Architecture',
    status: 'pending',
    approval_status: 'pending',
    model: params.model || 'Claude 3.5 Sonnet',
    prompt_type: params.promptType || 'Backend Architecture',
    current_step: 1,
    created_at: new Date().toISOString(),
  }

  // 1. Try writing to database
  try {
    const dbResult = await db
      .insert(projects)
      .values({
        id: newProject.id,
        user_id: newProject.user_id,
        name: newProject.name,
        idea: newProject.idea,
        stack: newProject.stack,
        status: newProject.status,
        approval_status: newProject.approval_status,
        model: newProject.model,
        prompt_type: newProject.prompt_type,
        current_step: 1,
      })
      .returning()

    if (dbResult && dbResult.length > 0) {
      const saved = dbResult[0] as Project
      // Also cache in local store
      const local = ensureLocalStore()
      saveLocalStore([saved, ...local.filter((p) => p.id !== saved.id)])
      return { project: saved }
    }
  } catch (dbErr) {
    console.warn('Database insert failed, using persistent local store fallback:', (dbErr as Error).message)
  }

  // 2. Fallback to file storage
  const local = ensureLocalStore()
  const updated = [newProject, ...local.filter((p) => p.id !== newProject.id)]
  saveLocalStore(updated)

  return { project: newProject }
}

export async function fetchUserProjects(userId?: string): Promise<Project[]> {
  const jwtUser = await getAuthUser().catch(() => null)
  const session = await auth().catch(() => null)
  const targetUserId = userId || jwtUser?.id || session?.user?.id || 'demo_user'

  const localItems = ensureLocalStore().filter((p) => p.user_id === targetUserId)

  // 1. Try reading from Database with tenant isolation
  try {
    const dbProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.user_id, targetUserId))
      .orderBy(desc(projects.created_at))

    if (dbProjects && dbProjects.length > 0) {
      // Merge with local items by ID
      const map = new Map<string, Project>()
      for (const p of localItems) map.set(p.id, p)
      for (const p of dbProjects as Project[]) map.set(p.id, p)
      return Array.from(map.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }
  } catch (err) {
    // Database read failed, rely on local file
  }

  return localItems.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export async function updateProjectStatusInDb(
  projectId: string,
  updates: {
    status?: 'pending' | 'in_progress' | 'completed' | string
    approval_status?: 'pending' | 'approved' | 'rejected' | string
  },
  userId?: string
): Promise<{ success: boolean; project?: Project; error?: string }> {
  // Update local file first with user verification
  const local = ensureLocalStore()
  const idx = local.findIndex((p) => p.id === projectId && (!userId || p.user_id === userId))
  let updatedProject: Project | undefined

  if (idx !== -1) {
    local[idx] = {
      ...local[idx],
      ...(updates.status ? { status: updates.status } : {}),
      ...(updates.approval_status ? { approval_status: updates.approval_status } : {}),
    }
    updatedProject = local[idx]
    saveLocalStore(local)
  }

  // Update Database with tenant verification
  try {
    const updateValues: Record<string, any> = {}
    if (updates.status) updateValues.status = updates.status
    if (updates.approval_status) updateValues.approval_status = updates.approval_status

    const whereClause = userId
      ? and(eq(projects.id, projectId), eq(projects.user_id, userId))
      : eq(projects.id, projectId)

    const dbResult = await db
      .update(projects)
      .set(updateValues)
      .where(whereClause)
      .returning()

    if (dbResult && dbResult.length > 0) {
      updatedProject = dbResult[0] as Project
    }
  } catch (err) {
    console.warn('DB update failed, updated in local store:', (err as Error).message)
  }

  if (updatedProject) {
    return { success: true, project: updatedProject }
  }

  return { success: false, error: 'Project not found or unauthorized' }
}

export async function deleteProjectFromDb(projectId: string, userId?: string): Promise<boolean> {
  const local = ensureLocalStore()
  saveLocalStore(local.filter((p) => p.id !== projectId || (userId && p.user_id !== userId)))

  try {
    const whereClause = userId
      ? and(eq(projects.id, projectId), eq(projects.user_id, userId))
      : eq(projects.id, projectId)

    await db.delete(projects).where(whereClause)
  } catch (err) {
    // DB delete failed, removed locally
  }

  return true
}
