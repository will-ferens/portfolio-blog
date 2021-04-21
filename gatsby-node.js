const kebabCase = require('lodash.kebabcase')
const createPaginatedPages = require('gatsby-paginate')

//Create Blog Post pages, create Book pages
exports.createPages = async ({
    actions,
    graphql,
    reporter
}) => {
    const {
        createPage
    } = actions

    const blogPostTemplate = require.resolve(`./src/templates/postTemplate.js`)
    const bookTemplate = require.resolve(`./src/templates/bookTemplate.js`)
    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                    limit: 1000
                ) {
                edges {
                    node {
						excerpt(pruneLength: 250)
						html
						id
						frontmatter {
							date
							slug
							title
						}
					}
                }
            }
            allGoogleSheet1Sheet {
                edges {
                    node {
                        id
                        title
                        author
                        genres
                        pages
                        blurb
                    }
                }
            }
        }
    `)
    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)

    result.data.allMarkdownRemark.edges.forEach(({
        node, i
    }) => {
        createPage({
            path: node.frontmatter.slug,
            component: blogPostTemplate,
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                slug: node.frontmatter.slug,
                currentPage: i + 1,
            },
        })
    })
    
    result.data.allGoogleSheet1Sheet.edges.forEach(({
        node
    }) => {
        let bookSlug = `/books/${kebabCase(node.title)}`
        createPage({
            path: bookSlug,
            component: bookTemplate,
            context: {
                title: node.title
            }
        })
    })
}