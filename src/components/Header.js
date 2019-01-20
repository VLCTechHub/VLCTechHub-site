import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

export default ({ title }) => (
  <h1
    css={css`
      display: inline-block;
      border-bottom: 1px solid;
      margin-bottom: ${rhythm(1)};
    `}
  >
    {title}
  </h1>
)
