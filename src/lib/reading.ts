import Papa from 'papaparse'

const BLURB_SHEET_ID   = '1_PMOOq-QVWWTVN-ZUUUkYEhkwYcHqfsCspOYEXZ6coA'
const GOODREADS_SHEET_ID = '1yLAlj8oqlrzFjKo1rQfbxZv5kqipuI48pUXFT62ZaYs'

const BLURB_CSV    = `https://docs.google.com/spreadsheets/d/${BLURB_SHEET_ID}/export?format=csv`
const GOODREADS_CSV = `https://docs.google.com/spreadsheets/d/${GOODREADS_SHEET_ID}/export?format=csv`

export interface ArchiveBook {
  slug: string
  title: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  dateRead: string    // "YYYY.MM" or ""
  yearPublished: string
  genres?: string
  coverImage?: string
  hasBlurb: boolean
}

export interface BookDetail extends ArchiveBook {
  blurb: string
  pages?: string
}

interface BlurbRow {
  Title: string
  Author: string
  Publication: string
  Pages: string
  Completed: string
  Rating: string
  Genres: string
  CoverImage: string
  Blurb: string
}

interface GoodreadsRow {
  Title: string
  Author: string
  'My Rating': string
  'Year Published': string
  'Date Read': string
  'Exclusive Shelf': string
  'My Review': string
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ')
}

function toYYYYMM(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr.slice(0, 4)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`
}

function clamp(n: number): 1 | 2 | 3 | 4 | 5 {
  return Math.min(5, Math.max(1, n)) as 1 | 2 | 3 | 4 | 5
}

async function fetchCSV<T>(url: string): Promise<T[]> {
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error('fetch_failed')
  const text = await res.text()
  const { data } = Papa.parse<T>(text, { header: true, skipEmptyLines: true })
  return data
}

export async function getReadingArchive(): Promise<ArchiveBook[]> {
  const [blurbRows, goodreadsRows] = await Promise.all([
    fetchCSV<BlurbRow>(BLURB_CSV).catch(() => [] as BlurbRow[]),
    fetchCSV<GoodreadsRow>(GOODREADS_CSV).catch(() => [] as GoodreadsRow[]),
  ])

  // Build blurb lookup keyed by normalized title
  const blurbMap = new Map<string, BlurbRow>()
  for (const row of blurbRows) {
    if (row.Title?.trim()) blurbMap.set(normalizeTitle(row.Title), row)
  }

  const seen = new Set<string>()
  const books: ArchiveBook[] = []

  // Goodreads export — read shelf only, rated only
  for (const gr of goodreadsRows) {
    if (gr['Exclusive Shelf'] !== 'read') continue
    const rating = parseInt(gr['My Rating'] ?? '0', 10)
    if (!rating) continue

    const norm = normalizeTitle(gr.Title)
    if (seen.has(norm)) continue
    seen.add(norm)

    const blurb = blurbMap.get(norm)
    books.push({
      slug:          generateSlug(gr.Title),
      title:         gr.Title,
      author:        gr.Author,
      rating:        clamp(rating),
      dateRead:      toYYYYMM(gr['Date Read']),
      yearPublished: gr['Year Published'] ?? '',
      genres:        blurb?.Genres || undefined,
      coverImage:    blurb?.CoverImage || undefined,
      hasBlurb:      !!(blurb?.Blurb?.trim()),
    })
  }

  // Blurb-sheet books not already in Goodreads
  for (const row of blurbRows) {
    const norm = normalizeTitle(row.Title)
    if (seen.has(norm)) continue
    seen.add(norm)

    const rating = parseInt(row.Rating ?? '0', 10)
    if (!rating) continue

    books.push({
      slug:          generateSlug(row.Title),
      title:         row.Title,
      author:        row.Author,
      rating:        clamp(rating),
      dateRead:      toYYYYMM(row.Completed),
      yearPublished: row.Publication ?? '',
      genres:        row.Genres || undefined,
      coverImage:    row.CoverImage || undefined,
      hasBlurb:      !!(row.Blurb?.trim()),
    })
  }

  return books.sort((a, b) => b.dateRead.localeCompare(a.dateRead))
}

export async function getBookBySlug(slug: string): Promise<BookDetail | null> {
  const [blurbRows, goodreadsRows] = await Promise.all([
    fetchCSV<BlurbRow>(BLURB_CSV).catch(() => [] as BlurbRow[]),
    fetchCSV<GoodreadsRow>(GOODREADS_CSV).catch(() => [] as GoodreadsRow[]),
  ])

  const blurb   = blurbRows.find((r) => generateSlug(r.Title) === slug)
  const gr      = goodreadsRows.find((r) => generateSlug(r.Title) === slug)

  if (!blurb && !gr) return null

  const title   = blurb?.Title  || gr?.Title  || ''
  const rating  = parseInt(blurb?.Rating || gr?.['My Rating'] || '0', 10)
  const blurbText = blurb?.Blurb?.trim() || gr?.['My Review']?.trim() || ''

  return {
    slug,
    title,
    author:        blurb?.Author        || gr?.Author || '',
    rating:        clamp(rating || 3),
    dateRead:      toYYYYMM(blurb?.Completed || gr?.['Date Read'] || ''),
    yearPublished: blurb?.Publication   || gr?.['Year Published'] || '',
    genres:        blurb?.Genres        || undefined,
    coverImage:    blurb?.CoverImage    || undefined,
    pages:         blurb?.Pages         || undefined,
    hasBlurb:      !!blurbText,
    blurb:         blurbText,
  }
}

export async function getBlurbSlugs(): Promise<{ slug: string }[]> {
  try {
    const [blurbRows, goodreadsRows] = await Promise.all([
      fetchCSV<BlurbRow>(BLURB_CSV),
      fetchCSV<GoodreadsRow>(GOODREADS_CSV),
    ])
    const slugs = new Set<string>()
    for (const r of blurbRows) {
      if (r.Title && r.Blurb?.trim()) slugs.add(generateSlug(r.Title))
    }
    for (const r of goodreadsRows) {
      if (r.Title && r['My Review']?.trim() && parseInt(r['My Rating'] ?? '0') > 0) {
        slugs.add(generateSlug(r.Title))
      }
    }
    return Array.from(slugs).map((slug) => ({ slug }))
  } catch {
    return []
  }
}
