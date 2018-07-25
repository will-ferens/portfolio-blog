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
  <Media query="(max-width: 599px)">
    {matches =>
        matches ? (
          <div style={{
            margin: '0 auto',
            maxWidth: 980,
            padding: '1.45rem 1.0875rem',
          }}>
            <Link to="/" style={{ textAlign: `center`, textDecoration: `none` }}>
              <h3>{siteTitle}</h3>
            </Link>
          <div style={{
            margin: '0 auto',
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            maxWidth: 400
          }}>
            <Link style={{ gridColumn: `1`, textAlign: `center`, margin: 10 }} to="/about/">About</Link>
            <Link style={{ gridColumn: `2`, textAlign: `center`, margin: 10 }} to="/projects/">Projects</Link>
          </div>
          </div>
        ) : (
          <div style={{
              gridTemplateColumns: `1fr 1fr 1fr`,
              display: `grid`,
            }}
          >
              <Link to="/" style={{ gridColumn: `1`, justifySelf: `center`, marginTop: `10px`, textDecoration: `none`}}>
                  <h3>{siteTitle}</h3>
              </Link>
              <ul style={{ listStyle: `none`, gridColumn: `3` }}>
                  <Link style={{ margin: 10 }} to="/">Home</Link>
                  <Link style={{ margin: 10 }} to="/about/">About</Link>
                  <Link style={{ margin: 10 }} to="/projects/">Projects</Link>
              </ul>
        </div>
      )}
  </Media>
    
  </div>
)

export default Header
