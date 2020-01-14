import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"

export default function Template({
  data,
}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  useEffect(() => {
    const MathJax = window.MathJax
    if (MathJax !== undefined) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub])
    }
  })

  return (
    <Layout>
      <Sidebar />
      <div className="main-content">
        <div className="container">
          <div className="chapter">
            <h1>{frontmatter.title}</h1>
            <div
              className="chapter-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
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
    }
  }
`
