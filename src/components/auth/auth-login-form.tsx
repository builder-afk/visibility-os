"use client"

import React, { useState, useActionState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { loginAction, type LoginState } from '@/app/actions/auth'

interface AuthLoginFormProps {
  callbackUrl?: string
  initialError?: string | null
}

export function AuthLoginForm({ callbackUrl = '/dashboard', initialError = null }: AuthLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [capsLockActive, setCapsLockActive] = useState(false)
  const [state, formAction, isPending] = useActionState<LoginState | null, FormData>(loginAction, null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState('CapsLock'))
    }
  }

  const activeError = state?.error || initialError

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Hidden input to pass callbackUrl to server action */}
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {/* Error notification banner */}
      {activeError && (
        <div className="p-3.5 bg-red-50/90 border border-red-200/80 rounded-xl text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
          <span className="leading-relaxed font-medium">{activeError}</span>
        </div>
      )}

      {/* Email input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-700" htmlFor="auth-email">
          Email address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="auth-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/25 focus:border-[#ff5500] transition-all"
            placeholder="name@company.com"
          />
        </div>
      </div>

      {/* Password input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700" htmlFor="auth-password">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-[11px] font-medium text-[#ff5500] hover:text-[#e64d00] transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="auth-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="current-password"
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyDown}
            className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/25 focus:border-[#ff5500] transition-all"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Caps Lock warning indicator */}
        {capsLockActive && (
          <p className="text-[11px] font-medium text-amber-600 flex items-center gap-1.5 mt-0.5 animate-in fade-in duration-150">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Caps Lock is ON
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full h-11 mt-1 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff661a] hover:from-[#e64d00] hover:to-[#ff5500] text-white font-semibold shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign in</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
