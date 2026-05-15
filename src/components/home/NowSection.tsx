import { getNowItems } from '@/lib/now'

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]

export async function NowSection() {
  const items = await getNowItems()
  const now   = new Date()
  const month = MONTHS[now.getMonth()]
  const year  = now.getFullYear()

  return (
    <section className="section" style={{ padding: '40px 0' }}>
      <div className="section-head" style={{ marginBottom: 0 }}>
        <div className="section-title">CURRENTLY · {month} {year}</div>
      </div>
      <div className="now-grid">
        {items.map((n) => (
          <div className="now-card" key={n.lbl}>
            {n.profileUrl ? (
              <a href={n.profileUrl} className="lbl now-lbl-link" target="_blank" rel="noopener noreferrer">
                {n.lbl}
              </a>
            ) : (
              <div className="lbl">{n.lbl}</div>
            )}
            {n.url ? (
              <a href={n.url} className="item now-link" target="_blank" rel="noopener noreferrer">
                {n.item}
              </a>
            ) : (
              <div className="item">{n.item}</div>
            )}
            <div className="sub">{n.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
