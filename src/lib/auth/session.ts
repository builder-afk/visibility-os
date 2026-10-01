import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  signAccessToken,
  signRefreshToken,
  verifyToken,
  claimsToAuthUser,
  TokenExpiredError,
  ACCESS_TOKEN_EXPIRATION_SECONDS,
  REFRESH_TOKEN_EXPIRATION_SECONDS,
  GUEST_TOKEN_EXPIRATION_SECONDS,
  GUEST_PERMISSIONS,
  USER_PERMISSIONS,
} from './jwt'
import { AuthUser, AuthTokens, JwtClaims } from '@/types/auth'

export const AUTH_COOKIES = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
} as const

interface CookieOptions {
  httpOnly: boolean
  secure: boolean
  sameSite: 'lax' | 'strict' | 'none'
  path: string
  maxAge?: number
}

export function getCookieOptions(maxAgeSeconds: number): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
  }
}

/**
 * Generate tokens for an authenticated user
 */
export async function createAuthenticatedTokens(user: {
  id: string
  email: string
  name?: string | null
  image?: string | null
  role?: 'user' | 'admin'
}): Promise<AuthTokens> {
  const role = user.role || 'user'
  const name = user.name || user.email.split('@')[0] || 'User'

  const accessToken = await signAccessToken({
    sub: user.id,
    email: user.email,
    name,
    image: user.image || null,
    isGuest: false,
    role,
    permissions: USER_PERMISSIONS,
  })

  const refreshToken = await signRefreshToken({
    sub: user.id,
    isGuest: false,
    role,
  })

  return {
    accessToken,
    refreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS,
    tokenType: 'Bearer',
  }
}

/**
 * Generate tokens for a guest session
 */
export async function createGuestTokens(): Promise<{ tokens: AuthTokens; guestUser: AuthUser }> {
  const guestId = `guest_${crypto.randomUUID().slice(0, 12)}`
  const guestUser: AuthUser = {
    id: guestId,
    email: null,
    name: 'Guest User',
    image: null,
    isGuest: true,
    role: 'guest',
    permissions: GUEST_PERMISSIONS,
  }

  const accessToken = await signAccessToken({
    sub: guestId,
    email: null,
    name: guestUser.name,
    image: null,
    isGuest: true,
    role: 'guest',
    permissions: GUEST_PERMISSIONS,
  })

  const refreshToken = await signRefreshToken({
    sub: guestId,
    isGuest: true,
    role: 'guest',
  })

  return {
    tokens: {
      accessToken,
      refreshToken,
      expiresIn: GUEST_TOKEN_EXPIRATION_SECONDS,
      tokenType: 'Bearer',
    },
    guestUser,
  }
}

/**
 * Attach auth cookies to an outgoing NextResponse
 */
export function setAuthCookiesOnResponse(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken: string; isGuest?: boolean }
) {
  const accessAge = tokens.isGuest ? GUEST_TOKEN_EXPIRATION_SECONDS : ACCESS_TOKEN_EXPIRATION_SECONDS
  const refreshAge = tokens.isGuest ? GUEST_TOKEN_EXPIRATION_SECONDS : REFRESH_TOKEN_EXPIRATION_SECONDS

  response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, tokens.accessToken, getCookieOptions(accessAge))
  response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, tokens.refreshToken, getCookieOptions(refreshAge))
  return response
}

/**
 * Clear auth cookies from an outgoing NextResponse
 */
export function clearAuthCookiesOnResponse(response: NextResponse) {
  response.cookies.delete(AUTH_COOKIES.ACCESS_TOKEN)
  response.cookies.delete(AUTH_COOKIES.REFRESH_TOKEN)
  return response
}

/**
 * Set auth cookies using Next.js async cookies()
 */
export async function setServerAuthCookies(tokens: {
  accessToken: string
  refreshToken: string
  isGuest?: boolean
}) {
  const cookieStore = await cookies()
  const accessAge = tokens.isGuest ? GUEST_TOKEN_EXPIRATION_SECONDS : ACCESS_TOKEN_EXPIRATION_SECONDS
  const refreshAge = tokens.isGuest ? GUEST_TOKEN_EXPIRATION_SECONDS : REFRESH_TOKEN_EXPIRATION_SECONDS

  cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, tokens.accessToken, getCookieOptions(accessAge))
  cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, tokens.refreshToken, getCookieOptions(refreshAge))
}

/**
 * Clear auth cookies using Next.js async cookies()
 */
export async function clearServerAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIES.ACCESS_TOKEN)
  cookieStore.delete(AUTH_COOKIES.REFRESH_TOKEN)
}

/**
 * Retrieve and validate the current user or guest from incoming cookies or Authorization header.
 * If the access token is expired, attempts a silent refresh via the refresh token.
 */
export async function getCurrentUser(reqHeaders?: Headers): Promise<AuthUser | null> {
  let token: string | undefined

  // 1. Check Authorization Bearer header if available
  if (reqHeaders) {
    const authHeader = reqHeaders.get('authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      token = authHeader.substring(7).trim()
    }
  }

  // 2. Fall back to cookie
  let cookieStore
  try {
    cookieStore = await cookies()
  } catch {
    // If called outside request context
  }

  if (!token && cookieStore) {
    token = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value
  }

  if (token) {
    try {
      const claims = await verifyToken(token, 'access')
      return claimsToAuthUser(claims)
    } catch (err: any) {
      if (err instanceof TokenExpiredError && cookieStore) {
        // Access token expired, attempt refresh via refresh token
        const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value
        if (refreshToken) {
          try {
            const refreshClaims = await verifyToken(refreshToken, 'refresh')
            // Re-issue a fresh access token
            const freshAccessToken = await signAccessToken({
              sub: refreshClaims.sub,
              email: null,
              name: refreshClaims.isGuest ? 'Guest User' : 'User',
              isGuest: refreshClaims.isGuest,
              role: refreshClaims.role,
              permissions: refreshClaims.isGuest ? GUEST_PERMISSIONS : USER_PERMISSIONS,
            })
            // Update the access cookie
            const accessAge = refreshClaims.isGuest
              ? GUEST_TOKEN_EXPIRATION_SECONDS
              : ACCESS_TOKEN_EXPIRATION_SECONDS
            cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, freshAccessToken, getCookieOptions(accessAge))

            return {
              id: refreshClaims.sub,
              email: null,
              name: refreshClaims.isGuest ? 'Guest User' : 'User',
              isGuest: refreshClaims.isGuest,
              role: refreshClaims.role,
              permissions: refreshClaims.isGuest ? GUEST_PERMISSIONS : USER_PERMISSIONS,
            }
          } catch {
            // Refresh token also invalid or expired
            return null
          }
        }
      }
      return null
    }
  }

  return null
}
