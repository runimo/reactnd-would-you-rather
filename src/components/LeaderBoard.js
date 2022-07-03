import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'

class LeaderBoard extends Component {
  render () {
    const { users } = this.props

    return (
      <ul className="flex flex-center flex-wrap card-list">
      {Object.values(users).map(user => (
        <UserCard id={user.id} key={user.id} />
      ))}
      </ul>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(LeaderBoard)