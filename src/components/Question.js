import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleSaveQuestionAnswer } from '../actions/shared'
import { saveUserAnswer } from '../actions/users'
import { useNavigate } from 'react-router-dom'

const Question = ({ authedUser, dispatch, id, isPreview, question, users }) => {
  let navigate = useNavigate()
  let selectedAnswer = authedUser ? users[authedUser.id].answers[id] : 'optionOne'

  let [answer, setAnswer] = React.useState(selectedAnswer)

  const authorAvatar = (authorId) => {
    return users[authorId] ? users[authorId].avatarURL : ''
  }

  const authorName = (authorId) => {
    return users[authorId] ? users[authorId].name : ''
  }

  const isAnsweredByAuthedUser = () => {
    return authedUser ? !!users[authedUser.id].answers[id] : false
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

  const percentageVoted = (option) => {
    const optionVotes = question[option].votes.length
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    return `${Math.round(optionVotes / totalVotes * 100)}%`
  }

  const timesVoted = (option) => {
    const optionVotes = question[option].votes.length
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    return `${optionVotes} out of ${totalVotes} votes`
  }

  return (
    <li className={`p-b-0_5 card ${!isPreview ? 'question-details' : ''}`}>
      <div className="card-header">
        {!isAnsweredByAuthedUser() && <h2>{authorName(question.author)} asks:</h2>}
        {isAnsweredByAuthedUser() && <h2>Asked by {authorName(question.author)}:</h2>}
        <span className="timestamp">{formatDate(question.timestamp)}</span>
      </div>
      <div className="flex p-t-0_5">
        <img alt="user avatar" className="card-avatar" height="150px" width ="150px" src={authorAvatar(question.author)} />
        <div className="width-100 p-r">
          <h3>Would you rather...</h3>
          {/* Question preview */}
          {isPreview &&
            <div>
              <div className="m-b">{optionOneText()}</div>
              <button className="btn btn-outline width-100" onClick={() => onViewPoll()}>View poll</button>
            </div>
          }
          {/* Question full view */}
          {!isPreview && !isAnsweredByAuthedUser() &&
            <form onSubmit={onSubmit}>
              <fieldset>
                <div>
                  <input id="optionOne" name="answer" type="radio" value="optionOne" onChange={onOptionChange} checked={answer === 'optionOne'} disabled={isAnsweredByAuthedUser()} />
                  <label className="radio-label" htmlFor="optionOne">{question.optionOne.text}</label>
                </div>
                <div>
                  <input id="optionTwo" name="answer" type="radio" value="optionTwo" onChange={onOptionChange} checked={answer === 'optionTwo'} disabled={isAnsweredByAuthedUser()} />
                  <label className="radio-label" htmlFor="optionTwo">{question.optionTwo.text}</label>
                </div>
              </fieldset>
              <button className="btn btn-primary width-50 m-t m-b-0_5" type="submit">Submit</button>
            </form>
          }
          {!isPreview && isAnsweredByAuthedUser() &&
            <div>
              <div className={`m-b p bold answer ${answer === 'optionOne' ? 'is-selected' : ''}`}>
                ...{question.optionOne.text}
                {answer === 'optionOne' && <div className="voted">
                  <span>Your vote</span>
                </div>}
                <div className="text-align-center">
                  <div className="bg-color-lightgrey border-radius-right">
                    <div className="progress-bar" style={{ width: percentageVoted('optionOne')}}>
                      <span className={`completed ${percentageVoted('optionOne') !== '0%' ? 'color-white' : 'm-l-0_5'}`}>{percentageVoted('optionOne')}</span>
                    </div>
                  </div>
                  <span>{timesVoted('optionOne')}</span>
                </div>
              </div>
              <div className={`m-b p bold answer ${answer === 'optionTwo' ? 'is-selected' : ''}`}>
                ...{question.optionTwo.text}
                {answer === 'optionTwo' && <div className="voted">
                  <span>Your vote</span>
                </div>}
                <div className="text-align-center">
                  <div className="bg-color-lightgrey border-radius-right">
                    <div className="progress-bar" style={{ width: percentageVoted('optionTwo')}}>
                      <span className={`completed ${percentageVoted('optionTwo') !== '0%' ? 'color-white' : 'm-l-0_5'}`}>{percentageVoted('optionTwo')}</span>
                    </div>
                  </div>
                  <span>{timesVoted('optionTwo')}</span>
                </div>
              </div>
            </div>}
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