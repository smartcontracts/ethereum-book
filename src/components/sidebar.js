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

  // Sort pages by page index.
  const pages = data.allMarkdownRemark.edges.sort((a, b) => {
    return a.node.fields.pageIndex.localeCompare(b.node.fields.pageIndex)
  })

  const layout = pages.reduce((layout, page) => {
    const [chapter, section] = page.node.fields.pageIndex.split(',')
    
    if (!(chapter in layout)) {
      layout[chapter] = {
        index: {
          page: page,
          location: `${parseInt(chapter, 10)}.0`,
        },
        sections: []
      }
    } else {
      layout[chapter].sections.push({
        page: page,
        location: `${parseInt(chapter, 10)}.${parseInt(section, 10)}`,
      })
    }

    return layout
  }, {})

  return (
    <nav className="sidebar">
    <div className="sidebar-title">THE ETH2 BOOK</div>
      <ul className="chapters">
        {Object.values(layout).map((chapter, index) => {
          return (
            <li key={index}>
              <Link
                to={chapter.index.page.node.frontmatter.path}
                activeClassName="active"
              >
                <b>{chapter.index.location}.</b> {chapter.index.page.node.frontmatter.title}
              </Link>
              <ul>
                {chapter.sections.map((section, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={section.page.node.frontmatter.path}
                        activeClassName="active"
                      >
                        <b>{section.location}.</b> {section.page.node.frontmatter.title}
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
