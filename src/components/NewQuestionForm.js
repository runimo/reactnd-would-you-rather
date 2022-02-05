import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewQuestionForm extends Component {
  render () {
    return (
      <div>New Question</div>
    )
  }
}

export default connect()(NewQuestionForm)