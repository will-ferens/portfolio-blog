import { Stars } from '@/components/Stars'
import type { MediaItem } from '@/lib/content'

interface MediaTableProps {
  items: MediaItem[]
  kind: 'book' | 'film' | 'music'
}

export function MediaTable({ items, kind }: MediaTableProps) {
  const isFilm = kind === 'film'

  return (
    <div className="table table-media">
      <div className="table-header">
        <div className="col">DATE</div>
        <div className="col">{isFilm ? 'TITLE' : 'TITLE · AUTHOR'}</div>
        <div className="col meta-col">{isFilm ? 'YEAR' : 'TOPIC'}</div>
        <div className="col">RATING</div>
        <div />
      </div>
      {items.map((it, i) => (
        <div className="table-row" key={i} role="row">
          <div className="date">{it.date}</div>
          <div className="title">
            <span className="marker" aria-hidden="true" />
            {/* title-cell: flex row on desktop, column on mobile */}
            <div className="title-cell">
              <span className="title-text">{it.title}</span>
              {it.author && (
                <span className="title-author">{it.author}</span>
              )}
            </div>
          </div>
          <div className="meta-col">{isFilm ? it.year : it.topic}</div>
          <div>
            <Stars value={it.rating} />
          </div>
          <div className="row-action" aria-hidden="true">+</div>
        </div>
      ))}
    </div>
  )
}
