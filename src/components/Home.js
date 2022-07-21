import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import QuestionsList from './QuestionsList'

class Home extends Component {
  state = {
    activeTab: 'answered'
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
          <ul className="flex flex-center sub-navigation" role="tablist">
            <li>
              <a aria-controls="answered-panel" aria-selected={activeTab === 'answered'} className={activeTab === 'answered' ? 'active' : ''} href="#answered" id="tab-answered" onClick={e => this.handleTabChange(e, 'answered')} role="tab">
                Answered
              </a>
            </li>
            <li>
              <a aria-controls="unanswered-panel" aria-selected={activeTab === 'unanswered'} className={activeTab === 'unanswered' ? 'active' : ''} href="#unanswered" id="tab-unanswered" onClick={e => this.handleTabChange(e, 'unanswered')} role="tab">
                Unanswered
              </a>
            </li>
          </ul>
          <div className="flex flex-center">
            {activeTab === 'answered' && <QuestionsList questionIds={answeredQuestionIds} aria-labelledby="tab-answered" id="answered-panel" />}
            {activeTab === 'unanswered' && <QuestionsList questionIds={unansweredQuestionIds} aria-labelledby="tab-unanswered" id="unanswered-panel" />}
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