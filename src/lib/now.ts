import { XMLParser } from 'fast-xml-parser'

export type NowItem = {
  lbl: string
  item: string
  sub: string
  url?: string        // link to the specific item
  profileUrl?: string // link to the source profile
}

const GOODREADS_USER_ID  = process.env.GOODREADS_USER_ID  ?? '161597075-will'
const LETTERBOXD_USERNAME = process.env.LETTERBOXD_USERNAME ?? 'localhost3k'
const LASTFM_API_KEY     = process.env.LASTFM_API_KEY     ?? ''
const LASTFM_USERNAME    = process.env.LASTFM_USERNAME    ?? 'localhost3k'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name) => name === 'item',
})

async function fetchCurrentlyReading(): Promise<NowItem | null> {
  try {
    const res = await fetch(
      `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=currently-reading`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const parsed = parser.parse(await res.text())
    const item = parsed?.rss?.channel?.item?.[0]
    if (!item) return null

    const title  = String(item.title ?? '').replace(/^.*review of /i, '').trim()
    const author = String(item.author_name ?? '').trim()
    return {
      lbl:        'READING',
      item:       title,
      sub:        author,
      url:        String(item.link ?? '') || undefined,
      profileUrl: `https://www.goodreads.com/user/show/${GOODREADS_USER_ID}`,
    }
  } catch {
    return null
  }
}

async function fetchLastWatched(): Promise<NowItem | null> {
  try {
    const res = await fetch(
      `https://letterboxd.com/${LETTERBOXD_USERNAME}/rss/`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const parsed = parser.parse(await res.text())
    const item = parsed?.rss?.channel?.item?.[0]
    if (!item) return null

    const title = String(item['letterboxd:filmTitle'] ?? item.title ?? '')
    const year  = String(item['letterboxd:filmYear'] ?? '')
    return {
      lbl:        'WATCHING',
      item:       title,
      sub:        year,
      url:        String(item.link ?? '') || undefined,
      profileUrl: `https://letterboxd.com/${LETTERBOXD_USERNAME}/`,
    }
  } catch {
    return null
  }
}

async function fetchLastListened(): Promise<NowItem | null> {
  if (!LASTFM_API_KEY) return null
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks` +
      `&user=${encodeURIComponent(LASTFM_USERNAME)}&limit=1` +
      `&api_key=${LASTFM_API_KEY}&format=json`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data  = await res.json()
    const track = data?.recenttracks?.track?.[0]
    if (!track) return null

    const nowPlaying = track['@attr']?.nowplaying === 'true'
    const name   = String(track.name ?? '')
    const artist = String(track.artist?.['#text'] ?? '')
    return {
      lbl:        'LISTENING',
      item:       name,
      sub:        nowPlaying ? `${artist} · now playing` : artist,
      url:        String(track.url ?? '') || undefined,
      profileUrl: `https://www.last.fm/user/${LASTFM_USERNAME}`,
    }
  } catch {
    return null
  }
}

export async function getNowItems(): Promise<NowItem[]> {
  const [reading, watching, listening] = await Promise.all([
    fetchCurrentlyReading(),
    fetchLastWatched(),
    fetchLastListened(),
  ])
  return [reading, watching, listening].filter((x): x is NowItem => x !== null)
}
