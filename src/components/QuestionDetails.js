import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Navigate, useParams } from 'react-router-dom'

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class QuestionDetails extends Component {
  render () {
    const { params, questionIds } = this.props

    const questionExists = !!questionIds.find(qId => qId === params.id)

    if (questionExists) {
      return (
        <ul>
          <Question id={params.id} isPreview={false} />
        </ul>
      )
    } else {
      return (
        <Navigate to='/404' />
      )
    }

  }
}

function mapStateToProps ({ questions }) {
  const questionIds = Object.keys(questions)
  return {
    questionIds
  }
}

export default connect(mapStateToProps)(withParams(QuestionDetails))