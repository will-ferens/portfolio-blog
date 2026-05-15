interface StarsProps {
  value: number
  max?: number
}

export function Stars({ value, max = 5 }: StarsProps) {
  return (
    <span className="stars" aria-label={`${value} of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < value ? '' : 'empty'}>
          {i < value ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}
