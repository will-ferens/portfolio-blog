import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import kebabCase from "lodash.kebabcase"

import * as Styled from "./styles"

const BookGrid = props => {
  const linkStyle = css`
    cursor: pointer;
    padding: 20px;
    margin: 0 4px;
    @media (max-width: 991px) {
      padding: 8px 4px;
    }
  `

  let { books } = props
  books.forEach(book => {
    if (book.blurb) {
      book.excerpt = book.blurb.split(" ", 32).join(" ")
    }
  })
  return (
    <Styled.BookGrid>
      {books.map(book => (
        <Link
          css={linkStyle}
          key={book.id}
          to={`/books/${kebabCase(book.title)}/`}
        >
          <Img
            fluid={{
              ...book.optimizedCoverImage.childImageSharp.fluid,
            }}
          />

          <Styled.ExcerptWrapper>
            <Styled.Title>{book.title}</Styled.Title>
            <Styled.Author>{book.author}</Styled.Author>
            {book.excerpt ? (
              <Styled.Excerpt>{book.excerpt} ...</Styled.Excerpt>
            ) : null}
          </Styled.ExcerptWrapper>
        </Link>
      ))}
    </Styled.BookGrid>
  )
}

export default BookGrid
