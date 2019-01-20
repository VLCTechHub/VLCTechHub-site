import React, { Fragment } from 'react'
import Header from './Header'
import SubHeader from './SubHeader'
import Content from './Content'
import JobExcerpt from './JobExcerpt'

export default ({ jobs }) => (
  <Fragment>
    <Header title="Jobs" />
    <SubHeader title={`${jobs.totalCount} Jobs`} />
    <Content>
      {jobs.edges.map(({ node }) => (
        <JobExcerpt job={node} />
      ))}
    </Content>
  </Fragment>
)
