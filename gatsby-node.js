const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions

    const nodePath = getNode(node.parent).relativePath
    const pageIndex = nodePath.match(/\d{2}__/g).map(index => index.replace('__', '')).join(',')
    
    createNodeField({
      node,
      name: `pageIndex`,
      value: pageIndex,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const chapterTemplate = path.resolve(`src/templates/chapter.js`)

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: chapterTemplate,
    })
  })
}