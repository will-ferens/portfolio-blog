import { Suspense } from 'react'
import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/home/Hero'
import { NowSection } from '@/components/home/NowSection'
import { WritingSection } from '@/components/home/WritingSection'

function NowSkeleton() {
  return (
    <section className="section" style={{ padding: '40px 0' }}>
      <div className="section-head" style={{ marginBottom: 0 }}>
        <div className="section-title" style={{ color: 'var(--faint)' }}>CURRENTLY</div>
      </div>
      <div className="now-grid">
        {['READING', 'WATCHING', 'LISTENING'].map((lbl) => (
          <div className="now-card" key={lbl}>
            <div className="lbl">{lbl}</div>
            <div className="skeleton-cell" style={{ width: '75%', height: 14, marginBottom: 2 }} />
            <div className="skeleton-cell" style={{ width: '45%', height: 11 }} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="app">
      <TopBar />
      <Hero />
      <Suspense fallback={<NowSkeleton />}>
        <NowSection />
      </Suspense>
      <WritingSection />
      <Footer />
    </div>
  )
}
