import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { Theme } from "../../constants/globalStyles"
import kebabCase from "lodash.kebabcase"

import * as Styled from "./styles"

const BookGrid = props => {
  const linkStyle = css`
    position: relative;
    cursor: pointer;
    padding: 20px;
    margin: 0 4px;
    border: 2px solid transparent;
    &:hover {
      transition: 0.3s;
      border: 2px solid ${Theme.primaryPurple};
      div {
        display: block;
        z-index: 1;
      }
      .gatsby-image-wrapper {
        z-index: 0;
        opacity: 8%;
      }
    }
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
         <Styled.BookOverlay>
         <Styled.Title>{book.title}</Styled.Title>
            <Styled.Author>{book.author}</Styled.Author>
            {book.excerpt ? (
              <Styled.Excerpt>{book.excerpt} ...</Styled.Excerpt>
            ) : null}
            
          </Styled.BookOverlay>
          <Img
            fluid={{
              ...book.optimizedCoverImage.childImageSharp.fluid,
            }}
          />         
        </Link>
      ))}
    </Styled.BookGrid>
  )
}

export default BookGrid
