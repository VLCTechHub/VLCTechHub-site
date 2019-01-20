import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'
import moment from 'moment'
import remark from 'remark'
import remark2react from 'remark-react'

export default ({ event }) => (
  <div key={event.id}>
    <Link
      to={event.slug}
      css={css`
        text-decoration: none;
        color: inherit;
      `}
    >
      <h3
        css={css`
          margin-bottom: ${rhythm(1 / 4)};
        `}
      >
        {event.title}
      </h3>
      <h3
        css={css`
          color: #bbb;
          margin-top: ${rhythm(1 / 4)};
        `}
      >
        {moment(event.date).format('DD MMMM YYYY - H:mm')}
      </h3>
      <div>
        {
          remark()
            .use(remark2react)
            .processSync(event.fields.excerpt).contents
        }
      </div>
    </Link>
  </div>
)
