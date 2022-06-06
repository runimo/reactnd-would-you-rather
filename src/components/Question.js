import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers.js'
import { handleSaveQuestionAnswer } from '../actions/shared'
import { saveUserAnswer } from '../actions/users'
import { useNavigate } from 'react-router-dom'

const Question = ({ authedUser, dispatch, id, isPreview, question, users }) => {
  let navigate = useNavigate()
  let [answer, setAnswer] = React.useState('optionOne');

  const authorAvatar = (authorId) => {
    return users[authorId] ? users[authorId].avatarURL : ''
  }

  const authorName = (authorId) => {
    return users[authorId] ? users[authorId].name : ''
  }

  const onOptionChange = (e) => {
    setAnswer(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(handleSaveQuestionAnswer(question.id, answer))
    dispatch(saveUserAnswer(answer, authedUser.id, question.id))
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
            <form onSubmit={onSubmit}>
              <fieldset>
                <div>
                  <input id="optionOne" name="answer" type="radio" value="optionOne" onChange={onOptionChange} defaultChecked />
                  <label className="radio-label" htmlFor="optionOne">{question.optionOne.text}</label>
                </div>
                <div>
                  <input id="optionTwo" name="answer" type="radio" value="optionTwo" onChange={onOptionChange} />
                  <label className="radio-label" htmlFor="optionTwo">{question.optionTwo.text}</label>
                </div>
              </fieldset>
              <button className="btn btn-primary width-50 m-t m-b-0_5" type="submit">Submit</button>
            </form>
          }
        </div>
      </div>
    </li>
  )
}


function mapStateToProps({ authedUser, questions, users }, { id, isPreview }) {
  return {
    authedUser,
    question: questions[id] || null,
    users
  }
}

export default connect(mapStateToProps)(Question)