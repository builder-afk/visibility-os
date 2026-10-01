"use client"

import React from 'react'
import { useAuth } from '@/hooks/use-auth'
import { AuthPermission } from '@/types/auth'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import Link from 'next/link'

interface PermissionGateProps {
  children: React.ReactNode
  requiredPermission?: AuthPermission
  requireRegisteredUser?: boolean
  fallback?: React.ReactNode
}

export function PermissionGate({
  children,
  requiredPermission,
  requireRegisteredUser = false,
  fallback,
}: PermissionGateProps) {
  const { user, isGuest, isAuthenticated } = useAuth()

  // 1. If not authenticated at all
  if (!user) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-center gap-3">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Authentication Required</h4>
            <p className="text-xs text-muted-foreground mt-1">Please sign in to unlock this feature.</p>
          </div>
          <Link href="/login">
            <Button size="sm" variant="outline">Sign In</Button>
          </Link>
        </div>
      )
    )
  }

  // 2. If guest and registered account is required
  if (requireRegisteredUser && isGuest) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed border-amber-300 dark:border-amber-700/50 rounded-xl bg-amber-50/30 dark:bg-amber-950/20 text-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-600 dark:text-amber-400">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Registered Account Required</h4>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              You are currently browsing as a guest. Sign in with Google to use this feature and save your work permanently.
            </p>
          </div>
          <Link href="/login?mode=upgrade">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
              Sign in with Google
            </Button>
          </Link>
        </div>
      )
    )
  }

  // 3. Check specific permission
  if (requiredPermission && !user.permissions?.includes(requiredPermission) && user.role !== 'admin') {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/40 text-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            You do not have permission ({requiredPermission}) to perform this action.
          </p>
        </div>
      )
    )
  }

  return <>{children}</>
}
