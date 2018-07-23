import React from 'react'
import Link from 'gatsby-link'

import '../styles/blog-listing.css'

const TitleList = (props) => {
    const posts = props.posts
    return (
        <div>
            <ul style={{
                listStyle: `none`
            }}>
                {posts
                    .filter(post => post.node.frontmatter.path
                        .includes(props.category))
                        .map(({ node: post }) => {
                            return (
                            <li className="title-list" key={post.id}>
                                <Link 
                                style={{
                                fontSize: `.7em`,
                                textDecoration: `none`,
                                }} 
                                to={post.frontmatter.path} 
                                >
                                {post.frontmatter.title}
                                </Link>
                            </li>
                            )
                    })
                }
                </ul>
        </div>
    )
}
export default TitleList