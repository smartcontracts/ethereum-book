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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-images-zoom`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-mathjax`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `@wardpeet/gatsby-plugin-static-site`,
  ],
}
