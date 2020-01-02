import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import "./sidebar.css"

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              pageIndex
            }
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `)

  const pages = data.allMarkdownRemark.edges

  const layout = pages.sort((a, b) => {
    return a.node.fields.pageIndex.localeCompare(b.node.fields.pageIndex)
  }).reduce((layout, page) => {
    const pageIndex = page.node.fields.pageIndex.split(',').map(pageIndex => parseInt(pageIndex))

    if (pageIndex[0] + 1 > layout.length) {
      layout.push([page, []])
    } else {
      layout[pageIndex[0]][1].push(page)
    }
    
    return layout
  }, [])

  return (
    <nav className="sidebar">
      <ul>
        {layout.map((section, index) => {
          return (
            <li key={index}>
              <Link to={section[0].node.frontmatter.path}>{section[0].node.frontmatter.title}</Link>
              <ul>
                {section[1].map((page, index) => {
                  return (
                    <li key={index}>
                      <Link to={page.node.frontmatter.path}>{page.node.frontmatter.title}</Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Sidebar
