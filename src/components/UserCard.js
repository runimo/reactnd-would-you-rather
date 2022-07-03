import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserCard extends Component {
  render () {
    const { user } = this.props

    const answersCount = () => {
      return Object.keys(user.answers).length
    }

    const questionsCount = () => {
      return user.questions.length
    }

    const totalCount = () => {
      return answersCount() + questionsCount()
    }

    return (
      <li className="card user-card p-b-0">
        <img alt="user avatar" className="user-card-image" height="180px" src={user.avatarURL} width="180px" />
        <div className="m-t m-l-0_5 flex-grow-1">
          <h2 className="m-0">{user.name}</h2>
          <div className="flex flex-between m-t m-r">
            <div className="bold m-r-0_5">
              Questions answered
            </div>
            <div>
              {answersCount(user.id)}
            </div>
          </div>
          <div className="flex flex-between m-t m-r">
            <div className="bold m-r-0_5">
              Questions asked
            </div>
            <div>
              {questionsCount(user.id)}
            </div>
          </div>
        </div>
        <div className="m-t user-card-score flex-grow-1">
          <div className="score-container">
            <div className="score-label">
              Score
            </div>
            <div className="score-content">
              <div className="score">
                {totalCount(user.id)}
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

function mapStateToProps ({ users }, { id }) {
  return {
    user: users[id]
  }
}

export default connect(mapStateToProps)(UserCard)