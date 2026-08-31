export const PRODUCT_NAME = 'MyBeautyPurse'
export const APP_DISPLAY_NAME = 'Beauty Purse'
export const LEGAL_ENTITY_NAME = 'Szara Sowa Development - Władysław Kłaczkow'
export const COMPANY_NAME = LEGAL_ENTITY_NAME
export const LEGAL_TAX_ID_LABEL = 'Tax ID (NIP)'
export const LEGAL_TAX_ID = '5272964677'
export const CONTACT_EMAIL = 'wlad@wlad.me'

export const LEGAL_STREET_ADDRESS = 'Stefana Batorego 18/108'
export const LEGAL_POSTAL_CODE = '02-591'
export const LEGAL_CITY = 'Warszawa'
export const LEGAL_COUNTRY = 'Poland'
export const LEGAL_ADDRESS_LINES = [
  LEGAL_STREET_ADDRESS,
  `${LEGAL_POSTAL_CODE} ${LEGAL_CITY}`,
  LEGAL_COUNTRY,
] as const
export const LEGAL_ADDRESS = LEGAL_ADDRESS_LINES.join(', ')

export const JURISDICTION = 'Poland'
export const GOVERNING_LAW_LABEL = 'the laws of Poland'
export const DISPUTE_VENUE = 'the common courts in Warsaw, Poland'

export const SUPERVISORY_AUTHORITY_NAME =
  'President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych)'
export const SUPERVISORY_AUTHORITY_URL = 'https://uodo.gov.pl/'

export const LAST_UPDATED = '29 August 2026'

export const LEGAL_BASE_PATH = '/legal/my-beauty-purse'
export const PRIVACY_PATH = `${LEGAL_BASE_PATH}/privacy`
export const TERMS_PATH = `${LEGAL_BASE_PATH}/terms`

export const SHARE_HOST = 'beauty-purse.wlad.me'
export const SHARE_ORIGIN = `https://${SHARE_HOST}`
export const SHARE_PATH = '/share'
export const SHARE_PAGE_URL = `${SHARE_ORIGIN}${SHARE_PATH}`
export const SHARE_API_URL =
  process.env.BEAUTY_PURSE_SHARE_API ??
  'https://brcjrwjozkiakjrttcjw.supabase.co/functions/v1/share-page'

export const MONTHLY_PRICE = '$3.99'
export const YEARLY_PRICE = '$29.99'
export const TRIAL_DAYS = 7

export const MONTHLY_PRODUCT_ID = 'com.mybeautypurse.premium.monthly'
export const YEARLY_PRODUCT_ID = 'com.mybeautypurse.premium.yearly'
