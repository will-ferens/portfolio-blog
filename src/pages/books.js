import React from 'react'
import Layout from '../components/layout'
import BookCard from '../components/bookCard/bookCard'
import { graphql } from 'gatsby'
import * as Global from '../constants/globalStyles'

const Books = ({ data }) => {
    const books = data.allGoogleSheet1Sheet.nodes
    return (
        <Layout>
            <Global.Container>
                <Global.ContainerItem>
                    <BookCard books={books} />
                </Global.ContainerItem>
            </Global.Container>
        </Layout>
    )
}

export const booksQuery = graphql`
    query allBooksQuery {
        allGoogleSheet1Sheet {
            nodes {
                id
                author
                title
                optimizedCoverImage {
                    childImageSharp {
                        fluid(quality: 100) {
                        ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`

export default Books
    