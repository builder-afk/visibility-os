import { NextRequest, NextResponse } from 'next/server'
import { verifyGoogleIdToken, findOrCreateGoogleUser, exchangeGoogleCodeForTokens, getGoogleOAuthURL } from '@/lib/auth/google'
import { createAuthenticatedTokens, setAuthCookiesOnResponse } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  // If invoked via GET, redirect to Google OAuth consent screen
  const url = new URL(req.url)
  const host = req.headers.get('host') || url.host
  const protocol = req.headers.get('x-forwarded-proto') || (url.protocol.startsWith('https') ? 'https' : 'http')
  const redirectUri = `${protocol}://${host}/api/auth/callback/google`
  const state = url.searchParams.get('callbackUrl') || '/dashboard'

  const authUrl = getGoogleOAuthURL(redirectUri, state)
  return NextResponse.redirect(authUrl)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { credential, code, redirectUri } = body

    let googleTokenInfo

    if (credential) {
      // 1. Google Identity Services ID Token (One Tap / Credential button)
      googleTokenInfo = await verifyGoogleIdToken(credential)
    } else if (code) {
      // 2. OAuth 2.0 Authorization code exchange
      const host = req.headers.get('host') || 'localhost:3000'
      const protocol = req.headers.get('x-forwarded-proto') || 'http'
      const resolvedRedirectUri = redirectUri || `${protocol}://${host}/api/auth/callback/google`

      const tokenResult = await exchangeGoogleCodeForTokens(code, resolvedRedirectUri)
      googleTokenInfo = await verifyGoogleIdToken(tokenResult.id_token)
    } else {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Either Google "credential" or "code" must be provided.' },
        { status: 400 }
      )
    }

    // Find or create user in DB
    const user = await findOrCreateGoogleUser(googleTokenInfo)

    // Generate JWT access + refresh tokens
    const tokens = await createAuthenticatedTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        isGuest: false,
        role: 'user',
      },
    })

    // Attach httpOnly cookies
    setAuthCookiesOnResponse(response, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isGuest: false,
    })

    return response
  } catch (error: any) {
    console.error('Google Auth Error:', error)
    return NextResponse.json(
      { error: 'AuthenticationFailed', message: error.message || 'Failed to authenticate with Google' },
      { status: 401 }
    )
  }
}
