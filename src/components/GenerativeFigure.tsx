import { hashSeed, renderArt } from '@/lib/generative-art'

export function GenerativeFigure({ slug }: { slug: string }) {
  return (
    <div className="fig">
      {renderArt(hashSeed(slug))}
    </div>
  )
}
