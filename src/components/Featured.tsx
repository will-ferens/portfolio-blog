import { GenerativeFigure } from './GenerativeFigure'
import type { Post } from '@/lib/posts'

interface FeaturedProps {
  item: Post
  figure?: React.ReactNode
}

export function Featured({ item, figure }: FeaturedProps) {
  return (
    <div className="featured">
      {figure ?? <GenerativeFigure slug={item.slug} />}
      <div className="featured-body">
        <div>
          <div className="featured-meta">
            <span className="badge">LATEST</span>
            <span>{item.date}</span>
            <span>·</span>
            <span>{item.reading ?? '8 min read'}</span>
            <span>·</span>
            <span>{item.tags.join(' · ')}</span>
          </div>
          <h2 className="featured-title">{item.title}</h2>
          {item.excerpt && <p className="featured-excerpt">{item.excerpt}</p>}
        </div>
        <div className="featured-cta">
          Read essay
          <span>→</span>
        </div>
      </div>
    </div>
  )
}
