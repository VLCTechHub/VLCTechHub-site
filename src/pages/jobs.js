import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import JobList from '../components/JobList'

export default ({ data }) => (
  <Layout>
    <JobList jobs={data.allJob} />
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allJob(
      filter: { alternative_id: { ne: null } }
      sort: { fields: [published_at], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          alternative_id
          title
          company {
            name
            link
          }
          tags
          description
          fields {
            excerpt
          }
          salary
          how_to_apply
          published_at
        }
      }
    }
  }
`
