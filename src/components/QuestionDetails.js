import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Question from './Question'
import { Navigate, useParams } from 'react-router-dom'

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class QuestionDetails extends Component {
  render () {
    const { authedUser, params, questionIds } = this.props

    const questionExists = !!questionIds.find(qId => qId === params.id)

    if (authedUser && questionExists) {
      return (
        <ul>
          <Question id={params.id} isPreview={false} />
        </ul>
      )
    } else if (!questionExists) {
      return (
        <Navigate to='/404' />
      )
    } else if (!authedUser) {
      return (
        <Login />
      )
    }

  }
}

function mapStateToProps ({ authedUser, questions }) {
  const questionIds = Object.keys(questions)
  return {
    authedUser,
    questionIds
  }
}

export default connect(mapStateToProps)(withParams(QuestionDetails))