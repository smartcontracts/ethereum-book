import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Sidebar from "./sidebar"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            tableOfContents(
              absolute: true
              pathToSlugField: "frontmatter.path"
              maxDepth: 2
            )
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `)
  console.log(data)

  return (
    <>
      <Sidebar pages={data.allMarkdownRemark.edges} />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout