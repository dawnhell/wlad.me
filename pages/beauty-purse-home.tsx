import ShareChrome, {
  shareStyles as styles,
} from '../components/beauty-purse/ShareChrome'
import {
  APP_DISPLAY_NAME,
  LEGAL_BASE_PATH,
} from '../lib/legal/my-beauty-purse'
import { SITE_URL } from '../lib/site'

const BeautyPurseHome = () => (
  <ShareChrome
    title={APP_DISPLAY_NAME}
    description="A private beauty and fashion catalog for iPhone."
    noindex={false}
  >
    <div className={styles.kicker}>
      <span className={styles.pill}>iOS app</span>
    </div>
    <h1 className={styles.title}>{APP_DISPLAY_NAME}</h1>
    <p className={styles.lede}>
      Keep every lipstick, scent, and silk piece in one private closet. Shared
      lists from the app open on this page.
    </p>
    <p className={styles.lede}>
      <a className={styles.link} href={`${SITE_URL}${LEGAL_BASE_PATH}`}>
        Support
      </a>
    </p>
  </ShareChrome>
)

export default BeautyPurseHome
