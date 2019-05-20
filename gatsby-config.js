// feeds our app environment variables when it finds a .env.production or
// .env.development file
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    // title is used in the blog index page and the seoTitle is meant for the
    // meta tags in the blogs to help with seo.  Thus, title is to be visually
    // seen when people visit the site
    title: `Between Two Parens`,
    author: `Thomas Mattacchione`,
    description: `A blog about life between two parens`,
    seoTitle: `Between Two Parens - a blog on clojure, clojurescript and programming`,
    seoLang: `en`,
    seoDescription: `A blog about programming clojure, clojurescript and javascript for the purpose of teaching and learning`,
    ogURL: `https://www.betweentwoparens.com`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'gatsby-code-',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
    /**
     * Analytics
     */
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GA_TRACKING_ID,
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
  ],
}
