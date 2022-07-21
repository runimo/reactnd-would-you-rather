import React, { Component } from 'react'
import Question from './Question'

class QuestionsList extends Component {
  render () {
    const { questionIds, id } = this.props

    if (questionIds.length) {
      return (
        <ul className="card-list" id={id} role="tabpanel">
          {questionIds.map((qId) => (
            <Question key={qId} id={qId} isPreview={true} />
          ))}
        </ul>
      )
    }
  }
}

export default QuestionsList