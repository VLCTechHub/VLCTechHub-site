import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'
import moment from 'moment'
import remark from 'remark'
import remark2react from 'remark-react'

export default ({ event }) => (
  <Fragment>
    <div key={event.id}>
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
            .processSync(event.description).contents
        }
      </div>
    </div>
    <Link to="/events/">Go back</Link>
  </Fragment>
)
