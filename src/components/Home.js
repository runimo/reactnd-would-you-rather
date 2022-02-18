import React, { Component, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import AnsweredQuestionsList from './AnsweredQuestionsList'
import illustration from '../images/would_you_rather_illustration_jcomp_freepik.jpg'
import Login from './Login'
import SubNav from './SubNav'
import UnansweredQuestionsList from './UnansweredQuestionsList'

class Home extends Component {
  render () {
    const { authedUser } = this.props

    if (!authedUser) {
      return (
        <Fragment>
          <div className="img-container">
            <img className="illustration" src={ illustration } alt="" />
            <a className="copyright-link" href='https://www.freepik.com/vectors/people'>People vector created by jcomp - www.freepik.com</a>
          </div>

          <Login />
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <SubNav />
          <div>
            <Routes>
              <Route path='/unanswered' element={<UnansweredQuestionsList />} />
              <Route path='/answered' element={<AnsweredQuestionsList />} />
            </Routes>
          </div>
        </Fragment>

      )
    }
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  const currentUser = authedUser ? users[authedUser.id] : null

  return {
    answeredQuestions: currentUser ? Object.keys(currentUser.answers).map(key => questions[key]) : [],
    authedUser: currentUser,
    unansweredQuestions: currentUser ? Object.values(questions).filter(question => currentUser.answers[question.id]) : []
  }
}

export default connect(mapStateToProps)(Home)