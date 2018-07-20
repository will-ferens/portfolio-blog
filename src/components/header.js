import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: '#f5f5f5',
      marginBottom: '3rem',
      borderBottom: '2px solid #e6e6e6',

    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 600,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0, textAlign: 'center', fontSize: '18px' }}>
      
        <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
            <h3 style={{ display: `inline`, }}>{siteTitle}</h3>
        </Link>
        <ul style={{ listStyle: `none`, float: `right` }}>
            <Link style={{ margin: 10 }} to="/">Home</Link>
            <Link style={{ margin: 10 }} to="/about/">About</Link>
            <Link style={{ margin: 10 }} to="/projects/">Projects</Link>
        </ul>
      </h1>
    </div>
  </div>
)

export default Header
