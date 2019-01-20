import React from 'react'
import Helmet from 'react-helmet'

export default ({ title, description }) => (
  <Helmet
    title={`${title} - VLCTechHub`}
    meta={[
      { name: 'description', content: title },
      { name: 'keywords', content: title },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@vlctechhub' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description }
    ]}
  >
    <html lang="en" />
  </Helmet>
)
