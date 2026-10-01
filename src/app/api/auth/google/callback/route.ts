import { NextRequest, NextResponse } from 'next/server'
import { exchangeGoogleCodeForTokens, verifyGoogleIdToken, findOrCreateGoogleUser } from '@/lib/auth/google'
import { createAuthenticatedTokens, setAuthCookiesOnResponse } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')
  const state = url.searchParams.get('state') || '/dashboard'

  const host = req.headers.get('host') || url.host
  const protocol = req.headers.get('x-forwarded-proto') || (url.protocol.startsWith('https') ? 'https' : 'http')
  const redirectUri = `${protocol}://${host}/api/auth/google/callback`

  if (error || !code) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error || 'AccessDenied')}`, req.url))
  }

  try {
    const tokenResult = await exchangeGoogleCodeForTokens(code, redirectUri)
    const googleInfo = await verifyGoogleIdToken(tokenResult.id_token)
    const user = await findOrCreateGoogleUser(googleInfo)

    const tokens = await createAuthenticatedTokens({
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    })

    // Determine target URL safely (prevent open redirect vulnerabilities)
    const safeTarget = state.startsWith('/') && !state.startsWith('//') ? state : '/dashboard'
    const redirectResponse = NextResponse.redirect(new URL(safeTarget, req.url))

    setAuthCookiesOnResponse(redirectResponse, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isGuest: false,
    })

    return redirectResponse
  } catch (err: any) {
    console.error('Error handling Google OAuth callback:', err)
    return NextResponse.redirect(new URL(`/login?error=OAuthCallbackFailed`, req.url))
  }
}
