import type { Metadata } from 'next'
import Link from 'next/link'
import { Cookie, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Learn about the cookies and local storage used by miracle.dev, their purpose, duration, and your choices regarding them.',
  alternates: { canonical: '/cookie-policy' },
}

export default function CookiePolicyPage() {
  const lastUpdated = 'October 1, 2026'

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* Header */}
      <div className="bg-[#070A11] border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to miracle
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <Cookie className="w-5 h-5 text-orange-400" />
            </div>
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
              Legal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-3 text-slate-400 text-sm">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
        <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
          <p className="lead text-lg text-slate-600">
            This Cookie Policy explains what cookies and similar technologies
            miracle (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses on{' '}
            <strong>miracle.dev</strong>, why we use them, and your choices
            regarding their use.
          </p>

          <hr className="my-8 border-slate-200" />

          <h2 id="what-are-cookies">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device by websites you
            visit. They are widely used to make websites work efficiently, as
            well as to provide reporting information. &quot;Local storage&quot; refers to
            data stored in your browser&apos;s Web Storage API, which persists until
            explicitly cleared.
          </p>

          <h2 id="cookies-we-use">2. Cookies & Storage We Use</h2>
          <p>
            We use only <strong>strictly necessary</strong> cookies required
            for the Service to function. We do not currently use analytics,
            advertising, or marketing cookies.
          </p>

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Type</th>
                <th className="text-left">Purpose</th>
                <th className="text-left">Duration</th>
                <th className="text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>auth_access_token</code>
                </td>
                <td>HTTP Cookie</td>
                <td>
                  Authenticates your session and verifies your identity on each
                  request.
                </td>
                <td>15 minutes</td>
                <td>Strictly Necessary</td>
              </tr>
              <tr>
                <td>
                  <code>auth_refresh_token</code>
                </td>
                <td>HTTP Cookie</td>
                <td>
                  Renews your session without requiring re-login. Extends your
                  authentication securely.
                </td>
                <td>7 days</td>
                <td>Strictly Necessary</td>
              </tr>
              <tr>
                <td>
                  <code>authjs.session-token</code>
                </td>
                <td>HTTP Cookie</td>
                <td>
                  Manages OAuth-based sessions (Google / GitHub sign-in).
                </td>
                <td>Session / 30 days</td>
                <td>Strictly Necessary</td>
              </tr>
              <tr>
                <td>
                  <code>miracle_prompt_query</code>
                </td>
                <td>Local Storage</td>
                <td>
                  Preserves your draft prompt text so it isn&apos;t lost if you
                  navigate away before submitting.
                </td>
                <td>Until manually cleared</td>
                <td>Functional (User Convenience)</td>
              </tr>
            </tbody>
          </table>

          <h2 id="security">3. Cookie Security</h2>
          <p>All authentication cookies are configured with:</p>
          <ul>
            <li>
              <strong>HttpOnly:</strong> Cannot be accessed by JavaScript,
              mitigating XSS attacks.
            </li>
            <li>
              <strong>Secure:</strong> Only transmitted over encrypted HTTPS
              connections.
            </li>
            <li>
              <strong>SameSite=Lax:</strong> Provides CSRF protection while
              allowing normal navigation flows.
            </li>
          </ul>

          <h2 id="third-party">4. Third-Party Cookies</h2>
          <p>
            We do not currently embed third-party analytics, advertising, or
            social media tracking scripts. No third-party cookies are set by
            miracle.dev.
          </p>
          <p>
            If we introduce third-party cookies in the future (e.g., Google
            Analytics, PostHog), this policy will be updated and an opt-in
            consent mechanism will be implemented prior to setting those cookies.
          </p>

          <h2 id="consent">5. Your Consent & Choices</h2>
          <p>
            Under the EU ePrivacy Directive (Article 5(3)), strictly necessary
            cookies do not require prior opt-in consent, as they are essential
            for the service you have requested. However, you always have the
            right to:
          </p>
          <ul>
            <li>
              <strong>Delete cookies:</strong> Clear cookies through your
              browser settings at any time.
            </li>
            <li>
              <strong>Block cookies:</strong> Configure your browser to reject
              cookies. Note that blocking strictly necessary cookies will prevent
              you from logging in to miracle.
            </li>
            <li>
              <strong>Clear local storage:</strong> Use your browser&apos;s Developer
              Tools (Application → Local Storage) to remove stored data.
            </li>
          </ul>

          <h2 id="changes">6. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy to reflect changes in our
            practices or for regulatory reasons. We will post the revised
            policy on this page with an updated &quot;Last updated&quot; date.
          </p>

          <h2 id="contact">7. Contact Us</h2>
          <p>
            For questions about our use of cookies, contact us:
          </p>
          <ul>
            <li>
              <a href="mailto:privacy@miracle.dev">privacy@miracle.dev</a>
            </li>
          </ul>

          <hr className="my-8 border-slate-200" />

          <p className="text-sm text-slate-500">
            See also:{' '}
            <Link href="/privacy">Privacy Policy</Link> •{' '}
            <Link href="/terms">Terms of Service</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
