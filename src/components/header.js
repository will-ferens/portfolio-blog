import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'

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
        gridTemplateColumns: `1fr 1fr 1fr`,
        display: `grid`,
      }}
    >
        <Link to="/" style={{ gridColumn: `1`, justifySelf: `center`, marginTop: `10px`, textDecoration: `none`}}>
            <h3 style={{  }}>{siteTitle}</h3>
        </Link>
        <ul style={{ listStyle: `none`, gridColumn: `3` }}>
            <Link style={{ margin: 10 }} to="/">Home</Link>
            <Link style={{ margin: 10 }} to="/about/">About</Link>
            <Link style={{ margin: 10 }} to="/projects/">Projects</Link>
        </ul>

    </div>
  </div>
)

export default Header
