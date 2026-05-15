'use client'

import { useState, useEffect } from 'react'
import { FilterRail } from './FilterRail'
import { MediaTable } from './MediaTable'
import type { FeedItem, FeedResponse } from '@/lib/bookshelf'
import type { MediaItem } from '@/lib/content'
import { toMediaItem } from '@/lib/bookshelf'

// ── Loading / error primitives ────────────────────────────────────────────────

type LoadState<T> =
  | { status: 'loading' }
  | { status: 'ok'; data: T }
  | { status: 'error' }

function TableSkeleton() {
  return (
    <div className="table table-media">
      {Array.from({ length: 8 }).map((_, i) => (
        <div className="table-row" key={i} style={{ pointerEvents: 'none' }}>
          <div className="skeleton-cell" style={{ width: 52 }} />
          <div className="skeleton-cell" style={{ flex: 1 }} />
          <div className="skeleton-cell" style={{ width: 80 }} />
          <div className="skeleton-cell" style={{ width: 60 }} />
          <div />
        </div>
      ))}
    </div>
  )
}

function FeedError({ label }: { label: string }) {
  return (
    <p
      className="mono dim"
      style={{
        padding: '20px 12px',
        borderTop: '1px solid var(--hairline)',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      Couldn&apos;t load {label} right now — check back soon.
    </p>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function BookshelfClient() {
  // filter state
  const [mediaFilters, setMediaFilters] = useState<Set<string>>(
    new Set(['BOOKS', 'FILMS', 'MUSIC'])
  )
  const [topicFilters, setTopicFilters] = useState<Set<string>>(new Set())
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // live data
  const [booksState, setBooksState] = useState<LoadState<MediaItem[]>>({ status: 'loading' })
  const [filmsState, setFilmsState] = useState<LoadState<MediaItem[]>>({ status: 'loading' })
  const [musicState, setMusicState] = useState<LoadState<MediaItem[]>>({ status: 'loading' })

  useEffect(() => {
    async function load(
      source: string,
      setter: React.Dispatch<React.SetStateAction<LoadState<MediaItem[]>>>
    ) {
      try {
        const res = await fetch(`/api/bookshelf-feed?source=${source}`)
        if (!res.ok) throw new Error()
        const { items } = (await res.json()) as FeedResponse
        setter({ status: 'ok', data: (items as FeedItem[]).map(toMediaItem) })
      } catch {
        setter({ status: 'error' })
      }
    }

    // fire all three in parallel
    load('goodreads',  setBooksState)
    load('letterboxd', setFilmsState)
    load('music',      setMusicState)
  }, [])

  // derive current data arrays (empty while loading/error so filters still work)
  const books = booksState.status === 'ok' ? booksState.data : []
  const films = filmsState.status === 'ok' ? filmsState.data : []
  const music = musicState.status === 'ok' ? musicState.data : []

  // filter helpers
  const toggleMedia  = (v: string) =>
    setMediaFilters((p) => { const n = new Set(p); n.has(v) ? n.delete(v) : n.add(v); return n })
  const toggleTopic  = (v: string) =>
    setTopicFilters((p) => { const n = new Set(p); n.has(v) ? n.delete(v) : n.add(v); return n })
  const toggleRating = (v: number) =>
    setRatingFilter((p) => (p === v ? null : v))

  const applyFilters = (items: MediaItem[]) => {
    let out = items
    if (topicFilters.size > 0) out = out.filter((it) => topicFilters.has(it.topic))
    if (ratingFilter !== null)  out = out.filter((it) => it.rating >= ratingFilter)
    return out
  }

  const filteredBooks = applyFilters(books)
  const filteredFilms = applyFilters(films)
  const filteredMusic = applyFilters(music)

  const activeFilterCount =
    (mediaFilters.size < 3 ? 3 - mediaFilters.size : 0) +
    topicFilters.size +
    (ratingFilter !== null ? 1 : 0)

  return (
    <section className="section" style={{ borderBottom: 'none' }}>
      <div className="with-filters">
        {/* Left column: filter rail */}
        <div className="filters-wrapper">
          <button
            className={`filter-toggle-btn${filtersOpen ? ' is-open' : ''}`}
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
          >
            FILTERS{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            <span className="filter-toggle-arrow" aria-hidden="true">▼</span>
          </button>

          <div className={`filters-collapsible${filtersOpen ? ' is-open' : ''}`}>
            <FilterRail
              books={books}
              films={films}
              music={music}
              mediaFilters={mediaFilters}
              topicFilters={topicFilters}
              ratingFilter={ratingFilter}
              onToggleMedia={toggleMedia}
              onToggleTopic={toggleTopic}
              onToggleRating={toggleRating}
            />
          </div>
        </div>

        {/* Right column: tables */}
        <div>
          {/* BOOKS — Goodreads live data */}
          {mediaFilters.has('BOOKS') && (
            <>
              <div className="sub-head">
                <div className="title">
                  BOOKS
                  {booksState.status === 'ok' && (
                    <span className="dim" style={{ marginLeft: 8 }}>({filteredBooks.length})</span>
                  )}
                </div>
                <div className="info">SORT · MOST RECENT</div>
              </div>
              {booksState.status === 'loading' && <TableSkeleton />}
              {booksState.status === 'error'   && <FeedError label="Books" />}
              {booksState.status === 'ok'      && <MediaTable items={filteredBooks} kind="book" />}
            </>
          )}

          {/* FILMS — Letterboxd live data */}
          {mediaFilters.has('FILMS') && (
            <>
              <div className="sub-head">
                <div className="title">
                  FILMS
                  {filmsState.status === 'ok' && (
                    <span className="dim" style={{ marginLeft: 8 }}>({filteredFilms.length})</span>
                  )}
                </div>
                <div className="info">SORT · MOST RECENT</div>
              </div>
              {filmsState.status === 'loading' && <TableSkeleton />}
              {filmsState.status === 'error'   && <FeedError label="Films" />}
              {filmsState.status === 'ok'      && <MediaTable items={filteredFilms} kind="film" />}
            </>
          )}

          {/* MUSIC — Last.fm live data */}
          {mediaFilters.has('MUSIC') && (
            <>
              <div className="sub-head">
                <div className="title">
                  MUSIC
                  {musicState.status === 'ok' && (
                    <span className="dim" style={{ marginLeft: 8 }}>({filteredMusic.length})</span>
                  )}
                </div>
                <div className="info">SORT · TOP THIS MONTH</div>
              </div>
              {musicState.status === 'loading' && <TableSkeleton />}
              {musicState.status === 'error'   && <FeedError label="Music" />}
              {musicState.status === 'ok'      && <MediaTable items={filteredMusic} kind="music" />}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
