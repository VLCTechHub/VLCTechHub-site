import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Content from '../components/Content'

export default ({ data }) => (
  <Layout>
    <Header title={`About ${data.site.siteMetadata.title}`} />
    <Content>
      <br/>
      VLCTechHub is a community driven initiative to bring together all the
      technical communities in the Valencia area.
    </Content>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
