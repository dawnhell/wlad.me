import type { GetServerSideProps } from 'next'

import ShareChrome from '../components/beauty-purse/ShareChrome'
import { SHARE_API_URL, SHARE_PAGE_URL } from '../lib/legal/my-beauty-purse'

type Item = {
  name?: string
  brand?: string
  url?: string
}

type SharePageProps = {
  title: string
  listType: string
  items: Item[]
  missing: boolean
  token: string
}

const isToken = (value: string) => /^[a-zA-Z0-9]{1,32}$/.test(value)

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
      <>
        <p className="eyebrow">Beauty Purse</p>
        <h1>List unavailable</h1>
        <p className="muted">This list is private or no longer shared.</p>
      </>
    ) : (
      <>
        <p className="eyebrow">
          {listType} · Beauty Purse
        </p>
        <h1>{title}</h1>
        <section>
          {items.length === 0 ? (
            <p className="muted">This list is empty.</p>
          ) : (
            items.map((item, index) => (
              <article className="item" key={`${item.name ?? 'item'}-${index}`}>
                <h2>{item.name || 'Untitled'}</h2>
                {item.brand ? <div className="brand">{item.brand}</div> : null}
                {item.url ? (
                  <a href={item.url} rel="noreferrer">
                    View product
                  </a>
                ) : null}
              </article>
            ))
          )}
        </section>
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
