import type { ReactElement } from 'react'
import Link from 'next/link'

import LegalDocument from '../../../components/legal/LegalDocument'
import Layout from '../../../components/Layout'
import type { tNextPageWithLayout } from '../../_app'
import {
  APP_DISPLAY_NAME,
  COMPANY_NAME,
  CONTACT_EMAIL,
  LEGAL_ADDRESS_LINES,
  LEGAL_BASE_PATH,
  LEGAL_ENTITY_NAME,
  LEGAL_TAX_ID,
  LEGAL_TAX_ID_LABEL,
  PRODUCT_NAME,
  SUPERVISORY_AUTHORITY_NAME,
  SUPERVISORY_AUTHORITY_URL,
  TERMS_PATH,
} from '../../../lib/legal/my-beauty-purse'

const PrivacyPage: tNextPageWithLayout = () => (
  <LegalDocument title="Privacy Policy" current="privacy">
    <p>
      This Privacy Policy explains how {LEGAL_ENTITY_NAME} (“we”, “us”)
      processes personal data when you use the {APP_DISPLAY_NAME} iOS app
      (product name {PRODUCT_NAME}). It is written to meet Apple App Store
      requirements and the EU General Data Protection Regulation (GDPR).
    </p>

    <h2>Controller</h2>
    <p>
      The data controller is {COMPANY_NAME}.
    </p>
    <p>
      {LEGAL_ADDRESS_LINES.map((line) => (
        <span key={line}>
          {line}
          <br />
        </span>
      ))}
      {LEGAL_TAX_ID_LABEL}: {LEGAL_TAX_ID}
      <br />
      Email:{' '}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </p>

    <h2>What the app does</h2>
    <p>
      {APP_DISPLAY_NAME} lets you keep a private catalog of cosmetics, clothes,
      and fragrance, organise wish and purchase lists, paste a product link so
      we can prefill public page details, set local reminders, and optionally
      publish a read-only snapshot of a list as a web link.
    </p>

    <h2>Personal data we process</h2>
    <ul>
      <li>
        <strong>Sign in with Apple.</strong> Apple user identifier, and if you
        choose to share it, your email. When you publish a list we use the Sign
        in with Apple identity token so only you can create or unpublish that
        snapshot.
      </li>
      <li>
        <strong>Catalog, photos, and lists.</strong> Names, brands, notes,
        product URLs, photos you add, and list contents. This data is stored on
        your device (SwiftData) and, when iCloud is enabled, in your private
        iCloud account via Apple CloudKit. We do not operate a database of your
        closet.
      </li>
      <li>
        <strong>Shared lists.</strong> If you tap Share on a list, a read-only
        snapshot (list title and item names, brands, and product links) is
        stored on Supabase so anyone with the link can open it. Photos from your
        private catalog are not included in that snapshot.
      </li>
      <li>
        <strong>Link prefill.</strong> If you paste a product URL, that address
        is sent to our link-preview function so we can read publicly available
        page metadata (title, image, brand). We do not store the destination
        page.
      </li>
      <li>
        <strong>Purchases.</strong> Subscriptions are sold through Apple In-App
        Purchase. Apple processes payment. The app reads entitlement status on
        your device via StoreKit. We do not receive your full card details and
        we do not send purchase data to a third-party analytics or billing
        vendor.
      </li>
      <li>
        <strong>Notifications.</strong> List reminders are scheduled on your
        device as local notifications. They are not sent from our servers.
      </li>
    </ul>

    <h2>Legal bases (GDPR)</h2>
    <ul>
      <li>
        <strong>Contract</strong> (Art. 6(1)(b)): providing the app, Sign in
        with Apple, CloudKit sync you enable, and the subscription you buy
        through Apple.
      </li>
      <li>
        <strong>Consent</strong> (Art. 6(1)(a)): publishing a shared list, and
        sending a URL for link prefill.
      </li>
      <li>
        <strong>Legitimate interests</strong> (Art. 6(1)(f)): securing the
        share and preview functions, and responding to support email.
      </li>
    </ul>

    <h2>Processors and recipients</h2>
    <ul>
      <li>
        <strong>Apple Inc.</strong> — Sign in with Apple, CloudKit, App Store,
        and In-App Purchase, under Apple’s terms and privacy policy.
      </li>
      <li>
        <strong>Supabase</strong> — hosting for shared-list snapshots and the
        link-preview / publish Edge Functions.
      </li>
    </ul>
    <p>
      We do not sell your personal data. We do not use your catalog for
      advertising or tracking across other companies’ apps or websites.
    </p>

    <h2>Retention</h2>
    <p>
      On-device and iCloud catalog data remains until you delete items or the
      app, or until you delete it in iCloud. Shared-list snapshots remain until
      you unpublish them in the app or we delete them after a valid request.
      Link-preview requests are processed to return metadata and are not kept as
      a browsing history. Support emails are kept only as long as needed to
      handle your request.
    </p>

    <h2>International transfers</h2>
    <p>
      Apple and Supabase may process data outside the European Economic Area.
      Where that happens, it is under those providers’ contractual safeguards
      (including Standard Contractual Clauses where applicable).
    </p>

    <h2>Your rights</h2>
    <p>
      If GDPR applies, you may request access, rectification, erasure,
      restriction, objection, or portability, and you may withdraw consent
      (for example by unpublishing a list). To exercise these rights, email{' '}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
    </p>
    <p>
      You also have the right to lodge a complaint with the{' '}
      <a
        href={SUPERVISORY_AUTHORITY_URL}
        target="_blank"
        rel="noreferrer"
      >
        {SUPERVISORY_AUTHORITY_NAME}
      </a>
      .
    </p>

    <h2>Deletion and Sign Out</h2>
    <p>
      Sign Out in the app Settings tab clears the Sign in with Apple session
      stored by {APP_DISPLAY_NAME}. It does not erase your catalog or lists on
      the iPhone or in iCloud. Delete items in the app, or offload/delete the
      app and manage iCloud data, to remove that content. Email us to request
      deletion of any shared-list snapshot or Apple user identifier we store
      for publishing.
    </p>

    <h2>Children</h2>
    <p>
      {APP_DISPLAY_NAME} is not directed at children under 16. We do not
      knowingly collect personal data from children.
    </p>

    <h2>This website</h2>
    <p>
      These legal pages are hosted on wlad.me. Analytics scripts used on the
      rest of the portfolio are not loaded on /legal routes. This policy
      describes the {APP_DISPLAY_NAME} app, not unrelated products on the
      homepage.
    </p>

    <h2>Changes</h2>
    <p>
      We may update this policy. The date at the top will change when we do.
      Continued use of the app after an update means you should review the new
      text.
    </p>

    <p>
      Related:{' '}
      <Link href={TERMS_PATH}>Terms of Use</Link>
      {' · '}
      <Link href={LEGAL_BASE_PATH}>Support</Link>
    </p>
  </LegalDocument>
)

PrivacyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title={`Privacy Policy · ${APP_DISPLAY_NAME}`}
      description={`Privacy Policy for the ${APP_DISPLAY_NAME} iOS app, including CloudKit, Sign in with Apple, and subscriptions.`}
      mainAlign="start"
    >
      {page}
    </Layout>
  )
}

export default PrivacyPage
