// Shared types and helpers for the bookshelf RSS integration.
// Imported by both the Route Handler (server) and BookshelfClient (client).

import type { MediaItem } from './content'

export interface FeedItem {
  title: string
  url: string
  rating: number | null  // 1–5, null = unrated
  dateConsumed: string   // YYYY.MM
  author?: string        // books, music
  year?: string          // films
  topic: string
  image?: string         // poster/cover/album art URL
  review?: string        // plain-text review (Goodreads only for now)
}

export interface FeedResponse {
  source: string
  fetchedAt: string
  items: FeedItem[]
}

export function toMediaItem(item: FeedItem): MediaItem {
  return {
    date: item.dateConsumed,
    title: item.title,
    url: item.url || undefined,
    author: item.author,
    year: item.year,
    topic: item.topic || 'BOOK',
    // Unrated items are filtered out before reaching here (route handler drops them),
    // so rating is always 1–5 by the time we map.
    rating: (item.rating ?? 3) as MediaItem['rating'],
  }
}
