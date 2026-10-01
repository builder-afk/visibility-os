import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { getCurrentUser } from '@/lib/auth/session'
import { z } from 'zod'

const CreateUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
})

/**
 * GET /api/users
 * Strictly restricted to administrators. Selects ONLY non-sensitive columns.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request.headers)

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Administrator credentials required.' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const offset = (page - 1) * limit

    // Explicitly exclude passwords, tokens, and sensitive credentials
    const safeUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
        subscriptionTier: users.subscriptionTier,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .limit(limit)
      .offset(offset)

    return NextResponse.json({ users: safeUsers, page, limit })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

/**
 * POST /api/users
 * Strictly restricted to administrators for manual user provisioning.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request.headers)

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Administrator credentials required.' },
        { status: 403 }
      )
    }

    const rawBody = await request.json()
    const parsed = CreateUserSchema.safeParse(rawBody)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'ValidationError', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const newUser = await db
      .insert(users)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        subscriptionTier: users.subscriptionTier,
      })

    return NextResponse.json({ user: newUser[0] }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
