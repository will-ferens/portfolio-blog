import { NextRequest, NextResponse } from 'next/server'
import { XMLParser } from 'fast-xml-parser'
import type { FeedItem, FeedResponse } from '@/lib/bookshelf'

const LETTERBOXD_USERNAME = process.env.LETTERBOXD_USERNAME ?? 'localhost3k'
const GOODREADS_USER_ID   = process.env.GOODREADS_USER_ID   ?? '161597075-will'
const LASTFM_API_KEY      = process.env.LASTFM_API_KEY      ?? ''
const LASTFM_USERNAME     = process.env.LASTFM_USERNAME     ?? 'localhost3k'
const LIMIT = 10

// ── Helpers ──────────────────────────────────────────────────────────────────

function toYYYYMM(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

function clampRating(r: number): 1 | 2 | 3 | 4 | 5 {
  return Math.min(5, Math.max(1, Math.round(r))) as 1 | 2 | 3 | 4 | 5
}

async function fetchAndParse(url: string): Promise<any[]> {
  let text: string
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('upstream')
    text = await res.text()
  } catch {
    throw new Error('upstream')
  }

  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      // always treat <item> as array even when there's only one
      isArray: (name) => name === 'item',
    })
    const parsed = parser.parse(text)
    return parsed?.rss?.channel?.item ?? []
  } catch {
    throw new Error('parse_error')
  }
}

// ── Letterboxd ───────────────────────────────────────────────────────────────

async function fetchLetterboxd(): Promise<FeedItem[]> {
  const items = await fetchAndParse(
    `https://letterboxd.com/${LETTERBOXD_USERNAME}/rss/`
  )

  return items
    .slice(0, LIMIT)
    .map((item: any): FeedItem | null => {
      const ratingRaw = parseFloat(item['letterboxd:memberRating'] ?? '')
      if (isNaN(ratingRaw) || ratingRaw === 0) return null  // skip unrated

      // Poster: extract first <img src="..."> from the description HTML
      const desc = String(item.description ?? '')
      const posterMatch = desc.match(/<img src="([^"]+)"/)
      const image = posterMatch?.[1] ?? undefined

      return {
        title: String(item['letterboxd:filmTitle'] ?? item.title ?? ''),
        url: String(item.link ?? ''),
        rating: clampRating(ratingRaw),
        dateConsumed: toYYYYMM(String(item['letterboxd:watchedDate'] ?? item.pubDate ?? '')),
        year: String(item['letterboxd:filmYear'] ?? ''),
        topic: 'FILM',
        image,
      }
    })
    .filter((x): x is FeedItem => x !== null)
}

// ── Goodreads ─────────────────────────────────────────────────────────────────

async function fetchGoodreads(): Promise<FeedItem[]> {
  const items = await fetchAndParse(
    `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=read`
  )

  return items
    .slice(0, LIMIT)
    .map((item: any): FeedItem | null => {
      const ratingRaw = parseInt(String(item.user_rating ?? '0'), 10)
      if (ratingRaw === 0) return null  // skip unrated

      // Author: top-level author_name field
      const author = String(item.author_name ?? '').trim() || undefined

      // Title: strip "Username's review of " prefix
      let title = String(item.title ?? '')
      const reviewMatch = title.match(/review of (.+)$/i)
      if (reviewMatch) title = reviewMatch[1].trim()

      // Topic: first user shelf that isn't 'read', uppercased; fallback 'BOOK'
      const shelves = String(item.user_shelves ?? '')
        .split(',')
        .map((s: string) => s.trim().toUpperCase())
        .filter((s: string) => s && s !== 'READ')
      const topic = shelves[0] ?? 'BOOK'

      // Cover image: prefer large, fall back to medium
      const image = String(item.book_large_image_url ?? item.book_medium_image_url ?? '').trim() || undefined

      // Review: strip HTML tags, collapse whitespace
      const reviewRaw = String(item.user_review ?? '').trim()
      const review = reviewRaw
        ? reviewRaw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() || undefined
        : undefined

      return {
        title,
        url: String(item.link ?? ''),
        rating: clampRating(ratingRaw),
        dateConsumed: toYYYYMM(String(item.pubDate ?? '')),
        author,
        topic,
        image,
        review,
      }
    })
    .filter((x): x is FeedItem => x !== null)
}

// ── Last.fm ───────────────────────────────────────────────────────────────────

function rankToRating(rank: number): 1 | 2 | 3 | 4 | 5 {
  if (rank === 1)           return 5
  if (rank <= 3)            return 4
  if (rank <= 6)            return 3
  return 2
}

async function fetchLastFm(): Promise<FeedItem[]> {
  if (!LASTFM_API_KEY) throw new Error('upstream')

  const url =
    `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums` +
    `&user=${encodeURIComponent(LASTFM_USERNAME)}` +
    `&period=1month&limit=${LIMIT}` +
    `&api_key=${LASTFM_API_KEY}&format=json`

  let data: any
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('upstream')
    data = await res.json()
  } catch {
    throw new Error('upstream')
  }

  const albums: any[] = data?.topalbums?.album ?? []
  const now = new Date()
  const dateConsumed = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`

  return albums.map((album: any, idx: number): FeedItem => {
    // Album art: prefer extralarge (300px), fall back down the array
    const imageEntry = (album.image as any[])?.find((i: any) => i.size === 'extralarge')
      ?? (album.image as any[])?.[2]  // large (174px) as fallback
    const image = String(imageEntry?.['#text'] ?? '').trim() || undefined

    return {
      title:        String(album.name ?? ''),
      url:          String(album.url ?? ''),
      rating:       rankToRating(idx + 1),
      dateConsumed,
      author:       String(album.artist?.name ?? ''),
      topic:        'MUSIC',
      image,
    }
  })
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const source = req.nextUrl.searchParams.get('source')

  if (!source || !['letterboxd', 'goodreads', 'music'].includes(source)) {
    return NextResponse.json({ error: 'invalid_source' }, { status: 400 })
  }

  try {
    let items: FeedItem[] = []

    if (source === 'letterboxd') {
      items = await fetchLetterboxd()
    } else if (source === 'goodreads') {
      items = await fetchGoodreads()
    } else {
      items = await fetchLastFm()
    }

    const body: FeedResponse = {
      source,
      fetchedAt: new Date().toISOString(),
      items,
    }

    return NextResponse.json(body, {
      headers: { 'Cache-Control': 'public, s-maxage=3600' },
    })
  } catch (err: any) {
    const code = err.message === 'parse_error' ? 'parse_error' : 'upstream_unavailable'
    return NextResponse.json({ error: code }, { status: code === 'parse_error' ? 500 : 502 })
  }
}
