import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { useParams } from 'react-router-dom'

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class QuestionDetails extends Component {
  render () {
    const { params } = this.props

    return (
        <Question id={params.id} isPreview={false} />
    )
  }
}

export default connect()(withParams(QuestionDetails))