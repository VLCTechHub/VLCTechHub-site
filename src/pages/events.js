import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import EventList from '../components/EventList'

export default ({ data }) => (
  <Layout>
    <EventList events={data.allEvent} />
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allEvent(
      filter: { alternative_id: { ne: null } }
      sort: { fields: [date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          title
          date
          slug
          description
          fields {
            excerpt
          }
        }
      }
    }
  }
`
