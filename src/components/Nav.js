import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav' aria-label='Primary Navigation'>
      <ul>
        <li className="nav-item">
          <NavLink
            to='/'
            exact="true"
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to='/add'
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }>
            New Question
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to='/leaderboard'
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }>
            Leaderboard
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}