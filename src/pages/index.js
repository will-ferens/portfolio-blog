import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'

import TitleList from '../components/categories'
import '../styles/blog-listing.css'

export default function IndexPage({ data }) {

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
            <div style={{
                borderLeft: `1px solid #8785b3`,
                paddingLeft: `10px`
            }}>
                <h1>Hello!</h1>
                <h4>And welcome.</h4>
                <p><i>
                I'm a Full Stack Web Developer and this is a blog I built. <br/>
                Below you'll find my writing on all of my passions: code, culture, and our natural world. <br/>
                Check out the Projects section to see other things I've built and follow me on Twitter for more updates!
                </i></p>
            </div>
            <div className="blog-posts">
                {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => {
                    return (
                    <div className="blog-post-preview" key={post.id}>
                        <h1>
                        <Link style={{ color: `#8785b3` }} to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                        </h1>
                        <h2>{post.frontmatter.date}</h2>
                        <p>{post.excerpt}</p>
                    </div>
                    )
                })}
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
                borderLeft: `1px solid #8785b3`,
                paddingLeft: `10px`,
                maxWidth: 600
            }}>
                <h1>Hello!</h1>
                <h6>And welcome.</h6>
                <p><i>
                I'm a Full Stack Web Developer and this is a blog I built. <br/>
                Below you'll find my writing on all of my passions: code, culture, and our natural world. <br/>
                Check out the Projects section to see other things I've built and follow me on Twitter for more updates!
                </i></p>
            </div>
            <div className="blog-posts" style={{
                gridColumn: `2`,
                maxWidth: 600
            }}>
                {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => {
                    return (
                    <div className="blog-post-preview" key={post.id}>
                        <h1>
                        <Link style={{ color: `#8785b3` }}  to={post.frontmatter.path}>{post.frontmatter.title}</Link>
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

