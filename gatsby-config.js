module.exports = {
  siteMetadata: {
    title: 'Will Ferens',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    `gatsby-plugin-glamor`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },

    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-javascript-frontmatter` 
  ],
}