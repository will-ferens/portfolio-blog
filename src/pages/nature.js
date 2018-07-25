import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'

import TitleList from '../components/categories'
import '../styles/blog-listing.css'

export default function NaturePage ({data}) {
    
    const { edges: posts } = data.allMarkdownRemark

    return (
        <Media query="(max-width: 599px)">
            {matches =>
                matches ? (
                    
                    <div style={{
                        margin: '0 auto',
                        maxWidth: 350,
                        padding: '1.45rem 1.0875rem',
                    }}>
                    <h1>Nature</h1>
                    {posts
                        .filter(post => post.node.frontmatter.path
                            .includes("nature"))
                        .map(({ node: post }) => {
                            return (
                                <div className="blog-post-preview" key={post.id}>
                                    <h1>
                                        <Link style={{color: `#8785b3`}} to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                                    </h1>
                                    <h2>{post.frontmatter.date}</h2>
                                    <p>{post.excerpt}</p>
                                </div>
                            )
                        })}
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
                        <ul className="title-bar" style={{listStyle: `none`}}>
                            <li>
                                <h1><Link style={{color: `#8785b3`}}  to="/tech">Tech</Link></h1>
                                <TitleList
                                    posts={posts}
                                    category={"tech"}
                                />
                            </li>
                            <li>
                                <h1><Link style={{color: `#8785b3`}}  to="/culture">Culture</Link></h1>
                                <TitleList
                                    posts={posts}
                                    category={"culture"}
                                />
                            </li>
                            <li>
                                <h1><Link style={{color: `#8785b3`}}  to="/nature">Nature</Link></h1>
                                <TitleList
                                    posts={posts}
                                    category={"nature"}
                                />
                            </li>
                        </ul>
                    </div>
                    <div style={{
                        gridColumn: `2`,
                        maxWidth: 600
                    }}>
                    <h1>Nature</h1>
                    {posts
                        .filter(post => post.node.frontmatter.path
                            .includes("nature"))
                        .map(({ node: post }) => {
                            return (
                                <div className="blog-post-preview" key={post.id}>
                                    <h1>
                                        <Link style={{color: `#8785b3`}} to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                                    </h1>
                                    <h2>{post.frontmatter.date}</h2>
                                    <p>{post.excerpt}</p>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                )}
        </Media>
        
    )
}


export const NatureQuery = graphql `
    query NatureQuery {
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