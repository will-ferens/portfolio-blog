import React from 'react'
import Layout from '../components/layout'

import * as Global from '../constants/globalStyles'

const Books = ({ data }) => {
    const books = data.allGoogleSheet.nodes[0].Sheet1
    console.log(books)
    return (
        <Layout>
            <Global.Container>
                <Global.ContainerItem>
                    
                </Global.ContainerItem>
            </Global.Container>
        </Layout>
    )
}

export const booksQuery = graphql`
    query allBooksQuery {
        allGoogleSheet {
            nodes {
                Sheet1 {
                    author
                    coverImage
                    title
                }
            }
        }
    }
`

export default Books
    