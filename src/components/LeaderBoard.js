import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'

class LeaderBoard extends Component {
  render () {
    const { users } = this.props

    return (
      <ul className="flex flex-center flex-wrap card-list">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
      </ul>
    )
  }
}

function mapStateToProps ({ users }) {
  let allTotalCounts = []
  const sortedUsers = Object.values(users)
    .map(user => {
      const answersCount = Object.keys(user.answers).length
      const questionsCount = user.questions.length
      const totalCount = answersCount + questionsCount
      allTotalCounts.push(totalCount)
      return {
        ...user,
        answersCount,
        questionsCount,
        totalCount
      }
    })
    .sort((a,b) => b.totalCount - a.totalCount)
    .map(user => {
      return {
        ...user,
        isLeading: user.totalCount === Math.max(...allTotalCounts)
      }
    })
  return {
    users: sortedUsers
  }
}

export default connect(mapStateToProps)(LeaderBoard)