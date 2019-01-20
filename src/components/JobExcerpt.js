import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'
import remark from 'remark'
import remark2react from 'remark-react'

export default ({ job }) => (
  <div key={job.id}>
    <Link
      to={job.alternative_id}
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
        {job.title}
      </h3>
      <h3
        css={css`
          color: #bbb;
          margin-top: ${rhythm(1 / 4)};
        `}
      >
        {job.company.name}
      </h3>
      <div
        css={css`
          overflow: hidden;
        `}
      >
        <ul
          css={css`
            margin-left: 0;
            list-style-type: none;
          `}
        >
          {job.tags.map(tag => (
            <li
              key={tag}
              css={css`
                color: #fff;
                background: #3498db;
                float: left;
                padding: 0.3em 1em;
                margin-right: 0.5em;
                border-radius: 1em;
                font-size: 0.75em;
                text-shadow: none;
              `}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {
          remark()
            .use(remark2react)
            .processSync(job.fields.excerpt).contents
        }
      </div>
    </Link>
  </div>
)
