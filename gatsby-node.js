const path = require('path')
const axios = require('axios')

exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators
    const blogPostTemplate = path.resolve(`src/templates/blog-posts.js`)
    return graphql(`{
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
                        path
                        title
                    }
                }
            }
        }
    }`)
        .then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }
    result.data.allMarkdownRemark.edges
            .forEach(({ node }) => {
            createPage({
                path: node.frontmatter.path,
                component: blogPostTemplate,
                context: {} // additional data can be passed via context
            })
            })
        })
}

exports.sourceNodes = async ({
    actions,
    createNodeId,
    createContentDigest
}) => {
    const { createNode } = actions

    const fetchSheet = () => {
        axios.get(
            `https://docs.google.com/spreadsheets/d/e/2PACX-1vTEG33Ghcz54HyGfJmBkrDwulVrIIpJUDde5QisC-K64HWZQWsSb3LEw9NuOni2hw-HIob-NX2uGOLJ/pubhtml?gid=0&single=true`
        )
    }
    
    const response = await fetchSheet()

    createNode(response)

}

exports.modifyBabelrc = ({ babelrc }) => ({
    ...babelrc,
    plugins: babelrc.plugins.concat(['transform-regenerator']),
})