import ShareChrome from '../components/beauty-purse/ShareChrome'
import {
  APP_DISPLAY_NAME,
  LEGAL_BASE_PATH,
  PRIVACY_PATH,
  TERMS_PATH,
} from '../lib/legal/my-beauty-purse'

const BeautyPurseHome = () => (
  <ShareChrome
    title={APP_DISPLAY_NAME}
    description="A private beauty and fashion catalog for iPhone."
    noindex={false}
  >
    <p className="eyebrow">iOS app</p>
    <h1>{APP_DISPLAY_NAME}</h1>
    <p className="muted">
      Keep every lipstick, scent, and silk piece in one private closet. Shared
      lists from the app open here.
    </p>
    <p className="muted">
      <a href={`https://wlad.me${LEGAL_BASE_PATH}`}>Support</a>
      {' · '}
      <a href={`https://wlad.me${PRIVACY_PATH}`}>Privacy</a>
      {' · '}
      <a href={`https://wlad.me${TERMS_PATH}`}>Terms</a>
    </p>
  </ShareChrome>
)

export default BeautyPurseHome
