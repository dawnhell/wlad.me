import type { ReactElement } from 'react'
import Link from 'next/link'

import LegalDocument from '../../../components/legal/LegalDocument'
import Layout from '../../../components/Layout'
import type { tNextPageWithLayout } from '../../_app'
import {
  APP_DISPLAY_NAME,
  COMPANY_NAME,
  CONTACT_EMAIL,
  DISPUTE_VENUE,
  GOVERNING_LAW_LABEL,
  LEGAL_ADDRESS,
  LEGAL_BASE_PATH,
  LEGAL_ENTITY_NAME,
  MONTHLY_PRICE,
  MONTHLY_PRODUCT_ID,
  PRIVACY_PATH,
  PRODUCT_NAME,
  TRIAL_DAYS,
  YEARLY_PRICE,
  YEARLY_PRODUCT_ID,
} from '../../../lib/legal/my-beauty-purse'

const TermsPage: tNextPageWithLayout = () => (
  <LegalDocument title="Terms of Use" current="terms">
    <p>
      These Terms of Use (“Terms”) govern your use of the {APP_DISPLAY_NAME}{' '}
      iOS application (product name {PRODUCT_NAME}), published by{' '}
      {LEGAL_ENTITY_NAME}. By downloading or using the app you agree to these
      Terms. If you do not agree, do not use the app.
    </p>

    <h2>The service</h2>
    <p>
      {APP_DISPLAY_NAME} is a personal catalog and list app. Your catalog and
      lists are stored on your device and, if you enable iCloud, in your private
      iCloud account. Optional features include pasting a product URL for
      public-metadata prefill, local reminder notifications, and publishing a
      read-only web snapshot of a list.
    </p>

    <h2>Account</h2>
    <p>
      You sign in with Apple. You are responsible for the Apple ID you use and
      for content you add. The app is licensed, not sold, to you for personal,
      non-commercial use on Apple-branded devices you own or control, consistent
      with the App Store terms.
    </p>

    <h2>Subscriptions and payments</h2>
    <p>
      Access after the introductory period requires an auto-renewable
      subscription purchased through Apple In-App Purchase. Apple is the
      merchant of record. Payment is charged to your Apple ID. We do not process
      card payments ourselves.
    </p>
    <ul>
      <li>
        Monthly Premium ({MONTHLY_PRODUCT_ID}): {MONTHLY_PRICE} per month, with
        a {`${TRIAL_DAYS}-day`} free trial.
      </li>
      <li>
        Yearly Premium ({YEARLY_PRODUCT_ID}): {YEARLY_PRICE} per year, with a{' '}
        {`${TRIAL_DAYS}-day`} free trial.
      </li>
    </ul>
    <p>
      The trial converts to a paid subscription unless you cancel at least 24
      hours before the trial ends. Subscriptions renew automatically at the then
      current price unless you cancel at least 24 hours before the end of the
      current period. Your account is charged for renewal within 24 hours prior
      to the end of the current period. You can manage or cancel isn iPhone
      Settings (Apple ID → Subscriptions) or via Manage subscription in the
      app. Deleting the app does not cancel the subscription.
    </p>
    <p>
      Prices shown in the App Store may vary by country and tax. If you already
      subscribed, use Restore purchases instead of buying again.
    </p>

    <h2>Shared lists</h2>
    <p>
      A published list is a public snapshot. Anyone with the link can view it
      until you unpublish it. Do not include information you are not willing to
      make public. We may remove a snapshot that is unlawful or abusive.
    </p>

    <h2>Acceptable use</h2>
    <p>
      You may not misuse the link-preview or sharing features (including
      attempting to attack, scrape at abusive volume, or publish others’
      personal data without a legal basis). You must comply with applicable law.
    </p>

    <h2>Intellectual property</h2>
    <p>
      We and our licensors own the app, name, and design. You retain rights in
      content you add. Product names and images you import from third-party
      sites remain those parties’ property; the app only helps you keep a
      personal record.
    </p>

    <h2>Disclaimer</h2>
    <p>
      The app is provided “as is”. Link prefill depends on public web pages and
      may be incomplete or unavailable. We do not warrant uninterrupted service.
      To the maximum extent permitted by {GOVERNING_LAW_LABEL}, we disclaim
      implied warranties of merchantability and fitness for a particular
      purpose.
    </p>

    <h2>Liability</h2>
    <p>
      Nothing in these Terms limits liability that cannot be limited under
      applicable law (including for fraud or personal injury). Otherwise,{' '}
      {COMPANY_NAME} is not liable for indirect or consequential loss, or for
      loss of data stored only on your device or iCloud, beyond what mandatory
      consumer law allows.
    </p>

    <h2>Privacy</h2>
    <p>
      How we process personal data is described in the{' '}
      <Link href={PRIVACY_PATH}>Privacy Policy</Link>.
    </p>

    <h2>Changes and termination</h2>
    <p>
      We may update these Terms. The date at the top will change when we do.
      We may stop offering the app or a feature. You may stop using the app at
      any time; cancel the Apple subscription separately if you no longer want
      to be charged.
    </p>

    <h2>Governing law</h2>
    <p>
      These Terms are governed by {GOVERNING_LAW_LABEL}, without prejudice to
      mandatory consumer protections in your country of residence. Disputes
      shall be submitted to {DISPUTE_VENUE}, except where the law requires
      otherwise.
    </p>

    <h2>Contact</h2>
    <p>
      {COMPANY_NAME}
      <br />
      {LEGAL_ADDRESS}
      <br />
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </p>

    <p>
      Related:{' '}
      <Link href={PRIVACY_PATH}>Privacy Policy</Link>
      {' · '}
      <Link href={LEGAL_BASE_PATH}>Support</Link>
    </p>
  </LegalDocument>
)

TermsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title={`Terms of Use · ${APP_DISPLAY_NAME}`}
      description={`Terms of Use for the ${APP_DISPLAY_NAME} iOS app, including auto-renewable subscriptions.`}
      mainAlign="start"
    >
      {page}
    </Layout>
  )
}

export default TermsPage
