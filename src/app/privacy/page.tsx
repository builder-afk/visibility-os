import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how miracle collects, uses, and protects your personal data. Covers GDPR, CCPA/CPRA, and international privacy obligations.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPolicyPage() {
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
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Legal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Privacy Policy
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
            miracle (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you use our website and services at{' '}
            <strong>miracle.dev</strong>.
          </p>

          <hr className="my-8 border-slate-200" />

          <h2 id="data-controller">1. Data Controller</h2>
          <p>
            For the purposes of the EU General Data Protection Regulation
            (&quot;GDPR&quot;), the data controller is:
          </p>
          <ul>
            <li>
              <strong>Entity:</strong> miracle (operating as miracle.dev)
            </li>
            <li>
              <strong>Contact:</strong>{' '}
              <a href="mailto:privacy@miracle.dev">privacy@miracle.dev</a>
            </li>
          </ul>

          <h2 id="data-collected">2. Information We Collect</h2>
          <h3>2.1 Account Data</h3>
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Full name and email address</li>
            <li>Phone number (optional, if provided)</li>
            <li>Role / profession (optional, if provided)</li>
            <li>
              Third-party OAuth identifiers (Google account ID, GitHub account
              ID) and profile pictures
            </li>
          </ul>

          <h3>2.2 Project & Usage Data</h3>
          <p>When you use our services, we collect:</p>
          <ul>
            <li>
              Project ideas, prompt text, selected tech stack preferences, and
              generated architecture outputs
            </li>
            <li>Feature selections and configuration preferences</li>
          </ul>

          <h3>2.3 Contact Inquiries</h3>
          <p>
            When you submit a contact form, we collect your name, email,
            company, mobile number, and the content of your message.
          </p>

          <h3>2.4 Technical Data</h3>
          <p>We automatically collect:</p>
          <ul>
            <li>IP address (used for rate limiting and security)</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and timestamps</li>
          </ul>

          <h2 id="legal-basis">3. Legal Basis for Processing (GDPR)</h2>
          <p>
            We process your personal data under the following legal bases
            (GDPR Art. 6):
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Purpose</th>
                <th className="text-left">Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account creation & service delivery</td>
                <td>Contractual necessity (Art. 6(1)(b))</td>
              </tr>
              <tr>
                <td>Security, rate limiting, fraud prevention</td>
                <td>Legitimate interests (Art. 6(1)(f))</td>
              </tr>
              <tr>
                <td>Marketing communications</td>
                <td>Consent (Art. 6(1)(a))</td>
              </tr>
              <tr>
                <td>Legal compliance</td>
                <td>Legal obligation (Art. 6(1)(c))</td>
              </tr>
            </tbody>
          </table>

          <h2 id="third-parties">4. Third-Party Data Processors</h2>
          <p>
            We share your data with the following categories of service
            providers, each bound by Data Processing Agreements:
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Processor</th>
                <th className="text-left">Purpose</th>
                <th className="text-left">Data Shared</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Neon (Database)</td>
                <td>Data storage</td>
                <td>All account and project data</td>
              </tr>
              <tr>
                <td>OpenAI</td>
                <td>AI content generation</td>
                <td>Prompt text and project context</td>
              </tr>
              <tr>
                <td>Google Cloud</td>
                <td>OAuth authentication</td>
                <td>OAuth identifiers</td>
              </tr>
              <tr>
                <td>GitHub</td>
                <td>OAuth authentication</td>
                <td>OAuth identifiers</td>
              </tr>
              <tr>
                <td>Vercel</td>
                <td>Hosting & CDN</td>
                <td>Technical/request data</td>
              </tr>
            </tbody>
          </table>

          <h2 id="data-transfers">5. International Data Transfers</h2>
          <p>
            Your data may be transferred to and processed in the United States
            and other countries. We rely on Standard Contractual Clauses (SCCs)
            and the EU-US Data Privacy Framework where applicable to ensure
            adequate protection.
          </p>

          <h2 id="data-retention">6. Data Retention</h2>
          <ul>
            <li>
              <strong>Account data:</strong> Retained for the duration of your
              active account, plus 30 days after deletion for backup recovery.
            </li>
            <li>
              <strong>Project & prompt data:</strong> Retained for the duration
              of your account. Deleted within 30 days of account closure.
            </li>
            <li>
              <strong>Contact inquiries:</strong> Retained for up to 12 months
              from the date of submission.
            </li>
            <li>
              <strong>Technical logs:</strong> Retained for up to 90 days for
              security and debugging purposes.
            </li>
          </ul>

          <h2 id="your-rights">7. Your Rights</h2>
          <p>
            Under GDPR, CCPA/CPRA, and other applicable privacy laws, you
            have the following rights:
          </p>
          <ul>
            <li>
              <strong>Right of Access (GDPR Art. 15):</strong> Request a copy of
              all personal data we hold about you.
            </li>
            <li>
              <strong>Right to Rectification (Art. 16):</strong> Correct
              inaccurate personal data.
            </li>
            <li>
              <strong>Right to Erasure (Art. 17):</strong> Request deletion of
              your personal data (&quot;Right to Be Forgotten&quot;).
            </li>
            <li>
              <strong>Right to Data Portability (Art. 20):</strong> Receive your
              data in a structured, machine-readable format.
            </li>
            <li>
              <strong>Right to Object (Art. 21):</strong> Object to processing
              based on legitimate interests.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Where processing is
              based on consent, you may withdraw it at any time.
            </li>
          </ul>
          <p>
            <strong>California Residents (CCPA/CPRA):</strong> You have the
            right to know what personal information is collected, request
            deletion, and opt out of the sale or sharing of personal
            information. We do not sell your personal information.
          </p>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:privacy@miracle.dev">privacy@miracle.dev</a>. We
            will respond within 30 days.
          </p>

          <h2 id="cookies">8. Cookies</h2>
          <p>
            We use strictly necessary cookies for authentication. For full
            details, see our{' '}
            <Link href="/cookie-policy">Cookie Policy</Link>.
          </p>

          <h2 id="children">9. Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under 13 years of age. We
            do not knowingly collect personal data from children under 13. If
            you believe a child has provided us with personal data, please
            contact us at{' '}
            <a href="mailto:privacy@miracle.dev">privacy@miracle.dev</a>.
          </p>

          <h2 id="changes">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you
            of material changes by posting the updated policy on this page with
            a new &quot;Last updated&quot; date. Your continued use of the services after
            changes constitutes acceptance of the updated policy.
          </p>

          <h2 id="contact">11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise
            your data rights, contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@miracle.dev">privacy@miracle.dev</a>
            </li>
            <li>
              <strong>General inquiries:</strong>{' '}
              <a href="mailto:hello@miracle.dev">hello@miracle.dev</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
