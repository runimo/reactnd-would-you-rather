import React, { Component } from 'react';
import { connect } from 'react-redux';

class UnansweredQuestionsList extends Component {
  render () {
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser: users[authedUser.id]
  }
}

export default connect(mapStateToProps)(UnansweredQuestionsList)