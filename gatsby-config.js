module.exports = {
  siteMetadata: {
    title: `VLCTechHub`
  },
  plugins: [
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        headers: {
          'Content-Type': 'application/json'
        },
        entitiesArray: [
          {
            url: `https://api.vlctechhub.org/v1/events?category=recent`,
            entityLevel: `events`,
            name: `event`
          },
          {
            url: `https://api.vlctechhub.org/v1/jobs`,
            entityLevel: `jobs`,
            name: `job`
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-static-redirect`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    }
  ]
}
