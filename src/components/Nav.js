import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav () {
  return (
    <nav className='nav' aria-label='Primary Navigation'>
      <ul>
        <li>
          <Link
            to='/'
            exact="true" >
            Home
          </Link>
        </li>
        <li>
          <Link to='/new'>
            New Question
          </Link>
        </li>
        <li>
          <Link to='/leaderboard'>
            Leaderboard
          </Link>
        </li>
      </ul>
    </nav>
  )
}