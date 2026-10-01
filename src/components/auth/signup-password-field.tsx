"use client"

import React, { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'

export function SignupPasswordField() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300" htmlFor="signup-password">
        Password
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Lock className="w-4 h-4" />
        </div>
        <input
          id="signup-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
          placeholder="At least 8 characters"
          className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/25 focus:border-[#ff5500] transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
