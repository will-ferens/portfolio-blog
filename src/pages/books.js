import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import BookGrid from "../components/bookGrid/bookGrid"

import SEO from "../components/seo"

import * as Global from "../constants/globalStyles"
import { GridContainer } from "../templateStyles/bookPageTemplate"

import { groupBy } from "lodash"

const Books = ({ data }) => {
  let books = data.allGoogleSheet1Sheet.nodes

  books.filter(book => {
    if (book.completed !== null) {
      book.year = book.completed.split("-")[0]
    }
  })

  const booksObj = groupBy(books, book => book.year)

  return (
    <Layout>
      <SEO title="Books" />
      <GridContainer>
        {Object.entries(booksObj)
          .reverse()
          .map(([key, value]) => (
            <Global.ContainerItem key={key}>
              <Global.Heading1>
                {key !== "undefined" ? key : "Currently Reading"}
              </Global.Heading1>
              <BookGrid books={value} />
            </Global.ContainerItem>
          ))}
      </GridContainer>
    </Layout>
  )
}

export const booksQuery = graphql`
  query allBooksQuery {
    allGoogleSheet1Sheet(sort: { fields: started }) {
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
