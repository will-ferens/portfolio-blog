import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { BookshelfClient } from '@/components/bookshelf/BookshelfClient'

export default function BookshelfPage() {
  return (
    <div className="app">
      <TopBar />

      <section className="page-hero">
        <h1>Bookshelf</h1>
        <p>
          A running ledger of books, films, and records I&apos;ve spent time with. Updated when I
          finish something or feel the need to recommend it.
        </p>
      </section>

      <BookshelfClient />

      <Footer />
    </div>
  )
}
