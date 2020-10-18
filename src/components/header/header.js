import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/core'

import * as Global from '../../constants/globalStyles'
import * as Styled from './styles'

const firstColumn = css`
  grid-column: 2;
`

const secondColumn = css`
  grid-column: 3;
  font-weight: 400;
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
      <Styled.LinkWrapper css={secondColumn}>
        <Link to="/about" >
            <p css={linkColor}>About</p>
        </Link>
      </Styled.LinkWrapper>
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
