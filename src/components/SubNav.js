import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class SubNav extends Component {
  render () {
    return (
      <nav className="sub-navigation">
        <ul>
          <li>
            <NavLink to='/unanswered' className={({ isActive }) =>
              isActive ? 'active' : undefined
            }>
              Unanswered
            </NavLink>
          </li>
          <li>
            <NavLink to='/answered' className={({ isActive }) =>
              isActive ? 'active' : undefined
            }>
              Answered
            </NavLink>
          </li>
        </ul>
      </nav>

    )
  }
}

export default SubNav
