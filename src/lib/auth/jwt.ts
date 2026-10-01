import { SignJWT, jwtVerify, decodeJwt } from 'jose'
import { JwtClaims, AuthPermission, AuthUser, UserRole } from '@/types/auth'

const resolvedJwtSecret = process.env.JWT_SECRET || process.env.AUTH_SECRET
const JWT_SECRET = resolvedJwtSecret || 'miracle-jwt-secret-key-minimum-32-characters-prod-2026'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || `${JWT_SECRET}-refresh`

const encodedAccessKey = new TextEncoder().encode(JWT_SECRET)
const encodedRefreshKey = new TextEncoder().encode(JWT_REFRESH_SECRET)

// Token lifespans
export const ACCESS_TOKEN_EXPIRATION_SECONDS = 15 * 60 // 15 minutes
export const REFRESH_TOKEN_EXPIRATION_SECONDS = 7 * 24 * 60 * 60 // 7 days
export const GUEST_TOKEN_EXPIRATION_SECONDS = 24 * 60 * 60 // 24 hours

export class TokenExpiredError extends Error {
  constructor(message = 'Token has expired') {
    super(message)
    this.name = 'TokenExpiredError'
  }
}

export class InvalidTokenError extends Error {
  constructor(message = 'Invalid token') {
    super(message)
    this.name = 'InvalidTokenError'
  }
}

// Default permissions for standard users vs guests
export const GUEST_PERMISSIONS: AuthPermission[] = ['browse', 'read_templates', 'view_public']
export const USER_PERMISSIONS: AuthPermission[] = [
  'browse',
  'read_templates',
  'view_public',
  'create_project',
  'edit_project',
  'delete_project',
  'team_management',
]

/**
 * Sign an Access Token with JWT claims
 */
export async function signAccessToken(payload: Omit<JwtClaims, 'type' | 'iat' | 'exp'>): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const expiration = payload.isGuest 
    ? now + GUEST_TOKEN_EXPIRATION_SECONDS 
    : now + ACCESS_TOKEN_EXPIRATION_SECONDS

  return new SignJWT({
    ...payload,
    type: 'access',
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime(expiration)
    .setJti(crypto.randomUUID())
    .sign(encodedAccessKey)
}

/**
 * Sign a Refresh Token
 */
export async function signRefreshToken(payload: Pick<JwtClaims, 'sub' | 'isGuest' | 'role'>): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const expiration = payload.isGuest 
    ? now + GUEST_TOKEN_EXPIRATION_SECONDS 
    : now + REFRESH_TOKEN_EXPIRATION_SECONDS

  return new SignJWT({
    sub: payload.sub,
    isGuest: payload.isGuest,
    role: payload.role,
    type: 'refresh',
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(now)
    .setExpirationTime(expiration)
    .setJti(crypto.randomUUID())
    .sign(encodedRefreshKey)
}

/**
 * Verify and decode an Access or Refresh token
 */
export async function verifyToken(
  token: string,
  expectedType: 'access' | 'refresh' = 'access'
): Promise<JwtClaims> {
  if (!token) {
    throw new InvalidTokenError('No token provided')
  }

  const key = expectedType === 'access' ? encodedAccessKey : encodedRefreshKey

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    })

    const claims = payload as unknown as JwtClaims

    if (claims.type !== expectedType) {
      throw new InvalidTokenError(`Token type mismatch: expected ${expectedType}, got ${claims.type}`)
    }

    return claims
  } catch (error: any) {
    if (error?.code === 'ERR_JWT_EXPIRED') {
      throw new TokenExpiredError('JWT has expired')
    }
    if (error instanceof InvalidTokenError) {
      throw error
    }
    throw new InvalidTokenError(error?.message || 'Token verification failed')
  }
}

/**
 * Safely inspect a token's claims without verifying signature (useful on client or diagnostics)
 */
export function decodeTokenClaims(token: string): JwtClaims | null {
  try {
    return decodeJwt(token) as unknown as JwtClaims
  } catch {
    return null
  }
}

/**
 * Convert JWT claims into an AuthUser object
 */
export function claimsToAuthUser(claims: JwtClaims): AuthUser {
  return {
    id: claims.sub,
    email: claims.email,
    name: claims.name,
    image: claims.image,
    isGuest: claims.isGuest,
    role: claims.role || (claims.isGuest ? 'guest' : 'user'),
    permissions: claims.permissions || (claims.isGuest ? GUEST_PERMISSIONS : USER_PERMISSIONS),
  }
}
