import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'
import Meta from '../components/Meta'

const NavigationItem = ({ to, children }) => (
  <li
    css={css`
      display: inline-block;
      margin-right: 1rem;
    `}
  >
    <Link
      to={to}
      css={css`
        text-shadow: none;
      `}
    >
      {children}
    </Link>
  </li>
)

const NavigationList = ({ children }) => (
  <ul
    css={css`
      list-style: none;
      float: right;
    `}
  >
    {children}
  </ul>
)

const Navigation = () => (
  <NavigationList>
    <NavigationItem to="/events/">Events</NavigationItem>
    <NavigationItem to="/jobs/">Jobs</NavigationItem>
    <NavigationItem to="/about/">About</NavigationItem>
  </NavigationList>
)

const HomeAnchor = ({ title }) => (
  <Link
    to={`/`}
    css={css`
      text-shadow: none;
      background-image: none;
    `}
  >
    <h3
      css={css`
        display: inline-block;
        font-style: normal;
        margin-top: 0.25rem;
      `}
    >
      {title}
    </h3>
  </Link>
)

const Container = ({ children }) => (
  <div
    css={css`
      margin: 0 auto;
      max-width: 700px;
      padding: ${rhythm(2)};
      padding-top: ${rhythm(1.5)};
    `}
  >
    {children}
  </div>
)

const NavBar = ({ children }) => (
  <div
    css={css`
      display: flex;
      justify-content: space-between;
    `}
  >
    {children}
  </div>
)

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Container>
        <Meta
          title="Events and Jobs"
          description="VLCTechHub es el hub de eventos y empleo tecnológico en Valencia"
        />
        <NavBar>
          <HomeAnchor title={data.site.siteMetadata.title} />
          <Navigation />
        </NavBar>
        {children}
      </Container>
    )}
  />
)
