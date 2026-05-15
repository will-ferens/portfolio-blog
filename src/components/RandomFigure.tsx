'use client'

import { useState, useEffect } from 'react'
import { renderArt } from '@/lib/generative-art'

export function RandomFigure() {
  const [art, setArt] = useState<JSX.Element | null>(null)

  useEffect(() => {
    const seed = Math.floor(Math.random() * 0xffffffff)
    setArt(renderArt(seed))
  }, [])

  return (
    <div className="fig">
      {art}
    </div>
  )
}
