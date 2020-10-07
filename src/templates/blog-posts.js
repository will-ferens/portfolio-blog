import React from "react"
import Helmet from "react-helmet"
import Media from 'react-media'

import '../styles/blog-post.css'


export default function Template({
    data 
}) {
    const post = data.markdownRemark 
        return (
            <Media query="(max-width: 599px)">
    {matches =>
        matches ? (
            <div style={{
                margin: `0 auto 8rem`,
                maxWidth: `350px`,
            }}>
            <Helmet title={`Will - ${post.frontmatter.title}`} />
            <div className="blog-post" style={{ background: `#121212` }}>
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
                gridTemplateColumns: `25% auto 25%`,
                gridGap: `16px`
            }}>
            <div className="blog-post" style={{
                gridColumn: `2`,
                width: `90%`,
                justifySelf: `center`,
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