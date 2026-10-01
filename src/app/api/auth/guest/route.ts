import { NextRequest, NextResponse } from 'next/server'
import { createGuestTokens, setAuthCookiesOnResponse } from '@/lib/auth/session'

export async function POST(req: NextRequest) {
  try {
    const { tokens, guestUser } = await createGuestTokens()

    const response = NextResponse.json({
      success: true,
      message: 'Guest session created successfully',
      user: guestUser,
    })

    setAuthCookiesOnResponse(response, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isGuest: true,
    })

    return response
  } catch (error: any) {
    console.error('Failed to create guest session:', error)
    return NextResponse.json(
      { error: 'GuestSessionFailed', message: error.message || 'Could not initiate guest session' },
      { status: 500 }
    )
  }
}
