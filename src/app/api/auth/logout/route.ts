import { NextRequest, NextResponse } from 'next/server'
import { clearAuthCookiesOnResponse } from '@/lib/auth/session'

export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  })

  clearAuthCookiesOnResponse(response)
  return response
}
