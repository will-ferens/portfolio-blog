import { PROFILE } from '@/lib/content'

export function Hero() {
  return (
    <section className="hero">
      <div>
        <h1 className="hero-title">{PROFILE.name}</h1>
        <p className="hero-tag">
          {PROFILE.taglinePrefix}
          <em>{PROFILE.taglineAccent}</em>
        </p>
      </div>

      <div className="metadata">
        <div className="group-label">/ METADATA</div>
        <div className="metadata-row">
          <span className="k">Status</span>
          <span className="v status">{PROFILE.status}</span>
        </div>
        <div className="metadata-row">
          <span className="k">Current</span>
          <span className="v">{PROFILE.current}</span>
        </div>
        <div className="metadata-row">
          <span className="k">Location</span>
          <span className="v">{PROFILE.location}</span>
        </div>
        <div className="metadata-row">
          <span className="k">Email</span>
          <span className="v">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </span>
        </div>
        <div className="metadata-row">
          <span className="k">Github</span>
          <span className="v">
            <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">
              {PROFILE.github}
            </a>
          </span>
        </div>
        <div className="metadata-row">
          <span className="k">LinkedIn</span>
          <span className="v">
            <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">
              {PROFILE.linkedin}
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}
