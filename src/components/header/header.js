import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/core'

import * as Global from '../../constants/globalStyles'
import * as Styled from './styles'

const firstColumn = css`
  grid-column: 2;
`

const linkColor = css`
  color: #3C3880; 
`
const Header = ({ siteTitle }) => (
  <div>
    <Styled.Header>
    <Styled.LinkWrapper css={firstColumn}>
      <Link to="/" >
          <Global.Heading1>{ siteTitle }</Global.Heading1>
      </Link>
    </Styled.LinkWrapper>

    <Styled.secondColumn>
      <Styled.LinkWrapper>
        <Link to="/about" >
            <p css={linkColor}>About</p>
        </Link>
      </Styled.LinkWrapper>

      <Styled.LinkWrapper>
        <Link to="/books" >
            <p css={linkColor}>Books</p>
        </Link>
      </Styled.LinkWrapper>
    </Styled.secondColumn>
  </Styled.Header>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
