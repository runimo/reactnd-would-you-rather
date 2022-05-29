import React, { Component } from 'react'
import Question from './Question'

class QuestionsList extends Component {
  render () {
    const { questionIds } = this.props

    if (questionIds.length) {
      return (
        <ul className="card-list">
          {questionIds.map((qId) => (
            <Question key={qId} id={qId} />
          ))}
        </ul>
      )
    } else {
      return (
        <div>You have not answered any questions yet.</div>
      )
    }
  }
}

export default QuestionsList