import React from "react"

import "./toc.css"

const Toc = ({ toc }) => {
  return (
    <nav
      className="toc"
      dangerouslySetInnerHTML={{ __html: toc }}
    />
  )
}

export default Toc
