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
      layout.push([{ page: page, pageIndex: pageIndex[0] }, []])
    } else {
      layout[pageIndex[0]][1].push({ page: page, pageIndex: pageIndex.map(String).join('.') })
    }
    
    return layout
  }, [])

  return (
    <nav className="sidebar">
    <div className="sidebar-title">THE ETH2 BOOK</div>
      <ul className="chapters">
        {layout.map((section, index) => {
          return (
            <li key={index}>
              <Link
                to={section[0].page.node.frontmatter.path}
                activeClassName="active"
              >
                <b>{section[0].pageIndex}.</b> {section[0].page.node.frontmatter.title}
              </Link>
              <ul>
                {section[1].map(({ page, pageIndex }, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={page.node.frontmatter.path}
                        activeClassName="active"
                      >
                        <b>{pageIndex}.</b> {page.node.frontmatter.title}
                      </Link>
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
