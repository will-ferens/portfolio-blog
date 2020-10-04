import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'

import '../styles/blog-listing.css'



export default function IndexPage({ data }) {
    
const { edges: posts } = data.allMarkdownRemark

    return (
        <Media query="(max-width: 599px)">
        {matches =>
            matches ? (
            
            <div style={{
                margin: '0 auto 6rem',
                maxWidth: 350,
                padding: '1.45rem 1.0875rem',
            }}>
            <div>
                <h1>Hello.</h1>
                <p>This is a blog. </p>
                <p>Below is a collection of notes.</p>
                <p>Both personal and technical, they're more for myself than anyone else.</p>
                <p>But you're more than welcome to stay a while.</p>
            </div>
            <div className="blog-posts">
                {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => {
                    return (
                    <Link className="blog-post-preview"  to={post.frontmatter.path} key={post.id}>
                        <h1>
                            {post.frontmatter.title}
                        </h1>
                        <h2>{post.frontmatter.date}</h2>
                        <p>{post.excerpt}</p>
                    </Link>
                    )
                })}
            </div>
            </div>
            ) : (
            <div style={{
                display: `grid`,
                gridTemplateColumns: `25% auto 25%`,
                gridGap: `16px`,
                marginBottom: `6rem`
            }}>
            <div className="blog-lead">
                <h1>Hello.</h1>
                <p>Below is a collection of notes.</p>
                <p>Both personal and technical, they're more for myself than anyone else.</p>
                <p>But you're more than welcome to stay a while.</p>
            </div>
            <div className="blog-posts" style={{
                gridColumn: `2`,
                justifySelf: `center`,
                width: `90%`,
            }}>
                {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => {
                    return (
                    <Link to={post.frontmatter.path} key={post.id}  className="blog-post-preview">
                        <h1>
                            {post.frontmatter.title}
                        </h1>
                        <h2>{post.frontmatter.date}</h2>
                        <span>{post.excerpt}</span>
                    </Link>
                    )
                })}
            </div>
            </div>
            )}
        
        </Media>
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

