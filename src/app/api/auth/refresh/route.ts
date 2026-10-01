import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, signAccessToken, signRefreshToken, TokenExpiredError, ACCESS_TOKEN_EXPIRATION_SECONDS, GUEST_PERMISSIONS, USER_PERMISSIONS } from '@/lib/auth/jwt'
import { AUTH_COOKIES, setAuthCookiesOnResponse } from '@/lib/auth/session'

export async function POST(req: NextRequest) {
  try {
    // 1. Get refresh token from cookie or Authorization header
    let refreshToken = req.cookies.get(AUTH_COOKIES.REFRESH_TOKEN)?.value

    if (!refreshToken) {
      const authHeader = req.headers.get('authorization')
      if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        refreshToken = authHeader.substring(7).trim()
      }
    }

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'No refresh token provided' },
        { status: 401 }
      )
    }

    // 2. Verify refresh token
    const claims = await verifyToken(refreshToken, 'refresh')

    // 3. Issue new access token
    const isGuest = claims.isGuest
    const role = claims.role || (isGuest ? 'guest' : 'user')
    const permissions = isGuest ? GUEST_PERMISSIONS : USER_PERMISSIONS

    const newAccessToken = await signAccessToken({
      sub: claims.sub,
      email: isGuest ? null : claims.email || null,
      name: isGuest ? 'Guest User' : claims.name || 'User',
      image: claims.image || null,
      isGuest,
      role,
      permissions,
    })

    // Optionally rotate refresh token
    const newRefreshToken = await signRefreshToken({
      sub: claims.sub,
      isGuest,
      role,
    })

    const response = NextResponse.json({
      success: true,
      expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS,
      user: {
        id: claims.sub,
        email: isGuest ? null : claims.email,
        name: isGuest ? 'Guest User' : claims.name,
        isGuest,
        role,
        permissions,
      },
    })

    setAuthCookiesOnResponse(response, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      isGuest,
    })

    return response
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.json(
        { error: 'RefreshTokenExpired', message: 'Refresh token has expired. Please sign in again.' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'InvalidRefreshToken', message: error.message || 'Invalid refresh token' },
      { status: 401 }
    )
  }
}
