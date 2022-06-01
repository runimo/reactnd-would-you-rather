import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers.js'
import { useNavigate } from 'react-router-dom'

const Question = ({ id, isPreview, question, users }) => {
  let navigate = useNavigate()

  const authorAvatar = (authorId) => {
    return users[authorId] ? users[authorId].avatarURL : ''
  }

  const authorName = (authorId) => {
    return users[authorId] ? users[authorId].name : ''
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const onViewPoll = () => {
    navigate(`/question/${id}`)
  }

  const optionOneText = () => {
    let optionOneText = question.optionOne.text
    return optionOneText.substr(0, 14) + '\u2026'
  }

  return (
    <li className={`card ${!isPreview ? 'question-details' : ''}`}>
      <div className="card-header">
        <h2>{authorName(question.author)} asks:</h2>
        <span className="timestamp">{formatDate(question.timestamp)}</span>
      </div>
      <div className="flex p-t-0_5">
        <img alt="user avatar" className="card-avatar" height="150px" width ="150px" src={authorAvatar(question.author)} />
        <div className="width-100 p-r">
          <h3>Would you rather...</h3>
          {isPreview &&
            <div>
              <div className="m-b">{optionOneText()}</div>
              <button className="btn btn-outline width-100" onClick={() => onViewPoll()}>View poll</button>
            </div>
          }
          {!isPreview &&
            <form>
              <fieldset>
                <div>
                  <input id="optionOne" name="answer" type="radio" value="optionOne" defaultChecked />
                  <label className="radio-label" htmlFor="optionOne">{question.optionOne.text}</label>
                </div>
                <div>
                  <input id="optionTwo" name="answer" type="radio" value="optionTwo" />
                  <label className="radio-label" htmlFor="optionTwo">{question.optionTwo.text}</label>
                </div>
              </fieldset>
              <button className="btn btn-primary width-50 m-t m-b-0_5" type="submit" onClick={e => onSubmit(e)}>Submit</button>
            </form>
          }
        </div>
      </div>
    </li>
  )
}


function mapStateToProps({ questions, users }, { id, isPreview }) {
  return {
    question: questions[id] || null,
    users
  }
}

export default connect(mapStateToProps)(Question)