interface ExpEntryProps {
  range: string
  role: string
  org: string
  body: string[]
  stack?: string[]
}

export function ExpEntry({ range, role, org, body, stack }: ExpEntryProps) {
  return (
    <div className="exp-entry">
      <div className="exp-date">{range}</div>
      <div>
        <div className="exp-role">{role}</div>
        <div className="exp-org">
          <span className="accent" aria-hidden="true">■</span> {org.toUpperCase()}
        </div>
        <div className="exp-body">
          {body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {stack && stack.length > 0 && (
          <div className="exp-stack">
            {stack.map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
