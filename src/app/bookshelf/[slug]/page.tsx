import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBookBySlug, getBlurbSlugs } from '@/lib/reading'
import { Stars } from '@/components/Stars'
import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return getBlurbSlugs()
}

export default async function BookPage({ params }: { params: { slug: string } }) {
  const book = await getBookBySlug(params.slug)
  if (!book) notFound()

  return (
    <div className="app">
      <TopBar />

      <div className="book-detail">
        <Link href="/bookshelf" className="book-back">← BOOKSHELF</Link>

        <div className="book-detail-header">
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.title}
              className="book-cover"
              width={120}
            />
          )}
          <div className="book-detail-meta">
            <h1 className="book-title">{book.title}</h1>
            <div className="book-author">{book.author}</div>

            <div className="book-chips">
              {book.yearPublished && <span className="chip">{book.yearPublished}</span>}
              {book.genres && <span className="chip">{book.genres}</span>}
              {book.pages && <span className="chip">{book.pages}p</span>}
            </div>

            <Stars value={book.rating} />

            {book.dateRead && (
              <div className="book-date-read">Read {book.dateRead}</div>
            )}
          </div>
        </div>

        {book.blurb && (
          <div className="book-blurb">
            {book.blurb.split('\n').filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
