import type { GetServerSideProps } from 'next'

import ShareChrome, {
  shareStyles as styles,
} from '../components/beauty-purse/ShareChrome'
import { SHARE_API_URL, SHARE_PAGE_URL } from '../lib/legal/my-beauty-purse'

type Item = {
  name?: string
  brand?: string
  url?: string
  notes?: string
}

type SharePageProps = {
  title: string
  listType: string
  items: Item[]
  missing: boolean
  token: string
}

const isToken = (value: string) => /^[a-zA-Z0-9]{1,32}$/.test(value)

const monogram = (item: Item) => {
  const source = (item.name || item.brand || '?').trim()
  return source.charAt(0).toUpperCase() || '?'
}

const SharePage = ({ title, listType, items, missing, token }: SharePageProps) => (
  <ShareChrome
    title={missing ? 'List unavailable' : title}
    description={
      missing
        ? 'This Beauty Purse list is private or no longer shared.'
        : `${listType} · ${title}`
    }
    canonical={token ? `${SHARE_PAGE_URL}?t=${token}` : SHARE_PAGE_URL}
  >
    {missing ? (
      <div className={styles.empty}>
        <h1 className={styles.title}>List unavailable</h1>
        <p className={styles.lede}>
          This list is private or no longer shared.
        </p>
      </div>
    ) : (
      <>
        <div className={styles.kicker}>
          <span className={styles.pill}>{listType}</span>
          <span className={styles.count}>
            {items.length} {items.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>
          A read-only snapshot from Beauty Purse. Photos stay private.
        </p>
        {items.length === 0 ? (
          <p className={styles.empty}>This list is empty.</p>
        ) : (
          <ul className={styles.list}>
            {items.map((item, index) => (
              <li
                className={styles.card}
                key={`${item.name ?? 'item'}-${index}`}
              >
                <div className={styles.monogram} aria-hidden>
                  {monogram(item)}
                </div>
                <div className={styles.body}>
                  <h2 className={styles.name}>{item.name || 'Untitled'}</h2>
                  {item.brand ? (
                    <p className={styles.brand}>{item.brand}</p>
                  ) : null}
                  {item.notes ? (
                    <p className={styles.notes}>{item.notes}</p>
                  ) : null}
                </div>
                {item.url ? (
                  <a
                    className={styles.link}
                    href={item.url}
                    rel="noreferrer"
                  >
                    View
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </>
    )}
  </ShareChrome>
)

export const getServerSideProps: GetServerSideProps<SharePageProps> = async (
  context,
) => {
  const raw = context.query.t
  const token = typeof raw === 'string' ? raw : ''
  if (!isToken(token)) {
    return {
      props: {
        title: 'List not found',
        listType: '',
        items: [],
        missing: true,
        token: '',
      },
    }
  }

  try {
    const response = await fetch(
      `${SHARE_API_URL}?t=${encodeURIComponent(token)}&format=json`,
      { headers: { Accept: 'application/json' } },
    )
    if (!response.ok) {
      return {
        props: {
          title: 'List unavailable',
          listType: '',
          items: [],
          missing: true,
          token: '',
        },
      }
    }

    const data = (await response.json()) as {
      title?: string
      list_type?: string
      payload?: { items?: Item[] }
    }
    const items = Array.isArray(data.payload?.items) ? data.payload.items : []
    const listType =
      data.list_type === 'purchase' ? 'Purchase list' : 'Wish list'

    return {
      props: {
        title: data.title?.trim() || 'Shared list',
        listType,
        items,
        missing: false,
        token,
      },
    }
  } catch {
    return {
      props: {
        title: 'List unavailable',
        listType: '',
        items: [],
        missing: true,
        token: '',
      },
    }
  }
}

export default SharePage
