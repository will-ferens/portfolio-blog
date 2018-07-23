import React, { Component } from 'react'
import Link from 'gatsby-link'

import TitleList from '../components/categories'
import '../styles/blog-listing.css'



export default function IndexPage({ data }) {

  const { edges: posts } = data.allMarkdownRemark

    return (
      <div style={{
        display: `grid`,
        gridTemplateColumns: `1fr 3fr`,
        gridGap: `16px`
      }}>
      <div style={{
        gridColumn: `1`,
        margin: `1rem`
      }}>
        <ul className="title-bar" style={{listStyle: `none`}}>
        <li>
        <h1 >Tech</h1>
          <TitleList
            posts={posts}
            category={"tech"}
            />
        </li>
        <li>
          <h1>Culture</h1>
          <TitleList
            posts={posts}
            category={"culture"}
            />
        </li>
        <li>
          <h1>Nature</h1>
          <TitleList
            posts={posts}
            category={"nature"}
            />
          </li>
        </ul>
      </div>
      <div style={{
        gridColumn: `2`
      }}>
        <h1>Hello!</h1>
        <h4>And welcome.</h4>
        <p>
          I'm a Full Stack Web Developer and this is a blog I built. <br/>
          Below you'll find my writing on all of my passions: code, culture, and our natural world. <br/>
          Check out the Projects section to see other things I've built and follow me on Twitter for more updates!
        </p>
      </div>
      <div className="blog-posts" style={{
        gridColumn: `2`
      }}>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <div className="blog-post-preview" key={post.id}>
                <h1>
                  <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                </h1>
                <h2>{post.frontmatter.date}</h2>
                <p>{post.excerpt}</p>
              </div>
            )
          })}
      </div>
      </div>
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
            title
            date(formatString: "MMMM DD, YYYY")
            path

          }
        }
      }
    }
  }
`