import React from 'react'
import Link from 'gatsby-link'

import '../styles/blog-listing.css'

const TitleList = (props) => {
    const posts = props.posts
    let d = new Date()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let currentMonth = months[d.getMonth()]
    return (
        <div>
            <ul style={{
                listStyle: `none`
            }}>
                {posts
                    .filter(post => post.node.frontmatter.path
                        .includes(props.category) && post.node.frontmatter.date.includes(currentMonth))
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