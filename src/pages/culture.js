import React from 'react'
import Link from 'gatsby-link'

import TitleList from '../components/categories'
import '../styles/blog-listing.css'

export default function CulturePage ({data}) {
    
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
                <h1><Link to="/tech">Tech</Link></h1>
                <TitleList
                    posts={posts}
                    category={"tech"}
                />
            </li>
            <li>
                <h1><Link to="/culture">Culture</Link></h1>
                <TitleList
                    posts={posts}
                    category={"culture"}
                />
            </li>
            <li>
                <h1><Link to="/nature">Nature</Link></h1>
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
        <h1>Culture</h1>
        {posts
            .filter(post => post.node.frontmatter.path
                .includes("culture"))
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


export const cultureQuery = graphql `
    query CultureQuery {
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