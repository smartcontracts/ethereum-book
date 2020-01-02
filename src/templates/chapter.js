import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import Toc from "../components/toc"

export default function Template({
  data,
}) {
  const { markdownRemark } = data
  const { frontmatter, html, tableOfContents } = markdownRemark

  return (
    <Layout>
      <Sidebar />
      <div className="container">
        <div className="chapter">
          <h1>{frontmatter.title}</h1>
          <div
            className="chapter-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <Toc toc={tableOfContents} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
      tableOfContents(
        absolute: true
        pathToSlugField: "frontmatter.path"
        maxDepth: 2
      )
    }
  }
`
