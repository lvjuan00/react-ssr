import React, { Component } from 'react'
import Router from '@config/router.jsx'
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return [
      <div key="1">
        nav:
        <Link to="/course">课程</Link>
        --
        <Link to="/resource">资源</Link>
        sssss
      </div>,
      <Router key="router" />,
    ]
  }
}

export default App
