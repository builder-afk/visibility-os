import Link from "next/link"
import { Layers, Sparkles, AlertCircle, Zap, Shield, Workflow, CheckCircle2 } from "lucide-react"
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button"
import { GuestAccessButton } from "@/components/auth/guest-access-button"
import { AuthLoginForm } from "@/components/auth/auth-login-form"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = typeof params.error === 'string' ? params.error : undefined
  const mode = typeof params.mode === 'string' ? params.mode : undefined
  const callbackUrl = typeof params.callbackUrl === 'string' ? params.callbackUrl : '/dashboard'

  let errorMessage: string | null = null
  if (error === 'CredentialsSignin') {
    errorMessage = 'Invalid email or password. Please check your credentials.'
  } else if (error === 'SessionExpired') {
    errorMessage = 'Your session has expired. Please sign in again.'
  } else if (error === 'GuestRestricted') {
    errorMessage = 'Guest accounts have limited permissions. Sign in with Google or email to access this feature.'
  } else if (error === 'OAuthCallbackFailed') {
    errorMessage = 'Google authentication was cancelled or failed. Please try again.'
  } else if (error) {
    errorMessage = 'Authentication could not be completed. Please try again.'
  }

  const features = [
    {
      icon: Zap,
      title: 'Autonomous AI Workflows',
      desc: 'Deploy self-healing agents that build, test, and ship features 10x faster.',
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      desc: 'TLS 1.3 encryption with tenant-isolated data storage and encrypted credentials.',
    },
    {
      icon: Workflow,
      title: '120+ Universal Integrations',
      desc: 'Connect GitHub, Postgres, Slack, Figma, and your existing toolstack seamlessly.',
    },
  ]

  return (
    <div className="flex min-h-screen lg:h-screen lg:overflow-hidden bg-slate-50/60 selection:bg-orange-500/20">
      {/* ═════════════════════════════════════════════════════════════════════════
          LEFT PANEL — Brand Showcase & Live Architecture Metrics (Desktop)
         ═════════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[50%] h-full relative overflow-hidden bg-[#070A11] border-r border-slate-800/80">
        {/* Deep ambient backdrop glows */}
        <div
          className="absolute -top-24 -right-24 w-[550px] h-[550px] rounded-full blur-[130px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #ff5500 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        />

        {/* Subtle grid mesh overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Left Panel Inner Container */}
        <div className="relative z-10 flex flex-col justify-between w-full h-full py-7 px-8 xl:px-11">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff5500] to-[#ff7733] flex items-center justify-center shadow-lg shadow-orange-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
                <Layers className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight leading-none group-hover:text-orange-200 transition-colors">
                  miracle
                </span>
                <span className="text-[9px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
                  AI Operating System
                </span>
              </div>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold text-slate-300">v2.4 Live</span>
            </div>
          </div>

          {/* Center Content: Headline + Feature Cards */}
          <div className="max-w-lg my-auto py-2">
            {/* Social proof pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-3">
              <Sparkles className="w-3 h-3 text-[#ff5500]" />
              <span className="text-[11px] font-semibold text-orange-200">
                Empowering 2,400+ product teams worldwide
              </span>
            </div>

            <h1 className="text-2xl xl:text-3xl font-black text-white tracking-tight leading-[1.18] mb-2.5">
              Build and scale with{' '}
              <span className="bg-gradient-to-r from-[#ff5500] via-[#ff7e38] to-[#FFB347] bg-clip-text text-transparent">
                intelligent AI
              </span>{' '}
              workflows.
            </h1>

            <p className="text-xs xl:text-[13px] text-slate-400 leading-relaxed mb-4">
              Turn natural language ideas into production-ready full-stack applications, automated pipelines, and intelligent multi-agent systems.
            </p>

            {/* Feature Highlights Grid */}
            <div className="flex flex-col gap-2">
              {features.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] transition-all group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover/item:bg-orange-500/20 group-hover/item:scale-105 transition-all">
                      <Icon className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <div>
                      <h2 className="text-xs font-semibold text-slate-200 leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom Social Proof & Trust Badges */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['#4f46e5', '#ec4899', '#f97316', '#10b981'].map((bg, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 rounded-full border-2 border-[#070A11] text-[10px] font-bold text-white flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: bg }}
                  >
                    {['AL', 'MK', 'DR', 'TC'][idx]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                  {'★'.repeat(5)}
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  &ldquo;Saved our team 40+ engineering hours weekly&rdquo;
                </p>
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>99.98% SLA</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════
          RIGHT PANEL — Elevated Clean Auth Card
         ═════════════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 h-full flex items-center justify-center p-6 sm:p-8 lg:p-10 relative overflow-y-auto lg:overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-[360px] h-[360px] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-100/30 rounded-full blur-[90px] pointer-events-none" />

        {/* Elevated Card */}
        <div className="w-full max-w-[430px] bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-6 sm:p-7 relative z-10">
          {/* Mobile Brand Header (Visible only on small viewports) */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff5500] to-[#ff7733] flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">miracle</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-4 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
              {mode === 'upgrade' ? 'Upgrade your account' : 'Welcome back'}
            </h2>
            <p className="text-xs text-slate-500">
              {mode === 'upgrade'
                ? 'Sign in to sync guest workflows to your persistent account'
                : 'Sign in to access your workspaces, agents, and pipelines'}
            </p>
          </div>

          {/* Upgrade Banner */}
          {mode === 'upgrade' && (
            <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-xs text-amber-950">Upgrade Guest Session</p>
                <p className="mt-0.5 text-amber-800/80 leading-relaxed text-[11px]">
                  Sign in with Google to preserve all projects and workflows created in this session.
                </p>
              </div>
            </div>
          )}

          {/* Auth Action Flow */}
          <div className="flex flex-col gap-2.5">
            {/* Primary OAuth: Google */}
            <GoogleSignInButton mode="signin" callbackUrl={callbackUrl} />

            {/* Frictionless Guest Access */}
            {mode !== 'upgrade' && (
              <GuestAccessButton callbackUrl={callbackUrl} variant="subtle" />
            )}

            {/* Divider */}
            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Interactive Email/Password Form */}
            <AuthLoginForm callbackUrl={callbackUrl} initialError={errorMessage} />
          </div>

          {/* Create Account Link */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Don&apos;t have an account yet?{' '}
              <Link
                href={`/signup${callbackUrl !== '/dashboard' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                className="font-semibold text-[#ff5500] hover:text-[#e64d00] transition-colors"
              >
                Create one free →
              </Link>
            </p>
          </div>

          {/* Trust Footnote */}
          <div className="mt-4 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span>Enterprise security standards • TLS 1.3 Encryption</span>
            </div>
            <p className="text-[10px] text-slate-400 text-center leading-normal">
              By signing in, you accept our{' '}
              <Link href="/terms" className="underline hover:text-slate-600 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-slate-600 transition-colors">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
