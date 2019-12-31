module.exports = {
  siteMetadata: {
    title: `The Eth2 Book`,
    description: ``,
    author: `Kelvin Fichter (@kelvinfichter)`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
  ],
}
