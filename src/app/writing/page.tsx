import Link from 'next/link'
import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { Featured } from '@/components/Featured'
import { RandomFigure } from '@/components/RandomFigure'
import { getAllPosts } from '@/lib/posts'

export default function WritingPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <div className="app">
      <TopBar />

      <section className="page-hero">
        <h1>Writing</h1>
        <span className="count mono dim">{posts.length} ESSAYS</span>
        <p>
          Notes on systems, craft, and the things that don&apos;t fit in a changelog. Updated
          irregularly.
        </p>
      </section>

      <section className="section">
        <Link href={`/writing/${featured.slug}`} className="featured-link">
          <Featured item={featured} figure={<RandomFigure />} />
        </Link>

        <div className="table table-writing" style={{ marginTop: 28 }}>
          <div className="table-header">
            <div className="col">DATE</div>
            <div className="col">TITLE</div>
            <div className="col">TAGS</div>
            <div />
          </div>
          {rest.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="table-row" role="row">
              <div className="date">{post.date}</div>
              <div className="title">
                <span className="marker" aria-hidden="true" />
                <span className="title-text">{post.title}</span>
                <span className="ext-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="tags">
                {post.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <div className="row-action" aria-hidden="true">+</div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
