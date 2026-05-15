import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const POSTS_DIR = path.join(process.cwd(), 'content/writing')

export type Post = {
  slug: string
  date: string
  title: string
  tags: string[]
  featured?: boolean
  excerpt?: string
  reading?: string
  figure?: string
}

export type PostWithHtml = Post & { html: string }

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))
  return files
    .map((filename): Post => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        date:     String(data.date ?? ''),
        title:    String(data.title ?? ''),
        tags:     Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
        excerpt:  data.excerpt ? String(data.excerpt) : undefined,
        reading:  data.reading ? String(data.reading) : undefined,
        figure:   data.figure  ? String(data.figure)  : undefined,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

export async function getPost(slug: string): Promise<PostWithHtml | null> {
  const filepath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return {
    slug,
    date:     String(data.date ?? ''),
    title:    String(data.title ?? ''),
    tags:     Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
    excerpt:  data.excerpt ? String(data.excerpt) : undefined,
    reading:  data.reading ? String(data.reading) : undefined,
    figure:   data.figure  ? String(data.figure)  : undefined,
    html:     String(result),
  }
}
