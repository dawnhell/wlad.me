import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { SHARE_HOST, SHARE_PATH } from './lib/legal/my-beauty-purse'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? ''
  const { pathname, search } = request.nextUrl

  if (host === SHARE_HOST) {
    if (pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = '/beauty-purse-home'
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  if (
    (host === 'wlad.me' || host === 'www.wlad.me') &&
    pathname === SHARE_PATH
  ) {
    return NextResponse.redirect(`https://${SHARE_HOST}${SHARE_PATH}${search}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/share', '/beauty-purse-home'],
}
