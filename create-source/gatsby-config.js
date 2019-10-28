module.exports = {
  siteMetadata: {
    title: `Source API example`,
    description: `Example for create source from api`,
    author: `@PatrickFaramaz`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ]
};
