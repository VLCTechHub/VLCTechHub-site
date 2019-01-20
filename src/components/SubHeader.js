import React from 'react'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

export default ({ title }) => (
  <h4
    css={css`
      margin-top: -${rhythm(1 / 2)};
    `}
  >
    {title}
  </h4>
)
