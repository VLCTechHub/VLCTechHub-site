import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Content from '../components/Content'
import JobItem from '../components/JobItem'

export default ({ data }) => {
  const { job } = data
  return (
    <Layout>
      <Meta
        title={job.title}
        description={job.fields.excerpt}
      />
      <Header title="Job" />
      <Content>
        <JobItem job={job} />
      </Content>
    </Layout>
  )
}

export const query = graphql`
  query($alternative_id: String!) {
    job(alternative_id: { eq: $alternative_id }) {
      id
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
    }
  }
`
