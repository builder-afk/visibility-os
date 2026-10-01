import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service governing the use of miracle.dev, including acceptable use, subscription billing, intellectual property, liability, and dispute resolution.',
  alternates: { canonical: '/terms' },
}

export default function TermsOfServicePage() {
  const lastUpdated = 'October 1, 2026'
  const effectiveDate = 'October 1, 2026'

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
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <FileText className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Legal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-slate-400 text-sm">
            Effective date: {effectiveDate} • Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
        <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline">
          <p className="lead text-lg text-slate-600">
            Welcome to miracle. These Terms of Service (&quot;Terms&quot;) constitute a
            legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;)
            and miracle (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or using our
            services at <strong>miracle.dev</strong>, you agree to these Terms.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6 text-sm text-amber-800">
            <strong>Important:</strong> If you do not agree with any part of
            these Terms, you must not use our services. Please read these Terms
            carefully before creating an account.
          </div>

          <hr className="my-8 border-slate-200" />

          <h2 id="eligibility">1. Eligibility</h2>
          <p>
            You must be at least <strong>18 years of age</strong> (or the age of
            legal majority in your jurisdiction) to purchase a subscription. If
            you are between 13 and 18, you may use the Service only with the
            consent and supervision of a parent or legal guardian. The Service is
            not intended for children under 13.
          </p>

          <h2 id="account">2. Account Registration</h2>
          <p>
            To use certain features, you must create an account. You agree to:
          </p>
          <ul>
            <li>Provide accurate, complete, and current information</li>
            <li>Maintain the security of your login credentials</li>
            <li>
              Notify us immediately of any unauthorized access to your account
            </li>
            <li>
              Accept responsibility for all activities under your account
            </li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these Terms or engage in fraudulent activity.
          </p>

          <h2 id="services">3. Description of Services</h2>
          <p>
            miracle provides AI-powered tools for generating application
            architectures, code scaffolding, marketing content, SEO playbooks,
            and related digital outputs. Our services leverage third-party AI
            models to generate content based on your prompts and inputs.
          </p>

          <h2 id="acceptable-use">4. Acceptable Use Policy</h2>
          <p>You agree NOT to use miracle to:</p>
          <ul>
            <li>Generate malicious code, malware, or exploit kits</li>
            <li>Produce content that promotes violence, harassment, or hate speech</li>
            <li>Create deceptive or fraudulent materials</li>
            <li>Violate any applicable laws, regulations, or third-party rights</li>
            <li>Attempt to reverse-engineer, decompile, or extract our source code</li>
            <li>Circumvent rate limits, security measures, or access controls</li>
            <li>Resell or sublicense access to our services without written authorization</li>
          </ul>
          <p>
            Violation of the Acceptable Use Policy may result in immediate
            account termination without refund.
          </p>

          <h2 id="ai-outputs">5. AI-Generated Content & Intellectual Property</h2>
          <h3>5.1 Ownership of Outputs</h3>
          <p>
            To the maximum extent permitted by applicable law, miracle assigns
            to you all its rights, title, and interest in and to the outputs
            generated specifically for you through the Service (&quot;Outputs&quot;).
          </p>

          <h3>5.2 Limitations & Disclaimer</h3>
          <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 my-4 text-sm">
            <p className="m-0">
              <strong>You acknowledge that:</strong>
            </p>
            <ul className="mt-2 mb-0">
              <li>
                AI-generated outputs may not be eligible for copyright protection
                under applicable law (per U.S. Copyright Office guidance, March
                2023).
              </li>
              <li>
                Outputs are not guaranteed to be unique, original, or free of
                third-party intellectual property claims.
              </li>
              <li>
                You are solely responsible for reviewing, testing, and validating
                all Outputs before deploying them in production.
              </li>
              <li>
                miracle makes no representations that Outputs will be error-free,
                secure, or fit for any particular purpose.
              </li>
            </ul>
          </div>

          <h3>5.3 Your Content</h3>
          <p>
            You retain all rights to the prompts, project ideas, and other
            content you submit (&quot;Your Content&quot;). By submitting Your Content, you
            grant us a limited, non-exclusive license to process it for the
            purpose of delivering the Service.
          </p>

          <h2 id="billing">6. Subscription & Billing</h2>
          <h3>6.1 Pricing</h3>
          <p>
            Paid plans are billed on a monthly recurring basis at the rates
            displayed on our pricing page. Prices are subject to change with 30
            days&apos; advance notice.
          </p>

          <h3>6.2 Auto-Renewal</h3>
          <p>
            <strong>
              Subscriptions renew automatically each month at the stated rate
              unless cancelled prior to the renewal date.
            </strong>{' '}
            You may cancel anytime from your Billing Settings. Cancellation
            takes effect at the end of the current billing period.
          </p>

          <h3>6.3 Refunds</h3>
          <p>
            Please see our{' '}
            <Link href="/refund-policy">Refund & Cancellation Policy</Link> for
            details on refunds, cancellation procedures, and pro-rata
            adjustments.
          </p>

          <h2 id="disclaimers">7. Disclaimers</h2>
          <h3>7.1 No Professional Advice</h3>
          <p>
            Outputs are for <strong>informational and conceptual purposes only</strong>.
            You must conduct independent engineering and security audits before
            deploying software into production. Projections, SEO estimates, and
            advertising strategies do not guarantee financial returns or search
            engine rankings.
          </p>

          <h3>7.2 Service &quot;As Is&quot;</h3>
          <p>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
            WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR
            OTHERWISE, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>

          <h2 id="liability">8. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, MIRACLE SHALL NOT BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL,
            ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
          </p>
          <p>
            OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING FROM OR
            RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNTS
            YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
          </p>

          <h2 id="indemnification">9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless miracle and its
            affiliates from any claims, damages, losses, or expenses arising
            from: (a) your use of the Service; (b) your violation of these
            Terms; (c) your use or publication of AI-generated Outputs; or (d)
            your infringement of any third-party rights.
          </p>

          <h2 id="termination">10. Termination</h2>
          <p>
            We may suspend or terminate your access to the Service at any time,
            with or without cause, upon reasonable notice. Upon termination,
            your right to use the Service ceases immediately. Sections 5, 7, 8,
            9, and 11 survive termination.
          </p>

          <h2 id="governing-law">11. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms are governed by the laws of the State of Delaware,
            United States, without regard to conflict of law principles. Any
            disputes arising from these Terms shall be resolved through binding
            arbitration in accordance with the rules of the American Arbitration
            Association (AAA). You agree to waive any right to participate in a
            class action lawsuit or class-wide arbitration.
          </p>

          <h2 id="changes">12. Changes to These Terms</h2>
          <p>
            We may update these Terms periodically. Material changes will be
            communicated via email or a prominent notice on the Service. Your
            continued use after changes take effect constitutes acceptance.
          </p>

          <h2 id="contact">13. Contact</h2>
          <p>
            Questions about these Terms? Contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:legal@miracle.dev">legal@miracle.dev</a>
            </li>
            <li>
              <strong>General:</strong>{' '}
              <a href="mailto:hello@miracle.dev">hello@miracle.dev</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
