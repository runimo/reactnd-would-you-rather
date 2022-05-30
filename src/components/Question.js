import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers.js'

class Question extends Component {

  authorAvatar (authorId) {
    const { users } = this.props
    return users[authorId] ? users[authorId].avatarURL : ''
  }

  authorName (authorId) {
    const { users } = this.props
    return users[authorId] ? users[authorId].name : ''
  }

  optionOneText () {
    let optionOneText = this.props.question.optionOne.text
    return optionOneText.substr(0, 14) + '\u2026'
  }

  render () {
    const isPreview = true
    const { question } = this.props

    return (
      <li className="card">
        <div className="card-header">
          <h2>{this.authorName(question.author)} asks:</h2>
          <span className="timestamp">{formatDate(question.timestamp)}</span>
        </div>
        <div className="flex p-t-0_5">
          <img alt="user avatar" className="card-avatar" height="150px" width ="150px" src={this.authorAvatar(question.author)} />
          <div className="width-100 p-r">
            <h3>Would you rather...</h3>
            {isPreview &&
              <div>
                <div className="m-b">{this.optionOneText()}</div>
                <button className="btn btn-outline width-100">View poll</button>
              </div>
            }
            {!isPreview && <div></div>}
          </div>
        </div>
      </li>
    )
  }
}

function mapStateToProps({ questions, users }, { id }) {
  return {
    question: questions[id] || null,
    users
  }
}

export default connect(mapStateToProps)(Question)