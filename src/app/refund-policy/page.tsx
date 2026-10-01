import type { Metadata } from 'next'
import Link from 'next/link'
import { CreditCard, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'miracle refund policy, cancellation procedures, auto-renewal disclosures, and pro-rata adjustment details for all subscription tiers.',
  alternates: { canonical: '/refund-policy' },
}

export default function RefundPolicyPage() {
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
            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
              <CreditCard className="w-5 h-5 text-violet-400" />
            </div>
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">
              Legal
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Refund & Cancellation Policy
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
            This Refund & Cancellation Policy applies to all paid subscription
            plans offered by miracle at <strong>miracle.dev</strong>. We want you
            to be satisfied with our service, and we aim to make cancellation
            and refund processes straightforward and transparent.
          </p>

          <hr className="my-8 border-slate-200" />

          <h2 id="auto-renewal">1. Auto-Renewal Disclosure</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4 text-sm text-blue-800">
            <strong>Automatic Renewal Notice:</strong> All paid subscription
            plans automatically renew each month at the then-current rate
            unless you cancel before the renewal date. You authorize us to
            charge your payment method on file for each renewal period until
            you cancel.
          </div>
          <p>
            Upon subscribing, you will receive a confirmation email containing:
          </p>
          <ul>
            <li>Your subscription plan name and monthly rate</li>
            <li>Auto-renewal terms and next billing date</li>
            <li>Clear instructions on how to cancel</li>
          </ul>

          <h2 id="cancellation">2. How to Cancel</h2>
          <p>
            You can cancel your subscription at any time through one of the
            following methods:
          </p>
          <ol>
            <li>
              <strong>Self-Service (Recommended):</strong> Navigate to{' '}
              <strong>Account Settings → Billing → Cancel Subscription</strong>.
              Your cancellation will be processed immediately.
            </li>
            <li>
              <strong>Email:</strong> Send a cancellation request to{' '}
              <a href="mailto:billing@miracle.dev">billing@miracle.dev</a> with
              your account email. We will process your request within 2 business
              days.
            </li>
          </ol>
          <p>
            <strong>Important:</strong> Cancellation takes effect at the end of
            your current billing period. You will retain full access to your
            plan features until that date.
          </p>

          <h2 id="refund-eligibility">3. Refund Eligibility</h2>
          <h3>3.1 Within 7 Days of First Purchase</h3>
          <p>
            If you are a first-time subscriber and are unsatisfied with the
            Service, you may request a full refund of your first monthly
            payment within <strong>7 calendar days</strong> of your initial
            purchase. One-time setup fees are non-refundable.
          </p>

          <h3>3.2 After 7 Days / Renewal Charges</h3>
          <p>
            After the 7-day window, or for any renewal charges, refunds are
            generally not available. However, we may grant discretionary
            refunds or credits in cases of:
          </p>
          <ul>
            <li>Extended service outages (more than 48 consecutive hours)</li>
            <li>Billing errors or duplicate charges</li>
            <li>
              Documented failure of core service features despite following our
              troubleshooting guides
            </li>
          </ul>

          <h3>3.3 Setup Fees</h3>
          <p>
            One-time setup fees charged at the time of initial subscription are
            <strong> non-refundable</strong>, as they cover onboarding,
            configuration, and initial account provisioning.
          </p>

          <h2 id="how-to-request">4. How to Request a Refund</h2>
          <p>
            To request a refund, email{' '}
            <a href="mailto:billing@miracle.dev">billing@miracle.dev</a> with:
          </p>
          <ul>
            <li>Your account email address</li>
            <li>Date of the charge in question</li>
            <li>Reason for your refund request</li>
          </ul>
          <p>
            We will review your request and respond within{' '}
            <strong>5 business days</strong>. Approved refunds are processed to
            your original payment method within 5–10 business days.
          </p>

          <h2 id="downgrades">5. Plan Downgrades</h2>
          <p>
            If you downgrade to a lower-tier plan, the new rate takes effect at
            the start of your next billing cycle. No pro-rata refunds are
            issued for the remainder of the current higher-tier billing period.
          </p>

          <h2 id="eu-withdrawal">6. EU Right of Withdrawal</h2>
          <p>
            Under the EU Consumer Rights Directive (2011/83/EU), EU consumers
            have a 14-day right of withdrawal for online purchases. However,
            by subscribing and immediately accessing digital content, you
            expressly consent to the immediate performance of the Service and
            acknowledge that you lose your right of withdrawal upon first use.
          </p>
          <p>
            Notwithstanding the above, we still honor our 7-day refund policy
            (Section 3.1) for first-time subscribers regardless of location.
          </p>

          <h2 id="account-deletion">7. Account Deletion After Cancellation</h2>
          <p>
            After cancellation, your account and data will remain accessible in
            read-only mode for <strong>30 days</strong>. After 30 days, your
            account and all associated data (projects, prompts, files) will be
            permanently deleted. If you wish to export your data, do so before
            the 30-day window closes or contact{' '}
            <a href="mailto:privacy@miracle.dev">privacy@miracle.dev</a> for
            a data export.
          </p>

          <h2 id="changes">8. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes will be posted
            on this page with an updated date. Material changes will be
            communicated via email to active subscribers.
          </p>

          <h2 id="contact">9. Contact</h2>
          <p>Questions about billing, refunds, or cancellations?</p>
          <ul>
            <li>
              <strong>Billing:</strong>{' '}
              <a href="mailto:billing@miracle.dev">billing@miracle.dev</a>
            </li>
            <li>
              <strong>Support:</strong>{' '}
              <a href="mailto:support@miracle.dev">support@miracle.dev</a>
            </li>
          </ul>

          <hr className="my-8 border-slate-200" />

          <p className="text-sm text-slate-500">
            See also:{' '}
            <Link href="/terms">Terms of Service</Link> •{' '}
            <Link href="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
