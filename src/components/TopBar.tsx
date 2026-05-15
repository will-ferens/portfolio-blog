'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { PROFILE } from '@/lib/content'

const NAV = [
  { href: '/',          key: 'H', label: 'INDEX'     },
  { href: '/bookshelf', key: 'B', label: 'BOOKSHELF' },
  { href: '/resume',    key: 'R', label: 'RESUME'    },
]

export function TopBar() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Avoid hydration mismatch: server can't know the user's theme preference.
  // Keep isDark=false (matching server output) until after first paint.
  const isDark = mounted && resolvedTheme === 'dark'

  useEffect(() => { setMounted(true) }, [])

  // lock body scroll when drawer is open
  useEffect(() => {
    document.body.classList.toggle('drawer-open', drawerOpen)
    return () => { document.body.classList.remove('drawer-open') }
  }, [drawerOpen])

  // close drawer on route change
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  const close = () => setDrawerOpen(false)

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <Link href="/" className="logo" aria-label={PROFILE.name} onClick={close}>
            <span className="logo-mark" aria-hidden="true" />
            <span>{PROFILE.initials}.</span>
            <span className="dim" style={{ marginLeft: 4 }}>
              / {PROFILE.name.toUpperCase()}
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="nav topbar-nav" aria-label="Main navigation">
            {NAV.map((n) => {
              const active = pathname === n.href
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="nav-item"
                  data-active={active}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="nav-key" aria-hidden="true">[{n.key}]</span>
                  <span>{n.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* desktop right actions */}
        <div className="topbar-right">
          <button
            className="nav-item"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="nav-key" aria-hidden="true">[{isDark ? 'L' : 'D'}]</span>
            <span>{isDark ? 'LIGHT' : 'DARK'}</span>
          </button>
          <a href={`mailto:${PROFILE.email}`} className="nav-item">
            <span className="nav-key" aria-hidden="true">[E]</span>
            <span>EMAIL</span>
          </a>
          <a href={PROFILE.githubUrl} className="nav-item" target="_blank" rel="noopener noreferrer">
            <span className="nav-key" aria-hidden="true">[G]</span>
            <span>GITHUB ↗</span>
          </a>
        </div>

        {/* mobile hamburger */}
        <button
          className="topbar-menu-btn"
          onClick={() => setDrawerOpen((o) => !o)}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
        >
          {drawerOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* mobile drawer */}
      <div className={`nav-drawer${drawerOpen ? ' is-open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="nav-drawer-top">
          <Link href="/" className="logo" onClick={close} aria-label={PROFILE.name}>
            <span className="logo-mark" aria-hidden="true" />
            <span>{PROFILE.initials}.</span>
            <span className="dim" style={{ marginLeft: 4 }}>
              / {PROFILE.name.toUpperCase()}
            </span>
          </Link>
          <button className="topbar-menu-btn" onClick={close} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className="nav-drawer-body" aria-label="Mobile navigation">
          {NAV.map((n) => {
            const active = pathname === n.href
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`nav-drawer-item${active ? ' is-active' : ''}`}
                onClick={close}
                aria-current={active ? 'page' : undefined}
              >
                <span className="nav-key" aria-hidden="true">[{n.key}]</span>
                {n.label}
              </Link>
            )
          })}

          {/* divider before actions */}
          <div style={{ height: 1, background: 'var(--hairline)', margin: '8px 0' }} />

          <button
            className="nav-drawer-item"
            onClick={() => { setTheme(isDark ? 'light' : 'dark'); close() }}
            style={{ borderBottom: '1px solid var(--hairline)' }}
          >
            <span className="nav-key" aria-hidden="true">[{isDark ? 'L' : 'D'}]</span>
            {isDark ? 'LIGHT MODE' : 'DARK MODE'}
          </button>

          <a href={`mailto:${PROFILE.email}`} className="nav-drawer-item" onClick={close}>
            <span className="nav-key" aria-hidden="true">[E]</span>
            EMAIL
          </a>

          <a
            href={PROFILE.githubUrl}
            className="nav-drawer-item"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{ borderBottom: 'none' }}
          >
            <span className="nav-key" aria-hidden="true">[G]</span>
            GITHUB ↗
          </a>
        </nav>
      </div>
    </>
  )
}
