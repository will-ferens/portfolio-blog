import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

import * as Global from '../constants/globalStyles'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {

    return (
        <Layout>
            <Global.Container>
                <Global.ContainerItem>

                
                </Global.ContainerItem>
            </Global.Container>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($title: String!) {
        googleSheet1Sheet(title: { eq: $title }) {
            title
            author
            genres
            rating
        }
    }
`