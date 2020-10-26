import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

import * as Global from '../constants/globalStyles'
import * as Styled from '../templateStyles/bookPageTemplate'

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { googleSheet1Sheet } = data

    return (
        <Layout>
        
            <Styled.HeaderContainer>
                <Styled.CoverContainer>
                    <Img fluid={{
                        ...googleSheet1Sheet.optimizedCoverImage.childImageSharp.fluid,
                        sizes: '(max-width: 250px)'
                    }} />
                </Styled.CoverContainer>
                <Styled.TitleContainer>
                    <h1>{googleSheet1Sheet.title}</h1>
                    <h2>{googleSheet1Sheet.author}</h2>
                    <p>{googleSheet1Sheet.genres}</p>
                </Styled.TitleContainer>
            </Styled.HeaderContainer>
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
                    fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
`