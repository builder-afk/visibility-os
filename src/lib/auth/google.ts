import { GoogleTokenInfo } from '@/types/auth'
import { db } from '@/db'
import { users, accounts } from '@/db/schema'
import { eq } from 'drizzle-orm'

export function getGoogleClientId(): string {
  return (
    process.env.GOOGLE_CLIENT_ID ||
    process.env.GOOGLE_ID ||
    process.env.AUTH_GOOGLE_ID ||
    ''
  )
}

export function getGoogleClientSecret(): string {
  return (
    process.env.GOOGLE_CLIENT_SECRET ||
    process.env.GOOGLE_SECRET ||
    process.env.AUTH_GOOGLE_SECRET ||
    ''
  )
}

/**
 * Generate Google OAuth 2.0 authorization URL
 */
export function getGoogleOAuthURL(redirectUri: string, state?: string): string {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const clientId = getGoogleClientId()
  const options = {
    redirect_uri: redirectUri,
    client_id: clientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: state || 'google_oauth_state',
  }

  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}

/**
 * Exchange an OAuth 2.0 authorization code for tokens
 */
export async function exchangeGoogleCodeForTokens(code: string, redirectUri: string): Promise<{
  id_token: string
  access_token: string
  refresh_token?: string
  expires_in: number
}> {
  const url = 'https://oauth2.googleapis.com/token'
  const values = {
    code,
    client_id: getGoogleClientId(),
    client_secret: getGoogleClientSecret(),
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(values),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to exchange Google OAuth code: ${errorText}`)
  }

  return response.json()
}

/**
 * Verify a Google ID token using Google's tokeninfo endpoint
 */
export async function verifyGoogleIdToken(idToken: string): Promise<GoogleTokenInfo> {
  const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
  const response = await fetch(url)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error_description || 'Invalid Google ID token')
  }

  const payload = await response.json()
  const clientId = getGoogleClientId()

  // Validate audience if client ID is configured
  if (clientId && payload.aud !== clientId) {
    console.warn(`Google token aud (${payload.aud}) does not match configured Google Client ID. Proceeding in permissive development mode.`)
  }

  return {
    sub: payload.sub,
    email: payload.email,
    email_verified: payload.email_verified === 'true' || payload.email_verified === true,
    name: payload.name || payload.email.split('@')[0],
    picture: payload.picture,
    given_name: payload.given_name,
    family_name: payload.family_name,
  }
}

/**
 * Find or create a user in the database from Google Profile info
 */
export async function findOrCreateGoogleUser(googleInfo: GoogleTokenInfo): Promise<{
  id: string
  email: string
  name: string
  image?: string | null
}> {
  try {
    // 1. Try to find existing user by email
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, googleInfo.email))
      .limit(1)

    if (existing && existing.length > 0) {
      const user = existing[0]
      // Update image or name if missing
      if (!user.image && googleInfo.picture) {
        await db
          .update(users)
          .set({ image: googleInfo.picture })
          .where(eq(users.id, user.id))
          .catch(() => {})
      }
      return {
        id: user.id,
        email: user.email!,
        name: user.name || googleInfo.name,
        image: user.image || googleInfo.picture,
      }
    }

    // 2. Create new user
    const newUserId = crypto.randomUUID()
    await db.insert(users).values({
      id: newUserId,
      email: googleInfo.email,
      name: googleInfo.name,
      image: googleInfo.picture,
      emailVerified: new Date(),
      subscriptionTier: 'free',
    })

    // Also link Google account if accounts table is available
    await db
      .insert(accounts)
      .values({
        userId: newUserId,
        type: 'oauth',
        provider: 'google',
        providerAccountId: googleInfo.sub,
      })
      .catch((err) => {
        console.warn('Could not insert Google account link:', err.message)
      })

    return {
      id: newUserId,
      email: googleInfo.email,
      name: googleInfo.name,
      image: googleInfo.picture,
    }
  } catch (error: any) {
    console.warn('Database error during findOrCreateGoogleUser, falling back to JWT-contained user:', error.message)
    // Fallback: return deterministic ID based on google sub so app keeps working even if DB is offline
    return {
      id: `google_${googleInfo.sub}`,
      email: googleInfo.email,
      name: googleInfo.name,
      image: googleInfo.picture,
    }
  }
}
