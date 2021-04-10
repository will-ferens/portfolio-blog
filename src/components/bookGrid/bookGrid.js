import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { css } from "@emotion/core"

import kebabCase from 'lodash.kebabcase'


import * as Styled from './styles'


const BookGrid = (props) => {
    const linkStyle = css`
        cursor: pointer;
        padding: 20px;
        margin: 0 4px;
        transition: all 0.3s ease; 
        &:hover {
            opacity: .8;
        }
        @media(max-width: 991px) { 
            padding: 8px 4px;
        }
        @media(max-width: 599px) {
            border-bottom: 1px solid #3C3880;
        }
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


export default BookGrid