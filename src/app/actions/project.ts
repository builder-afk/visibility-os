'use server'

import { revalidatePath } from 'next/cache'
import {
  createProjectFromQuery,
  fetchUserProjects,
  updateProjectStatusInDb,
  deleteProjectFromDb,
} from '@/lib/projects'
import { getAuthUser } from '@/lib/auth/guard'
import { auth } from '@/auth'
import { Project } from '@/types'

async function resolveCurrentUserId(): Promise<{ userId: string; role: string }> {
  const jwtUser = await getAuthUser().catch(() => null)
  if (jwtUser?.id) return { userId: jwtUser.id, role: jwtUser.role || 'user' }
  const session = await auth().catch(() => null)
  if (session?.user?.id) return { userId: session.user.id, role: (session.user as any)?.role || 'user' }
  return { userId: 'demo_user', role: 'guest' }
}

export async function submitSearchQueryAction(data: {
  idea: string
  promptType?: string
  model?: string
  stack?: string
}): Promise<{ project?: Project; error?: string }> {
  if (!data.idea || !data.idea.trim()) {
    return { error: 'Please enter a project description or business idea.' }
  }

  try {
    const result = await createProjectFromQuery({
      idea: data.idea,
      promptType: data.promptType,
      model: data.model,
      stack: data.stack,
    })

    revalidatePath('/dashboard')
    revalidatePath('/')
    return result
  } catch (error: any) {
    console.error('Error submitting search query project:', error)
    return { error: error.message || 'Failed to save project' }
  }
}

export async function updateProjectStatusAction(
  projectId: string,
  updates: {
    status?: 'pending' | 'in_progress' | 'completed' | string
    approval_status?: 'pending' | 'approved' | 'rejected' | string
  }
): Promise<{ success: boolean; project?: Project; error?: string }> {
  if (!projectId) {
    return { success: false, error: 'Project ID is required' }
  }

  const { userId, role } = await resolveCurrentUserId()

  try {
    // If admin, they can update any project, otherwise restricted to their own userId
    const scopedUserId = role === 'admin' ? undefined : userId
    const res = await updateProjectStatusInDb(projectId, updates, scopedUserId)
    revalidatePath('/dashboard')
    revalidatePath(`/project/${projectId}`)
    revalidatePath('/architecture-plan')
    return res
  } catch (error: any) {
    console.error('Error updating project status:', error)
    return { success: false, error: error.message || 'Failed to update status' }
  }
}

export async function deleteProjectAction(projectId: string): Promise<{ success: boolean }> {
  if (!projectId) return { success: false }

  const { userId, role } = await resolveCurrentUserId()
  const scopedUserId = role === 'admin' ? undefined : userId

  try {
    const ok = await deleteProjectFromDb(projectId, scopedUserId)
    revalidatePath('/dashboard')
    return { success: ok }
  } catch (err) {
    return { success: false }
  }
}

export async function getUserProjectsAction(): Promise<Project[]> {
  const { userId } = await resolveCurrentUserId()
  try {
    return await fetchUserProjects(userId)
  } catch (err) {
    console.error('Error fetching user projects:', err)
    return []
  }
}
