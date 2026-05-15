import { PROFILE } from '@/lib/content'

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <span className="footer-glyph" aria-hidden="true" />
        © 2026 {PROFILE.name.toUpperCase()} · LAST DEPLOY 2026.05.14
      </div>
      <div className="footer-links">
        <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">
          LINKEDIN ↗
        </a>
        <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">
          GITHUB ↗
        </a>
        <a href={`mailto:${PROFILE.email}`}>EMAIL</a>
      </div>
    </footer>
  )
}

export default Footer
