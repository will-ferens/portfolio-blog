import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import * as Global from '../constants/globalStyles'
import * as Styled from '../styles/index'

export default function IndexPage ({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (

      <Layout>
        <SEO title="Home" />
        <Global.Container>
          <Global.ContainerItem>
              <h1>Hello.</h1>
              <p>Below is a collection of notes.</p>
              <p>Both personal and technical, they're more for myself than anyone else.</p>
              <p>But you're more than welcome to stay a while.</p>
          </Global.ContainerItem>
          <Global.ContainerItem>
              {posts
              .filter(post => post.node.frontmatter.title.length > 0)
              .map(({ node: post }) => {
                  return (
                    <Styled.Preview key={post.id}>
                      <Link to={post.frontmatter.slug}>
                          <Global.Heading1>
                              {post.frontmatter.title}
                          </Global.Heading1>
                          <Styled.Date>{post.frontmatter.date}</Styled.Date>
                          <span>{post.excerpt}</span>
                      </Link>
                    </Styled.Preview>
                  )
              })}
          </Global.ContainerItem>
        </Global.Container>
      </Layout>
  )
}

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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