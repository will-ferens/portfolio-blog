import React from "react"
import Helmet from "react-helmet"
import Media from 'react-media'
import Link from 'gatsby-link'

export default function Template({
    data 
}) {
    const post = data.markdownRemark 
        return (
            <Media query="(max-width: 599px)">
    {matches =>
        matches ? (
            <div style={{
                margin: `0 auto `,
                maxWidth: `350px`,
        
            }}>
            <Helmet title={`Will - ${post.frontmatter.title}`} />
            <div className="blog-post">
                <h1>{post.frontmatter.title}</h1>
                <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </div>
            </div>
        ) : (
            <div style={{
                display: `grid`,
                gridTemplateColumns: `1fr 3fr`,
                gridGap: `16px`
            }}>
            <div style={{
                gridColumn: `1`,
                margin: `1rem`
            }}>

            </div>
            <Helmet title={`Will - ${post.frontmatter.title}`} />
            <div style={{
                gridColumn: `2`,
                maxWidth: 600
            }}>
                <h1 >{post.frontmatter.title}</h1>
                <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </div>
            </div>
        )}
            
        </Media>
        )
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title

            }
        }
    }
`