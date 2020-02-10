import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"

const DRAFT_STATUS = {
  '0': 'NOT READY FOR REVIEW',
  '1': 'NOT REVIEWED',
  '2': 'REVIEWED INTERNALLY, CONTENT STRUCTURE NOT FINALIZED',
  '3': 'CONTENT STRUCTURE FINALIZED',
  '4': 'READY FOR FINAL EDITS',
  '5': 'FINAL DRAFT',
}

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

  const status = `DRAFT STATUS ${frontmatter.status}/5: ${DRAFT_STATUS[frontmatter.status]}`

  return (
    <Layout>
      <Sidebar />
      <div className="main-content">
        <div className="container">
          <div className="chapter">
            <h1>{frontmatter.title}</h1>
            <div className="draft-status">
              <pre>
                <code class="language-text">
                  {status}
                </code>
              </pre>
            </div>
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
        status
      }
    }
  }
`
