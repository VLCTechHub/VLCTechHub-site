const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type !== `event` && node.internal.type !== `job`) {
    return
  }

  if (node.alternative_id === null || node.alternative_id === undefined) {
    return
  }

  const { createNodeField } = actions
  const pruneLength = 140
  const excerpt = `${node.description.substr(
    0,
    node.description.lastIndexOf(' ', pruneLength))}...`
  createNodeField({
    node,
    name: `excerpt`,
    value: excerpt
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const redirects = [
    { from: `/`, to: `/events/` }
  ]
  redirects.forEach(({ from, to }) => {
    createRedirect({
      fromPath: from,
      redirectInBrowser: true,
      toPath: to
    })
  })

  const createItemPages = async () => {
    const results = await graphql(`
      {
        allEvent(filter: { alternative_id: { ne: null } }) {
          edges {
            node {
              alternative_id
              slug
            }
          }
        }
        allJob(filter: { alternative_id: { ne: null } }) {
          edges {
            node {
              alternative_id
            }
          }
        }
      }
    `)

    results.data.allEvent.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/event.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          alternative_id: node.alternative_id
        }
      })
    })

    results.data.allJob.edges.forEach(({ node }) => {
      createPage({
        path: node.alternative_id,
        component: path.resolve(`./src/templates/job.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          alternative_id: node.alternative_id
        }
      })
    })
  }
  await createItemPages()
}
