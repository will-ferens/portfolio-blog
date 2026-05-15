'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const SECTION_LABELS: Record<string, string> = {
  '/':           'INDEX',
  '/bookshelf':  'BOOKSHELF',
  '/resume':     'RESUME',
}

function useClock() {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const p = (n: number) => String(n).padStart(2, '0')
      setTime(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function ConsoleBar() {
  const pathname = usePathname()
  const time = useClock()
  const section = SECTION_LABELS[pathname] ?? 'INDEX'

  useEffect(() => {
    document.body.classList.add('has-consolebar')
    return () => { document.body.classList.remove('has-consolebar') }
  }, [])

  return (
    <div className="consolebar" aria-hidden="true">
      <div>
        <span>SECTION · {section}</span>
        <span>CO · {time} EST</span>
      </div>
    </div>
  )
}
