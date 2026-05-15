import { RandomFigure } from '@/components/RandomFigure'
import type { MediaItem } from '@/lib/content'

interface FilterItem {
  value: string
  label: string
  count: number
}

interface FilterRailProps {
  books: MediaItem[]
  films: MediaItem[]
  music: MediaItem[]
  mediaFilters: Set<string>
  topicFilters: Set<string>
  ratingFilter: number | null
  onToggleMedia: (v: string) => void
  onToggleTopic: (v: string) => void
  onToggleRating: (v: number) => void
}

function buildTopicItems(items: MediaItem[]): FilterItem[] {
  const counts: Record<string, number> = {}
  items.forEach((it) => {
    counts[it.topic] = (counts[it.topic] ?? 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ value: k, label: k, count: v }))
}

function Checkbox({
  label,
  count,
  on,
  onClick,
}: {
  label: string
  count?: number
  on: boolean
  onClick: () => void
}) {
  return (
    <div className={`filters-item${on ? ' on' : ''}`} onClick={onClick} role="checkbox" aria-checked={on}>
      <span className="cb" />
      <span>{label}</span>
      {count !== undefined && <span className="count">({count})</span>}
    </div>
  )
}

export function FilterRail({
  books,
  films,
  music,
  mediaFilters,
  topicFilters,
  ratingFilter,
  onToggleMedia,
  onToggleTopic,
  onToggleRating,
}: FilterRailProps) {
  const bookTopics = buildTopicItems(books)

  return (
    <aside className="filters">
      <div className="group">
        <div className="group-label">/ MEDIA</div>
        <Checkbox
          label="BOOKS"
          count={books.length}
          on={mediaFilters.has('BOOKS')}
          onClick={() => onToggleMedia('BOOKS')}
        />
        <Checkbox
          label="FILMS"
          count={films.length}
          on={mediaFilters.has('FILMS')}
          onClick={() => onToggleMedia('FILMS')}
        />
        <Checkbox
          label="MUSIC"
          count={music.length}
          on={mediaFilters.has('MUSIC')}
          onClick={() => onToggleMedia('MUSIC')}
        />
      </div>

      <div className="group">
        <div className="group-label">/ RATING</div>
        {[5, 4, 3].map((r) => (
          <Checkbox
            key={r}
            label={'★'.repeat(r) + '☆'.repeat(5 - r)}
            on={ratingFilter === r}
            onClick={() => onToggleRating(r)}
          />
        ))}
      </div>

      <RandomFigure />
    </aside>
  )
}
