import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { GenerativeFigure } from '@/components/GenerativeFigure'
import { getAllPosts, getPost } from '@/lib/posts'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <div className="app">
      <TopBar />

      <section className="page-hero">
        <p className="mono dim" style={{ marginBottom: 12 }}>
          {post.date}
          {post.reading && <> · {post.reading} read</>}
          {post.tags.length > 0 && (
            <> · {post.tags.join(' · ')}</>
          )}
        </p>
        <h1>{post.title}</h1>
        {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
      </section>

      <section className="section" style={{ borderBottom: 'none' }}>
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="post-nav">
          <Link href="/writing" className="mono dim post-back">
            ← All writing
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
