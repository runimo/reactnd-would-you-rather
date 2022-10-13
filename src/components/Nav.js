import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

 class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(''))
  }

   render () {
    const { authedUser, isCollapsible, isOpen } = this.props

      if (!isCollapsible) return (
      <nav className="nav" aria-label='Primary Navigation'>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink
              to='/'
              exact="true"
              className={({ isActive }) =>
                isActive ? 'is-active' : ''
              }>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to='/add'
              className={({ isActive }) =>
                isActive ? 'is-active' : ''
              }>
              New Question
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to='/leaderboard'
              className={({ isActive }) =>
                isActive ? 'is-active' : ''
              }>
              Leaderboard
            </NavLink>
          </li>
        </ul>
      </nav>
    )

    if (isCollapsible && isOpen) return (
        <nav className="flyout-menu" aria-label="Primary Navigation">
          <ul className="flyout-links">
            <li className="nav-item">
              <NavLink
                to='/'
                exact="true">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to='/add'>
                New Question
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to='/leaderboard'>
                Leaderboard
              </NavLink>
            </li>
            {authedUser && <li>
              <a href="/" onClick={e => this.handleLogout(e)}>Logout</a>
            </li>}
          </ul>
        </nav>
    )

    return null
   }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: authedUser ? users[authedUser.id] : null
  }
}

export default connect(mapStateToProps)(Nav)