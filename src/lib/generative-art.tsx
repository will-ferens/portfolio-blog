// Pure math + JSX — no server or client APIs. Safe to import from either context.

const W = 600
const H = 450
const CX = W / 2
const CY = H / 2

// ── PRNG ──────────────────────────────────────────────────────────────────────

export function hashSeed(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function makePrng(seed: number): () => number {
  let s = seed
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function rand(rng: () => number, lo: number, hi: number) {
  return lo + rng() * (hi - lo)
}

// ── Style 0: Contour ──────────────────────────────────────────────────────────

function contourLines(rng: () => number): JSX.Element {
  const numRings  = Math.round(rand(rng, 20, 28))
  const maxR      = Math.min(CX, CY) * 0.90
  const nH        = Math.round(rand(rng, 3, 6))
  const harmonics = Array.from({ length: nH }, () => ({
    freq:  Math.round(rand(rng, 2, 7)),
    amp:   rand(rng, 0.07, 0.17),
    phase: rand(rng, 0, Math.PI * 2),
  }))

  const STEPS = 200
  const paths: string[] = []

  for (let ring = 1; ring <= numRings; ring++) {
    const baseR = (ring / numRings) * maxR
    const pts: string[] = []
    for (let s = 0; s <= STEPS; s++) {
      const θ = (s / STEPS) * Math.PI * 2
      let r = baseR
      for (const h of harmonics) r += h.amp * baseR * Math.sin(h.freq * θ + h.phase)
      const x = CX + r * Math.cos(θ)
      const y = CY + r * Math.sin(θ)
      pts.push(s === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`)
    }
    pts.push('Z')
    paths.push(pts.join(''))
  }

  return (
    <>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(240,239,234,0.80)" strokeWidth="0.85" />
      ))}
    </>
  )
}

// ── Style 1: Flow field ───────────────────────────────────────────────────────

function flowField(rng: () => number): JSX.Element {
  const cols   = 30
  const rows   = Math.round(cols * (H / W))
  const cellW  = W / cols
  const cellH  = H / rows
  const segLen = cellW * 0.44

  const fx  = rand(rng, 0.007, 0.018), fy  = rand(rng, 0.007, 0.018)
  const px  = rand(rng, 0, Math.PI * 2), py  = rand(rng, 0, Math.PI * 2)
  const fx2 = rand(rng, 0.015, 0.030), fy2 = rand(rng, 0.015, 0.030)
  const px2 = rand(rng, 0, Math.PI * 2), py2 = rand(rng, 0, Math.PI * 2)
  const mix = rand(rng, 0.3, 0.6)

  const lines: JSX.Element[] = []
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const cx    = (col + 0.5) * cellW
      const cy    = (row + 0.5) * cellH
      const a1    = Math.sin(cx * fx + px) * Math.cos(cy * fy + py) * Math.PI
      const a2    = Math.sin(cx * fx2 + px2) * Math.cos(cy * fy2 + py2) * Math.PI
      const angle = a1 * (1 - mix) + a2 * mix
      const dx    = Math.cos(angle) * segLen / 2
      const dy    = Math.sin(angle) * segLen / 2
      lines.push(
        <line
          key={`${col}-${row}`}
          x1={(cx - dx).toFixed(1)} y1={(cy - dy).toFixed(1)}
          x2={(cx + dx).toFixed(1)} y2={(cy + dy).toFixed(1)}
          stroke="rgba(240,239,234,0.80)" strokeWidth="1.1" strokeLinecap="round"
        />
      )
    }
  }
  return <>{lines}</>
}

// ── Style 2: Radial distortion ────────────────────────────────────────────────

function radialLines(rng: () => number, clipId: string): JSX.Element {
  const numLines = Math.round(rand(rng, 72, 96))
  const clipR    = Math.min(CX, CY) * 0.93
  const STEPS    = 50
  const nWaves   = Math.round(rand(rng, 2, 3))
  const waves    = Array.from({ length: nWaves }, () => ({
    amp:   rand(rng, 12, 32),
    freq:  rand(rng, 1.5, 4.5),
    phase: rand(rng, 0, Math.PI * 2),
  }))

  const paths: JSX.Element[] = []
  for (let i = 0; i < numLines; i++) {
    const angle = (i / numLines) * Math.PI * 2
    const cosA  = Math.cos(angle), sinA = Math.sin(angle)
    const pts: string[] = []
    for (let s = 0; s <= STEPS; s++) {
      const r        = (s / STEPS) * clipR
      const envelope = Math.sin(Math.PI * s / STEPS)
      let disp = 0
      for (const w of waves) disp += w.amp * Math.sin(w.freq * (s / STEPS) * Math.PI * 2 + w.phase) * envelope
      const x = CX + r * cosA - disp * sinA
      const y = CY + r * sinA + disp * cosA
      pts.push(s === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`)
    }
    paths.push(<path key={i} d={pts.join('')} fill="none" stroke="rgba(240,239,234,0.72)" strokeWidth="0.9" />)
  }

  return (
    <>
      <defs>
        <clipPath id={clipId}><circle cx={CX} cy={CY} r={clipR} /></clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{paths}</g>
    </>
  )
}

// ── Shared renderer ───────────────────────────────────────────────────────────

export function renderArt(seed: number): JSX.Element {
  const rng    = makePrng(seed)
  const style  = seed % 3
  const clipId = `rc-${seed}`

  const art =
    style === 0 ? contourLines(rng) :
    style === 1 ? flowField(rng) :
                  radialLines(rng, clipId)

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <rect width={W} height={H} fill="#0a0a0a" />
      {art}
    </svg>
  )
}
