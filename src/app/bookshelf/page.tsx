import { Suspense } from 'react'
import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { BookshelfClient } from '@/components/bookshelf/BookshelfClient'
import { ReadingArchive } from '@/components/bookshelf/ReadingArchive'

function ArchiveSkeleton() {
  return (
    <section className="section reading-archive">
      <div className="sub-head">
        <div className="title">READING ARCHIVE</div>
      </div>
      <div className="table table-media">
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="table-row" key={i} style={{ pointerEvents: 'none' }}>
            <div className="skeleton-cell" style={{ width: 52 }} />
            <div className="skeleton-cell" style={{ flex: 1 }} />
            <div className="skeleton-cell" style={{ width: 48 }} />
            <div className="skeleton-cell" style={{ width: 60 }} />
            <div />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function BookshelfPage() {
  return (
    <div className="app">
      <TopBar />

      <section className="page-hero">
        <h1>Bookshelf</h1>
        <p>
          A running ledger of books, films, and records I&apos;ve spent time with.
        </p>
      </section>

      <BookshelfClient />

      <Suspense fallback={<ArchiveSkeleton />}>
        <ReadingArchive />
      </Suspense>

      <Footer />
    </div>
  )
}
