import React, { Fragment } from 'react'
import Header from './Header'
import SubHeader from './SubHeader'
import Content from './Content'
import EventExcerpt from './EventExcerpt'

export default ({ events }) => (
  <Fragment>
    <Header title="Events" />
    <SubHeader title={`${events.totalCount} Events`} />
    <Content>
      {events.edges
        .map(({ node }) => (
          <EventExcerpt event={node} />
        ))}
    </Content>
  </Fragment>
)
