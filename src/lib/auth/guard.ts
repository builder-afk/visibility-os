import { getCurrentUser } from './session'
import { AuthUser, AuthPermission } from '@/types/auth'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export class UnauthorizedError extends Error {
  constructor(message = 'Authentication required') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Forbidden: insufficient permissions') {
    super(message)
    this.name = 'ForbiddenError'
  }
}

/**
 * Get current session user in a Server Component or Server Action
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const headerList = await headers()
  return getCurrentUser(headerList)
}

/**
 * Require any authenticated session (user or guest)
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getAuthUser()
  if (!user) {
    throw new UnauthorizedError('Please log in or continue as a guest to access this resource')
  }
  return user
}

/**
 * Require a registered, non-guest user
 */
export async function requireNonGuest(): Promise<AuthUser> {
  const user = await requireAuth()
  if (user.isGuest) {
    throw new ForbiddenError('This action requires a registered account. Please sign in with Google.')
  }
  return user
}

/**
 * Check if a user has a specific permission
 */
export function hasPermission(user: AuthUser | null, permission: AuthPermission): boolean {
  if (!user) return false
  return user.permissions.includes(permission) || user.role === 'admin'
}

/**
 * API route helper to protect endpoints
 */
export async function protectApiRoute(
  req: Request,
  options: { requireRegisteredUser?: boolean; requiredPermission?: AuthPermission } = {}
): Promise<{ user: AuthUser } | { errorResponse: NextResponse }> {
  const user = await getCurrentUser(req.headers)

  if (!user) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      ),
    }
  }

  if (options.requireRegisteredUser && user.isGuest) {
    return {
      errorResponse: NextResponse.json(
        {
          error: 'Forbidden',
          message: 'Guest accounts cannot perform this action. Please sign in.',
          isGuest: true,
        },
        { status: 403 }
      ),
    }
  }

  if (options.requiredPermission && !hasPermission(user, options.requiredPermission)) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Forbidden', message: `Missing required permission: ${options.requiredPermission}` },
        { status: 403 }
      ),
    }
  }

  return { user }
}
