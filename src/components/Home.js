import React, { Component, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Login'
import QuestionsList from './QuestionsList'
import SubNav from './SubNav'

class Home extends Component {
  render () {
    const { answeredQuestionIds, authedUser, unansweredQuestionIds } = this.props

    if (!authedUser) {
      return (
        <Fragment>
          <div className="img-container">
            <img className="illustration" src="/images/would_you_rather_illustration_jcomp_freepik.jpg" alt="Illustration of a woman sitting cross-legged and scratching her head, looking at a huge question mark" />
            <a className="copyright-link" href='https://www.freepik.com/vectors/people'>People vector created by jcomp - www.freepik.com</a>
          </div>

          <Login />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <SubNav />
          <div className="flex flex-center">
            <Routes>
              <Route path='/unanswered' element={<QuestionsList questionIds={unansweredQuestionIds} />} />
              <Route path='/answered' element={<QuestionsList questionIds={answeredQuestionIds} />} />
            </Routes>
          </div>
        </Fragment>
      )
    }
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  const currentUser = authedUser ? users[authedUser.id] : null
  const answeredQIds = currentUser
    ? Object.keys(currentUser.answers)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    : []
  const unansweredQIds = currentUser
    ? Object.keys(questions)
        .filter(qId => !currentUser.answers[qId])
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    : []

  return {
    answeredQuestionIds: answeredQIds,
    authedUser: currentUser,
    unansweredQuestionIds: unansweredQIds
  }
}

export default connect(mapStateToProps)(Home)