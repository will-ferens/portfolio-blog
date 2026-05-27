import Link from 'next/link'
import { Stars } from '@/components/Stars'
import { getReadingArchive } from '@/lib/reading'

export async function ReadingArchive() {
  let books: Awaited<ReturnType<typeof getReadingArchive>> = []

  try {
    books = await getReadingArchive()
  } catch {
    return null
  }

  if (books.length === 0) return null

  return (
    <section className="section reading-archive">
      <div className="sub-head">
        <div className="title">
          READING ARCHIVE
          <span className="dim" style={{ marginLeft: 8 }}>({books.length})</span>
        </div>
        <div className="info">SORT · MOST RECENT</div>
      </div>

      <div className="table table-media">
        <div className="table-header">
          <div className="col">DATE</div>
          <div className="col">TITLE · AUTHOR</div>
          <div className="col meta-col">YEAR</div>
          <div className="col">RATING</div>
          <div />
        </div>

        {books.map((book, i) => (
          <div
            className={`table-row${book.hasBlurb ? ' table-row--linked' : ''}`}
            key={i}
            role="row"
          >
            {book.hasBlurb && (
              <Link
                href={`/bookshelf/${book.slug}`}
                className="row-stretch-link"
                aria-label={book.title}
              />
            )}
            <div className="date">{book.dateRead || '—'}</div>

            <div className="title">
              <span className="marker" aria-hidden="true" />
              <div className="title-cell">
                <span className="title-text">{book.title}</span>
                <span className="title-author">{book.author}</span>
              </div>
            </div>

            <div className="meta-col">{book.yearPublished}</div>
            <div><Stars value={book.rating} /></div>
            <div className="row-action" aria-hidden="true">
              {book.hasBlurb ? '→' : ''}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
