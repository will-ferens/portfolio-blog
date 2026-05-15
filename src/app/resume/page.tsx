import { TopBar } from '@/components/TopBar'
import { Footer } from '@/components/Footer'
import { ResumeSidebar } from '@/components/resume/ResumeSidebar'
import { ExpEntry } from '@/components/resume/ExpEntry'
import { EXPERIENCE, EDUCATION } from '@/lib/content'

export default function ResumePage() {
  return (
    <div className="app">
      <TopBar />

      <section className="page-hero">
        <h1>
          Resume
          <span className="count">
            ({EXPERIENCE.length} ROLES · {new Date().getFullYear() - 2018} YRS)
          </span>
        </h1>
        <p>
          Engineer of many hats. Most recent work at the intersection of developer tools,
          infrastructure, and small-team craft. Currently available for new projects.
        </p>
      </section>

      <div className="resume-layout">
        <ResumeSidebar />

        <main className="resume-main">
          <div className="resume-exp-head">EXPERIENCE</div>
          {EXPERIENCE.map((e, i) => (
            <ExpEntry
              key={i}
              range={e.range}
              role={e.role}
              org={e.org}
              body={e.body}
              stack={e.stack}
            />
          ))}

          <div className="resume-exp-head" style={{ marginTop: 56 }}>EDUCATION</div>
          {EDUCATION.map((e, i) => (
            <ExpEntry
              key={i}
              range={e.range}
              role={e.role}
              org={e.org}
              body={e.body}
            />
          ))}
        </main>
      </div>

      <Footer />
    </div>
  )
}
