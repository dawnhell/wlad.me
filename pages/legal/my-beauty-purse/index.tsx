import type { ReactElement } from 'react'
import Link from 'next/link'

import LegalDocument from '../../../components/legal/LegalDocument'
import Layout from '../../../components/Layout'
import type { tNextPageWithLayout } from '../../_app'
import {
  APP_DISPLAY_NAME,
  COMPANY_NAME,
  CONTACT_EMAIL,
  LEGAL_ADDRESS,
  PRIVACY_PATH,
  TERMS_PATH,
} from '../../../lib/legal/my-beauty-purse'

const SupportPage: tNextPageWithLayout = () => (
  <LegalDocument title="Support" current="support">
    <p>
      {APP_DISPLAY_NAME} is an iOS app for a private beauty and fashion catalog,
      wish lists, and purchase lists. It is published by {COMPANY_NAME}.
    </p>

    <h2>Contact</h2>
    <p>
      Email{' '}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> for questions,
      privacy requests, or help with the app. Please include the Apple ID email
      you use for the App Store if your message is about a subscription.
    </p>
    <p>
      Postal correspondence:{' '}
      <span className="not-italic font-normal">{LEGAL_ADDRESS}</span>.
    </p>

    <h2>Subscriptions</h2>
    <p>
      Payments are processed by Apple. To cancel a trial or subscription, open
      iPhone Settings, tap your name, then Subscriptions, and select{' '}
      {APP_DISPLAY_NAME}. You can also use Manage subscription inside the app
      Settings tab. Cancel at least 24 hours before the current period ends to
      avoid renewal.
    </p>
    <p>
      If you reinstall the app or get a new device, use Restore purchases on the
      paywall or in Settings.
    </p>

    <h2>Your data</h2>
    <p>
      Your catalog, photos, and lists stay on your iPhone and, when iCloud is
      on, in your private iCloud account. Signing out of {APP_DISPLAY_NAME} does
      not delete that data.
    </p>
    <p>
      To request deletion of Sign in with Apple records we hold, or to ask us to
      unpublish a shared list if you cannot do it in the app, email{' '}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Shared list links
      are public until you unpublish them.
    </p>

    <h2>Legal</h2>
    <p>
      <Link href={PRIVACY_PATH}>Privacy Policy</Link>
      {' · '}
      <Link href={TERMS_PATH}>Terms of Use</Link>
    </p>
  </LegalDocument>
)

SupportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title={`Support · ${APP_DISPLAY_NAME}`}
      description={`Support, subscriptions, and contact for the ${APP_DISPLAY_NAME} iOS app.`}
      mainAlign="start"
    >
      {page}
    </Layout>
  )
}

export default SupportPage
