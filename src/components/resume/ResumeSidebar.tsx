import { PROFILE, SKILLS, EDUCATION } from '@/lib/content'

export function ResumeSidebar() {
  return (
    <aside className="resume-sidebar">
      <div className="resume-sidebar-section">
        <div className="resume-sidebar-label">Contact</div>
        <div className="resume-skill">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </div>
        <div className="resume-skill">
          <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">
            {PROFILE.github}
          </a>
        </div>
        <div className="resume-skill">
          <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">
            {PROFILE.linkedin}
          </a>
        </div>
        <div className="resume-skill" style={{ marginTop: 12 }}>
          {PROFILE.location}
        </div>
      </div>

      {Object.entries(SKILLS).map(([k, v]) => (
        <div key={k} className="resume-sidebar-section">
          <div className="resume-sidebar-label">{k}</div>
          {v.map((s) => (
            <div key={s} className="resume-skill">■ {s}</div>
          ))}
        </div>
      ))}

      <div className="resume-sidebar-section">
        <div className="resume-sidebar-label">Education</div>
        {EDUCATION.map((e, i) => (
          <div key={i}>
            <div className="resume-skill" style={{ color: 'var(--fg)' }}>{e.role}</div>
            <div className="resume-skill">{e.org}</div>
            <div className="resume-skill">{e.range}</div>
          </div>
        ))}
      </div>

      <div className="resume-sidebar-section">
        <div className="resume-sidebar-label">Download</div>
        <div className="resume-skill" style={{ color: 'var(--accent)' }}>■ PDF VERSION ↗</div>
      </div>
    </aside>
  )
}
