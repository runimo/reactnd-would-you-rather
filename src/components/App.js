import React, { Component } from 'react'
import '../App.css'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import PageNotFound from './PageNotFound.js'
import { handleInitialData } from '../actions/shared.js'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import LoadingBar from 'react-redux-loading'
import Logout from './Logout'
import Nav from './Nav'
import NewQuestionForm from './NewQuestionForm'
import QuestionDetails from './QuestionDetails'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render () {
    const { authedUser } = this.props

    return (
      <div className="App">
        <LoadingBar style={{ backgroundColor: '#aa71ff', height: '2px' }} />
        <Router>
          <header className="App-header">
            <h1 className="title">Would you rather...?</h1>

            <div className="nav-container">
              <Nav />

              { authedUser && <Logout /> }
            </div>

          </header>

          <main className="main">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/add' element={<NewQuestionForm />} />
              <Route path='/leaderboard' element={<LeaderBoard />} />
              <Route path='/question/:id' element={<QuestionDetails params={this.params} />} />
              <Route path='*' element={<Navigate to='/404' replace />} />
              <Route path='/404' element={<PageNotFound />} />
            </Routes>
          </main>
        </Router>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  const currentUser = authedUser ? users[authedUser.id] : null

  return {
    authedUser: currentUser
  }
}

export default connect(mapStateToProps)(App)

