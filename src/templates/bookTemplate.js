import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import SEO from "../components/seo"

import Ratings from "../components/ratings/ratings"
import Layout from "../components/layout"

import * as Global from "../constants/globalStyles"
import * as Styled from "../templateStyles/bookPageTemplate"

export default function Template({ data }) {
  const { googleSheet1Sheet } = data
  const linkStyle = css`
    color: #3c3880;
    font-weight: 700;
    grid-column: 2;
  `
  return (
    <Layout>
      <SEO title="Books" />
      <Styled.HeaderContainer>
        <Link css={linkStyle} to="/books">
          ← Back
        </Link>
      </Styled.HeaderContainer>
      <Styled.HeaderContainer>
        <Styled.CoverContainer>
          <GatsbyImage
            image={googleSheet1Sheet.file.childImageSharp.gatsbyImageData}
            alt={googleSheet1Sheet.title}
          />
        </Styled.CoverContainer>
        <Styled.TitleContainer>
          <h1>{googleSheet1Sheet.title}</h1>
          <h2>{googleSheet1Sheet.author}</h2>
          <p>{googleSheet1Sheet.genres}</p>
          <Ratings rating={googleSheet1Sheet.rating} />
        </Styled.TitleContainer>
      </Styled.HeaderContainer>
      <Global.Container>
        <Global.ContainerItem>
          <p>{googleSheet1Sheet.blurb}</p>
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
      blurb
      optimizedCoverImage {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            width: 200
            placeholder: BLURRED
          )
        }
      }
    }
  }
`
