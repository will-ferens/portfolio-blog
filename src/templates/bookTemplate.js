import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

import Layout from '../components/layout'

import * as Global from '../constants/globalStyles'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { googleSheet1Sheet } = data

    return (
        <Layout>
            <Global.Container>
                <Global.ContainerItem>
                <h1>{googleSheet1Sheet.title}</h1>
                <Img src={googleSheet1Sheet.optimizedCoverImage.childImageSharp.fluid.src}/>
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
            optimizedCoverImage {
                childImageSharp {
                    fluid(maxWidth: 400, maxHeight: 250) {
                    ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`