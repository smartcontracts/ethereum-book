import React, { Component } from "react"
import { FaBars } from 'react-icons/fa'

import "./toolbar.css"

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = { collapsed: false }
    this.toggleCollapse = this.toggleCollapse.bind(this)
  }

  toggleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed
    }, () => {
      const main = document.querySelector('#main')
      this.state.collapsed ? main.classList.add('collapsed') : main.classList.remove('collapsed')
    })
  }

  render() {
    return (
      <nav className="toolbar no-print">
        <button className="collapse-button" onClick={this.toggleCollapse}><FaBars /></button>
        <div className="toolbar-title">THE ETH2 BOOK</div>
      </nav>
    )
  }
}

export default Toolbar
