import Link from "next/link"
import { signIn } from "@/auth"
import { Layers, AlertCircle, Sparkles, Zap, Shield, Workflow, CheckCircle2, ArrowRight } from "lucide-react"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button"
import { GuestAccessButton } from "@/components/auth/guest-access-button"
import { SignupPasswordField } from "@/components/auth/signup-password-field"

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = typeof params.error === 'string' ? params.error : undefined
  const callbackUrl = typeof params.callbackUrl === 'string' ? params.callbackUrl : '/dashboard'

  let errorMessage: string | null = null
  if (error === 'EmailInUse') {
    errorMessage = 'An account with that email already exists. Please sign in.'
  } else if (error === 'SignupFailed') {
    errorMessage = 'Unable to complete sign-up. Please try again or sign in with Google.'
  } else if (error) {
    errorMessage = 'An error occurred during registration. Please try again.'
  }

  const features = [
    {
      icon: Zap,
      title: 'Full AI Agent Autonomy',
      desc: 'Let AI orchestrate your entire tech stack from concept to production.',
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      desc: 'TLS 1.3 encryption with tenant-isolated data storage and encrypted credentials.',
    },
    {
      icon: Workflow,
      title: '120+ Native Integrations',
      desc: 'Connect GitHub, PostgreSQL, Notion, Slack, and Figma right out of the box.',
    },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50/60 selection:bg-orange-500/20">
      {/* ═════════════════════════════════════════════════════════════════════════
          LEFT PANEL — Brand Showcase & Value Proposition (Desktop)
         ═════════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[50%] relative overflow-hidden bg-[#070A11] border-r border-slate-800/80">
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
        <div className="relative z-10 flex flex-col justify-between w-full h-full min-h-screen p-10 xl:p-14">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff5500] to-[#ff7733] flex items-center justify-center shadow-lg shadow-orange-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight leading-none group-hover:text-orange-200 transition-colors">
                  miracle
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">
                  AI Operating System
                </span>
              </div>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-slate-300">Free Tier Included</span>
            </div>
          </div>

          {/* Center Content */}
          <div className="my-auto py-8 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" />
              <span className="text-xs font-semibold text-orange-200">
                Join over 2,400+ modern engineering teams
              </span>
            </div>

            <h1 className="text-4xl xl:text-[44px] font-black text-white tracking-tight leading-[1.12] mb-4">
              Start building in{' '}
              <span className="bg-gradient-to-r from-[#ff5500] via-[#ff7e38] to-[#FFB347] bg-clip-text text-transparent">
                seconds
              </span>
              . Zero credit card needed.
            </h1>

            <p className="text-[15px] text-slate-400 leading-relaxed mb-8">
              Experience the power of autonomous AI workflows, full-stack generators, and automated deployments with your free workspace.
            </p>

            {/* Feature Highlights Grid */}
            <div className="flex flex-col gap-3.5">
              {features.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] transition-all group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover/item:bg-orange-500/20 group-hover/item:scale-105 transition-all">
                      <Icon className="w-4.5 h-4.5 text-orange-400" />
                    </div>
                    <div>
                      <h2 className="text-[13px] font-semibold text-slate-200 mb-0.5">
                        {item.title}
                      </h2>
                      <p className="text-xs text-slate-400 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom Social Proof */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
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
                  &ldquo;Miracle is the highest leverage tool we have adopted&rdquo;
                </p>
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Setup</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════
          RIGHT PANEL — Clean Signup Form Card
         ═════════════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-[360px] h-[360px] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-100/30 rounded-full blur-[90px] pointer-events-none" />

        {/* Elevated Card */}
        <div className="w-full max-w-[460px] bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-7 sm:p-9 relative z-10">
          {/* Mobile Brand Header */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-7">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff5500] to-[#ff7733] flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">miracle</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
              Create your account
            </h2>
            <p className="text-xs text-slate-500">
              Get started for free. No credit card required.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200/80 rounded-xl text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
              <span className="leading-relaxed font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Auth Action Flow */}
          <div className="flex flex-col gap-3.5">
            {/* Google Signup */}
            <GoogleSignInButton mode="signup" callbackUrl={callbackUrl} />

            {/* Guest Access */}
            <GuestAccessButton
              callbackUrl={callbackUrl}
              text="Explore as Guest first"
              variant="subtle"
            />

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                  or register with email
                </span>
              </div>
            </div>

            {/* Signup Form */}
            <form
              className="flex flex-col gap-3.5"
              action={async (formData: FormData) => {
                "use server"
                const email = (formData.get("email") as string)?.trim()
                const password = formData.get("password") as string
                const name = (formData.get("name") as string)?.trim()
                const mobileNumber = (formData.get("mobileNumber") as string)?.trim()
                const profession = (formData.get("profession") as string)?.trim()
                if (!email || !password || !name) return

                try {
                  let existingUser: any[] = []
                  try {
                    existingUser = await db
                      .select()
                      .from(users)
                      .where(eq(users.email, email))
                      .limit(1)
                  } catch (dbErr: any) {
                    console.error("Database connection error during signup check:", dbErr.message)
                    redirect("/signup?error=SignupFailed")
                  }

                  if (existingUser && existingUser.length > 0) {
                    redirect("/login?error=EmailInUse")
                  }

                  const hashedPassword = await bcrypt.hash(password, 10)
                  try {
                    await db.insert(users).values({
                      email,
                      password: hashedPassword,
                      name: name,
                      mobileNumber: mobileNumber || null,
                      profession: profession || null,
                    })
                  } catch (dbErr: any) {
                    console.error("Database connection error during signup insert:", dbErr.message)
                    redirect("/signup?error=SignupFailed")
                  }

                  await signIn("credentials", { email, password, redirectTo: callbackUrl })
                } catch (error: unknown) {
                  const err = error as { digest?: string; name?: string; type?: string; message?: string }
                  if (err.digest?.startsWith?.("NEXT_REDIRECT")) {
                    throw error
                  }
                  if (
                    err.name === "AuthError" ||
                    err.name === "CallbackRouteError" ||
                    err.type === "CallbackRouteError"
                  ) {
                    redirect("/signup?error=SignupFailed")
                  }
                  throw error
                }
              }}
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700" htmlFor="signup-name">
                  Full Name
                </label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/25 focus:border-[#ff5500] transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700" htmlFor="signup-email">
                  Work Email
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="alex@company.com"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/25 focus:border-[#ff5500] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700" htmlFor="signup-mobile">
                    Phone (optional)
                  </label>
                  <input
                    id="signup-mobile"
                    name="mobileNumber"
                    type="tel"
                    placeholder="+1 555 019 283"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/25 focus:border-[#ff5500] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700" htmlFor="signup-profession">
                    Role
                  </label>
                  <select
                    id="signup-profession"
                    name="profession"
                    defaultValue="developer"
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ff5500]/25 focus:border-[#ff5500] transition-all cursor-pointer"
                  >
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="founder">Founder / Executive</option>
                    <option value="product_manager">Product Manager</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Password field with visibility toggle */}
              <SignupPasswordField />

              <button
                type="submit"
                className="w-full h-11 mt-1 rounded-xl bg-gradient-to-r from-[#ff5500] to-[#ff661a] hover:from-[#e64d00] hover:to-[#ff5500] text-white font-semibold shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.99] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create free account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link
                href={`/login${callbackUrl !== '/dashboard' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                className="font-semibold text-[#ff5500] hover:text-[#e64d00] transition-colors"
              >
                Sign in →
              </Link>
            </p>
          </div>

          {/* Trust Footnote */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Free tier includes unlimited local drafts</span>
            </div>
            <p className="text-[11px] text-slate-400 text-center leading-normal">
              By creating an account, you accept our{' '}
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
