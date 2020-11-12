import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { css } from "@emotion/core"

import kebabCase from 'lodash.kebabcase'


import * as Styled from './styles'


const BookCard = (props) => {
    const linkStyle = css`
        padding: 20px;
    `
    const { books } = props;
    return (
        <Styled.BookGrid>
            {
                books.map(book => (
                    <Link css={linkStyle} key={book.id} to={`/books/${kebabCase(book.title)}/`} >
                        <Img fluid={{
                            ...book.optimizedCoverImage.childImageSharp.fluid
                        }} />  
                    </Link>
                ))
            }
        </Styled.BookGrid>
    )
}


export default BookCard