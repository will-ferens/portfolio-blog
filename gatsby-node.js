const { paginate } = require("gatsby-awesome-pagination")
const kebabCase = require("lodash.kebabcase")

//Create Blog Post pages, create Book pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/postTemplate.js`)
  const bookTemplate = require.resolve(`./src/templates/bookTemplate.js`)
  const blogTemplate = require.resolve(`./src/templates/blogTemplate.js`)

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
  paginate({
    createPage,
    items: result.data.allMarkdownRemark.edges,
    itemsPerPage: 4,
    pathPrefix: "/blog",
    component: blogTemplate,
  })
  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    })
  })

  result.data.allGoogleSheet1Sheet.edges.forEach(({ node }) => {
    let bookSlug = `/books/${kebabCase(node.title)}`
    createPage({
      path: bookSlug,
      component: bookTemplate,
      context: {
        title: node.title,
      },
    })
  })
}
