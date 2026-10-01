"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { AuthUser } from '@/types/auth'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isGuest: boolean
  isLoading: boolean
  error: string | null
  loginWithGoogle: (credentialOrCode?: { credential?: string; code?: string }) => Promise<boolean>
  continueAsGuest: (targetUrl?: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshSession: () => Promise<boolean>
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode
  initialUser?: AuthUser | null
}) {
  const [user, setUser] = useState<AuthUser | null>(initialUser)
  const [isLoading, setIsLoading] = useState<boolean>(!initialUser)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Clear refresh timer on unmount
  useEffect(() => {
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
    }
  }, [])

  // Schedule silent background refresh before access token expires (every ~12 minutes)
  const scheduleTokenRefresh = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
    }

    // Refresh after 12 minutes (720,000 ms)
    refreshTimerRef.current = setTimeout(async () => {
      try {
        const refreshed = await refreshSession()
        if (refreshed) {
          scheduleTokenRefresh()
        }
      } catch (err) {
        console.error('Silent refresh failed:', err)
      }
    }, 12 * 60 * 1000)
  }, [])

  /**
   * Check current session on mount
   */
  const checkSession = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        if (data.authenticated && data.user) {
          setUser(data.user)
          scheduleTokenRefresh()
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (err: any) {
      console.error('Failed to check auth session:', err)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [scheduleTokenRefresh])

  useEffect(() => {
    if (!initialUser) {
      checkSession()
    } else {
      scheduleTokenRefresh()
    }
  }, [checkSession, initialUser, scheduleTokenRefresh])

  /**
   * Refresh JWT token
   */
  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
      })

      if (res.ok) {
        const data = await res.json()
        if (data.user) {
          setUser(data.user)
          scheduleTokenRefresh()
          return true
        }
      }
      return false
    } catch (err) {
      console.error('Token refresh error:', err)
      return false
    }
  }, [scheduleTokenRefresh])

  /**
   * Google OAuth login
   */
  const loginWithGoogle = useCallback(
    async (payload?: { credential?: string; code?: string }): Promise<boolean> => {
      setIsLoading(true)
      setError(null)

      try {
        if (payload?.credential || payload?.code) {
          // Direct token / code exchange
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })

          const data = await res.json()
          if (!res.ok) {
            throw new Error(data.message || 'Google sign in failed')
          }

          setUser(data.user)
          scheduleTokenRefresh()
          router.push('/dashboard')
          return true
        } else {
          // Redirect to Google OAuth consent screen
          window.location.href = '/api/auth/google'
          return true
        }
      } catch (err: any) {
        setError(err.message || 'Google authentication failed')
        setIsLoading(false)
        return false
      }
    },
    [router, scheduleTokenRefresh]
  )

  /**
   * Continue as Guest
   */
  const continueAsGuest = useCallback(async (targetUrl?: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/guest', {
        method: 'POST',
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || 'Guest session initialization failed')
      }

      setUser(data.user)
      scheduleTokenRefresh()
      const dest = targetUrl && targetUrl.startsWith('/') && !targetUrl.startsWith('//') ? targetUrl : '/dashboard'
      router.push(dest)
      return true
    } catch (err: any) {
      setError(err.message || 'Could not start guest session')
      setIsLoading(false)
      return false
    }
  }, [router, scheduleTokenRefresh])

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      setUser(null)
      setIsLoading(false)
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
      router.push('/')
      router.refresh()
    }
  }, [router])

  /**
   * Authenticated fetch helper: automatically handles 401 by attempting token refresh and replaying
   */
  const authFetch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      let res = await fetch(input, init)

      if (res.status === 401) {
        // Attempt silent refresh
        const refreshed = await refreshSession()
        if (refreshed) {
          // Retry the request once
          res = await fetch(input, init)
        } else {
          // Session fully expired
          setUser(null)
          router.push('/login?error=SessionExpired')
        }
      }

      return res
    },
    [refreshSession, router]
  )

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && !user.isGuest,
    isGuest: !!user?.isGuest,
    isLoading,
    error,
    loginWithGoogle,
    continueAsGuest,
    logout,
    refreshSession,
    authFetch,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
