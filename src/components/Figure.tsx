interface FigureProps {
  label?: string
  corner?: boolean
}

export function Figure({ label = 'FIG. 01', corner = true }: FigureProps) {
  return (
    <div className="fig">
      <div className="fig-label">{label}</div>
      {corner && (
        <div className="fig-corner" aria-hidden="true">
          <i /><i /><i /><i />
        </div>
      )}
    </div>
  )
}
