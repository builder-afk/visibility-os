import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, TokenExpiredError } from '@/lib/auth/jwt'
import { AUTH_COOKIES } from '@/lib/auth/session'
import { checkRateLimit } from '@/lib/rate-limiter'

// Public HTML pages accessible without any session
const PUBLIC_PATHS = [
  '/',
  '/pricing',
  '/about',
  '/contact',
  '/n8n-templates',
  '/ppc-specialist',
  '/marketplace',
  '/login',
  '/signup',
  '/brand-specialist',
  '/build-receptionist',
  '/documentation',
  '/marketing-directory',
  '/partners-directory',
  '/product-marketer',
  '/reddit-playbook',
  '/seo-specialist',
  '/tools',
  '/app-templates',
  '/architecture-plan',
  '/meeting-notes',
  '/task-engine',
  '/ai-rankings',
  '/privacy',
  '/terms',
  '/cookie-policy',
  '/refund-policy',
]

// Public API endpoints that don't require an active session
const PUBLIC_API_PATHS = [
  '/api/auth/',
  '/api/contact',
]

// Admin-only paths
const ADMIN_PATHS = [
  '/admin',
  '/api/admin',
]

// Routes that require registered user accounts (Guests blocked)
const RESTRICTED_FOR_GUESTS = [
  '/settings',
  '/billing',
  '/team-workspace',
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1'

  // 1. Bypass static assets and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // 2. Rate Limit Auth & Sensitive Endpoints
  if (pathname.startsWith('/api/auth/') || pathname === '/login' || pathname === '/signup') {
    const rl = checkRateLimit(`auth_${clientIp}`, 20, 60000)
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'TooManyRequests', message: 'Too many authentication attempts. Please try again in 1 minute.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }
  }

  // 3. Extract and verify JWT access token
  let accessToken = request.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value
  if (!accessToken) {
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
      accessToken = authHeader.substring(7).trim()
    }
  }

  let claims = null
  let isExpired = false

  if (accessToken) {
    try {
      claims = await verifyToken(accessToken, 'access')
    } catch (err: any) {
      if (err instanceof TokenExpiredError) {
        isExpired = true
      }
      claims = null
    }
  }

  const refreshToken = request.cookies.get(AUTH_COOKIES.REFRESH_TOKEN)?.value

  // Check for NextAuth session cookie
  const nextAuthSession =
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-authjs.session-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value

  const hasSession = !!claims || !!nextAuthSession || (isExpired && !!refreshToken)

  // 4. Handle API Routes Protection
  if (pathname.startsWith('/api/')) {
    const isPublicApi = PUBLIC_API_PATHS.some((p) => pathname === p || pathname.startsWith(p))
    if (!isPublicApi && !hasSession) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required to access this endpoint.' },
        { status: 401 }
      )
    }

    // Forward verified claims if available
    const apiHeaders = new Headers(request.headers)
    if (claims) {
      apiHeaders.set('x-user-id', claims.sub)
      apiHeaders.set('x-user-email', claims.email || '')
      apiHeaders.set('x-user-name', encodeURIComponent(claims.name || ''))
      apiHeaders.set('x-is-guest', claims.isGuest ? 'true' : 'false')
      apiHeaders.set('x-user-role', claims.role || 'user')
    }

    return NextResponse.next({
      request: {
        headers: apiHeaders,
      },
    })
  }

  // 5. Enforce Admin Routes
  const isAdminPath = ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  if (isAdminPath) {
    if (!claims || claims.role !== 'admin') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Forbidden', message: 'Administrator role required.' },
          { status: 403 }
        )
      }
      return NextResponse.redirect(new URL('/login?error=AdminRequired', request.url))
    }
  }

  // 6. Handle auth pages (/login, /signup)
  if (pathname === '/login' || pathname === '/signup') {
    return NextResponse.next()
  }

  // 7. Handle public paths
  const isPublicPath = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  if (isPublicPath) {
    return NextResponse.next()
  }

  // 8. Protected page checks: Redirect unauthenticated requests to /login
  if (!hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    if (isExpired) {
      loginUrl.searchParams.set('error', 'SessionExpired')
    }
    return NextResponse.redirect(loginUrl)
  }

  // 9. Check Guest Restrictions
  if (claims?.isGuest) {
    const isRestrictedForGuest = RESTRICTED_FOR_GUESTS.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    )

    if (isRestrictedForGuest) {
      const upgradeUrl = new URL('/login', request.url)
      upgradeUrl.searchParams.set('mode', 'upgrade')
      upgradeUrl.searchParams.set('error', 'GuestRestricted')
      upgradeUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(upgradeUrl)
    }
  }

  // 10. Forward verified claims via request headers for server components
  const requestHeaders = new Headers(request.headers)
  if (claims) {
    requestHeaders.set('x-user-id', claims.sub)
    requestHeaders.set('x-user-email', claims.email || '')
    requestHeaders.set('x-user-name', encodeURIComponent(claims.name || ''))
    requestHeaders.set('x-is-guest', claims.isGuest ? 'true' : 'false')
    requestHeaders.set('x-user-role', claims.role || 'user')
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Next.js config matcher
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
