import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'


const Header = ({ siteTitle }) => (
  <div>
    <Media query="(max-width: 599px)">
      {matches =>
          matches ? (
            <header style={{
              margin: '0px auto',
              maxWidth: 350,
              padding: '1.45rem 1.0875rem 0 1.0875rem',
            }}>
              <Link to="/" style={{ textAlign: `center`, textDecoration: `none`  }}>
                <h3>{ siteTitle }</h3>
              </Link>
              <div style={{
                margin: '0 auto',
                display: `grid`,
                gridTemplateColumns: `1fr 1fr`,
                maxWidth: 400
              }}>
              </div>
            </header>
          ) : (
            <header style={{
              padding: '1.45rem 1.0875rem',
                gridTemplateColumns: `25% auto 25%`,
                display: `grid`,
              }}
            >
              <Link to="/" style={{ gridColumn: `2`, justifySelf: `center`, marginTop: `10px`, width: `90%`, textDecoration: `none`}}>
                  <h3 style={{color: `#C0BDFF`}}>{ siteTitle }</h3>
              </Link>
          </header>
        )}
    </Media>
  </div>
)

export default Header
