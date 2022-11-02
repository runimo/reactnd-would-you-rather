import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import QuestionsList from './QuestionsList'

class Home extends Component {
  state = {
    activeTab: 'unanswered'
  }

  handleTabChange = (event, tab) => {
    this.setActiveTab(tab)
  }

  setActiveTab = (tab) => {
    this.setState(() => ({
      activeTab: tab
    }))
  }

  render () {
    const { answeredQuestionIds, authedUser, unansweredQuestionIds } = this.props
    const { activeTab } = this.state

    if (!authedUser) {
      return (
        <Login />
      )
    } else {
      return (
        <Fragment>
          <ul className="flex flex-center sub-navigation" role="tablist">
            <li className={activeTab === 'unanswered' ? 'active' : ''}>
              <a aria-controls="unanswered-panel" aria-selected={activeTab === 'unanswered'} href="#unanswered" id="tab-unanswered" onClick={e => this.handleTabChange(e, 'unanswered')} role="tab">
                Unanswered
              </a>
            </li>
            <li className={activeTab === 'answered' ? 'active' : ''}>
              <a aria-controls="answered-panel" aria-selected={activeTab === 'answered'} href="#answered" id="tab-answered" onClick={e => this.handleTabChange(e, 'answered')} role="tab">
                Answered
              </a>
            </li>
          </ul>
          <div className="flex flex-center">
            {activeTab === 'unanswered' && <QuestionsList questionIds={unansweredQuestionIds} aria-labelledby="tab-unanswered" id="unanswered-panel" />}
            {activeTab === 'answered' && <QuestionsList questionIds={answeredQuestionIds} aria-labelledby="tab-answered" id="answered-panel" />}
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