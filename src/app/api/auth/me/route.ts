import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req.headers)

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        isGuest: false,
        user: null,
      })
    }

    return NextResponse.json({
      authenticated: true,
      isGuest: user.isGuest,
      user,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'SessionCheckFailed', message: error.message || 'Error validating session' },
      { status: 500 }
    )
  }
}
