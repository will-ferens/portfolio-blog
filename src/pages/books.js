import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import BookGrid from '../components/bookGrid/bookGrid'
import PieChart from '../components/pieChart/pieChart'

import * as Global from '../constants/globalStyles'
import { GridContainer } from '../templateStyles/bookPageTemplate'

const Books = ({ data }) => {
    const books = data.allGoogleSheet1Sheet.nodes
    const books20 = books.filter((book => {
        if(book.completed != null) {
            return book.completed.indexOf('2020' !== -1)
        } else {
            return null
        }
    }))

    return (
        <Layout>
            <GridContainer>
                <Global.ContainerItem>
                    <Global.Heading1>2020</Global.Heading1>
                    <BookGrid books={books20} />
                    <PieChart />
                </Global.ContainerItem>
            </GridContainer>
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
                completed
                rating
                genres
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
    