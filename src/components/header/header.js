import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { css } from "@emotion/core"

import * as Global from "../../constants/globalStyles"
import * as Styled from "./styles"
const pages = [
  {
    link: "/about",
    title: "About",
    id: "about-link",
  },
  {
    link: "/work",
    title: "Work",
    id: "work-link",
  },
  {
    link: "/blog",
    title: "Blog",
    id: "blog-link",
  },
  {
    link: "/books",
    title: "Books",
    id: "books-link",
  },
]
const FirstColumn = css`
  grid-column: 2;
`

const LinkColor = css`
  color: #3c3880;
`
const Header = ({ siteTitle }) => (
  <div>
    <Styled.Header>
      <Styled.LinkWrapper css={FirstColumn}>
        <Link to="/">
          <Global.Heading1>{siteTitle}</Global.Heading1>
        </Link>
      </Styled.LinkWrapper>

      <Styled.SecondColumn>
        {pages.map(page => (
          <Styled.LinkWrapper key={page.id}>
            <Link to={page.link}>
              <p css={LinkColor}>{page.title}</p>
            </Link>
          </Styled.LinkWrapper>
        ))}
      </Styled.SecondColumn>
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
