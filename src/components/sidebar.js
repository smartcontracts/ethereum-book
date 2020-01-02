import React from "react"
import { Link } from "gatsby"

import "./sidebar.css"

const Sidebar = ({ pages }) => {
  return (
    <nav>
      <ul>
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <Link to={page.node.frontmatter.path}>{page.node.frontmatter.title}</Link>
              <div
                dangerouslySetInnerHTML={{ __html: page.node.tableOfContents }}
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Sidebar
