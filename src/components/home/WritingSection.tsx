import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Featured } from '@/components/Featured'

export function WritingSection() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <section className="section">
      <div className="section-head">
        <div className="section-title">
          WRITING
          <span className="dim" style={{ marginLeft: 8 }}>({posts.length})</span>
        </div>
        <Link href="/writing" className="section-meta">ALL ESSAYS →</Link>
      </div>

      <Link href={`/writing/${featured.slug}`} className="featured-link">
        <Featured item={featured} />
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
  )
}
