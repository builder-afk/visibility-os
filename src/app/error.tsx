'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // In production, Next.js masks error.message and provides a unique digest hash
    // We log the digest for observability without leaking stack traces to users
    if (process.env.NODE_ENV === 'development') {
      console.error('Unhandled Client/RSC Error:', error)
    } else {
      console.error('Application Error digest:', error.digest)
    }
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-900 text-white">
      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-2">Something went wrong</h2>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          An unexpected application error occurred. For your security, detailed debugging information is suppressed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-orange-600/20"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium text-sm rounded-xl transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  )
}
