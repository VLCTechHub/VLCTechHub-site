import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Content from '../components/Content'
import EventItem from '../components/EventItem'

export default ({ data }) => {
  const { event } = data
  return (
    <Layout>
      <Meta
        title={event.title}
        description={event.fields.excerpt}
      />
      <Header title="Event" />
      <Content>
        <EventItem event={event} />
      </Content>
    </Layout>
  )
}

export const query = graphql`
  query($alternative_id: String!) {
    event(alternative_id: { eq: $alternative_id }) {
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
`
