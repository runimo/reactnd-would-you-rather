import React, { Component } from 'react'

class UserCard extends Component {
  render () {
    const { user } = this.props

    return (
      <li className="card user-card p-b-0">
        {user.isLeading &&
            <div className="medal-container">
              <img alt="medal with a happy face" height="60px" src="/icons/medal.png" width="60px" />
              <a className="copyright-link text-vertical" href="https://www.flaticon.com/free-icons/ui" title="ui icons">Ui icons created by Freepik - Flaticon</a>
            </div>}
        <img alt="user avatar" className="user-card-image" height="180px" src={user.avatarURL} width="180px" />
        <div className="user-card-data">
          <h2 className="m-0">{user.name}</h2>

          <div className="flex flex-between m-t">
            <div className="bold m-r-0_5">
              Questions answered
            </div>
            <div>
              {user.answersCount}
            </div>
          </div>
          <div className="flex flex-between m-t">
            <div className="bold m-r-0_5">
              Questions asked
            </div>
            <div>
              {user.questionsCount}
            </div>
          </div>
        </div>

        <div className="m-t user-card-score flex">
          <div className="score-container">
            <div className="score-label">
              Score
            </div>
            <div className="score-content">
              <div className="score">
                {user.totalCount}
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default UserCard