import React from "react"
import { Link, graphql } from "gatsby"

import Pager from "../components/pager/pager"
import Layout from "../components/layout"
import SEO from "../components/seo"

import * as Global from "../constants/globalStyles"
import * as Styled from "../styles/index"

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            slug
          }
        }
      }
    }
  }
`

const BlogArchive = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Blog" />
      <Global.Container>
        <Global.ContainerItem>
          {posts.map(({ node: post }) => {
            return (
              <Styled.Preview key={post.id}>
                <Link to={post.frontmatter.slug}>
                  <Global.Heading1>{post.frontmatter.title}</Global.Heading1>
                  <Styled.Date>{post.frontmatter.date}</Styled.Date>
                  <span>{post.excerpt}</span>
                </Link>
              </Styled.Preview>
            )
          })}
          <Pager pageContext={pageContext} />
        </Global.ContainerItem>
      </Global.Container>
    </Layout>
  )
}

export default BlogArchive
